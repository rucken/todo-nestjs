import { CustomValidationError, User } from '@rucken/core-nestjs';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, validateSync } from 'class-validator';
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
  @JoinColumn({ name: 'project_id' })
  project: Project = undefined;

  @Type(() => Status)
  @ManyToOne(type => Status, { eager: true, nullable: true })
  @JoinColumn({ name: 'status_id' })
  status: Status = undefined;

  @Type(() => User)
  @ManyToOne(type => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'created_user_id' })
  createdUser: User = undefined;

  @Type(() => User)
  @ManyToOne(type => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'updated_user_id' })
  updatedUser: User = undefined;

  @Type(() => User)
  @ManyToOne(type => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'assigned_user_id' })
  assignedUser: User = undefined;

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
