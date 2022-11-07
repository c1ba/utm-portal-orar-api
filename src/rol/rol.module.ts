import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { RolSchema } from './rol.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Rol', schema: RolSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
})
export class RolModule {}
