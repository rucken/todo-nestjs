import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuckenCoreModule } from '@rucken/core-nestjs';
import { TODO_CONTROLLERS } from './controllers';
import { TODO_ENTITIES } from './entities';
import { TODO_SERVICES } from './services';

@Module({})
export class RuckenTodoModule {
  static forFeature(options: { providers: Provider[] }): DynamicModule {
    return {
      module: RuckenTodoModule,
      imports: [RuckenCoreModule.forFeature(options), TypeOrmModule.forFeature(TODO_ENTITIES)],
      providers: [...options.providers, ...TODO_SERVICES],
      exports: [...TODO_SERVICES]
    };
  }
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: RuckenTodoModule,
      imports: [RuckenCoreModule.forFeature(options), TypeOrmModule.forFeature(TODO_ENTITIES)],
      controllers: [...TODO_CONTROLLERS],
      providers: [...options.providers, ...TODO_SERVICES],
      exports: [...TODO_SERVICES]
    };
  }
}
