/* global Feature Scenario */

var assert = require('assert');

Feature('array');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('array.html');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[]');
});

Scenario('unique items arrays sorting @unique-itmes-sorting', async (I) => {
  I.amOnPage('array-unique-items-sort.html')
  I.waitForElement('.je-ready', 10)
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(1)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(2)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(3)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(4)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(5)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(6)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(7)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(8)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07","08"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(9)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07","08","09"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(10)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07","08","09","10"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(11)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07","08","09","10","11"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(12)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07","08","09","10","11","12"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(13)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07","08","09","10","11","12","13"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(14)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07","08","09","10","11","12","13","14"]}')
  I.click('[data-schemapath="root.items"] .form-control:nth-of-type(15)')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '{"items":["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"]}')
});

Scenario('should trigger array (table) editing triggers @retry', async (I) => {
  I.amOnPage('table-move-events.html');
  I.seeElement('[data-schemapath="root.0"]');
  I.seeElement('[data-schemapath="root.1"]');
  I.seeElement('[data-schemapath="root.2"]');
  I.seeElement('[data-schemapath="root.3"]');
  I.seeElement('[data-schemapath="root.4"]');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '["A","B","C","D","E"]');

  I.amAcceptingPopups();
  I.click('//button[contains(@class, "json-editor-btn-moveup") and @data-i="1"]');
  I.retry({ retries: 5, minTimeout: 500 }).seeInPopup('moveRow');
  I.acceptPopup();
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '["B","A","C","D","E"]');

  I.amAcceptingPopups();
  I.click('//button[contains(@class, "json-editor-btn-movedown") and @data-i="1"]');
  I.retry({ retries: 5, minTimeout: 500 }).seeInPopup('moveRow');
  I.acceptPopup();
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '["B","C","A","D","E"]');

  I.amAcceptingPopups();
  I.click('//button[contains(@class, "json-editor-btn-copy") and @data-i="2"]');
  I.retry({ retries: 5, minTimeout: 500 }).seeInPopup('copyRow');
  I.acceptPopup();
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '["B","C","A","A","D","E"]');

  I.amAcceptingPopups();
  I.click('.json-editor-btntype-add');
  I.retry({ retries: 5, minTimeout: 500 }).seeInPopup('addRow');
  I.acceptPopup();
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '["B","C","A","A","D","E",""]');

  // This test will fail when using Puppeteer due to the way Puppeteer handles popups.
  // Puppeteer apparently only sees the text in the last popup, so it doesn't see the
  // 'Are you sure you want to remove this node?' popup text.
  // ToDo: Change test so instead of using popup for test values like 'deleteRow', use a
  // form field. Similar to the '.debug' field.
  I.amAcceptingPopups();
  I.click('.json-editor-btntype-deletelast');
  I.retry({ retries: 5, minTimeout: 500 }).seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.amAcceptingPopups();
  I.retry({ retries: 5, minTimeout: 500 }).seeInPopup('deleteRow');
  I.acceptPopup();
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '["B","C","A","A","D","E"]');

  // This test will fail when using Puppeteer due to the way Puppeteer handles popups.
  I.amAcceptingPopups();
  I.click('.json-editor-btntype-deleteall');
  I.retry({ retries: 5, minTimeout: 500 }).seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.amAcceptingPopups();
  I.retry({ retries: 5, minTimeout: 500 }).seeInPopup('deleteAllRows');
  I.acceptPopup();
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '[]');
});

Scenario('should array editing triggers', async (I) => {
  I.amOnPage('array-move-events.html');
  I.seeElement('[data-schemapath="root.0"]');
  I.seeElement('[data-schemapath="root.1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '["A","B"]');

  I.click('.json-editor-btn-moveup');
  assert.equal(await I.grabValueFrom('.action'), 'moveRow');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '["B","A"]');

  I.click('.json-editor-btn-movedown');
  assert.equal(await I.grabValueFrom('.action'), 'moveRow');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '["A","B"]');

  I.click('.json-editor-btntype-add');
  assert.equal(await I.grabValueFrom('.action'), 'addRow');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '["A","B",""]');

  I.amAcceptingPopups();
  I.click('.json-editor-btntype-deletelast');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  assert.equal(await I.grabValueFrom('.action'), 'deleteRow');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '["A","B"]');

  I.amAcceptingPopups();
  I.click('.json-editor-btntype-deleteall');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  assert.equal(await I.grabValueFrom('.action'), 'deleteAllRows');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[]');
});

Scenario('should work well with string editors', async (I) => {
  I.amOnPage('array-strings.html');
  I.click('Add String');
  I.click('Add String');
  I.click('Add String');
  I.click('Add String');
  I.click('Add String');
  I.seeElement('[name="root[0]"]');
  I.seeElement('[name="root[1]"]');
  I.seeElement('[name="root[2]"]');
  I.seeElement('[name="root[3]"]');
  I.seeElement('[name="root[4]"]');
  I.fillField('[name="root[0]"]', "1");
  I.fillField('[name="root[1]"]', "2");
  I.fillField('[name="root[2]"]', "3");
  I.fillField('[name="root[3]"]', "4");
  I.fillField('[name="root[4]"]', "5");
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '["1","2","3","4","5"]');

  // shuffle
  I.click('.moveup[data-i="4"]');
  I.click('.moveup[data-i="2"]');
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '["3","1","2","5","4"]');

  // delete single
  I.see('String 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('String 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('String 5');

  // delete last
  I.see('String 4');
  I.amCancellingPopups();
  I.click('Delete Last String');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('String 4');
  I.amAcceptingPopups();
  I.click('Delete Last String');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('String 4');

  // delete all
  I.see('String 1');
  I.see('String 2');
  I.see('String 3');
  I.amCancellingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('String 1');
  I.see('String 2');
  I.see('String 3');
  I.amAcceptingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('String 1');
  I.dontSee('String 2');
  I.dontSee('String 3');
});

Scenario('should work well with number editors', async (I) => {
  I.amOnPage('array-numbers.html');
  I.click('Add Number');
  I.click('Add Number');
  I.click('Add Number');
  I.click('Add Number');
  I.click('Add Number');
  I.seeElement('[name="root[0]"]');
  I.seeElement('[name="root[1]"]');
  I.seeElement('[name="root[2]"]');
  I.seeElement('[name="root[3]"]');
  I.seeElement('[name="root[4]"]');
  I.fillField('[name="root[0]"]', "1");
  I.fillField('[name="root[1]"]', "2");
  I.fillField('[name="root[2]"]', "3");
  I.fillField('[name="root[3]"]', "4");
  I.fillField('[name="root[4]"]', "5");
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[1,2,3,4,5]');

  // shuffle
  I.click('.moveup[data-i="4"]');
  I.click('.moveup[data-i="2"]');
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[3,1,2,5,4]');

  // delete single
  I.see('Number 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Number 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Number 5');

  // delete last
  I.see('Number 4');
  I.amCancellingPopups();
  I.click('Delete Last Number');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Number 4');
  I.amAcceptingPopups();
  I.click('Delete Last Number');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Number 4');

  // delete all
  I.see('Number 1');
  I.see('Number 2');
  I.see('Number 3');
  I.amCancellingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Number 1');
  I.see('Number 2');
  I.see('Number 3');
  I.amAcceptingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Number 1');
  I.dontSee('Number 2');
  I.dontSee('Number 3');
});

Scenario('should work well with integer editors', async (I) => {
  I.amOnPage('array-integers.html');
  I.click('Add Integer');
  I.click('Add Integer');
  I.click('Add Integer');
  I.click('Add Integer');
  I.click('Add Integer');
  I.seeElement('[name="root[0]"]');
  I.seeElement('[name="root[1]"]');
  I.seeElement('[name="root[2]"]');
  I.seeElement('[name="root[3]"]');
  I.seeElement('[name="root[4]"]');
  I.fillField('[name="root[0]"]', "1");
  I.fillField('[name="root[1]"]', "2");
  I.fillField('[name="root[2]"]', "3");
  I.fillField('[name="root[3]"]', "4");
  I.fillField('[name="root[4]"]', "5");
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[1,2,3,4,5]');

  // shuffle
  I.click('.moveup[data-i="4"]');
  I.click('.moveup[data-i="2"]');
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[3,1,2,5,4]');

  // delete single
  I.see('Integer 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Integer 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Integer 5');

  // delete last
  I.see('Integer 4');
  I.amCancellingPopups();
  I.click('Delete Last Integer');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Integer 4');
  I.amAcceptingPopups();
  I.click('Delete Last Integer');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Integer 4');

  // delete all
  I.see('Integer 1');
  I.see('Integer 2');
  I.see('Integer 3');
  I.amCancellingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Integer 1');
  I.see('Integer 2');
  I.see('Integer 3');
  I.amAcceptingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Integer 1');
  I.dontSee('Integer 2');
  I.dontSee('Integer 3');
});

Scenario('should work well with select editors', async (I) => {
  I.amOnPage('array-selects.html');
  I.click('Add Select');
  I.click('Add Select');
  I.seeElement('[name="root[0]"]');
  I.seeElement('[name="root[1]"]');
  I.selectOption('[name="root[0]"]', "true");
  I.selectOption('[name="root[1]"]', "false");
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[true,false]');

  // shuffle
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[false,true]');

  // delete single
  I.click('Add Select');
  I.click('Add Select');
  I.click('Add Select');
  I.see('Select 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Select 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Select 5');

  // delete last
  I.see('Select 4');
  I.amCancellingPopups();
  I.click('Delete Last Select');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Select 4');
  I.amAcceptingPopups();
  I.click('Delete Last Select');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Select 4');

  // delete all
  I.see('Select 1');
  I.see('Select 2');
  I.see('Select 3');
  I.amCancellingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Select 1');
  I.see('Select 2');
  I.see('Select 3');
  I.amAcceptingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Select 1');
  I.dontSee('Select 2');
  I.dontSee('Select 3');
});

Scenario('should work well with checkbox editors', async (I) => {
  I.amOnPage('array-checkboxes.html');
  I.click('Add Checkbox');
  I.click('Add Checkbox');
  I.click('Add Checkbox');
  I.click('Add Checkbox');
  I.click('Add Checkbox');
  I.seeElement('[data-schemapath="root.0"]');
  I.seeElement('[data-schemapath="root.1"]');
  I.seeElement('[data-schemapath="root.2"]');
  I.seeElement('[data-schemapath="root.3"]');
  I.seeElement('[data-schemapath="root.4"]');
  I.checkOption('1', '[data-schemapath="root.0"]');
  I.checkOption('2', '[data-schemapath="root.1"]');
  I.checkOption('3', '[data-schemapath="root.2"]');
  I.checkOption('4', '[data-schemapath="root.3"]');
  I.checkOption('5', '[data-schemapath="root.4"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["1"],["2"],["3"],["4"],["5"]]');

  // shuffle
  I.click('.moveup[data-i="4"]');
  I.click('.moveup[data-i="2"]');
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["3"],["1"],["2"],["5"],["4"]]');

  // delete single
  I.see('Checkbox 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Checkbox 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Checkbox 5');

  // delete last
  I.see('Checkbox 4');
  I.amCancellingPopups();
  I.click('Delete Last Checkbox');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Checkbox 4');
  I.amAcceptingPopups();
  I.click('Delete Last Checkbox');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Checkbox 4');

  // delete all
  I.see('Checkbox 1');
  I.see('Checkbox 2');
  I.see('Checkbox 3');
  I.amCancellingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Checkbox 1');
  I.see('Checkbox 2');
  I.see('Checkbox 3');
  I.amAcceptingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Checkbox 1');
  I.dontSee('Checkbox 2');
  I.dontSee('Checkbox 3');
});

Scenario('should work well with checkbox editors with infoText', async (I) => {
  I.amOnPage('array-checkboxes-infotext.html')

  function check (checkboxId, title, infoText) {
    const label = '//label[@for="' + checkboxId + '"]'
    I.see(title, label)
    const infoTextIcon = label + '/span[@class="je-infobutton-icon"]'

    if (infoText) {
      I.seeElement(infoTextIcon)
      I.moveCursorTo(infoTextIcon)
      I.see(infoText, label + '//span[@class="je-infobutton-tooltip"]')
    } else {
      I.dontSeeElement(infoTextIcon)
    }
  }

  check('root0', 'old a')
  check('root1', 'b')
  check('root2', '3')
  check('root3', '4', 'dd')
  check('root4', 'e', 'ee')
})

Scenario('should work well with rating editors', async (I) => {
  I.amOnPage('array-ratings.html');
  I.seeElement('[data-schemapath="root.0"]');
  I.seeElement('[data-schemapath="root.1"]');
  I.seeElement('[data-schemapath="root.2"]');
  I.seeElement('[data-schemapath="root.3"]');
  I.seeElement('[data-schemapath="root.4"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[1,2,3,4,5]');

  // shuffle
  I.click('.moveup[data-i="4"]');
  I.click('.moveup[data-i="2"]');
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[3,1,2,5,4]');

  // delete single
  I.see('Rating 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Rating 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Rating 5');

  // delete last
  I.see('Rating 4');
  I.amCancellingPopups();
  I.click('Delete Last Rating');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Rating 4');
  I.amAcceptingPopups();
  I.click('Delete Last Rating');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Rating 4');

  // delete all
  I.see('Rating 1');
  I.see('Rating 2');
  I.see('Rating 3');
  I.amCancellingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Rating 1');
  I.see('Rating 2');
  I.see('Rating 3');
  I.amAcceptingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Rating 1');
  I.dontSee('Rating 2');
  I.dontSee('Rating 3');
});

Scenario('should work well with multiselect editors', async (I) => {
  I.amOnPage('array-multiselects.html');
  I.click('Add Multiselect');
  I.click('Add Multiselect');
  I.click('Add Multiselect');
  I.click('Add Multiselect');
  I.click('Add Multiselect');
  I.seeElement('[data-schemapath="root.0"]');
  I.seeElement('[data-schemapath="root.1"]');
  I.seeElement('[data-schemapath="root.2"]');
  I.seeElement('[data-schemapath="root.3"]');
  I.seeElement('[data-schemapath="root.4"]');
  I.selectOption('[name="root[0]"]', "1");
  I.selectOption('[name="root[1]"]', "2");
  I.selectOption('[name="root[2]"]', "3");
  I.selectOption('[name="root[3]"]', "4");
  I.selectOption('[name="root[4]"]', "5");
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["1"],["2"],["3"],["4"],["5"]]');

  // shuffle
  I.click('.moveup[data-i="4"]');
  I.click('.moveup[data-i="2"]');
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["3"],["1"],["2"],["5"],["4"]]');

  // delete single
  I.see('Multiselect 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Multiselect 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Multiselect 5');

  // delete last
  I.see('Multiselect 4');
  I.amCancellingPopups();
  I.click('Delete Last Multiselect');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Multiselect 4');
  I.click('Delete Last Multiselect');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Multiselect 4');

  // delete all
  I.see('Multiselect 1');
  I.see('Multiselect 2');
  I.see('Multiselect 3');
  I.amCancellingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Multiselect 1');
  I.see('Multiselect 2');
  I.see('Multiselect 3');
  I.amAcceptingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Multiselect 1');
  I.dontSee('Multiselect 2');
  I.dontSee('Multiselect 3');
});

Scenario('should work well with object editors', async (I) => {
  I.amOnPage('array-objects.html');
  I.click('Add Object');
  I.click('Add Object');
  I.click('Add Object');
  I.click('Add Object');
  I.click('Add Object');
  I.seeElement('[name="root[0][property]"]');
  I.seeElement('[name="root[1][property]"]');
  I.seeElement('[name="root[2][property]"]');
  I.seeElement('[name="root[3][property]"]');
  I.seeElement('[name="root[4][property]"]');
  I.fillField('[name="root[0][property]"]', "1");
  I.fillField('[name="root[1][property]"]', "2");
  I.fillField('[name="root[2][property]"]', "3");
  I.fillField('[name="root[3][property]"]', "4");
  I.fillField('[name="root[4][property]"]', "5");
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[{"property":"1"},{"property":"2"},{"property":"3"},{"property":"4"},{"property":"5"}]');

  // shuffle
  I.click('.moveup[data-i="4"]');
  I.click('.moveup[data-i="2"]');
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[{"property":"3"},{"property":"1"},{"property":"2"},{"property":"5"},{"property":"4"}]');

  // delete single
  I.see('Object 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Object 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Object 5');

  // delete last
  I.see('Object 4');
  I.amCancellingPopups();
  I.click('Delete Last Object');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Object 4');
  I.amAcceptingPopups();
  I.click('Delete Last Object');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Object 4');

  // delete all
  I.see('Object 1');
  I.see('Object 2');
  I.see('Object 3');
  I.amCancellingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Object 1');
  I.see('Object 2');
  I.see('Object 3');
  I.amAcceptingPopups();
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Object 1');
  I.dontSee('Object 2');
  I.dontSee('Object 3');
});

Scenario('should work well with nested array editors', async (I) => {
  I.amOnPage('array-nested-arrays.html');
  I.click('Add Array');
  I.click('Add Array');
  I.click('Add Array');
  I.click('Add Array');
  I.click('Add Array');
  I.seeElement('[data-schemapath="root.0"]');
  I.seeElement('[data-schemapath="root.1"]');
  I.seeElement('[data-schemapath="root.2"]');
  I.seeElement('[data-schemapath="root.3"]');
  I.seeElement('[data-schemapath="root.4"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[[],[],[],[],[]]');

  // adds one string editor in each first level array
  for (let i = 0; i < 5; i++) {
    I.click('Add String', '[data-schemapath="root.' + i + '"]');
    I.fillField('[data-schemapath="root.' + i + '"] [name="root[' + i + '][0]"]', String(i + 1));
  }

  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["1"],["2"],["3"],["4"],["5"]]');

  // shuffle
  I.click('.moveup[data-i="4"]');
  I.click('.moveup[data-i="2"]');
  I.click('.moveup[data-i="1"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["3"],["1"],["2"],["5"],["4"]]');

  // delete single
  I.see('Array 5');
  I.amCancellingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Array 5');
  I.amAcceptingPopups();
  I.click('[data-schemapath="root.4"] .delete');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Array 5');

  // delete last
  I.see('Array 4');
  I.amCancellingPopups();
  I.click('Delete Last Array');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Array 4');
  I.amAcceptingPopups();
  I.click('Delete Last Array');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Array 4');

  // delete all
  I.see('Array 1');
  I.see('Array 2');
  I.see('Array 3');
  // there are hidden "Delete All" buttons right now and "I.click(Delete All)"
  // will attempt to click the first match. It fails because is hidden.
  // this is why i use this script. is more flexible.
  I.amCancellingPopups();
  I.executeScript(function() {
    var e = document.querySelectorAll('.json-editor-btn-delete');
    e[e.length - 1].click();
  });
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Array 1');
  I.see('Array 2');
  I.see('Array 3');
  I.amAcceptingPopups();
  I.executeScript(function() {
    var e = document.querySelectorAll('.json-editor-btn-delete');
    e[e.length - 1].click();
  });
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Array 1');
  I.dontSee('Array 2');
  I.dontSee('Array 3');

  // manipulate nested items
  I.amOnPage('array-nested-arrays.html');
  I.click('Add Array');
  I.click('Add Array');
  I.click('Add Array');
  I.click('Add Array');
  I.click('Add Array');
  I.seeElement('[data-schemapath="root.0"]');
  I.seeElement('[data-schemapath="root.1"]');
  I.seeElement('[data-schemapath="root.2"]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[[],[],[],[],[]]');

  // adds one string editor in each first level array
  for (let i = 0; i < 5; i++) {
    I.click('Add String', '[data-schemapath="root.' + i + '"]');
    I.click('Add String', '[data-schemapath="root.' + i + '"]');
    I.click('Add String', '[data-schemapath="root.' + i + '"]');
    I.click('Add String', '[data-schemapath="root.' + i + '"]');
    I.click('Add String', '[data-schemapath="root.' + i + '"]');
    I.fillField('[data-schemapath="root.' + i + '"] [name="root[' + i + '][0]"]', "1");
    I.fillField('[data-schemapath="root.' + i + '"] [name="root[' + i + '][1]"]', "2");
    I.fillField('[data-schemapath="root.' + i + '"] [name="root[' + i + '][2]"]', "3");
    I.fillField('[data-schemapath="root.' + i + '"] [name="root[' + i + '][3]"]', "4");
    I.fillField('[data-schemapath="root.' + i + '"] [name="root[' + i + '][4]"]', "5");
  }

  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["1","2","3","4","5"],["1","2","3","4","5"],["1","2","3","4","5"],["1","2","3","4","5"],["1","2","3","4","5"]]');

  // shuffle every strings array
  for (let i = 0; i < 5; i++) {
    I.click('[data-schemapath="root.' + i + '.4"] .moveup');
    I.click('[data-schemapath="root.' + i + '.2"] .moveup');
    I.click('[data-schemapath="root.' + i + '.1"] .moveup');
  }

  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["3","1","2","5","4"],["3","1","2","5","4"],["3","1","2","5","4"],["3","1","2","5","4"],["3","1","2","5","4"]]');

  // delete single (fifth) element from every string array
  for (let i = 0; i < 5; i++) {
    I.see('String 5', '[data-schemapath="root.' + i + '"]');
    I.amCancellingPopups();
    I.click('[data-schemapath="root.' + i + '.4"] .delete');
    I.seeInPopup('Are you sure you want to remove this node?');
    I.cancelPopup();
    I.see('String 5', '[data-schemapath="root.' + i + '"]');
    I.amAcceptingPopups();
    I.click('[data-schemapath="root.' + i + '.4"] .delete');
    I.seeInPopup('Are you sure you want to remove this node?');
    I.acceptPopup();
    I.dontSee('String 5', '[data-schemapath="root.' + i + '"]');
  }

  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["3","1","2","5"],["3","1","2","5"],["3","1","2","5"],["3","1","2","5"],["3","1","2","5"]]');

  // delete last (fourth) element from every string array
  for (let i = 0; i < 5; i++) {
    I.see('String 4', '[data-schemapath="root.' + i + '"]');
    I.amCancellingPopups();
    I.click('Delete Last String', '[data-schemapath="root.' + i + '"]');
    I.seeInPopup('Are you sure you want to remove this node?');
    I.cancelPopup();
    I.see('String 4', '[data-schemapath="root.' + i + '"]');
    I.amAcceptingPopups();
    I.click('Delete Last String', '[data-schemapath="root.' + i + '"]');
    I.seeInPopup('Are you sure you want to remove this node?');
    I.acceptPopup();
    I.dontSee('String 4', '[data-schemapath="root.' + i + '"]');
  }

  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[["3","1","2"],["3","1","2"],["3","1","2"],["3","1","2"],["3","1","2"]]');

  // delete last (fourth) element from every string array
  for (let i = 0; i < 5; i++) {
    I.see('String 1', '[data-schemapath="root.' + i + '"]');
    I.see('String 2', '[data-schemapath="root.' + i + '"]');
    I.see('String 3', '[data-schemapath="root.' + i + '"]');
    I.amCancellingPopups();
    I.click('Delete All', '[data-schemapath="root.' + i + '"]');
    I.seeInPopup('Are you sure you want to remove this node?');
    I.cancelPopup();
    I.see('String 1', '[data-schemapath="root.' + i + '"]');
    I.see('String 2', '[data-schemapath="root.' + i + '"]');
    I.see('String 3', '[data-schemapath="root.' + i + '"]');
    I.amAcceptingPopups();
    I.click('Delete All', '[data-schemapath="root.' + i + '"]');
    I.seeInPopup('Are you sure you want to remove this node?');
    I.acceptPopup();
    I.dontSee('String 1', '[data-schemapath="root.' + i + '"]');
    I.dontSee('String 2', '[data-schemapath="root.' + i + '"]');
    I.dontSee('String 3', '[data-schemapath="root.' + i + '"]');
  }

  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[[],[],[],[],[]]');
});

Scenario('should work well with selectize multiselect editors', async (I) => {
  I.amOnPage('array-selectize.html');
  I.click('Add item');
  await I.seeElement('[data-schemapath="root.0"]');
  I.click('Add item');
  await I.seeElement('[data-schemapath="root.1"]');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  // ensure defaults
  assert.equal(value, '[["1","2"],["1","2"]]');

  // every selected item has remove button
  I.seeElement('[data-schemapath="root.0"] .selectize-input [data-value="1"] a.remove');
  I.seeElement('[data-schemapath="root.0"] .selectize-input [data-value="2"] a.remove');
  I.seeElement('[data-schemapath="root.1"] .selectize-input [data-value="1"] a.remove');
  I.seeElement('[data-schemapath="root.1"] .selectize-input [data-value="2"] a.remove');

  // could not add values
  I.fillField('[data-schemapath="root.1"] input[type="text"]', "123");
  I.dontSeeElement('.create.active');

  // selectize dropdown is filled with enum values
  I.click('[data-schemapath="root.0"] .selectize-input');
  I.seeElement('[data-schemapath="root.0"] .selectize-dropdown-content [data-value="3"]');
  I.seeElement('[data-schemapath="root.0"] .selectize-dropdown-content [data-value="4"]');
});
