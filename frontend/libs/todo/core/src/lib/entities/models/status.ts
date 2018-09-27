import {
  transformDateToString,
  transformStringToDate,
  translate
} from '@rucken/core';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IModel } from 'ngx-repository';

export class Status implements IModel {
  static strings = {
    id: translate('Id'),
    name: translate('Name'),
    title: translate('Title'),
    project: translate('Project'),
    createdAt: translate('Created at'),
    updatedAt: translate('Updated at'),

    createTitle: translate('Add new status'),
    viewTitle: translate('Status #{{id}}'),
    updateTitle: translate('Update status #{{id}}'),
    deleteTitle: translate('Delete status #{{id}}'),
    deleteMessage: translate('Do you really want to delete status?')
  };
  id: number = undefined;
  @IsNotEmpty()
  name: string = undefined;
  title: string = undefined;
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  createdAt: Date = undefined;
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  updatedAt: Date = undefined;

  toString() {
    return this.title;
  }
}
