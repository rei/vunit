#!/usr/bin/env node
const lib = require('./lib');
const fs = require('fs');
const glob = require('glob');
const core = require('./core');

const getArgs = lib.getArgs;
const validateArgs = lib.validateArgs;

/**
 * The exposed run function that client call.
 * @param parsedArgs
 */
function run(parsedArgs) {
  // Validate args then pass to core.

  if (!parsedArgs) {
    return false;
  }

  core.run(validateArgs(parsedArgs, [{
    option: 'webpack-config',
    validate: (val) => {
      if (val) {
        return fs.existsSync(val);
      }
      return true;
    },
    error: "The specified webpack config does not exist.",
  }, {
    option: 'spec',
    validate: (val) => {
      if (val) {
        return glob.sync(val).length > 0;
      }
      return true;
    },
    error: "No spec files were found.",
  }, {
    option: 'watch',
    validate: (val) => {
      if (!val) return true;

      if (val.length > 0) {
        return val.split(',').every(dir => {
          return fs.existsSync(dir);
        });
      }
      return true;
    },
    error: "Please specify valid directories to watch.",
  }]));
}

// If running via command line..
if (require.main === module) {
  run(lib.parseInput(getArgs()));
}

// Programmatic API
module.exports = {
  run: function (conf) {
    const parsedInput = lib.parseInput(conf);
    run(parsedInput);
    return parsedInput;
  }
};
