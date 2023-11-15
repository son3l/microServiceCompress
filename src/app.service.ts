import { HttpStatus, Injectable } from '@nestjs/common';
import { AppFiles } from './app.service-file';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { NodeIO } from '@gltf-transform/core';
import * as draco3d from 'draco3dgltf';
import sharp from 'sharp';
import { resample, prune, dedup, textureCompress} from '@gltf-transform/functions';

@Injectable()
export class AppService {
  constructor(private SF: AppFiles){}
  async Optimize(file){
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });

    try {
      const filePath =  this.SF.createFile(file)
       const filePathNew = 'new_'+filePath 
       console.log(Date.now())
       const document = await io.read('./static/'+filePath);
       console.log(Date.now())
       await document.transform(
         resample(),
         prune(),
         dedup(),
         textureCompress({encoder: sharp})
        //draco({decodeSpeed:4, encodeSpeed: 4})
       );
       await io.write('./static/'+filePathNew, document);
       console.log(Date.now())
       console.log(`Processed file: ./static/${filePath}`);
return HttpStatus.CREATED
    } catch (error) {
      console.log(error);
    }
  }
}
