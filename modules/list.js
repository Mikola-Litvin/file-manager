import * as fs from 'fs/promises';

export const ls = async (dirName) => {
  return fs.readdir(dirName);
};
