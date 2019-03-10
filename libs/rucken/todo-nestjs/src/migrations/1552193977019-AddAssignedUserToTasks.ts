import { MigrationInterface, QueryRunner, TableForeignKey, TableColumn, TableIndex } from 'typeorm';

export class AddAssignedUserToTasks1552193977019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    //for tasks
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'assigned_user_id',
        type: 'integer',
        isNullable: true,
        default: 'NULL'
      })
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createForeignKey(
        'tasks',
        new TableForeignKey({
          columnNames: ['assigned_user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL'
        })
      );
      await queryRunner.createIndex(
        'tasks',
        new TableIndex({
          name: 'IDX_TAS_A_U_ID',
          columnNames: ['assigned_user_id']
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
