# Changelog

## 3.0.0
### 3/5/2020 — [Diff](https://github.com/rei/vunit/compare/2.1.4...3.0.0) — [Docs](https://github.com/rei/vunit/blob/3.0.0/ReadMe.md)
* Breaking changes:
  * This updates @vue/test-utils from 1.0.0-beta25 to 1.0.0-beta31 which contains breaking changes. Refer to the [@vue/test-utils CHANGELOG](https://github.com/vuejs/vue-test-utils/blob/dev/CHANGELOG.md)
  * Replaces [expect](https://jestjs.io/docs/en/expect.html) with [chai.expect](https://www.chaijs.com/api/bdd/).
* Pull in babel config for test coverage. Clients no longer need to provide for this in local `.babelrc` or `package.json`.
* Replacing expect with chai.expect.
* Making @rei/test-utils a peer dependency.
* Updating and/or removing dependencies
* Audit updates. 
