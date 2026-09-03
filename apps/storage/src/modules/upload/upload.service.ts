import { S3_STORAGE } from '@/common/const';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getUploadStatus() {
    return { status: 'Upload service is running' };
  }

  uploadFile() {
    console.log(S3_STORAGE);
    return { success: true };
  }
}
