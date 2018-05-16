import { MigrationInterface, QueryRunner } from "typeorm";
import { ContentType } from "../../core/entities/content-type.entity";
import { Permission } from "../../core/entities/permission.entity";
import { plainToClass } from "class-transformer";
import { Group } from "../../core/entities/group.entity";

export class addTaskPermissions1524585140205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ctTask = await queryRunner.manager.getRepository<ContentType>(ContentType).save(
            plainToClass(ContentType, { name: 'task', title: 'Task' })
        );
        const pPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
            plainToClass(Permission,
                [{
                    title: 'Can add task',
                    name: 'add_task',
                    contentType: ctTask
                },
                {
                    title: 'Can change task',
                    name: 'change_task',
                    contentType: ctTask
                },
                {
                    title: 'Can delete task',
                    name: 'delete_task',
                    contentType: ctTask
                },
                {
                    title: 'Can read task',
                    name: 'read_task',
                    contentType: ctTask
                }]
            )
        );
        const pAllPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
            plainToClass(Permission,
                [
                    {
                        title: 'Can all change task',
                        name: 'change-all_task',
                        contentType: ctTask
                    },
                    {
                        title: 'Can all delete task',
                        name: 'delete-all_task',
                        contentType: ctTask
                    },
                    {
                        title: 'Can all read task',
                        name: 'read-all_task',
                        contentType: ctTask
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
