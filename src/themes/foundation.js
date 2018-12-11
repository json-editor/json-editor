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
    el.classList.add('panel');
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
    el.classList.add('button-group');
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.classList.add('small', 'button');
    return el;
  },
  addInputError: function(input,text) {
    if(!input.group) {
        this.queuedInputErrorText = text;
        return;
    }
    input.group.classList.add('error');

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
    input.group.classList.remove('error');
    input.errmsg.style.display = 'none';
  },
  getProgressBar: function() {
    var progressBar = document.createElement('div');
    progressBar.classList.add('progress');

    var meter = document.createElement('span');
    meter.classList.add('meter');
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
  },
  getInputGroup: function(input, buttons) {
    if (!input) return undefined;

    var inputGroupContainer = document.createElement('div');
    inputGroupContainer.classList.add('input-group');
    input.classList.add('input-group-field');
    inputGroupContainer.appendChild(input);

    for(var i=0;i<buttons.length;i++) {
      var inputGroup = document.createElement('div');
      inputGroup.classList.add('input-group-button');
      inputGroup.style.verticalAlign = 'top';
      buttons[i].classList.remove('small');   
      inputGroup.appendChild(buttons[i]);
      inputGroupContainer.appendChild(inputGroup);
    }

    return inputGroupContainer;
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
    el.classList.add('row');
    el.innerHTML = '<dl class="tabs vertical two columns" id="' + pName + '"></dl><div class="tabs-content ten columns" id="' + pName + '"></div>';
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.classList.add('row');
    el.innerHTML = '<dl class="tabs horizontal" style="padding-left: 10px; margin-left: 10px;" id="' + pName + '"></dl><div class="tabs-content twelve columns" style="padding: 10px; margin-left: 10px;" id="' + pName + '"></div>';
    return el;
  },
  setGridColumnSize: function(el,size) {
    var sizes = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    el.classList.add('columns', sizes[size]);
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
    el.classList.add('content', 'active');
    el.style.paddingLeft = '5px';
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.classList.add('content', 'active');
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(row) {
    row.tab.classList.add('active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.style.display = '';
    }
    else {
      row.container.style.display = '';
    }
  },
  markTabInactive: function(row) {
    row.tab.classList.remove('active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.style.display = 'none';
    }
    else {
      row.container.style.display = 'none';
    }
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
    el.classList.add('columns', 'large-'+size);
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
    el.classList.add('columns', 'medium-'+size);
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
    el.classList.add('row');
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
    el.classList.add('tab-content', 'active');
    el.style.paddingLeft = '5px';
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.classList.add('tab-content', 'active');
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(row) {
    row.tab.classList.add('active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.style.display = '';
    }
    else {
      row.container.style.display = '';
    }
  },
  markTabInactive: function(row) {
    row.tab.classList.remove('active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.style.display = 'none';
    }
    else {
      row.container.style.display = 'none';
    }
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
    el.classList.add('callout', 'secondary');
    el.style = 'padding-left: 10px; margin-left: 10px;';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.classList.add('button-group', 'tiny');
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
    el.classList.add('form-control');
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
    input.group.classList.add('error');

    if(!input.errmsg) {
      var errorEl = document.createElement('span');
      errorEl.classList.add('form-error', 'is-visible');
      input.group.getElementsByTagName('label')[0].appendChild(errorEl);

      input.classList.add('is-invalid-input');

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
    input.classList.remove('is-invalid-input');
    if(input.errmsg.parentNode) {
      input.errmsg.parentNode.removeChild(input.errmsg);
    }
  },
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.classList.add('grid-x');
    el.innerHTML = '<div class="medium-2 cell" style="float: left;"><ul class="vertical tabs" data-tabs id="' + pName + '"></ul></div><div class="medium-10 cell" style="float: left;"><div class="tabs-content" data-tabs-content="'+pName+'"></div></div>';
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.classList.add('grid-y');
    el.innerHTML = '<div className="cell"><ul class="tabs" data-tabs id="' + pName + '"></ul><div class="tabs-content" data-tabs-content="' + pName + '"></div></div>';
    return el;


  },
  insertBasicTopTab: function(tab, newTabs_holder ) {
    newTabs_holder.firstChild.firstChild.insertBefore(tab,newTabs_holder.firstChild.firstChild.firstChild);
  },
  getTab: function(text, tabId) {
    var el = document.createElement('li');
    el.classList.add('tabs-title');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTopTab: function(text, tabId) {
    var el = document.createElement('li');
    el.classList.add('tabs-title');
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
    el.classList.add('tabs-panel');
    el.style.paddingLeft = '5px';
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.classList.add('tabs-panel');
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(row) {
    row.tab.classList.add('is-active');
    row.tab.firstChild.setAttribute('aria-selected', 'true');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.classList.add('is-active');
      row.rowPane.setAttribute('aria-selected', 'true');
    }
    else {
      row.container.classList.add('is-active');
      row.container.setAttribute('aria-selected', 'true');
      }
  },
  markTabInactive: function(row) {
    row.tab.classList.remove('is-active');
    row.tab.firstChild.removeAttribute('aria-selected');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.classList.remove('is-active');
      row.rowPane.removeAttribute('aria-selected');
    }
    else {
      row.container.classList.remove('is-active');
      row.container.removeAttribute('aria-selected');
      }
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
