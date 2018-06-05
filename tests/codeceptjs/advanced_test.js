
Feature('Advanced Editor');

Scenario('test validation & delete', (I) => {
    I.amOnPage('advanced.html');
    //pause()
    I.seeElement('#valid_indicator');
    I.see('valid', '#valid_indicator');
    I.fillField('root[0][location][city]', 'Stuttgart');
    I.seeInField('root[0][location][city]', 'Stuttgart');
    I.click('.json-editor-btn-delete');
});
