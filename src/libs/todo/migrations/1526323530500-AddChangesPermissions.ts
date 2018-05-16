import { MigrationInterface, QueryRunner } from "typeorm";
import { ContentType } from "../../core/entities/content-type.entity";
import { plainToClass } from "class-transformer";
import { Permission } from "../../core/entities/permission.entity";
import { Group } from "../../core/entities/group.entity";

export class AddChangesPermissions1526323530500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ctChange = await queryRunner.manager.getRepository<ContentType>(ContentType).save(
            plainToClass(ContentType, { name: 'change', title: 'Change' })
        );
        const pPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
            plainToClass(Permission,
                [{
                    title: 'Can read change',
                    name: 'read_change',
                    contentType: ctChange
                }]
            )
        );
        const pAllPermissions = await queryRunner.manager.getRepository<Permission>(Permission).save(
            plainToClass(Permission,
                [{
                    title: 'Can all read change',
                    name: 'read-all_change',
                    contentType: ctChange
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
