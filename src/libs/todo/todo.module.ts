import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { controllers } from './controllers/index';
import { entities } from './entities/index';
import { services } from './services/index';
import { CoreModule } from '../core/core.module';


@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([
      ...entities
    ])
  ],
  controllers: [
    ...controllers
  ],
  components: [
    ...services
  ],
  exports: [
    ...services
  ]
})
export class TodoModule {
}
