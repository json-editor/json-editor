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
});