var assert = require('assert');

Feature('multiselect');

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  I.seeDisabledAttribute('[name="root[multiselect]"]');
});
