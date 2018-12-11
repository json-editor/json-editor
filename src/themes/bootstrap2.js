JSONEditor.defaults.themes.bootstrap2 = JSONEditor.AbstractTheme.extend({
  getRangeInput: function(min, max, step) {
    // TODO: use bootstrap slider
    return this._super(min, max, step);
  },
  getGridContainer: function() {
    var el = document.createElement('div');
    el.classList.add('container-fluid');
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.classList.add('row-fluid');
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'inline-block';
    el.style.fontWeight = 'bold';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.classList.add('span'+size);
  },
  getSelectInput: function(options) {
    var input = this._super(options);
    input.style.width = 'auto';
    input.style.maxWidth = '98%';
    return input;
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    el.style.width = '98%';
    return el;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.control-group');
    input.controls = this.closest(input,'.controls');
    if(this.closest(input,'.compact')) {
      input.controlgroup.className = input.controlgroup.className.replace(/control-group/g,'').replace(/[ ]{2,}/g,' ');
      input.controls.className = input.controlgroup.className.replace(/controls/g,'').replace(/[ ]{2,}/g,' ');
      input.style.marginBottom = 0;
    }
    if (this.queuedInputErrorText) {
        var text = this.queuedInputErrorText;
        delete this.queuedInputErrorText;
        this.addInputError(input,text);
    }

    // TODO: use bootstrap slider
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.classList.add('well','well-small');
    el.style.paddingBottom = 0;
    return el;
  },
  getInfoButton: function(text) {
    var icon = document.createElement('span');
    icon.classList.add('icon-info-sign', 'pull-right');
    icon.style.padding = ".25rem";
    icon.style.position = "relative";
    icon.style.display = "inline-block";

    var tooltip = document.createElement('span');
    tooltip.style["font-family"] = "sans-serif";
    tooltip.style.visibility = "hidden";
    tooltip.style["background-color"] = "rgba(50, 50, 50, .75)";
    tooltip.style.margin = "0 .25rem";
    tooltip.style.color = "#FAFAFA";
    tooltip.style.padding = ".5rem 1rem";
    tooltip.style["border-radius"] = ".25rem";
    tooltip.style.width = "25rem";
    tooltip.style.transform = "translateX(-27rem) translateY(-.5rem)";
    tooltip.style.position = "absolute";
    tooltip.innerText = text;
    icon.onmouseover = function() {
      tooltip.style.visibility = "visible";
    };
    icon.onmouseleave = function() {
      tooltip.style.visibility = "hidden";
    };

    icon.appendChild(tooltip);

    return icon;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.classList.add('help-inline');
    el.textContent = text;
    return el;
  },
  getFormControl: function(label, input, description, infoText) {
    var ret = document.createElement('div');
    ret.classList.add('control-group');

    var controls = document.createElement('div');
    controls.classList.add('controls');

    if(label && input.getAttribute('type') === 'checkbox') {
      ret.appendChild(controls);
      label.classList.add('checkbox');
      label.appendChild(input);
      controls.appendChild(label);
      if(infoText) controls.appendChild(infoText);
      controls.style.height = '30px';
    }
    else {
      if(label) {
        label.classList.add('control-label');
        ret.appendChild(label);
      }
      if(infoText) controls.appendChild(infoText);
      controls.appendChild(input);
      ret.appendChild(controls);
    }

    if(description) controls.appendChild(description);

    return ret;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.classList.add('btn-group');
    return el;
  },
  getButton: function(text, icon, title) {
    var el =  this._super(text, icon, title);
    el.classList.add('btn', 'btn-default');
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.classList.add('table', 'table-bordered');
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },
  addInputError: function(input,text) {
    if(!input.controlgroup) {
        this.queuedInputErrorText = text;
        return;
    }
    if(!input.controlgroup || !input.controls) return;
    input.controlgroup.classList.add('error');
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.classList.add('help-block', 'errormsg');
      input.controls.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.controlgroup) {
        delete this.queuedInputErrorText;
    }
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.classList.remove('error');
  },
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.classList.add('tabbable', 'tabs-left');
    el.innerHTML = "<ul class='nav nav-tabs'  id='" + pName + "'></ul><div class='tab-content well well-small' id='" + pName + "'></div>";
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.classList.add('tabbable', 'tabs-over');
    el.innerHTML = "<ul class='nav nav-tabs' id='" + pName + "'></ul><div class='tab-content well well-small'  id='" + pName + "'></div>";
    return el;
  },
  getTab: function(text,tabId) {
    var el = document.createElement('li');
    el.classList.add('nav-item');
    var a = document.createElement('a');
    a.setAttribute('href','#' + tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTopTab: function(text,tabId) {
    var el = document.createElement('li');
    el.classList.add('nav-item');
    var a = document.createElement('a');
    a.setAttribute('href','#' + tabId);
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
    el.classList.add('tab-pane');
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.classList.add('tab-pane');
    return el;
  },
  markTabActive: function(row) {
    row.tab.classList.add('active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.classList.add('active');
    }
    else {
      row.container.classList.add('active');
    }
  },
  markTabInactive: function(row) {
    row.tab.classList.remove('active');
    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.classList.remove('active');
    }
    else {
      row.container.classList.remove('active');
    }
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  addTopTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  getProgressBar: function() {
    var container = document.createElement('div');
    container.classList.add('progress');

    var bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.width = '0%';
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    progressBar.firstChild.style.width = progress + "%";
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    progressBar.classList.add('progress', 'progress-striped', 'active');
    progressBar.firstChild.style.width = '100%';
  },
  getInputGroup: function(input, buttons) {
    if (!input) return;

    var inputGroupContainer = document.createElement('div');
    inputGroupContainer.classList.add('input-append');
    inputGroupContainer.appendChild(input);

    for(var i=0;i<buttons.length;i++) {
      buttons[i].classList.add('btn');
      inputGroupContainer.appendChild(buttons[i]);
    }

    return inputGroupContainer;
  }
});
