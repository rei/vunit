const pq = require('proxyquire').noCallThru();
const assert = require('assert');
const cp = require('child_process');
const path = require('path');

const mod = pq('../index.js', {
  './core': {
    run: () => {}
  }
});

describe('run', () => {
  it('should contain run function', () => {
    assert(typeof mod.run === 'function');
  });

  it('should return parsed input', () => {
    assert.deepEqual(mod.run({
      watch: true,
      spec: 'path/to/spec'
    }), {
      watch: true,
      coverage: false,
      'webpack-config': false,
      spec: 'path/to/spec'
    })
  });

  it('should get config from command-line', (done) => {
    const cmd = cp.spawn('node', [
      path.resolve(__dirname, '../index.js'),
      '--spec2=/some/path'
    ]);

    let errorMessage;

    cmd.stdout.on('data', (e) => {
      errorMessage = e.toString();
    });

    cmd.stdout.on('close', () => {
      assert.ok(errorMessage.includes('Invalid option given: spec2'));
      done()
    });
  });
});
