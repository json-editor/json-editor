// Base Foundation theme
JSONEditor.defaults.themes.foundation = JSONEditor.AbstractTheme.extend({
  getChildEditorHolder: function() {
    var el = document.createElement('div');
    el.style.marginBottom = '15px';
    return el;
  },
  getSelectInput: function(options) {
    var el = this._super(options);
    el.style.minWidth = 'none';
    el.style.padding = '5px';
    el.style.marginTop = '3px';
    return el;
  },
  getSwitcher: function(options) {
    var el = this._super(options);
    el.style.paddingRight = '8px';
    return el;
  },
  afterInputReady: function(input) {
    if(input.group) return;
    if(this.closest(input,'.compact')) {
      input.style.marginBottom = 0;
    }
    input.group = this.closest(input,'.form-control');
    if (this.queuedInputErrorText) {
        var text = this.queuedInputErrorText;
        delete this.queuedInputErrorText;
        this.addInputError(input,text);
    }
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'inline-block';
    return el;
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    el.style.width = '100%';
    el.style.marginBottom = type==='checkbox'? '0' : '12px';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.textContent = text;
    el.style.marginTop = '-10px';
    el.style.fontStyle = 'italic';
    return el;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'panel';
    el.style.paddingBottom = 0;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.display = 'inline-block';
    el.style.marginLeft = '10px';
    el.style.verticalAlign = 'middle';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'button-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += ' small button';
    return el;
  },
  addInputError: function(input,text) {
    if(!input.group) {
        this.queuedInputErrorText = text;
        return;
    }
    input.group.className += ' error';

    if(!input.errmsg) {
      input.insertAdjacentHTML('afterend','<small class="error"></small>');
      input.errmsg = input.parentNode.getElementsByClassName('error')[0];
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.group) {
        delete this.queuedInputErrorText;
    }
    if(!input.errmsg) return;
    input.group.className = input.group.className.replace(/ error/g,'');
    input.errmsg.style.display = 'none';
  },
  getProgressBar: function() {
    var progressBar = document.createElement('div');
    progressBar.className = 'progress';

    var meter = document.createElement('span');
    meter.className = 'meter';
    meter.style.width = '0%';
    progressBar.appendChild(meter);
    return progressBar;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;
    progressBar.firstChild.style.width = progress + '%';
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;
    progressBar.firstChild.style.width = '100%';
  }
});

// Foundation 3 Specific Theme
JSONEditor.defaults.themes.foundation3 = JSONEditor.defaults.themes.foundation.extend({
  getHeaderButtonHolder: function() {
    var el = this._super();
    el.style.fontSize = '.6em';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.fontWeight = 'bold';
    return el;
  },
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.className = 'row';
    el.innerHTML = '<dl class="tabs vertical two columns" id="' + pName + '"></dl><div class="tabs-content ten columns" id="' + pName + '"></div>';
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.className = 'row';
    el.innerHTML = '<dl class="tabs horizontal" style="padding-left: 10px; margin-left: 10px;" id="' + pName + '"></dl><div class="tabs-content twelve columns" style="padding: 10px; margin-left: 10px;" id="' + pName + '"></div>';
    return el;
  },
  setGridColumnSize: function(el,size) {
    var sizes = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    el.className = 'columns '+sizes[size];
  },
  getTab: function(text, tabId) {
    var el = document.createElement('dd');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTopTab: function(text, tabId) {
    var el = document.createElement('dd');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTopTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'content active';
    el.style.paddingLeft = '5px';
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.className = 'content active';
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(row) {
    row.tab.className = row.tab.className.replace(/\s?active/g,'');
    row.tab.className += ' active';
    row.container.style.display = '';
  },
  markTabInactive: function(row) {
    row.tab.className = row.tab.className.replace(/\s?active/g,'');
    row.container.style.display = 'none';
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  addTopTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  }
});

// Foundation 4 Specific Theme
JSONEditor.defaults.themes.foundation4 = JSONEditor.defaults.themes.foundation.extend({
  getHeaderButtonHolder: function() {
    var el = this._super();
    el.style.fontSize = '.6em';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'columns large-'+size;
  },
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8rem';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.fontWeight = 'bold';
    return el;
  }
});

// Foundation 5 Specific Theme
JSONEditor.defaults.themes.foundation5 = JSONEditor.defaults.themes.foundation.extend({
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8rem';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'columns medium-'+size;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text,icon,title);
    el.className = el.className.replace(/\s*small/g,'') + ' tiny';
    return el;
  },
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = '<dl class="tabs vertical" id="' + pName + '"></dl><div class="tabs-content vertical" id="' + pName + '"></div>';
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.className = 'row';
    el.innerHTML = '<dl class="tabs horizontal" style="padding-left: 10px;" id="' + pName + '"></dl><div class="tabs-content horizontal" style="padding: 10px;" id="' + pName + '"></div>';
    return el;
  },
  getTab: function(text, tabId) {
    var el = document.createElement('dd');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTopTab: function(text, tabId) {
    var el = document.createElement('dd');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTopTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'tab-content active';
    el.style.paddingLeft = '5px';
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.className = 'tab-content active';
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(row) {
    row.tab.className = row.tab.className.replace(/\s?active/g,'');
    row.tab.className += ' active';
    row.container.style.display = '';
  },
  markTabInactive: function(row) {
    row.tab.className = row.tab.className.replace(/\s?active/g,'');
    row.container.style.display = 'none';
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  addTopTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  }

});

JSONEditor.defaults.themes.foundation6 = JSONEditor.defaults.themes.foundation5.extend({
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'callout secondary';
    el.className.style = 'padding-left: 10px; margin-left: 10px;';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'button-group tiny';
    el.style.marginBottom = 0;
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'block';
    return el;
  },
  getFormControl: function(label, input, description, infoText) {
    var el = document.createElement('div');
    el.className = 'form-control';
    if(label) el.appendChild(label);
    if(input.type === 'checkbox') {
      label.insertBefore(input,label.firstChild);
    }
    else if (label) {
      if(infoText) label.appendChild(infoText);
      label.appendChild(input);
    } else {
      if(infoText) el.appendChild(infoText);
      el.appendChild(input);
    }

    if(description) label.appendChild(description);
    return el;
  },
  addInputError: function(input,text) {
    if(!input.group) return;
    input.group.className += ' error';

    if(!input.errmsg) {
      var errorEl = document.createElement('span');
      errorEl.className = 'form-error is-visible';
      input.group.getElementsByTagName('label')[0].appendChild(errorEl);

      input.className = input.className + ' is-invalid-input';

      input.errmsg = errorEl;
    }
    else {
      input.errmsg.style.display = '';
      input.className = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.className = input.className.replace(/ is-invalid-input/g,'');
    if(input.errmsg.parentNode) {
      input.errmsg.parentNode.removeChild(input.errmsg);
    }
  },
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.className = 'grid-x';
    el.innerHTML = '<div class="medium-2 cell" style="float: left;"><ul class="vertical tabs" data-tabs id="' + pName + '"></ul></div><div class="medium-10 cell" style="float: left;"><div class="tabs-content" data-tabs-content="'+pName+'"></div></div>';
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.className = 'grid-y';
    el.innerHTML = '<div className="cell"><ul class="tabs" data-tabs id="' + pName + '"></ul><div class="tabs-content" data-tabs-content="' + pName + '"></div></div>';
    return el;


  },
  insertBasicTopTab: function(tab, newTabs_holder ) {
    newTabs_holder.firstChild.firstChild.insertBefore(tab,newTabs_holder.firstChild.firstChild.firstChild);
  },
  getTab: function(text, tabId) {
    var el = document.createElement('li');
    el.className = 'tabs-title';
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTopTab: function(text, tabId) {
    var el = document.createElement('li');
    el.className = 'tabs-title';
    var a = document.createElement('a');
    a.setAttribute('href','#' + tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1].firstChild;
  },
  getTopTabContentHolder: function(tab_holder) {
    return tab_holder.firstChild.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'tabs-panel';
    el.style.paddingLeft = '5px';
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.className = 'tabs-panel';
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(row) {
    row.tab.className = row.tab.className.replace(/\s?is-active/g,'');
    row.tab.className += ' is-active';
    row.tab.firstChild.setAttribute('aria-selected', 'true');

    row.container.className  = row.container.className.replace(/\s?is-active/g,'');
    row.container.className += ' is-active';
    row.container.setAttribute('aria-selected', 'true');
  },
  markTabInactive: function(row) {
    row.tab.className = row.tab.className.replace(/\s?is-active/g,'');
    row.tab.firstChild.removeAttribute('aria-selected');

    row.container.className = row.container.className.replace(/\s?is-active/g,'');
    row.container.removeAttribute('aria-selected');
  },
  addTab: function(holder, tab) {
    holder.children[0].firstChild.appendChild(tab);
  },
  addTopTab: function(holder, tab) {
    holder.firstChild.children[0].appendChild(tab);
  },
  getFirstTab: function(holder){
    return holder.firstChild.firstChild.firstChild;
  }
});
