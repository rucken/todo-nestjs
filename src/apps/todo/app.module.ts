import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@todo-nestjs/auth';
import { CoreModule } from '@todo-nestjs/core';
import { TodoModule } from './todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CoreModule, AuthModule, TodoModule]
})
export class AppModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRoot(),
        CoreModule.forRoot(options),
        AuthModule.forRoot(options),
        TodoModule.forRoot(options)
      ]
    };
  }
}
