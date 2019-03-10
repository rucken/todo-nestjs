import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@rucken/core-nestjs';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repository: Repository<Task>) {}

  async create(options: { item: Task }, user?: User) {
    options.item.createdUser = user;
    try {
      options.item = await this.repository.save(options.item);
      return { task: options.item };
    } catch (error) {
      throw error;
    }
  }

  async update(options: { id: number; item: Task }, user?: User) {
    try {
      if (!(await this.checkAccess(options.id, user))) {
        throw new MethodNotAllowedException('Not allowed');
      }
    } catch (error) {
      throw error;
    }
    options.item.id = options.id;
    options.item.updatedUser = user;
    try {
      options.item = await this.repository.save(options.item);
      return { task: options.item };
    } catch (error) {
      throw error;
    }
  }

  async delete(options: { id: number }, user?: User) {
    try {
      if (!(await this.checkAccess(options.id, user))) {
        throw new MethodNotAllowedException('Not allowed');
      }
    } catch (error) {
      throw error;
    }
    try {
      const item = await this.repository.findOneOrFail(options.id);
      await this.repository.delete(options.id);
      return { task: null };
    } catch (error) {
      throw error;
    }
  }

  private async checkAccess(id: number, user: User) {
    let data: { task: Task };
    try {
      data = await this.findById({ id }, user, true);
    } catch (error) {
      throw error;
    }
    return (
      data.task && data.task.project && data.task.project.users.filter(eachUser => eachUser.id === user.id).length > 0
    );
  }

  async findById(options: { id: number }, user?: User, includeProjectUsers?: boolean) {
    try {
      let object: Task;
      let qb = this.repository.createQueryBuilder('task');
      qb = qb.leftJoinAndSelect('task.project', 'project');
      qb = qb.leftJoinAndSelect('task.status', 'status');
      if (includeProjectUsers) {
        qb = qb.leftJoinAndSelect('project.users', 'user');
      }
      qb = qb.leftJoinAndSelect('task.assignedUser', 'assignedUser');
      qb = qb.leftJoinAndSelect('task.createdUser', 'createdUser');
      qb = qb.leftJoinAndSelect('task.updatedUser', 'updatedUser');
      qb = qb.leftJoin('project.users', 'whereUser');
      qb = qb.andWhere('task.id = :id', { id: +options.id });
      if (user) {
        qb = qb.andWhere('(whereUser.id = :userId or project.is_public = 1)', {
          userId: +user.id
        });
      } else {
        qb = qb.andWhere('project.is_public = 1');
      }
      object = await qb.getOne();
      if (!object) {
        throw new NotFoundException();
      }
      return { task: object };
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
      project?: number;
      usersIds: number[];
      statusesNames: string[];
    },
    user?: User
  ) {
    try {
      let objects: [Task[], number];
      let qb = this.repository.createQueryBuilder('task');
      qb = qb.leftJoinAndSelect('task.project', 'project');
      qb = qb.leftJoinAndSelect('task.status', 'status');
      qb = qb.leftJoinAndSelect('task.assignedUser', 'assignedUser');
      qb = qb.leftJoinAndSelect('task.createdUser', 'createdUser');
      qb = qb.leftJoinAndSelect('task.updatedUser', 'updatedUser');
      qb = qb.leftJoin('project.users', 'whereUser');
      if (options.q) {
        qb = qb.andWhere('(task.title like :q or task.description like :q or task.id = :id)', {
          q: `%${options.q}%`,
          id: +options.q
        });
      }
      if (!options.project) {
        options.project = -1;
      }
      qb = qb.andWhere('project.id = :projectId', {
        projectId: +options.project
      });
      if (user) {
        qb = qb.andWhere('(whereUser.id = :userId or project.is_public = 1)', {
          userId: +user.id
        });
      } else {
        qb = qb.andWhere('project.is_public = 1');
      }
      if (options.usersIds.length > 0) {
        qb = qb.andWhere('(assignedUser.id in (:...usersIds))', {
          usersIds: options.usersIds
        });
      }
      if (options.statusesNames.length > 0) {
        qb = qb.andWhere('(status.name in (:...statusesNames))', {
          statusesNames: options.statusesNames
        });
      }
      options.sort = options.sort && new Task().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('task.' + field, 'DESC');
        } else {
          qb = qb.orderBy('task.' + field, 'ASC');
        }
      }
      qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
      objects = await qb.getManyAndCount();
      return {
        tasks: objects[0],
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
