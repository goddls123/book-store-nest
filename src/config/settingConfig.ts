import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

interface ISettingConfig {
  graphql: ApolloDriverConfig;
  typeorm: TypeOrmModuleOptions;
}

export const SettingConfig: ISettingConfig = {
  graphql: {
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: 'schema.gql',
  },
  typeorm: {
    type: 'postgres',
    username: 'postgres',
    password: 'qwer1234',
    database: 'bookstore',
    host: '127.0.0.1',
    port: 5432,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
  },
};
