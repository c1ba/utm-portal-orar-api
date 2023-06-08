import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursSchema } from './curs.schema';
import { CursResolver } from './curs.resolver';
import { CursService } from './curs.service';
import { FacultateSchema } from 'src/facultate/facultate.schema';
import { UserSchema } from 'src/user/user.schema';
import { LoggerModule } from 'src/logging/logger.module';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([
      { name: 'Curs', schema: CursSchema },
      { name: 'Facultate', schema: FacultateSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [CursService, CursResolver],
})
export class CursModule {}
