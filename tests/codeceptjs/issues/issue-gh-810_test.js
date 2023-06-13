/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 810 should remain fixed @issue-810', async ({ I }) => {
  I.amOnPage('issues/issue-gh-810.html')
  I.waitForText('I changed 1 times')
  I.fillField('#value', JSON.stringify({
    name: 'Jeremy Dorn',
    age: 25,
    favorite_color: '#ffa500',
    gender: 'male',
    date: '',
    location: {
      city: 'San Francisco',
      state: 'CA',
      citystate: 'San Francisco, CA'
    },
    pets: [
      {
        type: 'dog',
        name: 'Walter'
      },
      {
        type: 'dog',
        name: 'Walter2'
      }
    ]
  }))
  I.click('#set-value')
  I.waitForText('I changed 2 times')
  I.fillField('#value', JSON.stringify({
    name: 'Jeremy Dorn',
    age: 25,
    favorite_color: '#ffa500',
    gender: 'male',
    date: '',
    location: {
      city: 'San Francisco',
      state: 'CA',
      citystate: 'San Francisco, CA'
    },
    pets: [
      {
        type: 'dog',
        name: 'Walter'
      }
    ]
  }))
  I.click('#set-value')
  I.waitForText('I changed 3 times')
})
