import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document, Schema as S } from 'mongoose';
import {
  Facultate,
  FacultateFindByIdInput,
  FacultateSchema,
  FacultateWithoutNestedFacultate,
} from 'src/facultate/facultate.schema';
import { User, UserSchema, UserWhereInput } from 'src/user/user.schema';

export const CursSchema = new mongoose.Schema(
  {
    nume: { type: String },
    anCurs: { type: Number },
    facultate: { type: S.Types.ObjectId, ref: 'Facultate' },
    tipPrezentareCurs: { type: String },
    tipCurs: { type: String },
    datiSustinereCurs: [
      { numarZi: { type: Number }, numarOra: { type: Number } },
    ],
    profesorCurs: { type: S.Types.ObjectId, ref: 'User' },
    studentiPrezenti: [{ type: S.Types.ObjectId, ref: 'User' }],
    studentiAbsenti: [
      {
        student: { type: S.Types.ObjectId, ref: 'User' },
        motiv: { type: String },
      },
    ],
  },
  { collection: 'cursuri' },
);

@Schema()
@ObjectType()
export class Curs extends Document {
  @Prop()
  @Field(() => ID)
  _id!: string;

  @Prop({ required: true, type: String })
  @Field(() => String)
  nume!: string;

  @Prop({ required: true, type: Number })
  @Field(() => Int)
  anCurs!: number;

  @Prop({ required: true, type: FacultateSchema })
  @Field(() => Facultate)
  facultate!: Facultate;

  @Prop({ required: true, type: String })
  @Field(() => String)
  tipPrezentareCurs!: string;

  @Prop({ required: true, type: String })
  @Field(() => String)
  tipCurs!: string;

  @Prop({ required: false })
  @Field(() => [DataSustinereCurs])
  datiSustinereCurs?: DataSustinereCurs[];

  @Prop({ required: true, type: UserSchema })
  @Field(() => User)
  profesorCurs!: User;

  @Prop({ required: false, type: UserSchema })
  @Field(() => [User])
  studentiPrezenti?: User[];

  @Prop({ required: false })
  @Field(() => [StudentAbsent])
  studentiAbsenti?: StudentAbsent[];
}

@ObjectType()
export class DataSustinereCurs {
  @Field(() => Int)
  numarZi: number;

  @Field(() => Int)
  numarOra: number;
}

@InputType()
export class DataSustinereCursInput {
  @Field(() => Int, { nullable: true })
  numarZi?: number;

  @Field(() => Int, { nullable: true })
  numarOra?: number;
}

@ObjectType()
export class CursuriWithoutNestedCursuri {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  nume!: string;

  @Field(() => Int)
  anCurs!: number;

  @Field(() => FacultateWithoutNestedFacultate)
  facultate!: FacultateWithoutNestedFacultate;

  @Field(() => String)
  tipPrezentareCurs!: string;

  @Field(() => String)
  tipCurs!: string;

  @Field(() => [DataSustinereCurs])
  datiSustinereCurs?: DataSustinereCurs[];

  @Field(() => User)
  profesorCurs!: User;

  @Field(() => [User])
  studentiPrezenti?: User[];

  @Field(() => [StudentAbsent])
  studentiAbsenti?: StudentAbsent[];
}

@ObjectType()
export class CursuriWithoutFacultate {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  nume!: string;

  @Field(() => Int)
  anCurs!: number;

  @Field(() => String)
  tipPrezentareCurs!: string;

  @Field(() => String)
  tipCurs!: string;

  @Field(() => [DataSustinereCurs])
  datiSustinereCurs?: DataSustinereCurs[];

  @Field(() => User)
  profesorCurs!: User;

  @Field(() => [User])
  studentiPrezenti?: User[];

  @Field(() => [StudentAbsent])
  studentiAbsenti?: StudentAbsent[];
}

@InputType()
export class CursCreereInput {
  @Field(() => String)
  nume!: string;

  @Field(() => Int)
  anCurs!: number;

  @Field(() => FacultateFindByIdInput)
  facultate!: FacultateFindByIdInput;

  @Field(() => String)
  tipPrezentareCurs!: string;

  @Field(() => String)
  tipCurs!: string;

  @Field(() => [DataSustinereCursInput])
  datiSustinereCurs?: DataSustinereCursInput[];

  @Field(() => UserWhereInput)
  profesorCurs!: UserWhereInput;
}

@InputType()
export class CursUpdateInput {
  @Field(() => String, { nullable: true })
  nume?: string;

  @Field(() => Int, { nullable: true })
  anCurs?: number;

  @Field(() => String, { nullable: true })
  tipPrezentareCurs?: string;

  @Field(() => String, { nullable: true })
  tipCurs?: string;

  @Field(() => [DataSustinereCursInput], { nullable: true })
  datiSustinereCurs?: DataSustinereCursInput[];

  @Field(() => UserWhereInput, { nullable: true })
  profesorCurs?: UserWhereInput;

  @Field(() => [UserWhereInput], { nullable: true })
  studentiPrezenti?: UserWhereInput[];

  @Field(() => [StudentAbsentInput], { nullable: true })
  studentiAbsenti?: StudentAbsentInput[];
}

@InputType()
export class ConfirmarePrezentaLaCurs {
  @Field(() => ID, { nullable: false })
  idCurs: string;

  @Field(() => ID, { nullable: false })
  idUser: string;
}

@InputType()
export class ConfirmareAbsentaCursArgs {
  @Field(() => ID, { nullable: false })
  idCurs: string;

  @Field(() => ID, { nullable: false })
  idUser: string;

  @Field(() => String, { nullable: false })
  motivAbsenta: string;
}

@InputType()
export class CursWhereInput {
  @Field(() => ID, { nullable: true })
  _id?: string;
}

@InputType()
export class CursFindManyInput {
  @Field(() => String, { nullable: true })
  nume?: string;

  @Field(() => Int, { nullable: true })
  anCurs!: number;

  @Field(() => String, { nullable: true })
  tipPrezentareCurs?: string;

  @Field(() => String, { nullable: true })
  tipCurs?: string;

  @Field(() => DataSustinereCursInput, { nullable: true })
  datiSustinereCurs?: DataSustinereCursInput;

  @Field(() => FacultateFindByIdInput)
  facultate: FacultateFindByIdInput;

  @Field(() => [UserWhereInput], { nullable: true })
  profesorCurs?: UserWhereInput[];
}

@ObjectType()
export class StudentAbsent {
  @Field(() => User)
  student: User;

  @Field(() => String)
  motiv: string;
}

@InputType()
export class StudentAbsentInput {
  @Field(() => UserWhereInput)
  student: UserWhereInput;

  @Field(() => String)
  motiv: string;
}
