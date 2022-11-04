import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Facultate } from "src/facultate/facultate.schema";
import { Curs, CursCreereInput, CursFindManyInput, CursUpdateInput } from "./curs.schema";

@Injectable()
export class CursService {
    constructor(@InjectModel('Curs') private readonly cursModel: Model<Curs>, @InjectModel('Facultate') private readonly facultateModel: Model<Facultate>) {
    }
    async helloWorld() {
        return await "Hello World";
    }

    async creereCurs(curs: CursCreereInput) {
       try {
            const cursNou = await (await this.cursModel.create(curs)).populate({path: 'facultate', populate: { path: 'cursuri'}});
            if(cursNou) {
                const totalCursuri = await this.cursModel.find({facultate: {_id: curs.facultate._id}}).exec();
                const updateCursuriFacultate = await this.facultateModel.findByIdAndUpdate(curs.facultate._id, {cursuri: totalCursuri});
                if (updateCursuriFacultate && totalCursuri) {
                    return cursNou;
                }
            }
            throw new NotFoundException(`Curs Nefacut`);
       }
       catch(err) {
        throw new InternalServerErrorException(err);
       }
    }

    async gasireTotalCursuri() {
        try {
            return await this.cursModel.find().populate('facultate').exec();
        }
        catch(err) {
            throw new InternalServerErrorException(err);
        }
    }

    async gasireCurs(id: string) {
        try {
            const curs = await this.cursModel.findById(id).populate({path: 'facultate', populate: {path: 'cursuri'}}).exec();
            if (!curs) {
                throw new NotFoundException(`Userul Nu a fost Gasit`);
            }
            return curs;
        }
        catch(err) {
            throw new InternalServerErrorException(err);
        }
    }

    async editareCurs(id: string, inputEditareCurs: CursUpdateInput) {
        try {
            const curs = await this.cursModel.findByIdAndUpdate(id, {$set: inputEditareCurs}, {new: true}).exec();
            if (!curs) {
                throw new NotFoundException(`Userul Nu a Fost Gasit`);
            }
            return curs;
        }
        catch(err) {
            throw new InternalServerErrorException(err);
        }
    }

    async gasireCursuri(inputCurs: CursFindManyInput) {
        try {
            let query = {};
            if(inputCurs.nume) {
                query['nume'] = inputCurs.nume;
            }
            if(inputCurs.anCurs) {
                query['anCurs'] = inputCurs.anCurs;
            }
            if(inputCurs.tipCurs) {
                query['tipCurs'] = inputCurs.tipCurs;
            }
            if(inputCurs.tipPrezentareCurs) {
                query['tipPrezentareCurs'] = inputCurs.tipPrezentareCurs;
            }
            if(inputCurs.datiSustinereCurs.numarOra) {
                query['datiSustinereCurs.numarOra'] = inputCurs.datiSustinereCurs.numarOra;
            }
            if(inputCurs.datiSustinereCurs.numarZi) {
                query['datiSustinereCurs.numarZi'] = inputCurs.datiSustinereCurs.numarZi;
            }
            return await this.cursModel.find(query).populate({path: 'facultate', populate: {path: 'cursuri'}}).exec();
        }
        catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}