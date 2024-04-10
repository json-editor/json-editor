/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1538 should remain fixed @issue-1538', async ({ I }) => {
    I.amOnPage('issues/issue-gh-1538.html')
    I.checkOption('[name="root[watched_field]"]')
    I.seeElement('[name="root[dependent_field]"]')
});