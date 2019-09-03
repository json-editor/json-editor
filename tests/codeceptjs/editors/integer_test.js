var assert = require('assert');

Feature('integer');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('integer.html');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"integer":5,"integer_number":5,"integer_range":5}');
});

Scenario('should respect step by incrementing and decrementing the value of a number', async (I) => {
  I.amOnPage('integer.html');
  I.seeElement('[data-schemapath="root.integer"] input');
  I.executeScript(function() {
    var range = document.querySelector('[data-schemapath="root.integer_number"] input');
    range.stepUp();
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    range.dispatchEvent(event);
  });
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"integer":5,"integer_number":10,"integer_range":5}');
  I.executeScript(function() {
    var range = document.querySelector('[data-schemapath="root.integer_number"] input');
    range.stepDown();
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    range.dispatchEvent(event);
  });
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"integer":5,"integer_number":5,"integer_range":5}');
});

Scenario('should respect step by incrementing and decrementing the value of a range', async (I) => {
  I.amOnPage('integer.html');
  I.seeElement('[data-schemapath="root.integer_range"] input');
  I.executeScript(function() {
    var range = document.querySelector('[data-schemapath="root.integer_range"] input');
    range.stepUp();
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    range.dispatchEvent(event);
  });
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"integer":5,"integer_number":5,"integer_range":10}');
  I.executeScript(function() {
    var range = document.querySelector('[data-schemapath="root.integer_range"] input');
    range.stepDown();
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    range.dispatchEvent(event);
  });
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"integer":5,"integer_number":5,"integer_range":5}');
});

Scenario('should be readonly if specified and not disabled', async (I) => {
  I.amOnPage('read-only.html');
  //I.seeElement('[name="root[integer]"]');
  //assert.equal(await I.grabAttributeFrom('[name="root[integer]"]', 'readonly'), 'true');
  I.seeElement('[name="root[integer]"]:read-only');
});
