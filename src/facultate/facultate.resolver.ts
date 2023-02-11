import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRequired, isAdmin } from 'src/auth/auth.decorators';
import {
  Facultate,
  FacultateCreereInput,
  FacultateWithoutCursuri,
} from './facultate.schema';
import { FacultateService } from './facultate.service';

@Resolver()
export class FacultateResolver {
  constructor(private facultateService: FacultateService) {}

  @AuthRequired()
  @Query(() => [Facultate])
  async gasireTotalFacultati() {
    return await this.facultateService.gasireTotalFacultati();
  }

  @AuthRequired()
  @Query(() => Facultate)
  async gasireFacultate(@Args('id') id: string) {
    return await this.facultateService.gasireFacultate(id);
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => Facultate)
  async creereFacultate(@Args('facultate') facultate: FacultateCreereInput) {
    return await this.facultateService.creereFacultate(facultate);
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => FacultateWithoutCursuri)
  async stergereFacultate(@Args('id') id: string) {
    return await this.facultateService.stergereFacultate(id);
  }
}
