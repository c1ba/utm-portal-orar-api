import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, {Schema as S} from "mongoose";
import { FacultateFindByIdInput, FacultateWithoutCursuri } from "src/facultate/facultate.schema";
import { User } from "src/user/user.schema";

export const RolSchema = new mongoose.Schema({
    tip: {type: String, required: true},
    persoana: {type: S.Types.ObjectId, ref: 'User', required: true},
    facultati: [{type: {an: {type: Number}, facultate: {type: S.Types.ObjectId, ref: 'Facultate', required: true}}}]
}, {collection: 'roluri'});

@ObjectType()
export class FacultateRol {
    @Field(()=> Int, {nullable: true})
    an?: number;

    @Field(()=> FacultateWithoutCursuri)
    facultate: FacultateWithoutCursuri;
}

@Schema()
@ObjectType()
export class Rol {
    @Prop()
    @Field(()=> ID)
    _id: string;

    @Prop()
    @Field(()=> String)
    tip: string;

    @Prop({type: S.Types.ObjectId, ref: 'User', required: true})
    @Field(()=> User)
    persoana: User;

    @Prop({type: [{an: {type: Number}, facultate: {type: S.Types.ObjectId, ref: 'Facultate'}}], required: true})
    @Field(()=> [FacultateRol])
    facultati: FacultateRol[];

}

@InputType()
export class FacultateRolInput {

    @Field(()=> Int, {nullable: true})
    an?: number;

    @Field(()=>FacultateFindByIdInput)
    facultate: FacultateFindByIdInput;
}

@InputType()
export class CreereRolInput {

    @Field(()=> String)
    tip: string;

    @Field(()=> [FacultateRolInput])
    facultati: FacultateRolInput[];
}