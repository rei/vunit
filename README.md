# vunit - Vue unit testing tools

## Description

Unit testing tool for [Vue.js](https://vuejs.org/) components. This tool allows you to easily test your Vue components using [mocha](https://mochajs.org) and [@vue/test-utils](https://vue-test-utils.vuejs.org/). Additionally, it provides code-coverage reporting via [nyc/istanbul](https://istanbul.js.org/) for both Vue components and vanilla js. It is based on the following documents:
 * [vue-test-utils
for Mocha](https://vue-test-utils.vuejs.org/guides/testing-single-file-components-with-mocha-webpack.html)
 * [example](https://github.com/vuejs/vue-test-utils-mocha-webpack-example)

## Installation

    npm install --save-dev @rei/vunit @vue/test-utils

## Basic Usage

### Running Unit Tests

    npx vunit --spec=<glob-to-specs> [--watch]

### Running Test Coverage

    npx vunit --spec=<glob-to-specs> --coverage [--watch]

    Report is generated at `./coverage`

## Creating Unit Tests

* Refer to the [@vue/test-utils documentation](https://vue-test-utils.vuejs.org/) for examples and [API](https://vue-test-utils.vuejs.org/api/).
* Create your spec files via [mocha](https://mochajs.org) syntax.
* [Chai's expect](https://www.chaijs.com/api/bdd/) is made globally available in your spec files for assertions.

## Update `npm test` Script(s)

Add `test` script to your `package.json`:

    {
        ...
        "scripts": {
            "test": "vunit --spec=<glob-to-specs>"
        },
        ...
    }

## Command-line Options

The following options are available to the tool:

    spec:               {String}    The path glob to your Vue unit tests (required)
    webpack-config:     {String}    The path to your webpack.config.js (optional)
    watch:              {String}    Comma-separated list of directories to watch for changes, e.g.
    --watch=src,test (optional).
    coverage:           {None}      Flag indicating whether or not to run coverage. Report is generated at `./coverage-vue`
    require:            {None}      Path to include a module (like a setup script) before loading tests (optional)
    reporter:           {String}    The mocha reporter (default is spec)

## Overriding the NYC Code Coverage Configuration

If you need to modify any of the [NYC test coverage configuration options](https://github.com/istanbuljs/nyc#common-configuration-options)
that are provided by default, you can create a local `.nycrc` config file and configure as needed. 

Start by just copying the [default .nycrc file](./.nycrc) to your local directory and modify as needed.

## Programmatic API

To use package via programmatic API, just `require` the module and call the exposed `run` command
 with above options passed in as an object:

    const vunit = require('vunit');
    vunit.run({
        spec: '/glob/to/specs',
        ...
    });

## Vue 2 -> 3 Migration Guide

See the [Vue Test Utils Migration page](https://vue-test-utils.vuejs.org/v2/guide/migration.html) regarding API changes.
