import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import ynv from './envConfig';

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
    type: ynv.db.type,
    username: ynv.db.username,
    password: ynv.db.password,
    database: ynv.db.database,
    host: ynv.db.host,
    port: ynv.db.port,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: ynv.db.synchronize,
  },
};
