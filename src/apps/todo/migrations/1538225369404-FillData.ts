import { User } from '@todo-nestjs/core';
import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Status } from '../entities/status.entity';
import { Task } from '../entities/task.entity';

export class FillData1538225369404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const uAdmin = await queryRunner.manager
      .getRepository<User>(User)
      .findOneOrFail({
        where: {
          username: 'admin'
        }
      });
    const uUser1 = await queryRunner.manager
      .getRepository<User>(User)
      .findOneOrFail({
        where: {
          username: 'user1'
        }
      });
    const uUser2 = await queryRunner.manager
      .getRepository<User>(User)
      .findOneOrFail({
        where: {
          username: 'user2'
        }
      });
    const pProject1 = await queryRunner.manager
      .getRepository<Project>(Project)
      .save(
        plainToClass(Project, {
          title: 'project 1',
          description: 'description of project 1',
          isPublic: true,
          users: [uUser1]
        })
      );
    const pProject1Statuses = await queryRunner.manager
      .getRepository<Status>(Status)
      .save(
        plainToClass(Status, [
          { title: 'status 1 for project 1', name: 'p1s1', project: pProject1 },
          { title: 'status 2 for project 1', name: 'p1s2', project: pProject1 },
          { title: 'status 3 for project 1', name: 'p1s3', project: pProject1 }
        ])
      );
    const pProject1Tasks = await queryRunner.manager
      .getRepository<Task>(Task)
      .save(
        plainToClass(Task, [
          {
            title: 'task 1 for project 1',
            description: 'task 1 of project 1',
            project: pProject1,
            openAt: new Date(),
            status: pProject1Statuses[0]
          },
          {
            title: 'task 2 for project 1',
            description: 'task 2 of project 1',
            project: pProject1,
            openAt: new Date(),
            closeAt: new Date(),
            status: pProject1Statuses[1]
          },
          {
            title: 'task 3 for project 1',
            description: 'task 3 of project 1',
            project: pProject1,
            closeAt: new Date(),
            status: pProject1Statuses[2]
          }
        ])
      );
    const pProject2 = await queryRunner.manager
      .getRepository<Project>(Project)
      .save(
        plainToClass(Project, {
          title: 'project 2',
          description: 'description of project 2',
          isPublic: false,
          users: [uUser2, uAdmin]
        })
      );
    const pProject2Statuses = await queryRunner.manager
      .getRepository<Status>(Status)
      .save(
        plainToClass(Status, [
          { title: 'status 1 for project 2', name: 'p2s1', project: pProject2 },
          { title: 'status 2 for project 2', name: 'p2s2', project: pProject2 },
          { title: 'status 3 for project 2', name: 'p2s3', project: pProject2 }
        ])
      );
    const pProject2Tasks = await queryRunner.manager
      .getRepository<Task>(Task)
      .save(
        plainToClass(Task, [
          {
            title: 'task 1 for project 2',
            description: 'task 1 of project 2',
            project: pProject2,
            openAt: new Date(),
            status: pProject2Statuses[0]
          },
          {
            title: 'task 2 for project 2',
            description: 'task 2 of project 2',
            project: pProject2,
            openAt: new Date(),
            closeAt: new Date(),
            status: pProject2Statuses[1]
          },
          {
            title: 'task 3 for project 2',
            description: 'task 3 of project 2',
            project: pProject2,
            closeAt: new Date(),
            status: pProject2Statuses[2]
          }
        ])
      );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
