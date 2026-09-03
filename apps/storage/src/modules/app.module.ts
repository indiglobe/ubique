import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({}), UploadModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
