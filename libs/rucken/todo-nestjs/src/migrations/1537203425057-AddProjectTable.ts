import { ContentType, Group, Permission } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddProjectTable1537203425057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // create table
    await queryRunner.createTable(
      new Table({
        name: 'project',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'title',
            type: 'varchar(100)',
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar(512)',
            isNullable: true
          },
          {
            name: 'is_public',
            type: 'boolean',
            isNullable: false
          },
          {
            name: 'created_at',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.createDateDefault
          },
          {
            name: 'updated_at',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            default: queryRunner.connection.driver.mappedDataTypes.updateDateDefault
          }
        ]
      }),
      true
    );
    // create/load content type
    const ctNewEntity = await queryRunner.manager
      .getRepository<ContentType>(ContentType)
      .save(plainToClass(ContentType, { name: 'project', title: 'Project' }));
    const ctUser = await queryRunner.manager.getRepository<ContentType>(ContentType).findOneOrFail({
      where: {
        name: 'user'
      }
    });
    // create permissions
    const readPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
      plainToClass(Permission, [
        {
          title: 'Can read project',
          name: 'read_project',
          contentType: ctNewEntity
        },
        {
          title: 'Can read projects frame',
          name: 'read_projects-frame',
          contentType: ctUser
        },
        {
          title: 'Can read projects page',
          name: 'read_projects-page',
          contentType: ctUser
        }
      ])
    );
    const modifiPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
      plainToClass(Permission, [
        {
          title: 'Can add project',
          name: 'add_project',
          contentType: ctNewEntity
        },
        {
          title: 'Can change project',
          name: 'change_project',
          contentType: ctNewEntity
        },
        {
          title: 'Can delete project',
          name: 'delete_project',
          contentType: ctNewEntity
        }
      ])
    );
    // add permissions to groups
    const gUser = await queryRunner.manager.getRepository<Group>(Group).findOneOrFail({
      where: {
        name: 'user'
      },
      relations: ['permissions']
    });
    const gAdmin = await queryRunner.manager.getRepository<Group>(Group).findOneOrFail({
      where: {
        name: 'admin'
      },
      relations: ['permissions']
    });
    gUser.permissions = [...gUser.permissions, ...readPermissions, ...modifiPermissions];
    gAdmin.permissions = [...gAdmin.permissions, ...readPermissions, ...modifiPermissions];
    await queryRunner.manager.getRepository<Group>(Group).save([gUser, gAdmin]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
