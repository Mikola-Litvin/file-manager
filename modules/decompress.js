import { createBrotliDecompress, constants } from 'zlib';
import * as fs from 'fs';
import {
  OPERATION_FAILED,
  FILE_DECOMPRESSED
} from '../shared/conts.js';

export const decompress = async (pathToFile, pathToDestination) => {
  let operationResult = '';

  try {
    fs.statSync(pathToFile);
    const archivator = createBrotliDecompress();
    const readableStream = fs.createReadStream(pathToFile);
    const writableStream = fs.createWriteStream(pathToDestination);
  
    readableStream.pipe(archivator).pipe(writableStream);

    operationResult = FILE_DECOMPRESSED;
  } catch {
    operationResult = OPERATION_FAILED;
  }

  return operationResult;
};
