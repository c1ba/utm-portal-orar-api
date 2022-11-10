import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursSchema } from './curs.schema';
import { CursResolver } from './curs.resolver';
import { CursService } from './curs.service';
import { FacultateSchema } from 'src/facultate/facultate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Curs', schema: CursSchema },
      { name: 'Facultate', schema: FacultateSchema },
    ]),
  ],
  providers: [CursService, CursResolver],
})
export class CursModule {}
