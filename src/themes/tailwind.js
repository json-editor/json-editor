JSONEditor.defaults.themes.tailwind = JSONEditor.AbstractTheme.extend({
    getGridRow: function () {
        var el = document.createElement("div");
        el.classList.add("flex", "flex-wrap");
        return el;
    },
    getGridColumn: function () {
        var el = document.createElement("div");
        return el;
    },
    setGridColumnSize: function (el, size, offset) {
        if (size < 12) {
            el.classList.add("w-" + size + "/12", "px-1");
        } else {
            el.classList.add("w-full", "px-1");
        }
        if (offset) {
            el.style.marginLeft = (100 / 12) * offset + "%";
        }
    },
    getTitle: function () {
        return this.schema.title;
    },
    getSelectInput: function (options) {
        var el = this._super(options);
        el.classList.add(
            "block",
            "w-full",
            "px-1",
            "text-sm",
            "text-black",
            "leading-normal",
            "bg-white",
            "border",
            "border-grey",
            "rounded"
        );
        return el;
    },
    afterInputReady: function (input) {
        if (input.controlgroup) return;
        input.controlgroup = this.closest(input, ".form-group");
        if (this.closest(input, ".compact")) {
            input.controlgroup.style.marginBottom = 0; //
        }

        // TODO: use tailwind slider
    },
    getTextareaInput: function () {
        var el = document.createElement("textarea");
        el.classList.add(
            "block",
            "w-full",
            "py-1",
            "px-1",
            "text-sm",
            "leading-normal",
            "bg-white",
            "text-black",
            "border",
            "border-grey",
            "rounded"
        );
        return el;
    },
    getRangeInput: function (min, max, step) {
        // TODO: use better slider
        return this._super(min, max, step);
    },
    getFormInputField: function (type) {
        var el = this._super(type);
        if (type !== "checkbox") {
            el.classList.add(
                "block",
                "w-full",
                "px-1",
                "text-black",
                "text-sm",
                "leading-normal",
                "bg-white",
                "border",
                "border-grey",
                "rounded"
            );
        }
        return el;
    },
    getFormInputDescription: function (text) {
        var el = document.createElement("p");
        el.classList.add("block", "mt-1");
        if (window.DOMPurify) el.innerHTML = window.DOMPurify.sanitize(text);
        else el.textContent = this.cleanText(text);
        return el;
    },
    getFormControl: function (label, input, description) {
        var group = document.createElement("div");

        if (label && input.type === "checkbox") {
            group.classList.add("checkbox", "mt-0");
            label.appendChild(input);
            label.classList.add("block", "mt-0", "text-xs");
            group.appendChild(label);
            input.classList.add("relative", "float-left");
        } else {
            group.classList.add("form-group", "mb-2");
            if (label) {
                label.classList.add("block", "text-black", "text-xs", "mb-1");
                group.appendChild(label);
            }
            group.appendChild(input);
        }

        if (description) group.appendChild(description);

        return group;
    },
    getIndentedPanel: function () {
        var el = document.createElement("div");
        el.classList.add(
            "relative",
            "flex",
            "flex-col",
            "min-w-0",
            "rounded",
            "break-words",
            "border",
            "bg-white",
            "border-0",
            "border-blue-400",
            "p-1",
            "shadow-md"
        );
        return el;
    },
    getHeaderButtonHolder: function () {
        var el = this.getButtonHolder();
        el.classList.add("text-sm");
        return el;
    },
    getButtonHolder: function () {
        var el = document.createElement("div");
        el.classList.add("relative", "inline-flex", "align-middle");
        return el;
    },
    getButton: function (text, icon, title) {
        var el = this._super(text, icon, title);
        el.classList.add(
            "inline-block",
            "align-middle",
            "text-center",
            "text-sm",
            "select-none",
            "shadow",
            "border",
            "whitespace-no-wrap",
            "py-1",
            "px-3",
            "m-1",
            "rounded"
        );
        return el;
    },
    getTable: function () {
        var el = document.createElement("table");
        el.classList.add("table", "border", "w-auto", "p-0");
        return el;
    },
    getTableRow: function () {
        return document.createElement("tr");
    },
    getTableHead: function () {
        return document.createElement("thead");
    },
    getTableBody: function () {
        return document.createElement("tbody");
    },
    getTableHeaderCell: function (text) {
        var el = document.createElement("th");
        el.classList.add("text-xs", "border", "w-auto", "p-0");
        el.textContent = text;
        return el;
    },
    getTableCell: function () {
        var el = document.createElement("td");
        el.classList.add("border", "w-auto", "p-0", "m-0");
        return el;
    },
    addInputError: function (input, text) {
        if (!input.controlgroup) return;
        input.controlgroup.classList.add("has-danger");
        input.classList.add("bg-red-600");
        if (!input.errmsg) {
            input.errmsg = document.createElement("p");
            input.errmsg.classList.add("block", "mt-1", "text-xs", "text-red");
            input.controlgroup.appendChild(input.errmsg);
        } else {
            input.errmsg.classList.remove("block");
            input.errmsg.classList.add("hidden");
        }
        input.errmsg.textContent = text;
    },
    removeInputError: function (input) {
        if (!input.errmsg) return;
        input.errmsg.style.display = "hidden";
        input.classList.remove("bg-red-600");
        input.controlgroup.classList.remove("has-danger");
    },
    getTabHolder: function (propertyName) {
        var el = document.createElement("div");
        var pName = typeof propertyName === "undefined" ? "" : propertyName;
        el.innerHTML = "<div class='w-2/12'  id='" + pName + "'><ul class='list-reset pl-0 mb-0'></ul></div><div class='w-10/12' id='" + pName + "'></div>";
        el.classList.add("flex");
        return el;
    },
    addTab: function (holder, tab) {
        holder.children[0].children[0].appendChild(tab);
    },
    getTopTabHolder: function (propertyName) {
        var pName = typeof propertyName === "undefined" ? "" : propertyName;
        var el = document.createElement("div");
        el.innerHTML = "<ul class='nav-tabs flex list-reset pl-0 mb-0 border-b border-grey-light' id='" + pName + "'></ul><div class='p-6 block' id='" + pName + "'></div>";
        return el;
    },
    getTab: function (text, tabId) {
        var liel = document.createElement("li");
        liel.classList.add(
            "nav-item",
            "flex-col",
            "text-center",
            "text-white",
            "bg-blue-500",
            "shadow-md",
            "border",
            "p-2",
            "mb-2",
            "mr-2",
            "hover:bg-blue-400",
            "rounded"
        );
        var ael = document.createElement("a");
        ael.classList.add("nav-link", "text-center");
        ael.setAttribute("href", "#" + tabId);
        ael.setAttribute("data-toggle", "tab");
        ael.appendChild(text);
        liel.appendChild(ael);
        return liel;
    },
    getTopTab: function (text, tabId) {
        var el = document.createElement("li");
        el.classList.add("nav-item", "flex", "border-l", "border-t", "border-r");
        var a = document.createElement("a");
        a.classList.add(
            "nav-link",
            "-mb-px",
            "flex-row",
            "text-center",
            "bg-white",
            "p-2",
            "hover:bg-blue-400",
            "rounded-t"
        );
        a.setAttribute("href", "#" + tabId);
        a.setAttribute("data-toggle", "tab");
        a.appendChild(text);
        el.appendChild(a);
        return el;
    },
    getTabContent: function () {
        var el = document.createElement("div");
        el.setAttribute("role", "tabpanel");
        return el;
    },
    getTopTabContent: function () {
        var el = document.createElement("div");
        el.setAttribute("role", "tabpanel");
        return el;
    },
    markTabActive: function (row) {
        row.tab.firstChild.classList.add("block");
        if (row.tab.firstChild.classList.contains("border-b") == true) {
            row.tab.firstChild.classList.add("border-b-0");
            row.tab.firstChild.classList.remove("border-b");
        } else {
            row.tab.firstChild.classList.add("border-b-0");
        }
        if (row.container.classList.contains("hidden") == true) {
            row.container.classList.remove("hidden");
            row.container.classList.add("block");
        } else {
            row.container.classList.add("block");
        }
    },
    markTabInactive: function (row) {
        if (row.tab.firstChild.classList.contains("border-b-0") == true) {
            row.tab.firstChild.classList.add("border-b");
            row.tab.firstChild.classList.remove("border-b-0");
        } else {
            row.tab.firstChild.classList.add("border-b");
        }
        if (row.container.classList.contains("block") == true) {
            row.container.classList.remove("block");
            row.container.classList.add("hidden");
        }
    },
    getProgressBar: function () {
        var min = 0,
            max = 100,
            start = 0;

        var container = document.createElement("div");
        container.classList.add("progress");

        var bar = document.createElement("div");
        bar.classList.add(
            "bg-blue",
            "leading-none",
            "py-1",
            "text-xs",
            "text-center",
            "text-white"
        );
        bar.setAttribute("role", "progressbar");
        bar.setAttribute("aria-valuenow", start);
        bar.setAttribute("aria-valuemin", min);
        bar.setAttribute("aria-valuenax", max);
        bar.innerHTML = start + "%";
        container.appendChild(bar);

        return container;
    },
    updateProgressBar: function (progressBar, progress) {
        if (!progressBar) return;

        var bar = progressBar.firstChild;
        var percentage = progress + "%";
        bar.setAttribute("aria-valuenow", progress);
        bar.style.width = percentage;
        bar.innerHTML = percentage;
    },
    updateProgressBarUnknown: function (progressBar) {
        if (!progressBar) return;

        var bar = progressBar.firstChild;
        progressBar.classList.add(
            "progress",
            "bg-blue",
            "leading-none",
            "py-1",
            "text-xs",
            "text-center",
            "text-white",
            "block"
        );
        bar.removeAttribute("aria-valuenow");
        bar.classList.add("w-full");
        bar.innerHTML = "";
    },
    getInputGroup: function (input, buttons) {
        if (!input) return;

        var inputGroupContainer = document.createElement("div");
        inputGroupContainer.classList.add("relative", "items-stretch", "w-full");
        inputGroupContainer.appendChild(input);

        var inputGroup = document.createElement("div");
        inputGroup.classList.add("-mr-1");
        inputGroupContainer.appendChild(inputGroup);

        for (var i = 0; i < buttons.length; i++) {
            inputGroup.appendChild(buttons[i]);
        }

        return inputGroupContainer;
    }
});
