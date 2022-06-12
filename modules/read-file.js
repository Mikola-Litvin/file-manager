import * as fs from 'fs';
import {
  CURRENT_DIR_MESSAGE,
  OPERATION_FAILED,
  DELIMITER
} from '../shared/conts.js';

const { stdout } = process;

export const readFile = async (pathFile, currentDir) => {
  const reabableStream = fs.createReadStream(pathFile, { encoding: 'utf-8'});
  
  reabableStream.on('data', (chunk) => {
      stdout.write(`${DELIMITER}\n${chunk}\n${DELIMITER}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    });

  reabableStream.on('error', err => {
      stdout.write(`${OPERATION_FAILED}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    });
};
