/*
Stub test file
TODO: Write unit tests for all interfaces
*/

import { Validator } from '../../src/validator';
import { getDefaults } from '../../src/defaults';

describe("Validator", function() {
  it("should exist", function(){
    expect(Validator).toBeTruthy();
  });
  
  describe("Constructor()", function(){
      it("should create a new object", function(){
        var jsonEditor = {};
        var schema = {};
        var options = {};
        var defaults = getDefaults();
        var instance = new Validator(jsonEditor, schema,options,defaults);
        expect(instance).toBeTruthy();
      });
    });
  
});