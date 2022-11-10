import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Curs } from 'src/curs/curs.schema';
import { Facultate, FacultateCreereInput } from './facultate.schema';

@Injectable()
export class FacultateService {
  constructor(
    @InjectModel('Facultate') private readonly facultateModel: Model<Facultate>,
    @InjectModel('Curs') private readonly cursModel: Model<Curs>,
  ) {}

  async gasireTotalFacultati() {
    try {
      return await this.facultateModel.find().populate('cursuri').exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async creereFacultate(facultate: FacultateCreereInput) {
    try {
      return await (
        await this.facultateModel.create(facultate)
      ).populate('cursuri');
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async gasireFacultate(id: string) {
    try {
      const facultate = await this.facultateModel
        .findById(id)
        .populate({ path: 'cursuri' })
        .exec();
      if (!facultate) {
        throw new NotFoundException('Facultate Negasita');
      }
      return facultate;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async stergereFacultate(id: string) {
    try {
      const result = await this.facultateModel.findByIdAndDelete(id).exec();
      if (result) {
        const stergereCursuriFacultate = await this.cursModel.deleteMany({
          facultate: id,
        });
        if (stergereCursuriFacultate) {
          return result;
        }
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
