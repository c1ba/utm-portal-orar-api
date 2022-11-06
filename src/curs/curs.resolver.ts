import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Curs, CursCreereInput, CursFindManyInput, CursUpdateInput, CursuriWithoutNestedCursuri } from './curs.schema';
import { CursService } from './curs.service';

@Resolver()
export class CursResolver {
    constructor(private cursService: CursService) {}
    @Query(()=> String)
    async helloWorld() {
        return await this.cursService.helloWorld();
    }

    @Query(()=>[Curs])
    async gasireTotalCursuri() {
        return await this.cursService.gasireTotalCursuri();
    }

    @Query(()=> Curs)
    async gasireCurs(@Args('id') id: string) {
        return await this.cursService.gasireCurs(id);
    }

    @Query(()=> [CursuriWithoutNestedCursuri])
    async gasireCursuri(@Args('cursInput') cursInput: CursFindManyInput) {
        return await this.cursService.gasireCursuri(cursInput);
    }

    @Mutation(()=> CursuriWithoutNestedCursuri)
    async creereCurs(@Args('curs') curs: CursCreereInput) {
        return await this.cursService.creereCurs(curs);
    }

    @Mutation(()=> CursuriWithoutNestedCursuri)
    async editareCurs(@Args('id') id: string, @Args('inputEditareCurs') inputEditareCurs: CursUpdateInput) {
        return await this.cursService.editareCurs(id, inputEditareCurs);
    }

    @Mutation(()=> CursuriWithoutNestedCursuri)
    async stergereCurs(@Args('id') id: string) {
        return await this.cursService.stergereCurs(id);
    }
    @Mutation(()=>[CursuriWithoutNestedCursuri])
    async stergereCursuri(@Args('inputFindCursuri') inputFindCursuri: CursFindManyInput) {
        return await this.cursService.stergereCursuri(inputFindCursuri);
    }
}