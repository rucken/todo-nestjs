import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddCreatedAndUpdatedUsersFields1552037950367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    //for projects
    await queryRunner.addColumn(
      'projects',
      new TableColumn({
        name: 'created_user_id',
        type: 'integer',
        isNullable: true,
        default: 'NULL'
      })
    );

    await queryRunner.addColumn(
      'projects',
      new TableColumn({
        name: 'updated_user_id',
        type: 'integer',
        isNullable: true,
        default: 'NULL'
      })
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createForeignKey(
        'projects',
        new TableForeignKey({
          columnNames: ['created_user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL'
        })
      );
      await queryRunner.createForeignKey(
        'projects',
        new TableForeignKey({
          columnNames: ['updated_user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL'
        })
      );
      await queryRunner.createIndex(
        'projects',
        new TableIndex({
          name: 'IDX_PRO_C_U_ID',
          columnNames: ['created_user_id']
        })
      );
      await queryRunner.createIndex(
        'projects',
        new TableIndex({
          name: 'IDX_PRO_U_U_ID',
          columnNames: ['updated_user_id']
        })
      );
    }
    //for tasks
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'created_user_id',
        type: 'integer',
        isNullable: true,
        default: 'NULL'
      })
    );
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'updated_user_id',
        type: 'integer',
        isNullable: true,
        default: 'NULL'
      })
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createForeignKey(
        'tasks',
        new TableForeignKey({
          columnNames: ['created_user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL'
        })
      );
      await queryRunner.createForeignKey(
        'tasks',
        new TableForeignKey({
          columnNames: ['updated_user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL'
        })
      );
      await queryRunner.createIndex(
        'tasks',
        new TableIndex({
          name: 'IDX_TAS_C_U_ID',
          columnNames: ['created_user_id']
        })
      );
      await queryRunner.createIndex(
        'tasks',
        new TableIndex({
          name: 'IDX_TAS_U_U_ID',
          columnNames: ['updated_user_id']
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
