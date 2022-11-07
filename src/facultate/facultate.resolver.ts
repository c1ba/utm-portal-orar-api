import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Facultate,
  FacultateCreereInput,
  FacultateWithoutCursuri,
} from './facultate.schema';
import { FacultateService } from './facultate.service';

@Resolver()
export class FacultateResolver {
  constructor(private facultateService: FacultateService) {}

  @Query(() => [Facultate])
  async gasireTotalFacultati() {
    return await this.facultateService.gasireTotalFacultati();
  }

  @Query(() => Facultate)
  async gasireFacultate(@Args('id') id: string) {
    return await this.facultateService.gasireFacultate(id);
  }

  @Mutation(() => Facultate)
  async creereFacultate(@Args('facultate') facultate: FacultateCreereInput) {
    return await this.facultateService.creereFacultate(facultate);
  }

  @Mutation(() => FacultateWithoutCursuri)
  async stergereFacultate(@Args('id') id: string) {
    return await this.facultateService.stergereFacultate(id);
  }
}
