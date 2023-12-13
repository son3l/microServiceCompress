import { Injectable } from '@nestjs/common';
import req from 'request';
import * as fs from 'fs';
@Injectable()
export class Upload {
  uploadFile(fileName: string): Promise<any> {
    req.post(
      {
        url: `YOUR API URL TO UPLOAD FILE`,
        headers: {
          Authorization: `YOUR JWT TOKEN`,
          'Content-Type': 'application/json',
        },
        formData: {
          attachments: [fs.createReadStream(`../../static/${fileName}`)],
        },
      },
      (err, responce, body) => {
        console.log(console.log('body =>' + body + '\n err =>' + err));
      },
    );
    return;
  }
}
