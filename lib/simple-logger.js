const chalk = require('chalk');

process.env.FORCE_COLOR = 1;

let enabled = true;

module.exports = (enable = true) => {
  enabled = enable;

  const writeMessage = (msg, color) => process.stdout.write(chalk[color](msg));

  return {
    info: (msg) => enabled && writeMessage(`ℹ️ ${msg}`, 'white'),
    warn: (msg) => enabled && writeMessage(`⚠️ ${msg}`, 'yellow'),
    error: (msg) => enabled && writeMessage(`✘ ${msg}`, 'red'),
    success: (msg) => enabled && writeMessage(`✔ ${msg}`, 'green'),
  };
};
