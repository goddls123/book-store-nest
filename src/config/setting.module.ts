import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SettingConfig } from './settingConfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(SettingConfig.graphql),
    TypeOrmModule.forRoot(SettingConfig.typeorm),
  ],
})
export class SettingModule {}
