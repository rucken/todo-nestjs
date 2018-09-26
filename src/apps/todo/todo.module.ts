import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '@todo-nestjs/core';
import { configs } from './configs';
import { controllers } from './controllers';
import { entities } from './entities';
import { services } from './services';

@Module({
  imports: [TypeOrmModule.forFeature(entities), CoreModule.forFeature()],
  controllers: [...controllers],
  providers: [...configs, ...services],
  exports: [...configs, ...services]
})
export class TodoModule {
  static forFeature(): DynamicModule {
    return {
      module: TodoModule,
      providers: [...services],
      exports: [...configs, ...services]
    };
  }
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: TodoModule,
      imports: [TypeOrmModule.forFeature(entities), CoreModule.forFeature()],
      controllers: [...controllers],
      providers: [...configs, ...options.providers, ...services],
      exports: [...configs, ...services]
    };
  }
}
