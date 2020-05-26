
let jsoneditor = null
let theme = null
let iconlib = null


const initJsoneditor = (theme, iconlib) => {

    if (jsoneditor) {
        console.log('...destroy jsoneditor')
        jsoneditor.destroy();
    }

    console.log('...init jsoneditor', theme, iconlib)

    jsoneditor = new window.JSONEditor(document.querySelector("#editor_holder"), {
        schema: schema,
        remove_button_labels: true,
        theme: theme,
        iconlib: iconlib,
    });
}

document.getElementById('theme_switcher').addEventListener('change', function() {
    theme = this.value || '';
    var mapping = {
        barebones: '',
        html: '',
        bootstrap2: 'https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css',
        bootstrap3: 'https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        bootstrap4: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        foundation3: 'https://cdnjs.cloudflare.com/ajax/libs/foundation/3.2.5/stylesheets/foundation.css',
        foundation4: 'https://cdnjs.cloudflare.com/ajax/libs/foundation/4.3.2/css/foundation.min.css',
        foundation5: 'https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.3/css/foundation.min.css',
        foundation6: 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.4/foundation.min.css',
        jqueryui: 'https://code.jquery.com/ui/1.10.3/themes/south-street/jquery-ui.css',
        materialize: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
        spectre: 'https://unpkg.com/spectre.css/dist/spectre.min.css'
    };
    const link = document.querySelector('#theme_stylesheet').href = mapping[theme];
    console.log(link)
    initJsoneditor(theme, iconlib)
});

document.getElementById('iconlib_switcher').addEventListener('change',function() {
    iconlib = this.value || '';
    var mapping = {
        bootstrap2: 'https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css',
        bootstrap3: 'https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        fontawesome3: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.css',
        fontawesome4: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css',
        fontawesome5: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css',
        foundation3: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css',
        jqueryui: 'https://code.jquery.com/ui/1.10.3/themes/south-street/jquery-ui.css',
        materialicons: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        spectre: 'https://unpkg.com/spectre.css/dist/spectre-icons.min.css'
    };

    document.querySelector('#iconlib_stylesheet').href = mapping[iconlib];
    initJsoneditor(theme, iconlib)
});


