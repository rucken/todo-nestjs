import { CustomValidationError } from '@rucken/core-nestjs';
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
import { Project1538225369404 } from './project.entity';
import { Status1538225369404 } from './status.entity';

@Entity({ name: 'tasks' })
export class Task1538225369404 {
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

  @Type(() => Project1538225369404)
  @IsNotEmpty()
  @ManyToOne(type => Project1538225369404, { eager: true, nullable: true })
  @JoinColumn({ name: 'project_id' })
  project: Project1538225369404 = undefined;

  @Type(() => Status1538225369404)
  @ManyToOne(type => Status1538225369404, { eager: true, nullable: true })
  @JoinColumn({ name: 'status_id' })
  status: Status1538225369404 = undefined;

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
