import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import {
  IRestProviderOptions,
  PaginationMeta,
  ProviderActionEnum
} from 'ngx-repository';
import { Project } from '../models/project';

export const defaultProjectsConfig: IRestProviderOptions<Project> = {
  name: 'project',
  pluralName: 'projects',
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
          return plainToClass(Project, data.body.projects);
        } else {
          return plainToClass(Project, data.body.project);
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
export const PROJECTS_CONFIG_TOKEN = 'ProjectsConfig';
