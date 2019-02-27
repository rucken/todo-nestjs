import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class AddConstraintsAndIndexes1537207965271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      'project',
      new TableIndex({
        name: 'IDX_PRO_I_P',
        columnNames: ['is_public']
      })
    );
    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        name: 'FK_TAS_P_ID',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'project',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createIndex(
      'task',
      new TableIndex({
        name: 'IDX_TAS_P_ID',
        columnNames: ['project_id']
      })
    );
    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        name: 'FK_TAS_S_ID',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'status',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createIndex(
      'task',
      new TableIndex({
        name: 'IDX_TAS_S_ID',
        columnNames: ['status_id']
      })
    );
    await queryRunner.createForeignKey(
      'status',
      new TableForeignKey({
        name: 'FK_STA_P_ID',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'project',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createIndex(
      'status',
      new TableIndex({
        name: 'IDX_STA_P_ID',
        columnNames: ['project_id']
      })
    );
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
        referencedTableName: 'user',
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
        referencedTableName: 'project',
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

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
