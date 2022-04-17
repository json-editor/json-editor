var assert = require('assert')

Feature('Pattern Dependency');

Scenario('First dependency', (I) => {
    I.amOnPage('pattern-dependency.html');
    I.fillField('root[ServerName]', 'AA-01')
    I.pressKey('Enter')
    I.see('Cloud1')
    I.dontSee('Cloud2')
    I.dontSee('Cloud3')
});

Scenario('Second dependency', (I) => {
    I.amOnPage('pattern-dependency.html');
    I.fillField('root[ServerName]', 'BB-01')
    I.pressKey('Enter')
    I.see('Cloud2')
    I.dontSee('Cloud1')
    I.dontSee('Cloud3')
});

Scenario('Third dependency', (I) => {
    I.amOnPage('pattern-dependency.html');
    I.fillField('root[ServerName]', 'CC-01')
    I.pressKey('Enter')
    I.see('Cloud3')
    I.dontSee('Cloud2')
    I.dontSee('Cloud1')
});