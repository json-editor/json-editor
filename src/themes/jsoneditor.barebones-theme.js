JSONEditor.defaults.themes.barebones = JSONEditor.AbstractTheme.extend({
  getContainer: function() {
    var el = document.createElement('div');
    el.classList.add('container');
    return el;
  },
  getFloatRightLinkHolder: function() {
    var el = document.createElement('div');
    el.classList.add('floatrightlinkholder');
    return el;
  },
  getModal: function() {
    var el = document.createElement('div');
    el.classList.add('modal');
    return el;
  },
  getGridContainer: function() {
    var el = document.createElement('div');
    el.classList.add('gridcontainer');
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.classList.add('row');
    return el;
  },
  getGridColumn: function() {
    var el = document.createElement('div');
    el.classList.add('gridcolumn');
    return el;
  },
  setGridColumnSize: function(el,size) {
  },
  getLink: function(text) {
    var el = document.createElement('a');
    el.setAttribute('href','#');
    el.appendChild(document.createTextNode(text));
    return el;
  },
  disableHeader: function(header) {
    header.classList.add('disabled');
  },
  disableLabel: function(label) {
    label.classList.add('disabled');
  },
  enableHeader: function(header) {
    header.classList.remove('disabled');
  },
  enableLabel: function(label) {
    label.classList.remove('disabled');
  },
  getInfoButton: function(text) {
    var icon = document.createElement('div');
    icon.classList.add('icon');
    icon.classList.add('info');

    var tooltip = document.createElement('div');
    tooltip.setAttribute("role", "tooltip");
    tooltip.classList.add('tooltip', 'info', 'disabled');
    tooltip.innerText = text;

    icon.onmouseover = function() {
      tooltip.classList.remove('disabled');
    };
    icon.onmouseleave = function() {
      tooltip.classList.add('disabled');
    };

    icon.appendChild(tooltip);

    return icon;
  },
  getFormInputLabel: function(text) {
    var el = document.createElement('label');
    return el;
  },
  getCheckboxLabel: function(text) {
    var el = this.getFormInputLabel(text);
    el.classList.add('checkboxlabel');
    return el;
  },
  getHeader: function(text) {
    var el = document.createElement('p');
    el.setAttribute("role", "heading");
    el.classList.add('header');

    if(typeof text === "string") {
      el.textContent = text;
    }
    else {
      el.appendChild(text);
    }

    return el;
  },
  getCheckbox: function() {
    var el = this.getFormInputField('checkbox');
    return el;
  },
  getMultiCheckboxHolder: function(controls,label,description) {
    var el = document.createElement('div');
    el.classList.add('multicheckboxholder');

    if(label) {
      el.appendChild(label);
    }

    for(var i in controls) {
      if(!controls.hasOwnProperty(i)) continue;
      el.appendChild(controls[i]);
    }

    if(description) el.appendChild(description);

    return el;
  },
  getSelectInput: function(options) {
    var select = document.createElement('select');
    if(options) this.setSelectOptions(select, options);
    return select;
  },
  getSwitcher: function(options) {
    var switcher = this.getSelectInput(options);
    switcher.classList.add('switcher');
    return switcher;
  },
  getSwitcherOptions: function(switcher) {
    return switcher.getElementsByTagName('option');
  },
  setSwitcherOptions: function(switcher, options, titles) {
    this.setSelectOptions(switcher, options, titles);
  },
  setSelectOptions: function(select, options, titles) {
    titles = titles || [];
    select.innerHTML = '';
    for(var i=0; i<options.length; i++) {
      var option = document.createElement('option');
      option.setAttribute('value',options[i]);
      option.textContent = titles[i] || options[i];
      select.appendChild(option);
    }
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    return el;
  },
  getRangeInput: function(min,max,step) {
    var el = this.getFormInputField('range');
    el.setAttribute('min',min);
    el.setAttribute('max',max);
    el.setAttribute('step',step);
    return el;
  },
  getFormInputField: function(type) {
    var el = document.createElement('input');
    el.setAttribute('type',type);
    return el;
  },
  afterInputReady: function(input) {

  },
  getFormControl: function(label, input, description, infoText) {
    var el = document.createElement('div');
    el.classList.add('formcontrol');
    if(label) el.appendChild(label);
    if(input.type === 'checkbox' && label) {
      label.insertBefore(input,label.firstChild);
      if(infoText) label.appendChild(infoText);
    }
    else {
      if(infoText) label.appendChild(infoText);
      el.appendChild(input);
    }

    if(description) el.appendChild(description);
    return el;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.classList.add('indentedpanel');
    return el;
  },
  getTopIndentedPanel: function() {
    var el = document.createElement('div');
    el.classList.add('top');
    return el;
  },
  getChildEditorHolder: function() {
    var el = document.createElement('div');
    el.classList.add('childeditorholder');
    return el;
  },
  getDescription: function(text) {
    var el = document.createElement('p');
    el.classList.add('description');
    el.innerHTML = text;
    return el;
  },
  getCheckboxDescription: function(text) {
    return this.getDescription(text);
  },
  getFormInputDescription: function(text) {
    return this.getDescription(text);
  },
  getHeaderButtonHolder: function() {
    return this.getButtonHolder();
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.classList.add("buttonholder");
    return el;
  },
  getButton: function(text, icon, title) {
    var el = document.createElement('button');
    el.type = 'button';
    this.setButtonText(el,text,icon,title);
    return el;
  },
  setButtonText: function(button, text, icon, title) {
    button.innerHTML = '';
    if(icon) {
      button.appendChild(icon);
      button.innerHTML += ' ';
    }
    button.appendChild(document.createTextNode(text));
    if(title) button.setAttribute('title',title);
  },
  getTable: function() {
    return document.createElement('table');
  },
  getTableRow: function() {
    return document.createElement('tr');
  },
  getTableHead: function() {
    return document.createElement('thead');
  },
  getTableBody: function() {
    return document.createElement('tbody');
  },
  getTableHeaderCell: function(text) {
    var el = document.createElement('th');
    el.textContent = text;
    return el;
  },
  getTableCell: function() {
    var el = document.createElement('td');
    return el;
  },
  getErrorMessage: function(text) {
    var el = document.createElement('p');
    el.classList.add('errormessage');
    el.appendChild(document.createTextNode(text));
    return el;
  },
  addInputError: function(input, text) {
  },
  removeInputError: function(input) {
  },
  addTableRowError: function(row) {
  },
  removeTableRowError: function(row) {
  },
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = "<div class='tabs' id='" + pName + "'></div><div class='tabcontent' id='" + pName + "'></div><div></div>";
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = "<div class='tabs' id='" + pName + "'></div><div></div><div class='tabcontent' id='" + pName + "'></div>";
    return el;
  },
  closest: function(elem, selector) {
    while (elem && elem !== document) {
      if (elem[matchKey]) {
        if (elem[matchKey](selector)) {
          return elem;
        } else {
          elem = elem.parentNode;
        }
      }
      else {
        return false;
      }
    }
    return false;
  },
  insertBasicTopTab: function(tab, newTabs_holder ) {
    newTabs_holder.firstChild.insertBefore(tab,newTabs_holder.firstChild.firstChild);
  },
  getTab: function(span, tabId) {
    var el = document.createElement('div');
    el.appendChild(span);
    el.id = tabId;
    el.classList.add('tab');
    return el;
  },
  getTopTab: function(span, tabId) {
    var el = document.createElement('div');
    el.id = tabId;
    el.appendChild(span);
    el.classList.add('toptab', 'inactive');
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTopTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    return this.getIndentedPanel();
  },
  getTopTabContent: function() {
    return this.getTopIndentedPanel();
  },
  markTabActive: function(row) {
    row.classList.remove('inactive');
  },
  markTabInactive: function(row) {
    row.classList.add('inactive');
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  addTopTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  getBlockLink: function() {
    var link = document.createElement('a');
    link.classList.add('blocklink');
    return link;
  },
  getBlockLinkHolder: function() {
    var el = document.createElement('div');
    el.classList.add('blocklinkholder');
    return el;
  },
  getLinksHolder: function() {
    var el = document.createElement('div');
    el.classList.add('linksholder');
    return el;
  },
  createMediaLink: function(holder,link,media) {
    holder.appendChild(link);
    media.classList.add('medialink');
    holder.appendChild(media);
  },
  createImageLink: function(holder,link,image) {
    holder.appendChild(link);
    link.appendChild(image);
  },
  getFirstTab: function(holder){
    return holder.firstChild.firstChild;
  },
  getInputGroup: function(input, buttons) {
    return undefined;
  }
});
