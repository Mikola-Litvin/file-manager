import { createBrotliCompress, constants } from 'zlib';
import * as fs from 'fs';
import {
  OPERATION_FAILED,
  FILE_COMPRESSED
} from '../shared/conts.js';

export const compress = async (pathToFile, pathToDestination) => {
  let operationResult = '';

  try {
    const archivator = createBrotliCompress({
      chunkSize: 32 * 1024,
      params: {
        [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
        [constants.BROTLI_PARAM_QUALITY]: 4,
        [constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync(pathToFile).size
      }
    });
    const readableStream = fs.createReadStream(pathToFile);
    const writableStream = fs.createWriteStream(pathToDestination);
  
    readableStream.pipe(archivator).pipe(writableStream);

    operationResult = FILE_COMPRESSED;
  } catch {
    operationResult = OPERATION_FAILED;
  }

  return operationResult;
};
