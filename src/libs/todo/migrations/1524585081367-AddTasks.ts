import {MigrationInterface, QueryRunner} from "typeorm";

export class addTasks1524585081367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "projects" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id") SELECT "id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "tasks"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer)`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id") SELECT "id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
