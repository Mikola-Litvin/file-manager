import * as fs from 'fs/promises';
import { createHash } from 'node:crypto';
import {
  OPERATION_FAILED,
  DELIMITER
} from '../shared/conts.js';

export const hash = async (pathToFile) => {
  let hashString = '';
  const hash = createHash('sha256');

  try {
    hashString = await fs.readFile(pathToFile);
    hash.update(hashString);
    hashString = `${hash.digest('hex')}\n${DELIMITER}`;
  } catch (e) {
    hashString = OPERATION_FAILED;
  }

  return hashString;
};
