JSONEditor.defaults.themes.materialize = JSONEditor.AbstractTheme.extend({

    // Grid.
    setGridColumnSize: function(el, size) {
        el.className = 'col s' + size;
    },

    // Buttons.
    getHeaderButtonHolder: function() {
        return document.createElement('span');
    },

    getButtonHolder: function() {
        return document.createElement('span');
    },

    /**
     * Gets a single button element.
     * 
     * @param {string} text The button text.
     */
    getButton: function(text, icon, title) {
        // @see http://materializecss.com/buttons.html

        // Prepare icon.
        if (text) {
            icon.className += ' left';
            icon.style.marginRight = '5px';
        }

        // Create and return button.
        var el = this._super(text, icon, title);
        el.className = 'waves-effect waves-light btn';
        el.style.padding = '0 0.5rem';
        el.style.fontSize = '0.75rem';
        return el;

    },

    getFormControl: function(label, input, description, infoText) {

        var ctrl = this._super(label, input, description, infoText);
        ctrl.className = 'input-field';
        return ctrl;

    },

    getHeader: function(text) {

        var el = document.createElement('h5');

        if (typeof text === 'string') {
          el.textContent = text;
        } else {
          el.appendChild(text);
        }
    
        return el;

      },

});
