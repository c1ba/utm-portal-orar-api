import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rol } from 'src/rol/rol.schema';
import { User, UserCreereInput } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Rol') private readonly rolModel: Model<Rol>,
    private readonly jwtService: JwtService,
  ) {}

  async gasireTotiUseri() {
    try {
      return this.userModel
        .find()
        .populate({
          path: 'rol',
          populate: [
            { path: 'facultati', populate: { path: 'facultate' } },
            { path: 'persoana' },
          ],
        })
        .exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async creereUser(
    user: UserCreereInput,
    tipRol: 'student' | 'profesor' | 'secretar' | 'admin',
  ) {
    try {
      const userSalt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
      const parolaHashed = await bcrypt.hash(user.parola, userSalt);
      const dateUser = {
        nume: user.nume,
        numarTelefon: user.numarTelefon,
        eMail: user.eMail,
        parola: parolaHashed,
      };
      const userNou = await this.userModel.create(dateUser);
      const dateRol =
        tipRol === 'student'
          ? {
              tip: tipRol,
              persoana: userNou._id,
              facultati: user.rol.facultati.map((facultate) => {
                return { an: facultate.an, facultate: facultate.facultate._id };
              }),
            }
          : {
              tip: tipRol,
              persoana: userNou._id,
              facultati: user.rol.facultati.map((facultate) => {
                return { facultate: facultate.facultate._id };
              }),
            };
      const rolUser = userNou && (await this.rolModel.create(dateRol));
      const updateUser =
        rolUser &&
        (await this.userModel
          .findByIdAndUpdate(userNou._id, { rol: rolUser })
          .exec());
      const result =
        updateUser &&
        (await this.userModel
          .findById(userNou._id)
          .populate({
            path: 'rol',
            populate: [
              { path: 'persoana' },
              { path: 'facultati', populate: { path: 'facultate' } },
            ],
          })
          .exec());
      if (result) {
        return result;
      } else {
        throw new InternalServerErrorException(
          'Ceva nu a mers in procesul creerii userului',
        );
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async gasireUser(id: string) {
    try {
      const user = await this.userModel
        .findById(id)
        .populate({
          path: 'rol',
          populate: [
            { path: 'persoana' },
            {
              path: 'facultati',
              populate: { path: 'facultate', populate: { path: 'cursuri' } },
            },
          ],
        })
        .exec();
      if (!user) {
        throw new NotFoundException('User Negasit');
      }
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async logare(email: string, parola: string) {
    try {
      const userExists = await this.userModel.find({ eMail: email }).exec();
      if (!userExists || userExists.length === 0) {
        throw new UnauthorizedException('Userul nu exista');
      }
      const parolaHashed = userExists[0].parola;
      const result = await bcrypt.compare(parola, parolaHashed);
      if (!result) {
        throw new UnauthorizedException('Date de logare gresite');
      }
      const rol = await this.rolModel.findById(userExists[0].rol);
      const payload = {
        id: userExists[0]._id,
        rol: rol.tip,
      };
      const token = this.jwtService.sign(payload, {
        expiresIn: '3h',
      });
      return token;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
