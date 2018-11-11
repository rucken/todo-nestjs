import {
  serializeModel,
  transformDateToString,
  transformStringToDate,
  transformStringToObject,
  translate
} from '@rucken/core';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DateTime } from 'luxon';
import { IModel } from 'ngx-repository';
import { Project } from './project';
import { Status } from './status';

export class Task implements IModel {
  static strings = {
    id: translate('Id'),
    project: translate('Project'),
    title: translate('Title'),
    description: translate('Description'),
    status: translate('Status'),
    openAt: translate('Open at'),
    closeAt: translate('Close at'),
    createdAt: translate('Created at'),
    updatedAt: translate('Updated at'),
    range: translate('Range'),
    createTitle: translate('Add new task'),
    viewTitle: translate('Task #{{id}}'),
    updateTitle: translate('Update task #{{id}}'),
    deleteTitle: translate('Delete task #{{id}}'),
    deleteMessage: translate('Do you really want to delete task?')
  };
  id: number = undefined;
  @IsNotEmpty()
  @Type(serializeModel(Project))
  @Transform(transformStringToObject, { toPlainOnly: true })
  project: Project = undefined;
  @IsNotEmpty()
  title: string = undefined;
  description: string = undefined;
  @IsNotEmpty()
  @Type(serializeModel(Status))
  @Transform(transformStringToObject, { toPlainOnly: true })
  status: Status = undefined;
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  openAt: Date = undefined;
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  closeAt: Date = undefined;
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  createdAt: Date = undefined;
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  updatedAt: Date = undefined;
  toString() {
    return this.title;
  }
  get range() {
    const arr: string[] = [];
    if (this.openAt) {
      arr.push(DateTime.fromJSDate(this.openAt).toLocaleString());
    }
    if (this.openAt && this.closeAt) {
      arr.push(' - ');
    }
    if (this.closeAt) {
      arr.push(DateTime.fromJSDate(this.closeAt).toLocaleString());
    }
    return arr.join('');
  }
}
