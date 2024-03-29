import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRequired, RequestUserID, isAdmin } from 'src/auth/auth.decorators';
import {
  Facultate,
  FacultateCreereInput,
  FacultateWithoutCursuri,
} from './facultate.schema';
import { FacultateService } from './facultate.service';
import { CustomLogger } from 'src/logging/logger.service';
import { GraphQLError } from 'graphql';

@Resolver()
export class FacultateResolver {
  constructor(
    private facultateService: FacultateService,
    private logger: CustomLogger,
  ) {}

  @AuthRequired()
  @Query(() => [Facultate])
  async gasireTotalFacultati(@RequestUserID() requestingUserId: string) {
    try {
      const result = await this.facultateService.gasireTotalFacultati();
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.gasireTotalFacultati.name} executata cu succes.`,
          { requestingUserId: requestingUserId },
        );
        return result;
      }
    } catch (err) {
      this.logger.error(err);
      throw new GraphQLError(err);
    }
  }

  @AuthRequired()
  @Query(() => Facultate)
  async gasireFacultate(
    @Args('id') id: string,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.facultateService.gasireFacultate(id);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.gasireFacultate.name} executata cu succes.`,
          { requestingUserId: requestingUserId },
        );
        return result;
      }
    } catch (err) {
      this.logger.error(err);
      throw new GraphQLError(err);
    }
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => Facultate)
  async creereFacultate(
    @Args('facultate') facultate: FacultateCreereInput,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.facultateService.creereFacultate(facultate);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.creereFacultate.name} executata cu succes.`,
          { requestingUserId: requestingUserId },
        );
        return result;
      }
    } catch (err) {
      this.logger.error(err);
      throw new GraphQLError(err);
    }
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => FacultateWithoutCursuri)
  async stergereFacultate(
    @Args('id') id: string,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.facultateService.stergereFacultate(id);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.stergereFacultate.name} executata cu succes.`,
          { requestingUserId: requestingUserId },
        );
        return result;
      }
    } catch (err) {
      this.logger.error(err);
      throw new GraphQLError(err);
    }
  }
}
