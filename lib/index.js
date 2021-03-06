const logger = require('./simple-logger')();

/**
 * Get command-line arguments as an object
 * @param args Arguments via process.argv.
 * @returns {*} Arguments as an object of option/values. If no value specified, it's set to true.
 */
const getArguments = (args) => args.slice(2)
  .map((v) => v.slice(2))
  .reduce((acc, val) => {
    const [option, value] = val.split('=');
    acc[option] = value || true;
    return acc;
  }, {});

/**
 * Validate arguments per the validation rules specified.
 * @param args The preprocessed arguments object.
 * @param validationRules Array of validation rules to validate options with.
 * @returns {(boolean|Object)} Args object or false if validation fails.
 */
const validateArgs = (args, validationRules) => {
  const ok = validationRules.every((entry) => {
    logger.info(`Validating ${entry.option}...`);
    const valid = entry.validate(args[entry.option]);
    if (valid) {
      logger.success('Valid.\n');
      return true;
    }

    logger.error(`Invalid. ${entry.error}\n`);
    return false;
  });

  return ok ? args : false;
};

/**
 * Parse the initial input from either cmd line or config.
 * @param conf The options/command-line arguments passed in.
 * @returns {{watch: *, spec: *, 'webpack-config': boolean, coverage: boolean}|null}
 */
function parseInput(conf) {
  const options = {
    watch: conf.watch,
    spec: conf.spec && conf.spec.length
      ? conf.spec
      : false,
    'webpack-config': conf['webpack-config']
      ? conf['webpack-config'].length
        ? conf['webpack-config']
        : false
      : false,
    coverage: !!conf.coverage,
    require: conf.require && conf.require.length
      ? conf.require
      : false,
    reporter: conf.reporter || 'spec',
  };

  let lastValue = '';

  if (!Object.keys(conf).every((val) => {
    lastValue = val;
    return Object.keys(options).includes(val);
  })) {
    logger.error(`Invalid option given: ${lastValue}\n`);
    process.exitCode = 1;
    return null;
  }

  return options;
}

module.exports = {
  validateArgs,
  getArguments,
  getArgs: getArguments.bind(null, process.argv),
  parseInput,
};
