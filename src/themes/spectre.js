JSONEditor.defaults.themes.spectre = JSONEditor.AbstractTheme.extend({

  setGridColumnSize: function(el,size, offset) {
    el.classList.add('col-'+size);
    if (offset) {
      el.classList.add('col-mx-auto');
    }
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
    var el = this._super();  ;
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
  getFormControl: function(label, input, description) {
    var group = document.createElement('div');
    group.classList.add('form-group');

    if (['checkbox', 'radio'].indexOf(input.type) > -1 && label) {
      label.appendChild(input);
      label.classList.add('form-' + input.type);
      group.appendChild(label);
    }
    else {
      if (label) {
        label.classList.add('form-label');
        group.appendChild(label);
      }
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
/*
    var inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group-prepend');
    inputGroupContainer.appendChild(inputGroup);*/

    for(var i=0;i<buttons.length;i++) {
      buttons[i].classList.add('input-group-btn');
      inputGroup.appendChild(buttons[i]);
    }

    return inputGroup;
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
