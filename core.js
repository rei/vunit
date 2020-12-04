const os = require('os');
const spawn = require('cross-spawn');
const path = require('path');
const chokidar = require('chokidar');

/**
 *
 * @param {Object } conf
 * @param {string}  conf.webpack-config  Path to webpack config
 * @param {boolean} conf.watch          Run mocha with watch
 * @param {string}  conf.spec           Glob to mocha spec files.
 */

const preProcess = conf => ({
  watchedDirectories: conf.watch && conf.watch.length ? conf.watch.split(',') : [],
  webpackConfig: `${conf['webpack-config'] ? conf['webpack-config'] : path.join(__dirname, 'webpack.config.js')}`,
  specGlob: `${conf.spec ? conf.spec : ''}`,
  coverage: conf.coverage,
  report: conf.report,
  require: conf.require ? conf.require : '',
});

module.exports.preProcess = preProcess;

module.exports.run = (conf) => {
  let watcher;

  if (!conf) {
    return;
  }

  const confPreprocessed = preProcess(conf);

  console.log('Running tests:');
  console.log('--------------------------------');
  console.log(`watched directories: ${confPreprocessed.watchedDirectories}`);
  console.log(`webpack config: ${conf['webpack-config'] ? conf['webpack-config'] : 'Using built-in config'}`);
  console.log(`specGlob: ${confPreprocessed.specGlob}`);
  console.log(`Coverage: ${confPreprocessed.coverage}`);
  if(conf.require)console.log(`Required files: ${confPreprocessed.require}`);
  console.log('--------------------------------');

  /**
   * Compile via webpack config and run unit tests.
   */
  const run = () => {
    // Base spawn command.
    const spawnCmd = [
      'cross-env',
      'BABEL_ENV=test',
      'NODE_ENV=test',
      'nyc',
      '--reporter=lcov',
      '--reporter=text',
      '--reporter=json-summary', // Required by @rei/cov-stats
      '--report-dir=coverage',
      'mochapack',
      '--require', path.join(__dirname, 'setup.js'),
      '--colors',
      '--webpack-config',
      confPreprocessed.webpackConfig,
      '--require', path.join(__dirname, 'setup.js'),
      '--require', 'ignore-styles',
      confPreprocessed.specGlob,
    ];

    // Remove nyc and its options if not running coverage.
    if (!confPreprocessed.coverage) {
      spawnCmd.splice(3, 5);
    }

    if(conf.require) {
      spawnCmd.push('--require');
      spawnCmd.push(confPreprocessed.require);
    }

    // Execute mocha-webpack.
    const cmd = spawn('npx', spawnCmd);

    cmd.stdout.on('data', (data) => {
      const d = data.toString();
      if (d !== os.EOL) {
        process.stdout.write(d);
      }
    });

    // Log errors.
    cmd.stdout.on('error', (error) => {
      if (error) console.log(error);
    });

    // Log errors.
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    cmd.on('exit', (code) => {
      process.exitCode = code;
    });
  };

  // Re-run tests on file change.
  if (confPreprocessed.watchedDirectories.length > 0) {
    if (!watcher) {
      watcher = chokidar.watch(confPreprocessed.watchedDirectories);
      watcher.on('change', (pathToFile) => {
        console.log(`${pathToFile} changed.`);
        run();
      });
    }
  }

  // Run tests.
  run();
};
