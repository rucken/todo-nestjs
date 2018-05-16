import { IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomValidationError } from '../../core/exceptions/custom-validation.error';
import { Project } from './project.entity';
import { Type } from 'class-transformer';

@Entity({ name: 'statuses' })
export class Status {
    @PrimaryGeneratedColumn()
    id: number = undefined;

    @Column({ length: 100 })
    @IsNotEmpty()
    @MaxLength(100)
    name: string = undefined;

    @Column({ length: 255 })
    @IsNotEmpty()
    @MaxLength(255)
    title: string = undefined;

    @Type(() => Project)
    @ManyToOne(type => Project, { eager: true, nullable: true })
    @JoinColumn({ name: "project_id" })
    project: Project = undefined;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date = undefined;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date = undefined;

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