var assert = require('assert');

Feature('confirm delete');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('confirm-delete.html');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '[]');
});

Scenario('should ask for confirmation on node delete', async (I) => {
  I.amOnPage('confirm-delete.html');
  I.click('Add Node');
  I.see('Node 1');
  I.click('Delete Node');
  I.seeInPopup('Confirm to remove.');
  I.cancelPopup();
  I.see('Node 1');
  I.click('Delete Node');
  I.seeInPopup('Confirm to remove.');
  I.acceptPopup();
  I.dontSee('Node 1');
});

Scenario('should ask for confirmation on node delete last', async (I) => {
  I.amOnPage('confirm-delete.html');
  I.click('Add Node');
  I.click('Add Node');
  I.see('Node 1');
  I.see('Node 2');
  I.click('Delete Last Node');
  I.seeInPopup('Confirm to remove.');
  I.cancelPopup();
  I.see('Node 1');
  I.see('Node 2');
  I.click('Delete Last Node');
  I.seeInPopup('Confirm to remove.');
  I.acceptPopup();
  I.see('Node 1');
  I.dontSee('Node 2');
});

Scenario('should ask for confirmation on node delete all', async (I) => {
  I.amOnPage('confirm-delete.html');
  I.click('Add Node');
  I.click('Add Node');
  I.see('Node 1');
  I.see('Node 2');
  I.click('Delete All');
  I.seeInPopup('Confirm to remove.');
  I.cancelPopup();
  I.see('Node 1');
  I.see('Node 2');
  I.click('Delete All');
  I.seeInPopup('Confirm to remove.');
  I.acceptPopup();
  I.dontSee('Node 1');
  I.dontSee('Node 2');
});