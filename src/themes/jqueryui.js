JSONEditor.defaults.themes.jqueryui = JSONEditor.AbstractTheme.extend({
  getTable: function() {
    var el = this._super();
    el.setAttribute('cellpadding',5);
    el.setAttribute('cellspacing',0);
    return el;
  },
  getTableHeaderCell: function(text) {
    var el = this._super(text);
    el.classList.add('ui-state-active');
    el.style.fontWeight = 'bold';
    return el;
  },
  getTableCell: function() {
    var el = this._super();
    el.classList.add('ui-widget-content');
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    el.style.fontSize = '.6em';
    el.style.display = 'inline-block';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = this.getDescription(text);
    el.style.marginLeft = '10px';
    el.style.display = 'inline-block';
    return el;
  },
  getFormControl: function(label, input, description, infoText) {
    var el = this._super(label,input,description, infoText);
    if(input.type === 'checkbox') {
      el.style.lineHeight = '25px';

      el.style.padding = '3px 0';
    }
    else {
      el.style.padding = '4px 0 8px 0';
    }
    return el;
  },
  getDescription: function(text) {
    var el = document.createElement('span');
    el.style.fontSize = '.8em';
    el.style.fontStyle = 'italic';
    el.textContent = text;
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.classList.add('ui-buttonset');
    el.style.fontSize = '.7em';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = document.createElement('label');
    el.style.fontWeight = 'bold';
    el.style.display = 'block';
    el.textContent = text;
    return el;
  },
  getButton: function(text, icon, title) {
    var button = document.createElement("button");
    button.classList.add('ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all');

    // Icon only
    if(icon && !text) {
      button.classList.add('ui-button-icon-only');
      icon.classList.add('ui-button-icon-primary', 'ui-icon-primary');
      button.appendChild(icon);
    }
    // Icon and Text
    else if(icon) {
      button.classList.add('ui-button-text-icon-primary');
      icon.classList.add('ui-button-icon-primary', 'ui-icon-primary');
      button.appendChild(icon);
    }
    // Text only
    else {
      button.classList.add('ui-button-text-only');
    }

    var el = document.createElement('span');
    el.classList.add('ui-button-text');
    el.textContent = text||title||".";
    button.appendChild(el);

    button.setAttribute('title',title);

    return button;
  },
  setButtonText: function(button,text, icon, title) {
    button.innerHTML = '';
    button.classList.add('ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all');

    // Icon only
    if(icon && !text) {
      button.classList.add('ui-button-icon-only');
      icon.classList.add('ui-button-icon-primary', 'ui-icon-primary');
      button.appendChild(icon);
    }
    // Icon and Text
    else if(icon) {
      button.classList.add('ui-button-text-icon-primary');
      icon.classList.add('ui-button-icon-primary', 'ui-icon-primary');
      button.appendChild(icon);
    }
    // Text only
    else {
      button.classList.add('ui-button-text-only');
    }

    var el = document.createElement('span');
    el.classList.add('ui-button-text');
    el.textContent = text||title||".";
    button.appendChild(el);

    button.setAttribute('title',title);
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.classList.add('ui-widget-content', 'ui-corner-all');
    el.style.padding = '1em 1.4em';
    el.style.marginBottom = '20px';
    return el;
  },
  afterInputReady: function(input) {
    if(input.controls) return;
    input.controls = this.closest(input,'.form-control');
    if (this.queuedInputErrorText) {
        var text = this.queuedInputErrorText;
        delete this.queuedInputErrorText;
        this.addInputError(input,text);
    }
  },
  addInputError: function(input,text) {
    if(!input.controls) {
        this.queuedInputErrorText = text;
        return;
    }
    if(!input.errmsg) {
      input.errmsg = document.createElement('div');
      input.errmsg.classList.add('ui-state-error');
      input.controls.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.controls) {
        delete this.queuedInputErrorText;
    }
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
  },
  markTabActive: function(row) {
    row.tab.classList.remove('ui-widget-header');
    row.tab.classList.add('ui-state-active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.style.display = '';
    }
    else {
      row.container.style.display = '';
    }
  },
  markTabInactive: function(row) {
    row.tab.classList.add('ui-widget-header');
    row.tab.classList.remove('ui-state-active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.style.display = 'none';
    }
    else {
      row.container.style.display = 'none';
    }
  }
});
