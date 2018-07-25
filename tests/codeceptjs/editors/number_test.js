var assert = require('assert');
var value = '';

Feature('number');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('number.html');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"number":5.75,"number_number":5.75,"number_range":5.75}');
});

Scenario('should respect step by incrementing and decrementing the value of a number', async (I) => {
  I.amOnPage('number.html');
  I.seeElement('[data-schemapath="root.number_number"] input');
  I.executeScript(function() {
    var range = document.querySelector('[data-schemapath="root.number_number"] input');
    range.stepUp();
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    range.dispatchEvent(event);
  });
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"number":5.75,"number_number":6,"number_range":5.75}');
  I.executeScript(function() {
    var range = document.querySelector('[data-schemapath="root.number_number"] input');
    range.stepDown();
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    range.dispatchEvent(event);
  });
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"number":5.75,"number_number":5.75,"number_range":5.75}');
});

Scenario('should respect step by incrementing and decrementing the value of a range', async (I) => {
  I.amOnPage('number.html');
  I.seeElement('[data-schemapath="root.number_range"] input');
  I.executeScript(function() {
    var range = document.querySelector('[data-schemapath="root.number_range"] input');
    range.stepUp();
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    range.dispatchEvent(event);
  });
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"number":5.75,"number_number":5.75,"number_range":6}');
  I.executeScript(function() {
    var range = document.querySelector('[data-schemapath="root.number_range"] input');
    range.stepDown();
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    range.dispatchEvent(event);
  });
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"number":5.75,"number_number":5.75,"number_range":5.75}');
});

Scenario('should be readonly if specified and not disabled', async (I) => {
  I.amOnPage('read-only.html');
  I.seeElement('[name="root[number]"]');
  value = await I.grabAttributeFrom('[name="root[number]"]', 'readonly');
  assert.equal(value, 'true');
});
