import { Inject, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CORE_CONFIG_TOKEN, ICoreConfig, User } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Status } from '../entities/status.entity';
import { Task } from '../entities/task.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    @InjectRepository(Project) private readonly repository: Repository<Project>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}
  async create(options: { item: Project }, user?: User) {
    try {
      options.item = await this.repository.save(options.item);
    } catch (error) {
      throw error;
    }
    options.item.statuses = options.item.statuses.map(status => {
      status.id = status.id < 0 ? undefined : status.id;
      status.project = plainToClass(Project, options.item.id);
      return status;
    });
    if (user && options.item.users.filter(eachUser => user.id === eachUser.id).length === 0) {
      options.item.users.push(user);
    }
    options.item.users = options.item.users.map(eachUser => {
      if (+eachUser.id < 0) {
        eachUser.password = 'password';
      }
      return eachUser;
    });
    try {
      options.item.statuses = await this.statusRepository.save(options.item.statuses);
    } catch (error) {
      throw error;
    }
    try {
      options.item = await this.repository.save(options.item);
    } catch (error) {
      throw error;
    }
    return this.findById({ id: options.item.id }, user);
  }
  async update(options: { id: number; item: Project }, user?: User) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      if (!(await this.checkAccess(options.id, user))) {
        throw new MethodNotAllowedException('Not allowed');
      }
    } catch (error) {
      throw error;
    }
    options.item.id = options.id;
    options.item.statuses = options.item.statuses.map(status => {
      status.id = status.id < 0 ? undefined : status.id;
      status.project = plainToClass(Project, options.item.id);
      return status;
    });
    options.item.users = options.item.users.map(eachUser => {
      if (+eachUser.id < 0) {
        eachUser.password = 'password';
      }
      return eachUser;
    });
    try {
      options.item.statuses = await this.statusRepository.save(options.item.statuses);
    } catch (error) {
      throw error;
    }
    try {
      options.item = await this.repository.save(options.item);
    } catch (error) {
      throw error;
    }
    return this.findById({ id: options.item.id }, user);
  }
  async delete(options: { id: number }, user?: User) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      if (!(await this.checkAccess(options.id, user))) {
        throw new MethodNotAllowedException('Not allowed');
      }
    } catch (error) {
      throw error;
    }
    try {
      const item = await this.repository.findOneOrFail(options.id);
      this.statusRepository.delete('project_id=' + item.id);
      this.taskRepository.delete('project_id=' + item.id);
      await this.repository.delete(options.id);
      return { project: null };
    } catch (error) {
      throw error;
    }
  }
  private async checkAccess(id: number, user: User) {
    let data: { project: Project };
    try {
      data = await this.findById({ id }, user);
    } catch (error) {
      throw error;
    }
    return data.project && data.project.users.filter(eachUser => eachUser.id === user.id).length > 0;
  }
  async findById(options: { id: number }, user?: User) {
    try {
      let object: Project;
      let qb = this.repository.createQueryBuilder('project');
      qb = qb.leftJoinAndSelect('project.users', 'user');
      qb = qb.leftJoin('project.users', 'whereUser');
      qb = qb.leftJoinAndSelect('user.groups', 'group');
      qb = qb.leftJoinAndSelect('group.permissions', 'permission');
      qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
      qb = qb.leftJoinAndSelect('project.statuses', 'status');
      qb = qb.andWhere('project.id = :id', {
        id: +options.id
      });
      if (user) {
        qb = qb.andWhere('(whereUser.id = :userId or project.is_public = 1)', {
          userId: +user.id
        });
      } else {
        qb = qb.andWhere('project.is_public = 1', {
          id: options.id
        });
      }
      object = await qb.getOne();
      if (!object) {
        throw new NotFoundException();
      }
      return {
        project: object
      };
    } catch (error) {
      throw error;
    }
  }
  async findAll(
    options: {
      curPage: number;
      perPage: number;
      q?: string;
      sort?: string;
    },
    user?: User
  ) {
    try {
      let objects: [Project[], number];
      let qb = this.repository.createQueryBuilder('project');
      qb = qb.leftJoinAndSelect('project.users', 'user');
      qb = qb.leftJoin('project.users', 'whereUser');
      qb = qb.leftJoinAndSelect('user.groups', 'group');
      qb = qb.leftJoinAndSelect('group.permissions', 'permission');
      qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
      qb = qb.leftJoinAndSelect('project.statuses', 'status');
      if (options.q) {
        qb = qb.andWhere('(project.title like :q or project.description like :q or project.id = :id)', {
          q: `%${options.q}%`,
          id: +options.q
        });
      }
      if (user) {
        qb = qb.andWhere('(whereUser.id = :userId or project.is_public = 1)', {
          userId: +user.id
        });
      } else {
        qb = qb.andWhere('project.is_public = 1');
      }
      options.sort = options.sort && new Project().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('project.' + field, 'DESC');
        } else {
          qb = qb.orderBy('project.' + field, 'ASC');
        }
      }
      qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
      objects = await qb.getManyAndCount();
      return {
        projects: objects[0],
        meta: {
          perPage: options.perPage,
          totalPages: options.perPage > objects[1] ? 1 : Math.ceil(objects[1] / options.perPage),
          totalResults: objects[1],
          curPage: options.curPage
        }
      };
    } catch (error) {
      throw error;
    }
  }
}
