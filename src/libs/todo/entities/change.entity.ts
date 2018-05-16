import { IsNotEmpty, MaxLength, validateSync, IsOptional } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomValidationError } from '../../core/exceptions/custom-validation.error';
import { Project } from './project.entity';
import { Status } from './status.entity';
import { ContentType } from '../../core/entities/content-type.entity';
import { User } from '../../core/entities/user.entity';
import { Type } from 'class-transformer';

@Entity({ name: 'changes' })
export class Change {
    @PrimaryGeneratedColumn()
    id: number = undefined;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    data: string = undefined;

    @Column({ length: 256, nullable: true })
    @MaxLength(256)
    @IsOptional()
    dataId: string = undefined;

    @Column({ length: 256, nullable: true })
    @MaxLength(256)
    @IsOptional()
    method: string = undefined;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date = undefined;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date = undefined;

    @Type(() => Project)
    @ManyToOne(type => Project, { eager: true, nullable: true })
    @JoinColumn({ name: "project_id" })
    project: Project = undefined;

    @Type(() => ContentType)
    @ManyToOne(type => ContentType, { eager: true, nullable: true })
    @JoinColumn({ name: "content_type_id" })
    contentType: ContentType = undefined;

    @Type(() => User)
    @ManyToOne(type => User, { eager: true, nullable: true })
    @JoinColumn({ name: "user_id" })
    user: User = undefined;

    @BeforeInsert()
    doBeforeInsertion() {
        const errors = validateSync(this, { validationError: { target: false } });
        if (errors.length > 0) {
            console.log(errors);
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