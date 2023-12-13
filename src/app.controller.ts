import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/op')
  @UseInterceptors(FileInterceptor('file'))
  Optimize(@UploadedFile() file: Express.Multer.File) {
    return this.appService.Optimize(file);
  }
}
