import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dc33cfvep',
      api_key: '337251369924148',
      api_secret: 'nYLUBjLVtwBYascK9m8fFdhRGDo',
    });
  }

  async uploadFile(
    buffer: Buffer,
    filename: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: filename },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        },
      );
      Readable.from(buffer).pipe(stream);
    });
  }

  async uploadFiles(files: Express.Multer.File[]) {
    return Promise.all(
      files.map((file) => this.uploadFile(file.buffer, file.originalname)),
    );
  }
}
