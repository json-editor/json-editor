
Feature('Tabs');

Scenario('test top-tabs', (I) => {
    I.amOnPage('grid-strict.html');
    I.seeElement('.col-xs-4');
});
