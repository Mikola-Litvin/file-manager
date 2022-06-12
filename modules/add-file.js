import * as fs from 'fs';
import {
  CURRENT_DIR_MESSAGE,
  OPERATION_FAILED,
  DELIMITER
} from '../shared/conts.js';

const { stdout } = process;

export const addFile = async (newFilePath, currentDir) => {
  const writableStream = fs.createWriteStream(newFilePath, { encoding: 'utf-8'});

  writableStream.write('').end;

  writableStream.on('error', err => {
    stdout.write(`${DELIMITER}\n${OPERATION_FAILED}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
  });
};
