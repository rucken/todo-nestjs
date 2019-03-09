import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class AddConstraintsAndIndexes1537207965271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createIndex(
        'projects',
        new TableIndex({
          name: 'IDX_PRO_I_P',
          columnNames: ['is_public']
        })
      );
      await queryRunner.createForeignKey(
        'tasks',
        new TableForeignKey({
          name: 'FK_TAS_P_ID',
          columnNames: ['project_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'projects',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'tasks',
        new TableIndex({
          name: 'IDX_TAS_P_ID',
          columnNames: ['project_id']
        })
      );
      await queryRunner.createForeignKey(
        'tasks',
        new TableForeignKey({
          name: 'FK_TAS_S_ID',
          columnNames: ['status_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'statuses',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'tasks',
        new TableIndex({
          name: 'IDX_TAS_S_ID',
          columnNames: ['status_id']
        })
      );
      await queryRunner.createForeignKey(
        'statuses',
        new TableForeignKey({
          name: 'FK_STA_P_ID',
          columnNames: ['project_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'projects',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'statuses',
        new TableIndex({
          name: 'IDX_STA_P_ID',
          columnNames: ['project_id']
        })
      );
    }
    await queryRunner.createTable(
      new Table({
        name: 'user_projects',
        columns: [
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true
          },
          {
            name: 'project_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true
          }
        ]
      }),
      true
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createIndex(
        'user_projects',
        new TableIndex({
          name: 'UQ_USE_PRO',
          isUnique: true,
          columnNames: ['user_id', 'project_id']
        })
      );
      await queryRunner.createForeignKey(
        'user_projects',
        new TableForeignKey({
          name: 'FK_USE_PRO_U_ID',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'user_projects',
        new TableIndex({
          name: 'IDX_USE_PRO_U_ID',
          columnNames: ['user_id']
        })
      );
      await queryRunner.createForeignKey(
        'user_projects',
        new TableForeignKey({
          name: 'FK_USE_PRO_P_ID',
          columnNames: ['project_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'projects',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'user_projects',
        new TableIndex({
          name: 'IDX_USE_PRO_P_ID',
          columnNames: ['project_id']
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
