import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusTaskConstarints1524591512000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, CONSTRAINT "FK_ff5f4f77acd8aeac97f26f0a2b5" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_status"("id", "name", "title", "created_at", "updated_at", "project_id") SELECT "id", "name", "title", "created_at", "updated_at", "project_id" FROM "statuses"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
        await queryRunner.query(`ALTER TABLE "temporary_status" RENAME TO "statuses"`);
        await queryRunner.query(`CREATE TABLE "temporary_status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_status"("id", "name", "title", "created_at", "updated_at", "project_id") SELECT "id", "name", "title", "created_at", "updated_at", "project_id" FROM "statuses"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
        await queryRunner.query(`ALTER TABLE "temporary_status" RENAME TO "statuses"`);
        await queryRunner.query(`CREATE TABLE "temporary_status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_status"("id", "name", "title", "created_at", "updated_at", "project_id") SELECT "id", "name", "title", "created_at", "updated_at", "project_id" FROM "statuses"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
        await queryRunner.query(`ALTER TABLE "temporary_status" RENAME TO "statuses"`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, "status_id" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id") SELECT "id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "tasks"`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer NOT NULL, "status_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id") SELECT "id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "tasks"`);
        await queryRunner.query(`CREATE TABLE "temporary_status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id", CONSTRAINT "FK_ff5f4f77acd8aeac97f26f0a2b5" FOREIGN KEY ("project_id") REFERENCES "projects" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_status"("id", "name", "title", "created_at", "updated_at", "project_id") SELECT "id", "name", "title", "created_at", "updated_at", "project_id" FROM "statuses"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
        await queryRunner.query(`ALTER TABLE "temporary_status" RENAME TO "statuses"`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer NOT NULL, "status_id" integer NOT NULL, CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "projects" ("id"), CONSTRAINT "FK_b8747cc6a41b6cef4639babf61d" FOREIGN KEY ("status_id") REFERENCES "statuses" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id") SELECT "id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "tasks"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer NOT NULL, "status_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id") SELECT "id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`ALTER TABLE "statuses" RENAME TO "temporary_status"`);
        await queryRunner.query(`CREATE TABLE "statuses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "statuses"("id", "name", "title", "created_at", "updated_at", "project_id") SELECT "id", "name", "title", "created_at", "updated_at", "project_id" FROM "temporary_status"`);
        await queryRunner.query(`DROP TABLE "temporary_status"`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, "status_id" integer)`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id") SELECT "id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "open_at" datetime, "close_at" datetime, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, "status_id" integer, CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id") SELECT "id", "title", "description", "open_at", "close_at", "created_at", "updated_at", "project_id", "status_id" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`ALTER TABLE "statuses" RENAME TO "temporary_status"`);
        await queryRunner.query(`CREATE TABLE "statuses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer)`);
        await queryRunner.query(`INSERT INTO "statuses"("id", "name", "title", "created_at", "updated_at", "project_id") SELECT "id", "name", "title", "created_at", "updated_at", "project_id" FROM "temporary_status"`);
        await queryRunner.query(`DROP TABLE "temporary_status"`);
        await queryRunner.query(`ALTER TABLE "statuses" RENAME TO "temporary_status"`);
        await queryRunner.query(`CREATE TABLE "statuses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, CONSTRAINT "FK_ff5f4f77acd8aeac97f26f0a2b5" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "statuses"("id", "name", "title", "created_at", "updated_at", "project_id") SELECT "id", "name", "title", "created_at", "updated_at", "project_id" FROM "temporary_status"`);
        await queryRunner.query(`DROP TABLE "temporary_status"`);
        await queryRunner.query(`ALTER TABLE "statuses" RENAME TO "temporary_status"`);
        await queryRunner.query(`CREATE TABLE "statuses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, CONSTRAINT "FK_ff5f4f77acd8aeac97f26f0a2b5" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "statuses"("id", "name", "title", "created_at", "updated_at", "project_id") SELECT "id", "name", "title", "created_at", "updated_at", "project_id" FROM "temporary_status"`);
        await queryRunner.query(`DROP TABLE "temporary_status"`);
    }

}
