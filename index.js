#!/usr/bin/env node
const lib = require('./lib');
const getArgs = lib.getArgs;
const validateArgs = lib.validateArgs;
const fs = require('fs');
const glob = require('glob');
const core = require('./core');

// Get command-line arguments.
const args = getArgs();

// Pre-process args
const parsedArgs = {
  watch: args.watch,
  spec:  args.spec.length ?
           args.spec :
           false,
  'webpack-config': args['webpack-config'] ?
           args['webpack-config'].length ?
             args['webpack-config'] :
             false :
           false
};

// Validate args then pass to core.
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
