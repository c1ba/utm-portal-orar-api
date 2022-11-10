import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolSchema } from 'src/rol/rol.schema';
import { UserResolver } from './user.resolver';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Rol', schema: RolSchema },
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
