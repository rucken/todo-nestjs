import {MigrationInterface, QueryRunner} from "typeorm";

export class AddChanges1526323357435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "changes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data" text, "dataId" varchar(256), "method" varchar(256), "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, "content_type_id" integer, "user_id" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_change" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data" text, "dataId" varchar(256), "method" varchar(256), "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, "content_type_id" integer, "user_id" integer, CONSTRAINT "FK_8052dd0f1215c8376f34922610a" FOREIGN KEY ("project_id") REFERENCES "projects" ("id"), CONSTRAINT "FK_d4cc255da1e69a72ec337b3111a" FOREIGN KEY ("content_type_id") REFERENCES "content_types" ("id"), CONSTRAINT "FK_848e7527189a45ebddec91577da" FOREIGN KEY ("user_id") REFERENCES "users" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_change"("id", "data", "dataId", "method", "created_at", "updated_at", "project_id", "content_type_id", "user_id") SELECT "id", "data", "dataId", "method", "created_at", "updated_at", "project_id", "content_type_id", "user_id" FROM "changes"`);
        await queryRunner.query(`DROP TABLE "changes"`);
        await queryRunner.query(`ALTER TABLE "temporary_change" RENAME TO "changes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "changes" RENAME TO "temporary_change"`);
        await queryRunner.query(`CREATE TABLE "changes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data" text, "dataId" varchar(256), "method" varchar(256), "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')), "project_id" integer, "content_type_id" integer, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "changes"("id", "data", "dataId", "method", "created_at", "updated_at", "project_id", "content_type_id", "user_id") SELECT "id", "data", "dataId", "method", "created_at", "updated_at", "project_id", "content_type_id", "user_id" FROM "temporary_change"`);
        await queryRunner.query(`DROP TABLE "temporary_change"`);
        await queryRunner.query(`DROP TABLE "changes"`);
    }

}
