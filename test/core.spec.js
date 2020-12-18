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
});
