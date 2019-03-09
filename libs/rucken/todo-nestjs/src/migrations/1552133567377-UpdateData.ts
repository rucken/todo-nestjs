import { User1524199022084 } from '@rucken/core-nestjs';
import { MigrationInterface, QueryRunner } from "typeorm";
import { Project1552133567377 } from '../migrations_entities/1552133567377/project.entity';
import { Task1552133567377 } from '../migrations_entities/1552133567377/task.entity';

export class UpdateData1552133567377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const userRepository = queryRunner.manager.getRepository<User1524199022084>(User1524199022084);
        const projectRepository = queryRunner.manager.getRepository<Project1552133567377>(Project1552133567377);
        const taskRepository = queryRunner.manager.getRepository<Task1552133567377>(Task1552133567377);

        const uAdmin = await userRepository.findOneOrFail({
            where: {
                username: 'admin'
            }
        });
        const uUser1 = await userRepository.findOneOrFail({
            where: {
                username: 'user1'
            }
        });
        const uUser2 = await userRepository.findOneOrFail({
            where: {
                username: 'user2'
            }
        });
        const pProject1 = await projectRepository.findOneOrFail({
            where: {
                title: 'Project 1'
            }
        });
        const pProject1Tasks = await taskRepository.find({
            where: {
                project: pProject1
            }
        });
        const pProject2 = await projectRepository.findOneOrFail({
            where: {
                title: 'Project 2'
            }
        });
        const pProject2Tasks = await taskRepository.find({
            where: {
                project: pProject2
            }
        });
        pProject1.createdUser = uUser1;
        pProject1.updatedUser = uUser1;
        pProject2.createdUser = uAdmin;
        pProject2.updatedUser = uUser2;
        await projectRepository.save([
            pProject1,
            pProject2
        ]);
        pProject1Tasks[0].createdUser = uUser1;
        pProject1Tasks[0].updatedUser = uUser1;
        pProject1Tasks[1].createdUser = uUser1;
        pProject1Tasks[1].updatedUser = uUser1;
        pProject1Tasks[2].createdUser = uUser1;
        pProject1Tasks[2].updatedUser = uUser1;
        pProject2Tasks[0].createdUser = uAdmin;
        pProject2Tasks[0].updatedUser = uUser2;
        pProject2Tasks[1].createdUser = uAdmin;
        pProject2Tasks[1].updatedUser = uUser2;
        pProject2Tasks[2].createdUser = uAdmin;
        pProject2Tasks[2].updatedUser = uUser2;
        await taskRepository.save([
            ...pProject1Tasks,
            ...pProject2Tasks
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
