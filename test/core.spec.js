const assert = require('assert');
const path = require('path');
const core = require('../core');

describe('preProcess', () => {
  it('should exist', () => {
    assert(typeof core.preProcess === 'function');
  });

  describe('watch', () => {
    it('doesn\'t watch any dirs if none passed in', () => {
      assert.deepEqual(core.preProcess({
        watch: undefined,
      }).watchedDirectories, []);
    });

    it('should pass values through', () => {
      assert.deepEqual(core.preProcess({
        watch: 'a,b',
      }).watchedDirectories, ['a', 'b']);
    });
  });

  describe('webpackConfig', () => {
    it('should pass passed in value through', () => {
      assert.equal(core.preProcess({
        'webpack-config': 'a',
      }).webpackConfig, 'a');
    });

    it('should default to local webpack config', () => {
      assert.equal(core.preProcess({
        'webpack-config': undefined,
      }).webpackConfig, path.resolve(__dirname, '..', 'webpack.config.js'));
    });
  });

  describe('specGlob', () => {
    it('should pass passed in value through', () => {
      assert.equal(core.preProcess({
        spec: 'a',
      }).specGlob, 'a');
    });

    it('should default to empty', () => {
      assert.equal(core.preProcess({
        spec: undefined,
      }).specGlob, '');
    });
  });
  describe('additional required file', () => {
    it('should pass in an additional required file if specified', () => {
      assert.equal(core.preProcess({
        require: './a',
      }).require, './a');
    });
    it('should exclude the argument if empty', () => {
      assert.equal(core.preProcess({
        require: false,
      }).require, '');
    });
  });

  describe('NYC Config', () => {
    it('should use client .nycrc', () => {
      assert.equal(core.fileExistsOrDefault('path/one', 'path/two', {
        existsSync: () => true,
      }), 'path/one');
    });

    it('should use default .nycrc if no client .nycrc present', () => {
      assert.equal(core.fileExistsOrDefault('path/one', 'path/two', {
        existsSync: () => false,
      }), 'path/two');
    });

    it('isValidJSON should return false if invalid .nycrc JSON', () => {
      assert.equal(core.isValidJSON('', {
        readFileSync: () => '',
      }), false);
    });

    it('isValidJSON should return true if valid .nycrc JSON', () => {
      assert.equal(core.isValidJSON('', {
        readFileSync: () => JSON.stringify({ a: 1, b: 2 }),
      }), true);
    });
  });
});
