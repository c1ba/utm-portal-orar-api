import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AuthModule } from './auth/auth.module';
import { CursModule } from './curs/curs.module';
import { FacultateModule } from './facultate/facultate.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      debug: true,
      autoSchemaFile: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    CursModule,
    FacultateModule,
    UserModule,
  ],
})
export class AppModule {}
