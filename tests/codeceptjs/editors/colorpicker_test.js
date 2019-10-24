var assert = require('assert');

Feature('colorpicker');

Scenario('test ColorPicker Editor  without third party library', async (I) => {
  I.amOnPage('colorpicker-no-3rd-party.html');
  I.seeElement('[name="root[colorpicker]');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify({"colorpicker":"#efefef"}));
});

Scenario('test ColorPicker Editor  using vanilla-picker', async (I) => {
  I.amOnPage('colorpicker-use-vanilla-picker.html');
  I.click('.get-value');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify({"colorpicker":"#000000"})); // default value
  I.click('[name="root[colorpicker]"]');
  I.seeElement('[name="root[colorpicker]"]');
  I.seeElement('[data-schemapath="root.colorpicker"] .picker_wrapper');
  I.seeElement('[data-schemapath="root.colorpicker"] .picker_wrapper .picker_selector');
  await I.dragAndDrop('[data-schemapath="root.colorpicker"] .picker_wrapper .picker_sl .picker_selector', '[data-schemapath="root.colorpicker"] .picker_wrapper .picker_sl')
  await I.dragAndDrop('[data-schemapath="root.colorpicker"] .picker_wrapper .picker_hue .picker_selector', '[data-schemapath="root.colorpicker"] .picker_wrapper .picker_hue')
  await I.dragAndDrop('[data-schemapath="root.colorpicker"] .picker_wrapper .picker_alpha .picker_selector', '[data-schemapath="root.colorpicker"] .picker_wrapper .picker_alpha')
  I.click('.get-value');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify({"colorpicker":"rgba(64,191,191,0.502)"}));

});
