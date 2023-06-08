import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRequired, isAdmin } from 'src/auth/auth.decorators';
import { UserCreereInput, UserFaraParola } from './user.schema';
import { UserService } from './user.service';
import { CustomLogger } from 'src/logging/logger.service';
import { GraphQLError } from 'graphql';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService, private logger: CustomLogger) {}

  @AuthRequired()
  @isAdmin()
  @Query(() => [UserFaraParola])
  async gasireTotiUseri() {
    try {
      const result = await this.userService.gasireTotiUseri();
      if (result) {
        this.logger.log(`Operatiune executata cu succes.`);
        return result;
      }
    } catch (err) {
      this.logger.error(err);
      throw new GraphQLError(err);
    }
  }

  @AuthRequired()
  @Query(() => UserFaraParola)
  async gasireUser(@Args('id') id: string) {
    try {
      const result = await this.userService.gasireUser(id);
      if (result) {
        this.logger.log(`Operatiune executata cu succes.`);
        return result;
      }
    } catch (err) {
      this.logger.error(err);
      throw new GraphQLError(err);
    }
  }

  @AuthRequired()
  @isAdmin()
  @Mutation(() => UserFaraParola)
  async creereUser(
    @Args('user') user: UserCreereInput,
    @Args('rol') rol: 'student' | 'profesor' | 'secretar' | 'admin',
  ) {
    try {
      const result = await this.userService.creereUser(user, rol);
      if (result) {
        this.logger.log(`Operatiune executata cu succes.`);
        return result;
      }
    } catch (err) {
      this.logger.error(err);
      throw new GraphQLError(err);
    }
  }

  @Query(() => String)
  async logare(@Args('email') email: string, @Args('parola') parola: string) {
    try {
      const result = await this.userService.logare(email, parola);
      if (result) {
        this.logger.log(`Operatiune executata cu succes.`);
        return result;
      }
    } catch (err) {
      this.logger.error(err);
      throw new GraphQLError(err);
    }
  }
}
