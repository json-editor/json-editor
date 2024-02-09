/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1272 should remain fixed @issue-1272', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1272.html')
  I.waitForElement('.je-ready')
  I.selectOption('[name="root[recorder][albums]"]', 'album2')
  I.waitForText('song1')
  I.dontSee('array editor')
  I.selectOption('[data-schemapath="root.recorder.album2"] .je-switcher', 'SideB')
  I.waitForText('array editor')
  I.dontSee('song1')
  I.selectOption('[data-schemapath="root.recorder.album2"] .je-switcher', 'SideA')
  I.waitForText('song1')
  I.dontSee('array editor')
  I.selectOption('[name="root[recorder][albums]"]', 'album1')
  I.selectOption('[name="root[recorder][albums]"]', 'album2')
  I.waitForText('song1')
  I.dontSee('array editor')
})
