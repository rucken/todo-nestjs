import { plainToClass } from "class-transformer";
import { MigrationInterface, QueryRunner } from "typeorm";
import { ContentType } from "../../core/entities/content-type.entity";
import { Group } from "../../core/entities/group.entity";
import { Permission } from "../../core/entities/permission.entity";

export class addStatusPermissions1524590765718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ctStatus = await queryRunner.manager.getRepository<ContentType>(ContentType).save(
            plainToClass(ContentType, { name: 'status', title: 'Status' })
        );
        const pPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
            plainToClass(Permission,
                [{
                    title: 'Can add status',
                    name: 'add_status',
                    contentType: ctStatus
                },
                {
                    title: 'Can change status',
                    name: 'change_status',
                    contentType: ctStatus
                },
                {
                    title: 'Can delete status',
                    name: 'delete_status',
                    contentType: ctStatus
                },
                {
                    title: 'Can read status',
                    name: 'read_status',
                    contentType: ctStatus
                }]
            )
        );
        const pAllPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
            plainToClass(Permission,
                [
                    {
                        title: 'Can all change status',
                        name: 'change-all_status',
                        contentType: ctStatus
                    },
                    {
                        title: 'Can all delete status',
                        name: 'delete-all_status',
                        contentType: ctStatus
                    },
                    {
                        title: 'Can all read status',
                        name: 'read-all_status',
                        contentType: ctStatus
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
