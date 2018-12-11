JSONEditor.defaults.themes.bootstrap3 = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.classList.add('form-control');
    //el.style.width = 'auto';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.classList.add('col-md-'+size);
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.form-group');
    if(this.closest(input,'.compact')) {
      input.controlgroup.style.marginBottom = 0;
    }
    if (this.queuedInputErrorText) {
        var text = this.queuedInputErrorText;
        delete this.queuedInputErrorText;
        this.addInputError(input,text);
    }

    // TODO: use bootstrap slider
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.classList.add('form-control');
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if(type !== 'checkbox') {
      el.classList.add('form-control');
    }
    return el;
  },
  getFormControl: function(label, input, description, infoText) {
    var group = document.createElement('div');

    if(label && input.type === 'checkbox') {
      group.classList.add('checkbox');
      label.appendChild(input);
      label.style.fontSize = '14px';
      group.style.marginTop = '0';
      if(infoText) group.appendChild(infoText);
      group.appendChild(label);
      input.style.position = 'relative';
      input.style.cssFloat = 'left';
    }
    else {
      group.classList.add('form-group');
      if(label) {
        label.classList.add('control-label');
        group.appendChild(label);
      }

      if(infoText) group.appendChild(infoText);
      group.appendChild(input);
    }

    if(description) group.appendChild(description);

    return group;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.classList.add('well', 'well-sm');
    el.style.paddingBottom = 0;
    return el;
  },
  getInfoButton: function(text) {
    var icon = document.createElement('span');
    icon.classList.add('glyphicon', 'glyphicon-info-sign', 'pull-right');
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
    el.classList.add('help-block');
    el.innerHTML = text;
    return el;
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
    var el = this._super(text, icon, title);
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
    input.controlgroup.classList.add('has-error');
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.classList.add('help-block', 'errormsg');
      input.controlgroup.appendChild(input.errmsg);
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
    input.controlgroup.classList.remove('has-error');
  },
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = "<ul class='col-md-2 nav nav-pills nav-stacked' id='" + pName + "' role='tablist'></ul>" +
      "<div class='col-md-10 tab-content well well-small'  id='" + pName + "'></div>";
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = "<ul class='nav nav-tabs' id='" + pName + "' role='tablist'></ul>" +
      "<div class='tab-content well well-small'  id='" + pName + "'></div>";
    return el;
  },
  getTab: function(text, tabId) {
    var li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    a.setAttribute('aria-controls', tabId);
    a.setAttribute('role', 'tab');
    a.setAttribute('data-toggle', 'tab');
    li.appendChild(a);
    return li;
  },
  getTopTab: function(text, tabId) {
    var li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    a.setAttribute('aria-controls', tabId);
    a.setAttribute('role', 'tab');
    a.setAttribute('data-toggle', 'tab');
    li.appendChild(a);
    return li;
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.classList.add('tab-pane');
    el.setAttribute('role', 'tabpanel');
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.classList.add('tab-pane');
    el.setAttribute('role', 'tabpanel');
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
  getProgressBar: function() {
    var min = 0, max = 100, start = 0;

    var container = document.createElement('div');
    container.classList.add('progress');

    var bar = document.createElement('div');
    bar.classList.add('progress-bar');
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuenow', start);
    bar.setAttribute('aria-valuemin', min);
    bar.setAttribute('aria-valuenax', max);
    bar.innerHTML = start + "%";
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    var percentage = progress + "%";
    bar.setAttribute('aria-valuenow', progress);
    bar.style.width = percentage;
    bar.innerHTML = percentage;
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    progressBar.classList.add('progress', 'progress-striped', 'active');
    bar.removeAttribute('aria-valuenow');
    bar.style.width = '100%';
    bar.innerHTML = '';
  },
  getInputGroup: function(input, buttons) {
    if (!input) return;

    var inputGroupContainer = document.createElement('div');
    inputGroupContainer.classList.add('input-group');
    inputGroupContainer.appendChild(input);

    var inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group-btn');
    inputGroupContainer.appendChild(inputGroup);

    for(var i=0;i<buttons.length;i++) {
      inputGroup.appendChild(buttons[i]);
    }

    return inputGroupContainer;
  }
});
