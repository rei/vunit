const os = require('os');
const cp = require('child_process');
const path = require('path');
const chokidar = require('chokidar');

/**
 *
 * @param {Object } conf
 * @param {string}  conf.webpack-config  Path to webpack config
 * @param {boolean} conf.watch          Run mocha with watch
 * @param {string}  conf.spec           Glob to mocha spec files.
 */

const preProcess = (conf) => ({
  watchedDirectories: conf.watch && conf.watch.length ? conf.watch.split(',') : [],
  webpackConfig: `${conf['webpack-config'] ? conf['webpack-config'] : path.join(__dirname, 'webpack.config.js') }`,
  specGlob: `${conf.spec ? conf.spec : ''}`,
  coverage: conf.coverage,
});

module.exports.preProcess = preProcess;

module.exports.run = conf => {
  let watcher;

  if (!conf) {
    return;
  }

  const confPreprocessed = preProcess(conf);

  console.log(`Running tests:` );
  console.log('--------------------------------');
  console.log(`watched directories: ${confPreprocessed.watchedDirectories}`);
  console.log(`webpack config: ${conf['webpack-config'] ? conf['webpack-config'] : 'Using built-in config'}`);
  console.log(`specGlob: ${confPreprocessed.specGlob}`);
  console.log(`Coverage: ${confPreprocessed.coverage}`);
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
      'mocha-webpack',
      '--require', path.join(__dirname, 'setup.js'),
      '--colors',
      '--webpack-config',
      confPreprocessed.webpackConfig,
      '--require', path.join(__dirname, 'setup.js'),
      '--require', 'ignore-styles',
      confPreprocessed.specGlob
    ];

    // Remove nyc if not running coverage.
    if (!confPreprocessed.coverage) {
      spawnCmd.splice(3, 1);
    }

    // Execute mocha-webpack.
    const cmd = cp.spawn('npx', spawnCmd);

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
    cmd.stderr.on('data', data => console.log(data.toString()))
  };

  // Re-run tests on file change.
  if (confPreprocessed.watchedDirectories.length > 0) {
    if (!watcher) {
      watcher = chokidar.watch(confPreprocessed.watchedDirectories);
      watcher.on('change', (path) => {
        console.log(`${path} changed.`);
        run();
      });
    }
  }

  // Run tests.
  run();
};
