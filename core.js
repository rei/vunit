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
  specGlob: `${conf.spec ? conf.spec : ''}`
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
  console.log(`webpack config: ${confPreprocessed.webpackConfig}`);
  console.log(`specGlob: ${confPreprocessed.specGlob}`);
  console.log('--------------------------------');


  if (confPreprocessed.watchedDirectories.length > 0) {
    watcher = chokidar.watch(confPreprocessed.watchedDirectories);
  }

  /**
   * Compile via webpack config and run unit tests.
   */
  const run = () => {

    // Execute mocha-webpack.
    const cmd = cp.spawn('npx', [
      'cross-env',
      'NODE_ENV=test',
      'mocha-webpack',
      '--colors',
      '--webpack-config',
      confPreprocessed.webpackConfig,
      '--require', path.join(__dirname, 'setup.js'),
      confPreprocessed.specGlob
    ]);

    cmd.stdout.on('data', (data) => {
      const d = data.toString();
      if (d !== os.EOL) {
        process.stdout.write(d);
      }
    });

    cmd.stdout.on('error', (error) => {
      if (error) console.log(error);
    });
  };

  // Re-run tests on file change.
  if (confPreprocessed.watchedDirectories.length > 0) {
    watcher.on('change', (path) => {
      console.log(`${path} changed.`);
      run();
    });
  }

  // Run tests.
  run();
};
