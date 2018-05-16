import { IsNotEmpty, MaxLength, validateSync, IsOptional } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { CustomValidationError } from '../../core/exceptions/custom-validation.error';
import { Status } from './status.entity';
import { Task } from './task.entity';
import { User } from '../../core/entities/user.entity';
import { Change } from './change.entity';

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn()
    id: number = undefined;

    @Column({ length: 255 })
    @IsNotEmpty()
    @MaxLength(255)
    title: string = undefined;

    @Column({ length: 512, nullable: true })
    @MaxLength(512)
    @IsOptional()
    description: string = undefined;

    @Column({ name: 'is_public', default: false })
    isPublic: boolean = undefined;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date = undefined;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date = undefined;

    @OneToMany(type => Status, status => status.project)
    statuses: Status[];

    @OneToMany(type => Task, task => task.project)
    tasks: Task[];

    @OneToMany(type => Change, change => change.project)
    changes: Change[];

    @ManyToMany(type => User, {
        cascade: true
    })
    @JoinTable({
        //not work on run cli migration: 
        name: 'user_projects',
        joinColumn: {
            name: 'project_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    users: User[];

    @BeforeInsert()
    doBeforeInsertion() {
        const errors = validateSync(this, { validationError: { target: false } });
        if (errors.length > 0) {
            throw new CustomValidationError(errors)
        }
    }

    @BeforeUpdate()
    doBeforeUpdate() {
        const errors = validateSync(this, { validationError: { target: false } });
        if (errors.length > 0) {
            throw new CustomValidationError(errors)
        }
    }
}