import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Schema as S } from 'mongoose';
import {
  Curs,
  CursSchema,
  CursuriWithoutFacultate,
  CursWhereInput,
} from 'src/curs/curs.schema';

export const FacultateSchema = new mongoose.Schema(
  {
    domeniu: { type: String },
    cursuri: [{ type: S.Types.ObjectId, ref: 'Curs' }],
    sters: { type: Boolean },
  },
  { collection: 'facultati' },
);

@Schema()
@ObjectType()
export class Facultate extends Document {
  @Prop()
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field(() => String)
  domeniu: string;

  @Prop({ required: false, type: CursSchema })
  @Field(() => [Curs], { nullable: true })
  @Type(() => Curs)
  cursuri?: Curs[];

  @Prop({ default: false })
  @Field(() => Boolean)
  sters: boolean;
}

@ObjectType()
export class FacultateWithoutCursuri {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  domeniu: string;

  @Field(() => Boolean)
  sters: boolean;
}

@ObjectType()
export class FacultateWithoutNestedFacultate {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  domeniu: string;

  @Field(() => [CursuriWithoutFacultate])
  cursuri?: CursuriWithoutFacultate[];

  @Field(() => Boolean)
  sters: boolean;
}

@InputType()
export class FacultateCreereInput {
  @Field(() => String)
  domeniu: string;

  @Field(() => [CursWhereInput], { nullable: true })
  cursuri?: CursWhereInput[];
}

@InputType()
export class FacultateUpdateInput {
  @Field(() => String, { nullable: true })
  domeniu: string;

  @Field(() => [CursWhereInput], { nullable: true })
  cursuri?: CursWhereInput[];

  @Field(() => Boolean, { nullable: true })
  sters?: boolean;
}

@InputType()
export class FacultateFindByIdInput {
  @Field(() => ID, { nullable: true })
  _id?: string;
}

@InputType()
export class FacultateFindManyInput extends FacultateFindByIdInput {
  @Field(() => String, { nullable: true })
  domeniu?: string;
}

@InputType()
export class FacultateFindOneOrCreateInput {
  @Field(() => FacultateCreereInput, { nullable: true })
  @Type(() => FacultateCreereInput)
  create?: FacultateCreereInput;

  @Field(() => FacultateFindByIdInput, { nullable: true })
  @Type(() => FacultateFindByIdInput)
  find?: FacultateFindByIdInput;
}
