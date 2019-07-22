# Unit Tests

## Introduction

Unit tests are implemented using the [Jasmine](https://jasmine.github.io/) framework. To run:
```
npm run test.unit
```

You can debug unit tests via the [Karma](https://karma-runner.github.io/latest/index.html) test runner by running the following command then using Chrome developer tools:
```
npm run karma
```

## File hierarchy

Test files should have the same name as their target files but ending with `.spec.js` instead of `.js` and their subpath relative to this directory should be the same as the target file's relative to the `./src/` directory.

So a file testing `/src/editors/validator.js` should have the path `./tests/unit/editors/validator.spec.js`

## Stucturing code for testing

The way in which the codebase is set up (code is just concatenated using Gulp) means you have to do a bit of tweaking to allow the tests to `require()` the code being tested. Add a construct similar to this one in` ./src/validators/ip-validator.js` at the end of the code you need to test:

```javascript
   // Export ipValidator to allow it to be 'required()' by unit tests
   if( typeof(exports) !== 'undefined')
   {
    /* jshint undef: false */   
     exports.ipValidator = ipValidator;
   }
```