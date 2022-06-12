import * as path from 'path';
import * as fs from 'fs';
import { rm } from 'fs/promises';
import {
  CURRENT_DIR_MESSAGE,
  OPERATION_FAILED,
  DELIMITER
} from '../shared/conts.js';

const { stdout } = process;

export const renameFile = async (pathToOldFile, newFileName, currentDir) => {
  const pathToNewFile = path.join(path.parse(pathToOldFile).dir, newFileName);
  const reabableStream = fs.createReadStream(pathToOldFile, { encoding: 'utf-8'});
  const writableStream = fs.createWriteStream(pathToNewFile, { encoding: 'utf-8'});

  reabableStream.on('data', (chunk) => {
      writableStream.write(chunk);
      writableStream.end;
    });

  reabableStream.on('close', async () => {
    try {
      await rm(pathToOldFile);
      stdout.write(`${DELIMITER}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } catch {}
  });

  reabableStream.on('error', err => {
      stdout.write(`${DELIMITER}\n${OPERATION_FAILED}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    });
  
  writableStream.on('error', err => {
      stdout.write(`${DELIMITER}\n${OPERATION_FAILED}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    });
};
