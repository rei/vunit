const pq = require('proxyquire').noCallThru();
const assert = require('assert');
const cp = require('child_process');
const path = require('path');

const mod = pq('../index.js', {
  './core': {
    run: () => {},
  },
});

// Disable the runtime logging messages in the test.
require('../lib/simple-logger')(false);

describe('Run options', () => {
  it('should return parsed input options', () => {
    assert.deepEqual(mod.run({
      watch: true,
      spec: 'path/to/spec',
      reporter: 'tap',
    }), {
      watch: true,
      coverage: false,
      'webpack-config': false,
      spec: 'path/to/spec',
      require: false,
      reporter: 'tap',
    });
  });
});

describe('Runtime', () => {
  it('should get config from command-line', (done) => {
    const cmd = cp.spawn('node', [
      path.resolve(__dirname, '../index.js'),
      '--spec2=/some/path',
    ]);

    // let errorMessage;
    //
    // cmd.stdout.on('data', (e) => {
    //   errorMessage = e.toString();
    // });

    cmd.on('exit', (code) => {
      assert.equal(code, 1);
      // assert.ok(errorMessage.includes('Invalid option given: spec2'));
      done();
    });
  });

  describe('Running vunit', () => {
    it('should run vanilla js tests (passing)', (done) => {
      let output = '';
      const cmd = cp.spawn('node', [
        path.resolve(__dirname, '../index.js'),
        '--spec=./test/harness/vanilla-js-passing.spec.js',
        '--reporter=tap',
      ]);

      cmd.stdout.on('data', (code) => {
        output += code.toString();
      });

      cmd.on('exit', (code) => {
        // console.log(output);
        assert.ok(output.includes('ok 1 Vanilla JS Test Harness'));
        assert.equal(code, 0);
        done();
      });
    });

    it('should run vanilla js tests (failing)', (done) => {
      let output = '';
      const cmd = cp.spawn('node', [
        path.resolve(__dirname, '../index.js'),
        '--spec=./test/harness/vanilla-js-failing.spec.js',
        '--reporter=tap',
      ]);

      cmd.stdout.on('data', (code) => {
        output += code.toString();
      });

      cmd.on('exit', (code) => {
        assert.ok(output.includes('not ok 1 Vanilla JS Test Harness'));
        assert.equal(code, 1);
        done();
      });
    });

    it('should run Vue tests (passing)', (done) => {
      let output = '';
      const cmd = cp.spawn('node', [
        path.resolve(__dirname, '../index.js'),
        '--spec=./test/harness/List-passing.spec.js',
        '--reporter=tap',
      ]);

      cmd.stdout.on('data', (code) => {
        output += code.toString();
      });

      cmd.on('exit', (code) => {
        assert.ok(output.includes('ok 1 List.vue'));
        assert.equal(code, 0);
        done();
      });
    });

    it('should run Vue tests (failing)', (done) => {
      let output = '';
      const cmd = cp.spawn('node', [
        path.resolve(__dirname, '../index.js'),
        '--spec=./test/harness/List-failing.spec.js',
        '--reporter=tap',
      ]);

      cmd.stdout.on('data', (code) => {
        output += code.toString();
      });

      cmd.on('exit', (code) => {
        assert.ok(output.includes('not ok 1 List.vue'));
        assert.equal(code, 1);
        done();
      });
    });

    it('should run code coverage', (done) => {
      let output = '';
      const cmd = cp.spawn('node', [
        path.resolve(__dirname, '../index.js'),
        '--spec=./test/harness/List-passing.spec.js',
        '--coverage',
      ]);

      cmd.stdout.on('data', (code) => {
        output += code.toString();
      });

      cmd.on('exit', (code) => {
        assert.ok(output.includes('List.vue'));
        assert.ok(output.includes('50'));
        assert.equal(code, 0);
        done();
      });
    });
  });
});
