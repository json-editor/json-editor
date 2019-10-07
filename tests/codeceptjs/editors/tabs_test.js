Feature('Tabs');

Scenario('test top-tabs', (I) => {
    I.amOnPage('tabs.html');
    I.waitForElement('[data-schemapath="root"] .json-editor-btn-add');
    I.click('[data-schemapath="root"] .json-editor-btn-add');
    I.see('1 -');
    I.see('validation failed');
    I.fillField('root[1][name]', 'Somebody');
    I.pressKey('Tab');
    I.see('validation passed');
});
