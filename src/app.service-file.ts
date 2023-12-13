import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
@Injectable()
export class AppFiles {
  createFile(file: Express.Multer.File): string {
    try {
      const fileEx = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileEx;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
