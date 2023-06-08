import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document, Schema as S } from 'mongoose';
import { CreereRolInput, Rol } from 'src/rol/rol.schema';

export const UserSchema = new mongoose.Schema(
  {
    nume: { type: String },
    eMail: { type: String },
    numarTelefon: { type: String },
    rol: { type: S.Types.ObjectId, ref: 'Rol' },
    parola: { type: String },
    sters: { type: Boolean },
  },
  { collection: 'useri' },
);

@Schema()
@ObjectType()
export class User extends Document {
  @Prop()
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field(() => String)
  nume: string;

  @Prop({ required: true })
  @Field(() => String)
  eMail: string;

  @Prop({ required: true })
  @Field(() => String)
  numarTelefon: string;

  @Prop({ type: { type: S.Types.ObjectId, ref: 'Rol' }, required: true })
  @Field(() => Rol)
  rol: Rol;

  @Prop({ required: true })
  @Field(() => String)
  parola: string;

  @Prop({ default: false })
  @Field(() => Boolean)
  sters: boolean;
}

@ObjectType()
export class UserFaraParola {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  nume: string;

  @Field(() => String)
  eMail: string;

  @Field(() => String)
  numarTelefon: string;

  @Field(() => Rol)
  rol: Rol;

  @Field(() => Boolean)
  sters: boolean;
}

@ObjectType()
export class UserWithoutRole {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  nume: string;

  @Field(() => String)
  eMail: string;

  @Field(() => String)
  numarTelefon: string;

  @Field(() => Boolean)
  sters: boolean;
}

@InputType()
export class UserCreereInput {
  @Field(() => String)
  nume: string;

  @Field(() => String)
  eMail: string;

  @Field(() => String)
  numarTelefon: string;

  @Field(() => CreereRolInput)
  rol: CreereRolInput;

  @Field(() => String)
  parola: string;
}

@InputType()
export class UserEditareInput {
  @Field(() => String, { nullable: true })
  nume?: string;

  @Field(() => String, { nullable: true })
  eMail?: string;

  @Field(() => String, { nullable: true })
  numarTelefon?: string;
}

@InputType()
export class UserWhereInput {
  @Field(() => ID, { nullable: true })
  _id?: string;
}
