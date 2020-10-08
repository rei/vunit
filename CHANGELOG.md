# Changelog

## 3.0.2
### 10/8/2020 - [Diff](https://github.com/rei/vunit/compare/3.0.1...3.0.2) — [Docs](https://github.com/rei/vunit/blob/3.0.2/ReadMe.md)
* Update babel config to enable async tests.
## 3.0.1
### 8/19/2020 - [Diff](https://github.com/rei/vunit/compare/3.0.0...3.0.1) — [Docs](https://github.com/rei/vunit/blob/3.0.1/ReadMe.md)
* Updating dependencies causing security vulnerabilities.
## 3.0.0
### 3/5/2020 — [Diff](https://github.com/rei/vunit/compare/2.1.4...3.0.0) — [Docs](https://github.com/rei/vunit/blob/3.0.0/ReadMe.md)
* Breaking changes:
  * Replaces [expect](https://jestjs.io/docs/en/expect.html) with [chai.expect](https://www.chaijs.com/api/bdd/).
  * Potentially breaking change is `@vue/test-utils` peer dependency which was updated from 1.0.0-beta25 to 1.0.0-beta31.
    This is installed in alongside of `vunit` and does not *require* an update but if you did update it, you may see
    breakages due to breaking changes within `vue/test-utils`.
    Refer to the [@vue/test-utils CHANGELOG](https://github.com/vuejs/vue-test-utils/blob/dev/CHANGELOG.md) for the
    specific breaking changes.
* Pull in babel config for client test coverage. Clients no longer need to provide this in local `.babelrc` or `package.json`.
* Making `@rei/test-utils` a peer dependency.
* Updating and/or removing unneeded dependencies.
