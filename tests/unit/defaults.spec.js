/*
Stub test file
TODO: Write unit tests for all interfaces
*/

import { getDefaults } from '../../src/defaults';


describe("defaults", function() {
  it("should be a function", function(){
    expect(typeof getDefaults).toBe("function");
  });  
  it("should return an object", function(){
    expect(typeof(getDefaults())).toBe("object");
  });
  it("should have standard properties defined", function(){
    let defaults = getDefaults();
    expect(typeof(defaults.themes)).toBe("object");
    expect(typeof(defaults.templates)).toBe("object");
    expect(typeof(defaults.iconlibs)).toBe("object");
    expect(typeof(defaults.editors)).toBe("object");
    expect(typeof(defaults.languages)).toBe("object");
    expect(Array.isArray(defaults.resolvers)).toBe(true);
    expect(Array.isArray(defaults.custom_validators)).toBe(true);
  });
});