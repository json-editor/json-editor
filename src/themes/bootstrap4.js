JSONEditor.defaults.themes.bootstrap4 = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.classList.add("form-control");
    //el.style.width = 'auto';
    return el;
  },
  setGridColumnSize: function(el, size) {
    el.classList.add("col-md-" + size);
  },
  afterInputReady: function(input) {
    if (input.controlgroup) return;
    input.controlgroup = this.closest(input, ".form-group");
    if (this.closest(input, ".compact")) {
      input.controlgroup.style.marginBottom = 0;
    }

    // TODO: use bootstrap slider
  },
  getTextareaInput: function() {
    var el = document.createElement("textarea");
    el.classList.add("form-control");
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if (type !== "checkbox") {
      el.classList.add("form-control");
    }
    return el;
  },
  getFormControl: function(label, input, description) {
    var group = document.createElement("div");

    if (label && input.type === "checkbox") {
      group.classList.add("checkbox");
      label.appendChild(input);
      label.style.fontSize = "14px";
      group.style.marginTop = "0";
      group.appendChild(label);
      input.style.position = "relative";
      input.style.cssFloat = "left";
    } else {
      group.classList.add("form-group");
      if (label) {
        label.classList.add("form-control-label");
        group.appendChild(label);
      }
      group.appendChild(input);
    }

    if (description) group.appendChild(description);

    return group;
  },
  getIndentedPanel: function() {
    var el = document.createElement("div");
    el.classList.add('card', 'card-body', 'bg-light');
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement("p");
    el.classList.add('form-text');
    el.innerHTML = text;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = "10px";
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement("div");
    el.classList.add("btn-group");
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.classList.add("btn", "btn-secondary");
    return el;
  },
  getTable: function() {
    var el = document.createElement("table");
    el.classList.add("table-bordered", "table-sm");
    el.style.width = "auto";
    el.style.maxWidth = "none";
    return el;
  },

  addInputError: function(input, text) {
    if (!input.controlgroup) return;
    input.controlgroup.classList.add('has-danger');
    input.classList.add('is-invalid');
    if (!input.errmsg) {
      input.errmsg = document.createElement("p");
      input.errmsg.classList.add("form-text", "invalid-feedback");
      input.controlgroup.appendChild(input.errmsg);
    } else {
      input.errmsg.style.display = "";
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if (!input.errmsg) return;
    input.errmsg.style.display = "none";
    input.classList.remove('is-invalid');
    input.controlgroup.classList.remove('has-danger');
  },
  getTabHolder: function(propertyName) {
    var el = document.createElement("div");
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    el.innerHTML = "<div class='col-md-2' id='" + pName + "'><ul class='nav flex-column nav-pills'></ul></div><div class='tab-content col-md-10' id='" + pName + "'></div>";
    el.classList.add("row");
    return el;
  },  
  addTab: function(holder, tab) {
    holder.children[0].children[0].appendChild(tab);
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = "<ul class='nav nav-tabs' id='" + pName + "'></ul><div class='card-body tab-content' id='" + pName + "'></div>";
    return el;
  },
  getTab: function(text,tabId) {
    var liel = document.createElement('li');
    liel.classList.add('nav-item');
    var ael = document.createElement("a");
    ael.classList.add("nav-link");
    ael.setAttribute("style",'padding:10px;');
    ael.setAttribute("href", "#" + tabId);
    ael.setAttribute('data-toggle', 'tab');
    ael.appendChild(text);
    liel.appendChild(ael);
    return liel;
  },
  getTopTab: function(text, tabId) {
    var el = document.createElement('li');
    el.classList.add('nav-item');
    var a = document.createElement('a');
    a.classList.add('nav-link');
    a.setAttribute('href','#'+tabId);
    a.setAttribute('data-toggle', 'tab');
    a.appendChild(text);
    el.appendChild(a);
    return el;
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
    row.tab.firstChild.classList.add('active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.classList.add('active');
    }
    else {
      row.container.classList.add('active');
    }
  },
  markTabInactive: function(row) {
    row.tab.firstChild.classList.remove('active');

    if(typeof row.rowPane !== 'undefined'){
      row.rowPane.classList.remove('active');
    }
    else {
      row.container.classList.remove('active');
    }
  },
  getProgressBar: function() {
    var min = 0,
      max = 100,
      start = 0;

    var container = document.createElement("div");
    container.classList.add("progress");

    var bar = document.createElement("div");
    bar.classList.add("progress-bar");
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuenow", start);
    bar.setAttribute("aria-valuemin", min);
    bar.setAttribute("aria-valuenax", max);
    bar.innerHTML = start + "%";
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    var percentage = progress + "%";
    bar.setAttribute("aria-valuenow", progress);
    bar.style.width = percentage;
    bar.innerHTML = percentage;
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    progressBar.classList.add('progress', 'progress-striped', 'active');
    bar.removeAttribute("aria-valuenow");
    bar.style.width = "100%";
    bar.innerHTML = "";
  },
  getInputGroup: function(input, buttons) {
    if (!input) return;

    var inputGroupContainer = document.createElement('div');
    inputGroupContainer.classList.add('input-group');
    inputGroupContainer.appendChild(input);

    var inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group-prepend');
    inputGroupContainer.appendChild(inputGroup);

    for(var i=0;i<buttons.length;i++) {
      inputGroup.appendChild(buttons[i]);
    }

    return inputGroupContainer;
  }
});
