import { CustomValidationError, User1524199022084 } from '@rucken/core-nestjs';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, validateSync } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status1552133567377 } from './status.entity';
import { Task1552133567377 } from './task.entity';

@Entity({ name: 'projects' })
export class Project1552133567377 {
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

  @OneToMany(type => Status1552133567377, status => status.project)
  statuses: Status1552133567377[];

  @OneToMany(type => Task1552133567377, task => task.project)
  tasks: Task1552133567377[];

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

  @Type(() => User1524199022084)
  @ManyToOne(type => User1524199022084, { eager: true, nullable: true })
  @JoinColumn({ name: 'created_user_id' })
  createdUser: User1524199022084 = undefined;

  @Type(() => User1524199022084)
  @ManyToOne(type => User1524199022084, { eager: true, nullable: true })
  @JoinColumn({ name: 'updated_user_id' })
  updatedUser: User1524199022084 = undefined;

  @Column({
    name: 'tasksCount',
    select: false,
    nullable: true
  })
  tasksCount: number = undefined;

  @Column({
    name: 'completedTasksCount',
    select: false,
    nullable: true
  })
  completedTasksCount: number = undefined;

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
