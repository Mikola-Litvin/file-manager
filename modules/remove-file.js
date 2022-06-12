import * as fs from 'fs/promises';

export const removeFile = async (filePath) => {
  return fs.rm(filePath);
};
