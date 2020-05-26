Feature('issues/github-762');

let themes = new DataTable(['theme']);
themes.add(['spectre']);
themes.add(['bootstrap4']);

Data(themes).Scenario('test required markers', (I, current) => {
    I.amOnPage('issues/github-762.html');
    I.selectOption('#theme_switcher', current.theme);
    I.click('Add row');
    I.seeElement('table th.required');
});
