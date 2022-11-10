import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursModule } from './curs/curs.module';
import { FacultateModule } from './facultate/facultate.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://teeheejackson02:teehee123@practicecluster.grofc.mongodb.net/?retryWrites=true&w=majority',
    ),
    CursModule,
    FacultateModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
