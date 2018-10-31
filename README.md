# vunit - Vue unit testing tools

## Description

Unit testing for Vue components. This tool allows you to easily test your Vue components using 
[mocha](https://mochajs.org) and [vue-test-utils](https://vue-test-utils.vuejs.org/). It is based on the following documents: 
 * [vue-test-utils 
for Mocha](https://vue-test-utils.vuejs.org/guides/testing-single-file-components-with-mocha-webpack.html)
 * [example](https://github.com/vuejs/vue-test-utils-mocha-webpack-example)

## Installation

    npm install --save-dev @rei/vunit

## Basic Usage

    npx vunit --spec=<path-glob-to-spec-files>

This will run all of the unit tests specified in `<path-to-spec-files>`.

## Creating Unit Tests

See the [vue-test-utils documentation](https://vue-test-utils.vuejs.org/) for creating unit tests
 using `vue-test-utils`. 

Create your spec files via [mocha](https://mochajs.org) syntax.

## Update `npm test` Script(s)
    
Add `test` script to your `package.json`:

    {
        ...
        "scripts": {
            "test": "vunit --spec=<path-glob-to-spec-files>"
        },
        ...
    }

## Command-line Options

The following options are available to the tool: 

    spec:               {String}    The path glob to your Vue unit tests (required)
    webpack-config:     {String}    The path to your webpack.config.js (optional)
    watch:              {String}    Comma-separated list of directories to watch for changes, e.g. 
    --watch=src,test (optional).

## Todo
* npm repo.
* Code coverage.
* Add unit tests.
