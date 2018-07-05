var assert = require('assert');

Feature('array');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('array.html');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '[]');
});

Scenario('should ask for confirmation on node delete', async (I) => {
  I.amOnPage('array.html');
  I.click('Add Node');
  I.see('Node 1');
  I.click('Delete Node');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Node 1');
  I.click('Delete Node');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Node 1');
});

Scenario('should ask for confirmation on node delete last', async (I) => {
  I.amOnPage('array.html');
  I.click('Add Node');
  I.click('Add Node');
  I.see('Node 1');
  I.see('Node 2');
  I.click('Delete Last Node');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Node 1');
  I.see('Node 2');
  I.click('Delete Last Node');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.see('Node 1');
  I.dontSee('Node 2');
});

Scenario('should ask for confirmation on node delete all', async (I) => {
  I.amOnPage('array.html');
  I.click('Add Node');
  I.click('Add Node');
  I.see('Node 1');
  I.see('Node 2');
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.cancelPopup();
  I.see('Node 1');
  I.see('Node 2');
  I.click('Delete All');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();
  I.dontSee('Node 1');
  I.dontSee('Node 2');
});