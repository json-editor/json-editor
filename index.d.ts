// Type definitions for json-editor
// Project: https://github.com/json-editor/json-editor
// Author: Arian Kulp

declare type JSONEditorIconLibraries = (string & {}) | "bootstrap2" | "bootstrap3" | "foundation2" | "foundation3" | "jqueryui" | "fontawesome3" | "fontawesome4" | "fontawesome5" | "materialicons" | "openiconic" | "spectre";
declare type JSONEditorThemes = "barebones" | "html" | "bootstrap2" | "bootstrap3" | "bootstrap4" | "foundation" | "jqueryui" | "materialize" | "spectre" | "tailwind";
declare type JSONEditorTemplates = "default" | "ejs" | "handlebars" | "hogan" | "lodash" | "markup" | "mustache" | "swig" | "underscore";

declare type JSONEditorDocument = Record<string, unknown>;
declare type AbstractTheme = {};

declare type JSONEditorError = {
    path: string;
    property: string;
    message: string;
}

declare interface JSONEditorLanguage {
    /**
     * When a property is not set
     */
    error_notset: string;
    /**
    * When a string must not be empty
    */
    error_notempty: string;
    /**
    * When a value is not one of the enumerated values
    */
    error_enum: string;
    /**
    * When a value is not equal to the constant
    */
    error_const: string;
    /**
    * When a value doesn't validate any schema of a 'anyOf' combination
    */
    error_anyOf: string;
    /**
    * When a value doesn't validate
    * @variables This key takes one variable: The number of schemas the value does not validate
    */
    error_oneOf: string;
    /**
    * When a value does not validate a 'not' schema
    */
    error_not: string;
    /**
    * When a value does not match any of the provided types
    */
    error_type_union: string;
    /**
    * When a value does not match the given type
    * @variables This key takes one variable: The type the value should be of
    */
    error_type: string;
    /**
    *  When the value validates one of the disallowed types
    */
    error_disallow_union: string;
    /**
    *  When the value validates a disallowed type
    * @variables This key takes one variable: The type the value should not be of
    */
    error_disallow: string;
    /**
    * When a value is not a multiple of or divisible by a given number
    * @variables This key takes one variable: The number mentioned above
    */
    error_multipleOf: string;
    /**
    * When a value is greater than it's supposed to be (exclusive)
    * @variables This key takes one variable: The maximum
    */
    error_maximum_excl: string;
    /**
    * When a value is greater than it's supposed to be (inclusive
    * @variables This key takes one variable: The maximum
    */
    error_maximum_incl: string;
    /**
    * When a value is lesser than it's supposed to be (exclusive)
    * @variables This key takes one variable: The minimum
    */
    error_minimum_excl: string;
    /**
    * When a value is lesser than it's supposed to be (inclusive)
    * @variables This key takes one variable: The minimum
    */
    error_minimum_incl: string;
    /**
    * When a value have too many characters
    * @variables This key takes one variable: The maximum character count
    */
    error_maxLength: string;
    /**
    * When a value does not have enough characters
    * @variables This key takes one variable: The minimum character count
    */
    error_minLength: string;
    /**
    * When a value does not match a given pattern
    */
    error_pattern: string;
    /**
    * When an array has additional items whereas it is not supposed to
    */
    error_additionalItems: string;
    /**
    * When there are to many items in an array
    * @variables This key takes one variable: The maximum item count
    */
    error_maxItems: string;
    /**
    * When there are not enough items in an array
    * @variables This key takes one variable: The minimum item count
    */
    error_minItems: string;
    /**
    * When an array is supposed to have unique items but has duplicates
    */
    error_uniqueItems: string;
    /**
    * When there are too many properties in an object
    * @variables This key takes one variable: The maximum property count
    */
    error_maxProperties: string;
    /**
    * When there are not enough properties in an object
    * @variables This key takes one variable: The minimum property count
    */
    error_minProperties: string;
    /**
    * When a required property is not defined
    * @variables This key takes one variable: The name of the missing property
    */
    error_required: string;
    /**
    * When there is an additional property is set whereas there should be none
    * @variables This key takes one variable: The name of the additional property
    */
    error_additional_properties: string;
    /**
    * When there is a propertyName that sets a max length and a property name exceeds the max length
    * @variables This key takes one variable: The name of the invalid property
    */
    error_property_names_exceeds_maxlength: string;
    /**
    * When there is a propertyName that sets an enum and a property name matches none of the possible enum
    * @variables This key takes one variable: The name of the invalid property
    */
    error_property_names_enum_mismatch: string;
    /**
    * When there is a propertyName that sets a const and a property does not match the const value
    * @variables This key takes one variable: The name of the invalid property
    */
    error_property_names_const_mismatch: string;
    /**
    * When there is a propertyName that sets a pattern and a property name does not match the pattern
    * @variables This key takes one variable: The name of the invalid property
    */
    error_property_names_pattern_mismatch: string;
    /**
    * When the propertyName is set to false and there is at least one property
    * @variables This key takes one variable: The name of the invalid property
    */
    error_property_names_false: string;
    /**
    * When the propertyName specifies a maxLength that is not a number
    * @variables This key takes one variable: The name of the current property
    */
    error_property_names_maxlength: string;
    /**
    * When the propertyName specifies an enum that is not an array
    * @variables This key takes one variable: The name of the current property
    */
    error_property_names_enum: string;
    /**
    * When the propertyName specifies a pattern that is not a string
    * @variables This key takes one variable: The name of the current property
    */
    error_property_names_pattern: string;
    /**
    * When the propertyName is unsupported
    * @variables This key takes one variable: The name of the invalid propertyName
    */
    error_property_names_unsupported: string;
    /**
    * When a dependency is not resolved
    * @variables This key takes one variable: The name of the missing property for the dependency
    */
    error_dependency: string;
    /**
    * When a date is in incorrect format
    * @variables This key takes one variable: The valid format
    */
    error_date: string;
    /**
    * When a time is in incorrect format
    * @variables This key takes one variable: The valid format
    */
    error_time: string;
    /**
    * When a datetime-local is in incorrect format
    * @variables This key takes one variable: The valid format
    */
    error_datetime_local: string;
    /**
    * When a integer date is less than 1 January 1970
    */
    error_invalid_epoch: string;
    /**
    * When an IPv4 is in incorrect format
    */
    error_ipv4: string;
    /**
    * When an IPv6 is in incorrect format
    */
    error_ipv6: string;
    /**
    * When a hostname is in incorrect format
    */
    error_hostname: string;
    /**
     * When uploads max size limit is exceeded
     */
    upload_max_size: string;
    /**
     * When the mime type does not match the type of the file
     */
    upload_wrong_file_format: string;
    /**
    * Text/Title on Save button
    */
    button_save: string;
    /**
    * Text/Title on Copy button
    */
    button_copy: string;
    /**
    * Text/Title on Cancel button
    */
    button_cancel: string;
    /**
    * Text/Title on Add button
    */
    button_add: string;
    /**
    * Text on Delete All buttons
    */
    button_delete_all: string;
    /**
    * Title on Delete All buttons
    */
    button_delete_all_title: string;
    /**
    * Text on Delete Last buttons
    * @variable This key takes one variable: The title of object to delete
    */
    button_delete_last: string;
    /**
    * Title on Delete Last buttons
    * @variable This key takes one variable: The title of object to delete
    */
    button_delete_last_title: string;
    /**
    * Title on Add Row buttons
    * @variable This key takes one variable: The title of object to add
    */
    button_add_row_title: string;
    /**
    * Title on Move Down buttons
    */
    button_move_down_title: string;
    /**
    * Title on Move Up buttons
    */
    button_move_up_title: string;
    /**
    * Text on Object Properties buttons
    */
    button_properties: string;
    /**
    * Title on Object Properties buttons
    */
    button_object_properties: string;
    /**
    * Title on Copy Row button
    * @variable This key takes one variable: The title of object to delete
    */
    button_copy_row_title: string;
    /**
    * Title on Delete Row buttons
    * @variable This key takes one variable: The title of object to delete
    */
    button_delete_row_title: string;
    /**
    * Title on Delete Row buttons, short version (no parameter with the object title)
    */
    button_delete_row_title_short: string;
    /**
    * Title on Copy Row buttons, short version (no parameter with the object title)
    */
    button_copy_row_title_short: string;
    /**
    * Title on Collapse buttons
    */
    button_collapse: string;
    /**
    * Title on Expand buttons
    */
    button_expand: string;
    /**
    * Title on Edit JSON buttons
    */
    button_edit_json: string;
    /**
    * Text/Title on Upload buttons
    */
    button_upload: string;
    /**
    * Title on Flatpickr toggle buttons
    */
    flatpickr_toggle_button: string;
    /**
    * Title on Flatpickr clear buttons
    */
    flatpickr_clear_button: string;
    /**
    * Choices input field placeholder text
    */
    choices_placeholder_text: string;
    /**
    * Default title for array items
    */
    default_array_item_title: string;
    /**
    * Warning when deleting a node
    */
    button_delete_node_warning: string;
}

declare type JSONEditorGlobalOptions<TValue> = JSONEditorOptions<TValue> & JSONEditorObjectOptions & JSONEditorArrayOptions;

declare interface JSONEditorOptions<TValue> {
    /**
     * If true, JSON Editor will load external URLs in $ref via ajax.
     */
    ajax?: boolean;
    /**
     * If true, remove all "add row" buttons from arrays.
     */
    disable_array_add?: boolean;
    /**
     * If true, remove all "delete row" buttons from arrays.
     */
    disable_array_delete?: boolean;
    /**
     * If true, remove all "move up" and "move down" buttons from arrays.
     */
    disable_array_reorder?: boolean;
    /**
     * If true, remove all collapse buttons from objects and arrays.
     */
    disable_collapse?: boolean;
    /**
     * If true, remove all Edit JSON buttons from objects.
     */
    disable_edit_json?: boolean;
    /**
     * If true, remove all Edit Properties buttons from objects.
     */
    disable_properties?: boolean;
    /**
     * The first part of the `name` attribute of form inputs in the editor. An full example name is `root[person][name]` where "root" is the form_name_root.
     */
    form_name_root?: string;
    /**
     * The icon library to use for the editor.
     */
    iconlib?: JSONEditorIconLibraries;
    /**
     * If true, objects can only contain properties defined with the properties keyword.
     */
    no_additional_properties?: boolean;
    /**
     * An object containing schema definitions for URLs. Allows you to pre-define external schemas.
     */
    refs?: any;
    /**
     * If true, all schemas that don't explicitly set the required property will be required.
     */
    required_by_default?: boolean;
    /**
     * If true, makes oneOf copy properties over when switching.
     */
    keep_oneof_values?: boolean;
    /**
     * A valid JSON Schema to use for the editor. Version 3 and Version 4 of the draft specification are supported.
     */
    schema?: any;
    /**
     * When to show validation errors in the UI. Valid values are interaction, change, always, and never.
     */
    show_errors?: "interaction" | "change" | "always" | "never";
    /**
     * Seed the editor with an initial value. This should be valid against the editor's schema.
     */
    startval?: TValue;
    /**
     * The JS template engine to use.
     */
    template?: string | { compile: (template: string) => (vars: any) => string };
    /**
     * The CSS theme to use.
     */
    theme?: JSONEditorThemes;
    /**
     * If true, only required properties will be included by default.
     */
    display_required_only?: boolean;

    /**
     * Handler to use for uploading files
     */
    upload: (type: string, file: File, cbs: { success: (url: string) => void, failure: (error: any) => void, updateProgress: (progress: number) => void }) => void;
    /**
     * If true, sets the name attribute of HTML input elements
     */
    use_name_attributes: boolean;
    /**
     * If true, prompts user to confirm deletion of array nodes
     */
    prompt_before_delete: boolean;
    /**
     * If true, returns default values for unset fields
     */
    use_default_values: boolean;
    /**
     * If non-zero, limits how deep into the schema to process
     */
    max_depth: number;
}
declare type JSONEditorObjectOptions = {
    /**
     * If set to true, the Edit JSON button will be hidden
     */
    disable_edit_json?: boolean;
    /**
     * If set to true, the Edit Properties button will be hidden
     */
    disable_properties?: boolean;
}
declare type JSONEditorArrayOptions = {
    /**
     * If set to true, only creates active tabs until activated
     */
    defer_array_tabs?: boolean
    /**
     * If set to true, just the "delete all rows" button will be hidden
     */
    disable_array_delete_all_rows?: boolean;
    /**
     * If set to true, just the "delete last row" buttons will be hidden
     */
    disable_array_delete_last_row?: boolean;
}

declare interface AbstractIconMapping {
    collapse: string;
    expand: string;
    delete: string;
    edit: string;
    add: string;
    cancel: string;
    save: string;
    moveup: string;
    movedown: string;
}

declare let JSONEditor: IJsonEditor<JSONEditorDocument>;
declare interface IJsonEditor<TValue> {
    // static
    defaults: {
        options: JSONEditorOptions<any>;
        editors: {
            object: {
                options: JSONEditorObjectOptions;
            };
            array: {
                options: JSONEditorArrayOptions;
            }
        };
        languages: Record<string, JSONEditorLanguage>;
        language: string; // 'en'
        resolvers: ((schema: any) => string)[];
        custom_validators: (((schema: any, value: string, path: string) => JSONEditorError[]))[];
        iconlibs: Record<JSONEditorIconLibraries, unknown>;
        theme: string; // 'html
        template: string; // 'default'
        themes: Record<JSONEditorThemes, AbstractTheme>;
        callbacks: {};
        templates: Record<JSONEditorTemplates, any>;
        default_language: string; // 'en'
        translate: (key: string, variables: Array<any>, schema: any) => string;
        translateProperty: (text: string, variables: Array<any>) => string;
    };
    plugins: {
        sceditor: {
            emoticonsEnabled: boolean;
        };
        epiceditor: {
            basePath: string;
        };
        ace: {
            theme: string;
        };
        selectize: {
            enable: boolean;
        };
    };

    AbstractIconLib: {
        new(iconPrefix?: string, mapping?: AbstractIconMapping);

        mapping: AbstractIconMapping;
        icon_prefix: string;
    };

    new(element: HTMLElement, options: JSONEditorOptions<TValue>);

    ready: boolean;
    on (event: string, fn: Function): IJsonEditor<TValue>;
    off (event: string, fn: Function): IJsonEditor<TValue>;
    watch (event: string, fn: Function): IJsonEditor<TValue>;
    unwatch (event: string, fn: Function): IJsonEditor<TValue>;
    validate (value?: TValue): JSONEditorError[];
    setValue (value: TValue): void;
    getValue (): TValue;
    getEditor (name: string): IJsonEditor<TValue>;
    disable (): void;
    enable (): void;
    isEnabled (): boolean;
    destroy (): void;
    promise: Promise<void>;
    setOption<T extends JSONEditorOptions<any>, K extends keyof T> (option: K, value: T[K]): IJsonEditor<JSONEditorDocument>;
}
