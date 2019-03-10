import { User1524199022084 } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Project1538225369404 } from '../migrations_entities/1538225369404/project.entity';
import { Status1538225369404 } from '../migrations_entities/1538225369404/status.entity';
import { Task1538225369404 } from '../migrations_entities/1538225369404/task.entity';

export class FillData1538225369404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const uAdmin = await queryRunner.manager.getRepository<User1524199022084>(User1524199022084).findOneOrFail({
      where: {
        username: 'admin'
      }
    });
    const uUser1 = await queryRunner.manager.getRepository<User1524199022084>(User1524199022084).findOneOrFail({
      where: {
        username: 'user1'
      }
    });
    const uUser2 = await queryRunner.manager.getRepository<User1524199022084>(User1524199022084).findOneOrFail({
      where: {
        username: 'user2'
      }
    });
    const pProject1 = await queryRunner.manager.getRepository<Project1538225369404>(Project1538225369404).save(
      plainToClass(Project1538225369404, {
        title: 'Project 1',
        description: 'Description of project 1',
        isPublic: true,
        users: [uUser1]
      })
    );
    const pProject1Statuses = await queryRunner.manager
      .getRepository<Status1538225369404>(Status1538225369404)
      .save(
        plainToClass(Status1538225369404, [
          { title: 'status 1 for project 1', name: 'p1s1', project: pProject1 },
          { title: 'status 2 for project 1', name: 'p1s2', project: pProject1 },
          { title: 'status 3 for project 1', name: 'p1s3', project: pProject1 }
        ])
      );
    const pProject1Tasks = await queryRunner.manager.getRepository<Task1538225369404>(Task1538225369404).save(
      plainToClass(Task1538225369404, [
        {
          title: 'Task 1 for project 1',
          description: 'Task 1 of project 1',
          project: pProject1,
          openAt: new Date(),
          status: pProject1Statuses[0]
        },
        {
          title: 'Task 2 for project 1',
          description: 'Task 2 of project 1',
          project: pProject1,
          openAt: new Date(),
          closeAt: new Date(),
          status: pProject1Statuses[1]
        },
        {
          title: 'Task 3 for project 1',
          description: 'Task 3 of project 1',
          project: pProject1,
          closeAt: new Date(),
          status: pProject1Statuses[2]
        }
      ])
    );
    const pProject2 = await queryRunner.manager.getRepository<Project1538225369404>(Project1538225369404).save(
      plainToClass(Project1538225369404, {
        title: 'Project 2',
        description: 'Description of project 2',
        isPublic: false,
        users: [uUser2, uAdmin]
      })
    );
    const pProject2Statuses = await queryRunner.manager
      .getRepository<Status1538225369404>(Status1538225369404)
      .save(
        plainToClass(Status1538225369404, [
          { title: 'status 1 for project 2', name: 'p2s1', project: pProject2 },
          { title: 'status 2 for project 2', name: 'p2s2', project: pProject2 },
          { title: 'status 3 for project 2', name: 'p2s3', project: pProject2 }
        ])
      );
    const pProject2Tasks = await queryRunner.manager.getRepository<Task1538225369404>(Task1538225369404).save(
      plainToClass(Task1538225369404, [
        {
          title: 'Task 1 for project 2',
          description: 'Task 1 of project 2',
          project: pProject2,
          openAt: new Date(),
          status: pProject2Statuses[0]
        },
        {
          title: 'Task 2 for project 2',
          description: 'Task 2 of project 2',
          project: pProject2,
          openAt: new Date(),
          closeAt: new Date(),
          status: pProject2Statuses[1]
        },
        {
          title: 'Task 3 for project 2',
          description: 'Task 3 of project 2',
          project: pProject2,
          closeAt: new Date(),
          status: pProject2Statuses[2]
        }
      ])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
