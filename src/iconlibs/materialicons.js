JSONEditor.defaults.iconlibs.materialicons = JSONEditor.AbstractIconLib.extend({

    mapping: {
        collapse: 'arrow_drop_up',
        expand: 'arrow_drop_down',
        "delete": 'delete',
        edit: 'edit',
        add: 'add',
        cancel: 'cancel',
        save: 'save',
        moveup: 'arrow_upward',
        movedown: 'arrow_downward',
        copy: 'content_copy'
    },

    icon_class: 'material-icons',
    icon_prefix: '',

    getIconClass: function(key) {

        // This method is unused.

        return this.icon_class;
    },

    getIcon: function(key) {

        // Get the mapping.
        var mapping = this.mapping[key];
        if (!mapping) return null;

        // @see http://materializecss.com/icons.html
        var i = document.createElement('i');
        i.className = this.icon_class;
        var t = document.createTextNode(mapping);
        i.appendChild(t);
        return i;

    }
});
