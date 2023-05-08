import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { RateLimiterPlugin } from './apollo-custom/rate-limiter-plugin';
import { AuthModule } from './auth/auth.module';
import { CursModule } from './curs/curs.module';
import { FacultateModule } from './facultate/facultate.module';
import { UserModule } from './user/user.module';
import { DepthLimitPlugin } from './apollo-custom/depth-limit-plugin';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      autoSchemaFile: true,
      plugins: [
        new DepthLimitPlugin({ depthLimit: 15 }),
        new RateLimiterPlugin({
          maximumCalls: 10,
          intervalInMilliseconds: 1000,
        }),
      ],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    CursModule,
    FacultateModule,
    UserModule,
  ],
})
export class AppModule {}
