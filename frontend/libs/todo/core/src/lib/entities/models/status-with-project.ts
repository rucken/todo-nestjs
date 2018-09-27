import {
  serializeModel,
  transformStringToObject,
  translate
} from '@rucken/core';
import { Transform, Type } from 'class-transformer';
import { Project } from './project';
import { Status } from './status';

export class StatusWithProject extends Status {
  static strings: any = {
    ...Status.strings,
    project: translate('Project')
  };
  @Type(serializeModel(Project))
  @Transform(transformStringToObject, { toPlainOnly: true })
  project: Project = undefined;
}
