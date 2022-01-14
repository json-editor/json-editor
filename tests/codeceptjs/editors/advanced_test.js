
Feature('Advanced Editor');

Scenario('test validation & delete', (I) => {
    I.amOnPage('advanced.html');
    I.retry({ retries: 5, minTimeout: 500 }).seeElement('#valid_indicator');
    I.see('valid', '#valid_indicator');
    I.fillField('root[0][location][city]', 'Stuttgart');
    I.waitForValue("[name='root[0][location][city]']", 'Stuttgart');
    I.amAcceptingPopups();
    I.click('.json-editor-btntype-deletelast');
    I.acceptPopup();
});
