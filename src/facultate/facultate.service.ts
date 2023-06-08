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
      return await this.facultateModel
        .find({ sters: false })
        .populate({
          path: 'cursuri',
          match: { sters: false },
          populate: [
            { path: 'profesorCurs' },
            { path: 'studentiPrezenti' },
            { path: 'studentiAbsenti', populate: { path: 'student' } },
          ],
        })
        .exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async creereFacultate(facultate: FacultateCreereInput) {
    try {
      return await (
        await this.facultateModel.create({ ...facultate, sters: false })
      ).populate({
        path: 'cursuri',
        match: { sters: false },
        populate: [
          { path: 'profesorCurs' },
          { path: 'studentiPrezenti' },
          { path: 'studentiAbsenti', populate: { path: 'student' } },
        ],
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async gasireFacultate(id: string) {
    try {
      const facultate = await this.facultateModel
        .findById(id)
        .populate({
          path: 'cursuri',
          match: { sters: false },
          populate: [
            { path: 'profesorCurs' },
            { path: 'studentiPrezenti' },
            { path: 'studentiAbsenti', populate: { path: 'student' } },
          ],
        })
        .exec();
      if (!facultate || facultate.sters) {
        throw new NotFoundException('Facultate Negasita');
      }
      return facultate;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async stergereFacultate(id: string) {
    try {
      const result = await this.facultateModel.findByIdAndUpdate(id, {
        sters: true,
      });
      if (result) {
        const stergereCursuriFacultate = await this.cursModel.updateMany(
          {
            facultate: id,
          },
          { sters: true },
        );
        if (stergereCursuriFacultate) {
          return result;
        }
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
