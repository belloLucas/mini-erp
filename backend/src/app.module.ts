import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, DbModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
