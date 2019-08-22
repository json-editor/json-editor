/*
Stub test file
TODO: Write unit tests for all interfaces
*/
import { JSONEditor } from '../../src/core';

const schema = 
{
  type:'object',
  properties:
  {
    name:{type:"string"}
  }
}


describe("JSONEditor", function() {

  // inject the HTML fixture for the tests
  beforeEach(function() {
    var fixture = '<div id="fixture"></div>';

    document.body.insertAdjacentHTML(
      'afterbegin', 
      fixture);
  });

  // remove the html fixture from the DOM
  afterEach(function() {
    document.body.removeChild(document.getElementById('fixture'));
  });  

  it("should create an editor", function(){
    // expect(JSONEditor).toBeTruthy();
    var element = document.getElementById('fixture');
    console.log("Attempting to create new JSONEditor");
    var editor = new JSONEditor(element, {schema:schema });
  });
})