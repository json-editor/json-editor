/**
 * @name JSON Editor
 * @description JSON Schema Based Editor
 * This library is the continuation of jdorn's great work (see also https://github.com/jdorn/json-editor/issues/800)
 * @version {{ VERSION }}
 * @author Jeremy Dorn
 * @see https://github.com/jdorn/json-editor/
 * @see https://github.com/json-editor/json-editor
 * @license MIT
 * @example see README.md and docs/ for requirements, examples and usage info
 */

;(function (global, factory) {
	"use strict";
	var JSONEditor = factory(global);
	if (typeof module === "object" && module != null && module.exports) {
		module.exports = JSONEditor;
	} else if (typeof define === "function" && define.amd) {
		define(function () { return JSONEditor; });
	} else {
		global.JSONEditor = JSONEditor;
	}
})(typeof window !== "undefined" ? window : this, function (global, undefined) {
