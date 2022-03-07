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
  I.seeReadOnlyAttribute('[name="root[integer]"]');
});

Scenario('should update output when (method) setValue is called', async (I) => {
  I.amOnPage('integer.html');
  I.saveScreenshot('integer-setvalue-1.png')
  I.waitForText('5', 20, '[data-schemapath="root.integer_range"] output');
  I.saveScreenshot('integer-setvalue-2.png')
  I.click('.set-value');
  I.saveScreenshot('integer-setvalue-3.png')
  I.waitForText('2', 20, '[data-schemapath="root.integer_range"] output');
  I.saveScreenshot('integer-setvalue-4.png')
});

Scenario('should validate value', async (I) => {
  I.amOnPage('integer.html');
  await I.fillField('[name="root[integer]"]', '5-5');
  I.click('.get-value');
  I.see('Value must be of type integer.', '[data-schemapath="root.integer"] div');
  assert.equal(await I.grabValueFrom('.value'), '{"integer":"5-5","integer_number":5,"integer_range":5}');
});


