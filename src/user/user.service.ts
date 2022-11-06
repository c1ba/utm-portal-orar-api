import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rol } from "src/rol/rol.schema";
import { User, UserCreereInput } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>, @InjectModel('Rol') private readonly rolModel: Model<Rol>) {}

    async gasireTotiUseri() {
        try {
            return this.userModel.find().exec();
        }
        catch(err) {
            throw new InternalServerErrorException(err);
        }
    }

    async creereUser(user: UserCreereInput,  tipRol: ('student' | 'profesor' | 'secretar' | 'admin')) {
        try {
            const dateUser = {nume: user.nume, numarTelefon: user.numarTelefon, eMail: user.eMail};
            const userNou = await this.userModel.create(dateUser);
            const dateRol = tipRol === 'student' ? {tip: tipRol, persoana: userNou._id, facultati: user.rol.facultati.map((facultate)=> {return {an: facultate.an, facultate: facultate.facultate._id}})} : {tip: tipRol, persoana: userNou._id, facultati: user.rol.facultati.map((facultate)=> {return {facultate: facultate.facultate._id}})}
            const rolUser = userNou && await this.rolModel.create(dateRol);
            const updateUser = rolUser && await this.userModel.findByIdAndUpdate(userNou._id, {rol: rolUser}).exec();
            const result = updateUser && await this.userModel.findById(userNou._id).populate({path: 'rol', populate: [{path: 'persoana'}, {path: 'facultati', populate: {path: 'facultate'}}]}).exec();
            if (result) {
                return result;
            }
            else {
                throw new InternalServerErrorException('Ceva nu a mers in procesul creerii userului');
            }
        }
        catch(err) {
            throw new InternalServerErrorException(err);
        }
    }

    async gasireUser(id: string) {
        try {
            const user = await this.userModel.findById(id).populate({path: 'rol', populate: [{path: 'persoana'}, {path: 'facultati', populate: {path: 'facultate', populate: {path: 'cursuri'}}}]}).exec();
            if (!user) {
                throw new NotFoundException("User Negasit");
            }
            return user;
        }
        catch(err) {
            throw new InternalServerErrorException(err);
        }
    }
}