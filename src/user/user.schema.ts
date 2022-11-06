import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Document, Schema as S, Types } from "mongoose";
import { CreereRolInput, Rol, RolSchema } from "src/rol/rol.schema";

export const UserSchema = new mongoose.Schema({
    nume: {type: String},
    eMail: {type: String},
    numarTelefon: {type: String},
    rol: {type: S.Types.ObjectId, ref: 'Rol'}
}, {collection: 'useri'});

@Schema()
@ObjectType()
export class User extends Document {

    @Prop()
    @Field(()=> ID)
    _id: string;

    @Prop({required: true})
    @Field(()=> String)
    nume: string;

    @Prop({required: true})
    @Field(()=> String)
    eMail: string;

    @Prop({required: true})
    @Field(()=> String)
    numarTelefon: string;

    @Prop({type: {type: S.Types.ObjectId, ref: 'Rol'}, required: true})
    @Field(()=> Rol)
    rol: Rol;
}

@ObjectType()
export class UserWithoutRole {
    @Prop()
    @Field(()=> ID)
    _id: string;

    @Prop({required: true})
    @Field(()=> String)
    nume: string;

    @Prop({required: true})
    @Field(()=> String)
    eMail: string;

    @Prop({required: true})
    @Field(()=> String)
    numarTelefon: string;
}

@InputType()
export class UserCreereInput {

    @Field(()=> String)
    nume: string;

    @Field(()=> String)
    eMail: string;

    @Field(()=> String)
    numarTelefon: string;

    @Field(()=> CreereRolInput)
    rol: CreereRolInput;
}

@InputType()
export class UserEditareInput {

    @Field(()=> String, {nullable: true})
    nume?: string;

    @Field(()=> String, {nullable: true})
    eMail?: string;

    @Field(()=> String, {nullable: true})
    numarTelefon?: string;
}

@InputType()
export class UserWhereInput {

    @Field(()=> ID, {nullable: true})
    _id?: string;
}