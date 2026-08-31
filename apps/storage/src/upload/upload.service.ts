import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getUploadStatus() {
    return { status: 'Upload service is running' };
  }

  uploadFile() {
    console.log(process.cwd());
  }
}
