import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@rucken/auth-nestjs';
import { CoreModule } from '@rucken/core-nestjs';
import { TodoModule } from '@rucken/todo-nestjs';
@Module({})
export class AppModule {
  static forRoot(options: { providers: Provider[]; passportProviders: Provider[] }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        CoreModule.forRoot(options),
        AuthModule.forRoot(options),
        TodoModule.forRoot(options),
        TypeOrmModule.forRoot()
      ],
      providers: [...(options.passportProviders ? options.passportProviders : [])]
    };
  }
}
