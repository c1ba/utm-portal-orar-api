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
import { ClsModule } from 'nestjs-cls';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) =>
          req.headers['X-Request-Id'] ?? randomUUID(),
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV === 'development',
      debug: process.env.NODE_ENV === 'development',
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
