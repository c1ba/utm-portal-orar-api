import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthRequired, RequestUserID, isAdmin } from 'src/auth/auth.decorators';
import {
  ConfirmareAbsentaCursArgs,
  ConfirmarePrezentaLaCurs,
  Curs,
  CursCreereInput,
  CursFindManyInput,
  CursUpdateInput,
  CursuriWithoutNestedCursuri,
} from './curs.schema';
import { CursService } from './curs.service';
import { CustomLogger } from 'src/logging/logger.service';
import { GraphQLError } from 'graphql';

@Resolver()
export class CursResolver {
  constructor(private cursService: CursService, private logger: CustomLogger) {}

  @AuthRequired()
  @Query(() => [Curs])
  async gasireTotalCursuri(@RequestUserID() requestingUserId: string) {
    try {
      const result = await this.cursService.gasireTotalCursuri();
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.gasireTotalCursuri.name} executata cu succes.`,
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
  @Query(() => Curs)
  async gasireCurs(
    @Args('id') id: string,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.cursService.gasireCurs(id);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.gasireCurs.name} executata cu succes.`,
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
  @Query(() => [CursuriWithoutNestedCursuri])
  async gasireCursuri(
    @Args('cursInput') cursInput: CursFindManyInput,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.cursService.gasireCursuri(cursInput);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.gasireCursuri.name} executata cu succes.`,
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
  @Mutation(() => CursuriWithoutNestedCursuri)
  async creereCurs(
    @Args('curs') curs: CursCreereInput,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.cursService.creereCurs(curs);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.creereCurs.name} executata cu succes.`,
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
  @Mutation(() => CursuriWithoutNestedCursuri)
  async editareCurs(
    @Args('id') id: string,
    @Args('inputEditareCurs') inputEditareCurs: CursUpdateInput,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.cursService.editareCurs(id, inputEditareCurs);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.editareCurs.name} executata cu succes.`,
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
  @Mutation(() => CursuriWithoutNestedCursuri)
  async stergereCurs(
    @Args('id') id: string,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.cursService.stergereCurs(id);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.stergereCurs.name} executata cu succes.`,
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
  @Mutation(() => [CursuriWithoutNestedCursuri])
  async stergereCursuri(
    @Args('inputFindCursuri') inputFindCursuri: CursFindManyInput,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.cursService.stergereCursuri(inputFindCursuri);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.stergereCursuri.name} executata cu succes.`,
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
  @Mutation(() => CursuriWithoutNestedCursuri)
  async confirmarePrezentaLaCurs(
    @Args('args') args: ConfirmarePrezentaLaCurs,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.cursService.confirmarePrezentaLaCurs(args);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.confirmarePrezentaLaCurs.name} executata cu succes.`,
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
  @Mutation(() => CursuriWithoutNestedCursuri)
  async confirmareAbsentaLaCurs(
    @Args('args') args: ConfirmareAbsentaCursArgs,
    @RequestUserID() requestingUserId: string,
  ) {
    try {
      const result = await this.cursService.confirmareAbsentaLaCurs(args);
      if (result) {
        this.logger.log(
          `Operatiunea de ${this.confirmareAbsentaLaCurs.name} executata cu succes.`,
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
