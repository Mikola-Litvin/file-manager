import * as path from 'path';
import * as fs from 'fs/promises';
import { hash } from './modules/hash.js';
import { osInfo as os } from './modules/os.js';
import { compress } from './modules/compress.js';
import { decompress } from './modules/decompress.js';
import { ls } from './modules/list.js';
import { addFile } from './modules/add-file.js';
import { removeFile } from './modules/remove-file.js';
import { readFile } from './modules/read-file.js';
import { renameFile } from './modules/rename-file.js';
import { copyFile } from './modules/copy-file.js';
import { moveFile } from './modules/move-file.js';
import {
  USER_NAME_ARG,
  CURRENT_DIR_MESSAGE,
  INVALID_VALUE,
  OPERATION_FAILED,
  WRONG_NAME_MESSAGE,
  GREETING_MESSAGE,
  EXIT_APP_MESSAGE,
  DELIMITER,
  COMMAND,
  EMPTY_STRING
} from './shared/conts.js';

let currentDir = EMPTY_STRING;
const { stdin, stdout, exit, argv } = process;
const userName = argv.slice(2)[0];
const closeApp = (message) => {
  stdout.write(message);
  exit(0);
}

if (!userName) {
  closeApp(WRONG_NAME_MESSAGE);
}

const [userNameProp, userNameValue] = userName.split('=');

if (userNameProp === USER_NAME_ARG) {
  stdout.write(`${GREETING_MESSAGE}, ${userNameValue}!\n`);
  os('--homedir').then(data => {
    currentDir = data;
    stdout.write(`${DELIMITER}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
  });
} else {
  closeApp(WRONG_NAME_MESSAGE);
}

stdin.on('data', data => {
  const [command, firstArgument, secondArgument] = data.slice(0, data.length - 2)
    .toString()
    .trim()
    .split(' ');

  if (command === COMMAND.exit) {
    closeApp(`${DELIMITER}\n${EXIT_APP_MESSAGE}, ${userNameValue}!`);
  } else if (command === COMMAND.ls) {
    ls(currentDir).then(
      res => {
        stdout.write(`${DELIMITER}\n`)
        res.forEach(fileName => stdout.write(`${fileName}\n`));
        stdout.write(`${DELIMITER}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
      });
  } else if (command === COMMAND.up) {
    currentDir = path.join(currentDir, '../');
    stdout.write(`${DELIMITER}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
  } else if (command === COMMAND.cd) {
    if (!firstArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      const tempPath = path.join(currentDir, path.basename(firstArgument));

      fs.access(tempPath)
        .then(() => {
          if (!path.parse(tempPath).ext) {
            currentDir = tempPath;
            stdout.write(`${DELIMITER}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
          } else {
            stdout.write(`${DELIMITER}\n${OPERATION_FAILED}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`)
          }
        })
        .catch(() => stdout.write(`${DELIMITER}\n${OPERATION_FAILED}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`));
    }
  } else if (command === COMMAND.addFile) {
    if (!firstArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      const newFilePath = path.join(currentDir, path.basename(firstArgument));
      addFile(newFilePath, currentDir)
        .then(() => stdout.write(`${DELIMITER}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`))
    }
  } else if (command === COMMAND.removeFile) {
    if (!firstArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      removeFile(firstArgument)
        .then(() => stdout.write(`${DELIMITER}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`))
        .catch(() => stdout.write(`${DELIMITER}\n${OPERATION_FAILED}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`));
    }
  } else if (command === COMMAND.readFile) {
    if (!firstArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      readFile(firstArgument, currentDir);
    }
  } else if (command === COMMAND.renameFile) {
    if (!firstArgument || !secondArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      renameFile(firstArgument, secondArgument, currentDir);
    }
  } else if (command === COMMAND.copyFile) {
    if (!firstArgument || !secondArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      copyFile(firstArgument, secondArgument, currentDir);
    }
  } else if (command === COMMAND.moveFile) {
    if (!firstArgument || !secondArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      moveFile(firstArgument, secondArgument, currentDir);
    }
  } else if (command === COMMAND.hash) {
    if (!firstArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      hash(firstArgument).then(data => stdout.write(`${DELIMITER}\n${data}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`));
    }
  } else if (command === COMMAND.os) {
    if (!firstArgument || !firstArgument.startsWith('--')) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      os(firstArgument).then(data => stdout.write(`${DELIMITER}\n${data}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`));
    }
  } else if (command === COMMAND.compress) {
    if (!firstArgument || !secondArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      compress(firstArgument, secondArgument).then(data => stdout.write(`${DELIMITER}\n${data}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`));
    }
  } else if (command === COMMAND.decompress) {
    if (!firstArgument || !secondArgument) {
      stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
    } else {
      decompress(firstArgument, secondArgument).then(data => stdout.write(`${DELIMITER}\n${data}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`));
    }
  } else {
    stdout.write(`${DELIMITER}\n${INVALID_VALUE}\n${CURRENT_DIR_MESSAGE} ${currentDir}\n`);
  }
});
