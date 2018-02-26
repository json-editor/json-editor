JSONEditor.defaults.themes.materialize = JSONEditor.AbstractTheme.extend({

    /**
     * Applies grid size to specified element.
     * 
     * @param {object} el The DOM element to have specified size applied.
     * @param {int} size The grid column size.
     * @see http://materializecss.com/grid.html
     */
    setGridColumnSize: function(el, size) {

        el.className = 'col s' + size;

    },

    /**
     * Gets a wrapped button element for a header.
     * 
     * @returns {object} The wrapped button element.
     */
    getHeaderButtonHolder: function() {
        return this.getButtonHolder();
    },

    /**
     * Gets a wrapped button element.
     * 
     * @returns {object} The wrapped button element.
     */
    getButtonHolder: function() {
        return document.createElement('span');
    },

    /**
     * Gets a single button element.
     * 
     * @param {string} text The button text.
     * @param {object} icon The icon object.
     * @param {string} title The button title.
     * @returns {object} The button object.
     * @see http://materializecss.com/buttons.html
     */
    getButton: function(text, icon, title) {

        // Prepare icon.
        if (text) {
            icon.className += ' left';
            icon.style.marginRight = '5px';
        }

        // Create and return button.
        var el = this._super(text, icon, title);
        el.className = 'waves-effect waves-light btn';
        el.style.fontSize = '0.75rem';
        el.style.height = '24px';
        el.style.lineHeight = '24px';
        el.style.marginLeft = '5px';
        el.style.padding = '0 0.5rem';
        return el;

    },

    /**
     * Gets a form control object consisiting of several sub objects.
     * 
     * @param {object} label The label element.
     * @param {object} input The input element.
     * @param {string} description The element description.
     * @param {string} infoText The element information text.
     * @returns {object} The assembled DOM element.
     * @see http://materializecss.com/forms.html
     */
    getFormControl: function(label, input, description, infoText) {

        var ctrl,
            type = input.type;

        // Checkboxes get wrapped in p elements.
        if (type && type === 'checkbox') {

            var id = this.createUuid();
            input.id = id;

            ctrl = document.createElement('p');
            ctrl.appendChild(input);
            if (label) {
                label.setAttribute('for', id);
                ctrl.appendChild(label);
            }
            return ctrl;

        }

        // Anything else gets wrapped in divs.
        ctrl = this._super(label, input, description, infoText);

        // Not .input-field for select wrappers.
        if (!type || !type.startsWith('select'))
            ctrl.className = 'input-field';

        return ctrl;

    },

    /**
     * Gets a header element.
     * 
     * @param {string|object} text The header text or element.
     */
    getHeader: function(text) {

        var el = document.createElement('h5');

        if (typeof text === 'string') {
          el.textContent = text;
        } else {
          el.appendChild(text);
        }
    
        return el;

    },

    /**
     * Gets a select DOM element.
     * 
     * @param {object} options The option values.
     * @return {object} The DOM element.
     * @see http://materializecss.com/forms.html#select
     */
    getSelectInput: function(options) {

        var select = this._super(options);
        select.className = 'browser-default';
        return select;

    },

    /**
     * Gets a textarea DOM element.
     * 
     * @returns {object} The DOM element.
     * @see http://materializecss.com/forms.html#textarea
     */
    getTextareaInput: function() {
        var el = document.createElement('textarea');
        el.style.marginBottom = '5px';
        el.style.fontSize = '1rem';
        el.style.fontFamily = 'monospace';
        return el;
    },

    /**
     * Gets the modal element for displaying Edit JSON and Properties dialogs.
     * 
     * @returns {object} The modal DOM element.
     * @see http://materializecss.com/cards.html
     */
    getModal: function() {

        var el = document.createElement('div');
        el.className = 'card-panel z-depth-3';
        el.style.padding = '5px';
        el.style.position = 'absolute';
        el.style.zIndex = '10';
        el.style.display = 'none';
        return el;

    },

    /**
     * Creates and returns a RFC4122 version 4 compliant unique id.
     * 
     * @returns {string} A GUID.
     * @see https://stackoverflow.com/a/2117523
     */
    createUuid: function() {

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

    }

});
