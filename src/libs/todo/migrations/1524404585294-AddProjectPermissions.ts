import { plainToClass } from "class-transformer";
import { MigrationInterface, QueryRunner } from "typeorm";
import { ContentType } from "../../core/entities/content-type.entity";
import { Group } from "../../core/entities/group.entity";
import { Permission } from "../../core/entities/permission.entity";

export class addProjectPermissions1524404585294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ctProject = await queryRunner.manager.getRepository<ContentType>(ContentType).save(
            plainToClass(ContentType, { name: 'project', title: 'Project' })
        );
        const pPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
            plainToClass(Permission,
                [{
                    title: 'Can add project',
                    name: 'add_project',
                    contentType: ctProject
                },
                {
                    title: 'Can change project',
                    name: 'change_project',
                    contentType: ctProject
                },
                {
                    title: 'Can delete project',
                    name: 'delete_project',
                    contentType: ctProject
                },
                {
                    title: 'Can read project',
                    name: 'read_project',
                    contentType: ctProject
                }]
            )
        );
        const pAllPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
            plainToClass(Permission,
                [
                    {
                        title: 'Can all change project',
                        name: 'change-all_project',
                        contentType: ctProject
                    },
                    {
                        title: 'Can all delete project',
                        name: 'delete-all_project',
                        contentType: ctProject
                    },
                    {
                        title: 'Can all read project',
                        name: 'read-all_project',
                        contentType: ctProject
                    }]
            )
        );
        const gUser = await queryRunner.manager.getRepository<Group>(Group).findOneOrFail(
            { name: 'user' },
            { relations: ['permissions'] }
        );
        gUser.permissions = [
            ...gUser.permissions,
            ...pPermissions
        ];
        await queryRunner.manager.getRepository<Group>(Group).save(gUser);

        const gAdmin = await queryRunner.manager.getRepository<Group>(Group).findOneOrFail(
            { name: 'admin' },
            { relations: ['permissions'] }
        );
        gAdmin.permissions = [
            ...gAdmin.permissions,
            ...pPermissions,
            ...pAllPermissions
        ];
        await queryRunner.manager.getRepository<Group>(Group).save(gAdmin);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
