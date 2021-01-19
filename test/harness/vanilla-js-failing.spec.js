/**
 * Failing vanilla JS test harness used when running vunit unit tests.
 */

const add = (a, b) => a + b;

describe('Vanilla JS Test Harness (failing)', () => {
  it('should fail', () => {
    expect(add(1, 2)).to.equal(1);
  });
});
