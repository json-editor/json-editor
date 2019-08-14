// Spectre Theme using Spectre CSS framework. <https://picturepan2.github.io/spectre/index.html>
export function spectreTheme(JSONEditor)
{

JSONEditor.defaults.themes.spectre = JSONEditor.AbstractTheme.extend({
  // Config options that allows changing various aspects of the output
  options: {
    disable_theme_rules: false,   // Disable creation of Inline Style Rules
    label_bold: true,            // Element labels bold
    object_indent: false,         // Indent nested object elements
    object_border: false,         // Add border around object elements
    table_border: false,          // Add border to array "table" row and cells
    table_zebrastyle: false,      // Add "zebra style" to array "table" rows
    input_size: 'normal',         // Size of input and select elements. "small", "normal", "large"
    button_size: 'normal',         // Size of buttons. "small", "normal", "large"
    button_align: 'center'        // Alignment of button editor buttons. "left", "center", rignt"
  },
  // Custom stylesheet rules. (Does not suppert comma separated selectors)
  //  Will create a stylesheet in document head with the id "theme-spectre" if not exists.
  rules: {
    '.slider:focus': 'box-shadow: none', // Remove slider focus shadow
    'h3>label+.btn-group': 'margin-left:1rem', // Add margin between header and top buttons
    '.json-editor-btntype-properties+div': 'font-size: .8rem;font-weight: normal;', // Fix fontsize in Properties modal
    'textarea': 'width:100%;min-height: 2rem;resize:vertical',  // Prevent textarea from being resized horizontally
    'table': 'border-collapse: collapse;', // Remove gap between table element borders
    '.table td': 'padding: .4rem .4rem;', // reduce table padding
    '.mr-5': 'margin-right: 1rem !important;', // margin for checkbox label
    'div[data-schematype]:not([data-schematype="object"])' : 'transition:.5s',  // Hover on input block
    'div[data-schematype]:not([data-schematype="object"]):hover' : 'background-color: #eee', // Hover on input block
    '.je-table-border td': 'border: .05rem solid #dadee4 !important', // Option: table_border
    '.btn-info' : 'font-size:.5rem;font-weight:bold;height:.8rem;padding:.15rem 0;line-height:.8;margin:.3rem 0 .3rem .1rem;', // Infobutton
    '.je-label': 'font-weight: 600', // Option: label_bold
    '.btn-action.btn-info': 'width: .8rem;', // Infobutton
    '.je-border': 'border:.05rem solid #dadee4', // Option: object_border
    '.je-panel': 'padding:.2rem;margin:.2rem;background-color: rgba(218,222,228,.1)',
    '.je-panel-top': 'padding:.2rem;margin:.2rem;background-color: rgba(218,222,228,.1)',
    '.required:after': 'content: " *";color: red;font:inherit', // Red * after label if field is required
    '.je-desc': 'font-size: smaller;margin: .2rem 0;', // Description
/*    '.columns': 'border:1px solid rgba(255,0,0,.5);',
    '.columns .columns': 'border:1px solid rgba(0,255,0,.5);',*/
    '.columns .container.je-noindent': 'padding-left:0;padding-right:0;' // Option: object_indent
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

  // Button functions
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    return el;
  },
  // Button holder for the buttons
  getButtonHolder: function() {
    var el = this._super();
    el.classList.add('btn-group');
    return el;
  },
  getFormButtonHolder: function() {
    var el = this._super();
    el.classList.remove('btn-group');
    if (this.options.button_align === 'center') el.classList.add('text-center');
    else if (this.options.button_align === 'right') el.classList.add('text-right');
    return el;
  },
  getFormButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.classList.add('btn', 'btn-primary', 'mx-2', 'my-1');
    //el.classList..remove('btn-sm');
    if (this.options.input_size !== 'small') el.classList.remove('btn-sm');
    if (this.options.input_size === 'large') el.classList.add('btn-lg');
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.classList.add('btn', 'btn-sm', 'btn-primary', 'mr-2', 'my-1');
    return el;
  },

  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.classList.add('je-desc','hide-sm');
    return el;
  },

  /* Label for all elements except checkbox and radio */
  getFormInputLabel: function(text, req) {
    var el = this._super(text, req);
    if (this.options.label_bold) el.classList.add('je-label');
    return el;
  },

  // Checkbox elements
  // ToDo: Rename function names for consistency
  getCheckbox: function() {
    var el = this.getFormInputField('checkbox');
    return el;
  },
  getCheckboxLabel: function(text, req) {
    var el = this._super(text, req), icon = document.createElement('i');
    icon.classList.add('form-icon');
    el.classList.add('form-checkbox', 'mr-5');
    el.insertBefore(icon, el.firstChild);
    return el;
  },
  getFormCheckboxControl: function(label, input, compact) {
    label.insertBefore(input, label.firstChild); // Move input into label element
    if (compact) label.classList.add('form-inline');
    return label;
  },
  getMultiCheckboxHolder: function(controls,label,description, infoText) {
console.log('mul');
    return this._super(controls,label,description, infoText);
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

  // Create input field
  getFormInputField: function(type) {
    var el = this._super(type);
    if (['checkbox', 'radio'].indexOf(type) < 0) {
      el.classList.add('form-input');
    }
    return el;
  },
  // Create input field for type="range"
  getRangeInput: function(min, max, step) {
    var el = this.getFormInputField('range');
    el.classList.add('slider');
    el.classList.remove('form-input');
    el.setAttribute('oninput', 'this.setAttribute("value", this.value)');
    el.setAttribute('min', min);
    el.setAttribute('max', max);
    el.setAttribute('step', step);
    return el;
  },
  getRangeControl: function(input, output) {
    var el = this._super(input, output);
    el.classList.add('text-center');
    return el;
  },


  // Create select box field
  getSelectInput: function(options) {
    var el = this._super(options);
    el.classList.add('form-select');
    return el;
  },
  // Create textarea field
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.classList.add('form-input');
    return el;
  },


  getFormControl: function(label, input, description, infoText) {
    var group = document.createElement('div');
    group.classList.add('form-group');

    if (label) {
      if (input.type === 'checkbox') {
        label = this.getFormCheckboxControl(label, input, false);
      }
      label.classList.add('form-label');
      group.appendChild(label);
      if (infoText) group.insertBefore(infoText, group.firstChild);
    }

    if (this.options.input_size === 'small') input.classList.add('input-sm', 'select-sm');
    else if (this.options.input_size === 'large') input.classList.add('input-lg', 'select-lg');
    if (input.type !== 'checkbox') group.appendChild(input);

    if (description) group.appendChild(description);

    return group;
  },

  // Create input group (input field with buttons)
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

  // Create button for displaying infotext tooltip
  getInfoButton: function(text) {

    var popover = document.createElement('div');
    popover.classList.add('popover', 'popover-left', 'float-right');

    var button = document.createElement('button');
    button.classList.add('btn', 'btn-secondary', 'btn-info', 'btn-action', 's-circle');
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
    el.classList.add('table', 'table-scroll');
    if (this.options.table_border) el.classList.add('je-table-border');
    if (this.options.table_zebrastyle) el.classList.add('table-striped');
    return el;
  },

  // Containers for array with format: "tab"
  getTabHolder: function(propertyName) {
    var pName = typeof propertyName === 'undefined' ? "" : propertyName;
    var el = document.createElement('div');
    el.classList.add('columns');
    el.innerHTML = '<div class="column col-2"></div><div class="column col-10 content" id="' + pName + '"></div>';
    return el;
  },
  // Containers for array with format: "tab-top"
  getTopTabHolder: function(propertyName) {
    var pName = typeof propertyName === 'undefined' ? "" : propertyName;
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
    }
    input.errmsg.classList.remove('d-hide');
    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if (!input.errmsg) return;
    input.errmsg.classList.add('d-hide');
    input.controlgroup.classList.remove('has-error');
  }

});
};
