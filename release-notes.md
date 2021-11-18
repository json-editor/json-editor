# Webpack Notes

## Introduction

This work package replaces Grunt-based concatenation and minification and testing, with Webpack, providing the following advantages:

1. Clearer and more modular dependency management using `import`/`export`
1. Modular code is easier to unit-test
1. On-the-fly compilation and serving of files
1. Facility for splitting distribution into several modules so that less commonly used features can be lazy-loaded (TODO)
1. Possibility of upgrading javascript ES6 by introducing babel compiler (TODO)

The emphasis is this work-package has been to make minimal and localized changes to the core code to factilitate merging back into the main branch. However the interdependencies between the different files were quite complicated and untangling them with minimal impact hasn't been easy.

Assuming the PR is accepted and merged into the main branch, there will be potential for a lot more refactoring and simplification of the codebase.

## Useful docs

https://webpack.js.org/guides/

I loosely based the structure of the webpack config files on this article [angular webpack guide](https://v5.angular.io/guide/webpack).

## Summary of Changes

1. Refactored code to use `import` / `export` to specify dependencies instead of relying on concatenation
1. Replaced Grunt with Webpack tasks - setting up files in `./config` for production/development/test builds
1. Replaced jshint with eslint - eslint better supports newer js features and its config files can be picked up automatically by IDEs such as VS Code, providing intellisense linting support
1. Created some unit test stub implementations
1. package.json:
    1. Replaced all grunt-based scripts 
    1. Removed all grunt dev-dependencies (also package.lock.json)

1. updated docs
1. removed other references to Grunt

## TODO

1. implement headless unit testing and integrate into Travis

## Future Work

### Polyfills

I have included the old ie9.js file in the build even though it breaks the modularity afforded by webpack. Webpack has its own infrastructure for providing polyfills in an efficient way and we should look into migrating to that.

### Other Package Optimisations

Currently all code is compiled into a single bundle. We should look at splitting less commonly-used code into lazy-loaded bundles to allow speedier loading of core code

### General Refactoring

Now that dependencies in the code are clearer, opportunites for improving structure and readability of code should reveal themselves.

### Expansion of Unit Test Coverage

I have provided some very basic unit-test stubs. It should now be much easier to unit test code so we should:

1. Ensure that before editing existing code, we write unit-tests to cover our assumptions about its functions
1. When writing new code, adopt a TDD approach - IE, write tests *before* writing the implementation

### Upgrade to ES6

Javascript ES6 provides many useful language features which make for clearer, less error-prone code including:
1. classes (which would allow us to get rid of homegrown class.js)
1. template literals
1. let/const providing better variable scoping

It is fairly easy to introduce transpilation from ES6 via Webpack to enable these features - I'd recommend doing so.

### Editors

#### JSONEditor.defaults

The base class editor had a dependency on the `translate` and `callbacks` properties of `JSONEditor.defaults`.

Aditionally, all  editors had a single dependency on `JSONEditor` via the `.defaults.options` property, accessed in the `build()` or `afterInputReady()` method. In each case, these options are merged with the user options using a virtually identical formula. Would it be worth looking at creating a base class helper method for this merge, to keep things DRY?.

For now I have passed in `JSONEditor.defaults` as `defaults`.

### NPM Release

Set/export `CHROME_BIN=/path/to/chrome_or_chromium`, start stack with `docker-compose up`

1. Update `CHANGELOG.md`
2. Switch to `release` branch and `merge master into release`
3. NPM login: `npm login`
4. Build new version: `npm version 2.x.x`

The `npm version` command will automatically build the source files & test the new generated script files.  
On success the `postversion` script will push the source to GitHub and publish the version on NPM.
