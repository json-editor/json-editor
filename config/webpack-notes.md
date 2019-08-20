# Webpack Notes

## Introduction

This work package replaces Grunt-based concatenation and minification and testing, with Webpack, providing the following advantages:

1. Clearer and more modular dependency management using `import`/`export`
1. Module code is easier to unit-test
1. On-the-fly compilation and serving of files
1. Facility for splitting distribution into several modules so that less commonly used features can be lazy-loaded (TODO)
1. Possibility of upgrading javascript ES6 by introducing babel compiler (TODO)

The emphasis is this work-package has been to make minimal and localized changes to the core code to factilitate merging back into the main branch. However the interdependencies between the different files were quite complicated and untangling them with minimal impact hasn't been easy.

Assuming the PR is accepted and merged into the main branch, there will be potential for a lot more refactoring and simplification of the codebase.

## Useful docs

https://webpack.js.org/guides/

https://v5.angular.io/guide/webpack

## Summary of Changes

1. Refactored code to use `import` / `export` to specify dependencies instead of relying on concatenation
1. Replaced Grunt with Webpack tasks - setting up files in `./config` for production/development/test builds
1. Replaced jshint with eslint
1. Created some unit test stub implementations
1. package.json:
    1. Replaced all grunt-based scripts 
    1. Removed all grunt dev-dependencies (also package.lock.json)

1. updated docs
1. removed other references to Grunt

## TODO

1. ie9.js polyfill - can we get rid altogether?
1. implement afterAll in core.spec.js
1. implement headless unit testing and integrate into Travis


## Future Work

### Editors

#### JSONEditor.defaults

The base class editor had a dependency on the `translate` and `callbacks` properties of `JSONEditor.defaults`.

Aditionally, all  editors had a single dependency on `JSONEditor` via the `.defaults.options` property, accessed in the `build()` or `afterInputReady()` method. In each case, these options are merged with the user options using a virtually identical formula. Would it be worth looking at creating a base class helper method for this merge, to keep things DRY?.

For now I have passed in `JSONEditor.defaults` as `defaults`.

#### MultipleEditor validator
Aditionally, MultipleEditor needs to create an instance of the Validator class (not sure why only that editor)
