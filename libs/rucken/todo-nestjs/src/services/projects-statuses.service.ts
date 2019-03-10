import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@rucken/core-nestjs';
import { Repository } from 'typeorm';
import { Status } from '../entities/status.entity';

@Injectable()
export class ProjectsStatusesService {
  constructor(@InjectRepository(Status) private readonly repository: Repository<Status>) {}

  async findAll(
    options: {
      curPage: number;
      perPage: number;
      q?: string;
      sort?: string;
      projectsIds: number[];
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
      if (user) {
        qb = qb.andWhere('(whereUser.id = :userId or project.is_public = 1)', {
          userId: +user.id
        });
      } else {
        qb = qb.andWhere('project.is_public = 1');
      }
      if (options.projectsIds.length > 0) {
        qb = qb.andWhere('(project.id in (:...projectIds))', {
          projectIds: options.projectsIds
        });
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
