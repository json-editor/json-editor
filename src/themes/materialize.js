JSONEditor.defaults.themes.materialize = JSONEditor.AbstractTheme.extend(
  {

    /**
   * Applies grid size to specified element.
   *
   * @param {HTMLElement} el The DOM element to have specified size applied.
   * @param {int} size The grid column size.
   * @see http://materializecss.com/grid.html
   */
  setGridColumnSize: function(el, size) {
      el.classList.add('col');
      el.classList.add('s' + size);
    },

    /**
   * Gets a wrapped button element for a header.
   *
   * @returns {HTMLElement} The wrapped button element.
   */
  getHeaderButtonHolder: function() {
      return this.getButtonHolder();
    },

    /**
   * Gets a wrapped button element.
   *
   * @returns {HTMLElement} The wrapped button element.
   */
  getButtonHolder: function() {
      return document.createElement('span');
    },

    /**
   * Gets a single button element.
   *
   * @param {string} text The button text.
   * @param {HTMLElement} icon The icon object.
   * @param {string} title The button title.
   * @returns {HTMLElement} The button object.
   * @see http://materializecss.com/buttons.html
   */
  getButton: function(text, icon, title) {

      // Prepare icon.
      if (text) {
        icon.classList.add('left');
        icon.style.marginRight = '5px';
      }

      // Create and return button.
      var el = this._super(text, icon, title);
      el.classList.add('waves-effect', 'waves-light', 'btn');
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
   * @param {HTMLElement} label The label element.
   * @param {HTMLElement} input The input element.
   * @param {string} description The element description.
   * @param {string} infoText The element information text.
   * @returns {HTMLElement} The assembled DOM element.
   * @see http://materializecss.com/forms.html
   */
  getFormControl: function(label, input, description, infoText) {

      var ctrl,
      type = input.type;

      // Checkboxes get wrapped in p elements.
      if (type && type === 'checkbox') {

        ctrl = document.createElement('p');
        if (label) {
          var span = document.createElement('span');
          span.innerHTML = label.innerHTML;
          label.innerHTML = '';
          label.setAttribute('for', input.id);
          ctrl.appendChild(label);
          label.appendChild(input);
          label.appendChild(span);
        }
        else {
          ctrl.appendChild(input);
        }

        return ctrl;

      }

      // Anything else gets wrapped in divs.
      ctrl = this._super(label, input, description, infoText);

      // Not .input-field for select wrappers.
      if (!type || !type.startsWith('select'))
        ctrl.classList.add('input-field');

      // Color needs special attention.
      if (type && type === 'color') {
        input.style.height = '3rem';
        input.style.width = '100%';
        input.style.margin = '5px 0 20px 0';
        input.style.padding = '3px';

        if (label) {
          label.style.transform = 'translateY(-14px) scale(0.8)';
          label.style['-webkit-transform'] = 'translateY(-14px) scale(0.8)';
          label.style['-webkit-transform-origin'] = '0 0';
          label.style['transform-origin'] = '0 0';
        }
      }

      return ctrl;

    },

  getDescription: function(text) {
      var el = document.createElement('div');
      el.classList.add('grey-text');
      el.style.marginTop = '-15px';
      el.innerHTML = text;
      return el;
    },

    /**
   * Gets a header element.
   *
   * @param {string|HTMLElement} text The header text or element.
   * @returns {HTMLElement} The header element.
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

  getChildEditorHolder: function() {

      var el = document.createElement('div');
      el.marginBottom = '10px';
      return el;

    },

  getIndentedPanel: function() {
      var el = document.createElement("div");
      el.classList.add("card-panel");
      return el;
    },

  getTable: function() {

      var el = document.createElement('table');
      el.classList.add('striped', 'bordered');
      el.style.marginBottom = '10px';
      return el;

    },

  getTableRow: function() {
      return document.createElement('tr');
    },

  getTableHead: function() {
      return document.createElement('thead');
    },

  getTableBody: function() {
      return document.createElement('tbody');
    },

  getTableHeaderCell: function(text) {

      var el = document.createElement('th');
      el.textContent = text;
      return el;

    },

  getTableCell: function() {

      var el = document.createElement('td');
      return el;

    },

    /**
   * Gets the tab holder element.
   *
   * @returns {HTMLElement} The tab holder component.
   * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
   */
  getTabHolder: function() {

      var html =[
        '<div class="col s2">',
        '   <ul class="tabs" style="height: auto; margin-top: 0.82rem; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; display: -webkit-flex; display: flex;">',
        '   </ul>',
        '</div>',
        '<div class="col s10">',
        '<div>'
      ].join("\n");

      var el = document.createElement('div');
      el.classList.add('row', 'card-panel');
      el.innerHTML = html;
      return el;

    },

    /**
   * Add specified tab to specified holder element.
   *
   * @param {HTMLElement} holder The tab holder element.
   * @param {HTMLElement} tab The tab to add.
   */
  addTab: function(holder, tab) {
      holder.children[0].children[0].appendChild(tab);
    },

    /**
   * Gets a single tab element.
   *
   * @param {HTMLElement} span The tab's content.
   * @returns {HTMLElement} The tab element.
   * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
   */
  getTab: function(span) {

      var el = document.createElement('li');
      el.classList.add('tab');
      el.style = el.style || {};
      this.applyStyles(el,
        {
        width: '100%',
        textAlign: 'left',
        lineHeight: '24px',
        height: '24px',
        fontSize: '14px',
        cursor: 'pointer'
        }
      );
      el.appendChild(span);
      return el;
    },

    /**
   * Marks specified tab as active.
   *
   * @returns {HTMLElement} The tab element.
   * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
   */
  markTabActive: function(tab) {

      tab.style = tab.style || {};
      this.applyStyles(tab,
        {
        width: '100%',
        textAlign: 'left',
        lineHeight: '24px',
        height: '24px',
        fontSize: '14px',
        cursor: 'pointer',
        color: 'rgba(238,110,115,1)',
        transition: 'border-color .5s ease',
        borderRight: '3px solid #424242'
        }
      );

    },

    /**
   * Marks specified tab as inactive.
   *
   * @returns {HTMLElement} The tab element.
   * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
   */
  markTabInactive: function(tab) {

      tab.style = tab.style || {};
      this.applyStyles(tab,
        {
        width: '100%',
        textAlign: 'left',
        lineHeight: '24px',
        height: '24px',
        fontSize: '14px',
        cursor: 'pointer',
        color: 'rgba(238,110,115,0.7)'
        }
      );

    },

    /**
   * Returns the element that holds the tab contents.
   *
   * @param {HTMLElement} tabHolder The full tab holder element.
   * @returns {HTMLElement} The content element inside specified tab holder.
   */
  getTabContentHolder: function(tabHolder) {
      return tabHolder.children[1];
    },

    /**
   * Creates and returns a tab content element.
   *
   * @returns {HTMLElement} The new tab content element.
   */
  getTabContent: function() {
      return document.createElement('div');
    },

    /**
   * Adds an error message to the specified input element.
   *
   * @param {HTMLElement} input The input element that caused the error.
   * @param {string} text The error message.
   */
  addInputError: function(input, text) {

      // Get the parent element. Should most likely be a <div class="input-field" ... />.
      var parent = input.parentNode,
      el;

      if (!parent) return;

      // Remove any previous error.
      this.removeInputError(input);

      // Append an error message div.
      el = document.createElement('div');
      el.classList.add('error-text', 'red-text');
      el.textContent = text;
      parent.appendChild(el);

    },

    /**
   * Removes any error message from the specified input element.
   *
   * @param {HTMLElement} input The input element that previously caused the error.
   */
  removeInputError: function(input) {

      // Get the parent element. Should most likely be a <div class="input-field" ... />.
      var parent = input.parentElement,
      els;

      if (!parent) return;

      // Remove all elements having class .error-text.
      els = parent.getElementsByClassName('error-text');
      for (var i = 0; i < els.length; i++)
        parent.removeChild(els[i]);

    },

  addTableRowError: function(row) {
    },

  removeTableRowError: function(row) {
    },

    /**
   * Gets a select DOM element.
   *
   * @param {object} options The option values.
   * @return {HTMLElement} The DOM element.
   * @see http://materializecss.com/forms.html#select
   */
  getSelectInput: function(options) {

      var select = this._super(options);
      select.classList.add('browser-default');
      return select;

    },

    /**
   * Gets a textarea DOM element.
   *
   * @returns {HTMLElement} The DOM element.
   * @see http://materializecss.com/forms.html#textarea
   */
  getTextareaInput: function() {
      var el = document.createElement('textarea');
      el.style.marginBottom = '5px';
      el.style.fontSize = '1rem';
      el.style.fontFamily = 'monospace';
      return el;
    },

  getCheckbox: function() {

      var el = this.getFormInputField('checkbox');
      el.id = this.createUuid();
      return el;

    },

    /**
   * Gets the modal element for displaying Edit JSON and Properties dialogs.
   *
   * @returns {HTMLElement} The modal DOM element.
   * @see http://materializecss.com/cards.html
   */
  getModal: function() {

      var el = document.createElement('div');
      el.classList.add('card-panel', 'z-depth-3');
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

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
          var r = Math.random() * 16 | 0, v = c == 'x'? r: (r & 0x3 | 0x8);
          return v.toString(16);
        }
      );

    }

  }
);