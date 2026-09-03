import path from 'node:path';
import { cwd } from 'node:process';

export const S3_STORAGE = path.join(cwd(), '../../s3');
