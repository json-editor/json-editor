JSONEditor.defaults.themes.bootstrap4 = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.className += "form-control";
    //el.style.width = 'auto';
    return el;
  },
  setGridColumnSize: function(el, size) {
    el.className = "col-md-" + size;
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
    el.className = "form-control";
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if (type !== "checkbox") {
      el.className += "form-control";
    }
    return el;
  },
  getFormControl: function(label, input, description) {
    var group = document.createElement("div");

    if (label && input.type === "checkbox") {
      group.className += " checkbox";
      label.appendChild(input);
      label.style.fontSize = "14px";
      group.style.marginTop = "0";
      group.appendChild(label);
      input.style.position = "relative";
      input.style.cssFloat = "left";
    } else {
      group.className += " form-group";
      if (label) {
        label.className += " form-control-label";
        group.appendChild(label);
      }
      group.appendChild(input);
    }

    if (description) group.appendChild(description);

    return group;
  },
  getIndentedPanel: function() {
    var el = document.createElement("div");
    el.className = "card card-body bg-light";
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement("p");
    el.className = "form-text";
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
    el.className = "btn-group";
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += "btn btn-secondary";
    return el;
  },
  getTable: function() {
    var el = document.createElement("table");
    el.className = "table-bordered table-sm";
    el.style.width = "auto";
    el.style.maxWidth = "none";
    return el;
  },

  addInputError: function(input, text) {
    if (!input.controlgroup) return;
    input.controlgroup.className += " has-error";
    if (!input.errmsg) {
      input.errmsg = document.createElement("p");
      input.errmsg.className = "form-text errormsg";
      input.controlgroup.appendChild(input.errmsg);
    } else {
      input.errmsg.style.display = "";
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if (!input.errmsg) return;
    input.errmsg.style.display = "none";
    input.controlgroup.className = input.controlgroup.className.replace(
      /\s?has-error/g,
      ""
    );
  },
  getTabHolder: function(propertyName) {
    var el = document.createElement("div");
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    el.innerHTML =
      "<ul class='nav flex-column nav-pills col-md-2' style='padding: 0px;' id='" + pName + "'></ul><div class='tab-content col-md-10' style='padding:5px;' id='" + pName + "'></div>";
el.className = "row";
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = "<ul class='nav nav-tabs' id='" + pName + "'></ul><div class='card-body' id='" + pName + "'></div>";
    return el;
  },
  getTab: function(text,tabId) {
    var liel = document.createElement('li');
    liel.className = 'nav-item';
    var ael = document.createElement("a");
    ael.className = "nav-link";
    ael.setAttribute("style",'padding:10px;');
    ael.setAttribute("href", "#" + tabId);
    ael.appendChild(text);
    liel.appendChild(ael);
    return liel;
  },
  getTopTab: function(text, tabId) {
    var el = document.createElement('li');
    el.className = 'nav-item';
    var a = document.createElement('a');
    a.className = 'nav-link';
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  markTabActive: function(row) {
    var el = row.tab.firstChild;
    el.className = el.className.replace(/\s?active/g,'');
    el.className += " active";
    row.container.style.display = '';
  },
  markTabInactive: function(row) {
    var el = row.tab.firstChild;
    el.className = el.className.replace(/\s?active/g,'');
    row.container.style.display = 'none';
  },
  getProgressBar: function() {
    var min = 0,
      max = 100,
      start = 0;

    var container = document.createElement("div");
    container.className = "progress";

    var bar = document.createElement("div");
    bar.className = "progress-bar";
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
    progressBar.className = "progress progress-striped active";
    bar.removeAttribute("aria-valuenow");
    bar.style.width = "100%";
    bar.innerHTML = "";
  }
});
