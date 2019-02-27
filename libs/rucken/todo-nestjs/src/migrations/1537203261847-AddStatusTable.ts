import { ContentType, Group, Permission } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddStatusTable1537203261847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // create table
    await queryRunner.createTable(
      new Table({
        name: 'status',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false
          },
          {
            name: 'title',
            type: 'varchar(255)',
            isNullable: false
          },
          {
            name: 'project_id',
            type: 'integer',
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
      .save(plainToClass(ContentType, { name: 'status', title: 'Status' }));
    const ctUser = await queryRunner.manager.getRepository<ContentType>(ContentType).findOneOrFail({
      where: {
        name: 'user'
      }
    });
    // create permissions
    const readPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
      plainToClass(Permission, [
        {
          title: 'Can read status',
          name: 'read_status',
          contentType: ctNewEntity
        },
        {
          title: 'Can read statuses frame',
          name: 'read_statuses-frame',
          contentType: ctUser
        },
        {
          title: 'Can read statuses page',
          name: 'read_statuses-page',
          contentType: ctUser
        }
      ])
    );
    const modifiPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
      plainToClass(Permission, [
        {
          title: 'Can add status',
          name: 'add_status',
          contentType: ctNewEntity
        },
        {
          title: 'Can change status',
          name: 'change_status',
          contentType: ctNewEntity
        },
        {
          title: 'Can delete status',
          name: 'delete_status',
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
