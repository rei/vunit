/**
 * Get command-line arguments as an object
 * @param args Arguments via process.argv.
 * @returns {*} Arguments as an object of option/values. If no value specified, it's set to true.
 */
const getArguments = (args) => args.slice(2)
  .map(v => v.slice(2)).
  reduce((acc, val) => {
    const [option, value] = val.split('=');
    acc[option] = value ? value : true;
    return acc;
  }, {});

/**
 * Validate arguments per the validation rules specified.
 * @param args The preprocessed arguments object.
 * @param validationRules Array of validation rules to validate options with.
 * @returns {(boolean|Object)} Args object or false if validation fails.
 */
const validateArgs = (args, validationRules) => {
  const ok = validationRules.every( entry => {
    process.stdout.write(`Validating ${entry.option}...`);
    const valid = entry.validate(args[entry.option]);
    if (valid) {
      process.stdout.write(`valid.\n`);
      return true;
    }

    process.stdout.write(`invalid. ${entry.error}\n`);
    return false;
  });

  return ok ? args : false;
};

module.exports = {
  validateArgs,
  getArguments,
  getArgs: getArguments.bind(null, process.argv)
};
