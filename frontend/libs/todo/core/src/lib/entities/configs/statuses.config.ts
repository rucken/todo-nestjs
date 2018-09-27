import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import {
  IRestProviderOptions,
  PaginationMeta,
  ProviderActionEnum
} from 'ngx-repository';
import { Status } from '../models/status';

export const defaultStatusesConfig: IRestProviderOptions<Status> = {
  name: 'status',
  pluralName: 'statuses',
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
          return plainToClass(Status, data.body.statuses);
        } else {
          return plainToClass(Status, data.body.status);
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
export const STATUSES_CONFIG_TOKEN = 'StatusesConfig';
