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
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify({"colorpicker":"rgba(0,0,0,1)"}));
  I.click('[data-schemapath="root.colorpicker"]');
  I.seeElement('[name="root[colorpicker]"]');
  await I.dragAndDrop('[data-schemapath="root.colorpicker"] .picker_wrapper .picker_sl .picker_selector', '[data-schemapath="root.colorpicker"] .picker_wrapper .picker_sl')
  await I.dragAndDrop('[data-schemapath="root.colorpicker"] .picker_wrapper .picker_hue .picker_selector', '[data-schemapath="root.colorpicker"] .picker_wrapper .picker_hue')
  await I.dragAndDrop('[data-schemapath="root.colorpicker"] .picker_wrapper .picker_alpha .picker_selector', '[data-schemapath="root.colorpicker"] .picker_wrapper .picker_alpha')
  I.click('.picker_done button')
  // I.click('.get-value');
  I.click('.get-value');
  const color = await I.grabValueFrom('.debug')
  const reg = /\{"colorpicker":"rgba\(6\d,19\d,19\d,0.5\d*\)"\}/;
  assert.ok(reg.test(color), color + ' match ' + reg);
});
