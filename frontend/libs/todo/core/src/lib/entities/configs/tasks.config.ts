import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import {
  IRestProviderOptions,
  PaginationMeta,
  ProviderActionEnum
} from 'ngx-repository';
import { Task } from '../models/task';

export const defaultTasksConfig: IRestProviderOptions<Task> = {
  name: 'task',
  pluralName: 'tasks',
  autoload: true,
  paginationMeta: {
    perPage: 5
  },
  actionOptions: {
    responseData: (data: any, action: ProviderActionEnum) => {
      if (action === ProviderActionEnum.Delete) {
        return true;
      } else {
        if (action === ProviderActionEnum.LoadAll) {
          return plainToClass(Task, data.body.tasks);
        } else {
          return plainToClass(Task, data.body.task);
        }
      }
    },
    responsePaginationMeta: (
      data: any,
      action: ProviderActionEnum
    ): PaginationMeta => {
      return { totalResults: data.body.meta.totalResults, perPage: undefined };
    }
  },
  restOptions: {
    limitQueryParam: 'per_page',
    pageQueryParam: 'cur_page',
    searchTextQueryParam: 'q'
  }
};
export const TASKS_CONFIG_TOKEN = 'TasksConfig';
