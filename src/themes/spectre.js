JSONEditor.defaults.themes.spectre = JSONEditor.AbstractTheme.extend({
  // Config options that allows changing various aspects of the output
  options: {
    disable_theme_rules: false,   // Disable creation of Inline Style Rules
    label_bold: false,            // Element labels bold
    object_indent: false,         // Indent nested object elements
    object_border: false,         // Add border around object elements
    table_border: false,          // Add border to array "table" row and cells
    table_hdiv: false,            // Add bottom-border to array "table" cells
    table_zebrastyle: false,      // Add "zebra style" to array "table" rows
    input_size: 'normal'          // Size of input and select elements. "small", "normal", "large"
  },
  // Custom stylesheet rules. (Does not suppert comma separated selectors)
  //  Will create a stylesheet in document head with the id "theme-spectre" if not exists.
  rules: {
    'textarea': 'width:100%;min-height: 2rem;resize:vertical',
    'table': 'border-collapse: collapse;',
    'div[data-schematype]:not([data-schematype="object"])' : 'transition:.5s',
    'div[data-schematype]:not([data-schematype="object"]):hover' : 'background-color: #eee',
    '.je-table-zebra:nth-child(even)': 'background-color: #f2f2f2;',
    '.je-table-border': 'border: 1px solid black;',
    '.je-table-hdiv': 'border-bottom: 1px solid black;',
    '.btn-info' : 'font-size:.5rem;font-weight:bold;height:1rem;padding:.2rem 0;line-height:1;margin:.3rem 0;',
    '.btn-action.btn-info': 'width: 1rem;',
    '.je-border': 'border:.05rem solid #dadee4',
    '.je-panel': 'padding:.2rem;margin:.2rem;background-color: rgba(218,222,228,.1)',
    '.je-panel-top': 'padding:.2rem;margin:.2rem;background-color: rgba(218,222,228,.1)',
    '.required:after': 'content: " *";color: red;font:inherit',
    '.je-desc': 'font-size: smaller;margin: .2rem 0;',
/*    '.columns': 'border:1px solid rgba(255,0,0,.5);',
    '.columns .columns': 'border:1px solid rgba(0,255,0,.5);',*/
    '.columns .container.je-noindent': 'padding-left:0;padding-right:0;'
  },
  // Functions for setting up the grid container, row and columns
  setGridColumnSize: function(el,size, offset) {
    el.classList.add('col-' + size);
    if (offset) el.classList.add('col-mx-auto');
  },
  getGridContainer: function() {
    var el = document.createElement('div');
    el.classList.add('container');
    if (!this.options.object_indent) el.classList.add('je-noindent');
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.classList.add('columns');
    return el;
  },
  getGridColumn: function() {
    var el = document.createElement('div');
    el.classList.add('column');
    return el;
  },



  // Used for "type: object" or "type: array" (except if "format: tabs-top")
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.classList.add('je-panel');
    if (this.options.object_border) el.classList.add('je-border');
    return el;
  },

  // Used for "type: array" with "format: tabs-top"
  getTopIndentedPanel: function() {
    var el = document.createElement('div');
    el.classList.add('je-panel-top');
    if (this.options.object_border) el.classList.add('je-border');
    return el;
  },

  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.classList.add('btn-group', 'ml-3');
    return el;
  },
  getButtonHolder: function() {
    var el = this._super();
    el.classList.add('btn-group', 'ml-3');
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.classList.add('btn', 'btn-primary', 'ml-2', 'my-1');
    return el;
  },
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.classList.add('je-desc');
    return el;
  },

  /* Label for all elements except checkbox and radio */
  getFormInputLabel: function(text, req) {
    var el = this._super(text, req);
    if (this.options.label_bold) el.classList.add('text-bold');
    return el;
  },

  // Checkbox elements
  // ToDo: Rename function names for consistency
  getCheckbox: function() {
    var el = this.getFormInputField('checkbox');
    return el;
  },
  getCheckboxLabel: function(text, req) {
    var el = this.getFormInputLabel(text, req);
    return el;
  },


  // Radio elements
  getFormRadio: function(attributes) {
    var el = this.getFormInputField('radio');
    for(var key in attributes){
      el.setAttribute(key, attributes[key]);
    }
    return el;
  },
  getFormRadioLabel: function(text, req) {
    var el = this._super(text, req), icon = document.createElement('i');
    icon.classList.add('form-icon');
    el.classList.add('form-radio');
    el.insertBefore(icon, el.firstChild);
    return el;
  },
  getFormRadioControl: function(label, input, compact) {
    label.insertBefore(input, label.firstChild); // Move input into label element
    if (compact) label.classList.add('form-inline');
    return label;
  },

  getRangeInput: function(min, max, step) {
    // ToDo: Move creaton of "output" element from "string" editor into theme.
    var el = this.getFormInputField('range');
    el.classList.add('slider', 'tooltip');
    el.classList.remove('form-input');
    el.setAttribute('oninput', 'this.setAttribute("value", this.value)');
    el.setAttribute('min', min);
    el.setAttribute('max', max);
    el.setAttribute('step', step);
    return el;
  },
  getSelectInput: function(options) {
    var el = this._super(options);
    el.classList.add('form-select');
    return el;
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.classList.add('form-input');
    return el;
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if (['checkbox', 'radio'].indexOf(type) < 0) {
      el.classList.add('form-input');
    }
    return el;
  },
  getFormCheckboxControl: function(label, input, compact) {
    //var el = document.createElement('div');
    //el.classList.add('form-group');
      var icon = document.createElement('i');
      icon.classList.add('form-icon');
      label.appendChild(icon);
      label.classList.add('form-' + input.type);
    //el.appendChild(label);
    input.style.width = 'auto';
    label.insertBefore(input, label.firstChild);
    if (compact) label.classList.add('form-inline');

    return label;
  },

  getFormControl: function(label, input, description, infoText) {
    var group = document.createElement('div');
    group.classList.add('form-group');

    if (['checkbox', 'radio'].indexOf(input.type) > -1) {
      if (infoText && label) group.appendChild(infoText);

      // In compact mode there is no label element present
      if (!label) label = this.getCheckboxLabel('');

      label.appendChild(input);
      label.classList.add('form-' + input.type);
      if (infoText) label.style.marginRight = '2rem';
      var icon = document.createElement('i');
      icon.classList.add('form-icon');
      label.appendChild(icon);
      group.appendChild(label);
    }
    else {
      if (label) {
        label.classList.add('form-label');
        group.appendChild(label);
        if (infoText) group.insertBefore(infoText, group.firstChild);
      }

      if (this.options.input_size === 'small') input.classList.add('input-sm', 'select-sm');
      else if (this.options.input_size === 'large') input.classList.add('input-lg', 'select-lg');
      group.appendChild(input);
    }

    if (description) group.appendChild(description);

    return group;
  },

  getInputGroup: function(input, buttons) {
    if (!input) return;

    var inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');
    inputGroup.appendChild(input);
    for(var i=0;i<buttons.length;i++) {
      buttons[i].classList.add('input-group-btn');
      inputGroup.appendChild(buttons[i]);
    }

    return inputGroup;
  },

  // Button for displaying infotext tooltip
  getInfoButton: function(text) {

    var popover = document.createElement('div');
    popover.classList.add('popover','float-right');

    var button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'btn-info', 'btn-action', 's-circle');
    button.setAttribute('tabindex', '-1'); // exclude element from tab order
    popover.appendChild(button);

    var icon = document.createTextNode('I');
    button.appendChild(icon);

    var container = document.createElement('div');
    container.classList.add('popover-container');
    popover.appendChild(container);

    var card = document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);

    var cardbody = document.createElement('div');
    cardbody.classList.add('card-body');
    cardbody.innerHTML = text;
    card.appendChild(cardbody);

    return popover;
  },

  // Functions for rendering array with format: "table"
  getTable: function() {
    var el = this._super();
    if (this.options.table_border) el.classList.add('je-table-border');
    return el;
  },
  getTableRow: function() {
    var el = this._super();
    if (this.options.table_border) el.classList.add('je-table-border');
    if (this.options.table_zebrastyle) el.classList.add('je-table-zebra');
    return el;
  },
  getTableHeaderCell: function(text) {
    var el = this._super(text);
    if (this.options.table_border) el.classList.add('je-table-border');
    else if (this.options.table_hdiv) el.classList.add('je-table-hdiv');
   return el;
  },
  getTableCell: function() {
    var el = this._super();
    if (this.options.table_border) el.classList.add('je-table-border');
    else if (this.options.table_hdiv) el.classList.add('je-table-hdiv');
    return el;
  },

  // Containers for array with format: "tab"
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.classList.add('columns');
    el.innerHTML = '<div class="column col-2 btn-group tab"></div><div class="column col-10 content" id="' + pName + '"></div>';
    return el;
  },
  // Containers for array with format: "tab-top"
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = '<ul class="tab"></ul><div class="content" id="' + pName + '"></div>';
    return el;
  },
  // Tab button for array with format: "tab"
  getTab: function(span, tabId) {
    var el = document.createElement('a');
    el.classList.add('btn', 'btn-secondary', 'btn-block');
    el.id = tabId;
    el.innerHTML = span.innerHTML;

    return el;
  },
  // Tab button for array with format: "tab-top"
  getTopTab: function(span, tabId) {
    var el = document.createElement('li');
    el.id = tabId;
    el.classList.add('tab-item');

    // Spectre needs an a tag inside the tab item, not a span
    var a = document.createElement('a');
    a.href='#';
    a.innerHTML = span.innerHTML;
    el.appendChild(a);
    return el;
  },
  markTabActive: function(row) {
    row.tab.classList.add('active');
    if (typeof row.rowPane !== 'undefined') row.rowPane.style.display = '';
    else row.container.style.display = '';
  },
  markTabInactive: function(row) {
    row.tab.classList.remove('active');
    if (typeof row.rowPane !== 'undefined') row.rowPane.style.display = 'none';
    else row.container.style.display = 'none';
  },


  // Controls output of errormessages displayed in form
  afterInputReady: function(input) {
    if (input.controlgroup) return;
    input.controlgroup = this.closest(input, '.form-group');
    if (this.closest(input, '.compact')) {
      input.controlgroup.style.marginBottom = 0;
    }
  },
  addInputError: function(input, text) {
    if (!input.controlgroup) return;
    input.controlgroup.classList.add('has-error');
    if (!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.classList.add('form-input-hint');
      input.controlgroup.appendChild(input.errmsg);
    } else {
      input.errmsg.style.display = '';
    }
    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if (!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.classList.remove('has-error');
  }

});
