import { CustomValidationError, User1524199022084 } from '@rucken/core-nestjs';
import { IsNotEmpty, IsOptional, MaxLength, validateSync } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Status1538225369404 } from './status.entity';
import { Task1538225369404 } from './task.entity';

@Entity({ name: 'projects' })
export class Project1538225369404 {
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

  @OneToMany(type => Status1538225369404, status => status.project)
  statuses: Status1538225369404[];

  @OneToMany(type => Task1538225369404, task => task.project)
  tasks: Task1538225369404[];

  @ManyToMany(type => User1524199022084, {
    cascade: true
  })
  @JoinTable({
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
  users: User1524199022084[];

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
