/* global Feature Scenario */

const assert = require('assert')
const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('object')

Scenario('should be readonly if specified and not disabled @readOnly', async ({ I }) => {
  I.amOnPage('read-only.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.seeDisabledAttribute('[name="root[object][string]"]')
  I.seeDisabledAttribute('[name="root[object][number]"]')
})

Scenario('@case-sensitive-property-search', async ({ I }) => {
  I.amOnPage('object-case-sensitive-property-search-true.html')
  I.click('.json-editor-btn-edit_properties')
  I.fillField('.property-selector-input', 'aaa')
  I.see('aaa', '.form-check label')
  I.dontSee('AAA', '.form-check label')
  I.fillField('.property-selector-input', 'AAA')
  I.see('AAA', '.form-check label')
  I.dontSee('aaa', '.form-check label')

  I.amOnPage('object-case-sensitive-property-search-false.html')
  I.click('.json-editor-btn-edit_properties')
  I.fillField('.property-selector-input', 'aaa')
  I.see('aaa', '.form-check label')
  I.see('AAA', '.form-check label')
  I.fillField('.property-selector-input', 'AAA')
  I.see('AAA', '.form-check label')
  I.see('aaa', '.form-check label')
})

Scenario('should respect property orders', async ({ I }) => {
  I.amOnPage('object.html')
  assert.strictEqual(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(1) [data-schemapath^="root."]', 'data-schemapath'), 'root.age')
  assert.strictEqual(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(2) [data-schemapath^="root."]', 'data-schemapath'), 'root.name')
  assert.strictEqual(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(3) [data-schemapath^="root."]', 'data-schemapath'), 'root.single')
  assert.strictEqual(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(4) [data-schemapath^="root."]', 'data-schemapath'), 'root.values')
  assert.strictEqual(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(5) [data-schemapath^="root."]', 'data-schemapath'), 'root.zodiac')
})

Scenario('should validate required properties', async ({ I }) => {
  I.amOnPage('object.html')
  I.see('Value must be at least 18.')
})

Scenario('should validate also not required properties', async ({ I }) => {
  I.amOnPage('object.html')
  I.see('Value must be at least 3 characters long.')
})

Scenario('grid-strict rows and columns', ({ I }) => {
  I.amOnPage('grid-strict.html')
  I.seeNumberOfVisibleElements('.row', 13)
  I.seeElement('.col-md-1')
  I.seeElement('.col-md-2')
  I.seeElement('.col-md-3')
  I.seeElement('.col-md-4')
  I.seeElement('.col-md-5')
  I.seeElement('.col-md-6')
  I.seeElement('.col-md-7')
  I.seeElement('.col-md-8')
  I.seeElement('.col-md-9')
  I.seeElement('.col-md-10')
  I.seeElement('.col-md-11')
  I.seeElement('.col-md-12')
  I.seeElement('.col-md-1.offset-md-1')
  I.seeElement('.col-md-1.offset-md-2')
  I.seeElement('.col-md-1.offset-md-3')
  I.seeElement('.col-md-1.offset-md-4')
  I.seeElement('.col-md-1.offset-md-5')
  I.seeElement('.col-md-1.offset-md-6')
  I.seeElement('.col-md-1.offset-md-7')
  I.seeElement('.col-md-1.offset-md-8')
  I.seeElement('.col-md-1.offset-md-9')
  I.seeElement('.col-md-1.offset-md-10')
  I.seeElement('.col-md-1.offset-md-11')
})

Scenario('grid rows and columns', ({ I }) => {
  I.amOnPage('grid.html')
  I.seeNumberOfVisibleElements('.row', 6)
  I.seeNumberOfVisibleElements('.col-md-12', 1)
  I.seeNumberOfVisibleElements('.col-md-6', 3)
  I.seeNumberOfVisibleElements('.col-md-4', 3)
  I.seeNumberOfVisibleElements('.col-md-3', 4)
  I.seeNumberOfVisibleElements('.col-md-2', 6)
  I.seeNumberOfVisibleElements('.col-md-1', 6)
})

Scenario('opt in optional properties @show_opt_in', async ({ I }) => {
  I.amOnPage('object-required-properties.html')

  // if an editor type "object" is disabled, also the child editors opt-in controls will be disabled.
  I.seeDisabledAttribute('[data-schemapath="root.object.number"] .json-editor-opt-in')
  I.seeDisabledAttribute('[data-schemapath="root.object.boolean"] .json-editor-opt-in')
  I.seeDisabledAttribute('[data-schemapath="root.object.radio"] .json-editor-opt-in')

  // tests merged from master 17.9.2019
  I.dontSeeCheckedAttribute('[data-schemapath="root.string"] .json-editor-opt-in')
  I.dontSeeDisabledAttribute('[data-schemapath="root.string"] .json-editor-opt-in')
  I.seeDisabledAttribute('[name="root[string]"]')
  I.dontSeeCheckedAttribute('[data-schemapath="root.radio"] .json-editor-opt-in')
  I.dontSeeDisabledAttribute('[data-schemapath="root.radio"] .json-editor-opt-in')
  I.seeDisabledAttribute('[id="root[radio][0]"]')
  I.seeDisabledAttribute('[id="root[radio][1]"]')
  I.dontSeeCheckedAttribute('[data-schemapath="root.object.number"] .json-editor-opt-in')
  I.seeDisabledAttribute('[data-schemapath="root.object.number"] .json-editor-opt-in')
  I.seeDisabledAttribute('[name="root[object][number]"]')
  I.dontSeeCheckedAttribute('[data-schemapath="root.object.boolean"] .json-editor-opt-in')
  I.seeDisabledAttribute('[data-schemapath="root.object.boolean"] .json-editor-opt-in')
  I.dontSeeCheckedAttribute('[data-schemapath="root.object.radio"] .json-editor-opt-in')
  I.seeDisabledAttribute('[data-schemapath="root.object.radio"] .json-editor-opt-in')

  I.click('.get-value')
  I.waitForValue('.value', '{"number":0,"boolean":false}')

  // Opening and Closing "Edit JSON" should keep opt-in state.

  I.click('[data-schemapath="root"] .json-editor-btn-edit')
  I.click('[data-schemapath="root"] .json-editor-btn-edit')
  I.dontSeeCheckedAttribute('[data-schemapath="root.string"] .json-editor-opt-in')
  I.dontSeeDisabledAttribute('[data-schemapath="root.string"] .json-editor-opt-in')
  I.seeDisabledAttribute('[name="root[string]"]')
  I.dontSeeCheckedAttribute('[data-schemapath="root.radio"] .json-editor-opt-in')
  I.dontSeeDisabledAttribute('[data-schemapath="root.radio"] .json-editor-opt-in')
  I.seeDisabledAttribute('[id="root[radio][0]"]')
  I.seeDisabledAttribute('[id="root[radio][1]"]')
  I.dontSeeCheckedAttribute('[data-schemapath="root.object.number"] .json-editor-opt-in')
  I.seeDisabledAttribute('[data-schemapath="root.object.number"] .json-editor-opt-in')
  I.seeDisabledAttribute('[name="root[object][number]"]')
  I.dontSeeCheckedAttribute('[data-schemapath="root.object.boolean"] .json-editor-opt-in')
  I.seeDisabledAttribute('[data-schemapath="root.object.boolean"] .json-editor-opt-in')
  I.seeDisabledAttribute('[name="root[object][boolean]"]')
  I.seeDisabledAttribute('[data-schemapath="root.object.boolean"] .json-editor-opt-in')
  I.dontSeeCheckedAttribute('[data-schemapath="root.object.radio"] .json-editor-opt-in')
  I.seeDisabledAttribute('[data-schemapath="root.object.radio"] .json-editor-opt-in')

  I.click('.get-value')
  I.waitForValue('.value', '{"number":0,"boolean":false}')

  // opt-in string property

  I.click('[data-schemapath="root.string"] .json-editor-opt-in')
  I.click('[data-schemapath="root.radio"] .json-editor-opt-in')
  I.click('.get-value')
  I.waitForValue('.value', '{"string":"","number":0,"boolean":false,"radio":"Home"}')

  // opt-in array property

  I.click('[data-schemapath="root.array"] .json-editor-opt-in')
  I.click('.get-value')
  I.waitForValue('.value', '{"string":"","number":0,"boolean":false,"radio":"Home","array":[]}')

  // opt-in object property

  I.click('[data-schemapath="root.object"] .json-editor-opt-in')
  I.click('.get-value')
  I.waitForValue('.value', '{"string":"","number":0,"boolean":false,"radio":"Home","array":[],"object":{"string":"","array":[]}}')

  // if an editor type "object" is enabled, also the child editors opt-in controls will be enabled.
  I.dontSeeDisabledAttribute('[data-schemapath="root.object.number"] .json-editor-opt-in')
  I.dontSeeDisabledAttribute('[data-schemapath="root.object.boolean"] .json-editor-opt-in')
  I.dontSeeDisabledAttribute('[data-schemapath="root.object.radio"] .json-editor-opt-in')
})

Scenario('set value opt in optional properties @show_opt_in', async ({ I }) => {
  I.amOnPage('object-required-properties.html')

  // all editors visible
  I.waitForElement('[data-schemapath="root.string"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.number"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.boolean"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.radio"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.array"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object.string"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object.number"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object.boolean"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object.radio"]', DEFAULT_WAIT_TIME)

  // set values
  I.click('.set-value')
  I.click('.get-value')
  I.waitForValue('.value', '{"string":"test","number":0,"boolean":false,"array":["test"],"object":{"string":"","number":10,"boolean":true,"array":[]}}')

  // set empty values
  I.click('.set-empty-value')
  I.click('.get-value')
  I.waitForValue('.value', '{"number":0,"boolean":false}')

  // all editorsstill visible
  I.waitForElement('[data-schemapath="root.string"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.number"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.boolean"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.radio"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.array"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object.string"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object.number"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object.boolean"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.object.radio"]', DEFAULT_WAIT_TIME)
})

Scenario('set value opt in optional properties @show_opt_in_schema', async ({ I }) => {
  I.amOnPage('object-show-opt-in.html')

  // all editors visible
  I.waitForElement('[data-schemapath="root"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.option_show_opt_in_undefined"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.option_show_opt_in_undefined.string"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.option_show_opt_in_true"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.option_show_opt_in_true.string"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.option_show_opt_in_false"]', DEFAULT_WAIT_TIME)
  I.waitForElement('[data-schemapath="root.option_show_opt_in_false.string"]', DEFAULT_WAIT_TIME)

  // checkboxes for optional properties should appear only when
  // case 1) the parent option show_opt_in is enabled
  // OR
  // case 2) the parent option show_opt_in is disabled and the global option show_opt_in is enabled
  // OR
  // case 3) the parent option show_opt_in is not defined and the global option show_opt_in is enabled

  // global show_opt_in true
  I.dontSeeCheckedAttribute('#show-opt-in')
  I.dontSeeElement('[data-schemapath="root.option_show_opt_in_undefined.string"] .json-editor-opt-in') // global show_opt_in: false && parent editor show_opt_in: 'undefined'
  I.waitForElement('[data-schemapath="root.option_show_opt_in_true.string"] .json-editor-opt-in', DEFAULT_WAIT_TIME) // global show_opt_in: false && parent editor show_opt_in: true
  I.dontSeeElement('[data-schemapath="root.option_show_opt_in_false.string"] .json-editor-opt-in') // global show_opt_in: false && parent editor show_opt_in: false

  // global show_opt_in false
  I.click('#show-opt-in')
  I.waitForElement('[data-schemapath="root.option_show_opt_in_undefined.string"] .json-editor-opt-in') // global show_opt_in: true && parent editor show_opt_in: 'undefined'
  I.waitForElement('[data-schemapath="root.option_show_opt_in_true.string"] .json-editor-opt-in', DEFAULT_WAIT_TIME) // global show_opt_in: true && parent editor show_opt_in: true
  I.dontSeeElement('[data-schemapath="root.option_show_opt_in_false.string"] .json-editor-opt-in') // global show_opt_in: true && parent editor show_opt_in: false
})

Scenario('objects should contain properties defined with the properties keyword unless the property "additionalProperties: true" is specified in the object schema @additional-properties', async ({ I }) => {
  I.amOnPage('object-no-additional-properties.html')
  I.seeElement('[data-schemapath="root.aptrue.name"] input')
  I.seeElement('[data-schemapath="root.aptrue.age"] input')
  I.seeElement('[data-schemapath="root.apfalse.name"] input')
  I.dontSeeElement('[data-schemapath="root.apfalse.age"] input')
  I.click('.get-value')
  I.waitForValue('.value', '{"aptrue":{"name":"Albert","age":0},"apfalse":{"name":"Albert"}}')
})

Scenario('should have unique ids', ({ I }) => {
  I.amOnPage('object-no-duplicated-id.html')
  I.donSeeDuplicatedIds()
  I.waitForText('i am actually a cat')
  I.waitForText('i am actually a dog')
  I.click('.json-editor-btn-edit_properties')
  I.click('.form-group:nth-child(1) .form-check-input')
  I.waitForText('i am actually a dog')
  I.click('.form-group:nth-child(1) .form-check-input')
  I.click('.form-group:nth-child(2) .form-check-input')
  I.waitForText('i am actually a cat')
})

Scenario('should hide properties with unfulfilled dependencies @dependencies', ({ I }) => {
  I.amOnPage('object-with-dependencies.html')
  I.seeElement('[data-schemapath="root.enable_option"] input')
  I.dontSeeElement('[data-schemapath="root.make_new"] input')
  I.dontSeeElement('[data-schemapath="root.existing_name"] input')

  I.click('[data-schemapath="root.enable_option"] input')
  I.seeElement('[data-schemapath="root.enable_option"] input')
  I.seeElement('[data-schemapath="root.make_new"] input')
  I.dontSeeElement('[data-schemapath="root.existing_name"] input')
})

Scenario('should fulfill dependencies whit fully qualified paths @dependencies', ({ I }) => {
  I.amOnPage('option-dependencies.html')
  I.waitForText('Female specific question?')
  I.waitForText('Female specific age question?')
  I.dontSee('Male specific question?')
  I.dontSee('Male specific age question?')
  I.dontSee('What is your preferred gender?')
  I.dontSee('Other specific age question?')

  I.selectOption('[id="root[gender]"]', 'male')
  I.dontSee('Female specific question?')
  I.dontSee('Female specific age question?')
  I.waitForText('Male specific question?')
  I.waitForText('Male specific age question?')
  I.dontSee('What is your preferred gender?')
  I.dontSee('Other specific age question?')

  I.selectOption('[id="root[gender]"]', 'other')
  I.dontSee('Female specific question?')
  I.dontSee('Female specific age question?')
  I.dontSee('Male specific question?')
  I.dontSee('Male specific age question?')
  I.waitForText('What is your preferred gender?')
  I.waitForText('Other specific age question?')
})

Scenario('should respect multiple dependency values @dependencies', ({ I }) => {
  I.amOnPage('object-with-dependencies-array.html')
  I.waitForVisible('[data-schemapath="root.question_1"] select', DEFAULT_WAIT_TIME)
  I.selectOption('[name="root[question_1]"]', 'a')
  I.waitForInvisible('[data-schemapath="root.question_1_feedback"]', DEFAULT_WAIT_TIME)
  I.selectOption('[name="root[question_1]"]', 'b')
  I.waitForVisible('[data-schemapath="root.question_1_feedback"]', DEFAULT_WAIT_TIME)
  I.selectOption('[name="root[question_1]"]', 'c')
  I.waitForInvisible('[data-schemapath="root.question_1_feedback"]', DEFAULT_WAIT_TIME)
  I.selectOption('[name="root[question_1]"]', 'd')
  I.waitForVisible('[data-schemapath="root.question_1_feedback"]', DEFAULT_WAIT_TIME)

  I.waitForVisible('[data-schemapath="root.question_2"]', DEFAULT_WAIT_TIME)
  I.waitForInvisible('[data-schemapath="root.question_2_feedback"]', DEFAULT_WAIT_TIME)
  I.click('label[for="root[question_2]1"]')
  I.click('label[for="root[question_2]2"]')
  I.waitForVisible('[data-schemapath="root.question_2_feedback"]', DEFAULT_WAIT_TIME)
  I.click('label[for="root[question_2]0"]')
  I.click('label[for="root[question_2]3"]')
  I.waitForInvisible('[data-schemapath="root.question_2_feedback"]', DEFAULT_WAIT_TIME)
})

Scenario('should open and close the properties modal', ({ I }) => {
  I.amOnPage('object.html')
  I.seeElement('.json-editor-btn-edit_properties')
  I.click('.json-editor-btn-edit_properties')
  I.seeElement('.je-modal .property-selector')
  I.click('textarea')
  I.dontSeeElement('.je-modal .property-selector')
})
