import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeIO } from '@gltf-transform/core';
import { AppFiles } from './app.service-file';

@Module({
  imports: [NodeIO],
  controllers: [AppController],
  providers: [AppService,AppFiles],
})
export class AppModule {}
