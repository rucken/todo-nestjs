import { CustomValidationError } from '@todo-nestjs/core';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  validateSync
} from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Project } from './project.entity';
import { Status } from './status.entity';

@Entity({ name: 'task' })
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
  @JoinColumn({ name: 'project_id' })
  project: Project = undefined;

  @Type(() => Status)
  @ManyToOne(type => Status, { eager: true, nullable: true })
  @JoinColumn({ name: 'status_id' })
  status: Status = undefined;

  @BeforeInsert()
  doBeforeInsertion() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  @BeforeUpdate()
  doBeforeUpdate() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }
}
