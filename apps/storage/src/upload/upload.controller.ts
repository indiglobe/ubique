import { Controller, Get, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  getUploadStatus() {
    return this.uploadService.getUploadStatus();
  }

  @Post()
  uploadFile() {
    this.uploadService.uploadFile();
    return { success: true };
  }
}
