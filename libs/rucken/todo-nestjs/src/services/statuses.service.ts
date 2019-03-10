import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@rucken/core-nestjs';
import { Repository } from 'typeorm';
import { Status } from '../entities/status.entity';

@Injectable()
export class StatusesService {
  constructor(@InjectRepository(Status) private readonly repository: Repository<Status>) {}

  async create(options: { item: Status }, user?: User) {
    try {
      options.item = await this.repository.save(options.item);
      return { status: options.item };
    } catch (error) {
      throw error;
    }
  }

  async update(options: { id: number; item: Status }, user?: User) {
    try {
      if (!(await this.checkAccess(options.id, user))) {
        throw new MethodNotAllowedException('Not allowed');
      }
    } catch (error) {
      throw error;
    }
    options.item.id = options.id;
    try {
      options.item = await this.repository.save(options.item);
      return { status: options.item };
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
      await this.repository.delete(options.id);
      return { status: null };
    } catch (error) {
      throw error;
    }
  }

  private async checkAccess(id: number, user: User) {
    let data: { status: Status };
    try {
      data = await this.findById({ id }, user, true);
    } catch (error) {
      throw error;
    }
    return (
      data.status &&
      data.status.project &&
      data.status.project.users.filter(eachUser => eachUser.id === user.id).length > 0
    );
  }

  async findById(options: { id: number }, user?: User, includeProjectUsers?: boolean) {
    try {
      let object: Status;
      let qb = this.repository.createQueryBuilder('status');
      qb = qb.leftJoinAndSelect('status.project', 'project');
      if (includeProjectUsers) {
        qb = qb.leftJoinAndSelect('project.users', 'user');
      }
      qb = qb.leftJoin('project.users', 'whereUser');
      qb = qb.andWhere('status.id = :id', {
        id: +options.id
      });
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
      return { status: object };
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
    },
    user?: User
  ) {
    try {
      let objects: [Status[], number];
      let qb = this.repository.createQueryBuilder('status');
      qb = qb.leftJoinAndSelect('status.project', 'project');
      qb = qb.leftJoin('project.users', 'whereUser');
      if (options.q) {
        qb = qb.andWhere('(status.title like :q or status.name like :q or status.id = :id)', {
          q: `%${options.q}%`,
          id: +options.q
        });
      }
      if (!options.project) {
        options.project = -1;
      }
      qb = qb.andWhere('status.project_id = :projectId', {
        projectId: +options.project
      });
      if (user) {
        qb = qb.andWhere('(whereUser.id = :userId or project.is_public = 1)', {
          userId: +user.id
        });
      } else {
        qb = qb.andWhere('project.is_public = 1');
      }
      options.sort = options.sort && new Status().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('status.' + field, 'DESC');
        } else {
          qb = qb.orderBy('status.' + field, 'ASC');
        }
      }
      qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
      objects = await qb.getManyAndCount();
      return {
        statuses: objects[0],
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
