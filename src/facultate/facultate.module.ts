import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursSchema } from 'src/curs/curs.schema';
import { FacultateResolver } from './facultate.resolver';
import { FacultateSchema } from './facultate.schema';
import { FacultateService } from './facultate.service';
import { LoggerModule } from 'src/logging/logger.module';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([
      { name: 'Facultate', schema: FacultateSchema },
      { name: 'Curs', schema: CursSchema },
    ]),
  ],
  providers: [FacultateService, FacultateResolver],
})
export class FacultateModule {}
