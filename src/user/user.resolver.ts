import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRequired, isAdmin } from 'src/auth/auth.decorators';
import { UserCreereInput, UserFaraParola } from './user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @AuthRequired()
  @isAdmin()
  @Query(() => [UserFaraParola])
  async gasireTotiUseri() {
    return await this.userService.gasireTotiUseri();
  }

  @AuthRequired()
  @Query(() => UserFaraParola)
  async gasireUser(@Args('id') id: string) {
    return await this.userService.gasireUser(id);
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => UserFaraParola)
  async creereUser(
    @Args('user') user: UserCreereInput,
    @Args('rol') rol: 'student' | 'profesor' | 'secretar' | 'admin',
  ) {
    return await this.userService.creereUser(user, rol);
  }

  @Query(() => String)
  async logare(@Args('email') email: string, @Args('parola') parola: string) {
    return await this.userService.logare(email, parola);
  }
}
