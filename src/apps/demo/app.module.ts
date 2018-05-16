import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '../../libs/core/core.module';
import { entities } from '../../libs/core/entities/index';
import { TodoModule } from '../../libs/todo/todo.module';

@Module({
  modules: [
    TypeOrmModule.forRoot(),
    CoreModule,
    TodoModule
  ],
  controllers: []
})
export class AppModule { }
