import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '@rucken/core-nestjs';
import { TODO_CONFIG } from './configs';
import { TODO_CONTROLLERS } from './controllers';
import { TODO_ENTITIES } from './entities';
import { TODO_SERVICES } from './services';

@Module({
  imports: [CoreModule.forFeature(), TypeOrmModule.forFeature(TODO_ENTITIES)],
  controllers: [...TODO_CONTROLLERS],
  providers: [...TODO_CONFIG, ...TODO_SERVICES],
  exports: [...TODO_CONFIG, ...TODO_SERVICES]
})
export class TodoModule {
  static forFeature(): DynamicModule {
    return {
      module: TodoModule,
      providers: [...TODO_SERVICES],
      exports: [...TODO_CONFIG, ...TODO_SERVICES]
    };
  }
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: TodoModule,
      imports: [CoreModule.forFeature(), TypeOrmModule.forFeature(TODO_ENTITIES)],
      controllers: [...TODO_CONTROLLERS],
      providers: [...TODO_CONFIG, ...options.providers, ...TODO_SERVICES],
      exports: [...TODO_CONFIG, ...TODO_SERVICES]
    };
  }
}
