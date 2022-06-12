import * as os from 'os';
import {
  INVALID_VALUE,
  ARGUMENT
} from '../shared/conts.js';

function getEOLChars(eolValue) {
  if (eolValue.match(/^\r$/)) return '\\r';
  if (eolValue.match(/^\n$/)) return '\\n';
  if (eolValue.match(/^\r\n$/)) return '\\r\\n';
}

function convertCpusData(cpusVAlue) {
  let cpusString = `${cpusVAlue.length} Cores`;

  cpusVAlue.forEach(item => {
    cpusString = cpusString + `\n${item.model}`
  });

  cpusString = cpusString + `\n${cpusVAlue.length} Cores`;

  return cpusString;
}

export const osInfo = async (argument) => {
  let infoString = '';

  switch(argument) {
    case ARGUMENT.eol: infoString = getEOLChars(os.EOL);
    break;
    case ARGUMENT.cpus: infoString = convertCpusData(os.cpus());
    break;
    case ARGUMENT.homedir: infoString = os.homedir();
    break;
    case ARGUMENT.username: infoString = os.userInfo().username;
    break;
    case ARGUMENT.architecture: infoString = os.arch();
    break;
    default: infoString = `${INVALID_VALUE}`;
  }

  return infoString;
};
