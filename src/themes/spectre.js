JSONEditor.defaults.themes.spectre = JSONEditor.AbstractTheme.extend({

  setGridColumnSize: function(el,size, offset) {
    el.classList.add('col-'+size);
    if (offset) {
      el.classList.add('col-mx-auto');
    }
  },
  getGridContainer: function() {
    var el = document.createElement('div');
    el.classList.add('container');
    return el;
  },
  getGridColumn: function() {
    var el = document.createElement('div');
    el.classList.add('column');
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.classList.add('columns');
    return el;
  },


  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.style = el.style || {};
    el.style.paddingLeft = el.style.marginLeft = '0.4rem';
    el.style.borderLeft = '1px solid #ccc';
    return el;
  },
  getTopIndentedPanel: function() {
    var el = document.createElement('div');
    el.style = el.style || {};
    el.style.paddingLeft = el.style.marginLeft = '0.4rem';
    return el;
  },

  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '0.4rem';
    return el;
  },
  getButtonHolder: function() {
    var el = this._super();
    el.classList.add('btn-group');
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.classList.add('btn', 'btn-primary');
    return el;
  },
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.margin = '0.2rem 0';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.fontWeight = 'bold';
    return el;
  },
  getCheckboxLabel: function(text) {
    var el = this.getFormInputLabel(text);
    el.style.fontWeight = 'normal';
    return el;
  },

  getCheckbox: function() {
    var el = this.getFormInputField('checkbox');
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
  getFormControl: function(label, input, description, infoText) {
    var group = document.createElement('div');
    group.classList.add('form-group');

    if (['checkbox', 'radio'].indexOf(input.type) > -1 && label) {
      label.appendChild(input);
      label.classList.add('form-' + input.type);
      var icon = document.createElement('i');
      icon.classList.add('form-icon');
      label.appendChild(icon);
      group.appendChild(label);
    }
    else {
      if (label) {
        label.classList.add('form-label');
        group.appendChild(label);
      }
      if (infoText) group.insertBefore(infoText, group.firstChild);

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

  getInfoButton: function(text) {

    var popover = document.createElement('div');
    popover.style.float = 'right';
    popover.classList.add('popover');

    var button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-action', 's-circle');
    // class "btn-sm" is too big
    button.style.fontWeight = 'bold';  
    button.style.fontSize = '.5rem';
    button.style.lineHeight = '.5rem';
    button.style.height = '1rem';
    button.style.width = '1rem';
    button.style.padding = '.25rem';
    button.style.margin = '.3rem 0';
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

  /* Controls output of errormessages displayed in form */
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
  },

});
