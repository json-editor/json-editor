var assert = require('assert');

Feature('checkbox');

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  I.waitForText('READY', 5, '.state')
  I.seeDisabledAttribute('[name="root[checkbox]"]');
});
