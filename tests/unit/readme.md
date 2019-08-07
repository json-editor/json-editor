# Unit Tests

## Introduction

Unit tests are implemented using the [Jasmine](https://jasmine.github.io/) framework. To run directly from the command line:
```
npm run test.unit
```

## Karma Test Runner

### Running

You can continuously watch and debug unit tests using the [Karma](https://karma-runner.github.io/latest/index.html) test runner:
```
npm run karma
```

The browser will start and run each unit test in a random sequence, showing the result. If tests are target code is edited, the code will be recompiled and the tests re-run.

### Debugging

To debug tests click the debug button - this will allow you to select each test to run in debug mode. 

You can set breakpoints on the original code by:

1. Opening Chrome developer tools
2. Opening the Sources tab
3. Expanding the Webpack://./tests/unit/ hierarchy to display your test file
4. Clicking on the line number to place the breakpoint

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