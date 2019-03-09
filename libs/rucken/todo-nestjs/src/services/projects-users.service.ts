import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@rucken/core-nestjs';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsUsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async findAll(
    options: {
      curPage: number;
      perPage: number;
      q?: string;
      sort?: string;
      projectsIds: number[]
    },
    user?: User
  ) {
    try {
      let objects: [User[], number];
      let qb = this.userRepository.createQueryBuilder('user');
      qb = qb.innerJoinAndSelect('user_projects', 'up', 'up.user_id=user.id');
      qb = qb.innerJoinAndSelect('projects', 'project', 'up.project_id=project.id');
      qb = qb.leftJoinAndSelect('user.groups', 'group');
      qb = qb.leftJoinAndSelect('group.permissions', 'permission');
      qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
      if (options.q) {
        qb = qb.where('user.first_name like :q or user.last_name like :q or user.username like :q or user.id = :id', {
          q: `%${options.q}%`,
          id: +options.q
        });
      }
      if (!user) {
        qb = qb.andWhere('project.is_public = 1');
      }
      if (options.projectsIds.length > 0) {
        qb = qb.andWhere('(up.project_id in (:...projectIds))', {
          projectIds: options.projectsIds
        });
      }
      options.sort = options.sort && new User().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('user.' + field, 'DESC');
        } else {
          qb = qb.orderBy('user.' + field, 'ASC');
        }
      }
      qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
      objects = await qb.getManyAndCount();
      return {
        users: objects[0],
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
