import { Component, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Change } from '../entities/change.entity';
import { User } from '../../core/entities/user.entity';

@Component()
export class ChangesService {
    items: Change[] = null;
    constructor(
        @InjectRepository(Change)
        private readonly repository: Repository<Change>
    ) {
    }
    async create(options: { item: Change }, user?: User) {
        try {
            options.item = await this.repository.save(options.item);
            return { change: options.item };
        } catch (error) {
            throw error;
        }
    }
    async update(options: { id: number; item: Change }, user?: User) {
        if (process.env.DEMO === 'true') {
            throw new MethodNotAllowedException('Not allowed in DEMO mode');
        }
        try {
            if (!await this.checkAccess(options.id, user)) {
                throw new MethodNotAllowedException('Not allowed');
            }
        } catch (error) {
            throw error;
        }
        options.item.id = options.id;
        try {
            options.item = await this.repository.save(options.item);
            return { change: options.item };
        } catch (error) {
            throw error;
        }
    }
    async delete(options: { id: number }, user?: User) {
        if (process.env.DEMO === 'true') {
            throw new MethodNotAllowedException('Not allowed in DEMO mode');
        }
        try {
            if (!await this.checkAccess(options.id, user)) {
                throw new MethodNotAllowedException('Not allowed');
            }
        } catch (error) {
            throw error;
        }
        try {
            let item = await this.repository.findOneOrFail(
                options.id
            );
            await this.repository.delete(options.id);
            return { change: null };
        } catch (error) {
            throw error;
        }
    }
    private async checkAccess(id: number, user: User) {
        let data: { change: Change };
        try {
            data = await this.load({ id: id }, user);
        } catch (error) {
            throw error;
        }
        return data.change && data.change.project && data.change.project.users.filter(eachUser => eachUser.id === user.id).length > 0;
    }
    async load(options: { id: number }, user?: User) {
        try {
            let object: Change;
            let qb = this.repository.createQueryBuilder('change');
            qb = qb.leftJoinAndSelect('change.project', 'project');
            qb = qb.leftJoinAndSelect('change.contentType', 'contentType');
            qb = qb.leftJoinAndSelect('project.users', 'user');
            qb = qb.leftJoin('project.users', 'whereUser');
            qb = qb.andWhere('change.id = :id', { id: +options.id });
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
            return { change: object };
        } catch (error) {
            throw error;
        }
    }
    async loadAll(options: {
        curPage: number;
        perPage: number;
        q?: string;
        sort?: string;
        project?: number;
    }, user?: User) {
        try {
            let objects: [Change[], number];
            let qb = this.repository.createQueryBuilder('change');
            qb = qb.leftJoinAndSelect('change.project', 'project');
            qb = qb.leftJoinAndSelect('change.contentType', 'contentType');
            qb = qb.leftJoinAndSelect('project.users', 'user');
            qb = qb.leftJoin('project.users', 'whereUser');
            if (options.q) {
                qb = qb.andWhere('(change.data like :q or change.dataId like :q)', {
                    q: `%${options.q}%`, id: +options.q
                });
            }
            if (options.project) {
                qb = qb
                    .andWhere('project.id = :projectId', {
                        projectId: +options.project
                    });
            }
            if (user) {
                qb = qb.andWhere('(whereUser.id = :userId or project.is_public = 1)', {
                    userId: +user.id
                });
            } else {
                qb = qb.andWhere('project.is_public = 1');
            }
            options.sort = options.sort && (new Change()).hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('change.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('change.' + field, 'ASC');
                }
            }
            qb = qb.skip((options.curPage - 1) * options.perPage)
                .take(options.perPage);
            objects = await qb.getManyAndCount();
            return {
                changes: objects[0],
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