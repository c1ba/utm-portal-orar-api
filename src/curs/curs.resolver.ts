import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthRequired, isAdmin } from 'src/auth/auth.decorators';
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

@Resolver()
export class CursResolver {
  constructor(private cursService: CursService) {}

  @AuthRequired()
  @Query(() => [Curs])
  async gasireTotalCursuri() {
    return await this.cursService.gasireTotalCursuri();
  }

  @AuthRequired()
  @Query(() => Curs)
  async gasireCurs(@Args('id') id: string) {
    return await this.cursService.gasireCurs(id);
  }

  @AuthRequired()
  @Query(() => [CursuriWithoutNestedCursuri])
  async gasireCursuri(@Args('cursInput') cursInput: CursFindManyInput) {
    return await this.cursService.gasireCursuri(cursInput);
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => CursuriWithoutNestedCursuri)
  async creereCurs(@Args('curs') curs: CursCreereInput) {
    return await this.cursService.creereCurs(curs);
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => CursuriWithoutNestedCursuri)
  async editareCurs(
    @Args('id') id: string,
    @Args('inputEditareCurs') inputEditareCurs: CursUpdateInput,
  ) {
    return await this.cursService.editareCurs(id, inputEditareCurs);
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => CursuriWithoutNestedCursuri)
  async stergereCurs(@Args('id') id: string) {
    return await this.cursService.stergereCurs(id);
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => [CursuriWithoutNestedCursuri])
  async stergereCursuri(
    @Args('inputFindCursuri') inputFindCursuri: CursFindManyInput,
  ) {
    return await this.cursService.stergereCursuri(inputFindCursuri);
  }

  @AuthRequired()
  @Mutation(() => CursuriWithoutNestedCursuri)
  async confirmarePrezentaLaCurs(@Args('args') args: ConfirmarePrezentaLaCurs) {
    return await this.cursService.confirmarePrezentaLaCurs(args);
  }

  @AuthRequired()
  @Mutation(() => CursuriWithoutNestedCursuri)
  async confirmareAbsentaLaCurs(@Args('args') args: ConfirmareAbsentaCursArgs) {
    return await this.cursService.confirmareAbsentaLaCurs(args);
  }
}
