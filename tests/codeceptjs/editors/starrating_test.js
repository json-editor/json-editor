/* global Feature Scenario */

Feature('starrating')

Scenario('should set and get values properly @starrating', async ({ I }) => {
  I.amOnPage('starrating.html')
  I.waitForElement('.je-ready')
  I.waitForValue('#value', '{"integer_rating":0,"string_rating":"","starrating":"Beginner","starrating2":"Beginner","starrating3":"5 Stars"}')
  I.click('[for="root[integer_rating]3"]')
  I.click('[for="root[string_rating]3"]')
  I.click('[for="root[starrating]3"]')
  I.click('[for="root[starrating2]3"]')
  I.click('[for="root[starrating3]10"]')
  I.waitForValue('#value', '{"integer_rating":3,"string_rating":"3","starrating":"Experienced","starrating2":"Experienced","starrating3":"10 Stars"}')
})