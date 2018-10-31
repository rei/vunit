const assert = require('assert');
const core = require('../core');
const path = require('path');

describe('preProcess', () => {
  it('should exist', () => {
    assert(typeof core.preProcess === 'function');
  });

  describe( 'watch', function () {
    it('doesn\'t watch any dirs if none passed in', () => {
      assert.deepEqual(core.preProcess({
        watch: undefined
      }).watchedDirectories, [])
    });

    it('should pass values through', () => {
      assert.deepEqual(core.preProcess({
        watch: 'a,b'
      }).watchedDirectories, ['a', 'b'])
    });
  });

  describe( 'webpackConfig', function () {
    it('should pass passed in value through', () => {
      assert.equal(core.preProcess({
        'webpack-config': 'a'
      }).webpackConfig, 'a')
    });

    it('should default to local webpack config', () => {
      assert.equal(core.preProcess({
        'webpack-config': undefined
      }).webpackConfig, path.resolve(__dirname, '..', 'webpack.config.js'))
    });
  });

  describe( 'specGlob', function () {
    it('should pass passed in value through', () => {
      assert.equal(core.preProcess({
        'spec': 'a'
      }).specGlob, 'a');
    });

    it('should default to empty', () => {
      assert.equal(core.preProcess({
        'spec': undefined
      }).specGlob, '');
    });
  });
});
