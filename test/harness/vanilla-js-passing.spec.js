/**
 * Passing vanilla JS test harness used when running vunit unit tests.
 */
const add = (a, b) => a + b;

describe('Vanilla JS Test Harness (passing)', () => {
  it('should add', () => {
    expect(add(1, 2)).to.equal(3);
  });
});
