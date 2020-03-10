/*
Stub test file
TODO: Write unit tests for all interfaces
*/

import { defaults } from '../../src/defaults';


describe("defaults", function() {
  it("should be an object", function(){
    expect(typeof defaults).toBe("object");
  });
  it("should have standard properties defined", function(){
    expect(typeof(defaults.themes)).toBe("object");
    expect(typeof(defaults.templates)).toBe("object");
    expect(typeof(defaults.iconlibs)).toBe("object");
    expect(typeof(defaults.editors)).toBe("object");
    expect(typeof(defaults.languages)).toBe("object");
    expect(Array.isArray(defaults.resolvers)).toBe(true);
    expect(Array.isArray(defaults.custom_validators)).toBe(true);
  });
});
