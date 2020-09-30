var assert = require('assert');

Feature('core');

// https://github.com/json-editor/json-editor/issues/823
Scenario('work with JsonSchema meta-schema', async (I) => {
  I.amOnPage('issues/issue-gh-823-meta-schema.html');
  I.click('Object Properties');
  I.click('options');
  I.see('$ref');
  I.see('options');
  //pause();
  I.click('Object Properties');
  I.click('Object Properties');
  I.see('options');
});

