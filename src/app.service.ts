import { HttpStatus, Injectable } from '@nestjs/common';
import { AppFiles } from './app.service-file';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { NodeIO } from '@gltf-transform/core';
import * as draco3d from 'draco3dgltf';
import sharp from 'sharp';
import {
  resample,
  prune,
  dedup,
  textureCompress,
} from '@gltf-transform/functions';
import { Upload } from './req';

@Injectable()
export class AppService {
  constructor(
    private SF: AppFiles,
    private upload: Upload,
  ) {}
  async Optimize(file) {
    const io = new NodeIO()
      .registerExtensions(ALL_EXTENSIONS)
      .registerDependencies({
        'draco3d.decoder': await draco3d.createDecoderModule(),
        'draco3d.encoder': await draco3d.createEncoderModule(),
      });

    try {
      const filePath = this.SF.createFile(file);
      const filePathNew = 'new_' + filePath;
      const document = await io.read('./static/' + filePath);
      await document.transform(
        resample(),
        prune(),
        dedup(),
        textureCompress({ encoder: sharp }),
      );
      await io.write('./static/' + filePathNew, document);
      console.log(`Processed file: ./static/${filePath}`);
      this.upload.uploadFile(`./static/${filePathNew}`);
      return HttpStatus.CREATED;
    } catch (error) {
      console.log(error);
    }
  }
}
