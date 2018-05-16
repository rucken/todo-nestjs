import { IsNotEmpty, MaxLength, validateSync, IsOptional } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, BeforeRemove } from 'typeorm';
import { CustomValidationError } from '../../core/exceptions/custom-validation.error';
import { Project } from './project.entity';
import { Status } from './status.entity';
import { Type } from 'class-transformer';

@Entity({ name: 'tasks' })
export class Task {
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

    @Column({ type: Date, name: 'open_at', nullable: true })
    openAt: Date = undefined;

    @Column({ type: Date, name: 'close_at', nullable: true })
    closeAt: Date = undefined;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date = undefined;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date = undefined;

    @Type(() => Project)
    @IsNotEmpty()
    @ManyToOne(type => Project, { eager: true, nullable: true })
    @JoinColumn({ name: "project_id" })
    project: Project = undefined;

    @Type(() => Status)
    @ManyToOne(type => Status, { eager: true, nullable: true })
    @JoinColumn({ name: "status_id" })
    status: Status = undefined;

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