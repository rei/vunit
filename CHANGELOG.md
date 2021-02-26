# Changelog

## 5.0.0
### 2/25/2021 - [Diff](https://github.com/rei/vunit/compare/5.0.0...4.1.0) — [Docs](https://github.com/rei/vunit/blob/5.0.0/ReadMe.md)
- Update to Vue 3.
- Update vue-test-utils to ^2
- Add ability to pass in reporter for code coverage
- Add/refactor unit tests
- Add a simple logger

## 4.1.0
### 12/18/2020 - [Diff](https://github.com/rei/vunit/compare/4.1.0...4.0.1) — [Docs](https://github.com/rei/vunit/blob/4.1.0/ReadMe.md)
- Allow overriding of `.nycrc`. If a local `.nycrc` is present, it will use that instead of default `.nycrc`.

## 4.0.1
### 12/17/2020 - [Diff](https://github.com/rei/vunit/compare/4.0.1...4.0.0) — [Docs](https://github.com/rei/vunit/blob/4.0.1/ReadMe.md)
- Ensuring client uses .nycrc config from @rei/vunit. This fixes issue of no src files being reported during coverage run.
- Include .vue, .js extensions
- Exclude test/ directory

## 4.0.0
### 12/03/2020 - [Diff](https://github.com/rei/vunit/compare/4.0.0...3.0.1) — [Docs](https://github.com/rei/vunit/blob/4.0.0/ReadMe.md)
- Switching from mocha-webpack to mochapack due to lack of maintenance now on mocha-webpack.
- See
  - https://www.npmjs.com/package/mochapack
  - zinserjan/mocha-webpack#308
  - https://github.com/zinserjan/mocha-webpack/issues
- Enabling async/await in client mocha unit tests via babel config in webpack.conf.
- Updating mocha to v8.
- Updating @babel dependencies.
- Adding .eslintrc.json

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
