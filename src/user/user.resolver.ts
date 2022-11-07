import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserCreereInput } from './user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async gasireTotiUseri() {
    return await this.userService.gasireTotiUseri();
  }

  @Query(() => User)
  async gasireUser(@Args('id') id: string) {
    return await this.userService.gasireUser(id);
  }

  @Mutation(() => User)
  async creereUser(
    @Args('user') user: UserCreereInput,
    @Args('rol') rol: 'student' | 'profesor' | 'secretar' | 'admin',
  ) {
    return await this.userService.creereUser(user, rol);
  }
}
