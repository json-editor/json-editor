
Feature('Tabs');

Scenario('test top-tabs', (I) => {
    I.amOnPage('tabs.html');
    I.click('Add Person');
    I.see('1 -');
    I.see('validation failed')
    I.fillField('root[1][name]', 'Somebody')
    //pause();
    I.click('body')
    I.see('validation passed')
});
