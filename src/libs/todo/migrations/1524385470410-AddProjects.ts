import { MigrationInterface, QueryRunner } from "typeorm";

export class addProjects1524385470410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512), "is_public" boolean NOT NULL DEFAULT (0), "created_at" datetime DEFAULT (datetime('now')), "updated_at" datetime DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
