(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["AjvValidator"] = factory();
    else
        root["AjvValidator"] = factory();
})(this, function() {
    return /******/ (function(modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if(installedModules[moduleId]) {
                /******/ 			return installedModules[moduleId].exports;
                /******/ 		}
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			i: moduleId,
                /******/ 			l: false,
                /******/ 			exports: {}
                /******/ 		};
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/ 	}
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;
        /******/
        /******/ 	// define getter function for harmony exports
        /******/ 	__webpack_require__.d = function(exports, name, getter) {
            /******/ 		if(!__webpack_require__.o(exports, name)) {
                /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
                /******/ 		}
            /******/ 	};
        /******/
        /******/ 	// define __esModule on exports
        /******/ 	__webpack_require__.r = function(exports) {
            /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/ 		}
            /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
            /******/ 	};
        /******/
        /******/ 	// create a fake namespace object
        /******/ 	// mode & 1: value is a module id, require it
        /******/ 	// mode & 2: merge all properties of value into the ns
        /******/ 	// mode & 4: return value when already ns object
        /******/ 	// mode & 8|1: behave like require
        /******/ 	__webpack_require__.t = function(value, mode) {
            /******/ 		if(mode & 1) value = __webpack_require__(value);
            /******/ 		if(mode & 8) return value;
            /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            /******/ 		var ns = Object.create(null);
            /******/ 		__webpack_require__.r(ns);
            /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
            /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
            /******/ 		return ns;
            /******/ 	};
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/ 	__webpack_require__.n = function(module) {
            /******/ 		var getter = module && module.__esModule ?
              /******/ 			function getDefault() { return module['default']; } :
              /******/ 			function getModuleExports() { return module; };
            /******/ 		__webpack_require__.d(getter, 'a', getter);
            /******/ 		return getter;
            /******/ 	};
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";
        /******/
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(__webpack_require__.s = "./src/ajv-validator.js");
        /******/ })
    /************************************************************************/
    /******/ ({

        /***/ "./node_modules/ajv-formats/dist/formats.js":
        /*!**************************************************!*\
  !*** ./node_modules/ajv-formats/dist/formats.js ***!
  \**************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
            function fmtDef(validate, compare) {
                return { validate, compare };
            }
            exports.fullFormats = {
                // date: http://tools.ietf.org/html/rfc3339#section-5.6
                date: fmtDef(date, compareDate),
                // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
                time: fmtDef(time, compareTime),
                "date-time": fmtDef(date_time, compareDateTime),
                // duration: https://tools.ietf.org/html/rfc3339#appendix-A
                duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
                uri,
                "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
                // uri-template: https://tools.ietf.org/html/rfc6570
                "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
                // For the source: https://gist.github.com/dperini/729294
                // For test cases: https://mathiasbynens.be/demo/url-regex
                url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
                email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
                // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
                ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
                ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
                regex,
                // uuid: http://tools.ietf.org/html/rfc4122
                uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
                // JSON-pointer: https://tools.ietf.org/html/rfc6901
                // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
                "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
                "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
                // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
                "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
                // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
                // byte: https://github.com/miguelmota/is-base64
                byte,
                // signed 32 bit integer
                int32: { type: "number", validate: validateInt32 },
                // signed 64 bit integer
                int64: { type: "number", validate: validateInt64 },
                // C-type float
                float: { type: "number", validate: validateNumber },
                // C-type double
                double: { type: "number", validate: validateNumber },
                // hint to the UI to hide input strings
                password: true,
                // unchecked string payload
                binary: true,
            };
            exports.fastFormats = {
                ...exports.fullFormats,
                date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
                time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareTime),
                "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
                // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
                uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
                "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
                // email (sources from jsen validator):
                // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
                // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
                email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
            };
            exports.formatNames = Object.keys(exports.fullFormats);
            function isLeapYear(year) {
                // https://tools.ietf.org/html/rfc3339#appendix-C
                return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
            }
            const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
            const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            function date(str) {
                // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
                const matches = DATE.exec(str);
                if (!matches)
                    return false;
                const year = +matches[1];
                const month = +matches[2];
                const day = +matches[3];
                return (month >= 1 &&
                  month <= 12 &&
                  day >= 1 &&
                  day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]));
            }
            function compareDate(d1, d2) {
                if (!(d1 && d2))
                    return undefined;
                if (d1 > d2)
                    return 1;
                if (d1 < d2)
                    return -1;
                return 0;
            }
            const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
            function time(str, withTimeZone) {
                const matches = TIME.exec(str);
                if (!matches)
                    return false;
                const hour = +matches[1];
                const minute = +matches[2];
                const second = +matches[3];
                const timeZone = matches[5];
                return (((hour <= 23 && minute <= 59 && second <= 59) ||
                    (hour === 23 && minute === 59 && second === 60)) &&
                  (!withTimeZone || timeZone !== ""));
            }
            function compareTime(t1, t2) {
                if (!(t1 && t2))
                    return undefined;
                const a1 = TIME.exec(t1);
                const a2 = TIME.exec(t2);
                if (!(a1 && a2))
                    return undefined;
                t1 = a1[1] + a1[2] + a1[3] + (a1[4] || "");
                t2 = a2[1] + a2[2] + a2[3] + (a2[4] || "");
                if (t1 > t2)
                    return 1;
                if (t1 < t2)
                    return -1;
                return 0;
            }
            const DATE_TIME_SEPARATOR = /t|\s/i;
            function date_time(str) {
                // http://tools.ietf.org/html/rfc3339#section-5.6
                const dateTime = str.split(DATE_TIME_SEPARATOR);
                return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
            }
            function compareDateTime(dt1, dt2) {
                if (!(dt1 && dt2))
                    return undefined;
                const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
                const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
                const res = compareDate(d1, d2);
                if (res === undefined)
                    return undefined;
                return res || compareTime(t1, t2);
            }
            const NOT_URI_FRAGMENT = /\/|:/;
            const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
            function uri(str) {
                // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
                return NOT_URI_FRAGMENT.test(str) && URI.test(str);
            }
            const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
            function byte(str) {
                BYTE.lastIndex = 0;
                return BYTE.test(str);
            }
            const MIN_INT32 = -(2 ** 31);
            const MAX_INT32 = 2 ** 31 - 1;
            function validateInt32(value) {
                return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
            }
            function validateInt64(value) {
                // JSON and javascript max Int is 2**53, so any int that passes isInteger is valid for Int64
                return Number.isInteger(value);
            }
            function validateNumber() {
                return true;
            }
            const Z_ANCHOR = /[^\\]\\Z/;
            function regex(str) {
                if (Z_ANCHOR.test(str))
                    return false;
                try {
                    new RegExp(str);
                    return true;
                }
                catch (e) {
                    return false;
                }
            }
//# sourceMappingURL=formats.js.map

            /***/ }),

        /***/ "./node_modules/ajv-formats/dist/index.js":
        /*!************************************************!*\
  !*** ./node_modules/ajv-formats/dist/index.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const formats_1 = __webpack_require__(/*! ./formats */ "./node_modules/ajv-formats/dist/formats.js");
            const limit_1 = __webpack_require__(/*! ./limit */ "./node_modules/ajv-formats/dist/limit.js");
            const codegen_1 = __webpack_require__(/*! ajv/dist/compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const fullName = new codegen_1.Name("fullFormats");
            const fastName = new codegen_1.Name("fastFormats");
            const formatsPlugin = (ajv, opts = { keywords: true }) => {
                if (Array.isArray(opts)) {
                    addFormats(ajv, opts, formats_1.fullFormats, fullName);
                    return ajv;
                }
                const [formats, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
                const list = opts.formats || formats_1.formatNames;
                addFormats(ajv, list, formats, exportName);
                if (opts.keywords)
                    limit_1.default(ajv);
                return ajv;
            };
            formatsPlugin.get = (name, mode = "full") => {
                const formats = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
                const f = formats[name];
                if (!f)
                    throw new Error(`Unknown format "${name}"`);
                return f;
            };
            function addFormats(ajv, list, fs, exportName) {
                var _a;
                var _b;
                (_a = (_b = ajv.opts.code).formats) !== null && _a !== void 0 ? _a : (_b.formats = codegen_1._ `require("ajv-formats/dist/formats").${exportName}`);
                for (const f of list)
                    ajv.addFormat(f, fs[f]);
            }
            module.exports = exports = formatsPlugin;
            Object.defineProperty(exports, "__esModule", { value: true });
            exports.default = formatsPlugin;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv-formats/dist/limit.js":
        /*!************************************************!*\
  !*** ./node_modules/ajv-formats/dist/limit.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.formatLimitDefinition = void 0;
            const ajv_1 = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
            const codegen_1 = __webpack_require__(/*! ajv/dist/compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const ops = codegen_1.operators;
            const KWDs = {
                formatMaximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
                formatMinimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
                formatExclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
                formatExclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
            };
            const error = {
                message: ({ keyword, schemaCode }) => codegen_1.str `should be ${KWDs[keyword].okStr} ${schemaCode}`,
                params: ({ keyword, schemaCode }) => codegen_1._ `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
            };
            exports.formatLimitDefinition = {
                keyword: Object.keys(KWDs),
                type: "string",
                schemaType: "string",
                $data: true,
                error,
                code(cxt) {
                    const { gen, data, schemaCode, keyword, it } = cxt;
                    const { opts, self } = it;
                    if (!opts.validateFormats)
                        return;
                    const fCxt = new ajv_1.KeywordCxt(it, self.RULES.all.format.definition, "format");
                    if (fCxt.$data)
                        validate$DataFormat();
                    else
                        validateFormat();
                    function validate$DataFormat() {
                        const fmts = gen.scopeValue("formats", {
                            ref: self.formats,
                            code: opts.code.formats,
                        });
                        const fmt = gen.const("fmt", codegen_1._ `${fmts}[${fCxt.schemaCode}]`);
                        cxt.fail$data(codegen_1.or(codegen_1._ `typeof ${fmt} != "object"`, codegen_1._ `${fmt} instanceof RegExp`, codegen_1._ `typeof ${fmt}.compare != "function"`, compareCode(fmt)));
                    }
                    function validateFormat() {
                        const format = fCxt.schema;
                        const fmtDef = self.formats[format];
                        if (!fmtDef || fmtDef === true)
                            return;
                        if (typeof fmtDef != "object" ||
                          fmtDef instanceof RegExp ||
                          typeof fmtDef.compare != "function") {
                            throw new Error(`"${keyword}": format "${format}" does not define "compare" function`);
                        }
                        const fmt = gen.scopeValue("formats", {
                            key: format,
                            ref: fmtDef,
                            code: opts.code.formats ? codegen_1._ `${opts.code.formats}${codegen_1.getProperty(format)}` : undefined,
                        });
                        cxt.fail$data(compareCode(fmt));
                    }
                    function compareCode(fmt) {
                        return codegen_1._ `${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
                    }
                },
                dependencies: ["format"],
            };
            const formatLimitPlugin = (ajv) => {
                ajv.addKeyword(exports.formatLimitDefinition);
                return ajv;
            };
            exports.default = formatLimitPlugin;
//# sourceMappingURL=limit.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/2020.js":
        /*!***************************************!*\
  !*** ./node_modules/ajv/dist/2020.js ***!
  \***************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
            const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/core.js");
            const draft2020_1 = __webpack_require__(/*! ./vocabularies/draft2020 */ "./node_modules/ajv/dist/vocabularies/draft2020.js");
            const discriminator_1 = __webpack_require__(/*! ./vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
            const json_schema_2020_12_1 = __webpack_require__(/*! ./refs/json-schema-2020-12 */ "./node_modules/ajv/dist/refs/json-schema-2020-12/index.js");
            const META_SCHEMA_ID = "https://json-schema.org/draft/2020-12/schema";
            class Ajv2020 extends core_1.default {
                constructor(opts = {}) {
                    super({
                        ...opts,
                        dynamicRef: true,
                        next: true,
                        unevaluated: true,
                    });
                }
                _addVocabularies() {
                    super._addVocabularies();
                    draft2020_1.default.forEach((v) => this.addVocabulary(v));
                    if (this.opts.discriminator)
                        this.addKeyword(discriminator_1.default);
                }
                _addDefaultMetaSchema() {
                    super._addDefaultMetaSchema();
                    const { $data, meta } = this.opts;
                    if (!meta)
                        return;
                    json_schema_2020_12_1.default.call(this, $data);
                    this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
                }
                defaultMeta() {
                    return (this.opts.defaultMeta =
                      super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
                }
            }
            module.exports = exports = Ajv2020;
            Object.defineProperty(exports, "__esModule", { value: true });
            exports.default = Ajv2020;
            var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
            Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
            var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
            Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
            Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
            Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
            Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
            Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });
            var validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
            Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return validation_error_1.default; } });
            var ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
            Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function () { return ref_error_1.default; } });
//# sourceMappingURL=2020.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/ajv.js":
        /*!**************************************!*\
  !*** ./node_modules/ajv/dist/ajv.js ***!
  \**************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
            const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/core.js");
            const draft7_1 = __webpack_require__(/*! ./vocabularies/draft7 */ "./node_modules/ajv/dist/vocabularies/draft7.js");
            const discriminator_1 = __webpack_require__(/*! ./vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
            const draft7MetaSchema = __webpack_require__(/*! ./refs/json-schema-draft-07.json */ "./node_modules/ajv/dist/refs/json-schema-draft-07.json");
            const META_SUPPORT_DATA = ["/properties"];
            const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
            class Ajv extends core_1.default {
                _addVocabularies() {
                    super._addVocabularies();
                    draft7_1.default.forEach((v) => this.addVocabulary(v));
                    if (this.opts.discriminator)
                        this.addKeyword(discriminator_1.default);
                }
                _addDefaultMetaSchema() {
                    super._addDefaultMetaSchema();
                    if (!this.opts.meta)
                        return;
                    const metaSchema = this.opts.$data
                      ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA)
                      : draft7MetaSchema;
                    this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
                    this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
                }
                defaultMeta() {
                    return (this.opts.defaultMeta =
                      super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
                }
            }
            module.exports = exports = Ajv;
            Object.defineProperty(exports, "__esModule", { value: true });
            exports.default = Ajv;
            var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
            Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
            var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
            Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
            Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
            Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
            Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
            Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });
            var validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
            Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return validation_error_1.default; } });
            var ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
            Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function () { return ref_error_1.default; } });
//# sourceMappingURL=ajv.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/codegen/code.js":
        /*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/code.js ***!
  \*******************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
            class _CodeOrName {
            }
            exports._CodeOrName = _CodeOrName;
            exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
            class Name extends _CodeOrName {
                constructor(s) {
                    super();
                    if (!exports.IDENTIFIER.test(s))
                        throw new Error("CodeGen: name must be a valid identifier");
                    this.str = s;
                }
                toString() {
                    return this.str;
                }
                emptyStr() {
                    return false;
                }
                get names() {
                    return { [this.str]: 1 };
                }
            }
            exports.Name = Name;
            class _Code extends _CodeOrName {
                constructor(code) {
                    super();
                    this._items = typeof code === "string" ? [code] : code;
                }
                toString() {
                    return this.str;
                }
                emptyStr() {
                    if (this._items.length > 1)
                        return false;
                    const item = this._items[0];
                    return item === "" || item === '""';
                }
                get str() {
                    var _a;
                    return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
                }
                get names() {
                    var _a;
                    return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
                        if (c instanceof Name)
                            names[c.str] = (names[c.str] || 0) + 1;
                        return names;
                    }, {})));
                }
            }
            exports._Code = _Code;
            exports.nil = new _Code("");
            function _(strs, ...args) {
                const code = [strs[0]];
                let i = 0;
                while (i < args.length) {
                    addCodeArg(code, args[i]);
                    code.push(strs[++i]);
                }
                return new _Code(code);
            }
            exports._ = _;
            const plus = new _Code("+");
            function str(strs, ...args) {
                const expr = [safeStringify(strs[0])];
                let i = 0;
                while (i < args.length) {
                    expr.push(plus);
                    addCodeArg(expr, args[i]);
                    expr.push(plus, safeStringify(strs[++i]));
                }
                optimize(expr);
                return new _Code(expr);
            }
            exports.str = str;
            function addCodeArg(code, arg) {
                if (arg instanceof _Code)
                    code.push(...arg._items);
                else if (arg instanceof Name)
                    code.push(arg);
                else
                    code.push(interpolate(arg));
            }
            exports.addCodeArg = addCodeArg;
            function optimize(expr) {
                let i = 1;
                while (i < expr.length - 1) {
                    if (expr[i] === plus) {
                        const res = mergeExprItems(expr[i - 1], expr[i + 1]);
                        if (res !== undefined) {
                            expr.splice(i - 1, 3, res);
                            continue;
                        }
                        expr[i++] = "+";
                    }
                    i++;
                }
            }
            function mergeExprItems(a, b) {
                if (b === '""')
                    return a;
                if (a === '""')
                    return b;
                if (typeof a == "string") {
                    if (b instanceof Name || a[a.length - 1] !== '"')
                        return;
                    if (typeof b != "string")
                        return `${a.slice(0, -1)}${b}"`;
                    if (b[0] === '"')
                        return a.slice(0, -1) + b.slice(1);
                    return;
                }
                if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
                    return `"${a}${b.slice(1)}`;
                return;
            }
            function strConcat(c1, c2) {
                return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
            }
            exports.strConcat = strConcat;
// TODO do not allow arrays here
            function interpolate(x) {
                return typeof x == "number" || typeof x == "boolean" || x === null
                  ? x
                  : safeStringify(Array.isArray(x) ? x.join(",") : x);
            }
            function stringify(x) {
                return new _Code(safeStringify(x));
            }
            exports.stringify = stringify;
            function safeStringify(x) {
                return JSON.stringify(x)
                .replace(/\u2028/g, "\\u2028")
                .replace(/\u2029/g, "\\u2029");
            }
            exports.safeStringify = safeStringify;
            function getProperty(key) {
                return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
            }
            exports.getProperty = getProperty;
//Does best effort to format the name properly
            function getEsmExportName(key) {
                if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
                    return new _Code(`${key}`);
                }
                throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
            }
            exports.getEsmExportName = getEsmExportName;
            function regexpCode(rx) {
                return new _Code(rx.toString());
            }
            exports.regexpCode = regexpCode;
//# sourceMappingURL=code.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/codegen/index.js":
        /*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/index.js ***!
  \********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
            const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
            const scope_1 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
            var code_2 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
            Object.defineProperty(exports, "_", { enumerable: true, get: function () { return code_2._; } });
            Object.defineProperty(exports, "str", { enumerable: true, get: function () { return code_2.str; } });
            Object.defineProperty(exports, "strConcat", { enumerable: true, get: function () { return code_2.strConcat; } });
            Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return code_2.nil; } });
            Object.defineProperty(exports, "getProperty", { enumerable: true, get: function () { return code_2.getProperty; } });
            Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return code_2.stringify; } });
            Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function () { return code_2.regexpCode; } });
            Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return code_2.Name; } });
            var scope_2 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
            Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return scope_2.Scope; } });
            Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function () { return scope_2.ValueScope; } });
            Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function () { return scope_2.ValueScopeName; } });
            Object.defineProperty(exports, "varKinds", { enumerable: true, get: function () { return scope_2.varKinds; } });
            exports.operators = {
                GT: new code_1._Code(">"),
                GTE: new code_1._Code(">="),
                LT: new code_1._Code("<"),
                LTE: new code_1._Code("<="),
                EQ: new code_1._Code("==="),
                NEQ: new code_1._Code("!=="),
                NOT: new code_1._Code("!"),
                OR: new code_1._Code("||"),
                AND: new code_1._Code("&&"),
                ADD: new code_1._Code("+"),
            };
            class Node {
                optimizeNodes() {
                    return this;
                }
                optimizeNames(_names, _constants) {
                    return this;
                }
            }
            class Def extends Node {
                constructor(varKind, name, rhs) {
                    super();
                    this.varKind = varKind;
                    this.name = name;
                    this.rhs = rhs;
                }
                render({ es5, _n }) {
                    const varKind = es5 ? scope_1.varKinds.var : this.varKind;
                    const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
                    return `${varKind} ${this.name}${rhs};` + _n;
                }
                optimizeNames(names, constants) {
                    if (!names[this.name.str])
                        return;
                    if (this.rhs)
                        this.rhs = optimizeExpr(this.rhs, names, constants);
                    return this;
                }
                get names() {
                    return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
                }
            }
            class Assign extends Node {
                constructor(lhs, rhs, sideEffects) {
                    super();
                    this.lhs = lhs;
                    this.rhs = rhs;
                    this.sideEffects = sideEffects;
                }
                render({ _n }) {
                    return `${this.lhs} = ${this.rhs};` + _n;
                }
                optimizeNames(names, constants) {
                    if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
                        return;
                    this.rhs = optimizeExpr(this.rhs, names, constants);
                    return this;
                }
                get names() {
                    const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
                    return addExprNames(names, this.rhs);
                }
            }
            class AssignOp extends Assign {
                constructor(lhs, op, rhs, sideEffects) {
                    super(lhs, rhs, sideEffects);
                    this.op = op;
                }
                render({ _n }) {
                    return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
                }
            }
            class Label extends Node {
                constructor(label) {
                    super();
                    this.label = label;
                    this.names = {};
                }
                render({ _n }) {
                    return `${this.label}:` + _n;
                }
            }
            class Break extends Node {
                constructor(label) {
                    super();
                    this.label = label;
                    this.names = {};
                }
                render({ _n }) {
                    const label = this.label ? ` ${this.label}` : "";
                    return `break${label};` + _n;
                }
            }
            class Throw extends Node {
                constructor(error) {
                    super();
                    this.error = error;
                }
                render({ _n }) {
                    return `throw ${this.error};` + _n;
                }
                get names() {
                    return this.error.names;
                }
            }
            class AnyCode extends Node {
                constructor(code) {
                    super();
                    this.code = code;
                }
                render({ _n }) {
                    return `${this.code};` + _n;
                }
                optimizeNodes() {
                    return `${this.code}` ? this : undefined;
                }
                optimizeNames(names, constants) {
                    this.code = optimizeExpr(this.code, names, constants);
                    return this;
                }
                get names() {
                    return this.code instanceof code_1._CodeOrName ? this.code.names : {};
                }
            }
            class ParentNode extends Node {
                constructor(nodes = []) {
                    super();
                    this.nodes = nodes;
                }
                render(opts) {
                    return this.nodes.reduce((code, n) => code + n.render(opts), "");
                }
                optimizeNodes() {
                    const { nodes } = this;
                    let i = nodes.length;
                    while (i--) {
                        const n = nodes[i].optimizeNodes();
                        if (Array.isArray(n))
                            nodes.splice(i, 1, ...n);
                        else if (n)
                            nodes[i] = n;
                        else
                            nodes.splice(i, 1);
                    }
                    return nodes.length > 0 ? this : undefined;
                }
                optimizeNames(names, constants) {
                    const { nodes } = this;
                    let i = nodes.length;
                    while (i--) {
                        // iterating backwards improves 1-pass optimization
                        const n = nodes[i];
                        if (n.optimizeNames(names, constants))
                            continue;
                        subtractNames(names, n.names);
                        nodes.splice(i, 1);
                    }
                    return nodes.length > 0 ? this : undefined;
                }
                get names() {
                    return this.nodes.reduce((names, n) => addNames(names, n.names), {});
                }
            }
            class BlockNode extends ParentNode {
                render(opts) {
                    return "{" + opts._n + super.render(opts) + "}" + opts._n;
                }
            }
            class Root extends ParentNode {
            }
            class Else extends BlockNode {
            }
            Else.kind = "else";
            class If extends BlockNode {
                constructor(condition, nodes) {
                    super(nodes);
                    this.condition = condition;
                }
                render(opts) {
                    let code = `if(${this.condition})` + super.render(opts);
                    if (this.else)
                        code += "else " + this.else.render(opts);
                    return code;
                }
                optimizeNodes() {
                    super.optimizeNodes();
                    const cond = this.condition;
                    if (cond === true)
                        return this.nodes; // else is ignored here
                    let e = this.else;
                    if (e) {
                        const ns = e.optimizeNodes();
                        e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
                    }
                    if (e) {
                        if (cond === false)
                            return e instanceof If ? e : e.nodes;
                        if (this.nodes.length)
                            return this;
                        return new If(not(cond), e instanceof If ? [e] : e.nodes);
                    }
                    if (cond === false || !this.nodes.length)
                        return undefined;
                    return this;
                }
                optimizeNames(names, constants) {
                    var _a;
                    this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
                    if (!(super.optimizeNames(names, constants) || this.else))
                        return;
                    this.condition = optimizeExpr(this.condition, names, constants);
                    return this;
                }
                get names() {
                    const names = super.names;
                    addExprNames(names, this.condition);
                    if (this.else)
                        addNames(names, this.else.names);
                    return names;
                }
            }
            If.kind = "if";
            class For extends BlockNode {
            }
            For.kind = "for";
            class ForLoop extends For {
                constructor(iteration) {
                    super();
                    this.iteration = iteration;
                }
                render(opts) {
                    return `for(${this.iteration})` + super.render(opts);
                }
                optimizeNames(names, constants) {
                    if (!super.optimizeNames(names, constants))
                        return;
                    this.iteration = optimizeExpr(this.iteration, names, constants);
                    return this;
                }
                get names() {
                    return addNames(super.names, this.iteration.names);
                }
            }
            class ForRange extends For {
                constructor(varKind, name, from, to) {
                    super();
                    this.varKind = varKind;
                    this.name = name;
                    this.from = from;
                    this.to = to;
                }
                render(opts) {
                    const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
                    const { name, from, to } = this;
                    return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
                }
                get names() {
                    const names = addExprNames(super.names, this.from);
                    return addExprNames(names, this.to);
                }
            }
            class ForIter extends For {
                constructor(loop, varKind, name, iterable) {
                    super();
                    this.loop = loop;
                    this.varKind = varKind;
                    this.name = name;
                    this.iterable = iterable;
                }
                render(opts) {
                    return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
                }
                optimizeNames(names, constants) {
                    if (!super.optimizeNames(names, constants))
                        return;
                    this.iterable = optimizeExpr(this.iterable, names, constants);
                    return this;
                }
                get names() {
                    return addNames(super.names, this.iterable.names);
                }
            }
            class Func extends BlockNode {
                constructor(name, args, async) {
                    super();
                    this.name = name;
                    this.args = args;
                    this.async = async;
                }
                render(opts) {
                    const _async = this.async ? "async " : "";
                    return `${_async}function ${this.name}(${this.args})` + super.render(opts);
                }
            }
            Func.kind = "func";
            class Return extends ParentNode {
                render(opts) {
                    return "return " + super.render(opts);
                }
            }
            Return.kind = "return";
            class Try extends BlockNode {
                render(opts) {
                    let code = "try" + super.render(opts);
                    if (this.catch)
                        code += this.catch.render(opts);
                    if (this.finally)
                        code += this.finally.render(opts);
                    return code;
                }
                optimizeNodes() {
                    var _a, _b;
                    super.optimizeNodes();
                    (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
                    (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
                    return this;
                }
                optimizeNames(names, constants) {
                    var _a, _b;
                    super.optimizeNames(names, constants);
                    (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
                    (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
                    return this;
                }
                get names() {
                    const names = super.names;
                    if (this.catch)
                        addNames(names, this.catch.names);
                    if (this.finally)
                        addNames(names, this.finally.names);
                    return names;
                }
            }
            class Catch extends BlockNode {
                constructor(error) {
                    super();
                    this.error = error;
                }
                render(opts) {
                    return `catch(${this.error})` + super.render(opts);
                }
            }
            Catch.kind = "catch";
            class Finally extends BlockNode {
                render(opts) {
                    return "finally" + super.render(opts);
                }
            }
            Finally.kind = "finally";
            class CodeGen {
                constructor(extScope, opts = {}) {
                    this._values = {};
                    this._blockStarts = [];
                    this._constants = {};
                    this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
                    this._extScope = extScope;
                    this._scope = new scope_1.Scope({ parent: extScope });
                    this._nodes = [new Root()];
                }
                toString() {
                    return this._root.render(this.opts);
                }
                // returns unique name in the internal scope
                name(prefix) {
                    return this._scope.name(prefix);
                }
                // reserves unique name in the external scope
                scopeName(prefix) {
                    return this._extScope.name(prefix);
                }
                // reserves unique name in the external scope and assigns value to it
                scopeValue(prefixOrName, value) {
                    const name = this._extScope.value(prefixOrName, value);
                    const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
                    vs.add(name);
                    return name;
                }
                getScopeValue(prefix, keyOrRef) {
                    return this._extScope.getValue(prefix, keyOrRef);
                }
                // return code that assigns values in the external scope to the names that are used internally
                // (same names that were returned by gen.scopeName or gen.scopeValue)
                scopeRefs(scopeName) {
                    return this._extScope.scopeRefs(scopeName, this._values);
                }
                scopeCode() {
                    return this._extScope.scopeCode(this._values);
                }
                _def(varKind, nameOrPrefix, rhs, constant) {
                    const name = this._scope.toName(nameOrPrefix);
                    if (rhs !== undefined && constant)
                        this._constants[name.str] = rhs;
                    this._leafNode(new Def(varKind, name, rhs));
                    return name;
                }
                // `const` declaration (`var` in es5 mode)
                const(nameOrPrefix, rhs, _constant) {
                    return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
                }
                // `let` declaration with optional assignment (`var` in es5 mode)
                let(nameOrPrefix, rhs, _constant) {
                    return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
                }
                // `var` declaration with optional assignment
                var(nameOrPrefix, rhs, _constant) {
                    return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
                }
                // assignment code
                assign(lhs, rhs, sideEffects) {
                    return this._leafNode(new Assign(lhs, rhs, sideEffects));
                }
                // `+=` code
                add(lhs, rhs) {
                    return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
                }
                // appends passed SafeExpr to code or executes Block
                code(c) {
                    if (typeof c == "function")
                        c();
                    else if (c !== code_1.nil)
                        this._leafNode(new AnyCode(c));
                    return this;
                }
                // returns code for object literal for the passed argument list of key-value pairs
                object(...keyValues) {
                    const code = ["{"];
                    for (const [key, value] of keyValues) {
                        if (code.length > 1)
                            code.push(",");
                        code.push(key);
                        if (key !== value || this.opts.es5) {
                            code.push(":");
                            (0, code_1.addCodeArg)(code, value);
                        }
                    }
                    code.push("}");
                    return new code_1._Code(code);
                }
                // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
                if(condition, thenBody, elseBody) {
                    this._blockNode(new If(condition));
                    if (thenBody && elseBody) {
                        this.code(thenBody).else().code(elseBody).endIf();
                    }
                    else if (thenBody) {
                        this.code(thenBody).endIf();
                    }
                    else if (elseBody) {
                        throw new Error('CodeGen: "else" body without "then" body');
                    }
                    return this;
                }
                // `else if` clause - invalid without `if` or after `else` clauses
                elseIf(condition) {
                    return this._elseNode(new If(condition));
                }
                // `else` clause - only valid after `if` or `else if` clauses
                else() {
                    return this._elseNode(new Else());
                }
                // end `if` statement (needed if gen.if was used only with condition)
                endIf() {
                    return this._endBlockNode(If, Else);
                }
                _for(node, forBody) {
                    this._blockNode(node);
                    if (forBody)
                        this.code(forBody).endFor();
                    return this;
                }
                // a generic `for` clause (or statement if `forBody` is passed)
                for(iteration, forBody) {
                    return this._for(new ForLoop(iteration), forBody);
                }
                // `for` statement for a range of values
                forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
                    const name = this._scope.toName(nameOrPrefix);
                    return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
                }
                // `for-of` statement (in es5 mode replace with a normal for loop)
                forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
                    const name = this._scope.toName(nameOrPrefix);
                    if (this.opts.es5) {
                        const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
                        return this.forRange("_i", 0, (0, code_1._) `${arr}.length`, (i) => {
                            this.var(name, (0, code_1._) `${arr}[${i}]`);
                            forBody(name);
                        });
                    }
                    return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
                }
                // `for-in` statement.
                // With option `ownProperties` replaced with a `for-of` loop for object keys
                forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
                    if (this.opts.ownProperties) {
                        return this.forOf(nameOrPrefix, (0, code_1._) `Object.keys(${obj})`, forBody);
                    }
                    const name = this._scope.toName(nameOrPrefix);
                    return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
                }
                // end `for` loop
                endFor() {
                    return this._endBlockNode(For);
                }
                // `label` statement
                label(label) {
                    return this._leafNode(new Label(label));
                }
                // `break` statement
                break(label) {
                    return this._leafNode(new Break(label));
                }
                // `return` statement
                return(value) {
                    const node = new Return();
                    this._blockNode(node);
                    this.code(value);
                    if (node.nodes.length !== 1)
                        throw new Error('CodeGen: "return" should have one node');
                    return this._endBlockNode(Return);
                }
                // `try` statement
                try(tryBody, catchCode, finallyCode) {
                    if (!catchCode && !finallyCode)
                        throw new Error('CodeGen: "try" without "catch" and "finally"');
                    const node = new Try();
                    this._blockNode(node);
                    this.code(tryBody);
                    if (catchCode) {
                        const error = this.name("e");
                        this._currNode = node.catch = new Catch(error);
                        catchCode(error);
                    }
                    if (finallyCode) {
                        this._currNode = node.finally = new Finally();
                        this.code(finallyCode);
                    }
                    return this._endBlockNode(Catch, Finally);
                }
                // `throw` statement
                throw(error) {
                    return this._leafNode(new Throw(error));
                }
                // start self-balancing block
                block(body, nodeCount) {
                    this._blockStarts.push(this._nodes.length);
                    if (body)
                        this.code(body).endBlock(nodeCount);
                    return this;
                }
                // end the current self-balancing block
                endBlock(nodeCount) {
                    const len = this._blockStarts.pop();
                    if (len === undefined)
                        throw new Error("CodeGen: not in self-balancing block");
                    const toClose = this._nodes.length - len;
                    if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
                        throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
                    }
                    this._nodes.length = len;
                    return this;
                }
                // `function` heading (or definition if funcBody is passed)
                func(name, args = code_1.nil, async, funcBody) {
                    this._blockNode(new Func(name, args, async));
                    if (funcBody)
                        this.code(funcBody).endFunc();
                    return this;
                }
                // end function definition
                endFunc() {
                    return this._endBlockNode(Func);
                }
                optimize(n = 1) {
                    while (n-- > 0) {
                        this._root.optimizeNodes();
                        this._root.optimizeNames(this._root.names, this._constants);
                    }
                }
                _leafNode(node) {
                    this._currNode.nodes.push(node);
                    return this;
                }
                _blockNode(node) {
                    this._currNode.nodes.push(node);
                    this._nodes.push(node);
                }
                _endBlockNode(N1, N2) {
                    const n = this._currNode;
                    if (n instanceof N1 || (N2 && n instanceof N2)) {
                        this._nodes.pop();
                        return this;
                    }
                    throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
                }
                _elseNode(node) {
                    const n = this._currNode;
                    if (!(n instanceof If)) {
                        throw new Error('CodeGen: "else" without "if"');
                    }
                    this._currNode = n.else = node;
                    return this;
                }
                get _root() {
                    return this._nodes[0];
                }
                get _currNode() {
                    const ns = this._nodes;
                    return ns[ns.length - 1];
                }
                set _currNode(node) {
                    const ns = this._nodes;
                    ns[ns.length - 1] = node;
                }
            }
            exports.CodeGen = CodeGen;
            function addNames(names, from) {
                for (const n in from)
                    names[n] = (names[n] || 0) + (from[n] || 0);
                return names;
            }
            function addExprNames(names, from) {
                return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
            }
            function optimizeExpr(expr, names, constants) {
                if (expr instanceof code_1.Name)
                    return replaceName(expr);
                if (!canOptimize(expr))
                    return expr;
                return new code_1._Code(expr._items.reduce((items, c) => {
                    if (c instanceof code_1.Name)
                        c = replaceName(c);
                    if (c instanceof code_1._Code)
                        items.push(...c._items);
                    else
                        items.push(c);
                    return items;
                }, []));
                function replaceName(n) {
                    const c = constants[n.str];
                    if (c === undefined || names[n.str] !== 1)
                        return n;
                    delete names[n.str];
                    return c;
                }
                function canOptimize(e) {
                    return (e instanceof code_1._Code &&
                      e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
                }
            }
            function subtractNames(names, from) {
                for (const n in from)
                    names[n] = (names[n] || 0) - (from[n] || 0);
            }
            function not(x) {
                return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._) `!${par(x)}`;
            }
            exports.not = not;
            const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
            function and(...args) {
                return args.reduce(andCode);
            }
            exports.and = and;
            const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
            function or(...args) {
                return args.reduce(orCode);
            }
            exports.or = or;
            function mappend(op) {
                return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._) `${par(x)} ${op} ${par(y)}`);
            }
            function par(x) {
                return x instanceof code_1.Name ? x : (0, code_1._) `(${x})`;
            }
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/codegen/scope.js":
        /*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/scope.js ***!
  \********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
            const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
            class ValueError extends Error {
                constructor(name) {
                    super(`CodeGen: "code" for ${name} not defined`);
                    this.value = name.value;
                }
            }
            var UsedValueState;
            (function (UsedValueState) {
                UsedValueState[UsedValueState["Started"] = 0] = "Started";
                UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
            })(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
            exports.varKinds = {
                const: new code_1.Name("const"),
                let: new code_1.Name("let"),
                var: new code_1.Name("var"),
            };
            class Scope {
                constructor({ prefixes, parent } = {}) {
                    this._names = {};
                    this._prefixes = prefixes;
                    this._parent = parent;
                }
                toName(nameOrPrefix) {
                    return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
                }
                name(prefix) {
                    return new code_1.Name(this._newName(prefix));
                }
                _newName(prefix) {
                    const ng = this._names[prefix] || this._nameGroup(prefix);
                    return `${prefix}${ng.index++}`;
                }
                _nameGroup(prefix) {
                    var _a, _b;
                    if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
                        throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
                    }
                    return (this._names[prefix] = { prefix, index: 0 });
                }
            }
            exports.Scope = Scope;
            class ValueScopeName extends code_1.Name {
                constructor(prefix, nameStr) {
                    super(nameStr);
                    this.prefix = prefix;
                }
                setValue(value, { property, itemIndex }) {
                    this.value = value;
                    this.scopePath = (0, code_1._) `.${new code_1.Name(property)}[${itemIndex}]`;
                }
            }
            exports.ValueScopeName = ValueScopeName;
            const line = (0, code_1._) `\n`;
            class ValueScope extends Scope {
                constructor(opts) {
                    super(opts);
                    this._values = {};
                    this._scope = opts.scope;
                    this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
                }
                get() {
                    return this._scope;
                }
                name(prefix) {
                    return new ValueScopeName(prefix, this._newName(prefix));
                }
                value(nameOrPrefix, value) {
                    var _a;
                    if (value.ref === undefined)
                        throw new Error("CodeGen: ref must be passed in value");
                    const name = this.toName(nameOrPrefix);
                    const { prefix } = name;
                    const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
                    let vs = this._values[prefix];
                    if (vs) {
                        const _name = vs.get(valueKey);
                        if (_name)
                            return _name;
                    }
                    else {
                        vs = this._values[prefix] = new Map();
                    }
                    vs.set(valueKey, name);
                    const s = this._scope[prefix] || (this._scope[prefix] = []);
                    const itemIndex = s.length;
                    s[itemIndex] = value.ref;
                    name.setValue(value, { property: prefix, itemIndex });
                    return name;
                }
                getValue(prefix, keyOrRef) {
                    const vs = this._values[prefix];
                    if (!vs)
                        return;
                    return vs.get(keyOrRef);
                }
                scopeRefs(scopeName, values = this._values) {
                    return this._reduceValues(values, (name) => {
                        if (name.scopePath === undefined)
                            throw new Error(`CodeGen: name "${name}" has no value`);
                        return (0, code_1._) `${scopeName}${name.scopePath}`;
                    });
                }
                scopeCode(values = this._values, usedValues, getCode) {
                    return this._reduceValues(values, (name) => {
                        if (name.value === undefined)
                            throw new Error(`CodeGen: name "${name}" has no value`);
                        return name.value.code;
                    }, usedValues, getCode);
                }
                _reduceValues(values, valueCode, usedValues = {}, getCode) {
                    let code = code_1.nil;
                    for (const prefix in values) {
                        const vs = values[prefix];
                        if (!vs)
                            continue;
                        const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
                        vs.forEach((name) => {
                            if (nameSet.has(name))
                                return;
                            nameSet.set(name, UsedValueState.Started);
                            let c = valueCode(name);
                            if (c) {
                                const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                                code = (0, code_1._) `${code}${def} ${name} = ${c};${this.opts._n}`;
                            }
                            else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                                code = (0, code_1._) `${code}${c}${this.opts._n}`;
                            }
                            else {
                                throw new ValueError(name);
                            }
                            nameSet.set(name, UsedValueState.Completed);
                        });
                    }
                    return code;
                }
            }
            exports.ValueScope = ValueScope;
//# sourceMappingURL=scope.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/errors.js":
        /*!*************************************************!*\
  !*** ./node_modules/ajv/dist/compile/errors.js ***!
  \*************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
            const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
            const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
            exports.keywordError = {
                message: ({ keyword }) => (0, codegen_1.str) `must pass "${keyword}" keyword validation`,
            };
            exports.keyword$DataError = {
                message: ({ keyword, schemaType }) => schemaType
                  ? (0, codegen_1.str) `"${keyword}" keyword must be ${schemaType} ($data)`
                  : (0, codegen_1.str) `"${keyword}" keyword is invalid ($data)`,
            };
            function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
                const { it } = cxt;
                const { gen, compositeRule, allErrors } = it;
                const errObj = errorObjectCode(cxt, error, errorPaths);
                if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
                    addError(gen, errObj);
                }
                else {
                    returnErrors(it, (0, codegen_1._) `[${errObj}]`);
                }
            }
            exports.reportError = reportError;
            function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
                const { it } = cxt;
                const { gen, compositeRule, allErrors } = it;
                const errObj = errorObjectCode(cxt, error, errorPaths);
                addError(gen, errObj);
                if (!(compositeRule || allErrors)) {
                    returnErrors(it, names_1.default.vErrors);
                }
            }
            exports.reportExtraError = reportExtraError;
            function resetErrorsCount(gen, errsCount) {
                gen.assign(names_1.default.errors, errsCount);
                gen.if((0, codegen_1._) `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._) `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
            }
            exports.resetErrorsCount = resetErrorsCount;
            function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
                /* istanbul ignore if */
                if (errsCount === undefined)
                    throw new Error("ajv implementation error");
                const err = gen.name("err");
                gen.forRange("i", errsCount, names_1.default.errors, (i) => {
                    gen.const(err, (0, codegen_1._) `${names_1.default.vErrors}[${i}]`);
                    gen.if((0, codegen_1._) `${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._) `${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
                    gen.assign((0, codegen_1._) `${err}.schemaPath`, (0, codegen_1.str) `${it.errSchemaPath}/${keyword}`);
                    if (it.opts.verbose) {
                        gen.assign((0, codegen_1._) `${err}.schema`, schemaValue);
                        gen.assign((0, codegen_1._) `${err}.data`, data);
                    }
                });
            }
            exports.extendErrors = extendErrors;
            function addError(gen, errObj) {
                const err = gen.const("err", errObj);
                gen.if((0, codegen_1._) `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._) `[${err}]`), (0, codegen_1._) `${names_1.default.vErrors}.push(${err})`);
                gen.code((0, codegen_1._) `${names_1.default.errors}++`);
            }
            function returnErrors(it, errs) {
                const { gen, validateName, schemaEnv } = it;
                if (schemaEnv.$async) {
                    gen.throw((0, codegen_1._) `new ${it.ValidationError}(${errs})`);
                }
                else {
                    gen.assign((0, codegen_1._) `${validateName}.errors`, errs);
                    gen.return(false);
                }
            }
            const E = {
                keyword: new codegen_1.Name("keyword"),
                schemaPath: new codegen_1.Name("schemaPath"),
                params: new codegen_1.Name("params"),
                propertyName: new codegen_1.Name("propertyName"),
                message: new codegen_1.Name("message"),
                schema: new codegen_1.Name("schema"),
                parentSchema: new codegen_1.Name("parentSchema"),
            };
            function errorObjectCode(cxt, error, errorPaths) {
                const { createErrors } = cxt.it;
                if (createErrors === false)
                    return (0, codegen_1._) `{}`;
                return errorObject(cxt, error, errorPaths);
            }
            function errorObject(cxt, error, errorPaths = {}) {
                const { gen, it } = cxt;
                const keyValues = [
                    errorInstancePath(it, errorPaths),
                    errorSchemaPath(cxt, errorPaths),
                ];
                extraErrorProps(cxt, error, keyValues);
                return gen.object(...keyValues);
            }
            function errorInstancePath({ errorPath }, { instancePath }) {
                const instPath = instancePath
                  ? (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}`
                  : errorPath;
                return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
            }
            function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
                let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str) `${errSchemaPath}/${keyword}`;
                if (schemaPath) {
                    schPath = (0, codegen_1.str) `${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
                }
                return [E.schemaPath, schPath];
            }
            function extraErrorProps(cxt, { params, message }, keyValues) {
                const { keyword, data, schemaValue, it } = cxt;
                const { opts, propertyName, topSchemaRef, schemaPath } = it;
                keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._) `{}`]);
                if (opts.messages) {
                    keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
                }
                if (opts.verbose) {
                    keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._) `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
                }
                if (propertyName)
                    keyValues.push([E.propertyName, propertyName]);
            }
//# sourceMappingURL=errors.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/index.js":
        /*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/index.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
            const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const validation_error_1 = __webpack_require__(/*! ../runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
            const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
            const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
            const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
            const validate_1 = __webpack_require__(/*! ./validate */ "./node_modules/ajv/dist/compile/validate/index.js");
            class SchemaEnv {
                constructor(env) {
                    var _a;
                    this.refs = {};
                    this.dynamicAnchors = {};
                    let schema;
                    if (typeof env.schema == "object")
                        schema = env.schema;
                    this.schema = env.schema;
                    this.schemaId = env.schemaId;
                    this.root = env.root || this;
                    this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
                    this.schemaPath = env.schemaPath;
                    this.localRefs = env.localRefs;
                    this.meta = env.meta;
                    this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
                    this.refs = {};
                }
            }
            exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
            function compileSchema(sch) {
                // TODO refactor - remove compilations
                const _sch = getCompilingSchema.call(this, sch);
                if (_sch)
                    return _sch;
                const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId); // TODO if getFullPath removed 1 tests fails
                const { es5, lines } = this.opts.code;
                const { ownProperties } = this.opts;
                const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
                let _ValidationError;
                if (sch.$async) {
                    _ValidationError = gen.scopeValue("Error", {
                        ref: validation_error_1.default,
                        code: (0, codegen_1._) `require("ajv/dist/runtime/validation_error").default`,
                    });
                }
                const validateName = gen.scopeName("validate");
                sch.validateName = validateName;
                const schemaCxt = {
                    gen,
                    allErrors: this.opts.allErrors,
                    data: names_1.default.data,
                    parentData: names_1.default.parentData,
                    parentDataProperty: names_1.default.parentDataProperty,
                    dataNames: [names_1.default.data],
                    dataPathArr: [codegen_1.nil],
                    dataLevel: 0,
                    dataTypes: [],
                    definedProperties: new Set(),
                    topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
                      ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) }
                      : { ref: sch.schema }),
                    validateName,
                    ValidationError: _ValidationError,
                    schema: sch.schema,
                    schemaEnv: sch,
                    rootId,
                    baseId: sch.baseId || rootId,
                    schemaPath: codegen_1.nil,
                    errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
                    errorPath: (0, codegen_1._) `""`,
                    opts: this.opts,
                    self: this,
                };
                let sourceCode;
                try {
                    this._compilations.add(sch);
                    (0, validate_1.validateFunctionCode)(schemaCxt);
                    gen.optimize(this.opts.code.optimize);
                    // gen.optimize(1)
                    const validateCode = gen.toString();
                    sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
                    // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
                    if (this.opts.code.process)
                        sourceCode = this.opts.code.process(sourceCode, sch);
                    // console.log("\n\n\n *** \n", sourceCode)
                    const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
                    const validate = makeValidate(this, this.scope.get());
                    this.scope.value(validateName, { ref: validate });
                    validate.errors = null;
                    validate.schema = sch.schema;
                    validate.schemaEnv = sch;
                    if (sch.$async)
                        validate.$async = true;
                    if (this.opts.code.source === true) {
                        validate.source = { validateName, validateCode, scopeValues: gen._values };
                    }
                    if (this.opts.unevaluated) {
                        const { props, items } = schemaCxt;
                        validate.evaluated = {
                            props: props instanceof codegen_1.Name ? undefined : props,
                            items: items instanceof codegen_1.Name ? undefined : items,
                            dynamicProps: props instanceof codegen_1.Name,
                            dynamicItems: items instanceof codegen_1.Name,
                        };
                        if (validate.source)
                            validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
                    }
                    sch.validate = validate;
                    return sch;
                }
                catch (e) {
                    delete sch.validate;
                    delete sch.validateName;
                    if (sourceCode)
                        this.logger.error("Error compiling schema, function code:", sourceCode);
                    // console.log("\n\n\n *** \n", sourceCode, this.opts)
                    throw e;
                }
                finally {
                    this._compilations.delete(sch);
                }
            }
            exports.compileSchema = compileSchema;
            function resolveRef(root, baseId, ref) {
                var _a;
                ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
                const schOrFunc = root.refs[ref];
                if (schOrFunc)
                    return schOrFunc;
                let _sch = resolve.call(this, root, ref);
                if (_sch === undefined) {
                    const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
                    const { schemaId } = this.opts;
                    if (schema)
                        _sch = new SchemaEnv({ schema, schemaId, root, baseId });
                }
                if (_sch === undefined)
                    return;
                return (root.refs[ref] = inlineOrCompile.call(this, _sch));
            }
            exports.resolveRef = resolveRef;
            function inlineOrCompile(sch) {
                if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
                    return sch.schema;
                return sch.validate ? sch : compileSchema.call(this, sch);
            }
// Index of schema compilation in the currently compiled list
            function getCompilingSchema(schEnv) {
                for (const sch of this._compilations) {
                    if (sameSchemaEnv(sch, schEnv))
                        return sch;
                }
            }
            exports.getCompilingSchema = getCompilingSchema;
            function sameSchemaEnv(s1, s2) {
                return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
            }
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
            function resolve(root, // information about the root schema for the current schema
                             ref // reference to resolve
            ) {
                let sch;
                while (typeof (sch = this.refs[ref]) == "string")
                    ref = sch;
                return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
            }
// Resolve schema, its root and baseId
            function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
                                   ref // reference to resolve
            ) {
                const p = this.opts.uriResolver.parse(ref);
                const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
                let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, undefined);
                // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
                if (Object.keys(root.schema).length > 0 && refPath === baseId) {
                    return getJsonPointer.call(this, p, root);
                }
                const id = (0, resolve_1.normalizeId)(refPath);
                const schOrRef = this.refs[id] || this.schemas[id];
                if (typeof schOrRef == "string") {
                    const sch = resolveSchema.call(this, root, schOrRef);
                    if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
                        return;
                    return getJsonPointer.call(this, p, sch);
                }
                if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
                    return;
                if (!schOrRef.validate)
                    compileSchema.call(this, schOrRef);
                if (id === (0, resolve_1.normalizeId)(ref)) {
                    const { schema } = schOrRef;
                    const { schemaId } = this.opts;
                    const schId = schema[schemaId];
                    if (schId)
                        baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
                    return new SchemaEnv({ schema, schemaId, root, baseId });
                }
                return getJsonPointer.call(this, p, schOrRef);
            }
            exports.resolveSchema = resolveSchema;
            const PREVENT_SCOPE_CHANGE = new Set([
                "properties",
                "patternProperties",
                "enum",
                "dependencies",
                "definitions",
            ]);
            function getJsonPointer(parsedRef, { baseId, schema, root }) {
                var _a;
                if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
                    return;
                for (const part of parsedRef.fragment.slice(1).split("/")) {
                    if (typeof schema === "boolean")
                        return;
                    const partSchema = schema[(0, util_1.unescapeFragment)(part)];
                    if (partSchema === undefined)
                        return;
                    schema = partSchema;
                    // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
                    const schId = typeof schema === "object" && schema[this.opts.schemaId];
                    if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
                        baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
                    }
                }
                let env;
                if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
                    const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
                    env = resolveSchema.call(this, root, $ref);
                }
                // even though resolution failed we need to return SchemaEnv to throw exception
                // so that compileAsync loads missing schema.
                const { schemaId } = this.opts;
                env = env || new SchemaEnv({ schema, schemaId, root, baseId });
                if (env.schema !== env.root.schema)
                    return env;
                return undefined;
            }
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/names.js":
        /*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/names.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const names = {
                // validation function arguments
                data: new codegen_1.Name("data"),
                // args passed from referencing schema
                valCxt: new codegen_1.Name("valCxt"),
                instancePath: new codegen_1.Name("instancePath"),
                parentData: new codegen_1.Name("parentData"),
                parentDataProperty: new codegen_1.Name("parentDataProperty"),
                rootData: new codegen_1.Name("rootData"),
                dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
                // function scoped variables
                vErrors: new codegen_1.Name("vErrors"),
                errors: new codegen_1.Name("errors"),
                this: new codegen_1.Name("this"),
                // "globals"
                self: new codegen_1.Name("self"),
                scope: new codegen_1.Name("scope"),
                // JTD serialize/parse name for JSON string and position
                json: new codegen_1.Name("json"),
                jsonPos: new codegen_1.Name("jsonPos"),
                jsonLen: new codegen_1.Name("jsonLen"),
                jsonPart: new codegen_1.Name("jsonPart"),
            };
            exports.default = names;
//# sourceMappingURL=names.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/ref_error.js":
        /*!****************************************************!*\
  !*** ./node_modules/ajv/dist/compile/ref_error.js ***!
  \****************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
            class MissingRefError extends Error {
                constructor(resolver, baseId, ref, msg) {
                    super(msg || `can't resolve reference ${ref} from id ${baseId}`);
                    this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
                    this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
                }
            }
            exports.default = MissingRefError;
//# sourceMappingURL=ref_error.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/resolve.js":
        /*!**************************************************!*\
  !*** ./node_modules/ajv/dist/compile/resolve.js ***!
  \**************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
            const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
            const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
            const traverse = __webpack_require__(/*! json-schema-traverse */ "./node_modules/json-schema-traverse/index.js");
// TODO refactor to use keyword definitions
            const SIMPLE_INLINED = new Set([
                "type",
                "format",
                "pattern",
                "maxLength",
                "minLength",
                "maxProperties",
                "minProperties",
                "maxItems",
                "minItems",
                "maximum",
                "minimum",
                "uniqueItems",
                "multipleOf",
                "required",
                "enum",
                "const",
            ]);
            function inlineRef(schema, limit = true) {
                if (typeof schema == "boolean")
                    return true;
                if (limit === true)
                    return !hasRef(schema);
                if (!limit)
                    return false;
                return countKeys(schema) <= limit;
            }
            exports.inlineRef = inlineRef;
            const REF_KEYWORDS = new Set([
                "$ref",
                "$recursiveRef",
                "$recursiveAnchor",
                "$dynamicRef",
                "$dynamicAnchor",
            ]);
            function hasRef(schema) {
                for (const key in schema) {
                    if (REF_KEYWORDS.has(key))
                        return true;
                    const sch = schema[key];
                    if (Array.isArray(sch) && sch.some(hasRef))
                        return true;
                    if (typeof sch == "object" && hasRef(sch))
                        return true;
                }
                return false;
            }
            function countKeys(schema) {
                let count = 0;
                for (const key in schema) {
                    if (key === "$ref")
                        return Infinity;
                    count++;
                    if (SIMPLE_INLINED.has(key))
                        continue;
                    if (typeof schema[key] == "object") {
                        (0, util_1.eachItem)(schema[key], (sch) => (count += countKeys(sch)));
                    }
                    if (count === Infinity)
                        return Infinity;
                }
                return count;
            }
            function getFullPath(resolver, id = "", normalize) {
                if (normalize !== false)
                    id = normalizeId(id);
                const p = resolver.parse(id);
                return _getFullPath(resolver, p);
            }
            exports.getFullPath = getFullPath;
            function _getFullPath(resolver, p) {
                const serialized = resolver.serialize(p);
                return serialized.split("#")[0] + "#";
            }
            exports._getFullPath = _getFullPath;
            const TRAILING_SLASH_HASH = /#\/?$/;
            function normalizeId(id) {
                return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
            }
            exports.normalizeId = normalizeId;
            function resolveUrl(resolver, baseId, id) {
                id = normalizeId(id);
                return resolver.resolve(baseId, id);
            }
            exports.resolveUrl = resolveUrl;
            const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
            function getSchemaRefs(schema, baseId) {
                if (typeof schema == "boolean")
                    return {};
                const { schemaId, uriResolver } = this.opts;
                const schId = normalizeId(schema[schemaId] || baseId);
                const baseIds = { "": schId };
                const pathPrefix = getFullPath(uriResolver, schId, false);
                const localRefs = {};
                const schemaRefs = new Set();
                traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
                    if (parentJsonPtr === undefined)
                        return;
                    const fullPath = pathPrefix + jsonPtr;
                    let baseId = baseIds[parentJsonPtr];
                    if (typeof sch[schemaId] == "string")
                        baseId = addRef.call(this, sch[schemaId]);
                    addAnchor.call(this, sch.$anchor);
                    addAnchor.call(this, sch.$dynamicAnchor);
                    baseIds[jsonPtr] = baseId;
                    function addRef(ref) {
                        // eslint-disable-next-line @typescript-eslint/unbound-method
                        const _resolve = this.opts.uriResolver.resolve;
                        ref = normalizeId(baseId ? _resolve(baseId, ref) : ref);
                        if (schemaRefs.has(ref))
                            throw ambiguos(ref);
                        schemaRefs.add(ref);
                        let schOrRef = this.refs[ref];
                        if (typeof schOrRef == "string")
                            schOrRef = this.refs[schOrRef];
                        if (typeof schOrRef == "object") {
                            checkAmbiguosRef(sch, schOrRef.schema, ref);
                        }
                        else if (ref !== normalizeId(fullPath)) {
                            if (ref[0] === "#") {
                                checkAmbiguosRef(sch, localRefs[ref], ref);
                                localRefs[ref] = sch;
                            }
                            else {
                                this.refs[ref] = fullPath;
                            }
                        }
                        return ref;
                    }
                    function addAnchor(anchor) {
                        if (typeof anchor == "string") {
                            if (!ANCHOR.test(anchor))
                                throw new Error(`invalid anchor "${anchor}"`);
                            addRef.call(this, `#${anchor}`);
                        }
                    }
                });
                return localRefs;
                function checkAmbiguosRef(sch1, sch2, ref) {
                    if (sch2 !== undefined && !equal(sch1, sch2))
                        throw ambiguos(ref);
                }
                function ambiguos(ref) {
                    return new Error(`reference "${ref}" resolves to more than one schema`);
                }
            }
            exports.getSchemaRefs = getSchemaRefs;
//# sourceMappingURL=resolve.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/rules.js":
        /*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/rules.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.getRules = exports.isJSONType = void 0;
            const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
            const jsonTypes = new Set(_jsonTypes);
            function isJSONType(x) {
                return typeof x == "string" && jsonTypes.has(x);
            }
            exports.isJSONType = isJSONType;
            function getRules() {
                const groups = {
                    number: { type: "number", rules: [] },
                    string: { type: "string", rules: [] },
                    array: { type: "array", rules: [] },
                    object: { type: "object", rules: [] },
                };
                return {
                    types: { ...groups, integer: true, boolean: true, null: true },
                    rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
                    post: { rules: [] },
                    all: {},
                    keywords: {},
                };
            }
            exports.getRules = getRules;
//# sourceMappingURL=rules.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/util.js":
        /*!***********************************************!*\
  !*** ./node_modules/ajv/dist/compile/util.js ***!
  \***********************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
            const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const code_1 = __webpack_require__(/*! ./codegen/code */ "./node_modules/ajv/dist/compile/codegen/code.js");
// TODO refactor to use Set
            function toHash(arr) {
                const hash = {};
                for (const item of arr)
                    hash[item] = true;
                return hash;
            }
            exports.toHash = toHash;
            function alwaysValidSchema(it, schema) {
                if (typeof schema == "boolean")
                    return schema;
                if (Object.keys(schema).length === 0)
                    return true;
                checkUnknownRules(it, schema);
                return !schemaHasRules(schema, it.self.RULES.all);
            }
            exports.alwaysValidSchema = alwaysValidSchema;
            function checkUnknownRules(it, schema = it.schema) {
                const { opts, self } = it;
                if (!opts.strictSchema)
                    return;
                if (typeof schema === "boolean")
                    return;
                const rules = self.RULES.keywords;
                for (const key in schema) {
                    if (!rules[key])
                        checkStrictMode(it, `unknown keyword: "${key}"`);
                }
            }
            exports.checkUnknownRules = checkUnknownRules;
            function schemaHasRules(schema, rules) {
                if (typeof schema == "boolean")
                    return !schema;
                for (const key in schema)
                    if (rules[key])
                        return true;
                return false;
            }
            exports.schemaHasRules = schemaHasRules;
            function schemaHasRulesButRef(schema, RULES) {
                if (typeof schema == "boolean")
                    return !schema;
                for (const key in schema)
                    if (key !== "$ref" && RULES.all[key])
                        return true;
                return false;
            }
            exports.schemaHasRulesButRef = schemaHasRulesButRef;
            function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
                if (!$data) {
                    if (typeof schema == "number" || typeof schema == "boolean")
                        return schema;
                    if (typeof schema == "string")
                        return (0, codegen_1._) `${schema}`;
                }
                return (0, codegen_1._) `${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
            }
            exports.schemaRefOrVal = schemaRefOrVal;
            function unescapeFragment(str) {
                return unescapeJsonPointer(decodeURIComponent(str));
            }
            exports.unescapeFragment = unescapeFragment;
            function escapeFragment(str) {
                return encodeURIComponent(escapeJsonPointer(str));
            }
            exports.escapeFragment = escapeFragment;
            function escapeJsonPointer(str) {
                if (typeof str == "number")
                    return `${str}`;
                return str.replace(/~/g, "~0").replace(/\//g, "~1");
            }
            exports.escapeJsonPointer = escapeJsonPointer;
            function unescapeJsonPointer(str) {
                return str.replace(/~1/g, "/").replace(/~0/g, "~");
            }
            exports.unescapeJsonPointer = unescapeJsonPointer;
            function eachItem(xs, f) {
                if (Array.isArray(xs)) {
                    for (const x of xs)
                        f(x);
                }
                else {
                    f(xs);
                }
            }
            exports.eachItem = eachItem;
            function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
                return (gen, from, to, toName) => {
                    const res = to === undefined
                      ? from
                      : to instanceof codegen_1.Name
                        ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                        : from instanceof codegen_1.Name
                          ? (mergeToName(gen, to, from), from)
                          : mergeValues(from, to);
                    return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
                };
            }
            exports.mergeEvaluated = {
                props: makeMergeEvaluated({
                    mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => {
                        gen.if((0, codegen_1._) `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._) `${to} || {}`).code((0, codegen_1._) `Object.assign(${to}, ${from})`));
                    }),
                    mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => {
                        if (from === true) {
                            gen.assign(to, true);
                        }
                        else {
                            gen.assign(to, (0, codegen_1._) `${to} || {}`);
                            setEvaluated(gen, to, from);
                        }
                    }),
                    mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
                    resultToName: evaluatedPropsToName,
                }),
                items: makeMergeEvaluated({
                    mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._) `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
                    mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._) `${to} > ${from} ? ${to} : ${from}`)),
                    mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
                    resultToName: (gen, items) => gen.var("items", items),
                }),
            };
            function evaluatedPropsToName(gen, ps) {
                if (ps === true)
                    return gen.var("props", true);
                const props = gen.var("props", (0, codegen_1._) `{}`);
                if (ps !== undefined)
                    setEvaluated(gen, props, ps);
                return props;
            }
            exports.evaluatedPropsToName = evaluatedPropsToName;
            function setEvaluated(gen, props, ps) {
                Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._) `${props}${(0, codegen_1.getProperty)(p)}`, true));
            }
            exports.setEvaluated = setEvaluated;
            const snippets = {};
            function useFunc(gen, f) {
                return gen.scopeValue("func", {
                    ref: f,
                    code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
                });
            }
            exports.useFunc = useFunc;
            var Type;
            (function (Type) {
                Type[Type["Num"] = 0] = "Num";
                Type[Type["Str"] = 1] = "Str";
            })(Type = exports.Type || (exports.Type = {}));
            function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
                // let path
                if (dataProp instanceof codegen_1.Name) {
                    const isNumber = dataPropType === Type.Num;
                    return jsPropertySyntax
                      ? isNumber
                        ? (0, codegen_1._) `"[" + ${dataProp} + "]"`
                        : (0, codegen_1._) `"['" + ${dataProp} + "']"`
                      : isNumber
                        ? (0, codegen_1._) `"/" + ${dataProp}`
                        : (0, codegen_1._) `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
                }
                return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
            }
            exports.getErrorPath = getErrorPath;
            function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
                if (!mode)
                    return;
                msg = `strict mode: ${msg}`;
                if (mode === true)
                    throw new Error(msg);
                it.self.logger.warn(msg);
            }
            exports.checkStrictMode = checkStrictMode;
//# sourceMappingURL=util.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/validate/applicability.js":
        /*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/applicability.js ***!
  \*****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
            function schemaHasRulesForType({ schema, self }, type) {
                const group = self.RULES.types[type];
                return group && group !== true && shouldUseGroup(schema, group);
            }
            exports.schemaHasRulesForType = schemaHasRulesForType;
            function shouldUseGroup(schema, group) {
                return group.rules.some((rule) => shouldUseRule(schema, rule));
            }
            exports.shouldUseGroup = shouldUseGroup;
            function shouldUseRule(schema, rule) {
                var _a;
                return (schema[rule.keyword] !== undefined ||
                  ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
            }
            exports.shouldUseRule = shouldUseRule;
//# sourceMappingURL=applicability.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/validate/boolSchema.js":
        /*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/boolSchema.js ***!
  \**************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
            const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
            const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
            const boolError = {
                message: "boolean schema is false",
            };
            function topBoolOrEmptySchema(it) {
                const { gen, schema, validateName } = it;
                if (schema === false) {
                    falseSchemaError(it, false);
                }
                else if (typeof schema == "object" && schema.$async === true) {
                    gen.return(names_1.default.data);
                }
                else {
                    gen.assign((0, codegen_1._) `${validateName}.errors`, null);
                    gen.return(true);
                }
            }
            exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
            function boolOrEmptySchema(it, valid) {
                const { gen, schema } = it;
                if (schema === false) {
                    gen.var(valid, false); // TODO var
                    falseSchemaError(it);
                }
                else {
                    gen.var(valid, true); // TODO var
                }
            }
            exports.boolOrEmptySchema = boolOrEmptySchema;
            function falseSchemaError(it, overrideAllErrors) {
                const { gen, data } = it;
                // TODO maybe some other interface should be used for non-keyword validation errors...
                const cxt = {
                    gen,
                    keyword: "false schema",
                    data,
                    schema: false,
                    schemaCode: false,
                    schemaValue: false,
                    params: {},
                    it,
                };
                (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
            }
//# sourceMappingURL=boolSchema.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/validate/dataType.js":
        /*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/dataType.js ***!
  \************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
            const rules_1 = __webpack_require__(/*! ../rules */ "./node_modules/ajv/dist/compile/rules.js");
            const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
            const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
            const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
            var DataType;
            (function (DataType) {
                DataType[DataType["Correct"] = 0] = "Correct";
                DataType[DataType["Wrong"] = 1] = "Wrong";
            })(DataType = exports.DataType || (exports.DataType = {}));
            function getSchemaTypes(schema) {
                const types = getJSONTypes(schema.type);
                const hasNull = types.includes("null");
                if (hasNull) {
                    if (schema.nullable === false)
                        throw new Error("type: null contradicts nullable: false");
                }
                else {
                    if (!types.length && schema.nullable !== undefined) {
                        throw new Error('"nullable" cannot be used without "type"');
                    }
                    if (schema.nullable === true)
                        types.push("null");
                }
                return types;
            }
            exports.getSchemaTypes = getSchemaTypes;
            function getJSONTypes(ts) {
                const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
                if (types.every(rules_1.isJSONType))
                    return types;
                throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
            }
            exports.getJSONTypes = getJSONTypes;
            function coerceAndCheckDataType(it, types) {
                const { gen, data, opts } = it;
                const coerceTo = coerceToTypes(types, opts.coerceTypes);
                const checkTypes = types.length > 0 &&
                  !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
                if (checkTypes) {
                    const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
                    gen.if(wrongType, () => {
                        if (coerceTo.length)
                            coerceData(it, types, coerceTo);
                        else
                            reportTypeError(it);
                    });
                }
                return checkTypes;
            }
            exports.coerceAndCheckDataType = coerceAndCheckDataType;
            const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
            function coerceToTypes(types, coerceTypes) {
                return coerceTypes
                  ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
                  : [];
            }
            function coerceData(it, types, coerceTo) {
                const { gen, data, opts } = it;
                const dataType = gen.let("dataType", (0, codegen_1._) `typeof ${data}`);
                const coerced = gen.let("coerced", (0, codegen_1._) `undefined`);
                if (opts.coerceTypes === "array") {
                    gen.if((0, codegen_1._) `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
                    .assign(data, (0, codegen_1._) `${data}[0]`)
                    .assign(dataType, (0, codegen_1._) `typeof ${data}`)
                    .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
                }
                gen.if((0, codegen_1._) `${coerced} !== undefined`);
                for (const t of coerceTo) {
                    if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
                        coerceSpecificType(t);
                    }
                }
                gen.else();
                reportTypeError(it);
                gen.endIf();
                gen.if((0, codegen_1._) `${coerced} !== undefined`, () => {
                    gen.assign(data, coerced);
                    assignParentData(it, coerced);
                });
                function coerceSpecificType(t) {
                    switch (t) {
                        case "string":
                            gen
                            .elseIf((0, codegen_1._) `${dataType} == "number" || ${dataType} == "boolean"`)
                            .assign(coerced, (0, codegen_1._) `"" + ${data}`)
                            .elseIf((0, codegen_1._) `${data} === null`)
                            .assign(coerced, (0, codegen_1._) `""`);
                            return;
                        case "number":
                            gen
                            .elseIf((0, codegen_1._) `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                            .assign(coerced, (0, codegen_1._) `+${data}`);
                            return;
                        case "integer":
                            gen
                            .elseIf((0, codegen_1._) `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                            .assign(coerced, (0, codegen_1._) `+${data}`);
                            return;
                        case "boolean":
                            gen
                            .elseIf((0, codegen_1._) `${data} === "false" || ${data} === 0 || ${data} === null`)
                            .assign(coerced, false)
                            .elseIf((0, codegen_1._) `${data} === "true" || ${data} === 1`)
                            .assign(coerced, true);
                            return;
                        case "null":
                            gen.elseIf((0, codegen_1._) `${data} === "" || ${data} === 0 || ${data} === false`);
                            gen.assign(coerced, null);
                            return;
                        case "array":
                            gen
                            .elseIf((0, codegen_1._) `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                            .assign(coerced, (0, codegen_1._) `[${data}]`);
                    }
                }
            }
            function assignParentData({ gen, parentData, parentDataProperty }, expr) {
                // TODO use gen.property
                gen.if((0, codegen_1._) `${parentData} !== undefined`, () => gen.assign((0, codegen_1._) `${parentData}[${parentDataProperty}]`, expr));
            }
            function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
                const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
                let cond;
                switch (dataType) {
                    case "null":
                        return (0, codegen_1._) `${data} ${EQ} null`;
                    case "array":
                        cond = (0, codegen_1._) `Array.isArray(${data})`;
                        break;
                    case "object":
                        cond = (0, codegen_1._) `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
                        break;
                    case "integer":
                        cond = numCond((0, codegen_1._) `!(${data} % 1) && !isNaN(${data})`);
                        break;
                    case "number":
                        cond = numCond();
                        break;
                    default:
                        return (0, codegen_1._) `typeof ${data} ${EQ} ${dataType}`;
                }
                return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
                function numCond(_cond = codegen_1.nil) {
                    return (0, codegen_1.and)((0, codegen_1._) `typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._) `isFinite(${data})` : codegen_1.nil);
                }
            }
            exports.checkDataType = checkDataType;
            function checkDataTypes(dataTypes, data, strictNums, correct) {
                if (dataTypes.length === 1) {
                    return checkDataType(dataTypes[0], data, strictNums, correct);
                }
                let cond;
                const types = (0, util_1.toHash)(dataTypes);
                if (types.array && types.object) {
                    const notObj = (0, codegen_1._) `typeof ${data} != "object"`;
                    cond = types.null ? notObj : (0, codegen_1._) `!${data} || ${notObj}`;
                    delete types.null;
                    delete types.array;
                    delete types.object;
                }
                else {
                    cond = codegen_1.nil;
                }
                if (types.number)
                    delete types.integer;
                for (const t in types)
                    cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
                return cond;
            }
            exports.checkDataTypes = checkDataTypes;
            const typeError = {
                message: ({ schema }) => `must be ${schema}`,
                params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._) `{type: ${schema}}` : (0, codegen_1._) `{type: ${schemaValue}}`,
            };
            function reportTypeError(it) {
                const cxt = getTypeErrorContext(it);
                (0, errors_1.reportError)(cxt, typeError);
            }
            exports.reportTypeError = reportTypeError;
            function getTypeErrorContext(it) {
                const { gen, data, schema } = it;
                const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
                return {
                    gen,
                    keyword: "type",
                    data,
                    schema: schema.type,
                    schemaCode,
                    schemaValue: schemaCode,
                    parentSchema: schema,
                    params: {},
                    it,
                };
            }
//# sourceMappingURL=dataType.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/validate/defaults.js":
        /*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/defaults.js ***!
  \************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.assignDefaults = void 0;
            const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
            function assignDefaults(it, ty) {
                const { properties, items } = it.schema;
                if (ty === "object" && properties) {
                    for (const key in properties) {
                        assignDefault(it, key, properties[key].default);
                    }
                }
                else if (ty === "array" && Array.isArray(items)) {
                    items.forEach((sch, i) => assignDefault(it, i, sch.default));
                }
            }
            exports.assignDefaults = assignDefaults;
            function assignDefault(it, prop, defaultValue) {
                const { gen, compositeRule, data, opts } = it;
                if (defaultValue === undefined)
                    return;
                const childData = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(prop)}`;
                if (compositeRule) {
                    (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
                    return;
                }
                let condition = (0, codegen_1._) `${childData} === undefined`;
                if (opts.useDefaults === "empty") {
                    condition = (0, codegen_1._) `${condition} || ${childData} === null || ${childData} === ""`;
                }
                // `${childData} === undefined` +
                // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
                gen.if(condition, (0, codegen_1._) `${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
            }
//# sourceMappingURL=defaults.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/validate/index.js":
        /*!*********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/index.js ***!
  \*********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
            const boolSchema_1 = __webpack_require__(/*! ./boolSchema */ "./node_modules/ajv/dist/compile/validate/boolSchema.js");
            const dataType_1 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
            const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
            const dataType_2 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
            const defaults_1 = __webpack_require__(/*! ./defaults */ "./node_modules/ajv/dist/compile/validate/defaults.js");
            const keyword_1 = __webpack_require__(/*! ./keyword */ "./node_modules/ajv/dist/compile/validate/keyword.js");
            const subschema_1 = __webpack_require__(/*! ./subschema */ "./node_modules/ajv/dist/compile/validate/subschema.js");
            const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
            const resolve_1 = __webpack_require__(/*! ../resolve */ "./node_modules/ajv/dist/compile/resolve.js");
            const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
            const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
            function validateFunctionCode(it) {
                if (isSchemaObj(it)) {
                    checkKeywords(it);
                    if (schemaCxtHasRules(it)) {
                        topSchemaObjCode(it);
                        return;
                    }
                }
                validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
            }
            exports.validateFunctionCode = validateFunctionCode;
            function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
                if (opts.code.es5) {
                    gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
                        gen.code((0, codegen_1._) `"use strict"; ${funcSourceUrl(schema, opts)}`);
                        destructureValCxtES5(gen, opts);
                        gen.code(body);
                    });
                }
                else {
                    gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
                }
            }
            function destructureValCxt(opts) {
                return (0, codegen_1._) `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._) `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
            }
            function destructureValCxtES5(gen, opts) {
                gen.if(names_1.default.valCxt, () => {
                    gen.var(names_1.default.instancePath, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.instancePath}`);
                    gen.var(names_1.default.parentData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentData}`);
                    gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
                    gen.var(names_1.default.rootData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.rootData}`);
                    if (opts.dynamicRef)
                        gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
                }, () => {
                    gen.var(names_1.default.instancePath, (0, codegen_1._) `""`);
                    gen.var(names_1.default.parentData, (0, codegen_1._) `undefined`);
                    gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `undefined`);
                    gen.var(names_1.default.rootData, names_1.default.data);
                    if (opts.dynamicRef)
                        gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `{}`);
                });
            }
            function topSchemaObjCode(it) {
                const { schema, opts, gen } = it;
                validateFunction(it, () => {
                    if (opts.$comment && schema.$comment)
                        commentKeyword(it);
                    checkNoDefault(it);
                    gen.let(names_1.default.vErrors, null);
                    gen.let(names_1.default.errors, 0);
                    if (opts.unevaluated)
                        resetEvaluated(it);
                    typeAndKeywords(it);
                    returnResults(it);
                });
                return;
            }
            function resetEvaluated(it) {
                // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
                const { gen, validateName } = it;
                it.evaluated = gen.const("evaluated", (0, codegen_1._) `${validateName}.evaluated`);
                gen.if((0, codegen_1._) `${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._) `${it.evaluated}.props`, (0, codegen_1._) `undefined`));
                gen.if((0, codegen_1._) `${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._) `${it.evaluated}.items`, (0, codegen_1._) `undefined`));
            }
            function funcSourceUrl(schema, opts) {
                const schId = typeof schema == "object" && schema[opts.schemaId];
                return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._) `/*# sourceURL=${schId} */` : codegen_1.nil;
            }
// schema compilation - this function is used recursively to generate code for sub-schemas
            function subschemaCode(it, valid) {
                if (isSchemaObj(it)) {
                    checkKeywords(it);
                    if (schemaCxtHasRules(it)) {
                        subSchemaObjCode(it, valid);
                        return;
                    }
                }
                (0, boolSchema_1.boolOrEmptySchema)(it, valid);
            }
            function schemaCxtHasRules({ schema, self }) {
                if (typeof schema == "boolean")
                    return !schema;
                for (const key in schema)
                    if (self.RULES.all[key])
                        return true;
                return false;
            }
            function isSchemaObj(it) {
                return typeof it.schema != "boolean";
            }
            function subSchemaObjCode(it, valid) {
                const { schema, gen, opts } = it;
                if (opts.$comment && schema.$comment)
                    commentKeyword(it);
                updateContext(it);
                checkAsyncSchema(it);
                const errsCount = gen.const("_errs", names_1.default.errors);
                typeAndKeywords(it, errsCount);
                // TODO var
                gen.var(valid, (0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
            }
            function checkKeywords(it) {
                (0, util_1.checkUnknownRules)(it);
                checkRefsAndKeywords(it);
            }
            function typeAndKeywords(it, errsCount) {
                if (it.opts.jtd)
                    return schemaKeywords(it, [], false, errsCount);
                const types = (0, dataType_1.getSchemaTypes)(it.schema);
                const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
                schemaKeywords(it, types, !checkedTypes, errsCount);
            }
            function checkRefsAndKeywords(it) {
                const { schema, errSchemaPath, opts, self } = it;
                if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
                    self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
                }
            }
            function checkNoDefault(it) {
                const { schema, opts } = it;
                if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
                    (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
                }
            }
            function updateContext(it) {
                const schId = it.schema[it.opts.schemaId];
                if (schId)
                    it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
            }
            function checkAsyncSchema(it) {
                if (it.schema.$async && !it.schemaEnv.$async)
                    throw new Error("async schema in sync schema");
            }
            function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
                const msg = schema.$comment;
                if (opts.$comment === true) {
                    gen.code((0, codegen_1._) `${names_1.default.self}.logger.log(${msg})`);
                }
                else if (typeof opts.$comment == "function") {
                    const schemaPath = (0, codegen_1.str) `${errSchemaPath}/$comment`;
                    const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
                    gen.code((0, codegen_1._) `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
                }
            }
            function returnResults(it) {
                const { gen, schemaEnv, validateName, ValidationError, opts } = it;
                if (schemaEnv.$async) {
                    // TODO assign unevaluated
                    gen.if((0, codegen_1._) `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._) `new ${ValidationError}(${names_1.default.vErrors})`));
                }
                else {
                    gen.assign((0, codegen_1._) `${validateName}.errors`, names_1.default.vErrors);
                    if (opts.unevaluated)
                        assignEvaluated(it);
                    gen.return((0, codegen_1._) `${names_1.default.errors} === 0`);
                }
            }
            function assignEvaluated({ gen, evaluated, props, items }) {
                if (props instanceof codegen_1.Name)
                    gen.assign((0, codegen_1._) `${evaluated}.props`, props);
                if (items instanceof codegen_1.Name)
                    gen.assign((0, codegen_1._) `${evaluated}.items`, items);
            }
            function schemaKeywords(it, types, typeErrors, errsCount) {
                const { gen, schema, data, allErrors, opts, self } = it;
                const { RULES } = self;
                if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
                    gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
                    return;
                }
                if (!opts.jtd)
                    checkStrictTypes(it, types);
                gen.block(() => {
                    for (const group of RULES.rules)
                        groupKeywords(group);
                    groupKeywords(RULES.post);
                });
                function groupKeywords(group) {
                    if (!(0, applicability_1.shouldUseGroup)(schema, group))
                        return;
                    if (group.type) {
                        gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
                        iterateKeywords(it, group);
                        if (types.length === 1 && types[0] === group.type && typeErrors) {
                            gen.else();
                            (0, dataType_2.reportTypeError)(it);
                        }
                        gen.endIf();
                    }
                    else {
                        iterateKeywords(it, group);
                    }
                    // TODO make it "ok" call?
                    if (!allErrors)
                        gen.if((0, codegen_1._) `${names_1.default.errors} === ${errsCount || 0}`);
                }
            }
            function iterateKeywords(it, group) {
                const { gen, schema, opts: { useDefaults }, } = it;
                if (useDefaults)
                    (0, defaults_1.assignDefaults)(it, group.type);
                gen.block(() => {
                    for (const rule of group.rules) {
                        if ((0, applicability_1.shouldUseRule)(schema, rule)) {
                            keywordCode(it, rule.keyword, rule.definition, group.type);
                        }
                    }
                });
            }
            function checkStrictTypes(it, types) {
                if (it.schemaEnv.meta || !it.opts.strictTypes)
                    return;
                checkContextTypes(it, types);
                if (!it.opts.allowUnionTypes)
                    checkMultipleTypes(it, types);
                checkKeywordTypes(it, it.dataTypes);
            }
            function checkContextTypes(it, types) {
                if (!types.length)
                    return;
                if (!it.dataTypes.length) {
                    it.dataTypes = types;
                    return;
                }
                types.forEach((t) => {
                    if (!includesType(it.dataTypes, t)) {
                        strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
                    }
                });
                narrowSchemaTypes(it, types);
            }
            function checkMultipleTypes(it, ts) {
                if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
                    strictTypesError(it, "use allowUnionTypes to allow union type keyword");
                }
            }
            function checkKeywordTypes(it, ts) {
                const rules = it.self.RULES.all;
                for (const keyword in rules) {
                    const rule = rules[keyword];
                    if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
                        const { type } = rule.definition;
                        if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
                        }
                    }
                }
            }
            function hasApplicableType(schTs, kwdT) {
                return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
            }
            function includesType(ts, t) {
                return ts.includes(t) || (t === "integer" && ts.includes("number"));
            }
            function narrowSchemaTypes(it, withTypes) {
                const ts = [];
                for (const t of it.dataTypes) {
                    if (includesType(withTypes, t))
                        ts.push(t);
                    else if (withTypes.includes("integer") && t === "number")
                        ts.push("integer");
                }
                it.dataTypes = ts;
            }
            function strictTypesError(it, msg) {
                const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                msg += ` at "${schemaPath}" (strictTypes)`;
                (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
            }
            class KeywordCxt {
                constructor(it, def, keyword) {
                    (0, keyword_1.validateKeywordUsage)(it, def, keyword);
                    this.gen = it.gen;
                    this.allErrors = it.allErrors;
                    this.keyword = keyword;
                    this.data = it.data;
                    this.schema = it.schema[keyword];
                    this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
                    this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
                    this.schemaType = def.schemaType;
                    this.parentSchema = it.schema;
                    this.params = {};
                    this.it = it;
                    this.def = def;
                    if (this.$data) {
                        this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
                    }
                    else {
                        this.schemaCode = this.schemaValue;
                        if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
                            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
                        }
                    }
                    if ("code" in def ? def.trackErrors : def.errors !== false) {
                        this.errsCount = it.gen.const("_errs", names_1.default.errors);
                    }
                }
                result(condition, successAction, failAction) {
                    this.failResult((0, codegen_1.not)(condition), successAction, failAction);
                }
                failResult(condition, successAction, failAction) {
                    this.gen.if(condition);
                    if (failAction)
                        failAction();
                    else
                        this.error();
                    if (successAction) {
                        this.gen.else();
                        successAction();
                        if (this.allErrors)
                            this.gen.endIf();
                    }
                    else {
                        if (this.allErrors)
                            this.gen.endIf();
                        else
                            this.gen.else();
                    }
                }
                pass(condition, failAction) {
                    this.failResult((0, codegen_1.not)(condition), undefined, failAction);
                }
                fail(condition) {
                    if (condition === undefined) {
                        this.error();
                        if (!this.allErrors)
                            this.gen.if(false); // this branch will be removed by gen.optimize
                        return;
                    }
                    this.gen.if(condition);
                    this.error();
                    if (this.allErrors)
                        this.gen.endIf();
                    else
                        this.gen.else();
                }
                fail$data(condition) {
                    if (!this.$data)
                        return this.fail(condition);
                    const { schemaCode } = this;
                    this.fail((0, codegen_1._) `${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
                }
                error(append, errorParams, errorPaths) {
                    if (errorParams) {
                        this.setParams(errorParams);
                        this._error(append, errorPaths);
                        this.setParams({});
                        return;
                    }
                    this._error(append, errorPaths);
                }
                _error(append, errorPaths) {
                    ;
                    (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
                }
                $dataError() {
                    (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
                }
                reset() {
                    if (this.errsCount === undefined)
                        throw new Error('add "trackErrors" to keyword definition');
                    (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
                }
                ok(cond) {
                    if (!this.allErrors)
                        this.gen.if(cond);
                }
                setParams(obj, assign) {
                    if (assign)
                        Object.assign(this.params, obj);
                    else
                        this.params = obj;
                }
                block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
                    this.gen.block(() => {
                        this.check$data(valid, $dataValid);
                        codeBlock();
                    });
                }
                check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
                    if (!this.$data)
                        return;
                    const { gen, schemaCode, schemaType, def } = this;
                    gen.if((0, codegen_1.or)((0, codegen_1._) `${schemaCode} === undefined`, $dataValid));
                    if (valid !== codegen_1.nil)
                        gen.assign(valid, true);
                    if (schemaType.length || def.validateSchema) {
                        gen.elseIf(this.invalid$data());
                        this.$dataError();
                        if (valid !== codegen_1.nil)
                            gen.assign(valid, false);
                    }
                    gen.else();
                }
                invalid$data() {
                    const { gen, schemaCode, schemaType, def, it } = this;
                    return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
                    function wrong$DataType() {
                        if (schemaType.length) {
                            /* istanbul ignore if */
                            if (!(schemaCode instanceof codegen_1.Name))
                                throw new Error("ajv implementation error");
                            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                            return (0, codegen_1._) `${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
                        }
                        return codegen_1.nil;
                    }
                    function invalid$DataSchema() {
                        if (def.validateSchema) {
                            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                            return (0, codegen_1._) `!${validateSchemaRef}(${schemaCode})`;
                        }
                        return codegen_1.nil;
                    }
                }
                subschema(appl, valid) {
                    const subschema = (0, subschema_1.getSubschema)(this.it, appl);
                    (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
                    (0, subschema_1.extendSubschemaMode)(subschema, appl);
                    const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
                    subschemaCode(nextContext, valid);
                    return nextContext;
                }
                mergeEvaluated(schemaCxt, toName) {
                    const { it, gen } = this;
                    if (!it.opts.unevaluated)
                        return;
                    if (it.props !== true && schemaCxt.props !== undefined) {
                        it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
                    }
                    if (it.items !== true && schemaCxt.items !== undefined) {
                        it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
                    }
                }
                mergeValidEvaluated(schemaCxt, valid) {
                    const { it, gen } = this;
                    if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
                        gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
                        return true;
                    }
                }
            }
            exports.KeywordCxt = KeywordCxt;
            function keywordCode(it, keyword, def, ruleType) {
                const cxt = new KeywordCxt(it, def, keyword);
                if ("code" in def) {
                    def.code(cxt, ruleType);
                }
                else if (cxt.$data && def.validate) {
                    (0, keyword_1.funcKeywordCode)(cxt, def);
                }
                else if ("macro" in def) {
                    (0, keyword_1.macroKeywordCode)(cxt, def);
                }
                else if (def.compile || def.validate) {
                    (0, keyword_1.funcKeywordCode)(cxt, def);
                }
            }
            const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
            const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
            function getData($data, { dataLevel, dataNames, dataPathArr }) {
                let jsonPointer;
                let data;
                if ($data === "")
                    return names_1.default.rootData;
                if ($data[0] === "/") {
                    if (!JSON_POINTER.test($data))
                        throw new Error(`Invalid JSON-pointer: ${$data}`);
                    jsonPointer = $data;
                    data = names_1.default.rootData;
                }
                else {
                    const matches = RELATIVE_JSON_POINTER.exec($data);
                    if (!matches)
                        throw new Error(`Invalid JSON-pointer: ${$data}`);
                    const up = +matches[1];
                    jsonPointer = matches[2];
                    if (jsonPointer === "#") {
                        if (up >= dataLevel)
                            throw new Error(errorMsg("property/index", up));
                        return dataPathArr[dataLevel - up];
                    }
                    if (up > dataLevel)
                        throw new Error(errorMsg("data", up));
                    data = dataNames[dataLevel - up];
                    if (!jsonPointer)
                        return data;
                }
                let expr = data;
                const segments = jsonPointer.split("/");
                for (const segment of segments) {
                    if (segment) {
                        data = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
                        expr = (0, codegen_1._) `${expr} && ${data}`;
                    }
                }
                return expr;
                function errorMsg(pointerType, up) {
                    return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
                }
            }
            exports.getData = getData;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/validate/keyword.js":
        /*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/keyword.js ***!
  \***********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
            const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
            const code_1 = __webpack_require__(/*! ../../vocabularies/code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
            function macroKeywordCode(cxt, def) {
                const { gen, keyword, schema, parentSchema, it } = cxt;
                const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
                const schemaRef = useKeyword(gen, keyword, macroSchema);
                if (it.opts.validateSchema !== false)
                    it.self.validateSchema(macroSchema, true);
                const valid = gen.name("valid");
                cxt.subschema({
                    schema: macroSchema,
                    schemaPath: codegen_1.nil,
                    errSchemaPath: `${it.errSchemaPath}/${keyword}`,
                    topSchemaRef: schemaRef,
                    compositeRule: true,
                }, valid);
                cxt.pass(valid, () => cxt.error(true));
            }
            exports.macroKeywordCode = macroKeywordCode;
            function funcKeywordCode(cxt, def) {
                var _a;
                const { gen, keyword, schema, parentSchema, $data, it } = cxt;
                checkAsyncKeyword(it, def);
                const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
                const validateRef = useKeyword(gen, keyword, validate);
                const valid = gen.let("valid");
                cxt.block$data(valid, validateKeyword);
                cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
                function validateKeyword() {
                    if (def.errors === false) {
                        assignValid();
                        if (def.modifying)
                            modifyData(cxt);
                        reportErrs(() => cxt.error());
                    }
                    else {
                        const ruleErrs = def.async ? validateAsync() : validateSync();
                        if (def.modifying)
                            modifyData(cxt);
                        reportErrs(() => addErrs(cxt, ruleErrs));
                    }
                }
                function validateAsync() {
                    const ruleErrs = gen.let("ruleErrs", null);
                    gen.try(() => assignValid((0, codegen_1._) `await `), (e) => gen.assign(valid, false).if((0, codegen_1._) `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._) `${e}.errors`), () => gen.throw(e)));
                    return ruleErrs;
                }
                function validateSync() {
                    const validateErrs = (0, codegen_1._) `${validateRef}.errors`;
                    gen.assign(validateErrs, null);
                    assignValid(codegen_1.nil);
                    return validateErrs;
                }
                function assignValid(_await = def.async ? (0, codegen_1._) `await ` : codegen_1.nil) {
                    const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
                    const passSchema = !(("compile" in def && !$data) || def.schema === false);
                    gen.assign(valid, (0, codegen_1._) `${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
                }
                function reportErrs(errors) {
                    var _a;
                    gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
                }
            }
            exports.funcKeywordCode = funcKeywordCode;
            function modifyData(cxt) {
                const { gen, data, it } = cxt;
                gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._) `${it.parentData}[${it.parentDataProperty}]`));
            }
            function addErrs(cxt, errs) {
                const { gen } = cxt;
                gen.if((0, codegen_1._) `Array.isArray(${errs})`, () => {
                    gen
                    .assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
                    .assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
                    (0, errors_1.extendErrors)(cxt);
                }, () => cxt.error());
            }
            function checkAsyncKeyword({ schemaEnv }, def) {
                if (def.async && !schemaEnv.$async)
                    throw new Error("async keyword in sync schema");
            }
            function useKeyword(gen, keyword, result) {
                if (result === undefined)
                    throw new Error(`keyword "${keyword}" failed to compile`);
                return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
            }
            function validSchemaType(schema, schemaType, allowUndefined = false) {
                // TODO add tests
                return (!schemaType.length ||
                  schemaType.some((st) => st === "array"
                    ? Array.isArray(schema)
                    : st === "object"
                      ? schema && typeof schema == "object" && !Array.isArray(schema)
                      : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
            }
            exports.validSchemaType = validSchemaType;
            function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
                /* istanbul ignore if */
                if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
                    throw new Error("ajv implementation error");
                }
                const deps = def.dependencies;
                if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
                    throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
                }
                if (def.validateSchema) {
                    const valid = def.validateSchema(schema[keyword]);
                    if (!valid) {
                        const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                          self.errorsText(def.validateSchema.errors);
                        if (opts.validateSchema === "log")
                            self.logger.error(msg);
                        else
                            throw new Error(msg);
                    }
                }
            }
            exports.validateKeywordUsage = validateKeywordUsage;
//# sourceMappingURL=keyword.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/compile/validate/subschema.js":
        /*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/subschema.js ***!
  \*************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
            const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
            function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
                if (keyword !== undefined && schema !== undefined) {
                    throw new Error('both "keyword" and "schema" passed, only one allowed');
                }
                if (keyword !== undefined) {
                    const sch = it.schema[keyword];
                    return schemaProp === undefined
                      ? {
                          schema: sch,
                          schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
                          errSchemaPath: `${it.errSchemaPath}/${keyword}`,
                      }
                      : {
                          schema: sch[schemaProp],
                          schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
                          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`,
                      };
                }
                if (schema !== undefined) {
                    if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
                        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
                    }
                    return {
                        schema,
                        schemaPath,
                        topSchemaRef,
                        errSchemaPath,
                    };
                }
                throw new Error('either "keyword" or "schema" must be passed');
            }
            exports.getSubschema = getSubschema;
            function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
                if (data !== undefined && dataProp !== undefined) {
                    throw new Error('both "data" and "dataProp" passed, only one allowed');
                }
                const { gen } = it;
                if (dataProp !== undefined) {
                    const { errorPath, dataPathArr, opts } = it;
                    const nextData = gen.let("data", (0, codegen_1._) `${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
                    dataContextProps(nextData);
                    subschema.errorPath = (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
                    subschema.parentDataProperty = (0, codegen_1._) `${dataProp}`;
                    subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
                }
                if (data !== undefined) {
                    const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
                    dataContextProps(nextData);
                    if (propertyName !== undefined)
                        subschema.propertyName = propertyName;
                    // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
                }
                if (dataTypes)
                    subschema.dataTypes = dataTypes;
                function dataContextProps(_nextData) {
                    subschema.data = _nextData;
                    subschema.dataLevel = it.dataLevel + 1;
                    subschema.dataTypes = [];
                    it.definedProperties = new Set();
                    subschema.parentData = it.data;
                    subschema.dataNames = [...it.dataNames, _nextData];
                }
            }
            exports.extendSubschemaData = extendSubschemaData;
            function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
                if (compositeRule !== undefined)
                    subschema.compositeRule = compositeRule;
                if (createErrors !== undefined)
                    subschema.createErrors = createErrors;
                if (allErrors !== undefined)
                    subschema.allErrors = allErrors;
                subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
                subschema.jtdMetadata = jtdMetadata; // not inherited
            }
            exports.extendSubschemaMode = extendSubschemaMode;
//# sourceMappingURL=subschema.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/core.js":
        /*!***************************************!*\
  !*** ./node_modules/ajv/dist/core.js ***!
  \***************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
            var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
            Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
            var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
            Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
            Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
            Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
            Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
            Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });
            const validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
            const ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
            const rules_1 = __webpack_require__(/*! ./compile/rules */ "./node_modules/ajv/dist/compile/rules.js");
            const compile_1 = __webpack_require__(/*! ./compile */ "./node_modules/ajv/dist/compile/index.js");
            const codegen_2 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const resolve_1 = __webpack_require__(/*! ./compile/resolve */ "./node_modules/ajv/dist/compile/resolve.js");
            const dataType_1 = __webpack_require__(/*! ./compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
            const util_1 = __webpack_require__(/*! ./compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const $dataRefSchema = __webpack_require__(/*! ./refs/data.json */ "./node_modules/ajv/dist/refs/data.json");
            const uri_1 = __webpack_require__(/*! ./runtime/uri */ "./node_modules/ajv/dist/runtime/uri.js");
            const defaultRegExp = (str, flags) => new RegExp(str, flags);
            defaultRegExp.code = "new RegExp";
            const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
            const EXT_SCOPE_NAMES = new Set([
                "validate",
                "serialize",
                "parse",
                "wrapper",
                "root",
                "schema",
                "keyword",
                "pattern",
                "formats",
                "validate$data",
                "func",
                "obj",
                "Error",
            ]);
            const removedOptions = {
                errorDataPath: "",
                format: "`validateFormats: false` can be used instead.",
                nullable: '"nullable" keyword is supported by default.',
                jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
                extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
                missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
                processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
                sourceCode: "Use option `code: {source: true}`",
                strictDefaults: "It is default now, see option `strict`.",
                strictKeywords: "It is default now, see option `strict`.",
                uniqueItems: '"uniqueItems" keyword is always validated.',
                unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
                cache: "Map is used as cache, schema object as key.",
                serialize: "Map is used as cache, schema object as key.",
                ajvErrors: "It is default now.",
            };
            const deprecatedOptions = {
                ignoreKeywordsWithRef: "",
                jsPropertySyntax: "",
                unicode: '"minLength"/"maxLength" account for unicode characters by default.',
            };
            const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
            function requiredOptions(o) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
                const s = o.strict;
                const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
                const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
                const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
                const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
                return {
                    strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
                    strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
                    strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
                    strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
                    strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
                    code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
                    loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
                    loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
                    meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
                    messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
                    inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
                    schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
                    addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
                    validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
                    validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
                    unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
                    int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
                    uriResolver: uriResolver,
                };
            }
            class Ajv {
                constructor(opts = {}) {
                    this.schemas = {};
                    this.refs = {};
                    this.formats = {};
                    this._compilations = new Set();
                    this._loading = {};
                    this._cache = new Map();
                    opts = this.opts = { ...opts, ...requiredOptions(opts) };
                    const { es5, lines } = this.opts.code;
                    this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
                    this.logger = getLogger(opts.logger);
                    const formatOpt = opts.validateFormats;
                    opts.validateFormats = false;
                    this.RULES = (0, rules_1.getRules)();
                    checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
                    checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
                    this._metaOpts = getMetaSchemaOptions.call(this);
                    if (opts.formats)
                        addInitialFormats.call(this);
                    this._addVocabularies();
                    this._addDefaultMetaSchema();
                    if (opts.keywords)
                        addInitialKeywords.call(this, opts.keywords);
                    if (typeof opts.meta == "object")
                        this.addMetaSchema(opts.meta);
                    addInitialSchemas.call(this);
                    opts.validateFormats = formatOpt;
                }
                _addVocabularies() {
                    this.addKeyword("$async");
                }
                _addDefaultMetaSchema() {
                    const { $data, meta, schemaId } = this.opts;
                    let _dataRefSchema = $dataRefSchema;
                    if (schemaId === "id") {
                        _dataRefSchema = { ...$dataRefSchema };
                        _dataRefSchema.id = _dataRefSchema.$id;
                        delete _dataRefSchema.$id;
                    }
                    if (meta && $data)
                        this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
                }
                defaultMeta() {
                    const { meta, schemaId } = this.opts;
                    return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
                }
                validate(schemaKeyRef, // key, ref or schema object
                         data // to be validated
                ) {
                    let v;
                    if (typeof schemaKeyRef == "string") {
                        v = this.getSchema(schemaKeyRef);
                        if (!v)
                            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
                    }
                    else {
                        v = this.compile(schemaKeyRef);
                    }
                    const valid = v(data);
                    if (!("$async" in v))
                        this.errors = v.errors;
                    return valid;
                }
                compile(schema, _meta) {
                    const sch = this._addSchema(schema, _meta);
                    return (sch.validate || this._compileSchemaEnv(sch));
                }
                compileAsync(schema, meta) {
                    if (typeof this.opts.loadSchema != "function") {
                        throw new Error("options.loadSchema should be a function");
                    }
                    const { loadSchema } = this.opts;
                    return runCompileAsync.call(this, schema, meta);
                    async function runCompileAsync(_schema, _meta) {
                        await loadMetaSchema.call(this, _schema.$schema);
                        const sch = this._addSchema(_schema, _meta);
                        return sch.validate || _compileAsync.call(this, sch);
                    }
                    async function loadMetaSchema($ref) {
                        if ($ref && !this.getSchema($ref)) {
                            await runCompileAsync.call(this, { $ref }, true);
                        }
                    }
                    async function _compileAsync(sch) {
                        try {
                            return this._compileSchemaEnv(sch);
                        }
                        catch (e) {
                            if (!(e instanceof ref_error_1.default))
                                throw e;
                            checkLoaded.call(this, e);
                            await loadMissingSchema.call(this, e.missingSchema);
                            return _compileAsync.call(this, sch);
                        }
                    }
                    function checkLoaded({ missingSchema: ref, missingRef }) {
                        if (this.refs[ref]) {
                            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
                        }
                    }
                    async function loadMissingSchema(ref) {
                        const _schema = await _loadSchema.call(this, ref);
                        if (!this.refs[ref])
                            await loadMetaSchema.call(this, _schema.$schema);
                        if (!this.refs[ref])
                            this.addSchema(_schema, ref, meta);
                    }
                    async function _loadSchema(ref) {
                        const p = this._loading[ref];
                        if (p)
                            return p;
                        try {
                            return await (this._loading[ref] = loadSchema(ref));
                        }
                        finally {
                            delete this._loading[ref];
                        }
                    }
                }
                // Adds schema to the instance
                addSchema(schema, // If array is passed, `key` will be ignored
                          key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
                          _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
                          _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
                ) {
                    if (Array.isArray(schema)) {
                        for (const sch of schema)
                            this.addSchema(sch, undefined, _meta, _validateSchema);
                        return this;
                    }
                    let id;
                    if (typeof schema === "object") {
                        const { schemaId } = this.opts;
                        id = schema[schemaId];
                        if (id !== undefined && typeof id != "string") {
                            throw new Error(`schema ${schemaId} must be string`);
                        }
                    }
                    key = (0, resolve_1.normalizeId)(key || id);
                    this._checkUnique(key);
                    this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
                    return this;
                }
                // Add schema that will be used to validate other schemas
                // options in META_IGNORE_OPTIONS are alway set to false
                addMetaSchema(schema, key, // schema key
                              _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
                ) {
                    this.addSchema(schema, key, true, _validateSchema);
                    return this;
                }
                //  Validate schema against its meta-schema
                validateSchema(schema, throwOrLogError) {
                    if (typeof schema == "boolean")
                        return true;
                    let $schema;
                    $schema = schema.$schema;
                    if ($schema !== undefined && typeof $schema != "string") {
                        throw new Error("$schema must be a string");
                    }
                    $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
                    if (!$schema) {
                        this.logger.warn("meta-schema not available");
                        this.errors = null;
                        return true;
                    }
                    const valid = this.validate($schema, schema);
                    if (!valid && throwOrLogError) {
                        const message = "schema is invalid: " + this.errorsText();
                        if (this.opts.validateSchema === "log")
                            this.logger.error(message);
                        else
                            throw new Error(message);
                    }
                    return valid;
                }
                // Get compiled schema by `key` or `ref`.
                // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
                getSchema(keyRef) {
                    let sch;
                    while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
                        keyRef = sch;
                    if (sch === undefined) {
                        const { schemaId } = this.opts;
                        const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
                        sch = compile_1.resolveSchema.call(this, root, keyRef);
                        if (!sch)
                            return;
                        this.refs[keyRef] = sch;
                    }
                    return (sch.validate || this._compileSchemaEnv(sch));
                }
                // Remove cached schema(s).
                // If no parameter is passed all schemas but meta-schemas are removed.
                // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
                // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
                removeSchema(schemaKeyRef) {
                    if (schemaKeyRef instanceof RegExp) {
                        this._removeAllSchemas(this.schemas, schemaKeyRef);
                        this._removeAllSchemas(this.refs, schemaKeyRef);
                        return this;
                    }
                    switch (typeof schemaKeyRef) {
                        case "undefined":
                            this._removeAllSchemas(this.schemas);
                            this._removeAllSchemas(this.refs);
                            this._cache.clear();
                            return this;
                        case "string": {
                            const sch = getSchEnv.call(this, schemaKeyRef);
                            if (typeof sch == "object")
                                this._cache.delete(sch.schema);
                            delete this.schemas[schemaKeyRef];
                            delete this.refs[schemaKeyRef];
                            return this;
                        }
                        case "object": {
                            const cacheKey = schemaKeyRef;
                            this._cache.delete(cacheKey);
                            let id = schemaKeyRef[this.opts.schemaId];
                            if (id) {
                                id = (0, resolve_1.normalizeId)(id);
                                delete this.schemas[id];
                                delete this.refs[id];
                            }
                            return this;
                        }
                        default:
                            throw new Error("ajv.removeSchema: invalid parameter");
                    }
                }
                // add "vocabulary" - a collection of keywords
                addVocabulary(definitions) {
                    for (const def of definitions)
                        this.addKeyword(def);
                    return this;
                }
                addKeyword(kwdOrDef, def // deprecated
                ) {
                    let keyword;
                    if (typeof kwdOrDef == "string") {
                        keyword = kwdOrDef;
                        if (typeof def == "object") {
                            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                            def.keyword = keyword;
                        }
                    }
                    else if (typeof kwdOrDef == "object" && def === undefined) {
                        def = kwdOrDef;
                        keyword = def.keyword;
                        if (Array.isArray(keyword) && !keyword.length) {
                            throw new Error("addKeywords: keyword must be string or non-empty array");
                        }
                    }
                    else {
                        throw new Error("invalid addKeywords parameters");
                    }
                    checkKeyword.call(this, keyword, def);
                    if (!def) {
                        (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
                        return this;
                    }
                    keywordMetaschema.call(this, def);
                    const definition = {
                        ...def,
                        type: (0, dataType_1.getJSONTypes)(def.type),
                        schemaType: (0, dataType_1.getJSONTypes)(def.schemaType),
                    };
                    (0, util_1.eachItem)(keyword, definition.type.length === 0
                      ? (k) => addRule.call(this, k, definition)
                      : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
                    return this;
                }
                getKeyword(keyword) {
                    const rule = this.RULES.all[keyword];
                    return typeof rule == "object" ? rule.definition : !!rule;
                }
                // Remove keyword
                removeKeyword(keyword) {
                    // TODO return type should be Ajv
                    const { RULES } = this;
                    delete RULES.keywords[keyword];
                    delete RULES.all[keyword];
                    for (const group of RULES.rules) {
                        const i = group.rules.findIndex((rule) => rule.keyword === keyword);
                        if (i >= 0)
                            group.rules.splice(i, 1);
                    }
                    return this;
                }
                // Add format
                addFormat(name, format) {
                    if (typeof format == "string")
                        format = new RegExp(format);
                    this.formats[name] = format;
                    return this;
                }
                errorsText(errors = this.errors, // optional array of validation errors
                           { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
                ) {
                    if (!errors || errors.length === 0)
                        return "No errors";
                    return errors
                    .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
                    .reduce((text, msg) => text + separator + msg);
                }
                $dataMetaSchema(metaSchema, keywordsJsonPointers) {
                    const rules = this.RULES.all;
                    metaSchema = JSON.parse(JSON.stringify(metaSchema));
                    for (const jsonPointer of keywordsJsonPointers) {
                        const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
                        let keywords = metaSchema;
                        for (const seg of segments)
                            keywords = keywords[seg];
                        for (const key in rules) {
                            const rule = rules[key];
                            if (typeof rule != "object")
                                continue;
                            const { $data } = rule.definition;
                            const schema = keywords[key];
                            if ($data && schema)
                                keywords[key] = schemaOrData(schema);
                        }
                    }
                    return metaSchema;
                }
                _removeAllSchemas(schemas, regex) {
                    for (const keyRef in schemas) {
                        const sch = schemas[keyRef];
                        if (!regex || regex.test(keyRef)) {
                            if (typeof sch == "string") {
                                delete schemas[keyRef];
                            }
                            else if (sch && !sch.meta) {
                                this._cache.delete(sch.schema);
                                delete schemas[keyRef];
                            }
                        }
                    }
                }
                _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
                    let id;
                    const { schemaId } = this.opts;
                    if (typeof schema == "object") {
                        id = schema[schemaId];
                    }
                    else {
                        if (this.opts.jtd)
                            throw new Error("schema must be object");
                        else if (typeof schema != "boolean")
                            throw new Error("schema must be object or boolean");
                    }
                    let sch = this._cache.get(schema);
                    if (sch !== undefined)
                        return sch;
                    baseId = (0, resolve_1.normalizeId)(id || baseId);
                    const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
                    sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
                    this._cache.set(sch.schema, sch);
                    if (addSchema && !baseId.startsWith("#")) {
                        // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
                        if (baseId)
                            this._checkUnique(baseId);
                        this.refs[baseId] = sch;
                    }
                    if (validateSchema)
                        this.validateSchema(schema, true);
                    return sch;
                }
                _checkUnique(id) {
                    if (this.schemas[id] || this.refs[id]) {
                        throw new Error(`schema with key or id "${id}" already exists`);
                    }
                }
                _compileSchemaEnv(sch) {
                    if (sch.meta)
                        this._compileMetaSchema(sch);
                    else
                        compile_1.compileSchema.call(this, sch);
                    /* istanbul ignore if */
                    if (!sch.validate)
                        throw new Error("ajv implementation error");
                    return sch.validate;
                }
                _compileMetaSchema(sch) {
                    const currentOpts = this.opts;
                    this.opts = this._metaOpts;
                    try {
                        compile_1.compileSchema.call(this, sch);
                    }
                    finally {
                        this.opts = currentOpts;
                    }
                }
            }
            exports.default = Ajv;
            Ajv.ValidationError = validation_error_1.default;
            Ajv.MissingRefError = ref_error_1.default;
            function checkOptions(checkOpts, options, msg, log = "error") {
                for (const key in checkOpts) {
                    const opt = key;
                    if (opt in options)
                        this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
                }
            }
            function getSchEnv(keyRef) {
                keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
                return this.schemas[keyRef] || this.refs[keyRef];
            }
            function addInitialSchemas() {
                const optsSchemas = this.opts.schemas;
                if (!optsSchemas)
                    return;
                if (Array.isArray(optsSchemas))
                    this.addSchema(optsSchemas);
                else
                    for (const key in optsSchemas)
                        this.addSchema(optsSchemas[key], key);
            }
            function addInitialFormats() {
                for (const name in this.opts.formats) {
                    const format = this.opts.formats[name];
                    if (format)
                        this.addFormat(name, format);
                }
            }
            function addInitialKeywords(defs) {
                if (Array.isArray(defs)) {
                    this.addVocabulary(defs);
                    return;
                }
                this.logger.warn("keywords option as map is deprecated, pass array");
                for (const keyword in defs) {
                    const def = defs[keyword];
                    if (!def.keyword)
                        def.keyword = keyword;
                    this.addKeyword(def);
                }
            }
            function getMetaSchemaOptions() {
                const metaOpts = { ...this.opts };
                for (const opt of META_IGNORE_OPTIONS)
                    delete metaOpts[opt];
                return metaOpts;
            }
            const noLogs = { log() { }, warn() { }, error() { } };
            function getLogger(logger) {
                if (logger === false)
                    return noLogs;
                if (logger === undefined)
                    return console;
                if (logger.log && logger.warn && logger.error)
                    return logger;
                throw new Error("logger must implement log, warn and error methods");
            }
            const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
            function checkKeyword(keyword, def) {
                const { RULES } = this;
                (0, util_1.eachItem)(keyword, (kwd) => {
                    if (RULES.keywords[kwd])
                        throw new Error(`Keyword ${kwd} is already defined`);
                    if (!KEYWORD_NAME.test(kwd))
                        throw new Error(`Keyword ${kwd} has invalid name`);
                });
                if (!def)
                    return;
                if (def.$data && !("code" in def || "validate" in def)) {
                    throw new Error('$data keyword must have "code" or "validate" function');
                }
            }
            function addRule(keyword, definition, dataType) {
                var _a;
                const post = definition === null || definition === void 0 ? void 0 : definition.post;
                if (dataType && post)
                    throw new Error('keyword with "post" flag cannot have "type"');
                const { RULES } = this;
                let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
                if (!ruleGroup) {
                    ruleGroup = { type: dataType, rules: [] };
                    RULES.rules.push(ruleGroup);
                }
                RULES.keywords[keyword] = true;
                if (!definition)
                    return;
                const rule = {
                    keyword,
                    definition: {
                        ...definition,
                        type: (0, dataType_1.getJSONTypes)(definition.type),
                        schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType),
                    },
                };
                if (definition.before)
                    addBeforeRule.call(this, ruleGroup, rule, definition.before);
                else
                    ruleGroup.rules.push(rule);
                RULES.all[keyword] = rule;
                (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
            }
            function addBeforeRule(ruleGroup, rule, before) {
                const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
                if (i >= 0) {
                    ruleGroup.rules.splice(i, 0, rule);
                }
                else {
                    ruleGroup.rules.push(rule);
                    this.logger.warn(`rule ${before} is not defined`);
                }
            }
            function keywordMetaschema(def) {
                let { metaSchema } = def;
                if (metaSchema === undefined)
                    return;
                if (def.$data && this.opts.$data)
                    metaSchema = schemaOrData(metaSchema);
                def.validateSchema = this.compile(metaSchema, true);
            }
            const $dataRef = {
                $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
            };
            function schemaOrData(schema) {
                return { anyOf: [schema, $dataRef] };
            }
//# sourceMappingURL=core.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/data.json":
        /*!**********************************************!*\
  !*** ./node_modules/ajv/dist/refs/data.json ***!
  \**********************************************/
        /*! exports provided: $id, description, type, required, properties, additionalProperties, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$id\":\"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#\",\"description\":\"Meta-schema for $data reference (JSON AnySchema extension proposal)\",\"type\":\"object\",\"required\":[\"$data\"],\"properties\":{\"$data\":{\"type\":\"string\",\"anyOf\":[{\"format\":\"relative-json-pointer\"},{\"format\":\"json-pointer\"}]}},\"additionalProperties\":false}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/index.js":
        /*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/index.js ***!
  \*****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const metaSchema = __webpack_require__(/*! ./schema.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/schema.json");
            const applicator = __webpack_require__(/*! ./meta/applicator.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/applicator.json");
            const unevaluated = __webpack_require__(/*! ./meta/unevaluated.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/unevaluated.json");
            const content = __webpack_require__(/*! ./meta/content.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/content.json");
            const core = __webpack_require__(/*! ./meta/core.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/core.json");
            const format = __webpack_require__(/*! ./meta/format-annotation.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/format-annotation.json");
            const metadata = __webpack_require__(/*! ./meta/meta-data.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/meta-data.json");
            const validation = __webpack_require__(/*! ./meta/validation.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/validation.json");
            const META_SUPPORT_DATA = ["/properties"];
            function addMetaSchema2020($data) {
                ;
                [
                    metaSchema,
                    applicator,
                    unevaluated,
                    content,
                    core,
                    with$data(this, format),
                    metadata,
                    with$data(this, validation),
                ].forEach((sch) => this.addMetaSchema(sch, undefined, false));
                return this;
                function with$data(ajv, sch) {
                    return $data ? ajv.$dataMetaSchema(sch, META_SUPPORT_DATA) : sch;
                }
            }
            exports.default = addMetaSchema2020;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/applicator.json":
        /*!*****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/applicator.json ***!
  \*****************************************************************************/
        /*! exports provided: $schema, $id, $vocabulary, $dynamicAnchor, title, type, properties, $defs, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"$id\":\"https://json-schema.org/draft/2020-12/meta/applicator\",\"$vocabulary\":{\"https://json-schema.org/draft/2020-12/vocab/applicator\":true},\"$dynamicAnchor\":\"meta\",\"title\":\"Applicator vocabulary meta-schema\",\"type\":[\"object\",\"boolean\"],\"properties\":{\"prefixItems\":{\"$ref\":\"#/$defs/schemaArray\"},\"items\":{\"$dynamicRef\":\"#meta\"},\"contains\":{\"$dynamicRef\":\"#meta\"},\"additionalProperties\":{\"$dynamicRef\":\"#meta\"},\"properties\":{\"type\":\"object\",\"additionalProperties\":{\"$dynamicRef\":\"#meta\"},\"default\":{}},\"patternProperties\":{\"type\":\"object\",\"additionalProperties\":{\"$dynamicRef\":\"#meta\"},\"propertyNames\":{\"format\":\"regex\"},\"default\":{}},\"dependentSchemas\":{\"type\":\"object\",\"additionalProperties\":{\"$dynamicRef\":\"#meta\"},\"default\":{}},\"propertyNames\":{\"$dynamicRef\":\"#meta\"},\"if\":{\"$dynamicRef\":\"#meta\"},\"then\":{\"$dynamicRef\":\"#meta\"},\"else\":{\"$dynamicRef\":\"#meta\"},\"allOf\":{\"$ref\":\"#/$defs/schemaArray\"},\"anyOf\":{\"$ref\":\"#/$defs/schemaArray\"},\"oneOf\":{\"$ref\":\"#/$defs/schemaArray\"},\"not\":{\"$dynamicRef\":\"#meta\"}},\"$defs\":{\"schemaArray\":{\"type\":\"array\",\"minItems\":1,\"items\":{\"$dynamicRef\":\"#meta\"}}}}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/content.json":
        /*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/content.json ***!
  \**************************************************************************/
        /*! exports provided: $schema, $id, $vocabulary, $dynamicAnchor, title, type, properties, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"$id\":\"https://json-schema.org/draft/2020-12/meta/content\",\"$vocabulary\":{\"https://json-schema.org/draft/2020-12/vocab/content\":true},\"$dynamicAnchor\":\"meta\",\"title\":\"Content vocabulary meta-schema\",\"type\":[\"object\",\"boolean\"],\"properties\":{\"contentEncoding\":{\"type\":\"string\"},\"contentMediaType\":{\"type\":\"string\"},\"contentSchema\":{\"$dynamicRef\":\"#meta\"}}}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/core.json":
        /*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/core.json ***!
  \***********************************************************************/
        /*! exports provided: $schema, $id, $vocabulary, $dynamicAnchor, title, type, properties, $defs, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"$id\":\"https://json-schema.org/draft/2020-12/meta/core\",\"$vocabulary\":{\"https://json-schema.org/draft/2020-12/vocab/core\":true},\"$dynamicAnchor\":\"meta\",\"title\":\"Core vocabulary meta-schema\",\"type\":[\"object\",\"boolean\"],\"properties\":{\"$id\":{\"$ref\":\"#/$defs/uriReferenceString\",\"$comment\":\"Non-empty fragments not allowed.\",\"pattern\":\"^[^#]*#?$\"},\"$schema\":{\"$ref\":\"#/$defs/uriString\"},\"$ref\":{\"$ref\":\"#/$defs/uriReferenceString\"},\"$anchor\":{\"$ref\":\"#/$defs/anchorString\"},\"$dynamicRef\":{\"$ref\":\"#/$defs/uriReferenceString\"},\"$dynamicAnchor\":{\"$ref\":\"#/$defs/anchorString\"},\"$vocabulary\":{\"type\":\"object\",\"propertyNames\":{\"$ref\":\"#/$defs/uriString\"},\"additionalProperties\":{\"type\":\"boolean\"}},\"$comment\":{\"type\":\"string\"},\"$defs\":{\"type\":\"object\",\"additionalProperties\":{\"$dynamicRef\":\"#meta\"}}},\"$defs\":{\"anchorString\":{\"type\":\"string\",\"pattern\":\"^[A-Za-z_][-A-Za-z0-9._]*$\"},\"uriString\":{\"type\":\"string\",\"format\":\"uri\"},\"uriReferenceString\":{\"type\":\"string\",\"format\":\"uri-reference\"}}}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/format-annotation.json":
        /*!************************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/format-annotation.json ***!
  \************************************************************************************/
        /*! exports provided: $schema, $id, $vocabulary, $dynamicAnchor, title, type, properties, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"$id\":\"https://json-schema.org/draft/2020-12/meta/format-annotation\",\"$vocabulary\":{\"https://json-schema.org/draft/2020-12/vocab/format-annotation\":true},\"$dynamicAnchor\":\"meta\",\"title\":\"Format vocabulary meta-schema for annotation results\",\"type\":[\"object\",\"boolean\"],\"properties\":{\"format\":{\"type\":\"string\"}}}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/meta-data.json":
        /*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/meta-data.json ***!
  \****************************************************************************/
        /*! exports provided: $schema, $id, $vocabulary, $dynamicAnchor, title, type, properties, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"$id\":\"https://json-schema.org/draft/2020-12/meta/meta-data\",\"$vocabulary\":{\"https://json-schema.org/draft/2020-12/vocab/meta-data\":true},\"$dynamicAnchor\":\"meta\",\"title\":\"Meta-data vocabulary meta-schema\",\"type\":[\"object\",\"boolean\"],\"properties\":{\"title\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"default\":true,\"deprecated\":{\"type\":\"boolean\",\"default\":false},\"readOnly\":{\"type\":\"boolean\",\"default\":false},\"writeOnly\":{\"type\":\"boolean\",\"default\":false},\"examples\":{\"type\":\"array\",\"items\":true}}}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/unevaluated.json":
        /*!******************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/unevaluated.json ***!
  \******************************************************************************/
        /*! exports provided: $schema, $id, $vocabulary, $dynamicAnchor, title, type, properties, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"$id\":\"https://json-schema.org/draft/2020-12/meta/unevaluated\",\"$vocabulary\":{\"https://json-schema.org/draft/2020-12/vocab/unevaluated\":true},\"$dynamicAnchor\":\"meta\",\"title\":\"Unevaluated applicator vocabulary meta-schema\",\"type\":[\"object\",\"boolean\"],\"properties\":{\"unevaluatedItems\":{\"$dynamicRef\":\"#meta\"},\"unevaluatedProperties\":{\"$dynamicRef\":\"#meta\"}}}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/validation.json":
        /*!*****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/validation.json ***!
  \*****************************************************************************/
        /*! exports provided: $schema, $id, $vocabulary, $dynamicAnchor, title, type, properties, $defs, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"$id\":\"https://json-schema.org/draft/2020-12/meta/validation\",\"$vocabulary\":{\"https://json-schema.org/draft/2020-12/vocab/validation\":true},\"$dynamicAnchor\":\"meta\",\"title\":\"Validation vocabulary meta-schema\",\"type\":[\"object\",\"boolean\"],\"properties\":{\"type\":{\"anyOf\":[{\"$ref\":\"#/$defs/simpleTypes\"},{\"type\":\"array\",\"items\":{\"$ref\":\"#/$defs/simpleTypes\"},\"minItems\":1,\"uniqueItems\":true}]},\"const\":true,\"enum\":{\"type\":\"array\",\"items\":true},\"multipleOf\":{\"type\":\"number\",\"exclusiveMinimum\":0},\"maximum\":{\"type\":\"number\"},\"exclusiveMaximum\":{\"type\":\"number\"},\"minimum\":{\"type\":\"number\"},\"exclusiveMinimum\":{\"type\":\"number\"},\"maxLength\":{\"$ref\":\"#/$defs/nonNegativeInteger\"},\"minLength\":{\"$ref\":\"#/$defs/nonNegativeIntegerDefault0\"},\"pattern\":{\"type\":\"string\",\"format\":\"regex\"},\"maxItems\":{\"$ref\":\"#/$defs/nonNegativeInteger\"},\"minItems\":{\"$ref\":\"#/$defs/nonNegativeIntegerDefault0\"},\"uniqueItems\":{\"type\":\"boolean\",\"default\":false},\"maxContains\":{\"$ref\":\"#/$defs/nonNegativeInteger\"},\"minContains\":{\"$ref\":\"#/$defs/nonNegativeInteger\",\"default\":1},\"maxProperties\":{\"$ref\":\"#/$defs/nonNegativeInteger\"},\"minProperties\":{\"$ref\":\"#/$defs/nonNegativeIntegerDefault0\"},\"required\":{\"$ref\":\"#/$defs/stringArray\"},\"dependentRequired\":{\"type\":\"object\",\"additionalProperties\":{\"$ref\":\"#/$defs/stringArray\"}}},\"$defs\":{\"nonNegativeInteger\":{\"type\":\"integer\",\"minimum\":0},\"nonNegativeIntegerDefault0\":{\"$ref\":\"#/$defs/nonNegativeInteger\",\"default\":0},\"simpleTypes\":{\"enum\":[\"array\",\"boolean\",\"integer\",\"null\",\"number\",\"object\",\"string\"]},\"stringArray\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true,\"default\":[]}}}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/schema.json":
        /*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/schema.json ***!
  \********************************************************************/
        /*! exports provided: $schema, $id, $vocabulary, $dynamicAnchor, title, allOf, type, $comment, properties, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"$id\":\"https://json-schema.org/draft/2020-12/schema\",\"$vocabulary\":{\"https://json-schema.org/draft/2020-12/vocab/core\":true,\"https://json-schema.org/draft/2020-12/vocab/applicator\":true,\"https://json-schema.org/draft/2020-12/vocab/unevaluated\":true,\"https://json-schema.org/draft/2020-12/vocab/validation\":true,\"https://json-schema.org/draft/2020-12/vocab/meta-data\":true,\"https://json-schema.org/draft/2020-12/vocab/format-annotation\":true,\"https://json-schema.org/draft/2020-12/vocab/content\":true},\"$dynamicAnchor\":\"meta\",\"title\":\"Core and Validation specifications meta-schema\",\"allOf\":[{\"$ref\":\"meta/core\"},{\"$ref\":\"meta/applicator\"},{\"$ref\":\"meta/unevaluated\"},{\"$ref\":\"meta/validation\"},{\"$ref\":\"meta/meta-data\"},{\"$ref\":\"meta/format-annotation\"},{\"$ref\":\"meta/content\"}],\"type\":[\"object\",\"boolean\"],\"$comment\":\"This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.\",\"properties\":{\"definitions\":{\"$comment\":\"\\\"definitions\\\" has been replaced by \\\"$defs\\\".\",\"type\":\"object\",\"additionalProperties\":{\"$dynamicRef\":\"#meta\"},\"deprecated\":true,\"default\":{}},\"dependencies\":{\"$comment\":\"\\\"dependencies\\\" has been split and replaced by \\\"dependentSchemas\\\" and \\\"dependentRequired\\\" in order to serve their differing semantics.\",\"type\":\"object\",\"additionalProperties\":{\"anyOf\":[{\"$dynamicRef\":\"#meta\"},{\"$ref\":\"meta/validation#/$defs/stringArray\"}]},\"deprecated\":true,\"default\":{}},\"$recursiveAnchor\":{\"$comment\":\"\\\"$recursiveAnchor\\\" has been replaced by \\\"$dynamicAnchor\\\".\",\"$ref\":\"meta/core#/$defs/anchorString\",\"deprecated\":true},\"$recursiveRef\":{\"$comment\":\"\\\"$recursiveRef\\\" has been replaced by \\\"$dynamicRef\\\".\",\"$ref\":\"meta/core#/$defs/uriReferenceString\",\"deprecated\":true}}}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/refs/json-schema-draft-07.json":
        /*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-draft-07.json ***!
  \**************************************************************/
        /*! exports provided: $schema, $id, title, definitions, type, properties, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-07/schema#\",\"$id\":\"http://json-schema.org/draft-07/schema#\",\"title\":\"Core schema meta-schema\",\"definitions\":{\"schemaArray\":{\"type\":\"array\",\"minItems\":1,\"items\":{\"$ref\":\"#\"}},\"nonNegativeInteger\":{\"type\":\"integer\",\"minimum\":0},\"nonNegativeIntegerDefault0\":{\"allOf\":[{\"$ref\":\"#/definitions/nonNegativeInteger\"},{\"default\":0}]},\"simpleTypes\":{\"enum\":[\"array\",\"boolean\",\"integer\",\"null\",\"number\",\"object\",\"string\"]},\"stringArray\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true,\"default\":[]}},\"type\":[\"object\",\"boolean\"],\"properties\":{\"$id\":{\"type\":\"string\",\"format\":\"uri-reference\"},\"$schema\":{\"type\":\"string\",\"format\":\"uri\"},\"$ref\":{\"type\":\"string\",\"format\":\"uri-reference\"},\"$comment\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"default\":true,\"readOnly\":{\"type\":\"boolean\",\"default\":false},\"examples\":{\"type\":\"array\",\"items\":true},\"multipleOf\":{\"type\":\"number\",\"exclusiveMinimum\":0},\"maximum\":{\"type\":\"number\"},\"exclusiveMaximum\":{\"type\":\"number\"},\"minimum\":{\"type\":\"number\"},\"exclusiveMinimum\":{\"type\":\"number\"},\"maxLength\":{\"$ref\":\"#/definitions/nonNegativeInteger\"},\"minLength\":{\"$ref\":\"#/definitions/nonNegativeIntegerDefault0\"},\"pattern\":{\"type\":\"string\",\"format\":\"regex\"},\"additionalItems\":{\"$ref\":\"#\"},\"items\":{\"anyOf\":[{\"$ref\":\"#\"},{\"$ref\":\"#/definitions/schemaArray\"}],\"default\":true},\"maxItems\":{\"$ref\":\"#/definitions/nonNegativeInteger\"},\"minItems\":{\"$ref\":\"#/definitions/nonNegativeIntegerDefault0\"},\"uniqueItems\":{\"type\":\"boolean\",\"default\":false},\"contains\":{\"$ref\":\"#\"},\"maxProperties\":{\"$ref\":\"#/definitions/nonNegativeInteger\"},\"minProperties\":{\"$ref\":\"#/definitions/nonNegativeIntegerDefault0\"},\"required\":{\"$ref\":\"#/definitions/stringArray\"},\"additionalProperties\":{\"$ref\":\"#\"},\"definitions\":{\"type\":\"object\",\"additionalProperties\":{\"$ref\":\"#\"},\"default\":{}},\"properties\":{\"type\":\"object\",\"additionalProperties\":{\"$ref\":\"#\"},\"default\":{}},\"patternProperties\":{\"type\":\"object\",\"additionalProperties\":{\"$ref\":\"#\"},\"propertyNames\":{\"format\":\"regex\"},\"default\":{}},\"dependencies\":{\"type\":\"object\",\"additionalProperties\":{\"anyOf\":[{\"$ref\":\"#\"},{\"$ref\":\"#/definitions/stringArray\"}]}},\"propertyNames\":{\"$ref\":\"#\"},\"const\":true,\"enum\":{\"type\":\"array\",\"items\":true,\"minItems\":1,\"uniqueItems\":true},\"type\":{\"anyOf\":[{\"$ref\":\"#/definitions/simpleTypes\"},{\"type\":\"array\",\"items\":{\"$ref\":\"#/definitions/simpleTypes\"},\"minItems\":1,\"uniqueItems\":true}]},\"format\":{\"type\":\"string\"},\"contentMediaType\":{\"type\":\"string\"},\"contentEncoding\":{\"type\":\"string\"},\"if\":{\"$ref\":\"#\"},\"then\":{\"$ref\":\"#\"},\"else\":{\"$ref\":\"#\"},\"allOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"anyOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"oneOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"not\":{\"$ref\":\"#\"}},\"default\":true}");

            /***/ }),

        /***/ "./node_modules/ajv/dist/runtime/equal.js":
        /*!************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/equal.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/ajv-validator/ajv/issues/889
            const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
            equal.code = 'require("ajv/dist/runtime/equal").default';
            exports.default = equal;
//# sourceMappingURL=equal.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/runtime/ucs2length.js":
        /*!*****************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/ucs2length.js ***!
  \*****************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
            function ucs2length(str) {
                const len = str.length;
                let length = 0;
                let pos = 0;
                let value;
                while (pos < len) {
                    length++;
                    value = str.charCodeAt(pos++);
                    if (value >= 0xd800 && value <= 0xdbff && pos < len) {
                        // high surrogate, and there is a next character
                        value = str.charCodeAt(pos);
                        if ((value & 0xfc00) === 0xdc00)
                            pos++; // low surrogate
                    }
                }
                return length;
            }
            exports.default = ucs2length;
            ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
//# sourceMappingURL=ucs2length.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/runtime/uri.js":
        /*!**********************************************!*\
  !*** ./node_modules/ajv/dist/runtime/uri.js ***!
  \**********************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const uri = __webpack_require__(/*! uri-js */ "./node_modules/uri-js/dist/es5/uri.all.js");
            uri.code = 'require("ajv/dist/runtime/uri").default';
            exports.default = uri;
//# sourceMappingURL=uri.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/runtime/validation_error.js":
        /*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/validation_error.js ***!
  \***********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            class ValidationError extends Error {
                constructor(errors) {
                    super("validation failed");
                    this.errors = errors;
                    this.ajv = this.validation = true;
                }
            }
            exports.default = ValidationError;
//# sourceMappingURL=validation_error.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js":
        /*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js ***!
  \**************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.validateAdditionalItems = void 0;
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
                params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
            };
            const def = {
                keyword: "additionalItems",
                type: "array",
                schemaType: ["boolean", "object"],
                before: "uniqueItems",
                error,
                code(cxt) {
                    const { parentSchema, it } = cxt;
                    const { items } = parentSchema;
                    if (!Array.isArray(items)) {
                        (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
                        return;
                    }
                    validateAdditionalItems(cxt, items);
                },
            };
            function validateAdditionalItems(cxt, items) {
                const { gen, schema, data, keyword, it } = cxt;
                it.items = true;
                const len = gen.const("len", (0, codegen_1._) `${data}.length`);
                if (schema === false) {
                    cxt.setParams({ len: items.length });
                    cxt.pass((0, codegen_1._) `${len} <= ${items.length}`);
                }
                else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                    const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items.length}`); // TODO var
                    gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
                    cxt.ok(valid);
                }
                function validateItems(valid) {
                    gen.forRange("i", items.length, len, (i) => {
                        cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
                        if (!it.allErrors)
                            gen.if((0, codegen_1.not)(valid), () => gen.break());
                    });
                }
            }
            exports.validateAdditionalItems = validateAdditionalItems;
            exports.default = def;
//# sourceMappingURL=additionalItems.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js":
        /*!*******************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js ***!
  \*******************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: "must NOT have additional properties",
                params: ({ params }) => (0, codegen_1._) `{additionalProperty: ${params.additionalProperty}}`,
            };
            const def = {
                keyword: "additionalProperties",
                type: ["object"],
                schemaType: ["boolean", "object"],
                allowUndefined: true,
                trackErrors: true,
                error,
                code(cxt) {
                    const { gen, schema, parentSchema, data, errsCount, it } = cxt;
                    /* istanbul ignore if */
                    if (!errsCount)
                        throw new Error("ajv implementation error");
                    const { allErrors, opts } = it;
                    it.props = true;
                    if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
                        return;
                    const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
                    const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
                    checkAdditionalProperties();
                    cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
                    function checkAdditionalProperties() {
                        gen.forIn("key", data, (key) => {
                            if (!props.length && !patProps.length)
                                additionalPropertyCode(key);
                            else
                                gen.if(isAdditional(key), () => additionalPropertyCode(key));
                        });
                    }
                    function isAdditional(key) {
                        let definedProp;
                        if (props.length > 8) {
                            // TODO maybe an option instead of hard-coded 8?
                            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
                            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
                        }
                        else if (props.length) {
                            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._) `${key} === ${p}`));
                        }
                        else {
                            definedProp = codegen_1.nil;
                        }
                        if (patProps.length) {
                            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._) `${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
                        }
                        return (0, codegen_1.not)(definedProp);
                    }
                    function deleteAdditional(key) {
                        gen.code((0, codegen_1._) `delete ${data}[${key}]`);
                    }
                    function additionalPropertyCode(key) {
                        if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                            deleteAdditional(key);
                            return;
                        }
                        if (schema === false) {
                            cxt.setParams({ additionalProperty: key });
                            cxt.error();
                            if (!allErrors)
                                gen.break();
                            return;
                        }
                        if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                            const valid = gen.name("valid");
                            if (opts.removeAdditional === "failing") {
                                applyAdditionalSchema(key, valid, false);
                                gen.if((0, codegen_1.not)(valid), () => {
                                    cxt.reset();
                                    deleteAdditional(key);
                                });
                            }
                            else {
                                applyAdditionalSchema(key, valid);
                                if (!allErrors)
                                    gen.if((0, codegen_1.not)(valid), () => gen.break());
                            }
                        }
                    }
                    function applyAdditionalSchema(key, valid, errors) {
                        const subschema = {
                            keyword: "additionalProperties",
                            dataProp: key,
                            dataPropType: util_1.Type.Str,
                        };
                        if (errors === false) {
                            Object.assign(subschema, {
                                compositeRule: true,
                                createErrors: false,
                                allErrors: false,
                            });
                        }
                        cxt.subschema(subschema, valid);
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=additionalProperties.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js":
        /*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/allOf.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const def = {
                keyword: "allOf",
                schemaType: "array",
                code(cxt) {
                    const { gen, schema, it } = cxt;
                    /* istanbul ignore if */
                    if (!Array.isArray(schema))
                        throw new Error("ajv implementation error");
                    const valid = gen.name("valid");
                    schema.forEach((sch, i) => {
                        if ((0, util_1.alwaysValidSchema)(it, sch))
                            return;
                        const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
                        cxt.ok(valid);
                        cxt.mergeEvaluated(schCxt);
                    });
                },
            };
            exports.default = def;
//# sourceMappingURL=allOf.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js":
        /*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/anyOf.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const def = {
                keyword: "anyOf",
                schemaType: "array",
                trackErrors: true,
                code: code_1.validateUnion,
                error: { message: "must match a schema in anyOf" },
            };
            exports.default = def;
//# sourceMappingURL=anyOf.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/contains.js":
        /*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/contains.js ***!
  \*******************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: ({ params: { min, max } }) => max === undefined
                  ? (0, codegen_1.str) `must contain at least ${min} valid item(s)`
                  : (0, codegen_1.str) `must contain at least ${min} and no more than ${max} valid item(s)`,
                params: ({ params: { min, max } }) => max === undefined ? (0, codegen_1._) `{minContains: ${min}}` : (0, codegen_1._) `{minContains: ${min}, maxContains: ${max}}`,
            };
            const def = {
                keyword: "contains",
                type: "array",
                schemaType: ["object", "boolean"],
                before: "uniqueItems",
                trackErrors: true,
                error,
                code(cxt) {
                    const { gen, schema, parentSchema, data, it } = cxt;
                    let min;
                    let max;
                    const { minContains, maxContains } = parentSchema;
                    if (it.opts.next) {
                        min = minContains === undefined ? 1 : minContains;
                        max = maxContains;
                    }
                    else {
                        min = 1;
                    }
                    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
                    cxt.setParams({ min, max });
                    if (max === undefined && min === 0) {
                        (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
                        return;
                    }
                    if (max !== undefined && min > max) {
                        (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
                        cxt.fail();
                        return;
                    }
                    if ((0, util_1.alwaysValidSchema)(it, schema)) {
                        let cond = (0, codegen_1._) `${len} >= ${min}`;
                        if (max !== undefined)
                            cond = (0, codegen_1._) `${cond} && ${len} <= ${max}`;
                        cxt.pass(cond);
                        return;
                    }
                    it.items = true;
                    const valid = gen.name("valid");
                    if (max === undefined && min === 1) {
                        validateItems(valid, () => gen.if(valid, () => gen.break()));
                    }
                    else if (min === 0) {
                        gen.let(valid, true);
                        if (max !== undefined)
                            gen.if((0, codegen_1._) `${data}.length > 0`, validateItemsWithCount);
                    }
                    else {
                        gen.let(valid, false);
                        validateItemsWithCount();
                    }
                    cxt.result(valid, () => cxt.reset());
                    function validateItemsWithCount() {
                        const schValid = gen.name("_valid");
                        const count = gen.let("count", 0);
                        validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
                    }
                    function validateItems(_valid, block) {
                        gen.forRange("i", 0, len, (i) => {
                            cxt.subschema({
                                keyword: "contains",
                                dataProp: i,
                                dataPropType: util_1.Type.Num,
                                compositeRule: true,
                            }, _valid);
                            block();
                        });
                    }
                    function checkLimits(count) {
                        gen.code((0, codegen_1._) `${count}++`);
                        if (max === undefined) {
                            gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true).break());
                        }
                        else {
                            gen.if((0, codegen_1._) `${count} > ${max}`, () => gen.assign(valid, false).break());
                            if (min === 1)
                                gen.assign(valid, true);
                            else
                                gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true));
                        }
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=contains.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js":
        /*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/dependencies.js ***!
  \***********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            exports.error = {
                message: ({ params: { property, depsCount, deps } }) => {
                    const property_ies = depsCount === 1 ? "property" : "properties";
                    return (0, codegen_1.str) `must have ${property_ies} ${deps} when property ${property} is present`;
                },
                params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._) `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
            };
            const def = {
                keyword: "dependencies",
                type: "object",
                schemaType: "object",
                error: exports.error,
                code(cxt) {
                    const [propDeps, schDeps] = splitDependencies(cxt);
                    validatePropertyDeps(cxt, propDeps);
                    validateSchemaDeps(cxt, schDeps);
                },
            };
            function splitDependencies({ schema }) {
                const propertyDeps = {};
                const schemaDeps = {};
                for (const key in schema) {
                    if (key === "__proto__")
                        continue;
                    const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
                    deps[key] = schema[key];
                }
                return [propertyDeps, schemaDeps];
            }
            function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
                const { gen, data, it } = cxt;
                if (Object.keys(propertyDeps).length === 0)
                    return;
                const missing = gen.let("missing");
                for (const prop in propertyDeps) {
                    const deps = propertyDeps[prop];
                    if (deps.length === 0)
                        continue;
                    const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
                    cxt.setParams({
                        property: prop,
                        depsCount: deps.length,
                        deps: deps.join(", "),
                    });
                    if (it.allErrors) {
                        gen.if(hasProperty, () => {
                            for (const depProp of deps) {
                                (0, code_1.checkReportMissingProp)(cxt, depProp);
                            }
                        });
                    }
                    else {
                        gen.if((0, codegen_1._) `${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
                        (0, code_1.reportMissingProp)(cxt, missing);
                        gen.else();
                    }
                }
            }
            exports.validatePropertyDeps = validatePropertyDeps;
            function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
                const { gen, data, keyword, it } = cxt;
                const valid = gen.name("valid");
                for (const prop in schemaDeps) {
                    if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
                        continue;
                    gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
                          const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
                          cxt.mergeValidEvaluated(schCxt, valid);
                      }, () => gen.var(valid, true) // TODO var
                    );
                    cxt.ok(valid);
                }
            }
            exports.validateSchemaDeps = validateSchemaDeps;
            exports.default = def;
//# sourceMappingURL=dependencies.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/dependentSchemas.js":
        /*!***************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/dependentSchemas.js ***!
  \***************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const dependencies_1 = __webpack_require__(/*! ./dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
            const def = {
                keyword: "dependentSchemas",
                type: "object",
                schemaType: "object",
                code: (cxt) => (0, dependencies_1.validateSchemaDeps)(cxt),
            };
            exports.default = def;
//# sourceMappingURL=dependentSchemas.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/if.js":
        /*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/if.js ***!
  \*************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: ({ params }) => (0, codegen_1.str) `must match "${params.ifClause}" schema`,
                params: ({ params }) => (0, codegen_1._) `{failingKeyword: ${params.ifClause}}`,
            };
            const def = {
                keyword: "if",
                schemaType: ["object", "boolean"],
                trackErrors: true,
                error,
                code(cxt) {
                    const { gen, parentSchema, it } = cxt;
                    if (parentSchema.then === undefined && parentSchema.else === undefined) {
                        (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
                    }
                    const hasThen = hasSchema(it, "then");
                    const hasElse = hasSchema(it, "else");
                    if (!hasThen && !hasElse)
                        return;
                    const valid = gen.let("valid", true);
                    const schValid = gen.name("_valid");
                    validateIf();
                    cxt.reset();
                    if (hasThen && hasElse) {
                        const ifClause = gen.let("ifClause");
                        cxt.setParams({ ifClause });
                        gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
                    }
                    else if (hasThen) {
                        gen.if(schValid, validateClause("then"));
                    }
                    else {
                        gen.if((0, codegen_1.not)(schValid), validateClause("else"));
                    }
                    cxt.pass(valid, () => cxt.error(true));
                    function validateIf() {
                        const schCxt = cxt.subschema({
                            keyword: "if",
                            compositeRule: true,
                            createErrors: false,
                            allErrors: false,
                        }, schValid);
                        cxt.mergeEvaluated(schCxt);
                    }
                    function validateClause(keyword, ifClause) {
                        return () => {
                            const schCxt = cxt.subschema({ keyword }, schValid);
                            gen.assign(valid, schValid);
                            cxt.mergeValidEvaluated(schCxt, valid);
                            if (ifClause)
                                gen.assign(ifClause, (0, codegen_1._) `${keyword}`);
                            else
                                cxt.setParams({ ifClause: keyword });
                        };
                    }
                },
            };
            function hasSchema(it, keyword) {
                const schema = it.schema[keyword];
                return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
            }
            exports.default = def;
//# sourceMappingURL=if.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/index.js":
        /*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/index.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
            const prefixItems_1 = __webpack_require__(/*! ./prefixItems */ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js");
            const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
            const items2020_1 = __webpack_require__(/*! ./items2020 */ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js");
            const contains_1 = __webpack_require__(/*! ./contains */ "./node_modules/ajv/dist/vocabularies/applicator/contains.js");
            const dependencies_1 = __webpack_require__(/*! ./dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
            const propertyNames_1 = __webpack_require__(/*! ./propertyNames */ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js");
            const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
            const properties_1 = __webpack_require__(/*! ./properties */ "./node_modules/ajv/dist/vocabularies/applicator/properties.js");
            const patternProperties_1 = __webpack_require__(/*! ./patternProperties */ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js");
            const not_1 = __webpack_require__(/*! ./not */ "./node_modules/ajv/dist/vocabularies/applicator/not.js");
            const anyOf_1 = __webpack_require__(/*! ./anyOf */ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js");
            const oneOf_1 = __webpack_require__(/*! ./oneOf */ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js");
            const allOf_1 = __webpack_require__(/*! ./allOf */ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js");
            const if_1 = __webpack_require__(/*! ./if */ "./node_modules/ajv/dist/vocabularies/applicator/if.js");
            const thenElse_1 = __webpack_require__(/*! ./thenElse */ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js");
            function getApplicator(draft2020 = false) {
                const applicator = [
                    // any
                    not_1.default,
                    anyOf_1.default,
                    oneOf_1.default,
                    allOf_1.default,
                    if_1.default,
                    thenElse_1.default,
                    // object
                    propertyNames_1.default,
                    additionalProperties_1.default,
                    dependencies_1.default,
                    properties_1.default,
                    patternProperties_1.default,
                ];
                // array
                if (draft2020)
                    applicator.push(prefixItems_1.default, items2020_1.default);
                else
                    applicator.push(additionalItems_1.default, items_1.default);
                applicator.push(contains_1.default);
                return applicator;
            }
            exports.default = getApplicator;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/items.js":
        /*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.validateTuple = void 0;
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const def = {
                keyword: "items",
                type: "array",
                schemaType: ["object", "array", "boolean"],
                before: "uniqueItems",
                code(cxt) {
                    const { schema, it } = cxt;
                    if (Array.isArray(schema))
                        return validateTuple(cxt, "additionalItems", schema);
                    it.items = true;
                    if ((0, util_1.alwaysValidSchema)(it, schema))
                        return;
                    cxt.ok((0, code_1.validateArray)(cxt));
                },
            };
            function validateTuple(cxt, extraItems, schArr = cxt.schema) {
                const { gen, parentSchema, data, keyword, it } = cxt;
                checkStrictTuple(parentSchema);
                if (it.opts.unevaluated && schArr.length && it.items !== true) {
                    it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
                }
                const valid = gen.name("valid");
                const len = gen.const("len", (0, codegen_1._) `${data}.length`);
                schArr.forEach((sch, i) => {
                    if ((0, util_1.alwaysValidSchema)(it, sch))
                        return;
                    gen.if((0, codegen_1._) `${len} > ${i}`, () => cxt.subschema({
                        keyword,
                        schemaProp: i,
                        dataProp: i,
                    }, valid));
                    cxt.ok(valid);
                });
                function checkStrictTuple(sch) {
                    const { opts, errSchemaPath } = it;
                    const l = schArr.length;
                    const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
                    if (opts.strictTuples && !fullTuple) {
                        const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
                        (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
                    }
                }
            }
            exports.validateTuple = validateTuple;
            exports.default = def;
//# sourceMappingURL=items.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js":
        /*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items2020.js ***!
  \********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
            const error = {
                message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
                params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
            };
            const def = {
                keyword: "items",
                type: "array",
                schemaType: ["object", "boolean"],
                before: "uniqueItems",
                error,
                code(cxt) {
                    const { schema, parentSchema, it } = cxt;
                    const { prefixItems } = parentSchema;
                    it.items = true;
                    if ((0, util_1.alwaysValidSchema)(it, schema))
                        return;
                    if (prefixItems)
                        (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
                    else
                        cxt.ok((0, code_1.validateArray)(cxt));
                },
            };
            exports.default = def;
//# sourceMappingURL=items2020.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/not.js":
        /*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/not.js ***!
  \**************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const def = {
                keyword: "not",
                schemaType: ["object", "boolean"],
                trackErrors: true,
                code(cxt) {
                    const { gen, schema, it } = cxt;
                    if ((0, util_1.alwaysValidSchema)(it, schema)) {
                        cxt.fail();
                        return;
                    }
                    const valid = gen.name("valid");
                    cxt.subschema({
                        keyword: "not",
                        compositeRule: true,
                        createErrors: false,
                        allErrors: false,
                    }, valid);
                    cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
                },
                error: { message: "must NOT be valid" },
            };
            exports.default = def;
//# sourceMappingURL=not.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js":
        /*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/oneOf.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: "must match exactly one schema in oneOf",
                params: ({ params }) => (0, codegen_1._) `{passingSchemas: ${params.passing}}`,
            };
            const def = {
                keyword: "oneOf",
                schemaType: "array",
                trackErrors: true,
                error,
                code(cxt) {
                    const { gen, schema, parentSchema, it } = cxt;
                    /* istanbul ignore if */
                    if (!Array.isArray(schema))
                        throw new Error("ajv implementation error");
                    if (it.opts.discriminator && parentSchema.discriminator)
                        return;
                    const schArr = schema;
                    const valid = gen.let("valid", false);
                    const passing = gen.let("passing", null);
                    const schValid = gen.name("_valid");
                    cxt.setParams({ passing });
                    // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
                    gen.block(validateOneOf);
                    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
                    function validateOneOf() {
                        schArr.forEach((sch, i) => {
                            let schCxt;
                            if ((0, util_1.alwaysValidSchema)(it, sch)) {
                                gen.var(schValid, true);
                            }
                            else {
                                schCxt = cxt.subschema({
                                    keyword: "oneOf",
                                    schemaProp: i,
                                    compositeRule: true,
                                }, schValid);
                            }
                            if (i > 0) {
                                gen
                                .if((0, codegen_1._) `${schValid} && ${valid}`)
                                .assign(valid, false)
                                .assign(passing, (0, codegen_1._) `[${passing}, ${i}]`)
                                .else();
                            }
                            gen.if(schValid, () => {
                                gen.assign(valid, true);
                                gen.assign(passing, i);
                                if (schCxt)
                                    cxt.mergeEvaluated(schCxt, codegen_1.Name);
                            });
                        });
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=oneOf.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js":
        /*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js ***!
  \****************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const util_2 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const def = {
                keyword: "patternProperties",
                type: "object",
                schemaType: "object",
                code(cxt) {
                    const { gen, schema, data, parentSchema, it } = cxt;
                    const { opts } = it;
                    const patterns = (0, code_1.allSchemaProperties)(schema);
                    const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
                    if (patterns.length === 0 ||
                      (alwaysValidPatterns.length === patterns.length &&
                        (!it.opts.unevaluated || it.props === true))) {
                        return;
                    }
                    const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
                    const valid = gen.name("valid");
                    if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
                        it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
                    }
                    const { props } = it;
                    validatePatternProperties();
                    function validatePatternProperties() {
                        for (const pat of patterns) {
                            if (checkProperties)
                                checkMatchingProperties(pat);
                            if (it.allErrors) {
                                validateProperties(pat);
                            }
                            else {
                                gen.var(valid, true); // TODO var
                                validateProperties(pat);
                                gen.if(valid);
                            }
                        }
                    }
                    function checkMatchingProperties(pat) {
                        for (const prop in checkProperties) {
                            if (new RegExp(pat).test(prop)) {
                                (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                            }
                        }
                    }
                    function validateProperties(pat) {
                        gen.forIn("key", data, (key) => {
                            gen.if((0, codegen_1._) `${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                                const alwaysValid = alwaysValidPatterns.includes(pat);
                                if (!alwaysValid) {
                                    cxt.subschema({
                                        keyword: "patternProperties",
                                        schemaProp: pat,
                                        dataProp: key,
                                        dataPropType: util_2.Type.Str,
                                    }, valid);
                                }
                                if (it.opts.unevaluated && props !== true) {
                                    gen.assign((0, codegen_1._) `${props}[${key}]`, true);
                                }
                                else if (!alwaysValid && !it.allErrors) {
                                    // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                                    // or if all properties were evaluated (props === true)
                                    gen.if((0, codegen_1.not)(valid), () => gen.break());
                                }
                            });
                        });
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=patternProperties.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js ***!
  \**********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
            const def = {
                keyword: "prefixItems",
                type: "array",
                schemaType: ["array"],
                before: "uniqueItems",
                code: (cxt) => (0, items_1.validateTuple)(cxt, "items"),
            };
            exports.default = def;
//# sourceMappingURL=prefixItems.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/properties.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/properties.js ***!
  \*********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const validate_1 = __webpack_require__(/*! ../../compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
            const def = {
                keyword: "properties",
                type: "object",
                schemaType: "object",
                code(cxt) {
                    const { gen, schema, parentSchema, data, it } = cxt;
                    if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
                        additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
                    }
                    const allProps = (0, code_1.allSchemaProperties)(schema);
                    for (const prop of allProps) {
                        it.definedProperties.add(prop);
                    }
                    if (it.opts.unevaluated && allProps.length && it.props !== true) {
                        it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
                    }
                    const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
                    if (properties.length === 0)
                        return;
                    const valid = gen.name("valid");
                    for (const prop of properties) {
                        if (hasDefault(prop)) {
                            applyPropertySchema(prop);
                        }
                        else {
                            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
                            applyPropertySchema(prop);
                            if (!it.allErrors)
                                gen.else().var(valid, true);
                            gen.endIf();
                        }
                        cxt.it.definedProperties.add(prop);
                        cxt.ok(valid);
                    }
                    function hasDefault(prop) {
                        return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
                    }
                    function applyPropertySchema(prop) {
                        cxt.subschema({
                            keyword: "properties",
                            schemaProp: prop,
                            dataProp: prop,
                        }, valid);
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=properties.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js":
        /*!************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js ***!
  \************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: "property name must be valid",
                params: ({ params }) => (0, codegen_1._) `{propertyName: ${params.propertyName}}`,
            };
            const def = {
                keyword: "propertyNames",
                type: "object",
                schemaType: ["object", "boolean"],
                error,
                code(cxt) {
                    const { gen, schema, data, it } = cxt;
                    if ((0, util_1.alwaysValidSchema)(it, schema))
                        return;
                    const valid = gen.name("valid");
                    gen.forIn("key", data, (key) => {
                        cxt.setParams({ propertyName: key });
                        cxt.subschema({
                            keyword: "propertyNames",
                            data: key,
                            dataTypes: ["string"],
                            propertyName: key,
                            compositeRule: true,
                        }, valid);
                        gen.if((0, codegen_1.not)(valid), () => {
                            cxt.error(true);
                            if (!it.allErrors)
                                gen.break();
                        });
                    });
                    cxt.ok(valid);
                },
            };
            exports.default = def;
//# sourceMappingURL=propertyNames.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js":
        /*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/thenElse.js ***!
  \*******************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const def = {
                keyword: ["then", "else"],
                schemaType: ["object", "boolean"],
                code({ keyword, parentSchema, it }) {
                    if (parentSchema.if === undefined)
                        (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
                },
            };
            exports.default = def;
//# sourceMappingURL=thenElse.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/code.js":
        /*!****************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/code.js ***!
  \****************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
            const codegen_1 = __webpack_require__(/*! ../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const names_1 = __webpack_require__(/*! ../compile/names */ "./node_modules/ajv/dist/compile/names.js");
            const util_2 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            function checkReportMissingProp(cxt, prop) {
                const { gen, data, it } = cxt;
                gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
                    cxt.setParams({ missingProperty: (0, codegen_1._) `${prop}` }, true);
                    cxt.error();
                });
            }
            exports.checkReportMissingProp = checkReportMissingProp;
            function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
                return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._) `${missing} = ${prop}`)));
            }
            exports.checkMissingProp = checkMissingProp;
            function reportMissingProp(cxt, missing) {
                cxt.setParams({ missingProperty: missing }, true);
                cxt.error();
            }
            exports.reportMissingProp = reportMissingProp;
            function hasPropFunc(gen) {
                return gen.scopeValue("func", {
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    ref: Object.prototype.hasOwnProperty,
                    code: (0, codegen_1._) `Object.prototype.hasOwnProperty`,
                });
            }
            exports.hasPropFunc = hasPropFunc;
            function isOwnProperty(gen, data, property) {
                return (0, codegen_1._) `${hasPropFunc(gen)}.call(${data}, ${property})`;
            }
            exports.isOwnProperty = isOwnProperty;
            function propertyInData(gen, data, property, ownProperties) {
                const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
                return ownProperties ? (0, codegen_1._) `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
            }
            exports.propertyInData = propertyInData;
            function noPropertyInData(gen, data, property, ownProperties) {
                const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} === undefined`;
                return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
            }
            exports.noPropertyInData = noPropertyInData;
            function allSchemaProperties(schemaMap) {
                return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
            }
            exports.allSchemaProperties = allSchemaProperties;
            function schemaProperties(it, schemaMap) {
                return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
            }
            exports.schemaProperties = schemaProperties;
            function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
                const dataAndSchema = passSchema ? (0, codegen_1._) `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
                const valCxt = [
                    [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
                    [names_1.default.parentData, it.parentData],
                    [names_1.default.parentDataProperty, it.parentDataProperty],
                    [names_1.default.rootData, names_1.default.rootData],
                ];
                if (it.opts.dynamicRef)
                    valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
                const args = (0, codegen_1._) `${dataAndSchema}, ${gen.object(...valCxt)}`;
                return context !== codegen_1.nil ? (0, codegen_1._) `${func}.call(${context}, ${args})` : (0, codegen_1._) `${func}(${args})`;
            }
            exports.callValidateCode = callValidateCode;
            const newRegExp = (0, codegen_1._) `new RegExp`;
            function usePattern({ gen, it: { opts } }, pattern) {
                const u = opts.unicodeRegExp ? "u" : "";
                const { regExp } = opts.code;
                const rx = regExp(pattern, u);
                return gen.scopeValue("pattern", {
                    key: rx.toString(),
                    ref: rx,
                    code: (0, codegen_1._) `${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`,
                });
            }
            exports.usePattern = usePattern;
            function validateArray(cxt) {
                const { gen, data, keyword, it } = cxt;
                const valid = gen.name("valid");
                if (it.allErrors) {
                    const validArr = gen.let("valid", true);
                    validateItems(() => gen.assign(validArr, false));
                    return validArr;
                }
                gen.var(valid, true);
                validateItems(() => gen.break());
                return valid;
                function validateItems(notValid) {
                    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
                    gen.forRange("i", 0, len, (i) => {
                        cxt.subschema({
                            keyword,
                            dataProp: i,
                            dataPropType: util_1.Type.Num,
                        }, valid);
                        gen.if((0, codegen_1.not)(valid), notValid);
                    });
                }
            }
            exports.validateArray = validateArray;
            function validateUnion(cxt) {
                const { gen, schema, keyword, it } = cxt;
                /* istanbul ignore if */
                if (!Array.isArray(schema))
                    throw new Error("ajv implementation error");
                const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
                if (alwaysValid && !it.opts.unevaluated)
                    return;
                const valid = gen.let("valid", false);
                const schValid = gen.name("_valid");
                gen.block(() => schema.forEach((_sch, i) => {
                    const schCxt = cxt.subschema({
                        keyword,
                        schemaProp: i,
                        compositeRule: true,
                    }, schValid);
                    gen.assign(valid, (0, codegen_1._) `${valid} || ${schValid}`);
                    const merged = cxt.mergeValidEvaluated(schCxt, schValid);
                    // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
                    // or if all properties and items were evaluated (it.props === true && it.items === true)
                    if (!merged)
                        gen.if((0, codegen_1.not)(valid));
                }));
                cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
            }
            exports.validateUnion = validateUnion;
//# sourceMappingURL=code.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/core/id.js":
        /*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/id.js ***!
  \*******************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const def = {
                keyword: "id",
                code() {
                    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
                },
            };
            exports.default = def;
//# sourceMappingURL=id.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/core/index.js":
        /*!**********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/index.js ***!
  \**********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const id_1 = __webpack_require__(/*! ./id */ "./node_modules/ajv/dist/vocabularies/core/id.js");
            const ref_1 = __webpack_require__(/*! ./ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
            const core = [
                "$schema",
                "$id",
                "$defs",
                "$vocabulary",
                { keyword: "$comment" },
                "definitions",
                id_1.default,
                ref_1.default,
            ];
            exports.default = core;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/core/ref.js":
        /*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/ref.js ***!
  \********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.callRef = exports.getValidate = void 0;
            const ref_error_1 = __webpack_require__(/*! ../../compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
            const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const def = {
                keyword: "$ref",
                schemaType: "string",
                code(cxt) {
                    const { gen, schema: $ref, it } = cxt;
                    const { baseId, schemaEnv: env, validateName, opts, self } = it;
                    const { root } = env;
                    if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
                        return callRootRef();
                    const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
                    if (schOrEnv === undefined)
                        throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
                    if (schOrEnv instanceof compile_1.SchemaEnv)
                        return callValidate(schOrEnv);
                    return inlineRefSchema(schOrEnv);
                    function callRootRef() {
                        if (env === root)
                            return callRef(cxt, validateName, env, env.$async);
                        const rootName = gen.scopeValue("root", { ref: root });
                        return callRef(cxt, (0, codegen_1._) `${rootName}.validate`, root, root.$async);
                    }
                    function callValidate(sch) {
                        const v = getValidate(cxt, sch);
                        callRef(cxt, v, sch, sch.$async);
                    }
                    function inlineRefSchema(sch) {
                        const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
                        const valid = gen.name("valid");
                        const schCxt = cxt.subschema({
                            schema: sch,
                            dataTypes: [],
                            schemaPath: codegen_1.nil,
                            topSchemaRef: schName,
                            errSchemaPath: $ref,
                        }, valid);
                        cxt.mergeEvaluated(schCxt);
                        cxt.ok(valid);
                    }
                },
            };
            function getValidate(cxt, sch) {
                const { gen } = cxt;
                return sch.validate
                  ? gen.scopeValue("validate", { ref: sch.validate })
                  : (0, codegen_1._) `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
            }
            exports.getValidate = getValidate;
            function callRef(cxt, v, sch, $async) {
                const { gen, it } = cxt;
                const { allErrors, schemaEnv: env, opts } = it;
                const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
                if ($async)
                    callAsyncRef();
                else
                    callSyncRef();
                function callAsyncRef() {
                    if (!env.$async)
                        throw new Error("async schema referenced by sync schema");
                    const valid = gen.let("valid");
                    gen.try(() => {
                        gen.code((0, codegen_1._) `await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
                        addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
                        if (!allErrors)
                            gen.assign(valid, true);
                    }, (e) => {
                        gen.if((0, codegen_1._) `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
                        addErrorsFrom(e);
                        if (!allErrors)
                            gen.assign(valid, false);
                    });
                    cxt.ok(valid);
                }
                function callSyncRef() {
                    cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
                }
                function addErrorsFrom(source) {
                    const errs = (0, codegen_1._) `${source}.errors`;
                    gen.assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
                    gen.assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
                }
                function addEvaluatedFrom(source) {
                    var _a;
                    if (!it.opts.unevaluated)
                        return;
                    const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
                    // TODO refactor
                    if (it.props !== true) {
                        if (schEvaluated && !schEvaluated.dynamicProps) {
                            if (schEvaluated.props !== undefined) {
                                it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                            }
                        }
                        else {
                            const props = gen.var("props", (0, codegen_1._) `${source}.evaluated.props`);
                            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
                        }
                    }
                    if (it.items !== true) {
                        if (schEvaluated && !schEvaluated.dynamicItems) {
                            if (schEvaluated.items !== undefined) {
                                it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                            }
                        }
                        else {
                            const items = gen.var("items", (0, codegen_1._) `${source}.evaluated.items`);
                            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
                        }
                    }
                }
            }
            exports.callRef = callRef;
            exports.default = def;
//# sourceMappingURL=ref.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/discriminator/index.js":
        /*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/index.js ***!
  \*******************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const types_1 = __webpack_require__(/*! ../discriminator/types */ "./node_modules/ajv/dist/vocabularies/discriminator/types.js");
            const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
                  ? `tag "${tagName}" must be string`
                  : `value of tag "${tagName}" must be in oneOf`,
                params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._) `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
            };
            const def = {
                keyword: "discriminator",
                type: "object",
                schemaType: "object",
                error,
                code(cxt) {
                    const { gen, data, schema, parentSchema, it } = cxt;
                    const { oneOf } = parentSchema;
                    if (!it.opts.discriminator) {
                        throw new Error("discriminator: requires discriminator option");
                    }
                    const tagName = schema.propertyName;
                    if (typeof tagName != "string")
                        throw new Error("discriminator: requires propertyName");
                    if (schema.mapping)
                        throw new Error("discriminator: mapping is not supported");
                    if (!oneOf)
                        throw new Error("discriminator: requires oneOf keyword");
                    const valid = gen.let("valid", false);
                    const tag = gen.const("tag", (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(tagName)}`);
                    gen.if((0, codegen_1._) `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
                    cxt.ok(valid);
                    function validateMapping() {
                        const mapping = getMapping();
                        gen.if(false);
                        for (const tagValue in mapping) {
                            gen.elseIf((0, codegen_1._) `${tag} === ${tagValue}`);
                            gen.assign(valid, applyTagSchema(mapping[tagValue]));
                        }
                        gen.else();
                        cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
                        gen.endIf();
                    }
                    function applyTagSchema(schemaProp) {
                        const _valid = gen.name("valid");
                        const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
                        return _valid;
                    }
                    function getMapping() {
                        var _a;
                        const oneOfMapping = {};
                        const topRequired = hasRequired(parentSchema);
                        let tagRequired = true;
                        for (let i = 0; i < oneOf.length; i++) {
                            let sch = oneOf[i];
                            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                                sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
                                if (sch instanceof compile_1.SchemaEnv)
                                    sch = sch.schema;
                            }
                            const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                            if (typeof propSch != "object") {
                                throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
                            }
                            tagRequired = tagRequired && (topRequired || hasRequired(sch));
                            addMappings(propSch, i);
                        }
                        if (!tagRequired)
                            throw new Error(`discriminator: "${tagName}" must be required`);
                        return oneOfMapping;
                        function hasRequired({ required }) {
                            return Array.isArray(required) && required.includes(tagName);
                        }
                        function addMappings(sch, i) {
                            if (sch.const) {
                                addMapping(sch.const, i);
                            }
                            else if (sch.enum) {
                                for (const tagValue of sch.enum) {
                                    addMapping(tagValue, i);
                                }
                            }
                            else {
                                throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                            }
                        }
                        function addMapping(tagValue, i) {
                            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                                throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                            }
                            oneOfMapping[tagValue] = i;
                        }
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/discriminator/types.js":
        /*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/types.js ***!
  \*******************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.DiscrError = void 0;
            var DiscrError;
            (function (DiscrError) {
                DiscrError["Tag"] = "tag";
                DiscrError["Mapping"] = "mapping";
            })(DiscrError = exports.DiscrError || (exports.DiscrError = {}));
//# sourceMappingURL=types.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/draft2020.js":
        /*!*********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/draft2020.js ***!
  \*********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/vocabularies/core/index.js");
            const validation_1 = __webpack_require__(/*! ./validation */ "./node_modules/ajv/dist/vocabularies/validation/index.js");
            const applicator_1 = __webpack_require__(/*! ./applicator */ "./node_modules/ajv/dist/vocabularies/applicator/index.js");
            const dynamic_1 = __webpack_require__(/*! ./dynamic */ "./node_modules/ajv/dist/vocabularies/dynamic/index.js");
            const next_1 = __webpack_require__(/*! ./next */ "./node_modules/ajv/dist/vocabularies/next.js");
            const unevaluated_1 = __webpack_require__(/*! ./unevaluated */ "./node_modules/ajv/dist/vocabularies/unevaluated/index.js");
            const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/index.js");
            const metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/ajv/dist/vocabularies/metadata.js");
            const draft2020Vocabularies = [
                dynamic_1.default,
                core_1.default,
                validation_1.default,
                (0, applicator_1.default)(true),
                format_1.default,
                metadata_1.metadataVocabulary,
                metadata_1.contentVocabulary,
                next_1.default,
                unevaluated_1.default,
            ];
            exports.default = draft2020Vocabularies;
//# sourceMappingURL=draft2020.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/draft7.js":
        /*!******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/draft7.js ***!
  \******************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/vocabularies/core/index.js");
            const validation_1 = __webpack_require__(/*! ./validation */ "./node_modules/ajv/dist/vocabularies/validation/index.js");
            const applicator_1 = __webpack_require__(/*! ./applicator */ "./node_modules/ajv/dist/vocabularies/applicator/index.js");
            const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/index.js");
            const metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/ajv/dist/vocabularies/metadata.js");
            const draft7Vocabularies = [
                core_1.default,
                validation_1.default,
                (0, applicator_1.default)(),
                format_1.default,
                metadata_1.metadataVocabulary,
                metadata_1.contentVocabulary,
            ];
            exports.default = draft7Vocabularies;
//# sourceMappingURL=draft7.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js ***!
  \*********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.dynamicAnchor = void 0;
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
            const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
            const ref_1 = __webpack_require__(/*! ../core/ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
            const def = {
                keyword: "$dynamicAnchor",
                schemaType: "string",
                code: (cxt) => dynamicAnchor(cxt, cxt.schema),
            };
            function dynamicAnchor(cxt, anchor) {
                const { gen, it } = cxt;
                it.schemaEnv.root.dynamicAnchors[anchor] = true;
                const v = (0, codegen_1._) `${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`;
                const validate = it.errSchemaPath === "#" ? it.validateName : _getValidate(cxt);
                gen.if((0, codegen_1._) `!${v}`, () => gen.assign(v, validate));
            }
            exports.dynamicAnchor = dynamicAnchor;
            function _getValidate(cxt) {
                const { schemaEnv, schema, self } = cxt.it;
                const { root, baseId, localRefs, meta } = schemaEnv.root;
                const { schemaId } = self.opts;
                const sch = new compile_1.SchemaEnv({ schema, schemaId, root, baseId, localRefs, meta });
                compile_1.compileSchema.call(self, sch);
                return (0, ref_1.getValidate)(cxt, sch);
            }
            exports.default = def;
//# sourceMappingURL=dynamicAnchor.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js":
        /*!******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js ***!
  \******************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.dynamicRef = void 0;
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
            const ref_1 = __webpack_require__(/*! ../core/ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
            const def = {
                keyword: "$dynamicRef",
                schemaType: "string",
                code: (cxt) => dynamicRef(cxt, cxt.schema),
            };
            function dynamicRef(cxt, ref) {
                const { gen, keyword, it } = cxt;
                if (ref[0] !== "#")
                    throw new Error(`"${keyword}" only supports hash fragment reference`);
                const anchor = ref.slice(1);
                if (it.allErrors) {
                    _dynamicRef();
                }
                else {
                    const valid = gen.let("valid", false);
                    _dynamicRef(valid);
                    cxt.ok(valid);
                }
                function _dynamicRef(valid) {
                    // TODO the assumption here is that `recursiveRef: #` always points to the root
                    // of the schema object, which is not correct, because there may be $id that
                    // makes # point to it, and the target schema may not contain dynamic/recursiveAnchor.
                    // Because of that 2 tests in recursiveRef.json fail.
                    // This is a similar problem to #815 (`$id` doesn't alter resolution scope for `{ "$ref": "#" }`).
                    // (This problem is not tested in JSON-Schema-Test-Suite)
                    if (it.schemaEnv.root.dynamicAnchors[anchor]) {
                        const v = gen.let("_v", (0, codegen_1._) `${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`);
                        gen.if(v, _callRef(v, valid), _callRef(it.validateName, valid));
                    }
                    else {
                        _callRef(it.validateName, valid)();
                    }
                }
                function _callRef(validate, valid) {
                    return valid
                      ? () => gen.block(() => {
                          (0, ref_1.callRef)(cxt, validate);
                          gen.let(valid, true);
                      })
                      : () => (0, ref_1.callRef)(cxt, validate);
                }
            }
            exports.dynamicRef = dynamicRef;
            exports.default = def;
//# sourceMappingURL=dynamicRef.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/dynamic/index.js":
        /*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/index.js ***!
  \*************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const dynamicAnchor_1 = __webpack_require__(/*! ./dynamicAnchor */ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js");
            const dynamicRef_1 = __webpack_require__(/*! ./dynamicRef */ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js");
            const recursiveAnchor_1 = __webpack_require__(/*! ./recursiveAnchor */ "./node_modules/ajv/dist/vocabularies/dynamic/recursiveAnchor.js");
            const recursiveRef_1 = __webpack_require__(/*! ./recursiveRef */ "./node_modules/ajv/dist/vocabularies/dynamic/recursiveRef.js");
            const dynamic = [dynamicAnchor_1.default, dynamicRef_1.default, recursiveAnchor_1.default, recursiveRef_1.default];
            exports.default = dynamic;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/dynamic/recursiveAnchor.js":
        /*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/recursiveAnchor.js ***!
  \***********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const dynamicAnchor_1 = __webpack_require__(/*! ./dynamicAnchor */ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const def = {
                keyword: "$recursiveAnchor",
                schemaType: "boolean",
                code(cxt) {
                    if (cxt.schema)
                        (0, dynamicAnchor_1.dynamicAnchor)(cxt, "");
                    else
                        (0, util_1.checkStrictMode)(cxt.it, "$recursiveAnchor: false is ignored");
                },
            };
            exports.default = def;
//# sourceMappingURL=recursiveAnchor.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/dynamic/recursiveRef.js":
        /*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/recursiveRef.js ***!
  \********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const dynamicRef_1 = __webpack_require__(/*! ./dynamicRef */ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js");
            const def = {
                keyword: "$recursiveRef",
                schemaType: "string",
                code: (cxt) => (0, dynamicRef_1.dynamicRef)(cxt, cxt.schema),
            };
            exports.default = def;
//# sourceMappingURL=recursiveRef.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/format/format.js":
        /*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/format.js ***!
  \*************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const error = {
                message: ({ schemaCode }) => (0, codegen_1.str) `must match format "${schemaCode}"`,
                params: ({ schemaCode }) => (0, codegen_1._) `{format: ${schemaCode}}`,
            };
            const def = {
                keyword: "format",
                type: ["number", "string"],
                schemaType: "string",
                $data: true,
                error,
                code(cxt, ruleType) {
                    const { gen, data, $data, schema, schemaCode, it } = cxt;
                    const { opts, errSchemaPath, schemaEnv, self } = it;
                    if (!opts.validateFormats)
                        return;
                    if ($data)
                        validate$DataFormat();
                    else
                        validateFormat();
                    function validate$DataFormat() {
                        const fmts = gen.scopeValue("formats", {
                            ref: self.formats,
                            code: opts.code.formats,
                        });
                        const fDef = gen.const("fDef", (0, codegen_1._) `${fmts}[${schemaCode}]`);
                        const fType = gen.let("fType");
                        const format = gen.let("format");
                        // TODO simplify
                        gen.if((0, codegen_1._) `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._) `${fDef}.type || "string"`).assign(format, (0, codegen_1._) `${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._) `"string"`).assign(format, fDef));
                        cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
                        function unknownFmt() {
                            if (opts.strictSchema === false)
                                return codegen_1.nil;
                            return (0, codegen_1._) `${schemaCode} && !${format}`;
                        }
                        function invalidFmt() {
                            const callFormat = schemaEnv.$async
                              ? (0, codegen_1._) `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                              : (0, codegen_1._) `${format}(${data})`;
                            const validData = (0, codegen_1._) `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                            return (0, codegen_1._) `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
                        }
                    }
                    function validateFormat() {
                        const formatDef = self.formats[schema];
                        if (!formatDef) {
                            unknownFormat();
                            return;
                        }
                        if (formatDef === true)
                            return;
                        const [fmtType, format, fmtRef] = getFormat(formatDef);
                        if (fmtType === ruleType)
                            cxt.pass(validCondition());
                        function unknownFormat() {
                            if (opts.strictSchema === false) {
                                self.logger.warn(unknownMsg());
                                return;
                            }
                            throw new Error(unknownMsg());
                            function unknownMsg() {
                                return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                            }
                        }
                        function getFormat(fmtDef) {
                            const code = fmtDef instanceof RegExp
                              ? (0, codegen_1.regexpCode)(fmtDef)
                              : opts.code.formats
                                ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(schema)}`
                                : undefined;
                            const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                                return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._) `${fmt}.validate`];
                            }
                            return ["string", fmtDef, fmt];
                        }
                        function validCondition() {
                            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                                if (!schemaEnv.$async)
                                    throw new Error("async format in sync schema");
                                return (0, codegen_1._) `await ${fmtRef}(${data})`;
                            }
                            return typeof format == "function" ? (0, codegen_1._) `${fmtRef}(${data})` : (0, codegen_1._) `${fmtRef}.test(${data})`;
                        }
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=format.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/format/index.js":
        /*!************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/index.js ***!
  \************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/format.js");
            const format = [format_1.default];
            exports.default = format;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/metadata.js":
        /*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/metadata.js ***!
  \********************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.contentVocabulary = exports.metadataVocabulary = void 0;
            exports.metadataVocabulary = [
                "title",
                "description",
                "default",
                "deprecated",
                "readOnly",
                "writeOnly",
                "examples",
            ];
            exports.contentVocabulary = [
                "contentMediaType",
                "contentEncoding",
                "contentSchema",
            ];
//# sourceMappingURL=metadata.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/next.js":
        /*!****************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/next.js ***!
  \****************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const dependentRequired_1 = __webpack_require__(/*! ./validation/dependentRequired */ "./node_modules/ajv/dist/vocabularies/validation/dependentRequired.js");
            const dependentSchemas_1 = __webpack_require__(/*! ./applicator/dependentSchemas */ "./node_modules/ajv/dist/vocabularies/applicator/dependentSchemas.js");
            const limitContains_1 = __webpack_require__(/*! ./validation/limitContains */ "./node_modules/ajv/dist/vocabularies/validation/limitContains.js");
            const next = [dependentRequired_1.default, dependentSchemas_1.default, limitContains_1.default];
            exports.default = next;
//# sourceMappingURL=next.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/unevaluated/index.js":
        /*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/unevaluated/index.js ***!
  \*****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const unevaluatedProperties_1 = __webpack_require__(/*! ./unevaluatedProperties */ "./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.js");
            const unevaluatedItems_1 = __webpack_require__(/*! ./unevaluatedItems */ "./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.js");
            const unevaluated = [unevaluatedProperties_1.default, unevaluatedItems_1.default];
            exports.default = unevaluated;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.js":
        /*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.js ***!
  \****************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
                params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
            };
            const def = {
                keyword: "unevaluatedItems",
                type: "array",
                schemaType: ["boolean", "object"],
                error,
                code(cxt) {
                    const { gen, schema, data, it } = cxt;
                    const items = it.items || 0;
                    if (items === true)
                        return;
                    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
                    if (schema === false) {
                        cxt.setParams({ len: items });
                        cxt.fail((0, codegen_1._) `${len} > ${items}`);
                    }
                    else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                        const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items}`);
                        gen.if((0, codegen_1.not)(valid), () => validateItems(valid, items));
                        cxt.ok(valid);
                    }
                    it.items = true;
                    function validateItems(valid, from) {
                        gen.forRange("i", from, len, (i) => {
                            cxt.subschema({ keyword: "unevaluatedItems", dataProp: i, dataPropType: util_1.Type.Num }, valid);
                            if (!it.allErrors)
                                gen.if((0, codegen_1.not)(valid), () => gen.break());
                        });
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=unevaluatedItems.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.js":
        /*!*********************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.js ***!
  \*********************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
            const error = {
                message: "must NOT have unevaluated properties",
                params: ({ params }) => (0, codegen_1._) `{unevaluatedProperty: ${params.unevaluatedProperty}}`,
            };
            const def = {
                keyword: "unevaluatedProperties",
                type: "object",
                schemaType: ["boolean", "object"],
                trackErrors: true,
                error,
                code(cxt) {
                    const { gen, schema, data, errsCount, it } = cxt;
                    /* istanbul ignore if */
                    if (!errsCount)
                        throw new Error("ajv implementation error");
                    const { allErrors, props } = it;
                    if (props instanceof codegen_1.Name) {
                        gen.if((0, codegen_1._) `${props} !== true`, () => gen.forIn("key", data, (key) => gen.if(unevaluatedDynamic(props, key), () => unevaluatedPropCode(key))));
                    }
                    else if (props !== true) {
                        gen.forIn("key", data, (key) => props === undefined
                          ? unevaluatedPropCode(key)
                          : gen.if(unevaluatedStatic(props, key), () => unevaluatedPropCode(key)));
                    }
                    it.props = true;
                    cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
                    function unevaluatedPropCode(key) {
                        if (schema === false) {
                            cxt.setParams({ unevaluatedProperty: key });
                            cxt.error();
                            if (!allErrors)
                                gen.break();
                            return;
                        }
                        if (!(0, util_1.alwaysValidSchema)(it, schema)) {
                            const valid = gen.name("valid");
                            cxt.subschema({
                                keyword: "unevaluatedProperties",
                                dataProp: key,
                                dataPropType: util_1.Type.Str,
                            }, valid);
                            if (!allErrors)
                                gen.if((0, codegen_1.not)(valid), () => gen.break());
                        }
                    }
                    function unevaluatedDynamic(evaluatedProps, key) {
                        return (0, codegen_1._) `!${evaluatedProps} || !${evaluatedProps}[${key}]`;
                    }
                    function unevaluatedStatic(evaluatedProps, key) {
                        const ps = [];
                        for (const p in evaluatedProps) {
                            if (evaluatedProps[p] === true)
                                ps.push((0, codegen_1._) `${key} !== ${p}`);
                        }
                        return (0, codegen_1.and)(...ps);
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=unevaluatedProperties.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/const.js":
        /*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/const.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
            const error = {
                message: "must be equal to constant",
                params: ({ schemaCode }) => (0, codegen_1._) `{allowedValue: ${schemaCode}}`,
            };
            const def = {
                keyword: "const",
                $data: true,
                error,
                code(cxt) {
                    const { gen, data, $data, schemaCode, schema } = cxt;
                    if ($data || (schema && typeof schema == "object")) {
                        cxt.fail$data((0, codegen_1._) `!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
                    }
                    else {
                        cxt.fail((0, codegen_1._) `${schema} !== ${data}`);
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=const.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/dependentRequired.js":
        /*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/dependentRequired.js ***!
  \****************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const dependencies_1 = __webpack_require__(/*! ../applicator/dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
            const def = {
                keyword: "dependentRequired",
                type: "object",
                schemaType: "object",
                error: dependencies_1.error,
                code: (cxt) => (0, dependencies_1.validatePropertyDeps)(cxt),
            };
            exports.default = def;
//# sourceMappingURL=dependentRequired.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/enum.js":
        /*!***************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/enum.js ***!
  \***************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
            const error = {
                message: "must be equal to one of the allowed values",
                params: ({ schemaCode }) => (0, codegen_1._) `{allowedValues: ${schemaCode}}`,
            };
            const def = {
                keyword: "enum",
                schemaType: "array",
                $data: true,
                error,
                code(cxt) {
                    const { gen, data, $data, schema, schemaCode, it } = cxt;
                    if (!$data && schema.length === 0)
                        throw new Error("enum must have non-empty array");
                    const useLoop = schema.length >= it.opts.loopEnum;
                    let eql;
                    const getEql = () => (eql !== null && eql !== void 0 ? eql : (eql = (0, util_1.useFunc)(gen, equal_1.default)));
                    let valid;
                    if (useLoop || $data) {
                        valid = gen.let("valid");
                        cxt.block$data(valid, loopEnum);
                    }
                    else {
                        /* istanbul ignore if */
                        if (!Array.isArray(schema))
                            throw new Error("ajv implementation error");
                        const vSchema = gen.const("vSchema", schemaCode);
                        valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
                    }
                    cxt.pass(valid);
                    function loopEnum() {
                        gen.assign(valid, false);
                        gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._) `${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
                    }
                    function equalCode(vSchema, i) {
                        const sch = schema[i];
                        return typeof sch === "object" && sch !== null
                          ? (0, codegen_1._) `${getEql()}(${data}, ${vSchema}[${i}])`
                          : (0, codegen_1._) `${data} === ${sch}`;
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=enum.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/index.js":
        /*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/index.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const limitNumber_1 = __webpack_require__(/*! ./limitNumber */ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js");
            const multipleOf_1 = __webpack_require__(/*! ./multipleOf */ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js");
            const limitLength_1 = __webpack_require__(/*! ./limitLength */ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js");
            const pattern_1 = __webpack_require__(/*! ./pattern */ "./node_modules/ajv/dist/vocabularies/validation/pattern.js");
            const limitProperties_1 = __webpack_require__(/*! ./limitProperties */ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js");
            const required_1 = __webpack_require__(/*! ./required */ "./node_modules/ajv/dist/vocabularies/validation/required.js");
            const limitItems_1 = __webpack_require__(/*! ./limitItems */ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js");
            const uniqueItems_1 = __webpack_require__(/*! ./uniqueItems */ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js");
            const const_1 = __webpack_require__(/*! ./const */ "./node_modules/ajv/dist/vocabularies/validation/const.js");
            const enum_1 = __webpack_require__(/*! ./enum */ "./node_modules/ajv/dist/vocabularies/validation/enum.js");
            const validation = [
                // number
                limitNumber_1.default,
                multipleOf_1.default,
                // string
                limitLength_1.default,
                pattern_1.default,
                // object
                limitProperties_1.default,
                required_1.default,
                // array
                limitItems_1.default,
                uniqueItems_1.default,
                // any
                { keyword: "type", schemaType: ["string", "array"] },
                { keyword: "nullable", schemaType: "boolean" },
                const_1.default,
                enum_1.default,
            ];
            exports.default = validation;
//# sourceMappingURL=index.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/limitContains.js":
        /*!************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitContains.js ***!
  \************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const def = {
                keyword: ["maxContains", "minContains"],
                type: "array",
                schemaType: "number",
                code({ keyword, parentSchema, it }) {
                    if (parentSchema.contains === undefined) {
                        (0, util_1.checkStrictMode)(it, `"${keyword}" without "contains" is ignored`);
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=limitContains.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitItems.js ***!
  \*********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const error = {
                message({ keyword, schemaCode }) {
                    const comp = keyword === "maxItems" ? "more" : "fewer";
                    return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
                },
                params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
            };
            const def = {
                keyword: ["maxItems", "minItems"],
                type: "array",
                schemaType: "number",
                $data: true,
                error,
                code(cxt) {
                    const { keyword, data, schemaCode } = cxt;
                    const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
                    cxt.fail$data((0, codegen_1._) `${data}.length ${op} ${schemaCode}`);
                },
            };
            exports.default = def;
//# sourceMappingURL=limitItems.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitLength.js ***!
  \**********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const ucs2length_1 = __webpack_require__(/*! ../../runtime/ucs2length */ "./node_modules/ajv/dist/runtime/ucs2length.js");
            const error = {
                message({ keyword, schemaCode }) {
                    const comp = keyword === "maxLength" ? "more" : "fewer";
                    return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} characters`;
                },
                params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
            };
            const def = {
                keyword: ["maxLength", "minLength"],
                type: "string",
                schemaType: "number",
                $data: true,
                error,
                code(cxt) {
                    const { keyword, data, schemaCode, it } = cxt;
                    const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
                    const len = it.opts.unicode === false ? (0, codegen_1._) `${data}.length` : (0, codegen_1._) `${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
                    cxt.fail$data((0, codegen_1._) `${len} ${op} ${schemaCode}`);
                },
            };
            exports.default = def;
//# sourceMappingURL=limitLength.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitNumber.js ***!
  \**********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const ops = codegen_1.operators;
            const KWDs = {
                maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
                minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
                exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
                exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
            };
            const error = {
                message: ({ keyword, schemaCode }) => (0, codegen_1.str) `must be ${KWDs[keyword].okStr} ${schemaCode}`,
                params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
            };
            const def = {
                keyword: Object.keys(KWDs),
                type: "number",
                schemaType: "number",
                $data: true,
                error,
                code(cxt) {
                    const { keyword, data, schemaCode } = cxt;
                    cxt.fail$data((0, codegen_1._) `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
                },
            };
            exports.default = def;
//# sourceMappingURL=limitNumber.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js":
        /*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitProperties.js ***!
  \**************************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const error = {
                message({ keyword, schemaCode }) {
                    const comp = keyword === "maxProperties" ? "more" : "fewer";
                    return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} properties`;
                },
                params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
            };
            const def = {
                keyword: ["maxProperties", "minProperties"],
                type: "object",
                schemaType: "number",
                $data: true,
                error,
                code(cxt) {
                    const { keyword, data, schemaCode } = cxt;
                    const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
                    cxt.fail$data((0, codegen_1._) `Object.keys(${data}).length ${op} ${schemaCode}`);
                },
            };
            exports.default = def;
//# sourceMappingURL=limitProperties.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/multipleOf.js ***!
  \*********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const error = {
                message: ({ schemaCode }) => (0, codegen_1.str) `must be multiple of ${schemaCode}`,
                params: ({ schemaCode }) => (0, codegen_1._) `{multipleOf: ${schemaCode}}`,
            };
            const def = {
                keyword: "multipleOf",
                type: "number",
                schemaType: "number",
                $data: true,
                error,
                code(cxt) {
                    const { gen, data, schemaCode, it } = cxt;
                    // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
                    const prec = it.opts.multipleOfPrecision;
                    const res = gen.let("res");
                    const invalid = prec
                      ? (0, codegen_1._) `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
                      : (0, codegen_1._) `${res} !== parseInt(${res})`;
                    cxt.fail$data((0, codegen_1._) `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
                },
            };
            exports.default = def;
//# sourceMappingURL=multipleOf.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/pattern.js":
        /*!******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/pattern.js ***!
  \******************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const error = {
                message: ({ schemaCode }) => (0, codegen_1.str) `must match pattern "${schemaCode}"`,
                params: ({ schemaCode }) => (0, codegen_1._) `{pattern: ${schemaCode}}`,
            };
            const def = {
                keyword: "pattern",
                type: "string",
                schemaType: "string",
                $data: true,
                error,
                code(cxt) {
                    const { data, $data, schema, schemaCode, it } = cxt;
                    // TODO regexp should be wrapped in try/catchs
                    const u = it.opts.unicodeRegExp ? "u" : "";
                    const regExp = $data ? (0, codegen_1._) `(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
                    cxt.fail$data((0, codegen_1._) `!${regExp}.test(${data})`);
                },
            };
            exports.default = def;
//# sourceMappingURL=pattern.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/required.js":
        /*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/required.js ***!
  \*******************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const error = {
                message: ({ params: { missingProperty } }) => (0, codegen_1.str) `must have required property '${missingProperty}'`,
                params: ({ params: { missingProperty } }) => (0, codegen_1._) `{missingProperty: ${missingProperty}}`,
            };
            const def = {
                keyword: "required",
                type: "object",
                schemaType: "array",
                $data: true,
                error,
                code(cxt) {
                    const { gen, schema, schemaCode, data, $data, it } = cxt;
                    const { opts } = it;
                    if (!$data && schema.length === 0)
                        return;
                    const useLoop = schema.length >= opts.loopRequired;
                    if (it.allErrors)
                        allErrorsMode();
                    else
                        exitOnErrorMode();
                    if (opts.strictRequired) {
                        const props = cxt.parentSchema.properties;
                        const { definedProperties } = cxt.it;
                        for (const requiredKey of schema) {
                            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                                const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                                const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                                (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
                            }
                        }
                    }
                    function allErrorsMode() {
                        if (useLoop || $data) {
                            cxt.block$data(codegen_1.nil, loopAllRequired);
                        }
                        else {
                            for (const prop of schema) {
                                (0, code_1.checkReportMissingProp)(cxt, prop);
                            }
                        }
                    }
                    function exitOnErrorMode() {
                        const missing = gen.let("missing");
                        if (useLoop || $data) {
                            const valid = gen.let("valid", true);
                            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                            cxt.ok(valid);
                        }
                        else {
                            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
                            (0, code_1.reportMissingProp)(cxt, missing);
                            gen.else();
                        }
                    }
                    function loopAllRequired() {
                        gen.forOf("prop", schemaCode, (prop) => {
                            cxt.setParams({ missingProperty: prop });
                            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
                        });
                    }
                    function loopUntilMissing(missing, valid) {
                        cxt.setParams({ missingProperty: missing });
                        gen.forOf(missing, schemaCode, () => {
                            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
                            gen.if((0, codegen_1.not)(valid), () => {
                                cxt.error();
                                gen.break();
                            });
                        }, codegen_1.nil);
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=required.js.map

            /***/ }),

        /***/ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js ***!
  \**********************************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const dataType_1 = __webpack_require__(/*! ../../compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
            const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
            const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
            const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
            const error = {
                message: ({ params: { i, j } }) => (0, codegen_1.str) `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
                params: ({ params: { i, j } }) => (0, codegen_1._) `{i: ${i}, j: ${j}}`,
            };
            const def = {
                keyword: "uniqueItems",
                type: "array",
                schemaType: "boolean",
                $data: true,
                error,
                code(cxt) {
                    const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
                    if (!$data && !schema)
                        return;
                    const valid = gen.let("valid");
                    const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
                    cxt.block$data(valid, validateUniqueItems, (0, codegen_1._) `${schemaCode} === false`);
                    cxt.ok(valid);
                    function validateUniqueItems() {
                        const i = gen.let("i", (0, codegen_1._) `${data}.length`);
                        const j = gen.let("j");
                        cxt.setParams({ i, j });
                        gen.assign(valid, true);
                        gen.if((0, codegen_1._) `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
                    }
                    function canOptimize() {
                        return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
                    }
                    function loopN(i, j) {
                        const item = gen.name("item");
                        const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
                        const indices = gen.const("indices", (0, codegen_1._) `{}`);
                        gen.for((0, codegen_1._) `;${i}--;`, () => {
                            gen.let(item, (0, codegen_1._) `${data}[${i}]`);
                            gen.if(wrongType, (0, codegen_1._) `continue`);
                            if (itemTypes.length > 1)
                                gen.if((0, codegen_1._) `typeof ${item} == "string"`, (0, codegen_1._) `${item} += "_"`);
                            gen
                            .if((0, codegen_1._) `typeof ${indices}[${item}] == "number"`, () => {
                                gen.assign(j, (0, codegen_1._) `${indices}[${item}]`);
                                cxt.error();
                                gen.assign(valid, false).break();
                            })
                            .code((0, codegen_1._) `${indices}[${item}] = ${i}`);
                        });
                    }
                    function loopN2(i, j) {
                        const eql = (0, util_1.useFunc)(gen, equal_1.default);
                        const outer = gen.name("outer");
                        gen.label(outer).for((0, codegen_1._) `;${i}--;`, () => gen.for((0, codegen_1._) `${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._) `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                            cxt.error();
                            gen.assign(valid, false).break(outer);
                        })));
                    }
                },
            };
            exports.default = def;
//# sourceMappingURL=uniqueItems.js.map

            /***/ }),

        /***/ "./node_modules/fast-deep-equal/index.js":
        /*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


// do not edit .js files directly - edit src/index.jst



            module.exports = function equal(a, b) {
                if (a === b) return true;

                if (a && b && typeof a == 'object' && typeof b == 'object') {
                    if (a.constructor !== b.constructor) return false;

                    var length, i, keys;
                    if (Array.isArray(a)) {
                        length = a.length;
                        if (length != b.length) return false;
                        for (i = length; i-- !== 0;)
                            if (!equal(a[i], b[i])) return false;
                        return true;
                    }



                    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
                    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
                    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

                    keys = Object.keys(a);
                    length = keys.length;
                    if (length !== Object.keys(b).length) return false;

                    for (i = length; i-- !== 0;)
                        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

                    for (i = length; i-- !== 0;) {
                        var key = keys[i];

                        if (!equal(a[key], b[key])) return false;
                    }

                    return true;
                }

                // true if both NaN, false otherwise
                return a!==a && b!==b;
            };


            /***/ }),

        /***/ "./node_modules/json-schema-traverse/index.js":
        /*!****************************************************!*\
  !*** ./node_modules/json-schema-traverse/index.js ***!
  \****************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var traverse = module.exports = function (schema, opts, cb) {
                // Legacy support for v0.3.1 and earlier.
                if (typeof opts == 'function') {
                    cb = opts;
                    opts = {};
                }

                cb = opts.cb || cb;
                var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
                var post = cb.post || function() {};

                _traverse(opts, pre, post, schema, '', schema);
            };


            traverse.keywords = {
                additionalItems: true,
                items: true,
                contains: true,
                additionalProperties: true,
                propertyNames: true,
                not: true,
                if: true,
                then: true,
                else: true
            };

            traverse.arrayKeywords = {
                items: true,
                allOf: true,
                anyOf: true,
                oneOf: true
            };

            traverse.propsKeywords = {
                $defs: true,
                definitions: true,
                properties: true,
                patternProperties: true,
                dependencies: true
            };

            traverse.skipKeywords = {
                default: true,
                enum: true,
                const: true,
                required: true,
                maximum: true,
                minimum: true,
                exclusiveMaximum: true,
                exclusiveMinimum: true,
                multipleOf: true,
                maxLength: true,
                minLength: true,
                pattern: true,
                format: true,
                maxItems: true,
                minItems: true,
                uniqueItems: true,
                maxProperties: true,
                minProperties: true
            };


            function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
                if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
                    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
                    for (var key in schema) {
                        var sch = schema[key];
                        if (Array.isArray(sch)) {
                            if (key in traverse.arrayKeywords) {
                                for (var i=0; i<sch.length; i++)
                                    _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
                            }
                        } else if (key in traverse.propsKeywords) {
                            if (sch && typeof sch == 'object') {
                                for (var prop in sch)
                                    _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
                            }
                        } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
                            _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
                        }
                    }
                    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
                }
            }


            function escapeJsonPtr(str) {
                return str.replace(/~/g, '~0').replace(/\//g, '~1');
            }


            /***/ }),

        /***/ "./node_modules/uri-js/dist/es5/uri.all.js":
        /*!*************************************************!*\
  !*** ./node_modules/uri-js/dist/es5/uri.all.js ***!
  \*************************************************/
        /*! no static exports found */
        /***/ (function(module, exports, __webpack_require__) {

            /** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
            (function (global, factory) {
                true ? factory(exports) :
                  undefined;
            }(this, (function (exports) { 'use strict';

                function merge() {
                    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
                        sets[_key] = arguments[_key];
                    }

                    if (sets.length > 1) {
                        sets[0] = sets[0].slice(0, -1);
                        var xl = sets.length - 1;
                        for (var x = 1; x < xl; ++x) {
                            sets[x] = sets[x].slice(1, -1);
                        }
                        sets[xl] = sets[xl].slice(1);
                        return sets.join('');
                    } else {
                        return sets[0];
                    }
                }
                function subexp(str) {
                    return "(?:" + str + ")";
                }
                function typeOf(o) {
                    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
                }
                function toUpperCase(str) {
                    return str.toUpperCase();
                }
                function toArray(obj) {
                    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
                }
                function assign(target, source) {
                    var obj = target;
                    if (source) {
                        for (var key in source) {
                            obj[key] = source[key];
                        }
                    }
                    return obj;
                }

                function buildExps(isIRI) {
                    var ALPHA$$ = "[A-Za-z]",
                      CR$ = "[\\x0D]",
                      DIGIT$$ = "[0-9]",
                      DQUOTE$$ = "[\\x22]",
                      HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
                      //case-insensitive
                      LF$$ = "[\\x0A]",
                      SP$$ = "[\\x20]",
                      PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
                      //expanded
                      GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
                      SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
                      RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
                      UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
                      //subset, excludes bidi control characters
                      IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
                      //subset
                      UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
                      SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
                      USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
                      DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
                      DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
                      //relaxed parsing rules
                      IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
                      H16$ = subexp(HEXDIG$$ + "{1,4}"),
                      LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
                      IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
                      //                           6( h16 ":" ) ls32
                      IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
                      //                      "::" 5( h16 ":" ) ls32
                      IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
                      //[               h16 ] "::" 4( h16 ":" ) ls32
                      IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
                      //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
                      IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
                      //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
                      IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
                      //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
                      IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
                      //[ *4( h16 ":" ) h16 ] "::"              ls32
                      IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
                      //[ *5( h16 ":" ) h16 ] "::"              h16
                      IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
                      //[ *6( h16 ":" ) h16 ] "::"
                      IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
                      ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
                      //RFC 6874
                      IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
                      //RFC 6874
                      IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
                      //RFC 6874, with relaxed parsing rules
                      IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
                      IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
                      //RFC 6874
                      REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
                      HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
                      PORT$ = subexp(DIGIT$$ + "*"),
                      AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
                      PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
                      SEGMENT$ = subexp(PCHAR$ + "*"),
                      SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
                      SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
                      PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
                      PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
                      //simplified
                      PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
                      //simplified
                      PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
                      //simplified
                      PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
                      PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
                      QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
                      FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
                      HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
                      URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
                      RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
                      RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
                      URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
                      ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
                      GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
                      RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
                      ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
                      SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
                      AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
                    return {
                        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
                        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
                        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
                        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
                        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
                        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
                        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
                        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
                        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
                        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
                        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
                        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
                        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
                    };
                }
                var URI_PROTOCOL = buildExps(false);

                var IRI_PROTOCOL = buildExps(true);

                var slicedToArray = function () {
                    function sliceIterator(arr, i) {
                        var _arr = [];
                        var _n = true;
                        var _d = false;
                        var _e = undefined;

                        try {
                            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                                _arr.push(_s.value);

                                if (i && _arr.length === i) break;
                            }
                        } catch (err) {
                            _d = true;
                            _e = err;
                        } finally {
                            try {
                                if (!_n && _i["return"]) _i["return"]();
                            } finally {
                                if (_d) throw _e;
                            }
                        }

                        return _arr;
                    }

                    return function (arr, i) {
                        if (Array.isArray(arr)) {
                            return arr;
                        } else if (Symbol.iterator in Object(arr)) {
                            return sliceIterator(arr, i);
                        } else {
                            throw new TypeError("Invalid attempt to destructure non-iterable instance");
                        }
                    };
                }();













                var toConsumableArray = function (arr) {
                    if (Array.isArray(arr)) {
                        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

                        return arr2;
                    } else {
                        return Array.from(arr);
                    }
                };

                /** Highest positive signed 32-bit float value */

                var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

                /** Bootstring parameters */
                var base = 36;
                var tMin = 1;
                var tMax = 26;
                var skew = 38;
                var damp = 700;
                var initialBias = 72;
                var initialN = 128; // 0x80
                var delimiter = '-'; // '\x2D'

                /** Regular expressions */
                var regexPunycode = /^xn--/;
                var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
                var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

                /** Error messages */
                var errors = {
                    'overflow': 'Overflow: input needs wider integers to process',
                    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                    'invalid-input': 'Invalid input'
                };

                /** Convenience shortcuts */
                var baseMinusTMin = base - tMin;
                var floor = Math.floor;
                var stringFromCharCode = String.fromCharCode;

                /*--------------------------------------------------------------------------*/

                /**
                 * A generic error utility function.
                 * @private
                 * @param {String} type The error type.
                 * @returns {Error} Throws a `RangeError` with the applicable error message.
                 */
                function error$1(type) {
                    throw new RangeError(errors[type]);
                }

                /**
                 * A generic `Array#map` utility function.
                 * @private
                 * @param {Array} array The array to iterate over.
                 * @param {Function} callback The function that gets called for every array
                 * item.
                 * @returns {Array} A new array of values returned by the callback function.
                 */
                function map(array, fn) {
                    var result = [];
                    var length = array.length;
                    while (length--) {
                        result[length] = fn(array[length]);
                    }
                    return result;
                }

                /**
                 * A simple `Array#map`-like wrapper to work with domain name strings or email
                 * addresses.
                 * @private
                 * @param {String} domain The domain name or email address.
                 * @param {Function} callback The function that gets called for every
                 * character.
                 * @returns {Array} A new string of characters returned by the callback
                 * function.
                 */
                function mapDomain(string, fn) {
                    var parts = string.split('@');
                    var result = '';
                    if (parts.length > 1) {
                        // In email addresses, only the domain name should be punycoded. Leave
                        // the local part (i.e. everything up to `@`) intact.
                        result = parts[0] + '@';
                        string = parts[1];
                    }
                    // Avoid `split(regex)` for IE8 compatibility. See #17.
                    string = string.replace(regexSeparators, '\x2E');
                    var labels = string.split('.');
                    var encoded = map(labels, fn).join('.');
                    return result + encoded;
                }

                /**
                 * Creates an array containing the numeric code points of each Unicode
                 * character in the string. While JavaScript uses UCS-2 internally,
                 * this function will convert a pair of surrogate halves (each of which
                 * UCS-2 exposes as separate characters) into a single code point,
                 * matching UTF-16.
                 * @see `punycode.ucs2.encode`
                 * @see <https://mathiasbynens.be/notes/javascript-encoding>
                 * @memberOf punycode.ucs2
                 * @name decode
                 * @param {String} string The Unicode input string (UCS-2).
                 * @returns {Array} The new array of code points.
                 */
                function ucs2decode(string) {
                    var output = [];
                    var counter = 0;
                    var length = string.length;
                    while (counter < length) {
                        var value = string.charCodeAt(counter++);
                        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                            // It's a high surrogate, and there is a next character.
                            var extra = string.charCodeAt(counter++);
                            if ((extra & 0xFC00) == 0xDC00) {
                                // Low surrogate.
                                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                            } else {
                                // It's an unmatched surrogate; only append this code unit, in case the
                                // next code unit is the high surrogate of a surrogate pair.
                                output.push(value);
                                counter--;
                            }
                        } else {
                            output.push(value);
                        }
                    }
                    return output;
                }

                /**
                 * Creates a string based on an array of numeric code points.
                 * @see `punycode.ucs2.decode`
                 * @memberOf punycode.ucs2
                 * @name encode
                 * @param {Array} codePoints The array of numeric code points.
                 * @returns {String} The new Unicode string (UCS-2).
                 */
                var ucs2encode = function ucs2encode(array) {
                    return String.fromCodePoint.apply(String, toConsumableArray(array));
                };

                /**
                 * Converts a basic code point into a digit/integer.
                 * @see `digitToBasic()`
                 * @private
                 * @param {Number} codePoint The basic numeric code point value.
                 * @returns {Number} The numeric value of a basic code point (for use in
                 * representing integers) in the range `0` to `base - 1`, or `base` if
                 * the code point does not represent a value.
                 */
                var basicToDigit = function basicToDigit(codePoint) {
                    if (codePoint - 0x30 < 0x0A) {
                        return codePoint - 0x16;
                    }
                    if (codePoint - 0x41 < 0x1A) {
                        return codePoint - 0x41;
                    }
                    if (codePoint - 0x61 < 0x1A) {
                        return codePoint - 0x61;
                    }
                    return base;
                };

                /**
                 * Converts a digit/integer into a basic code point.
                 * @see `basicToDigit()`
                 * @private
                 * @param {Number} digit The numeric value of a basic code point.
                 * @returns {Number} The basic code point whose value (when used for
                 * representing integers) is `digit`, which needs to be in the range
                 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
                 * used; else, the lowercase form is used. The behavior is undefined
                 * if `flag` is non-zero and `digit` has no uppercase form.
                 */
                var digitToBasic = function digitToBasic(digit, flag) {
                    //  0..25 map to ASCII a..z or A..Z
                    // 26..35 map to ASCII 0..9
                    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
                };

                /**
                 * Bias adaptation function as per section 3.4 of RFC 3492.
                 * https://tools.ietf.org/html/rfc3492#section-3.4
                 * @private
                 */
                var adapt = function adapt(delta, numPoints, firstTime) {
                    var k = 0;
                    delta = firstTime ? floor(delta / damp) : delta >> 1;
                    delta += floor(delta / numPoints);
                    for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
                        delta = floor(delta / baseMinusTMin);
                    }
                    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
                };

                /**
                 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
                 * symbols.
                 * @memberOf punycode
                 * @param {String} input The Punycode string of ASCII-only symbols.
                 * @returns {String} The resulting string of Unicode symbols.
                 */
                var decode = function decode(input) {
                    // Don't use UCS-2.
                    var output = [];
                    var inputLength = input.length;
                    var i = 0;
                    var n = initialN;
                    var bias = initialBias;

                    // Handle the basic code points: let `basic` be the number of input code
                    // points before the last delimiter, or `0` if there is none, then copy
                    // the first basic code points to the output.

                    var basic = input.lastIndexOf(delimiter);
                    if (basic < 0) {
                        basic = 0;
                    }

                    for (var j = 0; j < basic; ++j) {
                        // if it's not a basic code point
                        if (input.charCodeAt(j) >= 0x80) {
                            error$1('not-basic');
                        }
                        output.push(input.charCodeAt(j));
                    }

                    // Main decoding loop: start just after the last delimiter if any basic code
                    // points were copied; start at the beginning otherwise.

                    for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

                        // `index` is the index of the next character to be consumed.
                        // Decode a generalized variable-length integer into `delta`,
                        // which gets added to `i`. The overflow checking is easier
                        // if we increase `i` as we go, then subtract off its starting
                        // value at the end to obtain `delta`.
                        var oldi = i;
                        for (var w = 1, k = base;; /* no condition */k += base) {

                            if (index >= inputLength) {
                                error$1('invalid-input');
                            }

                            var digit = basicToDigit(input.charCodeAt(index++));

                            if (digit >= base || digit > floor((maxInt - i) / w)) {
                                error$1('overflow');
                            }

                            i += digit * w;
                            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

                            if (digit < t) {
                                break;
                            }

                            var baseMinusT = base - t;
                            if (w > floor(maxInt / baseMinusT)) {
                                error$1('overflow');
                            }

                            w *= baseMinusT;
                        }

                        var out = output.length + 1;
                        bias = adapt(i - oldi, out, oldi == 0);

                        // `i` was supposed to wrap around from `out` to `0`,
                        // incrementing `n` each time, so we'll fix that now:
                        if (floor(i / out) > maxInt - n) {
                            error$1('overflow');
                        }

                        n += floor(i / out);
                        i %= out;

                        // Insert `n` at position `i` of the output.
                        output.splice(i++, 0, n);
                    }

                    return String.fromCodePoint.apply(String, output);
                };

                /**
                 * Converts a string of Unicode symbols (e.g. a domain name label) to a
                 * Punycode string of ASCII-only symbols.
                 * @memberOf punycode
                 * @param {String} input The string of Unicode symbols.
                 * @returns {String} The resulting Punycode string of ASCII-only symbols.
                 */
                var encode = function encode(input) {
                    var output = [];

                    // Convert the input in UCS-2 to an array of Unicode code points.
                    input = ucs2decode(input);

                    // Cache the length.
                    var inputLength = input.length;

                    // Initialize the state.
                    var n = initialN;
                    var delta = 0;
                    var bias = initialBias;

                    // Handle the basic code points.
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _currentValue2 = _step.value;

                            if (_currentValue2 < 0x80) {
                                output.push(stringFromCharCode(_currentValue2));
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    var basicLength = output.length;
                    var handledCPCount = basicLength;

                    // `handledCPCount` is the number of code points that have been handled;
                    // `basicLength` is the number of basic code points.

                    // Finish the basic string with a delimiter unless it's empty.
                    if (basicLength) {
                        output.push(delimiter);
                    }

                    // Main encoding loop:
                    while (handledCPCount < inputLength) {

                        // All non-basic code points < n have been handled already. Find the next
                        // larger one:
                        var m = maxInt;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var currentValue = _step2.value;

                                if (currentValue >= n && currentValue < m) {
                                    m = currentValue;
                                }
                            }

                            // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                            // but guard against overflow.
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        var handledCPCountPlusOne = handledCPCount + 1;
                        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                            error$1('overflow');
                        }

                        delta += (m - n) * handledCPCountPlusOne;
                        n = m;

                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var _currentValue = _step3.value;

                                if (_currentValue < n && ++delta > maxInt) {
                                    error$1('overflow');
                                }
                                if (_currentValue == n) {
                                    // Represent delta as a generalized variable-length integer.
                                    var q = delta;
                                    for (var k = base;; /* no condition */k += base) {
                                        var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                                        if (q < t) {
                                            break;
                                        }
                                        var qMinusT = q - t;
                                        var baseMinusT = base - t;
                                        output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                                        q = floor(qMinusT / baseMinusT);
                                    }

                                    output.push(stringFromCharCode(digitToBasic(q, 0)));
                                    bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                                    delta = 0;
                                    ++handledCPCount;
                                }
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        ++delta;
                        ++n;
                    }
                    return output.join('');
                };

                /**
                 * Converts a Punycode string representing a domain name or an email address
                 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
                 * it doesn't matter if you call it on a string that has already been
                 * converted to Unicode.
                 * @memberOf punycode
                 * @param {String} input The Punycoded domain name or email address to
                 * convert to Unicode.
                 * @returns {String} The Unicode representation of the given Punycode
                 * string.
                 */
                var toUnicode = function toUnicode(input) {
                    return mapDomain(input, function (string) {
                        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
                    });
                };

                /**
                 * Converts a Unicode string representing a domain name or an email address to
                 * Punycode. Only the non-ASCII parts of the domain name will be converted,
                 * i.e. it doesn't matter if you call it with a domain that's already in
                 * ASCII.
                 * @memberOf punycode
                 * @param {String} input The domain name or email address to convert, as a
                 * Unicode string.
                 * @returns {String} The Punycode representation of the given domain name or
                 * email address.
                 */
                var toASCII = function toASCII(input) {
                    return mapDomain(input, function (string) {
                        return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
                    });
                };

                /*--------------------------------------------------------------------------*/

                /** Define the public API */
                var punycode = {
                    /**
                     * A string representing the current Punycode.js version number.
                     * @memberOf punycode
                     * @type String
                     */
                    'version': '2.1.0',
                    /**
                     * An object of methods to convert from JavaScript's internal character
                     * representation (UCS-2) to Unicode code points, and back.
                     * @see <https://mathiasbynens.be/notes/javascript-encoding>
                     * @memberOf punycode
                     * @type Object
                     */
                    'ucs2': {
                        'decode': ucs2decode,
                        'encode': ucs2encode
                    },
                    'decode': decode,
                    'encode': encode,
                    'toASCII': toASCII,
                    'toUnicode': toUnicode
                };

                /**
                 * URI.js
                 *
                 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
                 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
                 * @see http://github.com/garycourt/uri-js
                 */
                /**
                 * Copyright 2011 Gary Court. All rights reserved.
                 *
                 * Redistribution and use in source and binary forms, with or without modification, are
                 * permitted provided that the following conditions are met:
                 *
                 *    1. Redistributions of source code must retain the above copyright notice, this list of
                 *       conditions and the following disclaimer.
                 *
                 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
                 *       of conditions and the following disclaimer in the documentation and/or other materials
                 *       provided with the distribution.
                 *
                 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
                 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
                 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
                 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
                 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
                 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
                 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
                 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
                 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                 *
                 * The views and conclusions contained in the software and documentation are those of the
                 * authors and should not be interpreted as representing official policies, either expressed
                 * or implied, of Gary Court.
                 */
                var SCHEMES = {};
                function pctEncChar(chr) {
                    var c = chr.charCodeAt(0);
                    var e = void 0;
                    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
                    return e;
                }
                function pctDecChars(str) {
                    var newStr = "";
                    var i = 0;
                    var il = str.length;
                    while (i < il) {
                        var c = parseInt(str.substr(i + 1, 2), 16);
                        if (c < 128) {
                            newStr += String.fromCharCode(c);
                            i += 3;
                        } else if (c >= 194 && c < 224) {
                            if (il - i >= 6) {
                                var c2 = parseInt(str.substr(i + 4, 2), 16);
                                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
                            } else {
                                newStr += str.substr(i, 6);
                            }
                            i += 6;
                        } else if (c >= 224) {
                            if (il - i >= 9) {
                                var _c = parseInt(str.substr(i + 4, 2), 16);
                                var c3 = parseInt(str.substr(i + 7, 2), 16);
                                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
                            } else {
                                newStr += str.substr(i, 9);
                            }
                            i += 9;
                        } else {
                            newStr += str.substr(i, 3);
                            i += 3;
                        }
                    }
                    return newStr;
                }
                function _normalizeComponentEncoding(components, protocol) {
                    function decodeUnreserved(str) {
                        var decStr = pctDecChars(str);
                        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
                    }
                    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
                    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
                    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
                    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
                    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
                    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
                    return components;
                }

                function _stripLeadingZeros(str) {
                    return str.replace(/^0*(.*)/, "$1") || "0";
                }
                function _normalizeIPv4(host, protocol) {
                    var matches = host.match(protocol.IPV4ADDRESS) || [];

                    var _matches = slicedToArray(matches, 2),
                      address = _matches[1];

                    if (address) {
                        return address.split(".").map(_stripLeadingZeros).join(".");
                    } else {
                        return host;
                    }
                }
                function _normalizeIPv6(host, protocol) {
                    var matches = host.match(protocol.IPV6ADDRESS) || [];

                    var _matches2 = slicedToArray(matches, 3),
                      address = _matches2[1],
                      zone = _matches2[2];

                    if (address) {
                        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
                          _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
                          last = _address$toLowerCase$2[0],
                          first = _address$toLowerCase$2[1];

                        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
                        var lastFields = last.split(":").map(_stripLeadingZeros);
                        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
                        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
                        var lastFieldsStart = lastFields.length - fieldCount;
                        var fields = Array(fieldCount);
                        for (var x = 0; x < fieldCount; ++x) {
                            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
                        }
                        if (isLastFieldIPv4Address) {
                            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
                        }
                        var allZeroFields = fields.reduce(function (acc, field, index) {
                            if (!field || field === "0") {
                                var lastLongest = acc[acc.length - 1];
                                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                                    lastLongest.length++;
                                } else {
                                    acc.push({ index: index, length: 1 });
                                }
                            }
                            return acc;
                        }, []);
                        var longestZeroFields = allZeroFields.sort(function (a, b) {
                            return b.length - a.length;
                        })[0];
                        var newHost = void 0;
                        if (longestZeroFields && longestZeroFields.length > 1) {
                            var newFirst = fields.slice(0, longestZeroFields.index);
                            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
                            newHost = newFirst.join(":") + "::" + newLast.join(":");
                        } else {
                            newHost = fields.join(":");
                        }
                        if (zone) {
                            newHost += "%" + zone;
                        }
                        return newHost;
                    } else {
                        return host;
                    }
                }
                var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
                var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
                function parse(uriString) {
                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                    var components = {};
                    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
                    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
                    var matches = uriString.match(URI_PARSE);
                    if (matches) {
                        if (NO_MATCH_IS_UNDEFINED) {
                            //store each component
                            components.scheme = matches[1];
                            components.userinfo = matches[3];
                            components.host = matches[4];
                            components.port = parseInt(matches[5], 10);
                            components.path = matches[6] || "";
                            components.query = matches[7];
                            components.fragment = matches[8];
                            //fix port number
                            if (isNaN(components.port)) {
                                components.port = matches[5];
                            }
                        } else {
                            //IE FIX for improper RegExp matching
                            //store each component
                            components.scheme = matches[1] || undefined;
                            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
                            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
                            components.port = parseInt(matches[5], 10);
                            components.path = matches[6] || "";
                            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
                            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
                            //fix port number
                            if (isNaN(components.port)) {
                                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
                            }
                        }
                        if (components.host) {
                            //normalize IP hosts
                            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
                        }
                        //determine reference type
                        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
                            components.reference = "same-document";
                        } else if (components.scheme === undefined) {
                            components.reference = "relative";
                        } else if (components.fragment === undefined) {
                            components.reference = "absolute";
                        } else {
                            components.reference = "uri";
                        }
                        //check for reference errors
                        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
                            components.error = components.error || "URI is not a " + options.reference + " reference.";
                        }
                        //find scheme handler
                        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
                        //check if scheme can't handle IRIs
                        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
                            //if host component is a domain name
                            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                                //convert Unicode IDN -> ASCII IDN
                                try {
                                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                                } catch (e) {
                                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                                }
                            }
                            //convert IRI -> URI
                            _normalizeComponentEncoding(components, URI_PROTOCOL);
                        } else {
                            //normalize encodings
                            _normalizeComponentEncoding(components, protocol);
                        }
                        //perform scheme specific parsing
                        if (schemeHandler && schemeHandler.parse) {
                            schemeHandler.parse(components, options);
                        }
                    } else {
                        components.error = components.error || "URI can not be parsed.";
                    }
                    return components;
                }

                function _recomposeAuthority(components, options) {
                    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
                    var uriTokens = [];
                    if (components.userinfo !== undefined) {
                        uriTokens.push(components.userinfo);
                        uriTokens.push("@");
                    }
                    if (components.host !== undefined) {
                        //normalize IP hosts, add brackets and escape zone separator for IPv6
                        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
                            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
                        }));
                    }
                    if (typeof components.port === "number" || typeof components.port === "string") {
                        uriTokens.push(":");
                        uriTokens.push(String(components.port));
                    }
                    return uriTokens.length ? uriTokens.join("") : undefined;
                }

                var RDS1 = /^\.\.?\//;
                var RDS2 = /^\/\.(\/|$)/;
                var RDS3 = /^\/\.\.(\/|$)/;
                var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
                function removeDotSegments(input) {
                    var output = [];
                    while (input.length) {
                        if (input.match(RDS1)) {
                            input = input.replace(RDS1, "");
                        } else if (input.match(RDS2)) {
                            input = input.replace(RDS2, "/");
                        } else if (input.match(RDS3)) {
                            input = input.replace(RDS3, "/");
                            output.pop();
                        } else if (input === "." || input === "..") {
                            input = "";
                        } else {
                            var im = input.match(RDS5);
                            if (im) {
                                var s = im[0];
                                input = input.slice(s.length);
                                output.push(s);
                            } else {
                                throw new Error("Unexpected dot segment condition");
                            }
                        }
                    }
                    return output.join("");
                }

                function serialize(components) {
                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
                    var uriTokens = [];
                    //find scheme handler
                    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
                    //perform scheme specific serialization
                    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
                    if (components.host) {
                        //if host component is an IPv6 address
                        if (protocol.IPV6ADDRESS.test(components.host)) {}
                          //TODO: normalize IPv6 address as per RFC 5952

                        //if host component is a domain name
                        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                            //convert IDN via punycode
                            try {
                                components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                            } catch (e) {
                                components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                            }
                        }
                    }
                    //normalize encoding
                    _normalizeComponentEncoding(components, protocol);
                    if (options.reference !== "suffix" && components.scheme) {
                        uriTokens.push(components.scheme);
                        uriTokens.push(":");
                    }
                    var authority = _recomposeAuthority(components, options);
                    if (authority !== undefined) {
                        if (options.reference !== "suffix") {
                            uriTokens.push("//");
                        }
                        uriTokens.push(authority);
                        if (components.path && components.path.charAt(0) !== "/") {
                            uriTokens.push("/");
                        }
                    }
                    if (components.path !== undefined) {
                        var s = components.path;
                        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
                            s = removeDotSegments(s);
                        }
                        if (authority === undefined) {
                            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
                        }
                        uriTokens.push(s);
                    }
                    if (components.query !== undefined) {
                        uriTokens.push("?");
                        uriTokens.push(components.query);
                    }
                    if (components.fragment !== undefined) {
                        uriTokens.push("#");
                        uriTokens.push(components.fragment);
                    }
                    return uriTokens.join(""); //merge tokens into a string
                }

                function resolveComponents(base, relative) {
                    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                    var skipNormalization = arguments[3];

                    var target = {};
                    if (!skipNormalization) {
                        base = parse(serialize(base, options), options); //normalize base components
                        relative = parse(serialize(relative, options), options); //normalize relative components
                    }
                    options = options || {};
                    if (!options.tolerant && relative.scheme) {
                        target.scheme = relative.scheme;
                        //target.authority = relative.authority;
                        target.userinfo = relative.userinfo;
                        target.host = relative.host;
                        target.port = relative.port;
                        target.path = removeDotSegments(relative.path || "");
                        target.query = relative.query;
                    } else {
                        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
                            //target.authority = relative.authority;
                            target.userinfo = relative.userinfo;
                            target.host = relative.host;
                            target.port = relative.port;
                            target.path = removeDotSegments(relative.path || "");
                            target.query = relative.query;
                        } else {
                            if (!relative.path) {
                                target.path = base.path;
                                if (relative.query !== undefined) {
                                    target.query = relative.query;
                                } else {
                                    target.query = base.query;
                                }
                            } else {
                                if (relative.path.charAt(0) === "/") {
                                    target.path = removeDotSegments(relative.path);
                                } else {
                                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                                        target.path = "/" + relative.path;
                                    } else if (!base.path) {
                                        target.path = relative.path;
                                    } else {
                                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                                    }
                                    target.path = removeDotSegments(target.path);
                                }
                                target.query = relative.query;
                            }
                            //target.authority = base.authority;
                            target.userinfo = base.userinfo;
                            target.host = base.host;
                            target.port = base.port;
                        }
                        target.scheme = base.scheme;
                    }
                    target.fragment = relative.fragment;
                    return target;
                }

                function resolve(baseURI, relativeURI, options) {
                    var schemelessOptions = assign({ scheme: 'null' }, options);
                    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
                }

                function normalize(uri, options) {
                    if (typeof uri === "string") {
                        uri = serialize(parse(uri, options), options);
                    } else if (typeOf(uri) === "object") {
                        uri = parse(serialize(uri, options), options);
                    }
                    return uri;
                }

                function equal(uriA, uriB, options) {
                    if (typeof uriA === "string") {
                        uriA = serialize(parse(uriA, options), options);
                    } else if (typeOf(uriA) === "object") {
                        uriA = serialize(uriA, options);
                    }
                    if (typeof uriB === "string") {
                        uriB = serialize(parse(uriB, options), options);
                    } else if (typeOf(uriB) === "object") {
                        uriB = serialize(uriB, options);
                    }
                    return uriA === uriB;
                }

                function escapeComponent(str, options) {
                    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
                }

                function unescapeComponent(str, options) {
                    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
                }

                var handler = {
                    scheme: "http",
                    domainHost: true,
                    parse: function parse(components, options) {
                        //report missing host
                        if (!components.host) {
                            components.error = components.error || "HTTP URIs must have a host.";
                        }
                        return components;
                    },
                    serialize: function serialize(components, options) {
                        var secure = String(components.scheme).toLowerCase() === "https";
                        //normalize the default port
                        if (components.port === (secure ? 443 : 80) || components.port === "") {
                            components.port = undefined;
                        }
                        //normalize the empty path
                        if (!components.path) {
                            components.path = "/";
                        }
                        //NOTE: We do not parse query strings for HTTP URIs
                        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
                        //and not the HTTP spec.
                        return components;
                    }
                };

                var handler$1 = {
                    scheme: "https",
                    domainHost: handler.domainHost,
                    parse: handler.parse,
                    serialize: handler.serialize
                };

                function isSecure(wsComponents) {
                    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
                }
//RFC 6455
                var handler$2 = {
                    scheme: "ws",
                    domainHost: true,
                    parse: function parse(components, options) {
                        var wsComponents = components;
                        //indicate if the secure flag is set
                        wsComponents.secure = isSecure(wsComponents);
                        //construct resouce name
                        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
                        wsComponents.path = undefined;
                        wsComponents.query = undefined;
                        return wsComponents;
                    },
                    serialize: function serialize(wsComponents, options) {
                        //normalize the default port
                        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
                            wsComponents.port = undefined;
                        }
                        //ensure scheme matches secure flag
                        if (typeof wsComponents.secure === 'boolean') {
                            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
                            wsComponents.secure = undefined;
                        }
                        //reconstruct path from resource name
                        if (wsComponents.resourceName) {
                            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                              _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                              path = _wsComponents$resourc2[0],
                              query = _wsComponents$resourc2[1];

                            wsComponents.path = path && path !== '/' ? path : undefined;
                            wsComponents.query = query;
                            wsComponents.resourceName = undefined;
                        }
                        //forbid fragment component
                        wsComponents.fragment = undefined;
                        return wsComponents;
                    }
                };

                var handler$3 = {
                    scheme: "wss",
                    domainHost: handler$2.domainHost,
                    parse: handler$2.parse,
                    serialize: handler$2.serialize
                };

                var O = {};
                var isIRI = true;
//RFC 3986
                var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
                var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
                var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
                var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
                var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
                var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
                var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
                var UNRESERVED = new RegExp(UNRESERVED$$, "g");
                var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
                var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
                var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
                var NOT_HFVALUE = NOT_HFNAME;
                function decodeUnreserved(str) {
                    var decStr = pctDecChars(str);
                    return !decStr.match(UNRESERVED) ? str : decStr;
                }
                var handler$4 = {
                    scheme: "mailto",
                    parse: function parse$$1(components, options) {
                        var mailtoComponents = components;
                        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
                        mailtoComponents.path = undefined;
                        if (mailtoComponents.query) {
                            var unknownHeaders = false;
                            var headers = {};
                            var hfields = mailtoComponents.query.split("&");
                            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                                var hfield = hfields[x].split("=");
                                switch (hfield[0]) {
                                    case "to":
                                        var toAddrs = hfield[1].split(",");
                                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                                            to.push(toAddrs[_x]);
                                        }
                                        break;
                                    case "subject":
                                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                                        break;
                                    case "body":
                                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                                        break;
                                    default:
                                        unknownHeaders = true;
                                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                                        break;
                                }
                            }
                            if (unknownHeaders) mailtoComponents.headers = headers;
                        }
                        mailtoComponents.query = undefined;
                        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
                            var addr = to[_x2].split("@");
                            addr[0] = unescapeComponent(addr[0]);
                            if (!options.unicodeSupport) {
                                //convert Unicode IDN -> ASCII IDN
                                try {
                                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                                } catch (e) {
                                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                                }
                            } else {
                                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
                            }
                            to[_x2] = addr.join("@");
                        }
                        return mailtoComponents;
                    },
                    serialize: function serialize$$1(mailtoComponents, options) {
                        var components = mailtoComponents;
                        var to = toArray(mailtoComponents.to);
                        if (to) {
                            for (var x = 0, xl = to.length; x < xl; ++x) {
                                var toAddr = String(to[x]);
                                var atIdx = toAddr.lastIndexOf("@");
                                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                                var domain = toAddr.slice(atIdx + 1);
                                //convert IDN via punycode
                                try {
                                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                                } catch (e) {
                                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                                }
                                to[x] = localPart + "@" + domain;
                            }
                            components.path = to.join(",");
                        }
                        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
                        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
                        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
                        var fields = [];
                        for (var name in headers) {
                            if (headers[name] !== O[name]) {
                                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
                            }
                        }
                        if (fields.length) {
                            components.query = fields.join("&");
                        }
                        return components;
                    }
                };

                var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
                var handler$5 = {
                    scheme: "urn",
                    parse: function parse$$1(components, options) {
                        var matches = components.path && components.path.match(URN_PARSE);
                        var urnComponents = components;
                        if (matches) {
                            var scheme = options.scheme || urnComponents.scheme || "urn";
                            var nid = matches[1].toLowerCase();
                            var nss = matches[2];
                            var urnScheme = scheme + ":" + (options.nid || nid);
                            var schemeHandler = SCHEMES[urnScheme];
                            urnComponents.nid = nid;
                            urnComponents.nss = nss;
                            urnComponents.path = undefined;
                            if (schemeHandler) {
                                urnComponents = schemeHandler.parse(urnComponents, options);
                            }
                        } else {
                            urnComponents.error = urnComponents.error || "URN can not be parsed.";
                        }
                        return urnComponents;
                    },
                    serialize: function serialize$$1(urnComponents, options) {
                        var scheme = options.scheme || urnComponents.scheme || "urn";
                        var nid = urnComponents.nid;
                        var urnScheme = scheme + ":" + (options.nid || nid);
                        var schemeHandler = SCHEMES[urnScheme];
                        if (schemeHandler) {
                            urnComponents = schemeHandler.serialize(urnComponents, options);
                        }
                        var uriComponents = urnComponents;
                        var nss = urnComponents.nss;
                        uriComponents.path = (nid || options.nid) + ":" + nss;
                        return uriComponents;
                    }
                };

                var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
                var handler$6 = {
                    scheme: "urn:uuid",
                    parse: function parse(urnComponents, options) {
                        var uuidComponents = urnComponents;
                        uuidComponents.uuid = uuidComponents.nss;
                        uuidComponents.nss = undefined;
                        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
                            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
                        }
                        return uuidComponents;
                    },
                    serialize: function serialize(uuidComponents, options) {
                        var urnComponents = uuidComponents;
                        //normalize UUID
                        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
                        return urnComponents;
                    }
                };

                SCHEMES[handler.scheme] = handler;
                SCHEMES[handler$1.scheme] = handler$1;
                SCHEMES[handler$2.scheme] = handler$2;
                SCHEMES[handler$3.scheme] = handler$3;
                SCHEMES[handler$4.scheme] = handler$4;
                SCHEMES[handler$5.scheme] = handler$5;
                SCHEMES[handler$6.scheme] = handler$6;

                exports.SCHEMES = SCHEMES;
                exports.pctEncChar = pctEncChar;
                exports.pctDecChars = pctDecChars;
                exports.parse = parse;
                exports.removeDotSegments = removeDotSegments;
                exports.serialize = serialize;
                exports.resolveComponents = resolveComponents;
                exports.resolve = resolve;
                exports.normalize = normalize;
                exports.equal = equal;
                exports.escapeComponent = escapeComponent;
                exports.unescapeComponent = unescapeComponent;

                Object.defineProperty(exports, '__esModule', { value: true });

            })));
//# sourceMappingURL=uri.all.js.map


            /***/ }),

        /***/ "./src/ajv-validator.js":
        /*!******************************!*\
  !*** ./src/ajv-validator.js ***!
  \******************************/
        /*! exports provided: default */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var ajv_dist_2020__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv/dist/2020 */ "./node_modules/ajv/dist/2020.js");
            /* harmony import */ var ajv_dist_2020__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv_dist_2020__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */ var ajv_formats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ajv-formats */ "./node_modules/ajv-formats/dist/index.js");
            /* harmony import */ var ajv_formats__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ajv_formats__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var _meta_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meta-schema */ "./src/meta-schema.json");
            var _meta_schema__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./meta-schema */ "./src/meta-schema.json", 1);
            /* harmony import */ var ajv_dist_refs_json_schema_2020_12_schema_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ajv/dist/refs/json-schema-2020-12/schema.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/schema.json");
            var ajv_dist_refs_json_schema_2020_12_schema_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ajv/dist/refs/json-schema-2020-12/schema.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/schema.json", 1);
            // draft that support "unevaluatedProperties"
            // format validation come from a separate packages (email, date, etc)



            class AjvValidator {
                constructor() {
                    this.ajv = new ajv_dist_2020__WEBPACK_IMPORTED_MODULE_0___default.a({
                        strict: false, // to ignore non json schema keywords (options, defaultProperties, etc)
                        allErrors: true // otherwise it shows just the first error per keyword
                    })

                    this.ajv.addFormat("tabs", {}) // suppress warning for unknown formats
                    this.ajv.addFormat("table", {}) // suppress warning for unknown formats
                    ajv_formats__WEBPACK_IMPORTED_MODULE_1___default()(this.ajv) // activates formats validation (email, date, etc)
                }

                validate202012 (json) {
                    return this.validate(ajv_dist_refs_json_schema_2020_12_schema_json__WEBPACK_IMPORTED_MODULE_3__, json)
                }

                validateJeMetaSchema (json) {
                    return this.validate(_meta_schema__WEBPACK_IMPORTED_MODULE_2__, json)
                }

                validate (schema, json) {
                    let errors = []

                    try {
                        const validate = this.ajv.compile(schema)
                        validate(json)

                        if (Array.isArray(validate.errors)) {
                            errors = validate.errors
                        }
                    } catch (error) {
                        console.log('caught error:', error)
                    }

                    return errors
                }
            }

            /* harmony default export */ __webpack_exports__["default"] = (AjvValidator);

            /***/ }),

        /***/ "./src/meta-schema.json":
        /*!******************************!*\
  !*** ./src/meta-schema.json ***!
  \******************************/
        /*! exports provided: definitions, allOf, default */
        /***/ (function(module) {

            module.exports = JSON.parse("{\"definitions\":{\"schemaArray\":{\"type\":\"array\",\"minItems\":1,\"format\":\"tabs\",\"items\":{\"$ref\":\"#/definitions/schema\"}},\"null\":{\"title\":\"Null\",\"properties\":{\"type\":{\"const\":\"null\"},\"enum\":{\"items\":{\"type\":\"null\"}},\"default\":{\"type\":\"null\",\"propertyOrder\":10}}},\"boolean\":{\"title\":\"Boolean\",\"properties\":{\"type\":{\"const\":\"boolean\"},\"enum\":{\"items\":{\"type\":\"boolean\"}},\"format\":{\"type\":\"string\",\"enum\":[\"select\",\"checkbox\"]},\"default\":{\"type\":\"boolean\",\"propertyOrder\":10}}},\"string\":{\"title\":\"String\",\"properties\":{\"options\":{\"properties\":{\"input_width\":{\"type\":\"string\"},\"input_height\":{\"type\":\"string\"},\"expand_height\":{\"type\":\"boolean\"},\"wysiwyg\":{\"type\":\"boolean\"}}},\"format\":{\"type\":\"string\",\"propertyOrder\":20,\"enum\":[\"color\",\"date\",\"datetime-local\",\"email\",\"month\",\"number\",\"range\",\"tel\",\"text\",\"textarea\",\"time\",\"url\",\"week\",\"actionscript\",\"batchfile\",\"c\",\"c++\",\"cpp\",\"coffee\",\"cshart\",\"css\",\"dart\",\"django\",\"ejs\",\"erlang\",\"golang\",\"groovy\",\"handlebars\",\"haskell\",\"haxe\",\"html\",\"ini\",\"jade\",\"java\",\"javascript\",\"json\",\"less\",\"lisp\",\"lua\",\"makefile\",\"markdown\",\"matlab\",\"mysql\",\"objectivec\",\"pascal\",\"perl\",\"pgsql\",\"php\",\"python\",\"r\",\"ruby\",\"sass\",\"scala\",\"scss\",\"smarty\",\"sql\",\"stylus\",\"svg\",\"twig\",\"vbscript\",\"xml\",\"yaml\"]},\"minLength\":{\"type\":\"integer\",\"minimum\":0,\"propertyOrder\":25},\"maxLength\":{\"type\":\"integer\",\"minimum\":0,\"propertyOrder\":30},\"pattern\":{\"type\":\"string\",\"format\":\"regex\",\"propertyOrder\":35},\"type\":{\"enum\":[\"string\"]},\"enum\":{\"items\":{\"type\":\"string\"}},\"default\":{\"type\":\"string\",\"propertyOrder\":10},\"media\":{\"type\":\"object\",\"additionalProperties\":false,\"properties\":{\"type\":{\"type\":\"string\"}}},\"template\":{\"type\":\"string\"}}},\"number\":{\"title\":\"Number\",\"properties\":{\"options\":{\"properties\":{\"input_width\":{\"type\":\"string\"},\"input_height\":{\"type\":\"string\"},\"expand_height\":{\"type\":\"boolean\"}}},\"type\":{\"const\":\"number\"},\"format\":{\"type\":\"string\",\"propertyOrder\":20,\"enum\":[\"number\"]},\"enum\":{\"items\":{\"type\":\"number\"}},\"default\":{\"type\":\"number\"},\"minimum\":{\"type\":\"number\",\"propertyOrder\":25},\"maximum\":{\"type\":\"number\",\"propertyOrder\":30},\"multipleOf\":{\"type\":\"number\",\"propertyOrder\":35}}},\"integer\":{\"title\":\"Integer\",\"properties\":{\"options\":{\"properties\":{\"input_width\":{\"type\":\"string\"},\"input_height\":{\"type\":\"string\"},\"expand_height\":{\"type\":\"boolean\"}}},\"default\":{\"type\":\"integer\"},\"minimum\":{\"type\":\"number\",\"propertyOrder\":25},\"maximum\":{\"type\":\"number\",\"propertyOrder\":30},\"multipleOf\":{\"type\":\"number\",\"propertyOrder\":35},\"type\":{\"const\":\"integer\"},\"format\":{\"type\":\"string\",\"propertyOrder\":20,\"enum\":[\"number\"]},\"enum\":{\"items\":{\"type\":\"integer\"}}}},\"object\":{\"title\":\"Object\",\"defaultProperties\":[\"properties\"],\"properties\":{\"options\":{\"properties\":{\"collapsed\":{\"type\":\"boolean\"},\"disable_collapse\":{\"type\":\"boolean\"},\"disable_edit_json\":{\"type\":\"boolean\"},\"disable_properties\":{\"type\":\"boolean\"},\"remove_empty_properties\":{\"type\":\"boolean\"},\"layout\":{\"type\":\"string\",\"enum\":[\"grid\"]}}},\"type\":{\"const\":\"object\"},\"default\":{\"type\":\"object\"},\"properties\":{\"type\":\"object\",\"patternProperties\":{\".*\":{\"$ref\":\"#/definitions/schema\"}}},\"patternProperties\":{\"type\":\"object\",\"patternProperties\":{\".*\":{\"$ref\":\"#/definitions/schema\"}}},\"dependentSchemas\":{\"type\":\"object\",\"patternProperties\":{\".*\":{\"$ref\":\"#/definitions/schema\"}}},\"additionalProperties\":{\"type\":\"boolean\"},\"required\":{\"type\":\"array\",\"uniqueItems\":true,\"format\":\"table\",\"items\":{\"type\":\"string\",\"title\":\"property\"}},\"format\":{\"type\":\"string\",\"enum\":[\"grid\"]}}},\"array\":{\"title\":\"Array\",\"defaultProperties\":[\"items\"],\"properties\":{\"options\":{\"properties\":{\"collapsed\":{\"type\":\"boolean\"},\"disable_array_add\":{\"type\":\"boolean\"},\"disable_array_delete\":{\"type\":\"boolean\"},\"disable_array_delete_all_rows\":{\"type\":\"boolean\"},\"disable_array_delete_last_row\":{\"type\":\"boolean\"},\"disable_array_reorder\":{\"type\":\"boolean\"},\"disable_collapse\":{\"type\":\"boolean\"}}},\"type\":{\"const\":\"array\"},\"default\":{\"type\":\"array\",\"format\":\"table\"},\"items\":{\"oneOf\":[{\"$ref\":\"#/definitions/schema\"},{\"$ref\":\"#/definitions/schemaArray\"}]},\"uniqueItems\":{\"type\":\"boolean\"},\"minItems\":{\"type\":\"integer\",\"minimum\":0},\"maxItems\":{\"type\":\"integer\",\"minimum\":0},\"contains\":{\"$ref\":\"#/definitions/schema\"},\"minContains\":{\"type\":\"integer\",\"minimum\":0},\"maxContains\":{\"type\":\"integer\",\"minimum\":0},\"additionalItems\":{\"$ref\":\"#/definitions/schema\"},\"format\":{\"type\":\"string\",\"enum\":[\"array\",\"table\",\"tabs\",\"tabs-top\",\"checkbox\",\"select\",\"categories\"]}}},\"schemaBase\":{\"type\":\"object\",\"defaultProperties\":[\"title\",\"type\"],\"required\":[\"type\"],\"properties\":{\"type\":{\"propertyOrder\":1,\"type\":\"string\",\"enum\":[\"object\",\"array\",\"string\",\"number\",\"integer\",\"boolean\",\"null\"],\"options\":{\"hidden\":true}},\"id\":{\"type\":\"string\",\"format\":\"uri\"},\"$schema\":{\"type\":\"string\",\"format\":\"uri\"},\"title\":{\"type\":\"string\",\"propertyOrder\":2},\"description\":{\"type\":\"string\",\"propertyOrder\":4},\"enum\":{\"type\":\"array\",\"minItems\":1,\"uniqueItems\":true,\"propertyOrder\":50,\"format\":\"table\"},\"const\":{\"type\":[\"object\",\"array\",\"string\",\"number\",\"integer\",\"boolean\",\"null\"]},\"enumSource\":{\"oneOf\":[{\"title\":\"Simple Source\",\"type\":\"string\"},{\"title\":\"Complex Source\",\"type\":\"array\",\"format\":\"tabs\",\"minItems\":1,\"items\":{\"oneOf\":[{\"title\":\"Constant Values\",\"type\":\"array\",\"format\":\"table\",\"uniqueItems\":true,\"items\":{\"type\":\"string\"}},{\"title\":\"Source\",\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"source\"],\"defaultProperties\":[\"source\"],\"properties\":{\"source\":{\"oneOf\":[{\"title\":\"Watched Field\",\"type\":\"string\"},{\"title\":\"Constant Values\",\"type\":\"array\",\"format\":\"table\",\"minItems\":1,\"items\":{\"title\":\"value\",\"type\":\"object\",\"additionalProperties\":false,\"properties\":{\"value\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}}}}]},\"slice\":{\"type\":\"array\",\"format\":\"table\",\"minItems\":2,\"maxItems\":2,\"items\":{\"type\":\"integer\"}},\"filter\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"value\":{\"type\":\"string\"}}}]}}]},\"$ref\":{\"type\":\"string\"},\"oneOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"anyOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"allOf\":{\"$ref\":\"#/definitions/schemaArray\"},\"not\":{\"$ref\":\"#/definitions/schema\"},\"if\":{\"$ref\":\"#/definitions/schema\"},\"then\":{\"$ref\":\"#/definitions/schema\"},\"else\":{\"$ref\":\"#/definitions/schema\"},\"propertyOrder\":{\"type\":\"number\",\"default\":1000},\"links\":{\"type\":\"array\",\"format\":\"table\",\"items\":{\"type\":\"object\",\"title\":\"link\",\"additionalProperties\":false,\"properties\":{\"rel\":{\"type\":\"string\"},\"href\":{\"type\":\"string\",\"format\":\"url\"},\"class\":{\"type\":\"string\"},\"download\":{\"oneOf\":[{\"type\":\"boolean\"},{\"type\":\"string\"}]},\"mediaType\":{\"type\":\"string\"}}}},\"watch\":{\"type\":\"object\",\"patternProperties\":{\".*\":{\"type\":\"string\"}}},\"headerTemplate\":{\"type\":\"string\"},\"options\":{\"type\":\"object\",\"options\":{\"keep_oneof_values\":false},\"default\":{},\"defaultProperties\":{},\"properties\":{\"enum_titles\":{\"type\":\"array\",\"uniqueItems\":true,\"format\":\"table\",\"items\":{\"type\":\"string\",\"tilte\":\"title\"}},\"grid_columns\":{\"type\":\"integer\",\"default\":1,\"minimum\":1,\"maximum\":12},\"hidden\":{\"type\":\"boolean\"},\"keep_oneof_values\":{\"type\":\"boolean\"}}}}},\"schema\":{\"allOf\":[{\"$ref\":\"#/definitions/schemaBase\"}],\"unevaluatedProperties\":false,\"title\":\"schema\",\"options\":{\"keep_oneof_values\":false},\"default\":{\"type\":\"object\"},\"oneOf\":[{\"allOf\":[{\"$ref\":\"#/definitions/object\"}]},{\"allOf\":[{\"$ref\":\"#/definitions/array\"}]},{\"allOf\":[{\"$ref\":\"#/definitions/string\"}]},{\"allOf\":[{\"$ref\":\"#/definitions/number\"}]},{\"allOf\":[{\"$ref\":\"#/definitions/integer\"}]},{\"allOf\":[{\"$ref\":\"#/definitions/boolean\"}]},{\"allOf\":[{\"$ref\":\"#/definitions/null\"}]}]}},\"allOf\":[{\"$ref\":\"#/definitions/schema\"},{\"title\":\"JSON Schema\",\"properties\":{\"definitions\":{\"type\":\"object\",\"patternProperties\":{\".*\":{\"$ref\":\"#/definitions/schema\"}}}}}]}");

            /***/ })

        /******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9BanZWYWxpZGF0b3Ivd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0FqdlZhbGlkYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2LWZvcm1hdHMvZGlzdC9mb3JtYXRzLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYtZm9ybWF0cy9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYtZm9ybWF0cy9kaXN0L2xpbWl0LmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC8yMDIwLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9hanYuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvY29kZWdlbi9jb2RlLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2NvZGVnZW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvY29kZWdlbi9zY29wZS5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvbmFtZXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvcmVmX2Vycm9yLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3Jlc29sdmUuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvcnVsZXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdXRpbC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9hcHBsaWNhYmlsaXR5LmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2Jvb2xTY2hlbWEuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvZGF0YVR5cGUuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUva2V5d29yZC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9zdWJzY2hlbWEuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvcmUuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3JlZnMvanNvbi1zY2hlbWEtMjAyMC0xMi9pbmRleC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS9lcXVhbC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS91Y3MybGVuZ3RoLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9ydW50aW1lL3VyaS5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS92YWxpZGF0aW9uX2Vycm9yLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hZGRpdGlvbmFsSXRlbXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2FkZGl0aW9uYWxQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hbGxPZi5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvYW55T2YuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2NvbnRhaW5zLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9kZXBlbmRlbmNpZXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2RlcGVuZGVudFNjaGVtYXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2lmLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvaXRlbXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2l0ZW1zMjAyMC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3Ivbm90LmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9vbmVPZi5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvcGF0dGVyblByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3ByZWZpeEl0ZW1zLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9wcm9wZXJ0eU5hbWVzLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci90aGVuRWxzZS5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvZGUuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9jb3JlL2lkLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvcmUvcmVmLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvZGlzY3JpbWluYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2Rpc2NyaW1pbmF0b3IvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9kcmFmdDIwMjAuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9kcmFmdDcuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9keW5hbWljL2R5bmFtaWNBbmNob3IuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9keW5hbWljL2R5bmFtaWNSZWYuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9keW5hbWljL2luZGV4LmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvZHluYW1pYy9yZWN1cnNpdmVBbmNob3IuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9keW5hbWljL3JlY3Vyc2l2ZVJlZi5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2Zvcm1hdC9mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9mb3JtYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL25leHQuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy91bmV2YWx1YXRlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3VuZXZhbHVhdGVkL3VuZXZhbHVhdGVkSXRlbXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy91bmV2YWx1YXRlZC91bmV2YWx1YXRlZFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2NvbnN0LmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9kZXBlbmRlbnRSZXF1aXJlZC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vZW51bS5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0Q29udGFpbnMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0SXRlbXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0TGVuZ3RoLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9saW1pdE51bWJlci5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vbGltaXRQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9tdWx0aXBsZU9mLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9wYXR0ZXJuLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9yZXF1aXJlZC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vdW5pcXVlSXRlbXMuanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9BanZWYWxpZGF0b3IvLi9ub2RlX21vZHVsZXMvanNvbi1zY2hlbWEtdHJhdmVyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQWp2VmFsaWRhdG9yLy4vbm9kZV9tb2R1bGVzL3VyaS1qcy9kaXN0L2VzNS91cmkuYWxsLmpzIiwid2VicGFjazovL0FqdlZhbGlkYXRvci8uL3NyYy9hanYtdmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtR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QzFCO0FBQ0E7QUFDQSxLQUFLOztBQUVMLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsSUFBSSxrREFBVTtBQUNkOztBQUVBO0FBQ0EseUJBQXlCLDBFQUFhO0FBQ3RDOztBQUVBO0FBQ0EseUJBQXlCLHlDQUFZO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFZSwyRSIsImZpbGUiOiJhanYtdmFsaWRhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQWp2VmFsaWRhdG9yXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkFqdlZhbGlkYXRvclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2Fqdi12YWxpZGF0b3IuanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZm9ybWF0TmFtZXMgPSBleHBvcnRzLmZhc3RGb3JtYXRzID0gZXhwb3J0cy5mdWxsRm9ybWF0cyA9IHZvaWQgMDtcbmZ1bmN0aW9uIGZtdERlZih2YWxpZGF0ZSwgY29tcGFyZSkge1xuICAgIHJldHVybiB7IHZhbGlkYXRlLCBjb21wYXJlIH07XG59XG5leHBvcnRzLmZ1bGxGb3JtYXRzID0ge1xuICAgIC8vIGRhdGU6IGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkjc2VjdGlvbi01LjZcbiAgICBkYXRlOiBmbXREZWYoZGF0ZSwgY29tcGFyZURhdGUpLFxuICAgIC8vIGRhdGUtdGltZTogaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzMzOSNzZWN0aW9uLTUuNlxuICAgIHRpbWU6IGZtdERlZih0aW1lLCBjb21wYXJlVGltZSksXG4gICAgXCJkYXRlLXRpbWVcIjogZm10RGVmKGRhdGVfdGltZSwgY29tcGFyZURhdGVUaW1lKSxcbiAgICAvLyBkdXJhdGlvbjogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkjYXBwZW5kaXgtQVxuICAgIGR1cmF0aW9uOiAvXlAoPyEkKSgoXFxkK1kpPyhcXGQrTSk/KFxcZCtEKT8oVCg/PVxcZCkoXFxkK0gpPyhcXGQrTSk/KFxcZCtTKT8pP3woXFxkK1cpPykkLyxcbiAgICB1cmksXG4gICAgXCJ1cmktcmVmZXJlbmNlXCI6IC9eKD86W2Etel1bYS16MC05K1xcLS5dKjopPyg/OlxcLz9cXC8oPzooPzpbYS16MC05XFwtLl9+ISQmJygpKissOz06XXwlWzAtOWEtZl17Mn0pKkApPyg/OlxcWyg/Oig/Oig/Oig/OlswLTlhLWZdezEsNH06KXs2fXw6Oig/OlswLTlhLWZdezEsNH06KXs1fXwoPzpbMC05YS1mXXsxLDR9KT86Oig/OlswLTlhLWZdezEsNH06KXs0fXwoPzooPzpbMC05YS1mXXsxLDR9Oil7MCwxfVswLTlhLWZdezEsNH0pPzo6KD86WzAtOWEtZl17MSw0fTopezN9fCg/Oig/OlswLTlhLWZdezEsNH06KXswLDJ9WzAtOWEtZl17MSw0fSk/OjooPzpbMC05YS1mXXsxLDR9Oil7Mn18KD86KD86WzAtOWEtZl17MSw0fTopezAsM31bMC05YS1mXXsxLDR9KT86OlswLTlhLWZdezEsNH06fCg/Oig/OlswLTlhLWZdezEsNH06KXswLDR9WzAtOWEtZl17MSw0fSk/OjopKD86WzAtOWEtZl17MSw0fTpbMC05YS1mXXsxLDR9fCg/Oig/OjI1WzAtNV18MlswLTRdXFxkfFswMV0/XFxkXFxkPylcXC4pezN9KD86MjVbMC01XXwyWzAtNF1cXGR8WzAxXT9cXGRcXGQ/KSl8KD86KD86WzAtOWEtZl17MSw0fTopezAsNX1bMC05YS1mXXsxLDR9KT86OlswLTlhLWZdezEsNH18KD86KD86WzAtOWEtZl17MSw0fTopezAsNn1bMC05YS1mXXsxLDR9KT86Oil8W1Z2XVswLTlhLWZdK1xcLlthLXowLTlcXC0uX34hJCYnKCkqKyw7PTpdKylcXF18KD86KD86MjVbMC01XXwyWzAtNF1cXGR8WzAxXT9cXGRcXGQ/KVxcLil7M30oPzoyNVswLTVdfDJbMC00XVxcZHxbMDFdP1xcZFxcZD8pfCg/OlthLXowLTlcXC0uX34hJCYnXCIoKSorLDs9XXwlWzAtOWEtZl17Mn0pKikoPzo6XFxkKik/KD86XFwvKD86W2EtejAtOVxcLS5ffiEkJidcIigpKissOz06QF18JVswLTlhLWZdezJ9KSopKnxcXC8oPzooPzpbYS16MC05XFwtLl9+ISQmJ1wiKCkqKyw7PTpAXXwlWzAtOWEtZl17Mn0pKyg/OlxcLyg/OlthLXowLTlcXC0uX34hJCYnXCIoKSorLDs9OkBdfCVbMC05YS1mXXsyfSkqKSopP3woPzpbYS16MC05XFwtLl9+ISQmJ1wiKCkqKyw7PTpAXXwlWzAtOWEtZl17Mn0pKyg/OlxcLyg/OlthLXowLTlcXC0uX34hJCYnXCIoKSorLDs9OkBdfCVbMC05YS1mXXsyfSkqKSopPyg/OlxcPyg/OlthLXowLTlcXC0uX34hJCYnXCIoKSorLDs9OkAvP118JVswLTlhLWZdezJ9KSopPyg/OiMoPzpbYS16MC05XFwtLl9+ISQmJ1wiKCkqKyw7PTpALz9dfCVbMC05YS1mXXsyfSkqKT8kL2ksXG4gICAgLy8gdXJpLXRlbXBsYXRlOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjU3MFxuICAgIFwidXJpLXRlbXBsYXRlXCI6IC9eKD86KD86W15cXHgwMC1cXHgyMFwiJzw+JVxcXFxeYHt8fV18JVswLTlhLWZdezJ9KXxcXHtbKyMuLzs/Jj0sIUB8XT8oPzpbYS16MC05X118JVswLTlhLWZdezJ9KSsoPzo6WzEtOV1bMC05XXswLDN9fFxcKik/KD86LCg/OlthLXowLTlfXXwlWzAtOWEtZl17Mn0pKyg/OjpbMS05XVswLTldezAsM318XFwqKT8pKlxcfSkqJC9pLFxuICAgIC8vIEZvciB0aGUgc291cmNlOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kcGVyaW5pLzcyOTI5NFxuICAgIC8vIEZvciB0ZXN0IGNhc2VzOiBodHRwczovL21hdGhpYXNieW5lbnMuYmUvZGVtby91cmwtcmVnZXhcbiAgICB1cmw6IC9eKD86aHR0cHM/fGZ0cCk6XFwvXFwvKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXowLTlcXHV7MDBhMX0tXFx1e2ZmZmZ9XSstKSpbYS16MC05XFx1ezAwYTF9LVxcdXtmZmZmfV0rKSg/OlxcLig/OlthLXowLTlcXHV7MDBhMX0tXFx1e2ZmZmZ9XSstKSpbYS16MC05XFx1ezAwYTF9LVxcdXtmZmZmfV0rKSooPzpcXC4oPzpbYS16XFx1ezAwYTF9LVxcdXtmZmZmfV17Mix9KSkpKD86OlxcZHsyLDV9KT8oPzpcXC9bXlxcc10qKT8kL2l1LFxuICAgIGVtYWlsOiAvXlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pPyQvaSxcbiAgICBob3N0bmFtZTogL14oPz0uezEsMjUzfVxcLj8kKVthLXowLTldKD86W2EtejAtOS1dezAsNjF9W2EtejAtOV0pPyg/OlxcLlthLXowLTldKD86Wy0wLTlhLXpdezAsNjF9WzAtOWEtel0pPykqXFwuPyQvaSxcbiAgICAvLyBvcHRpbWl6ZWQgaHR0cHM6Ly93d3cuc2FmYXJpYm9va3NvbmxpbmUuY29tL2xpYnJhcnkvdmlldy9yZWd1bGFyLWV4cHJlc3Npb25zLWNvb2tib29rLzk3ODA1OTY4MDI4MzcvY2gwN3MxNi5odG1sXG4gICAgaXB2NDogL14oPzooPzoyNVswLTVdfDJbMC00XVxcZHxbMDFdP1xcZFxcZD8pXFwuKXszfSg/OjI1WzAtNV18MlswLTRdXFxkfFswMV0/XFxkXFxkPykkLyxcbiAgICBpcHY2OiAvXigoKFswLTlhLWZdezEsNH06KXs3fShbMC05YS1mXXsxLDR9fDopKXwoKFswLTlhLWZdezEsNH06KXs2fSg6WzAtOWEtZl17MSw0fXwoKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSl8OikpfCgoWzAtOWEtZl17MSw0fTopezV9KCgoOlswLTlhLWZdezEsNH0pezEsMn0pfDooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSl8OikpfCgoWzAtOWEtZl17MSw0fTopezR9KCgoOlswLTlhLWZdezEsNH0pezEsM30pfCgoOlswLTlhLWZdezEsNH0pPzooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSkpfDopKXwoKFswLTlhLWZdezEsNH06KXszfSgoKDpbMC05YS1mXXsxLDR9KXsxLDR9KXwoKDpbMC05YS1mXXsxLDR9KXswLDJ9OigoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCgoWzAtOWEtZl17MSw0fTopezJ9KCgoOlswLTlhLWZdezEsNH0pezEsNX0pfCgoOlswLTlhLWZdezEsNH0pezAsM306KCgyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoXFwuKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pKXw6KSl8KChbMC05YS1mXXsxLDR9Oil7MX0oKCg6WzAtOWEtZl17MSw0fSl7MSw2fSl8KCg6WzAtOWEtZl17MSw0fSl7MCw0fTooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSkpfDopKXwoOigoKDpbMC05YS1mXXsxLDR9KXsxLDd9KXwoKDpbMC05YS1mXXsxLDR9KXswLDV9OigoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpKSQvaSxcbiAgICByZWdleCxcbiAgICAvLyB1dWlkOiBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0MTIyXG4gICAgdXVpZDogL14oPzp1cm46dXVpZDopP1swLTlhLWZdezh9LSg/OlswLTlhLWZdezR9LSl7M31bMC05YS1mXXsxMn0kL2ksXG4gICAgLy8gSlNPTi1wb2ludGVyOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjkwMVxuICAgIC8vIHVyaSBmcmFnbWVudDogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjYXBwZW5kaXgtQVxuICAgIFwianNvbi1wb2ludGVyXCI6IC9eKD86XFwvKD86W15+L118fjB8fjEpKikqJC8sXG4gICAgXCJqc29uLXBvaW50ZXItdXJpLWZyYWdtZW50XCI6IC9eIyg/OlxcLyg/OlthLXowLTlfXFwtLiEkJicoKSorLDs6PUBdfCVbMC05YS1mXXsyfXx+MHx+MSkqKSokL2ksXG4gICAgLy8gcmVsYXRpdmUgSlNPTi1wb2ludGVyOiBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9kcmFmdC1sdWZmLXJlbGF0aXZlLWpzb24tcG9pbnRlci0wMFxuICAgIFwicmVsYXRpdmUtanNvbi1wb2ludGVyXCI6IC9eKD86MHxbMS05XVswLTldKikoPzojfCg/OlxcLyg/Oltefi9dfH4wfH4xKSopKikkLyxcbiAgICAvLyB0aGUgZm9sbG93aW5nIGZvcm1hdHMgYXJlIHVzZWQgYnkgdGhlIG9wZW5hcGkgc3BlY2lmaWNhdGlvbjogaHR0cHM6Ly9zcGVjLm9wZW5hcGlzLm9yZy9vYXMvdjMuMC4wI2RhdGEtdHlwZXNcbiAgICAvLyBieXRlOiBodHRwczovL2dpdGh1Yi5jb20vbWlndWVsbW90YS9pcy1iYXNlNjRcbiAgICBieXRlLFxuICAgIC8vIHNpZ25lZCAzMiBiaXQgaW50ZWdlclxuICAgIGludDMyOiB7IHR5cGU6IFwibnVtYmVyXCIsIHZhbGlkYXRlOiB2YWxpZGF0ZUludDMyIH0sXG4gICAgLy8gc2lnbmVkIDY0IGJpdCBpbnRlZ2VyXG4gICAgaW50NjQ6IHsgdHlwZTogXCJudW1iZXJcIiwgdmFsaWRhdGU6IHZhbGlkYXRlSW50NjQgfSxcbiAgICAvLyBDLXR5cGUgZmxvYXRcbiAgICBmbG9hdDogeyB0eXBlOiBcIm51bWJlclwiLCB2YWxpZGF0ZTogdmFsaWRhdGVOdW1iZXIgfSxcbiAgICAvLyBDLXR5cGUgZG91YmxlXG4gICAgZG91YmxlOiB7IHR5cGU6IFwibnVtYmVyXCIsIHZhbGlkYXRlOiB2YWxpZGF0ZU51bWJlciB9LFxuICAgIC8vIGhpbnQgdG8gdGhlIFVJIHRvIGhpZGUgaW5wdXQgc3RyaW5nc1xuICAgIHBhc3N3b3JkOiB0cnVlLFxuICAgIC8vIHVuY2hlY2tlZCBzdHJpbmcgcGF5bG9hZFxuICAgIGJpbmFyeTogdHJ1ZSxcbn07XG5leHBvcnRzLmZhc3RGb3JtYXRzID0ge1xuICAgIC4uLmV4cG9ydHMuZnVsbEZvcm1hdHMsXG4gICAgZGF0ZTogZm10RGVmKC9eXFxkXFxkXFxkXFxkLVswLTFdXFxkLVswLTNdXFxkJC8sIGNvbXBhcmVEYXRlKSxcbiAgICB0aW1lOiBmbXREZWYoL14oPzpbMC0yXVxcZDpbMC01XVxcZDpbMC01XVxcZHwyMzo1OTo2MCkoPzpcXC5cXGQrKT8oPzp6fFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/KT8kL2ksIGNvbXBhcmVUaW1lKSxcbiAgICBcImRhdGUtdGltZVwiOiBmbXREZWYoL15cXGRcXGRcXGRcXGQtWzAtMV1cXGQtWzAtM11cXGRbdFxcc10oPzpbMC0yXVxcZDpbMC01XVxcZDpbMC01XVxcZHwyMzo1OTo2MCkoPzpcXC5cXGQrKT8oPzp6fFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/KSQvaSwgY29tcGFyZURhdGVUaW1lKSxcbiAgICAvLyB1cmk6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYWZpbnRvc2gvaXMtbXktanNvbi12YWxpZC9ibG9iL21hc3Rlci9mb3JtYXRzLmpzXG4gICAgdXJpOiAvXig/OlthLXpdW2EtejAtOStcXC0uXSo6KSg/OlxcLz9cXC8pP1teXFxzXSokL2ksXG4gICAgXCJ1cmktcmVmZXJlbmNlXCI6IC9eKD86KD86W2Etel1bYS16MC05K1xcLS5dKjopP1xcLz9cXC8pPyg/OlteXFxcXFxccyNdW15cXHMjXSopPyg/OiNbXlxcXFxcXHNdKik/JC9pLFxuICAgIC8vIGVtYWlsIChzb3VyY2VzIGZyb20ganNlbiB2YWxpZGF0b3IpOlxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjAxMzIzL3VzaW5nLWEtcmVndWxhci1leHByZXNzaW9uLXRvLXZhbGlkYXRlLWFuLWVtYWlsLWFkZHJlc3MjYW5zd2VyLTg4MjkzNjNcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI3ZhbGlkLWUtbWFpbC1hZGRyZXNzIChzZWFyY2ggZm9yICd3aWxmdWwgdmlvbGF0aW9uJylcbiAgICBlbWFpbDogL15bYS16MC05LiEjJCUmJyorLz0/Xl9ge3x9fi1dK0BbYS16MC05XSg/OlthLXowLTktXXswLDYxfVthLXowLTldKT8oPzpcXC5bYS16MC05XSg/OlthLXowLTktXXswLDYxfVthLXowLTldKT8pKiQvaSxcbn07XG5leHBvcnRzLmZvcm1hdE5hbWVzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5mdWxsRm9ybWF0cyk7XG5mdW5jdGlvbiBpc0xlYXBZZWFyKHllYXIpIHtcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzMzOSNhcHBlbmRpeC1DXG4gICAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmICh5ZWFyICUgMTAwICE9PSAwIHx8IHllYXIgJSA0MDAgPT09IDApO1xufVxuY29uc3QgREFURSA9IC9eKFxcZFxcZFxcZFxcZCktKFxcZFxcZCktKFxcZFxcZCkkLztcbmNvbnN0IERBWVMgPSBbMCwgMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG5mdW5jdGlvbiBkYXRlKHN0cikge1xuICAgIC8vIGZ1bGwtZGF0ZSBmcm9tIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkjc2VjdGlvbi01LjZcbiAgICBjb25zdCBtYXRjaGVzID0gREFURS5leGVjKHN0cik7XG4gICAgaWYgKCFtYXRjaGVzKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgeWVhciA9ICttYXRjaGVzWzFdO1xuICAgIGNvbnN0IG1vbnRoID0gK21hdGNoZXNbMl07XG4gICAgY29uc3QgZGF5ID0gK21hdGNoZXNbM107XG4gICAgcmV0dXJuIChtb250aCA+PSAxICYmXG4gICAgICAgIG1vbnRoIDw9IDEyICYmXG4gICAgICAgIGRheSA+PSAxICYmXG4gICAgICAgIGRheSA8PSAobW9udGggPT09IDIgJiYgaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogREFZU1ttb250aF0pKTtcbn1cbmZ1bmN0aW9uIGNvbXBhcmVEYXRlKGQxLCBkMikge1xuICAgIGlmICghKGQxICYmIGQyKSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBpZiAoZDEgPiBkMilcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgaWYgKGQxIDwgZDIpXG4gICAgICAgIHJldHVybiAtMTtcbiAgICByZXR1cm4gMDtcbn1cbmNvbnN0IFRJTUUgPSAvXihcXGRcXGQpOihcXGRcXGQpOihcXGRcXGQpKFxcLlxcZCspPyh6fFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/KT8kL2k7XG5mdW5jdGlvbiB0aW1lKHN0ciwgd2l0aFRpbWVab25lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IFRJTUUuZXhlYyhzdHIpO1xuICAgIGlmICghbWF0Y2hlcylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGhvdXIgPSArbWF0Y2hlc1sxXTtcbiAgICBjb25zdCBtaW51dGUgPSArbWF0Y2hlc1syXTtcbiAgICBjb25zdCBzZWNvbmQgPSArbWF0Y2hlc1szXTtcbiAgICBjb25zdCB0aW1lWm9uZSA9IG1hdGNoZXNbNV07XG4gICAgcmV0dXJuICgoKGhvdXIgPD0gMjMgJiYgbWludXRlIDw9IDU5ICYmIHNlY29uZCA8PSA1OSkgfHxcbiAgICAgICAgKGhvdXIgPT09IDIzICYmIG1pbnV0ZSA9PT0gNTkgJiYgc2Vjb25kID09PSA2MCkpICYmXG4gICAgICAgICghd2l0aFRpbWVab25lIHx8IHRpbWVab25lICE9PSBcIlwiKSk7XG59XG5mdW5jdGlvbiBjb21wYXJlVGltZSh0MSwgdDIpIHtcbiAgICBpZiAoISh0MSAmJiB0MikpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgYTEgPSBUSU1FLmV4ZWModDEpO1xuICAgIGNvbnN0IGEyID0gVElNRS5leGVjKHQyKTtcbiAgICBpZiAoIShhMSAmJiBhMikpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgdDEgPSBhMVsxXSArIGExWzJdICsgYTFbM10gKyAoYTFbNF0gfHwgXCJcIik7XG4gICAgdDIgPSBhMlsxXSArIGEyWzJdICsgYTJbM10gKyAoYTJbNF0gfHwgXCJcIik7XG4gICAgaWYgKHQxID4gdDIpXG4gICAgICAgIHJldHVybiAxO1xuICAgIGlmICh0MSA8IHQyKVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgcmV0dXJuIDA7XG59XG5jb25zdCBEQVRFX1RJTUVfU0VQQVJBVE9SID0gL3R8XFxzL2k7XG5mdW5jdGlvbiBkYXRlX3RpbWUoc3RyKSB7XG4gICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzMzOSNzZWN0aW9uLTUuNlxuICAgIGNvbnN0IGRhdGVUaW1lID0gc3RyLnNwbGl0KERBVEVfVElNRV9TRVBBUkFUT1IpO1xuICAgIHJldHVybiBkYXRlVGltZS5sZW5ndGggPT09IDIgJiYgZGF0ZShkYXRlVGltZVswXSkgJiYgdGltZShkYXRlVGltZVsxXSwgdHJ1ZSk7XG59XG5mdW5jdGlvbiBjb21wYXJlRGF0ZVRpbWUoZHQxLCBkdDIpIHtcbiAgICBpZiAoIShkdDEgJiYgZHQyKSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBbZDEsIHQxXSA9IGR0MS5zcGxpdChEQVRFX1RJTUVfU0VQQVJBVE9SKTtcbiAgICBjb25zdCBbZDIsIHQyXSA9IGR0Mi5zcGxpdChEQVRFX1RJTUVfU0VQQVJBVE9SKTtcbiAgICBjb25zdCByZXMgPSBjb21wYXJlRGF0ZShkMSwgZDIpO1xuICAgIGlmIChyZXMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzIHx8IGNvbXBhcmVUaW1lKHQxLCB0Mik7XG59XG5jb25zdCBOT1RfVVJJX0ZSQUdNRU5UID0gL1xcL3w6LztcbmNvbnN0IFVSSSA9IC9eKD86W2Etel1bYS16MC05K1xcLS5dKjopKD86XFwvP1xcLyg/Oig/OlthLXowLTlcXC0uX34hJCYnKCkqKyw7PTpdfCVbMC05YS1mXXsyfSkqQCk/KD86XFxbKD86KD86KD86KD86WzAtOWEtZl17MSw0fTopezZ9fDo6KD86WzAtOWEtZl17MSw0fTopezV9fCg/OlswLTlhLWZdezEsNH0pPzo6KD86WzAtOWEtZl17MSw0fTopezR9fCg/Oig/OlswLTlhLWZdezEsNH06KXswLDF9WzAtOWEtZl17MSw0fSk/OjooPzpbMC05YS1mXXsxLDR9Oil7M318KD86KD86WzAtOWEtZl17MSw0fTopezAsMn1bMC05YS1mXXsxLDR9KT86Oig/OlswLTlhLWZdezEsNH06KXsyfXwoPzooPzpbMC05YS1mXXsxLDR9Oil7MCwzfVswLTlhLWZdezEsNH0pPzo6WzAtOWEtZl17MSw0fTp8KD86KD86WzAtOWEtZl17MSw0fTopezAsNH1bMC05YS1mXXsxLDR9KT86OikoPzpbMC05YS1mXXsxLDR9OlswLTlhLWZdezEsNH18KD86KD86MjVbMC01XXwyWzAtNF1cXGR8WzAxXT9cXGRcXGQ/KVxcLil7M30oPzoyNVswLTVdfDJbMC00XVxcZHxbMDFdP1xcZFxcZD8pKXwoPzooPzpbMC05YS1mXXsxLDR9Oil7MCw1fVswLTlhLWZdezEsNH0pPzo6WzAtOWEtZl17MSw0fXwoPzooPzpbMC05YS1mXXsxLDR9Oil7MCw2fVswLTlhLWZdezEsNH0pPzo6KXxbVnZdWzAtOWEtZl0rXFwuW2EtejAtOVxcLS5ffiEkJicoKSorLDs9Ol0rKVxcXXwoPzooPzoyNVswLTVdfDJbMC00XVxcZHxbMDFdP1xcZFxcZD8pXFwuKXszfSg/OjI1WzAtNV18MlswLTRdXFxkfFswMV0/XFxkXFxkPyl8KD86W2EtejAtOVxcLS5ffiEkJicoKSorLDs9XXwlWzAtOWEtZl17Mn0pKikoPzo6XFxkKik/KD86XFwvKD86W2EtejAtOVxcLS5ffiEkJicoKSorLDs9OkBdfCVbMC05YS1mXXsyfSkqKSp8XFwvKD86KD86W2EtejAtOVxcLS5ffiEkJicoKSorLDs9OkBdfCVbMC05YS1mXXsyfSkrKD86XFwvKD86W2EtejAtOVxcLS5ffiEkJicoKSorLDs9OkBdfCVbMC05YS1mXXsyfSkqKSopP3woPzpbYS16MC05XFwtLl9+ISQmJygpKissOz06QF18JVswLTlhLWZdezJ9KSsoPzpcXC8oPzpbYS16MC05XFwtLl9+ISQmJygpKissOz06QF18JVswLTlhLWZdezJ9KSopKikoPzpcXD8oPzpbYS16MC05XFwtLl9+ISQmJygpKissOz06QC8/XXwlWzAtOWEtZl17Mn0pKik/KD86Iyg/OlthLXowLTlcXC0uX34hJCYnKCkqKyw7PTpALz9dfCVbMC05YS1mXXsyfSkqKT8kL2k7XG5mdW5jdGlvbiB1cmkoc3RyKSB7XG4gICAgLy8gaHR0cDovL2ptcndhcmUuY29tL2FydGljbGVzLzIwMDkvdXJpX3JlZ2V4cC9VUklfcmVnZXguaHRtbCArIG9wdGlvbmFsIHByb3RvY29sICsgcmVxdWlyZWQgXCIuXCJcbiAgICByZXR1cm4gTk9UX1VSSV9GUkFHTUVOVC50ZXN0KHN0cikgJiYgVVJJLnRlc3Qoc3RyKTtcbn1cbmNvbnN0IEJZVEUgPSAvXig/OltBLVphLXowLTkrL117NH0pKig/OltBLVphLXowLTkrL117Mn09PXxbQS1aYS16MC05Ky9dezN9PSk/JC9nbTtcbmZ1bmN0aW9uIGJ5dGUoc3RyKSB7XG4gICAgQllURS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBCWVRFLnRlc3Qoc3RyKTtcbn1cbmNvbnN0IE1JTl9JTlQzMiA9IC0oMiAqKiAzMSk7XG5jb25zdCBNQVhfSU5UMzIgPSAyICoqIDMxIC0gMTtcbmZ1bmN0aW9uIHZhbGlkYXRlSW50MzIodmFsdWUpIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgJiYgdmFsdWUgPD0gTUFYX0lOVDMyICYmIHZhbHVlID49IE1JTl9JTlQzMjtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlSW50NjQodmFsdWUpIHtcbiAgICAvLyBKU09OIGFuZCBqYXZhc2NyaXB0IG1heCBJbnQgaXMgMioqNTMsIHNvIGFueSBpbnQgdGhhdCBwYXNzZXMgaXNJbnRlZ2VyIGlzIHZhbGlkIGZvciBJbnQ2NFxuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyKCkge1xuICAgIHJldHVybiB0cnVlO1xufVxuY29uc3QgWl9BTkNIT1IgPSAvW15cXFxcXVxcXFxaLztcbmZ1bmN0aW9uIHJlZ2V4KHN0cikge1xuICAgIGlmIChaX0FOQ0hPUi50ZXN0KHN0cikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBuZXcgUmVnRXhwKHN0cik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ybWF0cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGZvcm1hdHNfMSA9IHJlcXVpcmUoXCIuL2Zvcm1hdHNcIik7XG5jb25zdCBsaW1pdF8xID0gcmVxdWlyZShcIi4vbGltaXRcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiYWp2L2Rpc3QvY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgZnVsbE5hbWUgPSBuZXcgY29kZWdlbl8xLk5hbWUoXCJmdWxsRm9ybWF0c1wiKTtcbmNvbnN0IGZhc3ROYW1lID0gbmV3IGNvZGVnZW5fMS5OYW1lKFwiZmFzdEZvcm1hdHNcIik7XG5jb25zdCBmb3JtYXRzUGx1Z2luID0gKGFqdiwgb3B0cyA9IHsga2V5d29yZHM6IHRydWUgfSkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdHMpKSB7XG4gICAgICAgIGFkZEZvcm1hdHMoYWp2LCBvcHRzLCBmb3JtYXRzXzEuZnVsbEZvcm1hdHMsIGZ1bGxOYW1lKTtcbiAgICAgICAgcmV0dXJuIGFqdjtcbiAgICB9XG4gICAgY29uc3QgW2Zvcm1hdHMsIGV4cG9ydE5hbWVdID0gb3B0cy5tb2RlID09PSBcImZhc3RcIiA/IFtmb3JtYXRzXzEuZmFzdEZvcm1hdHMsIGZhc3ROYW1lXSA6IFtmb3JtYXRzXzEuZnVsbEZvcm1hdHMsIGZ1bGxOYW1lXTtcbiAgICBjb25zdCBsaXN0ID0gb3B0cy5mb3JtYXRzIHx8IGZvcm1hdHNfMS5mb3JtYXROYW1lcztcbiAgICBhZGRGb3JtYXRzKGFqdiwgbGlzdCwgZm9ybWF0cywgZXhwb3J0TmFtZSk7XG4gICAgaWYgKG9wdHMua2V5d29yZHMpXG4gICAgICAgIGxpbWl0XzEuZGVmYXVsdChhanYpO1xuICAgIHJldHVybiBhanY7XG59O1xuZm9ybWF0c1BsdWdpbi5nZXQgPSAobmFtZSwgbW9kZSA9IFwiZnVsbFwiKSA9PiB7XG4gICAgY29uc3QgZm9ybWF0cyA9IG1vZGUgPT09IFwiZmFzdFwiID8gZm9ybWF0c18xLmZhc3RGb3JtYXRzIDogZm9ybWF0c18xLmZ1bGxGb3JtYXRzO1xuICAgIGNvbnN0IGYgPSBmb3JtYXRzW25hbWVdO1xuICAgIGlmICghZilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZvcm1hdCBcIiR7bmFtZX1cImApO1xuICAgIHJldHVybiBmO1xufTtcbmZ1bmN0aW9uIGFkZEZvcm1hdHMoYWp2LCBsaXN0LCBmcywgZXhwb3J0TmFtZSkge1xuICAgIHZhciBfYTtcbiAgICB2YXIgX2I7XG4gICAgKF9hID0gKF9iID0gYWp2Lm9wdHMuY29kZSkuZm9ybWF0cykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKF9iLmZvcm1hdHMgPSBjb2RlZ2VuXzEuXyBgcmVxdWlyZShcImFqdi1mb3JtYXRzL2Rpc3QvZm9ybWF0c1wiKS4ke2V4cG9ydE5hbWV9YCk7XG4gICAgZm9yIChjb25zdCBmIG9mIGxpc3QpXG4gICAgICAgIGFqdi5hZGRGb3JtYXQoZiwgZnNbZl0pO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZm9ybWF0c1BsdWdpbjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZvcm1hdHNQbHVnaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZm9ybWF0TGltaXREZWZpbml0aW9uID0gdm9pZCAwO1xuY29uc3QgYWp2XzEgPSByZXF1aXJlKFwiYWp2XCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcImFqdi9kaXN0L2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IG9wcyA9IGNvZGVnZW5fMS5vcGVyYXRvcnM7XG5jb25zdCBLV0RzID0ge1xuICAgIGZvcm1hdE1heGltdW06IHsgb2tTdHI6IFwiPD1cIiwgb2s6IG9wcy5MVEUsIGZhaWw6IG9wcy5HVCB9LFxuICAgIGZvcm1hdE1pbmltdW06IHsgb2tTdHI6IFwiPj1cIiwgb2s6IG9wcy5HVEUsIGZhaWw6IG9wcy5MVCB9LFxuICAgIGZvcm1hdEV4Y2x1c2l2ZU1heGltdW06IHsgb2tTdHI6IFwiPFwiLCBvazogb3BzLkxULCBmYWlsOiBvcHMuR1RFIH0sXG4gICAgZm9ybWF0RXhjbHVzaXZlTWluaW11bTogeyBva1N0cjogXCI+XCIsIG9rOiBvcHMuR1QsIGZhaWw6IG9wcy5MVEUgfSxcbn07XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBrZXl3b3JkLCBzY2hlbWFDb2RlIH0pID0+IGNvZGVnZW5fMS5zdHIgYHNob3VsZCBiZSAke0tXRHNba2V5d29yZF0ub2tTdHJ9ICR7c2NoZW1hQ29kZX1gLFxuICAgIHBhcmFtczogKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSA9PiBjb2RlZ2VuXzEuXyBge2NvbXBhcmlzb246ICR7S1dEc1trZXl3b3JkXS5va1N0cn0sIGxpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuZXhwb3J0cy5mb3JtYXRMaW1pdERlZmluaXRpb24gPSB7XG4gICAga2V5d29yZDogT2JqZWN0LmtleXMoS1dEcyksXG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBzY2hlbWFUeXBlOiBcInN0cmluZ1wiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBzY2hlbWFDb2RlLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IG9wdHMsIHNlbGYgfSA9IGl0O1xuICAgICAgICBpZiAoIW9wdHMudmFsaWRhdGVGb3JtYXRzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBmQ3h0ID0gbmV3IGFqdl8xLktleXdvcmRDeHQoaXQsIHNlbGYuUlVMRVMuYWxsLmZvcm1hdC5kZWZpbml0aW9uLCBcImZvcm1hdFwiKTtcbiAgICAgICAgaWYgKGZDeHQuJGRhdGEpXG4gICAgICAgICAgICB2YWxpZGF0ZSREYXRhRm9ybWF0KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHZhbGlkYXRlRm9ybWF0KCk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlJERhdGFGb3JtYXQoKSB7XG4gICAgICAgICAgICBjb25zdCBmbXRzID0gZ2VuLnNjb3BlVmFsdWUoXCJmb3JtYXRzXCIsIHtcbiAgICAgICAgICAgICAgICByZWY6IHNlbGYuZm9ybWF0cyxcbiAgICAgICAgICAgICAgICBjb2RlOiBvcHRzLmNvZGUuZm9ybWF0cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZm10ID0gZ2VuLmNvbnN0KFwiZm10XCIsIGNvZGVnZW5fMS5fIGAke2ZtdHN9WyR7ZkN4dC5zY2hlbWFDb2RlfV1gKTtcbiAgICAgICAgICAgIGN4dC5mYWlsJGRhdGEoY29kZWdlbl8xLm9yKGNvZGVnZW5fMS5fIGB0eXBlb2YgJHtmbXR9ICE9IFwib2JqZWN0XCJgLCBjb2RlZ2VuXzEuXyBgJHtmbXR9IGluc3RhbmNlb2YgUmVnRXhwYCwgY29kZWdlbl8xLl8gYHR5cGVvZiAke2ZtdH0uY29tcGFyZSAhPSBcImZ1bmN0aW9uXCJgLCBjb21wYXJlQ29kZShmbXQpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBmQ3h0LnNjaGVtYTtcbiAgICAgICAgICAgIGNvbnN0IGZtdERlZiA9IHNlbGYuZm9ybWF0c1tmb3JtYXRdO1xuICAgICAgICAgICAgaWYgKCFmbXREZWYgfHwgZm10RGVmID09PSB0cnVlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm10RGVmICE9IFwib2JqZWN0XCIgfHxcbiAgICAgICAgICAgICAgICBmbXREZWYgaW5zdGFuY2VvZiBSZWdFeHAgfHxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZm10RGVmLmNvbXBhcmUgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7a2V5d29yZH1cIjogZm9ybWF0IFwiJHtmb3JtYXR9XCIgZG9lcyBub3QgZGVmaW5lIFwiY29tcGFyZVwiIGZ1bmN0aW9uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmbXQgPSBnZW4uc2NvcGVWYWx1ZShcImZvcm1hdHNcIiwge1xuICAgICAgICAgICAgICAgIGtleTogZm9ybWF0LFxuICAgICAgICAgICAgICAgIHJlZjogZm10RGVmLFxuICAgICAgICAgICAgICAgIGNvZGU6IG9wdHMuY29kZS5mb3JtYXRzID8gY29kZWdlbl8xLl8gYCR7b3B0cy5jb2RlLmZvcm1hdHN9JHtjb2RlZ2VuXzEuZ2V0UHJvcGVydHkoZm9ybWF0KX1gIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjeHQuZmFpbCRkYXRhKGNvbXBhcmVDb2RlKGZtdCkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmVDb2RlKGZtdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW5fMS5fIGAke2ZtdH0uY29tcGFyZSgke2RhdGF9LCAke3NjaGVtYUNvZGV9KSAke0tXRHNba2V5d29yZF0uZmFpbH0gMGA7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRlcGVuZGVuY2llczogW1wiZm9ybWF0XCJdLFxufTtcbmNvbnN0IGZvcm1hdExpbWl0UGx1Z2luID0gKGFqdikgPT4ge1xuICAgIGFqdi5hZGRLZXl3b3JkKGV4cG9ydHMuZm9ybWF0TGltaXREZWZpbml0aW9uKTtcbiAgICByZXR1cm4gYWp2O1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZvcm1hdExpbWl0UGx1Z2luO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1pc3NpbmdSZWZFcnJvciA9IGV4cG9ydHMuVmFsaWRhdGlvbkVycm9yID0gZXhwb3J0cy5Db2RlR2VuID0gZXhwb3J0cy5OYW1lID0gZXhwb3J0cy5uaWwgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyID0gZXhwb3J0cy5fID0gZXhwb3J0cy5LZXl3b3JkQ3h0ID0gdm9pZCAwO1xuY29uc3QgY29yZV8xID0gcmVxdWlyZShcIi4vY29yZVwiKTtcbmNvbnN0IGRyYWZ0MjAyMF8xID0gcmVxdWlyZShcIi4vdm9jYWJ1bGFyaWVzL2RyYWZ0MjAyMFwiKTtcbmNvbnN0IGRpc2NyaW1pbmF0b3JfMSA9IHJlcXVpcmUoXCIuL3ZvY2FidWxhcmllcy9kaXNjcmltaW5hdG9yXCIpO1xuY29uc3QganNvbl9zY2hlbWFfMjAyMF8xMl8xID0gcmVxdWlyZShcIi4vcmVmcy9qc29uLXNjaGVtYS0yMDIwLTEyXCIpO1xuY29uc3QgTUVUQV9TQ0hFTUFfSUQgPSBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMjAtMTIvc2NoZW1hXCI7XG5jbGFzcyBBanYyMDIwIGV4dGVuZHMgY29yZV8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICAuLi5vcHRzLFxuICAgICAgICAgICAgZHluYW1pY1JlZjogdHJ1ZSxcbiAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICB1bmV2YWx1YXRlZDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9hZGRWb2NhYnVsYXJpZXMoKSB7XG4gICAgICAgIHN1cGVyLl9hZGRWb2NhYnVsYXJpZXMoKTtcbiAgICAgICAgZHJhZnQyMDIwXzEuZGVmYXVsdC5mb3JFYWNoKCh2KSA9PiB0aGlzLmFkZFZvY2FidWxhcnkodikpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmRpc2NyaW1pbmF0b3IpXG4gICAgICAgICAgICB0aGlzLmFkZEtleXdvcmQoZGlzY3JpbWluYXRvcl8xLmRlZmF1bHQpO1xuICAgIH1cbiAgICBfYWRkRGVmYXVsdE1ldGFTY2hlbWEoKSB7XG4gICAgICAgIHN1cGVyLl9hZGREZWZhdWx0TWV0YVNjaGVtYSgpO1xuICAgICAgICBjb25zdCB7ICRkYXRhLCBtZXRhIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGlmICghbWV0YSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAganNvbl9zY2hlbWFfMjAyMF8xMl8xLmRlZmF1bHQuY2FsbCh0aGlzLCAkZGF0YSk7XG4gICAgICAgIHRoaXMucmVmc1tcImh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvc2NoZW1hXCJdID0gTUVUQV9TQ0hFTUFfSUQ7XG4gICAgfVxuICAgIGRlZmF1bHRNZXRhKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0cy5kZWZhdWx0TWV0YSA9XG4gICAgICAgICAgICBzdXBlci5kZWZhdWx0TWV0YSgpIHx8ICh0aGlzLmdldFNjaGVtYShNRVRBX1NDSEVNQV9JRCkgPyBNRVRBX1NDSEVNQV9JRCA6IHVuZGVmaW5lZCkpO1xuICAgIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IEFqdjIwMjA7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBBanYyMDIwO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3ZhbGlkYXRlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiS2V5d29yZEN4dFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsaWRhdGVfMS5LZXl3b3JkQ3h0OyB9IH0pO1xudmFyIGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvY29kZWdlblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5fOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyaW5naWZ5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmlsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEubmlsOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLk5hbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb2RlR2VuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuQ29kZUdlbjsgfSB9KTtcbnZhciB2YWxpZGF0aW9uX2Vycm9yXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWYWxpZGF0aW9uRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbGlkYXRpb25fZXJyb3JfMS5kZWZhdWx0OyB9IH0pO1xudmFyIHJlZl9lcnJvcl8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9yZWZfZXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNaXNzaW5nUmVmRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlZl9lcnJvcl8xLmRlZmF1bHQ7IH0gfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0yMDIwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NaXNzaW5nUmVmRXJyb3IgPSBleHBvcnRzLlZhbGlkYXRpb25FcnJvciA9IGV4cG9ydHMuQ29kZUdlbiA9IGV4cG9ydHMuTmFtZSA9IGV4cG9ydHMubmlsID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLnN0ciA9IGV4cG9ydHMuXyA9IGV4cG9ydHMuS2V5d29yZEN4dCA9IHZvaWQgMDtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCIuL2NvcmVcIik7XG5jb25zdCBkcmFmdDdfMSA9IHJlcXVpcmUoXCIuL3ZvY2FidWxhcmllcy9kcmFmdDdcIik7XG5jb25zdCBkaXNjcmltaW5hdG9yXzEgPSByZXF1aXJlKFwiLi92b2NhYnVsYXJpZXMvZGlzY3JpbWluYXRvclwiKTtcbmNvbnN0IGRyYWZ0N01ldGFTY2hlbWEgPSByZXF1aXJlKFwiLi9yZWZzL2pzb24tc2NoZW1hLWRyYWZ0LTA3Lmpzb25cIik7XG5jb25zdCBNRVRBX1NVUFBPUlRfREFUQSA9IFtcIi9wcm9wZXJ0aWVzXCJdO1xuY29uc3QgTUVUQV9TQ0hFTUFfSUQgPSBcImh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hXCI7XG5jbGFzcyBBanYgZXh0ZW5kcyBjb3JlXzEuZGVmYXVsdCB7XG4gICAgX2FkZFZvY2FidWxhcmllcygpIHtcbiAgICAgICAgc3VwZXIuX2FkZFZvY2FidWxhcmllcygpO1xuICAgICAgICBkcmFmdDdfMS5kZWZhdWx0LmZvckVhY2goKHYpID0+IHRoaXMuYWRkVm9jYWJ1bGFyeSh2KSk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuZGlzY3JpbWluYXRvcilcbiAgICAgICAgICAgIHRoaXMuYWRkS2V5d29yZChkaXNjcmltaW5hdG9yXzEuZGVmYXVsdCk7XG4gICAgfVxuICAgIF9hZGREZWZhdWx0TWV0YVNjaGVtYSgpIHtcbiAgICAgICAgc3VwZXIuX2FkZERlZmF1bHRNZXRhU2NoZW1hKCk7XG4gICAgICAgIGlmICghdGhpcy5vcHRzLm1ldGEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IG1ldGFTY2hlbWEgPSB0aGlzLm9wdHMuJGRhdGFcbiAgICAgICAgICAgID8gdGhpcy4kZGF0YU1ldGFTY2hlbWEoZHJhZnQ3TWV0YVNjaGVtYSwgTUVUQV9TVVBQT1JUX0RBVEEpXG4gICAgICAgICAgICA6IGRyYWZ0N01ldGFTY2hlbWE7XG4gICAgICAgIHRoaXMuYWRkTWV0YVNjaGVtYShtZXRhU2NoZW1hLCBNRVRBX1NDSEVNQV9JRCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnJlZnNbXCJodHRwOi8vanNvbi1zY2hlbWEub3JnL3NjaGVtYVwiXSA9IE1FVEFfU0NIRU1BX0lEO1xuICAgIH1cbiAgICBkZWZhdWx0TWV0YSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdHMuZGVmYXVsdE1ldGEgPVxuICAgICAgICAgICAgc3VwZXIuZGVmYXVsdE1ldGEoKSB8fCAodGhpcy5nZXRTY2hlbWEoTUVUQV9TQ0hFTUFfSUQpID8gTUVUQV9TQ0hFTUFfSUQgOiB1bmRlZmluZWQpKTtcbiAgICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBBanY7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBBanY7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvdmFsaWRhdGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJLZXl3b3JkQ3h0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZV8xLktleXdvcmRDeHQ7IH0gfSk7XG52YXIgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLl87IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5zdHI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5zdHJpbmdpZnk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJuaWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5uaWw7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuTmFtZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvZGVHZW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5Db2RlR2VuOyB9IH0pO1xudmFyIHZhbGlkYXRpb25fZXJyb3JfMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUvdmFsaWRhdGlvbl9lcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZhbGlkYXRpb25FcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsaWRhdGlvbl9lcnJvcl8xLmRlZmF1bHQ7IH0gfSk7XG52YXIgcmVmX2Vycm9yXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3JlZl9lcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk1pc3NpbmdSZWZFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVmX2Vycm9yXzEuZGVmYXVsdDsgfSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFqdi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVnZXhwQ29kZSA9IGV4cG9ydHMuZ2V0RXNtRXhwb3J0TmFtZSA9IGV4cG9ydHMuZ2V0UHJvcGVydHkgPSBleHBvcnRzLnNhZmVTdHJpbmdpZnkgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyQ29uY2F0ID0gZXhwb3J0cy5hZGRDb2RlQXJnID0gZXhwb3J0cy5zdHIgPSBleHBvcnRzLl8gPSBleHBvcnRzLm5pbCA9IGV4cG9ydHMuX0NvZGUgPSBleHBvcnRzLk5hbWUgPSBleHBvcnRzLklERU5USUZJRVIgPSBleHBvcnRzLl9Db2RlT3JOYW1lID0gdm9pZCAwO1xuY2xhc3MgX0NvZGVPck5hbWUge1xufVxuZXhwb3J0cy5fQ29kZU9yTmFtZSA9IF9Db2RlT3JOYW1lO1xuZXhwb3J0cy5JREVOVElGSUVSID0gL15bYS16JF9dW2EteiRfMC05XSokL2k7XG5jbGFzcyBOYW1lIGV4dGVuZHMgX0NvZGVPck5hbWUge1xuICAgIGNvbnN0cnVjdG9yKHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKCFleHBvcnRzLklERU5USUZJRVIudGVzdChzKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvZGVHZW46IG5hbWUgbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcIik7XG4gICAgICAgIHRoaXMuc3RyID0gcztcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG4gICAgZW1wdHlTdHIoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4geyBbdGhpcy5zdHJdOiAxIH07XG4gICAgfVxufVxuZXhwb3J0cy5OYW1lID0gTmFtZTtcbmNsYXNzIF9Db2RlIGV4dGVuZHMgX0NvZGVPck5hbWUge1xuICAgIGNvbnN0cnVjdG9yKGNvZGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faXRlbXMgPSB0eXBlb2YgY29kZSA9PT0gXCJzdHJpbmdcIiA/IFtjb2RlXSA6IGNvZGU7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfVxuICAgIGVtcHR5U3RyKCkge1xuICAgICAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2l0ZW1zWzBdO1xuICAgICAgICByZXR1cm4gaXRlbSA9PT0gXCJcIiB8fCBpdGVtID09PSAnXCJcIic7XG4gICAgfVxuICAgIGdldCBzdHIoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLl9zdHIpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICh0aGlzLl9zdHIgPSB0aGlzLl9pdGVtcy5yZWR1Y2UoKHMsIGMpID0+IGAke3N9JHtjfWAsIFwiXCIpKSk7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKChfYSA9IHRoaXMuX25hbWVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAodGhpcy5fbmFtZXMgPSB0aGlzLl9pdGVtcy5yZWR1Y2UoKG5hbWVzLCBjKSA9PiB7XG4gICAgICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIE5hbWUpXG4gICAgICAgICAgICAgICAgbmFtZXNbYy5zdHJdID0gKG5hbWVzW2Muc3RyXSB8fCAwKSArIDE7XG4gICAgICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgICAgIH0sIHt9KSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuX0NvZGUgPSBfQ29kZTtcbmV4cG9ydHMubmlsID0gbmV3IF9Db2RlKFwiXCIpO1xuZnVuY3Rpb24gXyhzdHJzLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgY29kZSA9IFtzdHJzWzBdXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBhcmdzLmxlbmd0aCkge1xuICAgICAgICBhZGRDb2RlQXJnKGNvZGUsIGFyZ3NbaV0pO1xuICAgICAgICBjb2RlLnB1c2goc3Ryc1srK2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfQ29kZShjb2RlKTtcbn1cbmV4cG9ydHMuXyA9IF87XG5jb25zdCBwbHVzID0gbmV3IF9Db2RlKFwiK1wiKTtcbmZ1bmN0aW9uIHN0cihzdHJzLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXhwciA9IFtzYWZlU3RyaW5naWZ5KHN0cnNbMF0pXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBhcmdzLmxlbmd0aCkge1xuICAgICAgICBleHByLnB1c2gocGx1cyk7XG4gICAgICAgIGFkZENvZGVBcmcoZXhwciwgYXJnc1tpXSk7XG4gICAgICAgIGV4cHIucHVzaChwbHVzLCBzYWZlU3RyaW5naWZ5KHN0cnNbKytpXSkpO1xuICAgIH1cbiAgICBvcHRpbWl6ZShleHByKTtcbiAgICByZXR1cm4gbmV3IF9Db2RlKGV4cHIpO1xufVxuZXhwb3J0cy5zdHIgPSBzdHI7XG5mdW5jdGlvbiBhZGRDb2RlQXJnKGNvZGUsIGFyZykge1xuICAgIGlmIChhcmcgaW5zdGFuY2VvZiBfQ29kZSlcbiAgICAgICAgY29kZS5wdXNoKC4uLmFyZy5faXRlbXMpO1xuICAgIGVsc2UgaWYgKGFyZyBpbnN0YW5jZW9mIE5hbWUpXG4gICAgICAgIGNvZGUucHVzaChhcmcpO1xuICAgIGVsc2VcbiAgICAgICAgY29kZS5wdXNoKGludGVycG9sYXRlKGFyZykpO1xufVxuZXhwb3J0cy5hZGRDb2RlQXJnID0gYWRkQ29kZUFyZztcbmZ1bmN0aW9uIG9wdGltaXplKGV4cHIpIHtcbiAgICBsZXQgaSA9IDE7XG4gICAgd2hpbGUgKGkgPCBleHByLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgaWYgKGV4cHJbaV0gPT09IHBsdXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IG1lcmdlRXhwckl0ZW1zKGV4cHJbaSAtIDFdLCBleHByW2kgKyAxXSk7XG4gICAgICAgICAgICBpZiAocmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBleHByLnNwbGljZShpIC0gMSwgMywgcmVzKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cHJbaSsrXSA9IFwiK1wiO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG59XG5mdW5jdGlvbiBtZXJnZUV4cHJJdGVtcyhhLCBiKSB7XG4gICAgaWYgKGIgPT09ICdcIlwiJylcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgaWYgKGEgPT09ICdcIlwiJylcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgaWYgKHR5cGVvZiBhID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKGIgaW5zdGFuY2VvZiBOYW1lIHx8IGFbYS5sZW5ndGggLSAxXSAhPT0gJ1wiJylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9IFwic3RyaW5nXCIpXG4gICAgICAgICAgICByZXR1cm4gYCR7YS5zbGljZSgwLCAtMSl9JHtifVwiYDtcbiAgICAgICAgaWYgKGJbMF0gPT09ICdcIicpXG4gICAgICAgICAgICByZXR1cm4gYS5zbGljZSgwLCAtMSkgKyBiLnNsaWNlKDEpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYiA9PSBcInN0cmluZ1wiICYmIGJbMF0gPT09ICdcIicgJiYgIShhIGluc3RhbmNlb2YgTmFtZSkpXG4gICAgICAgIHJldHVybiBgXCIke2F9JHtiLnNsaWNlKDEpfWA7XG4gICAgcmV0dXJuO1xufVxuZnVuY3Rpb24gc3RyQ29uY2F0KGMxLCBjMikge1xuICAgIHJldHVybiBjMi5lbXB0eVN0cigpID8gYzEgOiBjMS5lbXB0eVN0cigpID8gYzIgOiBzdHIgYCR7YzF9JHtjMn1gO1xufVxuZXhwb3J0cy5zdHJDb25jYXQgPSBzdHJDb25jYXQ7XG4vLyBUT0RPIGRvIG5vdCBhbGxvdyBhcnJheXMgaGVyZVxuZnVuY3Rpb24gaW50ZXJwb2xhdGUoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PSBcIm51bWJlclwiIHx8IHR5cGVvZiB4ID09IFwiYm9vbGVhblwiIHx8IHggPT09IG51bGxcbiAgICAgICAgPyB4XG4gICAgICAgIDogc2FmZVN0cmluZ2lmeShBcnJheS5pc0FycmF5KHgpID8geC5qb2luKFwiLFwiKSA6IHgpO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5KHgpIHtcbiAgICByZXR1cm4gbmV3IF9Db2RlKHNhZmVTdHJpbmdpZnkoeCkpO1xufVxuZXhwb3J0cy5zdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG5mdW5jdGlvbiBzYWZlU3RyaW5naWZ5KHgpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeClcbiAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgXCJcXFxcdTIwMjhcIilcbiAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjkvZywgXCJcXFxcdTIwMjlcIik7XG59XG5leHBvcnRzLnNhZmVTdHJpbmdpZnkgPSBzYWZlU3RyaW5naWZ5O1xuZnVuY3Rpb24gZ2V0UHJvcGVydHkoa2V5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBrZXkgPT0gXCJzdHJpbmdcIiAmJiBleHBvcnRzLklERU5USUZJRVIudGVzdChrZXkpID8gbmV3IF9Db2RlKGAuJHtrZXl9YCkgOiBfIGBbJHtrZXl9XWA7XG59XG5leHBvcnRzLmdldFByb3BlcnR5ID0gZ2V0UHJvcGVydHk7XG4vL0RvZXMgYmVzdCBlZmZvcnQgdG8gZm9ybWF0IHRoZSBuYW1lIHByb3Blcmx5XG5mdW5jdGlvbiBnZXRFc21FeHBvcnROYW1lKGtleSkge1xuICAgIGlmICh0eXBlb2Yga2V5ID09IFwic3RyaW5nXCIgJiYgZXhwb3J0cy5JREVOVElGSUVSLnRlc3Qoa2V5KSkge1xuICAgICAgICByZXR1cm4gbmV3IF9Db2RlKGAke2tleX1gKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiBpbnZhbGlkIGV4cG9ydCBuYW1lOiAke2tleX0sIHVzZSBleHBsaWNpdCAkaWQgbmFtZSBtYXBwaW5nYCk7XG59XG5leHBvcnRzLmdldEVzbUV4cG9ydE5hbWUgPSBnZXRFc21FeHBvcnROYW1lO1xuZnVuY3Rpb24gcmVnZXhwQ29kZShyeCkge1xuICAgIHJldHVybiBuZXcgX0NvZGUocngudG9TdHJpbmcoKSk7XG59XG5leHBvcnRzLnJlZ2V4cENvZGUgPSByZWdleHBDb2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub3IgPSBleHBvcnRzLmFuZCA9IGV4cG9ydHMubm90ID0gZXhwb3J0cy5Db2RlR2VuID0gZXhwb3J0cy5vcGVyYXRvcnMgPSBleHBvcnRzLnZhcktpbmRzID0gZXhwb3J0cy5WYWx1ZVNjb3BlTmFtZSA9IGV4cG9ydHMuVmFsdWVTY29wZSA9IGV4cG9ydHMuU2NvcGUgPSBleHBvcnRzLk5hbWUgPSBleHBvcnRzLnJlZ2V4cENvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuZ2V0UHJvcGVydHkgPSBleHBvcnRzLm5pbCA9IGV4cG9ydHMuc3RyQ29uY2F0ID0gZXhwb3J0cy5zdHIgPSBleHBvcnRzLl8gPSB2b2lkIDA7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi9jb2RlXCIpO1xuY29uc3Qgc2NvcGVfMSA9IHJlcXVpcmUoXCIuL3Njb3BlXCIpO1xudmFyIGNvZGVfMiA9IHJlcXVpcmUoXCIuL2NvZGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuXzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0clwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLnN0cjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0ckNvbmNhdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLnN0ckNvbmNhdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5pbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLm5pbDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdldFByb3BlcnR5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuZ2V0UHJvcGVydHk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5zdHJpbmdpZnk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZWdleHBDb2RlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIucmVnZXhwQ29kZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5OYW1lOyB9IH0pO1xudmFyIHNjb3BlXzIgPSByZXF1aXJlKFwiLi9zY29wZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNjb3BlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY29wZV8yLlNjb3BlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsdWVTY29wZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NvcGVfMi5WYWx1ZVNjb3BlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsdWVTY29wZU5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjb3BlXzIuVmFsdWVTY29wZU5hbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2YXJLaW5kc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NvcGVfMi52YXJLaW5kczsgfSB9KTtcbmV4cG9ydHMub3BlcmF0b3JzID0ge1xuICAgIEdUOiBuZXcgY29kZV8xLl9Db2RlKFwiPlwiKSxcbiAgICBHVEU6IG5ldyBjb2RlXzEuX0NvZGUoXCI+PVwiKSxcbiAgICBMVDogbmV3IGNvZGVfMS5fQ29kZShcIjxcIiksXG4gICAgTFRFOiBuZXcgY29kZV8xLl9Db2RlKFwiPD1cIiksXG4gICAgRVE6IG5ldyBjb2RlXzEuX0NvZGUoXCI9PT1cIiksXG4gICAgTkVROiBuZXcgY29kZV8xLl9Db2RlKFwiIT09XCIpLFxuICAgIE5PVDogbmV3IGNvZGVfMS5fQ29kZShcIiFcIiksXG4gICAgT1I6IG5ldyBjb2RlXzEuX0NvZGUoXCJ8fFwiKSxcbiAgICBBTkQ6IG5ldyBjb2RlXzEuX0NvZGUoXCImJlwiKSxcbiAgICBBREQ6IG5ldyBjb2RlXzEuX0NvZGUoXCIrXCIpLFxufTtcbmNsYXNzIE5vZGUge1xuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKF9uYW1lcywgX2NvbnN0YW50cykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5jbGFzcyBEZWYgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YXJLaW5kLCBuYW1lLCByaHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52YXJLaW5kID0gdmFyS2luZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5yaHMgPSByaHM7XG4gICAgfVxuICAgIHJlbmRlcih7IGVzNSwgX24gfSkge1xuICAgICAgICBjb25zdCB2YXJLaW5kID0gZXM1ID8gc2NvcGVfMS52YXJLaW5kcy52YXIgOiB0aGlzLnZhcktpbmQ7XG4gICAgICAgIGNvbnN0IHJocyA9IHRoaXMucmhzID09PSB1bmRlZmluZWQgPyBcIlwiIDogYCA9ICR7dGhpcy5yaHN9YDtcbiAgICAgICAgcmV0dXJuIGAke3ZhcktpbmR9ICR7dGhpcy5uYW1lfSR7cmhzfTtgICsgX247XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBpZiAoIW5hbWVzW3RoaXMubmFtZS5zdHJdKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5yaHMpXG4gICAgICAgICAgICB0aGlzLnJocyA9IG9wdGltaXplRXhwcih0aGlzLnJocywgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJocyBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZU9yTmFtZSA/IHRoaXMucmhzLm5hbWVzIDoge307XG4gICAgfVxufVxuY2xhc3MgQXNzaWduIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IobGhzLCByaHMsIHNpZGVFZmZlY3RzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGhzID0gbGhzO1xuICAgICAgICB0aGlzLnJocyA9IHJocztcbiAgICAgICAgdGhpcy5zaWRlRWZmZWN0cyA9IHNpZGVFZmZlY3RzO1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxoc30gPSAke3RoaXMucmhzfTtgICsgX247XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBpZiAodGhpcy5saHMgaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSAmJiAhbmFtZXNbdGhpcy5saHMuc3RyXSAmJiAhdGhpcy5zaWRlRWZmZWN0cylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5yaHMgPSBvcHRpbWl6ZUV4cHIodGhpcy5yaHMsIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IHRoaXMubGhzIGluc3RhbmNlb2YgY29kZV8xLk5hbWUgPyB7fSA6IHsgLi4udGhpcy5saHMubmFtZXMgfTtcbiAgICAgICAgcmV0dXJuIGFkZEV4cHJOYW1lcyhuYW1lcywgdGhpcy5yaHMpO1xuICAgIH1cbn1cbmNsYXNzIEFzc2lnbk9wIGV4dGVuZHMgQXNzaWduIHtcbiAgICBjb25zdHJ1Y3RvcihsaHMsIG9wLCByaHMsIHNpZGVFZmZlY3RzKSB7XG4gICAgICAgIHN1cGVyKGxocywgcmhzLCBzaWRlRWZmZWN0cyk7XG4gICAgICAgIHRoaXMub3AgPSBvcDtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5saHN9ICR7dGhpcy5vcH09ICR7dGhpcy5yaHN9O2AgKyBfbjtcbiAgICB9XG59XG5jbGFzcyBMYWJlbCBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGxhYmVsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5uYW1lcyA9IHt9O1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxhYmVsfTpgICsgX247XG4gICAgfVxufVxuY2xhc3MgQnJlYWsgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihsYWJlbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMubmFtZXMgPSB7fTtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMubGFiZWwgPyBgICR7dGhpcy5sYWJlbH1gIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIGBicmVhayR7bGFiZWx9O2AgKyBfbjtcbiAgICB9XG59XG5jbGFzcyBUaHJvdyBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYHRocm93ICR7dGhpcy5lcnJvcn07YCArIF9uO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yLm5hbWVzO1xuICAgIH1cbn1cbmNsYXNzIEFueUNvZGUgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29kZX07YCArIF9uO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5vZGVzKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb2RlfWAgPyB0aGlzIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgdGhpcy5jb2RlID0gb3B0aW1pemVFeHByKHRoaXMuY29kZSwgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZGUgaW5zdGFuY2VvZiBjb2RlXzEuX0NvZGVPck5hbWUgPyB0aGlzLmNvZGUubmFtZXMgOiB7fTtcbiAgICB9XG59XG5jbGFzcyBQYXJlbnROb2RlIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3Iobm9kZXMgPSBbXSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzLnJlZHVjZSgoY29kZSwgbikgPT4gY29kZSArIG4ucmVuZGVyKG9wdHMpLCBcIlwiKTtcbiAgICB9XG4gICAgb3B0aW1pemVOb2RlcygpIHtcbiAgICAgICAgY29uc3QgeyBub2RlcyB9ID0gdGhpcztcbiAgICAgICAgbGV0IGkgPSBub2Rlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub2Rlc1tpXS5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuKSlcbiAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSwgLi4ubik7XG4gICAgICAgICAgICBlbHNlIGlmIChuKVxuICAgICAgICAgICAgICAgIG5vZGVzW2ldID0gbjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVzLmxlbmd0aCA+IDAgPyB0aGlzIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgY29uc3QgeyBub2RlcyB9ID0gdGhpcztcbiAgICAgICAgbGV0IGkgPSBub2Rlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIC8vIGl0ZXJhdGluZyBiYWNrd2FyZHMgaW1wcm92ZXMgMS1wYXNzIG9wdGltaXphdGlvblxuICAgICAgICAgICAgY29uc3QgbiA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKG4ub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHN1YnRyYWN0TmFtZXMobmFtZXMsIG4ubmFtZXMpO1xuICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2Rlcy5sZW5ndGggPiAwID8gdGhpcyA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5yZWR1Y2UoKG5hbWVzLCBuKSA9PiBhZGROYW1lcyhuYW1lcywgbi5uYW1lcyksIHt9KTtcbiAgICB9XG59XG5jbGFzcyBCbG9ja05vZGUgZXh0ZW5kcyBQYXJlbnROb2RlIHtcbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gXCJ7XCIgKyBvcHRzLl9uICsgc3VwZXIucmVuZGVyKG9wdHMpICsgXCJ9XCIgKyBvcHRzLl9uO1xuICAgIH1cbn1cbmNsYXNzIFJvb3QgZXh0ZW5kcyBQYXJlbnROb2RlIHtcbn1cbmNsYXNzIEVsc2UgZXh0ZW5kcyBCbG9ja05vZGUge1xufVxuRWxzZS5raW5kID0gXCJlbHNlXCI7XG5jbGFzcyBJZiBleHRlbmRzIEJsb2NrTm9kZSB7XG4gICAgY29uc3RydWN0b3IoY29uZGl0aW9uLCBub2Rlcykge1xuICAgICAgICBzdXBlcihub2Rlcyk7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICBsZXQgY29kZSA9IGBpZigke3RoaXMuY29uZGl0aW9ufSlgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgICAgICBpZiAodGhpcy5lbHNlKVxuICAgICAgICAgICAgY29kZSArPSBcImVsc2UgXCIgKyB0aGlzLmVsc2UucmVuZGVyKG9wdHMpO1xuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG4gICAgb3B0aW1pemVOb2RlcygpIHtcbiAgICAgICAgc3VwZXIub3B0aW1pemVOb2RlcygpO1xuICAgICAgICBjb25zdCBjb25kID0gdGhpcy5jb25kaXRpb247XG4gICAgICAgIGlmIChjb25kID09PSB0cnVlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXM7IC8vIGVsc2UgaXMgaWdub3JlZCBoZXJlXG4gICAgICAgIGxldCBlID0gdGhpcy5lbHNlO1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgY29uc3QgbnMgPSBlLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgICAgIGUgPSB0aGlzLmVsc2UgPSBBcnJheS5pc0FycmF5KG5zKSA/IG5ldyBFbHNlKG5zKSA6IG5zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBpZiAoY29uZCA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBJZiA/IGUgOiBlLm5vZGVzO1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJZihub3QoY29uZCksIGUgaW5zdGFuY2VvZiBJZiA/IFtlXSA6IGUubm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25kID09PSBmYWxzZSB8fCAhdGhpcy5ub2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5lbHNlID0gKF9hID0gdGhpcy5lbHNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgaWYgKCEoc3VwZXIub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB8fCB0aGlzLmVsc2UpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IG9wdGltaXplRXhwcih0aGlzLmNvbmRpdGlvbiwgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIGNvbnN0IG5hbWVzID0gc3VwZXIubmFtZXM7XG4gICAgICAgIGFkZEV4cHJOYW1lcyhuYW1lcywgdGhpcy5jb25kaXRpb24pO1xuICAgICAgICBpZiAodGhpcy5lbHNlKVxuICAgICAgICAgICAgYWRkTmFtZXMobmFtZXMsIHRoaXMuZWxzZS5uYW1lcyk7XG4gICAgICAgIHJldHVybiBuYW1lcztcbiAgICB9XG59XG5JZi5raW5kID0gXCJpZlwiO1xuY2xhc3MgRm9yIGV4dGVuZHMgQmxvY2tOb2RlIHtcbn1cbkZvci5raW5kID0gXCJmb3JcIjtcbmNsYXNzIEZvckxvb3AgZXh0ZW5kcyBGb3Ige1xuICAgIGNvbnN0cnVjdG9yKGl0ZXJhdGlvbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLml0ZXJhdGlvbiA9IGl0ZXJhdGlvbjtcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGBmb3IoJHt0aGlzLml0ZXJhdGlvbn0pYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIGlmICghc3VwZXIub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pdGVyYXRpb24gPSBvcHRpbWl6ZUV4cHIodGhpcy5pdGVyYXRpb24sIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gYWRkTmFtZXMoc3VwZXIubmFtZXMsIHRoaXMuaXRlcmF0aW9uLm5hbWVzKTtcbiAgICB9XG59XG5jbGFzcyBGb3JSYW5nZSBleHRlbmRzIEZvciB7XG4gICAgY29uc3RydWN0b3IodmFyS2luZCwgbmFtZSwgZnJvbSwgdG8pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52YXJLaW5kID0gdmFyS2luZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICAgICAgdGhpcy50byA9IHRvO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICBjb25zdCB2YXJLaW5kID0gb3B0cy5lczUgPyBzY29wZV8xLnZhcktpbmRzLnZhciA6IHRoaXMudmFyS2luZDtcbiAgICAgICAgY29uc3QgeyBuYW1lLCBmcm9tLCB0byB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGBmb3IoJHt2YXJLaW5kfSAke25hbWV9PSR7ZnJvbX07ICR7bmFtZX08JHt0b307ICR7bmFtZX0rKylgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIGNvbnN0IG5hbWVzID0gYWRkRXhwck5hbWVzKHN1cGVyLm5hbWVzLCB0aGlzLmZyb20pO1xuICAgICAgICByZXR1cm4gYWRkRXhwck5hbWVzKG5hbWVzLCB0aGlzLnRvKTtcbiAgICB9XG59XG5jbGFzcyBGb3JJdGVyIGV4dGVuZHMgRm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihsb29wLCB2YXJLaW5kLCBuYW1lLCBpdGVyYWJsZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxvb3AgPSBsb29wO1xuICAgICAgICB0aGlzLnZhcktpbmQgPSB2YXJLaW5kO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLml0ZXJhYmxlID0gaXRlcmFibGU7XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBgZm9yKCR7dGhpcy52YXJLaW5kfSAke3RoaXMubmFtZX0gJHt0aGlzLmxvb3B9ICR7dGhpcy5pdGVyYWJsZX0pYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIGlmICghc3VwZXIub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pdGVyYWJsZSA9IG9wdGltaXplRXhwcih0aGlzLml0ZXJhYmxlLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGFkZE5hbWVzKHN1cGVyLm5hbWVzLCB0aGlzLml0ZXJhYmxlLm5hbWVzKTtcbiAgICB9XG59XG5jbGFzcyBGdW5jIGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBhcmdzLCBhc3luYykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgICAgICB0aGlzLmFzeW5jID0gYXN5bmM7XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIGNvbnN0IF9hc3luYyA9IHRoaXMuYXN5bmMgPyBcImFzeW5jIFwiIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIGAke19hc3luY31mdW5jdGlvbiAke3RoaXMubmFtZX0oJHt0aGlzLmFyZ3N9KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxufVxuRnVuYy5raW5kID0gXCJmdW5jXCI7XG5jbGFzcyBSZXR1cm4gZXh0ZW5kcyBQYXJlbnROb2RlIHtcbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gXCJyZXR1cm4gXCIgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxufVxuUmV0dXJuLmtpbmQgPSBcInJldHVyblwiO1xuY2xhc3MgVHJ5IGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICBsZXQgY29kZSA9IFwidHJ5XCIgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgICAgIGlmICh0aGlzLmNhdGNoKVxuICAgICAgICAgICAgY29kZSArPSB0aGlzLmNhdGNoLnJlbmRlcihvcHRzKTtcbiAgICAgICAgaWYgKHRoaXMuZmluYWxseSlcbiAgICAgICAgICAgIGNvZGUgKz0gdGhpcy5maW5hbGx5LnJlbmRlcihvcHRzKTtcbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHN1cGVyLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgKF9hID0gdGhpcy5jYXRjaCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgKF9iID0gdGhpcy5maW5hbGx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iub3B0aW1pemVOb2RlcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHN1cGVyLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIChfYSA9IHRoaXMuY2F0Y2gpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICAoX2IgPSB0aGlzLmZpbmFsbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IHN1cGVyLm5hbWVzO1xuICAgICAgICBpZiAodGhpcy5jYXRjaClcbiAgICAgICAgICAgIGFkZE5hbWVzKG5hbWVzLCB0aGlzLmNhdGNoLm5hbWVzKTtcbiAgICAgICAgaWYgKHRoaXMuZmluYWxseSlcbiAgICAgICAgICAgIGFkZE5hbWVzKG5hbWVzLCB0aGlzLmZpbmFsbHkubmFtZXMpO1xuICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgfVxufVxuY2xhc3MgQ2F0Y2ggZXh0ZW5kcyBCbG9ja05vZGUge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGBjYXRjaCgke3RoaXMuZXJyb3J9KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxufVxuQ2F0Y2gua2luZCA9IFwiY2F0Y2hcIjtcbmNsYXNzIEZpbmFsbHkgZXh0ZW5kcyBCbG9ja05vZGUge1xuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBcImZpbmFsbHlcIiArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG59XG5GaW5hbGx5LmtpbmQgPSBcImZpbmFsbHlcIjtcbmNsYXNzIENvZGVHZW4ge1xuICAgIGNvbnN0cnVjdG9yKGV4dFNjb3BlLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0ge307XG4gICAgICAgIHRoaXMuX2Jsb2NrU3RhcnRzID0gW107XG4gICAgICAgIHRoaXMuX2NvbnN0YW50cyA9IHt9O1xuICAgICAgICB0aGlzLm9wdHMgPSB7IC4uLm9wdHMsIF9uOiBvcHRzLmxpbmVzID8gXCJcXG5cIiA6IFwiXCIgfTtcbiAgICAgICAgdGhpcy5fZXh0U2NvcGUgPSBleHRTY29wZTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBuZXcgc2NvcGVfMS5TY29wZSh7IHBhcmVudDogZXh0U2NvcGUgfSk7XG4gICAgICAgIHRoaXMuX25vZGVzID0gW25ldyBSb290KCldO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3QucmVuZGVyKHRoaXMub3B0cyk7XG4gICAgfVxuICAgIC8vIHJldHVybnMgdW5pcXVlIG5hbWUgaW4gdGhlIGludGVybmFsIHNjb3BlXG4gICAgbmFtZShwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3BlLm5hbWUocHJlZml4KTtcbiAgICB9XG4gICAgLy8gcmVzZXJ2ZXMgdW5pcXVlIG5hbWUgaW4gdGhlIGV4dGVybmFsIHNjb3BlXG4gICAgc2NvcGVOYW1lKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0U2NvcGUubmFtZShwcmVmaXgpO1xuICAgIH1cbiAgICAvLyByZXNlcnZlcyB1bmlxdWUgbmFtZSBpbiB0aGUgZXh0ZXJuYWwgc2NvcGUgYW5kIGFzc2lnbnMgdmFsdWUgdG8gaXRcbiAgICBzY29wZVZhbHVlKHByZWZpeE9yTmFtZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX2V4dFNjb3BlLnZhbHVlKHByZWZpeE9yTmFtZSwgdmFsdWUpO1xuICAgICAgICBjb25zdCB2cyA9IHRoaXMuX3ZhbHVlc1tuYW1lLnByZWZpeF0gfHwgKHRoaXMuX3ZhbHVlc1tuYW1lLnByZWZpeF0gPSBuZXcgU2V0KCkpO1xuICAgICAgICB2cy5hZGQobmFtZSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBnZXRTY29wZVZhbHVlKHByZWZpeCwga2V5T3JSZWYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dFNjb3BlLmdldFZhbHVlKHByZWZpeCwga2V5T3JSZWYpO1xuICAgIH1cbiAgICAvLyByZXR1cm4gY29kZSB0aGF0IGFzc2lnbnMgdmFsdWVzIGluIHRoZSBleHRlcm5hbCBzY29wZSB0byB0aGUgbmFtZXMgdGhhdCBhcmUgdXNlZCBpbnRlcm5hbGx5XG4gICAgLy8gKHNhbWUgbmFtZXMgdGhhdCB3ZXJlIHJldHVybmVkIGJ5IGdlbi5zY29wZU5hbWUgb3IgZ2VuLnNjb3BlVmFsdWUpXG4gICAgc2NvcGVSZWZzKHNjb3BlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0U2NvcGUuc2NvcGVSZWZzKHNjb3BlTmFtZSwgdGhpcy5fdmFsdWVzKTtcbiAgICB9XG4gICAgc2NvcGVDb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0U2NvcGUuc2NvcGVDb2RlKHRoaXMuX3ZhbHVlcyk7XG4gICAgfVxuICAgIF9kZWYodmFyS2luZCwgbmFtZU9yUHJlZml4LCByaHMsIGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zY29wZS50b05hbWUobmFtZU9yUHJlZml4KTtcbiAgICAgICAgaWYgKHJocyAhPT0gdW5kZWZpbmVkICYmIGNvbnN0YW50KVxuICAgICAgICAgICAgdGhpcy5fY29uc3RhbnRzW25hbWUuc3RyXSA9IHJocztcbiAgICAgICAgdGhpcy5fbGVhZk5vZGUobmV3IERlZih2YXJLaW5kLCBuYW1lLCByaHMpKTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIC8vIGBjb25zdGAgZGVjbGFyYXRpb24gKGB2YXJgIGluIGVzNSBtb2RlKVxuICAgIGNvbnN0KG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZihzY29wZV8xLnZhcktpbmRzLmNvbnN0LCBuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KTtcbiAgICB9XG4gICAgLy8gYGxldGAgZGVjbGFyYXRpb24gd2l0aCBvcHRpb25hbCBhc3NpZ25tZW50IChgdmFyYCBpbiBlczUgbW9kZSlcbiAgICBsZXQobmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmKHNjb3BlXzEudmFyS2luZHMubGV0LCBuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KTtcbiAgICB9XG4gICAgLy8gYHZhcmAgZGVjbGFyYXRpb24gd2l0aCBvcHRpb25hbCBhc3NpZ25tZW50XG4gICAgdmFyKG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZihzY29wZV8xLnZhcktpbmRzLnZhciwgbmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCk7XG4gICAgfVxuICAgIC8vIGFzc2lnbm1lbnQgY29kZVxuICAgIGFzc2lnbihsaHMsIHJocywgc2lkZUVmZmVjdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBBc3NpZ24obGhzLCByaHMsIHNpZGVFZmZlY3RzKSk7XG4gICAgfVxuICAgIC8vIGArPWAgY29kZVxuICAgIGFkZChsaHMsIHJocykge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVhZk5vZGUobmV3IEFzc2lnbk9wKGxocywgZXhwb3J0cy5vcGVyYXRvcnMuQURELCByaHMpKTtcbiAgICB9XG4gICAgLy8gYXBwZW5kcyBwYXNzZWQgU2FmZUV4cHIgdG8gY29kZSBvciBleGVjdXRlcyBCbG9ja1xuICAgIGNvZGUoYykge1xuICAgICAgICBpZiAodHlwZW9mIGMgPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgYygpO1xuICAgICAgICBlbHNlIGlmIChjICE9PSBjb2RlXzEubmlsKVxuICAgICAgICAgICAgdGhpcy5fbGVhZk5vZGUobmV3IEFueUNvZGUoYykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gcmV0dXJucyBjb2RlIGZvciBvYmplY3QgbGl0ZXJhbCBmb3IgdGhlIHBhc3NlZCBhcmd1bWVudCBsaXN0IG9mIGtleS12YWx1ZSBwYWlyc1xuICAgIG9iamVjdCguLi5rZXlWYWx1ZXMpIHtcbiAgICAgICAgY29uc3QgY29kZSA9IFtcIntcIl07XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGtleVZhbHVlcykge1xuICAgICAgICAgICAgaWYgKGNvZGUubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICBjb2RlLnB1c2goXCIsXCIpO1xuICAgICAgICAgICAgY29kZS5wdXNoKGtleSk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB2YWx1ZSB8fCB0aGlzLm9wdHMuZXM1KSB7XG4gICAgICAgICAgICAgICAgY29kZS5wdXNoKFwiOlwiKTtcbiAgICAgICAgICAgICAgICAoMCwgY29kZV8xLmFkZENvZGVBcmcpKGNvZGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb2RlLnB1c2goXCJ9XCIpO1xuICAgICAgICByZXR1cm4gbmV3IGNvZGVfMS5fQ29kZShjb2RlKTtcbiAgICB9XG4gICAgLy8gYGlmYCBjbGF1c2UgKG9yIHN0YXRlbWVudCBpZiBgdGhlbkJvZHlgIGFuZCwgb3B0aW9uYWxseSwgYGVsc2VCb2R5YCBhcmUgcGFzc2VkKVxuICAgIGlmKGNvbmRpdGlvbiwgdGhlbkJvZHksIGVsc2VCb2R5KSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShuZXcgSWYoY29uZGl0aW9uKSk7XG4gICAgICAgIGlmICh0aGVuQm9keSAmJiBlbHNlQm9keSkge1xuICAgICAgICAgICAgdGhpcy5jb2RlKHRoZW5Cb2R5KS5lbHNlKCkuY29kZShlbHNlQm9keSkuZW5kSWYoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGVuQm9keSkge1xuICAgICAgICAgICAgdGhpcy5jb2RlKHRoZW5Cb2R5KS5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVsc2VCb2R5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVHZW46IFwiZWxzZVwiIGJvZHkgd2l0aG91dCBcInRoZW5cIiBib2R5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIGBlbHNlIGlmYCBjbGF1c2UgLSBpbnZhbGlkIHdpdGhvdXQgYGlmYCBvciBhZnRlciBgZWxzZWAgY2xhdXNlc1xuICAgIGVsc2VJZihjb25kaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vsc2VOb2RlKG5ldyBJZihjb25kaXRpb24pKTtcbiAgICB9XG4gICAgLy8gYGVsc2VgIGNsYXVzZSAtIG9ubHkgdmFsaWQgYWZ0ZXIgYGlmYCBvciBgZWxzZSBpZmAgY2xhdXNlc1xuICAgIGVsc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbHNlTm9kZShuZXcgRWxzZSgpKTtcbiAgICB9XG4gICAgLy8gZW5kIGBpZmAgc3RhdGVtZW50IChuZWVkZWQgaWYgZ2VuLmlmIHdhcyB1c2VkIG9ubHkgd2l0aCBjb25kaXRpb24pXG4gICAgZW5kSWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoSWYsIEVsc2UpO1xuICAgIH1cbiAgICBfZm9yKG5vZGUsIGZvckJvZHkpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tOb2RlKG5vZGUpO1xuICAgICAgICBpZiAoZm9yQm9keSlcbiAgICAgICAgICAgIHRoaXMuY29kZShmb3JCb2R5KS5lbmRGb3IoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIGEgZ2VuZXJpYyBgZm9yYCBjbGF1c2UgKG9yIHN0YXRlbWVudCBpZiBgZm9yQm9keWAgaXMgcGFzc2VkKVxuICAgIGZvcihpdGVyYXRpb24sIGZvckJvZHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcihuZXcgRm9yTG9vcChpdGVyYXRpb24pLCBmb3JCb2R5KTtcbiAgICB9XG4gICAgLy8gYGZvcmAgc3RhdGVtZW50IGZvciBhIHJhbmdlIG9mIHZhbHVlc1xuICAgIGZvclJhbmdlKG5hbWVPclByZWZpeCwgZnJvbSwgdG8sIGZvckJvZHksIHZhcktpbmQgPSB0aGlzLm9wdHMuZXM1ID8gc2NvcGVfMS52YXJLaW5kcy52YXIgOiBzY29wZV8xLnZhcktpbmRzLmxldCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fc2NvcGUudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3IobmV3IEZvclJhbmdlKHZhcktpbmQsIG5hbWUsIGZyb20sIHRvKSwgKCkgPT4gZm9yQm9keShuYW1lKSk7XG4gICAgfVxuICAgIC8vIGBmb3Itb2ZgIHN0YXRlbWVudCAoaW4gZXM1IG1vZGUgcmVwbGFjZSB3aXRoIGEgbm9ybWFsIGZvciBsb29wKVxuICAgIGZvck9mKG5hbWVPclByZWZpeCwgaXRlcmFibGUsIGZvckJvZHksIHZhcktpbmQgPSBzY29wZV8xLnZhcktpbmRzLmNvbnN0KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zY29wZS50b05hbWUobmFtZU9yUHJlZml4KTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5lczUpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IGl0ZXJhYmxlIGluc3RhbmNlb2YgY29kZV8xLk5hbWUgPyBpdGVyYWJsZSA6IHRoaXMudmFyKFwiX2FyclwiLCBpdGVyYWJsZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JSYW5nZShcIl9pXCIsIDAsICgwLCBjb2RlXzEuXykgYCR7YXJyfS5sZW5ndGhgLCAoaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmFyKG5hbWUsICgwLCBjb2RlXzEuXykgYCR7YXJyfVske2l9XWApO1xuICAgICAgICAgICAgICAgIGZvckJvZHkobmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZm9yKG5ldyBGb3JJdGVyKFwib2ZcIiwgdmFyS2luZCwgbmFtZSwgaXRlcmFibGUpLCAoKSA9PiBmb3JCb2R5KG5hbWUpKTtcbiAgICB9XG4gICAgLy8gYGZvci1pbmAgc3RhdGVtZW50LlxuICAgIC8vIFdpdGggb3B0aW9uIGBvd25Qcm9wZXJ0aWVzYCByZXBsYWNlZCB3aXRoIGEgYGZvci1vZmAgbG9vcCBmb3Igb2JqZWN0IGtleXNcbiAgICBmb3JJbihuYW1lT3JQcmVmaXgsIG9iaiwgZm9yQm9keSwgdmFyS2luZCA9IHRoaXMub3B0cy5lczUgPyBzY29wZV8xLnZhcktpbmRzLnZhciA6IHNjb3BlXzEudmFyS2luZHMuY29uc3QpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5vd25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JPZihuYW1lT3JQcmVmaXgsICgwLCBjb2RlXzEuXykgYE9iamVjdC5rZXlzKCR7b2JqfSlgLCBmb3JCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fc2NvcGUudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3IobmV3IEZvckl0ZXIoXCJpblwiLCB2YXJLaW5kLCBuYW1lLCBvYmopLCAoKSA9PiBmb3JCb2R5KG5hbWUpKTtcbiAgICB9XG4gICAgLy8gZW5kIGBmb3JgIGxvb3BcbiAgICBlbmRGb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoRm9yKTtcbiAgICB9XG4gICAgLy8gYGxhYmVsYCBzdGF0ZW1lbnRcbiAgICBsYWJlbChsYWJlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVhZk5vZGUobmV3IExhYmVsKGxhYmVsKSk7XG4gICAgfVxuICAgIC8vIGBicmVha2Agc3RhdGVtZW50XG4gICAgYnJlYWsobGFiZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBCcmVhayhsYWJlbCkpO1xuICAgIH1cbiAgICAvLyBgcmV0dXJuYCBzdGF0ZW1lbnRcbiAgICByZXR1cm4odmFsdWUpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBSZXR1cm4oKTtcbiAgICAgICAgdGhpcy5fYmxvY2tOb2RlKG5vZGUpO1xuICAgICAgICB0aGlzLmNvZGUodmFsdWUpO1xuICAgICAgICBpZiAobm9kZS5ub2Rlcy5sZW5ndGggIT09IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVHZW46IFwicmV0dXJuXCIgc2hvdWxkIGhhdmUgb25lIG5vZGUnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZEJsb2NrTm9kZShSZXR1cm4pO1xuICAgIH1cbiAgICAvLyBgdHJ5YCBzdGF0ZW1lbnRcbiAgICB0cnkodHJ5Qm9keSwgY2F0Y2hDb2RlLCBmaW5hbGx5Q29kZSkge1xuICAgICAgICBpZiAoIWNhdGNoQ29kZSAmJiAhZmluYWxseUNvZGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVHZW46IFwidHJ5XCIgd2l0aG91dCBcImNhdGNoXCIgYW5kIFwiZmluYWxseVwiJyk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgVHJ5KCk7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShub2RlKTtcbiAgICAgICAgdGhpcy5jb2RlKHRyeUJvZHkpO1xuICAgICAgICBpZiAoY2F0Y2hDb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMubmFtZShcImVcIik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyTm9kZSA9IG5vZGUuY2F0Y2ggPSBuZXcgQ2F0Y2goZXJyb3IpO1xuICAgICAgICAgICAgY2F0Y2hDb2RlKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWxseUNvZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJOb2RlID0gbm9kZS5maW5hbGx5ID0gbmV3IEZpbmFsbHkoKTtcbiAgICAgICAgICAgIHRoaXMuY29kZShmaW5hbGx5Q29kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZEJsb2NrTm9kZShDYXRjaCwgRmluYWxseSk7XG4gICAgfVxuICAgIC8vIGB0aHJvd2Agc3RhdGVtZW50XG4gICAgdGhyb3coZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBUaHJvdyhlcnJvcikpO1xuICAgIH1cbiAgICAvLyBzdGFydCBzZWxmLWJhbGFuY2luZyBibG9ja1xuICAgIGJsb2NrKGJvZHksIG5vZGVDb3VudCkge1xuICAgICAgICB0aGlzLl9ibG9ja1N0YXJ0cy5wdXNoKHRoaXMuX25vZGVzLmxlbmd0aCk7XG4gICAgICAgIGlmIChib2R5KVxuICAgICAgICAgICAgdGhpcy5jb2RlKGJvZHkpLmVuZEJsb2NrKG5vZGVDb3VudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBlbmQgdGhlIGN1cnJlbnQgc2VsZi1iYWxhbmNpbmcgYmxvY2tcbiAgICBlbmRCbG9jayhub2RlQ291bnQpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5fYmxvY2tTdGFydHMucG9wKCk7XG4gICAgICAgIGlmIChsZW4gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvZGVHZW46IG5vdCBpbiBzZWxmLWJhbGFuY2luZyBibG9ja1wiKTtcbiAgICAgICAgY29uc3QgdG9DbG9zZSA9IHRoaXMuX25vZGVzLmxlbmd0aCAtIGxlbjtcbiAgICAgICAgaWYgKHRvQ2xvc2UgPCAwIHx8IChub2RlQ291bnQgIT09IHVuZGVmaW5lZCAmJiB0b0Nsb3NlICE9PSBub2RlQ291bnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IHdyb25nIG51bWJlciBvZiBub2RlczogJHt0b0Nsb3NlfSB2cyAke25vZGVDb3VudH0gZXhwZWN0ZWRgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ub2Rlcy5sZW5ndGggPSBsZW47XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBgZnVuY3Rpb25gIGhlYWRpbmcgKG9yIGRlZmluaXRpb24gaWYgZnVuY0JvZHkgaXMgcGFzc2VkKVxuICAgIGZ1bmMobmFtZSwgYXJncyA9IGNvZGVfMS5uaWwsIGFzeW5jLCBmdW5jQm9keSkge1xuICAgICAgICB0aGlzLl9ibG9ja05vZGUobmV3IEZ1bmMobmFtZSwgYXJncywgYXN5bmMpKTtcbiAgICAgICAgaWYgKGZ1bmNCb2R5KVxuICAgICAgICAgICAgdGhpcy5jb2RlKGZ1bmNCb2R5KS5lbmRGdW5jKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBlbmQgZnVuY3Rpb24gZGVmaW5pdGlvblxuICAgIGVuZEZ1bmMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoRnVuYyk7XG4gICAgfVxuICAgIG9wdGltaXplKG4gPSAxKSB7XG4gICAgICAgIHdoaWxlIChuLS0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yb290Lm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3Qub3B0aW1pemVOYW1lcyh0aGlzLl9yb290Lm5hbWVzLCB0aGlzLl9jb25zdGFudHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9sZWFmTm9kZShub2RlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJOb2RlLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfYmxvY2tOb2RlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5fY3Vyck5vZGUubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgdGhpcy5fbm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gICAgX2VuZEJsb2NrTm9kZShOMSwgTjIpIHtcbiAgICAgICAgY29uc3QgbiA9IHRoaXMuX2N1cnJOb2RlO1xuICAgICAgICBpZiAobiBpbnN0YW5jZW9mIE4xIHx8IChOMiAmJiBuIGluc3RhbmNlb2YgTjIpKSB7XG4gICAgICAgICAgICB0aGlzLl9ub2Rlcy5wb3AoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogbm90IGluIGJsb2NrIFwiJHtOMiA/IGAke04xLmtpbmR9LyR7TjIua2luZH1gIDogTjEua2luZH1cImApO1xuICAgIH1cbiAgICBfZWxzZU5vZGUobm9kZSkge1xuICAgICAgICBjb25zdCBuID0gdGhpcy5fY3Vyck5vZGU7XG4gICAgICAgIGlmICghKG4gaW5zdGFuY2VvZiBJZikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29kZUdlbjogXCJlbHNlXCIgd2l0aG91dCBcImlmXCInKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyTm9kZSA9IG4uZWxzZSA9IG5vZGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgX3Jvb3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2Rlc1swXTtcbiAgICB9XG4gICAgZ2V0IF9jdXJyTm9kZSgpIHtcbiAgICAgICAgY29uc3QgbnMgPSB0aGlzLl9ub2RlcztcbiAgICAgICAgcmV0dXJuIG5zW25zLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICBzZXQgX2N1cnJOb2RlKG5vZGUpIHtcbiAgICAgICAgY29uc3QgbnMgPSB0aGlzLl9ub2RlcztcbiAgICAgICAgbnNbbnMubGVuZ3RoIC0gMV0gPSBub2RlO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29kZUdlbiA9IENvZGVHZW47XG5mdW5jdGlvbiBhZGROYW1lcyhuYW1lcywgZnJvbSkge1xuICAgIGZvciAoY29uc3QgbiBpbiBmcm9tKVxuICAgICAgICBuYW1lc1tuXSA9IChuYW1lc1tuXSB8fCAwKSArIChmcm9tW25dIHx8IDApO1xuICAgIHJldHVybiBuYW1lcztcbn1cbmZ1bmN0aW9uIGFkZEV4cHJOYW1lcyhuYW1lcywgZnJvbSkge1xuICAgIHJldHVybiBmcm9tIGluc3RhbmNlb2YgY29kZV8xLl9Db2RlT3JOYW1lID8gYWRkTmFtZXMobmFtZXMsIGZyb20ubmFtZXMpIDogbmFtZXM7XG59XG5mdW5jdGlvbiBvcHRpbWl6ZUV4cHIoZXhwciwgbmFtZXMsIGNvbnN0YW50cykge1xuICAgIGlmIChleHByIGluc3RhbmNlb2YgY29kZV8xLk5hbWUpXG4gICAgICAgIHJldHVybiByZXBsYWNlTmFtZShleHByKTtcbiAgICBpZiAoIWNhbk9wdGltaXplKGV4cHIpKVxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICByZXR1cm4gbmV3IGNvZGVfMS5fQ29kZShleHByLl9pdGVtcy5yZWR1Y2UoKGl0ZW1zLCBjKSA9PiB7XG4gICAgICAgIGlmIChjIGluc3RhbmNlb2YgY29kZV8xLk5hbWUpXG4gICAgICAgICAgICBjID0gcmVwbGFjZU5hbWUoYyk7XG4gICAgICAgIGlmIChjIGluc3RhbmNlb2YgY29kZV8xLl9Db2RlKVxuICAgICAgICAgICAgaXRlbXMucHVzaCguLi5jLl9pdGVtcyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goYyk7XG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9LCBbXSkpO1xuICAgIGZ1bmN0aW9uIHJlcGxhY2VOYW1lKG4pIHtcbiAgICAgICAgY29uc3QgYyA9IGNvbnN0YW50c1tuLnN0cl07XG4gICAgICAgIGlmIChjID09PSB1bmRlZmluZWQgfHwgbmFtZXNbbi5zdHJdICE9PSAxKVxuICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgIGRlbGV0ZSBuYW1lc1tuLnN0cl07XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW5PcHRpbWl6ZShlKSB7XG4gICAgICAgIHJldHVybiAoZSBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZSAmJlxuICAgICAgICAgICAgZS5faXRlbXMuc29tZSgoYykgPT4gYyBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lICYmIG5hbWVzW2Muc3RyXSA9PT0gMSAmJiBjb25zdGFudHNbYy5zdHJdICE9PSB1bmRlZmluZWQpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJ0cmFjdE5hbWVzKG5hbWVzLCBmcm9tKSB7XG4gICAgZm9yIChjb25zdCBuIGluIGZyb20pXG4gICAgICAgIG5hbWVzW25dID0gKG5hbWVzW25dIHx8IDApIC0gKGZyb21bbl0gfHwgMCk7XG59XG5mdW5jdGlvbiBub3QoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PSBcImJvb2xlYW5cIiB8fCB0eXBlb2YgeCA9PSBcIm51bWJlclwiIHx8IHggPT09IG51bGwgPyAheCA6ICgwLCBjb2RlXzEuXykgYCEke3Bhcih4KX1gO1xufVxuZXhwb3J0cy5ub3QgPSBub3Q7XG5jb25zdCBhbmRDb2RlID0gbWFwcGVuZChleHBvcnRzLm9wZXJhdG9ycy5BTkQpO1xuLy8gYm9vbGVhbiBBTkQgKCYmKSBleHByZXNzaW9uIHdpdGggdGhlIHBhc3NlZCBhcmd1bWVudHNcbmZ1bmN0aW9uIGFuZCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MucmVkdWNlKGFuZENvZGUpO1xufVxuZXhwb3J0cy5hbmQgPSBhbmQ7XG5jb25zdCBvckNvZGUgPSBtYXBwZW5kKGV4cG9ydHMub3BlcmF0b3JzLk9SKTtcbi8vIGJvb2xlYW4gT1IgKHx8KSBleHByZXNzaW9uIHdpdGggdGhlIHBhc3NlZCBhcmd1bWVudHNcbmZ1bmN0aW9uIG9yKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gYXJncy5yZWR1Y2Uob3JDb2RlKTtcbn1cbmV4cG9ydHMub3IgPSBvcjtcbmZ1bmN0aW9uIG1hcHBlbmQob3ApIHtcbiAgICByZXR1cm4gKHgsIHkpID0+ICh4ID09PSBjb2RlXzEubmlsID8geSA6IHkgPT09IGNvZGVfMS5uaWwgPyB4IDogKDAsIGNvZGVfMS5fKSBgJHtwYXIoeCl9ICR7b3B9ICR7cGFyKHkpfWApO1xufVxuZnVuY3Rpb24gcGFyKHgpIHtcbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lID8geCA6ICgwLCBjb2RlXzEuXykgYCgke3h9KWA7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmFsdWVTY29wZSA9IGV4cG9ydHMuVmFsdWVTY29wZU5hbWUgPSBleHBvcnRzLlNjb3BlID0gZXhwb3J0cy52YXJLaW5kcyA9IGV4cG9ydHMuVXNlZFZhbHVlU3RhdGUgPSB2b2lkIDA7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi9jb2RlXCIpO1xuY2xhc3MgVmFsdWVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHN1cGVyKGBDb2RlR2VuOiBcImNvZGVcIiBmb3IgJHtuYW1lfSBub3QgZGVmaW5lZGApO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmFtZS52YWx1ZTtcbiAgICB9XG59XG52YXIgVXNlZFZhbHVlU3RhdGU7XG4oZnVuY3Rpb24gKFVzZWRWYWx1ZVN0YXRlKSB7XG4gICAgVXNlZFZhbHVlU3RhdGVbVXNlZFZhbHVlU3RhdGVbXCJTdGFydGVkXCJdID0gMF0gPSBcIlN0YXJ0ZWRcIjtcbiAgICBVc2VkVmFsdWVTdGF0ZVtVc2VkVmFsdWVTdGF0ZVtcIkNvbXBsZXRlZFwiXSA9IDFdID0gXCJDb21wbGV0ZWRcIjtcbn0pKFVzZWRWYWx1ZVN0YXRlID0gZXhwb3J0cy5Vc2VkVmFsdWVTdGF0ZSB8fCAoZXhwb3J0cy5Vc2VkVmFsdWVTdGF0ZSA9IHt9KSk7XG5leHBvcnRzLnZhcktpbmRzID0ge1xuICAgIGNvbnN0OiBuZXcgY29kZV8xLk5hbWUoXCJjb25zdFwiKSxcbiAgICBsZXQ6IG5ldyBjb2RlXzEuTmFtZShcImxldFwiKSxcbiAgICB2YXI6IG5ldyBjb2RlXzEuTmFtZShcInZhclwiKSxcbn07XG5jbGFzcyBTY29wZSB7XG4gICAgY29uc3RydWN0b3IoeyBwcmVmaXhlcywgcGFyZW50IH0gPSB7fSkge1xuICAgICAgICB0aGlzLl9uYW1lcyA9IHt9O1xuICAgICAgICB0aGlzLl9wcmVmaXhlcyA9IHByZWZpeGVzO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgfVxuICAgIHRvTmFtZShuYW1lT3JQcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVPclByZWZpeCBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lID8gbmFtZU9yUHJlZml4IDogdGhpcy5uYW1lKG5hbWVPclByZWZpeCk7XG4gICAgfVxuICAgIG5hbWUocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBuZXcgY29kZV8xLk5hbWUodGhpcy5fbmV3TmFtZShwcmVmaXgpKTtcbiAgICB9XG4gICAgX25ld05hbWUocHJlZml4KSB7XG4gICAgICAgIGNvbnN0IG5nID0gdGhpcy5fbmFtZXNbcHJlZml4XSB8fCB0aGlzLl9uYW1lR3JvdXAocHJlZml4KTtcbiAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0ke25nLmluZGV4Kyt9YDtcbiAgICB9XG4gICAgX25hbWVHcm91cChwcmVmaXgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKCgoX2IgPSAoX2EgPSB0aGlzLl9wYXJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5fcHJlZml4ZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYXMocHJlZml4KSkgfHwgKHRoaXMuX3ByZWZpeGVzICYmICF0aGlzLl9wcmVmaXhlcy5oYXMocHJlZml4KSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogcHJlZml4IFwiJHtwcmVmaXh9XCIgaXMgbm90IGFsbG93ZWQgaW4gdGhpcyBzY29wZWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbmFtZXNbcHJlZml4XSA9IHsgcHJlZml4LCBpbmRleDogMCB9KTtcbiAgICB9XG59XG5leHBvcnRzLlNjb3BlID0gU2NvcGU7XG5jbGFzcyBWYWx1ZVNjb3BlTmFtZSBleHRlbmRzIGNvZGVfMS5OYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihwcmVmaXgsIG5hbWVTdHIpIHtcbiAgICAgICAgc3VwZXIobmFtZVN0cik7XG4gICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSwgeyBwcm9wZXJ0eSwgaXRlbUluZGV4IH0pIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNjb3BlUGF0aCA9ICgwLCBjb2RlXzEuXykgYC4ke25ldyBjb2RlXzEuTmFtZShwcm9wZXJ0eSl9WyR7aXRlbUluZGV4fV1gO1xuICAgIH1cbn1cbmV4cG9ydHMuVmFsdWVTY29wZU5hbWUgPSBWYWx1ZVNjb3BlTmFtZTtcbmNvbnN0IGxpbmUgPSAoMCwgY29kZV8xLl8pIGBcXG5gO1xuY2xhc3MgVmFsdWVTY29wZSBleHRlbmRzIFNjb3BlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB0aGlzLl92YWx1ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBvcHRzLnNjb3BlO1xuICAgICAgICB0aGlzLm9wdHMgPSB7IC4uLm9wdHMsIF9uOiBvcHRzLmxpbmVzID8gbGluZSA6IGNvZGVfMS5uaWwgfTtcbiAgICB9XG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGU7XG4gICAgfVxuICAgIG5hbWUocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmFsdWVTY29wZU5hbWUocHJlZml4LCB0aGlzLl9uZXdOYW1lKHByZWZpeCkpO1xuICAgIH1cbiAgICB2YWx1ZShuYW1lT3JQcmVmaXgsIHZhbHVlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHZhbHVlLnJlZiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29kZUdlbjogcmVmIG11c3QgYmUgcGFzc2VkIGluIHZhbHVlXCIpO1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy50b05hbWUobmFtZU9yUHJlZml4KTtcbiAgICAgICAgY29uc3QgeyBwcmVmaXggfSA9IG5hbWU7XG4gICAgICAgIGNvbnN0IHZhbHVlS2V5ID0gKF9hID0gdmFsdWUua2V5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB2YWx1ZS5yZWY7XG4gICAgICAgIGxldCB2cyA9IHRoaXMuX3ZhbHVlc1twcmVmaXhdO1xuICAgICAgICBpZiAodnMpIHtcbiAgICAgICAgICAgIGNvbnN0IF9uYW1lID0gdnMuZ2V0KHZhbHVlS2V5KTtcbiAgICAgICAgICAgIGlmIChfbmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gX25hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2cyA9IHRoaXMuX3ZhbHVlc1twcmVmaXhdID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIHZzLnNldCh2YWx1ZUtleSwgbmFtZSk7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLl9zY29wZVtwcmVmaXhdIHx8ICh0aGlzLl9zY29wZVtwcmVmaXhdID0gW10pO1xuICAgICAgICBjb25zdCBpdGVtSW5kZXggPSBzLmxlbmd0aDtcbiAgICAgICAgc1tpdGVtSW5kZXhdID0gdmFsdWUucmVmO1xuICAgICAgICBuYW1lLnNldFZhbHVlKHZhbHVlLCB7IHByb3BlcnR5OiBwcmVmaXgsIGl0ZW1JbmRleCB9KTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIGdldFZhbHVlKHByZWZpeCwga2V5T3JSZWYpIHtcbiAgICAgICAgY29uc3QgdnMgPSB0aGlzLl92YWx1ZXNbcHJlZml4XTtcbiAgICAgICAgaWYgKCF2cylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmV0dXJuIHZzLmdldChrZXlPclJlZik7XG4gICAgfVxuICAgIHNjb3BlUmVmcyhzY29wZU5hbWUsIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkdWNlVmFsdWVzKHZhbHVlcywgKG5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lLnNjb3BlUGF0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogbmFtZSBcIiR7bmFtZX1cIiBoYXMgbm8gdmFsdWVgKTtcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29kZV8xLl8pIGAke3Njb3BlTmFtZX0ke25hbWUuc2NvcGVQYXRofWA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzY29wZUNvZGUodmFsdWVzID0gdGhpcy5fdmFsdWVzLCB1c2VkVmFsdWVzLCBnZXRDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWR1Y2VWYWx1ZXModmFsdWVzLCAobmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IG5hbWUgXCIke25hbWV9XCIgaGFzIG5vIHZhbHVlYCk7XG4gICAgICAgICAgICByZXR1cm4gbmFtZS52YWx1ZS5jb2RlO1xuICAgICAgICB9LCB1c2VkVmFsdWVzLCBnZXRDb2RlKTtcbiAgICB9XG4gICAgX3JlZHVjZVZhbHVlcyh2YWx1ZXMsIHZhbHVlQ29kZSwgdXNlZFZhbHVlcyA9IHt9LCBnZXRDb2RlKSB7XG4gICAgICAgIGxldCBjb2RlID0gY29kZV8xLm5pbDtcbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggaW4gdmFsdWVzKSB7XG4gICAgICAgICAgICBjb25zdCB2cyA9IHZhbHVlc1twcmVmaXhdO1xuICAgICAgICAgICAgaWYgKCF2cylcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVTZXQgPSAodXNlZFZhbHVlc1twcmVmaXhdID0gdXNlZFZhbHVlc1twcmVmaXhdIHx8IG5ldyBNYXAoKSk7XG4gICAgICAgICAgICB2cy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWVTZXQuaGFzKG5hbWUpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgbmFtZVNldC5zZXQobmFtZSwgVXNlZFZhbHVlU3RhdGUuU3RhcnRlZCk7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSB2YWx1ZUNvZGUobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmID0gdGhpcy5vcHRzLmVzNSA/IGV4cG9ydHMudmFyS2luZHMudmFyIDogZXhwb3J0cy52YXJLaW5kcy5jb25zdDtcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9ICgwLCBjb2RlXzEuXykgYCR7Y29kZX0ke2RlZn0gJHtuYW1lfSA9ICR7Y307JHt0aGlzLm9wdHMuX259YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKGMgPSBnZXRDb2RlID09PSBudWxsIHx8IGdldENvZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGdldENvZGUobmFtZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSAoMCwgY29kZV8xLl8pIGAke2NvZGV9JHtjfSR7dGhpcy5vcHRzLl9ufWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVmFsdWVFcnJvcihuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmFtZVNldC5zZXQobmFtZSwgVXNlZFZhbHVlU3RhdGUuQ29tcGxldGVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbn1cbmV4cG9ydHMuVmFsdWVTY29wZSA9IFZhbHVlU2NvcGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY29wZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXh0ZW5kRXJyb3JzID0gZXhwb3J0cy5yZXNldEVycm9yc0NvdW50ID0gZXhwb3J0cy5yZXBvcnRFeHRyYUVycm9yID0gZXhwb3J0cy5yZXBvcnRFcnJvciA9IGV4cG9ydHMua2V5d29yZCREYXRhRXJyb3IgPSBleHBvcnRzLmtleXdvcmRFcnJvciA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuL25hbWVzXCIpO1xuZXhwb3J0cy5rZXl3b3JkRXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsga2V5d29yZCB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgcGFzcyBcIiR7a2V5d29yZH1cIiBrZXl3b3JkIHZhbGlkYXRpb25gLFxufTtcbmV4cG9ydHMua2V5d29yZCREYXRhRXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsga2V5d29yZCwgc2NoZW1hVHlwZSB9KSA9PiBzY2hlbWFUeXBlXG4gICAgICAgID8gKDAsIGNvZGVnZW5fMS5zdHIpIGBcIiR7a2V5d29yZH1cIiBrZXl3b3JkIG11c3QgYmUgJHtzY2hlbWFUeXBlfSAoJGRhdGEpYFxuICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuc3RyKSBgXCIke2tleXdvcmR9XCIga2V5d29yZCBpcyBpbnZhbGlkICgkZGF0YSlgLFxufTtcbmZ1bmN0aW9uIHJlcG9ydEVycm9yKGN4dCwgZXJyb3IgPSBleHBvcnRzLmtleXdvcmRFcnJvciwgZXJyb3JQYXRocywgb3ZlcnJpZGVBbGxFcnJvcnMpIHtcbiAgICBjb25zdCB7IGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgeyBnZW4sIGNvbXBvc2l0ZVJ1bGUsIGFsbEVycm9ycyB9ID0gaXQ7XG4gICAgY29uc3QgZXJyT2JqID0gZXJyb3JPYmplY3RDb2RlKGN4dCwgZXJyb3IsIGVycm9yUGF0aHMpO1xuICAgIGlmIChvdmVycmlkZUFsbEVycm9ycyAhPT0gbnVsbCAmJiBvdmVycmlkZUFsbEVycm9ycyAhPT0gdm9pZCAwID8gb3ZlcnJpZGVBbGxFcnJvcnMgOiAoY29tcG9zaXRlUnVsZSB8fCBhbGxFcnJvcnMpKSB7XG4gICAgICAgIGFkZEVycm9yKGdlbiwgZXJyT2JqKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybkVycm9ycyhpdCwgKDAsIGNvZGVnZW5fMS5fKSBgWyR7ZXJyT2JqfV1gKTtcbiAgICB9XG59XG5leHBvcnRzLnJlcG9ydEVycm9yID0gcmVwb3J0RXJyb3I7XG5mdW5jdGlvbiByZXBvcnRFeHRyYUVycm9yKGN4dCwgZXJyb3IgPSBleHBvcnRzLmtleXdvcmRFcnJvciwgZXJyb3JQYXRocykge1xuICAgIGNvbnN0IHsgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB7IGdlbiwgY29tcG9zaXRlUnVsZSwgYWxsRXJyb3JzIH0gPSBpdDtcbiAgICBjb25zdCBlcnJPYmogPSBlcnJvck9iamVjdENvZGUoY3h0LCBlcnJvciwgZXJyb3JQYXRocyk7XG4gICAgYWRkRXJyb3IoZ2VuLCBlcnJPYmopO1xuICAgIGlmICghKGNvbXBvc2l0ZVJ1bGUgfHwgYWxsRXJyb3JzKSkge1xuICAgICAgICByZXR1cm5FcnJvcnMoaXQsIG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzKTtcbiAgICB9XG59XG5leHBvcnRzLnJlcG9ydEV4dHJhRXJyb3IgPSByZXBvcnRFeHRyYUVycm9yO1xuZnVuY3Rpb24gcmVzZXRFcnJvcnNDb3VudChnZW4sIGVycnNDb3VudCkge1xuICAgIGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LmVycm9ycywgZXJyc0NvdW50KTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30gIT09IG51bGxgLCAoKSA9PiBnZW4uaWYoZXJyc0NvdW50LCAoKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9Lmxlbmd0aGAsIGVycnNDb3VudCksICgpID0+IGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMsIG51bGwpKSk7XG59XG5leHBvcnRzLnJlc2V0RXJyb3JzQ291bnQgPSByZXNldEVycm9yc0NvdW50O1xuZnVuY3Rpb24gZXh0ZW5kRXJyb3JzKHsgZ2VuLCBrZXl3b3JkLCBzY2hlbWFWYWx1ZSwgZGF0YSwgZXJyc0NvdW50LCBpdCwgfSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChlcnJzQ291bnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgIGNvbnN0IGVyciA9IGdlbi5uYW1lKFwiZXJyXCIpO1xuICAgIGdlbi5mb3JSYW5nZShcImlcIiwgZXJyc0NvdW50LCBuYW1lc18xLmRlZmF1bHQuZXJyb3JzLCAoaSkgPT4ge1xuICAgICAgICBnZW4uY29uc3QoZXJyLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfVske2l9XWApO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9Lmluc3RhbmNlUGF0aCA9PT0gdW5kZWZpbmVkYCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2Vycn0uaW5zdGFuY2VQYXRoYCwgKDAsIGNvZGVnZW5fMS5zdHJDb25jYXQpKG5hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsIGl0LmVycm9yUGF0aCkpKTtcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2Vycn0uc2NoZW1hUGF0aGAsICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtpdC5lcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9YCk7XG4gICAgICAgIGlmIChpdC5vcHRzLnZlcmJvc2UpIHtcbiAgICAgICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9LnNjaGVtYWAsIHNjaGVtYVZhbHVlKTtcbiAgICAgICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9LmRhdGFgLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5leHRlbmRFcnJvcnMgPSBleHRlbmRFcnJvcnM7XG5mdW5jdGlvbiBhZGRFcnJvcihnZW4sIGVyck9iaikge1xuICAgIGNvbnN0IGVyciA9IGdlbi5jb25zdChcImVyclwiLCBlcnJPYmopO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSA9PT0gbnVsbGAsICgpID0+IGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMsICgwLCBjb2RlZ2VuXzEuXykgYFske2Vycn1dYCksICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9LnB1c2goJHtlcnJ9KWApO1xuICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc30rK2ApO1xufVxuZnVuY3Rpb24gcmV0dXJuRXJyb3JzKGl0LCBlcnJzKSB7XG4gICAgY29uc3QgeyBnZW4sIHZhbGlkYXRlTmFtZSwgc2NoZW1hRW52IH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hRW52LiRhc3luYykge1xuICAgICAgICBnZW4udGhyb3coKDAsIGNvZGVnZW5fMS5fKSBgbmV3ICR7aXQuVmFsaWRhdGlvbkVycm9yfSgke2VycnN9KWApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlTmFtZX0uZXJyb3JzYCwgZXJycyk7XG4gICAgICAgIGdlbi5yZXR1cm4oZmFsc2UpO1xuICAgIH1cbn1cbmNvbnN0IEUgPSB7XG4gICAga2V5d29yZDogbmV3IGNvZGVnZW5fMS5OYW1lKFwia2V5d29yZFwiKSxcbiAgICBzY2hlbWFQYXRoOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJzY2hlbWFQYXRoXCIpLFxuICAgIHBhcmFtczogbmV3IGNvZGVnZW5fMS5OYW1lKFwicGFyYW1zXCIpLFxuICAgIHByb3BlcnR5TmFtZTogbmV3IGNvZGVnZW5fMS5OYW1lKFwicHJvcGVydHlOYW1lXCIpLFxuICAgIG1lc3NhZ2U6IG5ldyBjb2RlZ2VuXzEuTmFtZShcIm1lc3NhZ2VcIiksXG4gICAgc2NoZW1hOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJzY2hlbWFcIiksXG4gICAgcGFyZW50U2NoZW1hOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJwYXJlbnRTY2hlbWFcIiksXG59O1xuZnVuY3Rpb24gZXJyb3JPYmplY3RDb2RlKGN4dCwgZXJyb3IsIGVycm9yUGF0aHMpIHtcbiAgICBjb25zdCB7IGNyZWF0ZUVycm9ycyB9ID0gY3h0Lml0O1xuICAgIGlmIChjcmVhdGVFcnJvcnMgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBge31gO1xuICAgIHJldHVybiBlcnJvck9iamVjdChjeHQsIGVycm9yLCBlcnJvclBhdGhzKTtcbn1cbmZ1bmN0aW9uIGVycm9yT2JqZWN0KGN4dCwgZXJyb3IsIGVycm9yUGF0aHMgPSB7fSkge1xuICAgIGNvbnN0IHsgZ2VuLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IGtleVZhbHVlcyA9IFtcbiAgICAgICAgZXJyb3JJbnN0YW5jZVBhdGgoaXQsIGVycm9yUGF0aHMpLFxuICAgICAgICBlcnJvclNjaGVtYVBhdGgoY3h0LCBlcnJvclBhdGhzKSxcbiAgICBdO1xuICAgIGV4dHJhRXJyb3JQcm9wcyhjeHQsIGVycm9yLCBrZXlWYWx1ZXMpO1xuICAgIHJldHVybiBnZW4ub2JqZWN0KC4uLmtleVZhbHVlcyk7XG59XG5mdW5jdGlvbiBlcnJvckluc3RhbmNlUGF0aCh7IGVycm9yUGF0aCB9LCB7IGluc3RhbmNlUGF0aCB9KSB7XG4gICAgY29uc3QgaW5zdFBhdGggPSBpbnN0YW5jZVBhdGhcbiAgICAgICAgPyAoMCwgY29kZWdlbl8xLnN0cikgYCR7ZXJyb3JQYXRofSR7KDAsIHV0aWxfMS5nZXRFcnJvclBhdGgpKGluc3RhbmNlUGF0aCwgdXRpbF8xLlR5cGUuU3RyKX1gXG4gICAgICAgIDogZXJyb3JQYXRoO1xuICAgIHJldHVybiBbbmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgKDAsIGNvZGVnZW5fMS5zdHJDb25jYXQpKG5hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsIGluc3RQYXRoKV07XG59XG5mdW5jdGlvbiBlcnJvclNjaGVtYVBhdGgoeyBrZXl3b3JkLCBpdDogeyBlcnJTY2hlbWFQYXRoIH0gfSwgeyBzY2hlbWFQYXRoLCBwYXJlbnRTY2hlbWEgfSkge1xuICAgIGxldCBzY2hQYXRoID0gcGFyZW50U2NoZW1hID8gZXJyU2NoZW1hUGF0aCA6ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtlcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9YDtcbiAgICBpZiAoc2NoZW1hUGF0aCkge1xuICAgICAgICBzY2hQYXRoID0gKDAsIGNvZGVnZW5fMS5zdHIpIGAke3NjaFBhdGh9JHsoMCwgdXRpbF8xLmdldEVycm9yUGF0aCkoc2NoZW1hUGF0aCwgdXRpbF8xLlR5cGUuU3RyKX1gO1xuICAgIH1cbiAgICByZXR1cm4gW0Uuc2NoZW1hUGF0aCwgc2NoUGF0aF07XG59XG5mdW5jdGlvbiBleHRyYUVycm9yUHJvcHMoY3h0LCB7IHBhcmFtcywgbWVzc2FnZSB9LCBrZXlWYWx1ZXMpIHtcbiAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYVZhbHVlLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHsgb3B0cywgcHJvcGVydHlOYW1lLCB0b3BTY2hlbWFSZWYsIHNjaGVtYVBhdGggfSA9IGl0O1xuICAgIGtleVZhbHVlcy5wdXNoKFtFLmtleXdvcmQsIGtleXdvcmRdLCBbRS5wYXJhbXMsIHR5cGVvZiBwYXJhbXMgPT0gXCJmdW5jdGlvblwiID8gcGFyYW1zKGN4dCkgOiBwYXJhbXMgfHwgKDAsIGNvZGVnZW5fMS5fKSBge31gXSk7XG4gICAgaWYgKG9wdHMubWVzc2FnZXMpIHtcbiAgICAgICAga2V5VmFsdWVzLnB1c2goW0UubWVzc2FnZSwgdHlwZW9mIG1lc3NhZ2UgPT0gXCJmdW5jdGlvblwiID8gbWVzc2FnZShjeHQpIDogbWVzc2FnZV0pO1xuICAgIH1cbiAgICBpZiAob3B0cy52ZXJib3NlKSB7XG4gICAgICAgIGtleVZhbHVlcy5wdXNoKFtFLnNjaGVtYSwgc2NoZW1hVmFsdWVdLCBbRS5wYXJlbnRTY2hlbWEsICgwLCBjb2RlZ2VuXzEuXykgYCR7dG9wU2NoZW1hUmVmfSR7c2NoZW1hUGF0aH1gXSwgW25hbWVzXzEuZGVmYXVsdC5kYXRhLCBkYXRhXSk7XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0eU5hbWUpXG4gICAgICAgIGtleVZhbHVlcy5wdXNoKFtFLnByb3BlcnR5TmFtZSwgcHJvcGVydHlOYW1lXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlc29sdmVTY2hlbWEgPSBleHBvcnRzLmdldENvbXBpbGluZ1NjaGVtYSA9IGV4cG9ydHMucmVzb2x2ZVJlZiA9IGV4cG9ydHMuY29tcGlsZVNjaGVtYSA9IGV4cG9ydHMuU2NoZW1hRW52ID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29kZWdlblwiKTtcbmNvbnN0IHZhbGlkYXRpb25fZXJyb3JfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3JcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4vbmFtZXNcIik7XG5jb25zdCByZXNvbHZlXzEgPSByZXF1aXJlKFwiLi9yZXNvbHZlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi92YWxpZGF0ZVwiKTtcbmNsYXNzIFNjaGVtYUVudiB7XG4gICAgY29uc3RydWN0b3IoZW52KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5yZWZzID0ge307XG4gICAgICAgIHRoaXMuZHluYW1pY0FuY2hvcnMgPSB7fTtcbiAgICAgICAgbGV0IHNjaGVtYTtcbiAgICAgICAgaWYgKHR5cGVvZiBlbnYuc2NoZW1hID09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICBzY2hlbWEgPSBlbnYuc2NoZW1hO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IGVudi5zY2hlbWE7XG4gICAgICAgIHRoaXMuc2NoZW1hSWQgPSBlbnYuc2NoZW1hSWQ7XG4gICAgICAgIHRoaXMucm9vdCA9IGVudi5yb290IHx8IHRoaXM7XG4gICAgICAgIHRoaXMuYmFzZUlkID0gKF9hID0gZW52LmJhc2VJZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoc2NoZW1hID09PSBudWxsIHx8IHNjaGVtYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoZW1hW2Vudi5zY2hlbWFJZCB8fCBcIiRpZFwiXSk7XG4gICAgICAgIHRoaXMuc2NoZW1hUGF0aCA9IGVudi5zY2hlbWFQYXRoO1xuICAgICAgICB0aGlzLmxvY2FsUmVmcyA9IGVudi5sb2NhbFJlZnM7XG4gICAgICAgIHRoaXMubWV0YSA9IGVudi5tZXRhO1xuICAgICAgICB0aGlzLiRhc3luYyA9IHNjaGVtYSA9PT0gbnVsbCB8fCBzY2hlbWEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaGVtYS4kYXN5bmM7XG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgIH1cbn1cbmV4cG9ydHMuU2NoZW1hRW52ID0gU2NoZW1hRW52O1xuLy8gbGV0IGNvZGVTaXplID0gMFxuLy8gbGV0IG5vZGVDb3VudCA9IDBcbi8vIENvbXBpbGVzIHNjaGVtYSBpbiBTY2hlbWFFbnZcbmZ1bmN0aW9uIGNvbXBpbGVTY2hlbWEoc2NoKSB7XG4gICAgLy8gVE9ETyByZWZhY3RvciAtIHJlbW92ZSBjb21waWxhdGlvbnNcbiAgICBjb25zdCBfc2NoID0gZ2V0Q29tcGlsaW5nU2NoZW1hLmNhbGwodGhpcywgc2NoKTtcbiAgICBpZiAoX3NjaClcbiAgICAgICAgcmV0dXJuIF9zY2g7XG4gICAgY29uc3Qgcm9vdElkID0gKDAsIHJlc29sdmVfMS5nZXRGdWxsUGF0aCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCBzY2gucm9vdC5iYXNlSWQpOyAvLyBUT0RPIGlmIGdldEZ1bGxQYXRoIHJlbW92ZWQgMSB0ZXN0cyBmYWlsc1xuICAgIGNvbnN0IHsgZXM1LCBsaW5lcyB9ID0gdGhpcy5vcHRzLmNvZGU7XG4gICAgY29uc3QgeyBvd25Qcm9wZXJ0aWVzIH0gPSB0aGlzLm9wdHM7XG4gICAgY29uc3QgZ2VuID0gbmV3IGNvZGVnZW5fMS5Db2RlR2VuKHRoaXMuc2NvcGUsIHsgZXM1LCBsaW5lcywgb3duUHJvcGVydGllcyB9KTtcbiAgICBsZXQgX1ZhbGlkYXRpb25FcnJvcjtcbiAgICBpZiAoc2NoLiRhc3luYykge1xuICAgICAgICBfVmFsaWRhdGlvbkVycm9yID0gZ2VuLnNjb3BlVmFsdWUoXCJFcnJvclwiLCB7XG4gICAgICAgICAgICByZWY6IHZhbGlkYXRpb25fZXJyb3JfMS5kZWZhdWx0LFxuICAgICAgICAgICAgY29kZTogKDAsIGNvZGVnZW5fMS5fKSBgcmVxdWlyZShcImFqdi9kaXN0L3J1bnRpbWUvdmFsaWRhdGlvbl9lcnJvclwiKS5kZWZhdWx0YCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkYXRlTmFtZSA9IGdlbi5zY29wZU5hbWUoXCJ2YWxpZGF0ZVwiKTtcbiAgICBzY2gudmFsaWRhdGVOYW1lID0gdmFsaWRhdGVOYW1lO1xuICAgIGNvbnN0IHNjaGVtYUN4dCA9IHtcbiAgICAgICAgZ2VuLFxuICAgICAgICBhbGxFcnJvcnM6IHRoaXMub3B0cy5hbGxFcnJvcnMsXG4gICAgICAgIGRhdGE6IG5hbWVzXzEuZGVmYXVsdC5kYXRhLFxuICAgICAgICBwYXJlbnREYXRhOiBuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YSxcbiAgICAgICAgcGFyZW50RGF0YVByb3BlcnR5OiBuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LFxuICAgICAgICBkYXRhTmFtZXM6IFtuYW1lc18xLmRlZmF1bHQuZGF0YV0sXG4gICAgICAgIGRhdGFQYXRoQXJyOiBbY29kZWdlbl8xLm5pbF0sXG4gICAgICAgIGRhdGFMZXZlbDogMCxcbiAgICAgICAgZGF0YVR5cGVzOiBbXSxcbiAgICAgICAgZGVmaW5lZFByb3BlcnRpZXM6IG5ldyBTZXQoKSxcbiAgICAgICAgdG9wU2NoZW1hUmVmOiBnZW4uc2NvcGVWYWx1ZShcInNjaGVtYVwiLCB0aGlzLm9wdHMuY29kZS5zb3VyY2UgPT09IHRydWVcbiAgICAgICAgICAgID8geyByZWY6IHNjaC5zY2hlbWEsIGNvZGU6ICgwLCBjb2RlZ2VuXzEuc3RyaW5naWZ5KShzY2guc2NoZW1hKSB9XG4gICAgICAgICAgICA6IHsgcmVmOiBzY2guc2NoZW1hIH0pLFxuICAgICAgICB2YWxpZGF0ZU5hbWUsXG4gICAgICAgIFZhbGlkYXRpb25FcnJvcjogX1ZhbGlkYXRpb25FcnJvcixcbiAgICAgICAgc2NoZW1hOiBzY2guc2NoZW1hLFxuICAgICAgICBzY2hlbWFFbnY6IHNjaCxcbiAgICAgICAgcm9vdElkLFxuICAgICAgICBiYXNlSWQ6IHNjaC5iYXNlSWQgfHwgcm9vdElkLFxuICAgICAgICBzY2hlbWFQYXRoOiBjb2RlZ2VuXzEubmlsLFxuICAgICAgICBlcnJTY2hlbWFQYXRoOiBzY2guc2NoZW1hUGF0aCB8fCAodGhpcy5vcHRzLmp0ZCA/IFwiXCIgOiBcIiNcIiksXG4gICAgICAgIGVycm9yUGF0aDogKDAsIGNvZGVnZW5fMS5fKSBgXCJcImAsXG4gICAgICAgIG9wdHM6IHRoaXMub3B0cyxcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICB9O1xuICAgIGxldCBzb3VyY2VDb2RlO1xuICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX2NvbXBpbGF0aW9ucy5hZGQoc2NoKTtcbiAgICAgICAgKDAsIHZhbGlkYXRlXzEudmFsaWRhdGVGdW5jdGlvbkNvZGUpKHNjaGVtYUN4dCk7XG4gICAgICAgIGdlbi5vcHRpbWl6ZSh0aGlzLm9wdHMuY29kZS5vcHRpbWl6ZSk7XG4gICAgICAgIC8vIGdlbi5vcHRpbWl6ZSgxKVxuICAgICAgICBjb25zdCB2YWxpZGF0ZUNvZGUgPSBnZW4udG9TdHJpbmcoKTtcbiAgICAgICAgc291cmNlQ29kZSA9IGAke2dlbi5zY29wZVJlZnMobmFtZXNfMS5kZWZhdWx0LnNjb3BlKX1yZXR1cm4gJHt2YWxpZGF0ZUNvZGV9YDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coKGNvZGVTaXplICs9IHNvdXJjZUNvZGUubGVuZ3RoKSwgKG5vZGVDb3VudCArPSBnZW4ubm9kZUNvdW50KSlcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jb2RlLnByb2Nlc3MpXG4gICAgICAgICAgICBzb3VyY2VDb2RlID0gdGhpcy5vcHRzLmNvZGUucHJvY2Vzcyhzb3VyY2VDb2RlLCBzY2gpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlxcblxcblxcbiAqKiogXFxuXCIsIHNvdXJjZUNvZGUpXG4gICAgICAgIGNvbnN0IG1ha2VWYWxpZGF0ZSA9IG5ldyBGdW5jdGlvbihgJHtuYW1lc18xLmRlZmF1bHQuc2VsZn1gLCBgJHtuYW1lc18xLmRlZmF1bHQuc2NvcGV9YCwgc291cmNlQ29kZSk7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlID0gbWFrZVZhbGlkYXRlKHRoaXMsIHRoaXMuc2NvcGUuZ2V0KCkpO1xuICAgICAgICB0aGlzLnNjb3BlLnZhbHVlKHZhbGlkYXRlTmFtZSwgeyByZWY6IHZhbGlkYXRlIH0pO1xuICAgICAgICB2YWxpZGF0ZS5lcnJvcnMgPSBudWxsO1xuICAgICAgICB2YWxpZGF0ZS5zY2hlbWEgPSBzY2guc2NoZW1hO1xuICAgICAgICB2YWxpZGF0ZS5zY2hlbWFFbnYgPSBzY2g7XG4gICAgICAgIGlmIChzY2guJGFzeW5jKVxuICAgICAgICAgICAgdmFsaWRhdGUuJGFzeW5jID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jb2RlLnNvdXJjZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFsaWRhdGUuc291cmNlID0geyB2YWxpZGF0ZU5hbWUsIHZhbGlkYXRlQ29kZSwgc2NvcGVWYWx1ZXM6IGdlbi5fdmFsdWVzIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0cy51bmV2YWx1YXRlZCkge1xuICAgICAgICAgICAgY29uc3QgeyBwcm9wcywgaXRlbXMgfSA9IHNjaGVtYUN4dDtcbiAgICAgICAgICAgIHZhbGlkYXRlLmV2YWx1YXRlZCA9IHtcbiAgICAgICAgICAgICAgICBwcm9wczogcHJvcHMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSA/IHVuZGVmaW5lZCA6IHByb3BzLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gdW5kZWZpbmVkIDogaXRlbXMsXG4gICAgICAgICAgICAgICAgZHluYW1pY1Byb3BzOiBwcm9wcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lLFxuICAgICAgICAgICAgICAgIGR5bmFtaWNJdGVtczogaXRlbXMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodmFsaWRhdGUuc291cmNlKVxuICAgICAgICAgICAgICAgIHZhbGlkYXRlLnNvdXJjZS5ldmFsdWF0ZWQgPSAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkodmFsaWRhdGUuZXZhbHVhdGVkKTtcbiAgICAgICAgfVxuICAgICAgICBzY2gudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgICAgcmV0dXJuIHNjaDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVsZXRlIHNjaC52YWxpZGF0ZTtcbiAgICAgICAgZGVsZXRlIHNjaC52YWxpZGF0ZU5hbWU7XG4gICAgICAgIGlmIChzb3VyY2VDb2RlKVxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJFcnJvciBjb21waWxpbmcgc2NoZW1hLCBmdW5jdGlvbiBjb2RlOlwiLCBzb3VyY2VDb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJcXG5cXG5cXG4gKioqIFxcblwiLCBzb3VyY2VDb2RlLCB0aGlzLm9wdHMpXG4gICAgICAgIHRocm93IGU7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0aGlzLl9jb21waWxhdGlvbnMuZGVsZXRlKHNjaCk7XG4gICAgfVxufVxuZXhwb3J0cy5jb21waWxlU2NoZW1hID0gY29tcGlsZVNjaGVtYTtcbmZ1bmN0aW9uIHJlc29sdmVSZWYocm9vdCwgYmFzZUlkLCByZWYpIHtcbiAgICB2YXIgX2E7XG4gICAgcmVmID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgcmVmKTtcbiAgICBjb25zdCBzY2hPckZ1bmMgPSByb290LnJlZnNbcmVmXTtcbiAgICBpZiAoc2NoT3JGdW5jKVxuICAgICAgICByZXR1cm4gc2NoT3JGdW5jO1xuICAgIGxldCBfc2NoID0gcmVzb2x2ZS5jYWxsKHRoaXMsIHJvb3QsIHJlZik7XG4gICAgaWYgKF9zY2ggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBzY2hlbWEgPSAoX2EgPSByb290LmxvY2FsUmVmcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3JlZl07IC8vIFRPRE8gbWF5YmUgbG9jYWxSZWZzIHNob3VsZCBob2xkIFNjaGVtYUVudlxuICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGlmIChzY2hlbWEpXG4gICAgICAgICAgICBfc2NoID0gbmV3IFNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIHJvb3QsIGJhc2VJZCB9KTtcbiAgICB9XG4gICAgaWYgKF9zY2ggPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAocm9vdC5yZWZzW3JlZl0gPSBpbmxpbmVPckNvbXBpbGUuY2FsbCh0aGlzLCBfc2NoKSk7XG59XG5leHBvcnRzLnJlc29sdmVSZWYgPSByZXNvbHZlUmVmO1xuZnVuY3Rpb24gaW5saW5lT3JDb21waWxlKHNjaCkge1xuICAgIGlmICgoMCwgcmVzb2x2ZV8xLmlubGluZVJlZikoc2NoLnNjaGVtYSwgdGhpcy5vcHRzLmlubGluZVJlZnMpKVxuICAgICAgICByZXR1cm4gc2NoLnNjaGVtYTtcbiAgICByZXR1cm4gc2NoLnZhbGlkYXRlID8gc2NoIDogY29tcGlsZVNjaGVtYS5jYWxsKHRoaXMsIHNjaCk7XG59XG4vLyBJbmRleCBvZiBzY2hlbWEgY29tcGlsYXRpb24gaW4gdGhlIGN1cnJlbnRseSBjb21waWxlZCBsaXN0XG5mdW5jdGlvbiBnZXRDb21waWxpbmdTY2hlbWEoc2NoRW52KSB7XG4gICAgZm9yIChjb25zdCBzY2ggb2YgdGhpcy5fY29tcGlsYXRpb25zKSB7XG4gICAgICAgIGlmIChzYW1lU2NoZW1hRW52KHNjaCwgc2NoRW52KSlcbiAgICAgICAgICAgIHJldHVybiBzY2g7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRDb21waWxpbmdTY2hlbWEgPSBnZXRDb21waWxpbmdTY2hlbWE7XG5mdW5jdGlvbiBzYW1lU2NoZW1hRW52KHMxLCBzMikge1xuICAgIHJldHVybiBzMS5zY2hlbWEgPT09IHMyLnNjaGVtYSAmJiBzMS5yb290ID09PSBzMi5yb290ICYmIHMxLmJhc2VJZCA9PT0gczIuYmFzZUlkO1xufVxuLy8gcmVzb2x2ZSBhbmQgY29tcGlsZSB0aGUgcmVmZXJlbmNlcyAoJHJlZilcbi8vIFRPRE8gcmV0dXJucyBBbnlTY2hlbWFPYmplY3QgKGlmIHRoZSBzY2hlbWEgY2FuIGJlIGlubGluZWQpIG9yIHZhbGlkYXRpb24gZnVuY3Rpb25cbmZ1bmN0aW9uIHJlc29sdmUocm9vdCwgLy8gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJvb3Qgc2NoZW1hIGZvciB0aGUgY3VycmVudCBzY2hlbWFcbnJlZiAvLyByZWZlcmVuY2UgdG8gcmVzb2x2ZVxuKSB7XG4gICAgbGV0IHNjaDtcbiAgICB3aGlsZSAodHlwZW9mIChzY2ggPSB0aGlzLnJlZnNbcmVmXSkgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmVmID0gc2NoO1xuICAgIHJldHVybiBzY2ggfHwgdGhpcy5zY2hlbWFzW3JlZl0gfHwgcmVzb2x2ZVNjaGVtYS5jYWxsKHRoaXMsIHJvb3QsIHJlZik7XG59XG4vLyBSZXNvbHZlIHNjaGVtYSwgaXRzIHJvb3QgYW5kIGJhc2VJZFxuZnVuY3Rpb24gcmVzb2x2ZVNjaGVtYShyb290LCAvLyByb290IG9iamVjdCB3aXRoIHByb3BlcnRpZXMgc2NoZW1hLCByZWZzIFRPRE8gYmVsb3cgU2NoZW1hRW52IGlzIGFzc2lnbmVkIHRvIGl0XG5yZWYgLy8gcmVmZXJlbmNlIHRvIHJlc29sdmVcbikge1xuICAgIGNvbnN0IHAgPSB0aGlzLm9wdHMudXJpUmVzb2x2ZXIucGFyc2UocmVmKTtcbiAgICBjb25zdCByZWZQYXRoID0gKDAsIHJlc29sdmVfMS5fZ2V0RnVsbFBhdGgpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgcCk7XG4gICAgbGV0IGJhc2VJZCA9ICgwLCByZXNvbHZlXzEuZ2V0RnVsbFBhdGgpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgcm9vdC5iYXNlSWQsIHVuZGVmaW5lZCk7XG4gICAgLy8gVE9ETyBgT2JqZWN0LmtleXMocm9vdC5zY2hlbWEpLmxlbmd0aCA+IDBgIHNob3VsZCBub3QgYmUgbmVlZGVkIC0gYnV0IHJlbW92aW5nIGJyZWFrcyAyIHRlc3RzXG4gICAgaWYgKE9iamVjdC5rZXlzKHJvb3Quc2NoZW1hKS5sZW5ndGggPiAwICYmIHJlZlBhdGggPT09IGJhc2VJZCkge1xuICAgICAgICByZXR1cm4gZ2V0SnNvblBvaW50ZXIuY2FsbCh0aGlzLCBwLCByb290KTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShyZWZQYXRoKTtcbiAgICBjb25zdCBzY2hPclJlZiA9IHRoaXMucmVmc1tpZF0gfHwgdGhpcy5zY2hlbWFzW2lkXTtcbiAgICBpZiAodHlwZW9mIHNjaE9yUmVmID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3Qgc2NoID0gcmVzb2x2ZVNjaGVtYS5jYWxsKHRoaXMsIHJvb3QsIHNjaE9yUmVmKTtcbiAgICAgICAgaWYgKHR5cGVvZiAoc2NoID09PSBudWxsIHx8IHNjaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoLnNjaGVtYSkgIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJldHVybiBnZXRKc29uUG9pbnRlci5jYWxsKHRoaXMsIHAsIHNjaCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgKHNjaE9yUmVmID09PSBudWxsIHx8IHNjaE9yUmVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2hPclJlZi5zY2hlbWEpICE9PSBcIm9iamVjdFwiKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCFzY2hPclJlZi52YWxpZGF0ZSlcbiAgICAgICAgY29tcGlsZVNjaGVtYS5jYWxsKHRoaXMsIHNjaE9yUmVmKTtcbiAgICBpZiAoaWQgPT09ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKHJlZikpIHtcbiAgICAgICAgY29uc3QgeyBzY2hlbWEgfSA9IHNjaE9yUmVmO1xuICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGNvbnN0IHNjaElkID0gc2NoZW1hW3NjaGVtYUlkXTtcbiAgICAgICAgaWYgKHNjaElkKVxuICAgICAgICAgICAgYmFzZUlkID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgc2NoSWQpO1xuICAgICAgICByZXR1cm4gbmV3IFNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIHJvb3QsIGJhc2VJZCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEpzb25Qb2ludGVyLmNhbGwodGhpcywgcCwgc2NoT3JSZWYpO1xufVxuZXhwb3J0cy5yZXNvbHZlU2NoZW1hID0gcmVzb2x2ZVNjaGVtYTtcbmNvbnN0IFBSRVZFTlRfU0NPUEVfQ0hBTkdFID0gbmV3IFNldChbXG4gICAgXCJwcm9wZXJ0aWVzXCIsXG4gICAgXCJwYXR0ZXJuUHJvcGVydGllc1wiLFxuICAgIFwiZW51bVwiLFxuICAgIFwiZGVwZW5kZW5jaWVzXCIsXG4gICAgXCJkZWZpbml0aW9uc1wiLFxuXSk7XG5mdW5jdGlvbiBnZXRKc29uUG9pbnRlcihwYXJzZWRSZWYsIHsgYmFzZUlkLCBzY2hlbWEsIHJvb3QgfSkge1xuICAgIHZhciBfYTtcbiAgICBpZiAoKChfYSA9IHBhcnNlZFJlZi5mcmFnbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSAhPT0gXCIvXCIpXG4gICAgICAgIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFyc2VkUmVmLmZyYWdtZW50LnNsaWNlKDEpLnNwbGl0KFwiL1wiKSkge1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHBhcnRTY2hlbWEgPSBzY2hlbWFbKDAsIHV0aWxfMS51bmVzY2FwZUZyYWdtZW50KShwYXJ0KV07XG4gICAgICAgIGlmIChwYXJ0U2NoZW1hID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHNjaGVtYSA9IHBhcnRTY2hlbWE7XG4gICAgICAgIC8vIFRPRE8gUFJFVkVOVF9TQ09QRV9DSEFOR0UgY291bGQgYmUgZGVmaW5lZCBpbiBrZXl3b3JkIGRlZj9cbiAgICAgICAgY29uc3Qgc2NoSWQgPSB0eXBlb2Ygc2NoZW1hID09PSBcIm9iamVjdFwiICYmIHNjaGVtYVt0aGlzLm9wdHMuc2NoZW1hSWRdO1xuICAgICAgICBpZiAoIVBSRVZFTlRfU0NPUEVfQ0hBTkdFLmhhcyhwYXJ0KSAmJiBzY2hJZCkge1xuICAgICAgICAgICAgYmFzZUlkID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgc2NoSWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBlbnY7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgIT0gXCJib29sZWFuXCIgJiYgc2NoZW1hLiRyZWYgJiYgISgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaGVtYSwgdGhpcy5SVUxFUykpIHtcbiAgICAgICAgY29uc3QgJHJlZiA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCBiYXNlSWQsIHNjaGVtYS4kcmVmKTtcbiAgICAgICAgZW52ID0gcmVzb2x2ZVNjaGVtYS5jYWxsKHRoaXMsIHJvb3QsICRyZWYpO1xuICAgIH1cbiAgICAvLyBldmVuIHRob3VnaCByZXNvbHV0aW9uIGZhaWxlZCB3ZSBuZWVkIHRvIHJldHVybiBTY2hlbWFFbnYgdG8gdGhyb3cgZXhjZXB0aW9uXG4gICAgLy8gc28gdGhhdCBjb21waWxlQXN5bmMgbG9hZHMgbWlzc2luZyBzY2hlbWEuXG4gICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgIGVudiA9IGVudiB8fCBuZXcgU2NoZW1hRW52KHsgc2NoZW1hLCBzY2hlbWFJZCwgcm9vdCwgYmFzZUlkIH0pO1xuICAgIGlmIChlbnYuc2NoZW1hICE9PSBlbnYucm9vdC5zY2hlbWEpXG4gICAgICAgIHJldHVybiBlbnY7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzID0ge1xuICAgIC8vIHZhbGlkYXRpb24gZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgZGF0YTogbmV3IGNvZGVnZW5fMS5OYW1lKFwiZGF0YVwiKSxcbiAgICAvLyBhcmdzIHBhc3NlZCBmcm9tIHJlZmVyZW5jaW5nIHNjaGVtYVxuICAgIHZhbEN4dDogbmV3IGNvZGVnZW5fMS5OYW1lKFwidmFsQ3h0XCIpLFxuICAgIGluc3RhbmNlUGF0aDogbmV3IGNvZGVnZW5fMS5OYW1lKFwiaW5zdGFuY2VQYXRoXCIpLFxuICAgIHBhcmVudERhdGE6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInBhcmVudERhdGFcIiksXG4gICAgcGFyZW50RGF0YVByb3BlcnR5OiBuZXcgY29kZWdlbl8xLk5hbWUoXCJwYXJlbnREYXRhUHJvcGVydHlcIiksXG4gICAgcm9vdERhdGE6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInJvb3REYXRhXCIpLFxuICAgIGR5bmFtaWNBbmNob3JzOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJkeW5hbWljQW5jaG9yc1wiKSxcbiAgICAvLyBmdW5jdGlvbiBzY29wZWQgdmFyaWFibGVzXG4gICAgdkVycm9yczogbmV3IGNvZGVnZW5fMS5OYW1lKFwidkVycm9yc1wiKSxcbiAgICBlcnJvcnM6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImVycm9yc1wiKSxcbiAgICB0aGlzOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJ0aGlzXCIpLFxuICAgIC8vIFwiZ2xvYmFsc1wiXG4gICAgc2VsZjogbmV3IGNvZGVnZW5fMS5OYW1lKFwic2VsZlwiKSxcbiAgICBzY29wZTogbmV3IGNvZGVnZW5fMS5OYW1lKFwic2NvcGVcIiksXG4gICAgLy8gSlREIHNlcmlhbGl6ZS9wYXJzZSBuYW1lIGZvciBKU09OIHN0cmluZyBhbmQgcG9zaXRpb25cbiAgICBqc29uOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJqc29uXCIpLFxuICAgIGpzb25Qb3M6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImpzb25Qb3NcIiksXG4gICAganNvbkxlbjogbmV3IGNvZGVnZW5fMS5OYW1lKFwianNvbkxlblwiKSxcbiAgICBqc29uUGFydDogbmV3IGNvZGVnZW5fMS5OYW1lKFwianNvblBhcnRcIiksXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gbmFtZXM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYW1lcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlc29sdmVfMSA9IHJlcXVpcmUoXCIuL3Jlc29sdmVcIik7XG5jbGFzcyBNaXNzaW5nUmVmRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IocmVzb2x2ZXIsIGJhc2VJZCwgcmVmLCBtc2cpIHtcbiAgICAgICAgc3VwZXIobXNnIHx8IGBjYW4ndCByZXNvbHZlIHJlZmVyZW5jZSAke3JlZn0gZnJvbSBpZCAke2Jhc2VJZH1gKTtcbiAgICAgICAgdGhpcy5taXNzaW5nUmVmID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKShyZXNvbHZlciwgYmFzZUlkLCByZWYpO1xuICAgICAgICB0aGlzLm1pc3NpbmdTY2hlbWEgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKSgoMCwgcmVzb2x2ZV8xLmdldEZ1bGxQYXRoKShyZXNvbHZlciwgdGhpcy5taXNzaW5nUmVmKSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTWlzc2luZ1JlZkVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVmX2Vycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRTY2hlbWFSZWZzID0gZXhwb3J0cy5yZXNvbHZlVXJsID0gZXhwb3J0cy5ub3JtYWxpemVJZCA9IGV4cG9ydHMuX2dldEZ1bGxQYXRoID0gZXhwb3J0cy5nZXRGdWxsUGF0aCA9IGV4cG9ydHMuaW5saW5lUmVmID0gdm9pZCAwO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IGVxdWFsID0gcmVxdWlyZShcImZhc3QtZGVlcC1lcXVhbFwiKTtcbmNvbnN0IHRyYXZlcnNlID0gcmVxdWlyZShcImpzb24tc2NoZW1hLXRyYXZlcnNlXCIpO1xuLy8gVE9ETyByZWZhY3RvciB0byB1c2Uga2V5d29yZCBkZWZpbml0aW9uc1xuY29uc3QgU0lNUExFX0lOTElORUQgPSBuZXcgU2V0KFtcbiAgICBcInR5cGVcIixcbiAgICBcImZvcm1hdFwiLFxuICAgIFwicGF0dGVyblwiLFxuICAgIFwibWF4TGVuZ3RoXCIsXG4gICAgXCJtaW5MZW5ndGhcIixcbiAgICBcIm1heFByb3BlcnRpZXNcIixcbiAgICBcIm1pblByb3BlcnRpZXNcIixcbiAgICBcIm1heEl0ZW1zXCIsXG4gICAgXCJtaW5JdGVtc1wiLFxuICAgIFwibWF4aW11bVwiLFxuICAgIFwibWluaW11bVwiLFxuICAgIFwidW5pcXVlSXRlbXNcIixcbiAgICBcIm11bHRpcGxlT2ZcIixcbiAgICBcInJlcXVpcmVkXCIsXG4gICAgXCJlbnVtXCIsXG4gICAgXCJjb25zdFwiLFxuXSk7XG5mdW5jdGlvbiBpbmxpbmVSZWYoc2NoZW1hLCBsaW1pdCA9IHRydWUpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKGxpbWl0ID09PSB0cnVlKVxuICAgICAgICByZXR1cm4gIWhhc1JlZihzY2hlbWEpO1xuICAgIGlmICghbGltaXQpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gY291bnRLZXlzKHNjaGVtYSkgPD0gbGltaXQ7XG59XG5leHBvcnRzLmlubGluZVJlZiA9IGlubGluZVJlZjtcbmNvbnN0IFJFRl9LRVlXT1JEUyA9IG5ldyBTZXQoW1xuICAgIFwiJHJlZlwiLFxuICAgIFwiJHJlY3Vyc2l2ZVJlZlwiLFxuICAgIFwiJHJlY3Vyc2l2ZUFuY2hvclwiLFxuICAgIFwiJGR5bmFtaWNSZWZcIixcbiAgICBcIiRkeW5hbWljQW5jaG9yXCIsXG5dKTtcbmZ1bmN0aW9uIGhhc1JlZihzY2hlbWEpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKFJFRl9LRVlXT1JEUy5oYXMoa2V5KSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjb25zdCBzY2ggPSBzY2hlbWFba2V5XTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoKSAmJiBzY2guc29tZShoYXNSZWYpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoID09IFwib2JqZWN0XCIgJiYgaGFzUmVmKHNjaCkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gY291bnRLZXlzKHNjaGVtYSkge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiJHJlZlwiKVxuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICBpZiAoU0lNUExFX0lOTElORUQuaGFzKGtleSkpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWFba2V5XSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmVhY2hJdGVtKShzY2hlbWFba2V5XSwgKHNjaCkgPT4gKGNvdW50ICs9IGNvdW50S2V5cyhzY2gpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID09PSBJbmZpbml0eSlcbiAgICAgICAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuZnVuY3Rpb24gZ2V0RnVsbFBhdGgocmVzb2x2ZXIsIGlkID0gXCJcIiwgbm9ybWFsaXplKSB7XG4gICAgaWYgKG5vcm1hbGl6ZSAhPT0gZmFsc2UpXG4gICAgICAgIGlkID0gbm9ybWFsaXplSWQoaWQpO1xuICAgIGNvbnN0IHAgPSByZXNvbHZlci5wYXJzZShpZCk7XG4gICAgcmV0dXJuIF9nZXRGdWxsUGF0aChyZXNvbHZlciwgcCk7XG59XG5leHBvcnRzLmdldEZ1bGxQYXRoID0gZ2V0RnVsbFBhdGg7XG5mdW5jdGlvbiBfZ2V0RnVsbFBhdGgocmVzb2x2ZXIsIHApIHtcbiAgICBjb25zdCBzZXJpYWxpemVkID0gcmVzb2x2ZXIuc2VyaWFsaXplKHApO1xuICAgIHJldHVybiBzZXJpYWxpemVkLnNwbGl0KFwiI1wiKVswXSArIFwiI1wiO1xufVxuZXhwb3J0cy5fZ2V0RnVsbFBhdGggPSBfZ2V0RnVsbFBhdGg7XG5jb25zdCBUUkFJTElOR19TTEFTSF9IQVNIID0gLyNcXC8/JC87XG5mdW5jdGlvbiBub3JtYWxpemVJZChpZCkge1xuICAgIHJldHVybiBpZCA/IGlkLnJlcGxhY2UoVFJBSUxJTkdfU0xBU0hfSEFTSCwgXCJcIikgOiBcIlwiO1xufVxuZXhwb3J0cy5ub3JtYWxpemVJZCA9IG5vcm1hbGl6ZUlkO1xuZnVuY3Rpb24gcmVzb2x2ZVVybChyZXNvbHZlciwgYmFzZUlkLCBpZCkge1xuICAgIGlkID0gbm9ybWFsaXplSWQoaWQpO1xuICAgIHJldHVybiByZXNvbHZlci5yZXNvbHZlKGJhc2VJZCwgaWQpO1xufVxuZXhwb3J0cy5yZXNvbHZlVXJsID0gcmVzb2x2ZVVybDtcbmNvbnN0IEFOQ0hPUiA9IC9eW2Etel9dWy1hLXowLTkuX10qJC9pO1xuZnVuY3Rpb24gZ2V0U2NoZW1hUmVmcyhzY2hlbWEsIGJhc2VJZCkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4ge307XG4gICAgY29uc3QgeyBzY2hlbWFJZCwgdXJpUmVzb2x2ZXIgfSA9IHRoaXMub3B0cztcbiAgICBjb25zdCBzY2hJZCA9IG5vcm1hbGl6ZUlkKHNjaGVtYVtzY2hlbWFJZF0gfHwgYmFzZUlkKTtcbiAgICBjb25zdCBiYXNlSWRzID0geyBcIlwiOiBzY2hJZCB9O1xuICAgIGNvbnN0IHBhdGhQcmVmaXggPSBnZXRGdWxsUGF0aCh1cmlSZXNvbHZlciwgc2NoSWQsIGZhbHNlKTtcbiAgICBjb25zdCBsb2NhbFJlZnMgPSB7fTtcbiAgICBjb25zdCBzY2hlbWFSZWZzID0gbmV3IFNldCgpO1xuICAgIHRyYXZlcnNlKHNjaGVtYSwgeyBhbGxLZXlzOiB0cnVlIH0sIChzY2gsIGpzb25QdHIsIF8sIHBhcmVudEpzb25QdHIpID0+IHtcbiAgICAgICAgaWYgKHBhcmVudEpzb25QdHIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgZnVsbFBhdGggPSBwYXRoUHJlZml4ICsganNvblB0cjtcbiAgICAgICAgbGV0IGJhc2VJZCA9IGJhc2VJZHNbcGFyZW50SnNvblB0cl07XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoW3NjaGVtYUlkXSA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgYmFzZUlkID0gYWRkUmVmLmNhbGwodGhpcywgc2NoW3NjaGVtYUlkXSk7XG4gICAgICAgIGFkZEFuY2hvci5jYWxsKHRoaXMsIHNjaC4kYW5jaG9yKTtcbiAgICAgICAgYWRkQW5jaG9yLmNhbGwodGhpcywgc2NoLiRkeW5hbWljQW5jaG9yKTtcbiAgICAgICAgYmFzZUlkc1tqc29uUHRyXSA9IGJhc2VJZDtcbiAgICAgICAgZnVuY3Rpb24gYWRkUmVmKHJlZikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC91bmJvdW5kLW1ldGhvZFxuICAgICAgICAgICAgY29uc3QgX3Jlc29sdmUgPSB0aGlzLm9wdHMudXJpUmVzb2x2ZXIucmVzb2x2ZTtcbiAgICAgICAgICAgIHJlZiA9IG5vcm1hbGl6ZUlkKGJhc2VJZCA/IF9yZXNvbHZlKGJhc2VJZCwgcmVmKSA6IHJlZik7XG4gICAgICAgICAgICBpZiAoc2NoZW1hUmVmcy5oYXMocmVmKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBhbWJpZ3VvcyhyZWYpO1xuICAgICAgICAgICAgc2NoZW1hUmVmcy5hZGQocmVmKTtcbiAgICAgICAgICAgIGxldCBzY2hPclJlZiA9IHRoaXMucmVmc1tyZWZdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2hPclJlZiA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIHNjaE9yUmVmID0gdGhpcy5yZWZzW3NjaE9yUmVmXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoT3JSZWYgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIGNoZWNrQW1iaWd1b3NSZWYoc2NoLCBzY2hPclJlZi5zY2hlbWEsIHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZWYgIT09IG5vcm1hbGl6ZUlkKGZ1bGxQYXRoKSkge1xuICAgICAgICAgICAgICAgIGlmIChyZWZbMF0gPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQW1iaWd1b3NSZWYoc2NoLCBsb2NhbFJlZnNbcmVmXSwgcmVmKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxSZWZzW3JlZl0gPSBzY2g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNbcmVmXSA9IGZ1bGxQYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWY7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYWRkQW5jaG9yKGFuY2hvcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhbmNob3IgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmICghQU5DSE9SLnRlc3QoYW5jaG9yKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGFuY2hvciBcIiR7YW5jaG9yfVwiYCk7XG4gICAgICAgICAgICAgICAgYWRkUmVmLmNhbGwodGhpcywgYCMke2FuY2hvcn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBsb2NhbFJlZnM7XG4gICAgZnVuY3Rpb24gY2hlY2tBbWJpZ3Vvc1JlZihzY2gxLCBzY2gyLCByZWYpIHtcbiAgICAgICAgaWYgKHNjaDIgIT09IHVuZGVmaW5lZCAmJiAhZXF1YWwoc2NoMSwgc2NoMikpXG4gICAgICAgICAgICB0aHJvdyBhbWJpZ3VvcyhyZWYpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhbWJpZ3VvcyhyZWYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgcmVmZXJlbmNlIFwiJHtyZWZ9XCIgcmVzb2x2ZXMgdG8gbW9yZSB0aGFuIG9uZSBzY2hlbWFgKTtcbiAgICB9XG59XG5leHBvcnRzLmdldFNjaGVtYVJlZnMgPSBnZXRTY2hlbWFSZWZzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzb2x2ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0UnVsZXMgPSBleHBvcnRzLmlzSlNPTlR5cGUgPSB2b2lkIDA7XG5jb25zdCBfanNvblR5cGVzID0gW1wic3RyaW5nXCIsIFwibnVtYmVyXCIsIFwiaW50ZWdlclwiLCBcImJvb2xlYW5cIiwgXCJudWxsXCIsIFwib2JqZWN0XCIsIFwiYXJyYXlcIl07XG5jb25zdCBqc29uVHlwZXMgPSBuZXcgU2V0KF9qc29uVHlwZXMpO1xuZnVuY3Rpb24gaXNKU09OVHlwZSh4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09IFwic3RyaW5nXCIgJiYganNvblR5cGVzLmhhcyh4KTtcbn1cbmV4cG9ydHMuaXNKU09OVHlwZSA9IGlzSlNPTlR5cGU7XG5mdW5jdGlvbiBnZXRSdWxlcygpIHtcbiAgICBjb25zdCBncm91cHMgPSB7XG4gICAgICAgIG51bWJlcjogeyB0eXBlOiBcIm51bWJlclwiLCBydWxlczogW10gfSxcbiAgICAgICAgc3RyaW5nOiB7IHR5cGU6IFwic3RyaW5nXCIsIHJ1bGVzOiBbXSB9LFxuICAgICAgICBhcnJheTogeyB0eXBlOiBcImFycmF5XCIsIHJ1bGVzOiBbXSB9LFxuICAgICAgICBvYmplY3Q6IHsgdHlwZTogXCJvYmplY3RcIiwgcnVsZXM6IFtdIH0sXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlczogeyAuLi5ncm91cHMsIGludGVnZXI6IHRydWUsIGJvb2xlYW46IHRydWUsIG51bGw6IHRydWUgfSxcbiAgICAgICAgcnVsZXM6IFt7IHJ1bGVzOiBbXSB9LCBncm91cHMubnVtYmVyLCBncm91cHMuc3RyaW5nLCBncm91cHMuYXJyYXksIGdyb3Vwcy5vYmplY3RdLFxuICAgICAgICBwb3N0OiB7IHJ1bGVzOiBbXSB9LFxuICAgICAgICBhbGw6IHt9LFxuICAgICAgICBrZXl3b3Jkczoge30sXG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0UnVsZXMgPSBnZXRSdWxlcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ1bGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jaGVja1N0cmljdE1vZGUgPSBleHBvcnRzLmdldEVycm9yUGF0aCA9IGV4cG9ydHMuVHlwZSA9IGV4cG9ydHMudXNlRnVuYyA9IGV4cG9ydHMuc2V0RXZhbHVhdGVkID0gZXhwb3J0cy5ldmFsdWF0ZWRQcm9wc1RvTmFtZSA9IGV4cG9ydHMubWVyZ2VFdmFsdWF0ZWQgPSBleHBvcnRzLmVhY2hJdGVtID0gZXhwb3J0cy51bmVzY2FwZUpzb25Qb2ludGVyID0gZXhwb3J0cy5lc2NhcGVKc29uUG9pbnRlciA9IGV4cG9ydHMuZXNjYXBlRnJhZ21lbnQgPSBleHBvcnRzLnVuZXNjYXBlRnJhZ21lbnQgPSBleHBvcnRzLnNjaGVtYVJlZk9yVmFsID0gZXhwb3J0cy5zY2hlbWFIYXNSdWxlc0J1dFJlZiA9IGV4cG9ydHMuc2NoZW1hSGFzUnVsZXMgPSBleHBvcnRzLmNoZWNrVW5rbm93blJ1bGVzID0gZXhwb3J0cy5hbHdheXNWYWxpZFNjaGVtYSA9IGV4cG9ydHMudG9IYXNoID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29kZWdlblwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW4vY29kZVwiKTtcbi8vIFRPRE8gcmVmYWN0b3IgdG8gdXNlIFNldFxuZnVuY3Rpb24gdG9IYXNoKGFycikge1xuICAgIGNvbnN0IGhhc2ggPSB7fTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYXJyKVxuICAgICAgICBoYXNoW2l0ZW1dID0gdHJ1ZTtcbiAgICByZXR1cm4gaGFzaDtcbn1cbmV4cG9ydHMudG9IYXNoID0gdG9IYXNoO1xuZnVuY3Rpb24gYWx3YXlzVmFsaWRTY2hlbWEoaXQsIHNjaGVtYSkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgIGlmIChPYmplY3Qua2V5cyhzY2hlbWEpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2hlY2tVbmtub3duUnVsZXMoaXQsIHNjaGVtYSk7XG4gICAgcmV0dXJuICFzY2hlbWFIYXNSdWxlcyhzY2hlbWEsIGl0LnNlbGYuUlVMRVMuYWxsKTtcbn1cbmV4cG9ydHMuYWx3YXlzVmFsaWRTY2hlbWEgPSBhbHdheXNWYWxpZFNjaGVtYTtcbmZ1bmN0aW9uIGNoZWNrVW5rbm93blJ1bGVzKGl0LCBzY2hlbWEgPSBpdC5zY2hlbWEpIHtcbiAgICBjb25zdCB7IG9wdHMsIHNlbGYgfSA9IGl0O1xuICAgIGlmICghb3B0cy5zdHJpY3RTY2hlbWEpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBydWxlcyA9IHNlbGYuUlVMRVMua2V5d29yZHM7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmICghcnVsZXNba2V5XSlcbiAgICAgICAgICAgIGNoZWNrU3RyaWN0TW9kZShpdCwgYHVua25vd24ga2V5d29yZDogXCIke2tleX1cImApO1xuICAgIH1cbn1cbmV4cG9ydHMuY2hlY2tVbmtub3duUnVsZXMgPSBjaGVja1Vua25vd25SdWxlcztcbmZ1bmN0aW9uIHNjaGVtYUhhc1J1bGVzKHNjaGVtYSwgcnVsZXMpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuICFzY2hlbWE7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKVxuICAgICAgICBpZiAocnVsZXNba2V5XSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuc2NoZW1hSGFzUnVsZXMgPSBzY2hlbWFIYXNSdWxlcztcbmZ1bmN0aW9uIHNjaGVtYUhhc1J1bGVzQnV0UmVmKHNjaGVtYSwgUlVMRVMpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuICFzY2hlbWE7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKVxuICAgICAgICBpZiAoa2V5ICE9PSBcIiRyZWZcIiAmJiBSVUxFUy5hbGxba2V5XSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuc2NoZW1hSGFzUnVsZXNCdXRSZWYgPSBzY2hlbWFIYXNSdWxlc0J1dFJlZjtcbmZ1bmN0aW9uIHNjaGVtYVJlZk9yVmFsKHsgdG9wU2NoZW1hUmVmLCBzY2hlbWFQYXRoIH0sIHNjaGVtYSwga2V5d29yZCwgJGRhdGEpIHtcbiAgICBpZiAoISRkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWF9YDtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7dG9wU2NoZW1hUmVmfSR7c2NoZW1hUGF0aH0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKGtleXdvcmQpfWA7XG59XG5leHBvcnRzLnNjaGVtYVJlZk9yVmFsID0gc2NoZW1hUmVmT3JWYWw7XG5mdW5jdGlvbiB1bmVzY2FwZUZyYWdtZW50KHN0cikge1xuICAgIHJldHVybiB1bmVzY2FwZUpzb25Qb2ludGVyKGRlY29kZVVSSUNvbXBvbmVudChzdHIpKTtcbn1cbmV4cG9ydHMudW5lc2NhcGVGcmFnbWVudCA9IHVuZXNjYXBlRnJhZ21lbnQ7XG5mdW5jdGlvbiBlc2NhcGVGcmFnbWVudChzdHIpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGVzY2FwZUpzb25Qb2ludGVyKHN0cikpO1xufVxuZXhwb3J0cy5lc2NhcGVGcmFnbWVudCA9IGVzY2FwZUZyYWdtZW50O1xuZnVuY3Rpb24gZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT0gXCJudW1iZXJcIilcbiAgICAgICAgcmV0dXJuIGAke3N0cn1gO1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvfi9nLCBcIn4wXCIpLnJlcGxhY2UoL1xcLy9nLCBcIn4xXCIpO1xufVxuZXhwb3J0cy5lc2NhcGVKc29uUG9pbnRlciA9IGVzY2FwZUpzb25Qb2ludGVyO1xuZnVuY3Rpb24gdW5lc2NhcGVKc29uUG9pbnRlcihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL34xL2csIFwiL1wiKS5yZXBsYWNlKC9+MC9nLCBcIn5cIik7XG59XG5leHBvcnRzLnVuZXNjYXBlSnNvblBvaW50ZXIgPSB1bmVzY2FwZUpzb25Qb2ludGVyO1xuZnVuY3Rpb24gZWFjaEl0ZW0oeHMsIGYpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh4cykpIHtcbiAgICAgICAgZm9yIChjb25zdCB4IG9mIHhzKVxuICAgICAgICAgICAgZih4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGYoeHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuZWFjaEl0ZW0gPSBlYWNoSXRlbTtcbmZ1bmN0aW9uIG1ha2VNZXJnZUV2YWx1YXRlZCh7IG1lcmdlTmFtZXMsIG1lcmdlVG9OYW1lLCBtZXJnZVZhbHVlcywgcmVzdWx0VG9OYW1lLCB9KSB7XG4gICAgcmV0dXJuIChnZW4sIGZyb20sIHRvLCB0b05hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gdG8gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBmcm9tXG4gICAgICAgICAgICA6IHRvIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWVcbiAgICAgICAgICAgICAgICA/IChmcm9tIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUgPyBtZXJnZU5hbWVzKGdlbiwgZnJvbSwgdG8pIDogbWVyZ2VUb05hbWUoZ2VuLCBmcm9tLCB0byksIHRvKVxuICAgICAgICAgICAgICAgIDogZnJvbSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lXG4gICAgICAgICAgICAgICAgICAgID8gKG1lcmdlVG9OYW1lKGdlbiwgdG8sIGZyb20pLCBmcm9tKVxuICAgICAgICAgICAgICAgICAgICA6IG1lcmdlVmFsdWVzKGZyb20sIHRvKTtcbiAgICAgICAgcmV0dXJuIHRvTmFtZSA9PT0gY29kZWdlbl8xLk5hbWUgJiYgIShyZXMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkgPyByZXN1bHRUb05hbWUoZ2VuLCByZXMpIDogcmVzO1xuICAgIH07XG59XG5leHBvcnRzLm1lcmdlRXZhbHVhdGVkID0ge1xuICAgIHByb3BzOiBtYWtlTWVyZ2VFdmFsdWF0ZWQoe1xuICAgICAgICBtZXJnZU5hbWVzOiAoZ2VuLCBmcm9tLCB0bykgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ICE9PSB0cnVlICYmICR7ZnJvbX0gIT09IHVuZGVmaW5lZGAsICgpID0+IHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2Zyb219ID09PSB0cnVlYCwgKCkgPT4gZ2VuLmFzc2lnbih0bywgdHJ1ZSksICgpID0+IGdlbi5hc3NpZ24odG8sICgwLCBjb2RlZ2VuXzEuXykgYCR7dG99IHx8IHt9YCkuY29kZSgoMCwgY29kZWdlbl8xLl8pIGBPYmplY3QuYXNzaWduKCR7dG99LCAke2Zyb219KWApKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1lcmdlVG9OYW1lOiAoZ2VuLCBmcm9tLCB0bykgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ICE9PSB0cnVlYCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZyb20gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHRvLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odG8sICgwLCBjb2RlZ2VuXzEuXykgYCR7dG99IHx8IHt9YCk7XG4gICAgICAgICAgICAgICAgc2V0RXZhbHVhdGVkKGdlbiwgdG8sIGZyb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgbWVyZ2VWYWx1ZXM6IChmcm9tLCB0bykgPT4gKGZyb20gPT09IHRydWUgPyB0cnVlIDogeyAuLi5mcm9tLCAuLi50byB9KSxcbiAgICAgICAgcmVzdWx0VG9OYW1lOiBldmFsdWF0ZWRQcm9wc1RvTmFtZSxcbiAgICB9KSxcbiAgICBpdGVtczogbWFrZU1lcmdlRXZhbHVhdGVkKHtcbiAgICAgICAgbWVyZ2VOYW1lczogKGdlbiwgZnJvbSwgdG8pID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3RvfSAhPT0gdHJ1ZSAmJiAke2Zyb219ICE9PSB1bmRlZmluZWRgLCAoKSA9PiBnZW4uYXNzaWduKHRvLCAoMCwgY29kZWdlbl8xLl8pIGAke2Zyb219ID09PSB0cnVlID8gdHJ1ZSA6ICR7dG99ID4gJHtmcm9tfSA/ICR7dG99IDogJHtmcm9tfWApKSxcbiAgICAgICAgbWVyZ2VUb05hbWU6IChnZW4sIGZyb20sIHRvKSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gIT09IHRydWVgLCAoKSA9PiBnZW4uYXNzaWduKHRvLCBmcm9tID09PSB0cnVlID8gdHJ1ZSA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ID4gJHtmcm9tfSA/ICR7dG99IDogJHtmcm9tfWApKSxcbiAgICAgICAgbWVyZ2VWYWx1ZXM6IChmcm9tLCB0bykgPT4gKGZyb20gPT09IHRydWUgPyB0cnVlIDogTWF0aC5tYXgoZnJvbSwgdG8pKSxcbiAgICAgICAgcmVzdWx0VG9OYW1lOiAoZ2VuLCBpdGVtcykgPT4gZ2VuLnZhcihcIml0ZW1zXCIsIGl0ZW1zKSxcbiAgICB9KSxcbn07XG5mdW5jdGlvbiBldmFsdWF0ZWRQcm9wc1RvTmFtZShnZW4sIHBzKSB7XG4gICAgaWYgKHBzID09PSB0cnVlKVxuICAgICAgICByZXR1cm4gZ2VuLnZhcihcInByb3BzXCIsIHRydWUpO1xuICAgIGNvbnN0IHByb3BzID0gZ2VuLnZhcihcInByb3BzXCIsICgwLCBjb2RlZ2VuXzEuXykgYHt9YCk7XG4gICAgaWYgKHBzICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHNldEV2YWx1YXRlZChnZW4sIHByb3BzLCBwcyk7XG4gICAgcmV0dXJuIHByb3BzO1xufVxuZXhwb3J0cy5ldmFsdWF0ZWRQcm9wc1RvTmFtZSA9IGV2YWx1YXRlZFByb3BzVG9OYW1lO1xuZnVuY3Rpb24gc2V0RXZhbHVhdGVkKGdlbiwgcHJvcHMsIHBzKSB7XG4gICAgT2JqZWN0LmtleXMocHMpLmZvckVhY2goKHApID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtwcm9wc30keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHApfWAsIHRydWUpKTtcbn1cbmV4cG9ydHMuc2V0RXZhbHVhdGVkID0gc2V0RXZhbHVhdGVkO1xuY29uc3Qgc25pcHBldHMgPSB7fTtcbmZ1bmN0aW9uIHVzZUZ1bmMoZ2VuLCBmKSB7XG4gICAgcmV0dXJuIGdlbi5zY29wZVZhbHVlKFwiZnVuY1wiLCB7XG4gICAgICAgIHJlZjogZixcbiAgICAgICAgY29kZTogc25pcHBldHNbZi5jb2RlXSB8fCAoc25pcHBldHNbZi5jb2RlXSA9IG5ldyBjb2RlXzEuX0NvZGUoZi5jb2RlKSksXG4gICAgfSk7XG59XG5leHBvcnRzLnVzZUZ1bmMgPSB1c2VGdW5jO1xudmFyIFR5cGU7XG4oZnVuY3Rpb24gKFR5cGUpIHtcbiAgICBUeXBlW1R5cGVbXCJOdW1cIl0gPSAwXSA9IFwiTnVtXCI7XG4gICAgVHlwZVtUeXBlW1wiU3RyXCJdID0gMV0gPSBcIlN0clwiO1xufSkoVHlwZSA9IGV4cG9ydHMuVHlwZSB8fCAoZXhwb3J0cy5UeXBlID0ge30pKTtcbmZ1bmN0aW9uIGdldEVycm9yUGF0aChkYXRhUHJvcCwgZGF0YVByb3BUeXBlLCBqc1Byb3BlcnR5U3ludGF4KSB7XG4gICAgLy8gbGV0IHBhdGhcbiAgICBpZiAoZGF0YVByb3AgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkge1xuICAgICAgICBjb25zdCBpc051bWJlciA9IGRhdGFQcm9wVHlwZSA9PT0gVHlwZS5OdW07XG4gICAgICAgIHJldHVybiBqc1Byb3BlcnR5U3ludGF4XG4gICAgICAgICAgICA/IGlzTnVtYmVyXG4gICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGBcIltcIiArICR7ZGF0YVByb3B9ICsgXCJdXCJgXG4gICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGBcIlsnXCIgKyAke2RhdGFQcm9wfSArIFwiJ11cImBcbiAgICAgICAgICAgIDogaXNOdW1iZXJcbiAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYFwiL1wiICsgJHtkYXRhUHJvcH1gXG4gICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGBcIi9cIiArICR7ZGF0YVByb3B9LnJlcGxhY2UoL34vZywgXCJ+MFwiKS5yZXBsYWNlKC9cXFxcLy9nLCBcIn4xXCIpYDsgLy8gVE9ETyBtYXliZSB1c2UgZ2xvYmFsIGVzY2FwZVBvaW50ZXJcbiAgICB9XG4gICAgcmV0dXJuIGpzUHJvcGVydHlTeW50YXggPyAoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShkYXRhUHJvcCkudG9TdHJpbmcoKSA6IFwiL1wiICsgZXNjYXBlSnNvblBvaW50ZXIoZGF0YVByb3ApO1xufVxuZXhwb3J0cy5nZXRFcnJvclBhdGggPSBnZXRFcnJvclBhdGg7XG5mdW5jdGlvbiBjaGVja1N0cmljdE1vZGUoaXQsIG1zZywgbW9kZSA9IGl0Lm9wdHMuc3RyaWN0U2NoZW1hKSB7XG4gICAgaWYgKCFtb2RlKVxuICAgICAgICByZXR1cm47XG4gICAgbXNnID0gYHN0cmljdCBtb2RlOiAke21zZ31gO1xuICAgIGlmIChtb2RlID09PSB0cnVlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICBpdC5zZWxmLmxvZ2dlci53YXJuKG1zZyk7XG59XG5leHBvcnRzLmNoZWNrU3RyaWN0TW9kZSA9IGNoZWNrU3RyaWN0TW9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNob3VsZFVzZVJ1bGUgPSBleHBvcnRzLnNob3VsZFVzZUdyb3VwID0gZXhwb3J0cy5zY2hlbWFIYXNSdWxlc0ZvclR5cGUgPSB2b2lkIDA7XG5mdW5jdGlvbiBzY2hlbWFIYXNSdWxlc0ZvclR5cGUoeyBzY2hlbWEsIHNlbGYgfSwgdHlwZSkge1xuICAgIGNvbnN0IGdyb3VwID0gc2VsZi5SVUxFUy50eXBlc1t0eXBlXTtcbiAgICByZXR1cm4gZ3JvdXAgJiYgZ3JvdXAgIT09IHRydWUgJiYgc2hvdWxkVXNlR3JvdXAoc2NoZW1hLCBncm91cCk7XG59XG5leHBvcnRzLnNjaGVtYUhhc1J1bGVzRm9yVHlwZSA9IHNjaGVtYUhhc1J1bGVzRm9yVHlwZTtcbmZ1bmN0aW9uIHNob3VsZFVzZUdyb3VwKHNjaGVtYSwgZ3JvdXApIHtcbiAgICByZXR1cm4gZ3JvdXAucnVsZXMuc29tZSgocnVsZSkgPT4gc2hvdWxkVXNlUnVsZShzY2hlbWEsIHJ1bGUpKTtcbn1cbmV4cG9ydHMuc2hvdWxkVXNlR3JvdXAgPSBzaG91bGRVc2VHcm91cDtcbmZ1bmN0aW9uIHNob3VsZFVzZVJ1bGUoc2NoZW1hLCBydWxlKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoc2NoZW1hW3J1bGUua2V5d29yZF0gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAoKF9hID0gcnVsZS5kZWZpbml0aW9uLmltcGxlbWVudHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zb21lKChrd2QpID0+IHNjaGVtYVtrd2RdICE9PSB1bmRlZmluZWQpKSk7XG59XG5leHBvcnRzLnNob3VsZFVzZVJ1bGUgPSBzaG91bGRVc2VSdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwbGljYWJpbGl0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYm9vbE9yRW1wdHlTY2hlbWEgPSBleHBvcnRzLnRvcEJvb2xPckVtcHR5U2NoZW1hID0gdm9pZCAwO1xuY29uc3QgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL25hbWVzXCIpO1xuY29uc3QgYm9vbEVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwiYm9vbGVhbiBzY2hlbWEgaXMgZmFsc2VcIixcbn07XG5mdW5jdGlvbiB0b3BCb29sT3JFbXB0eVNjaGVtYShpdCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHZhbGlkYXRlTmFtZSB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmFsc2VTY2hlbWFFcnJvcihpdCwgZmFsc2UpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgc2NoZW1hLiRhc3luYyA9PT0gdHJ1ZSkge1xuICAgICAgICBnZW4ucmV0dXJuKG5hbWVzXzEuZGVmYXVsdC5kYXRhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHt2YWxpZGF0ZU5hbWV9LmVycm9yc2AsIG51bGwpO1xuICAgICAgICBnZW4ucmV0dXJuKHRydWUpO1xuICAgIH1cbn1cbmV4cG9ydHMudG9wQm9vbE9yRW1wdHlTY2hlbWEgPSB0b3BCb29sT3JFbXB0eVNjaGVtYTtcbmZ1bmN0aW9uIGJvb2xPckVtcHR5U2NoZW1hKGl0LCB2YWxpZCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEgfSA9IGl0O1xuICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgIGdlbi52YXIodmFsaWQsIGZhbHNlKTsgLy8gVE9ETyB2YXJcbiAgICAgICAgZmFsc2VTY2hlbWFFcnJvcihpdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4udmFyKHZhbGlkLCB0cnVlKTsgLy8gVE9ETyB2YXJcbiAgICB9XG59XG5leHBvcnRzLmJvb2xPckVtcHR5U2NoZW1hID0gYm9vbE9yRW1wdHlTY2hlbWE7XG5mdW5jdGlvbiBmYWxzZVNjaGVtYUVycm9yKGl0LCBvdmVycmlkZUFsbEVycm9ycykge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhIH0gPSBpdDtcbiAgICAvLyBUT0RPIG1heWJlIHNvbWUgb3RoZXIgaW50ZXJmYWNlIHNob3VsZCBiZSB1c2VkIGZvciBub24ta2V5d29yZCB2YWxpZGF0aW9uIGVycm9ycy4uLlxuICAgIGNvbnN0IGN4dCA9IHtcbiAgICAgICAgZ2VuLFxuICAgICAgICBrZXl3b3JkOiBcImZhbHNlIHNjaGVtYVwiLFxuICAgICAgICBkYXRhLFxuICAgICAgICBzY2hlbWE6IGZhbHNlLFxuICAgICAgICBzY2hlbWFDb2RlOiBmYWxzZSxcbiAgICAgICAgc2NoZW1hVmFsdWU6IGZhbHNlLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBpdCxcbiAgICB9O1xuICAgICgwLCBlcnJvcnNfMS5yZXBvcnRFcnJvcikoY3h0LCBib29sRXJyb3IsIHVuZGVmaW5lZCwgb3ZlcnJpZGVBbGxFcnJvcnMpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vbFNjaGVtYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVwb3J0VHlwZUVycm9yID0gZXhwb3J0cy5jaGVja0RhdGFUeXBlcyA9IGV4cG9ydHMuY2hlY2tEYXRhVHlwZSA9IGV4cG9ydHMuY29lcmNlQW5kQ2hlY2tEYXRhVHlwZSA9IGV4cG9ydHMuZ2V0SlNPTlR5cGVzID0gZXhwb3J0cy5nZXRTY2hlbWFUeXBlcyA9IGV4cG9ydHMuRGF0YVR5cGUgPSB2b2lkIDA7XG5jb25zdCBydWxlc18xID0gcmVxdWlyZShcIi4uL3J1bGVzXCIpO1xuY29uc3QgYXBwbGljYWJpbGl0eV8xID0gcmVxdWlyZShcIi4vYXBwbGljYWJpbGl0eVwiKTtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgRGF0YVR5cGU7XG4oZnVuY3Rpb24gKERhdGFUeXBlKSB7XG4gICAgRGF0YVR5cGVbRGF0YVR5cGVbXCJDb3JyZWN0XCJdID0gMF0gPSBcIkNvcnJlY3RcIjtcbiAgICBEYXRhVHlwZVtEYXRhVHlwZVtcIldyb25nXCJdID0gMV0gPSBcIldyb25nXCI7XG59KShEYXRhVHlwZSA9IGV4cG9ydHMuRGF0YVR5cGUgfHwgKGV4cG9ydHMuRGF0YVR5cGUgPSB7fSkpO1xuZnVuY3Rpb24gZ2V0U2NoZW1hVHlwZXMoc2NoZW1hKSB7XG4gICAgY29uc3QgdHlwZXMgPSBnZXRKU09OVHlwZXMoc2NoZW1hLnR5cGUpO1xuICAgIGNvbnN0IGhhc051bGwgPSB0eXBlcy5pbmNsdWRlcyhcIm51bGxcIik7XG4gICAgaWYgKGhhc051bGwpIHtcbiAgICAgICAgaWYgKHNjaGVtYS5udWxsYWJsZSA9PT0gZmFsc2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlOiBudWxsIGNvbnRyYWRpY3RzIG51bGxhYmxlOiBmYWxzZVwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghdHlwZXMubGVuZ3RoICYmIHNjaGVtYS5udWxsYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wibnVsbGFibGVcIiBjYW5ub3QgYmUgdXNlZCB3aXRob3V0IFwidHlwZVwiJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5udWxsYWJsZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHR5cGVzLnB1c2goXCJudWxsXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZXM7XG59XG5leHBvcnRzLmdldFNjaGVtYVR5cGVzID0gZ2V0U2NoZW1hVHlwZXM7XG5mdW5jdGlvbiBnZXRKU09OVHlwZXModHMpIHtcbiAgICBjb25zdCB0eXBlcyA9IEFycmF5LmlzQXJyYXkodHMpID8gdHMgOiB0cyA/IFt0c10gOiBbXTtcbiAgICBpZiAodHlwZXMuZXZlcnkocnVsZXNfMS5pc0pTT05UeXBlKSlcbiAgICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIHRocm93IG5ldyBFcnJvcihcInR5cGUgbXVzdCBiZSBKU09OVHlwZSBvciBKU09OVHlwZVtdOiBcIiArIHR5cGVzLmpvaW4oXCIsXCIpKTtcbn1cbmV4cG9ydHMuZ2V0SlNPTlR5cGVzID0gZ2V0SlNPTlR5cGVzO1xuZnVuY3Rpb24gY29lcmNlQW5kQ2hlY2tEYXRhVHlwZShpdCwgdHlwZXMpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgb3B0cyB9ID0gaXQ7XG4gICAgY29uc3QgY29lcmNlVG8gPSBjb2VyY2VUb1R5cGVzKHR5cGVzLCBvcHRzLmNvZXJjZVR5cGVzKTtcbiAgICBjb25zdCBjaGVja1R5cGVzID0gdHlwZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAhKGNvZXJjZVRvLmxlbmd0aCA9PT0gMCAmJiB0eXBlcy5sZW5ndGggPT09IDEgJiYgKDAsIGFwcGxpY2FiaWxpdHlfMS5zY2hlbWFIYXNSdWxlc0ZvclR5cGUpKGl0LCB0eXBlc1swXSkpO1xuICAgIGlmIChjaGVja1R5cGVzKSB7XG4gICAgICAgIGNvbnN0IHdyb25nVHlwZSA9IGNoZWNrRGF0YVR5cGVzKHR5cGVzLCBkYXRhLCBvcHRzLnN0cmljdE51bWJlcnMsIERhdGFUeXBlLldyb25nKTtcbiAgICAgICAgZ2VuLmlmKHdyb25nVHlwZSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvZXJjZVRvLmxlbmd0aClcbiAgICAgICAgICAgICAgICBjb2VyY2VEYXRhKGl0LCB0eXBlcywgY29lcmNlVG8pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcG9ydFR5cGVFcnJvcihpdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY2hlY2tUeXBlcztcbn1cbmV4cG9ydHMuY29lcmNlQW5kQ2hlY2tEYXRhVHlwZSA9IGNvZXJjZUFuZENoZWNrRGF0YVR5cGU7XG5jb25zdCBDT0VSQ0lCTEUgPSBuZXcgU2V0KFtcInN0cmluZ1wiLCBcIm51bWJlclwiLCBcImludGVnZXJcIiwgXCJib29sZWFuXCIsIFwibnVsbFwiXSk7XG5mdW5jdGlvbiBjb2VyY2VUb1R5cGVzKHR5cGVzLCBjb2VyY2VUeXBlcykge1xuICAgIHJldHVybiBjb2VyY2VUeXBlc1xuICAgICAgICA/IHR5cGVzLmZpbHRlcigodCkgPT4gQ09FUkNJQkxFLmhhcyh0KSB8fCAoY29lcmNlVHlwZXMgPT09IFwiYXJyYXlcIiAmJiB0ID09PSBcImFycmF5XCIpKVxuICAgICAgICA6IFtdO1xufVxuZnVuY3Rpb24gY29lcmNlRGF0YShpdCwgdHlwZXMsIGNvZXJjZVRvKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIG9wdHMgfSA9IGl0O1xuICAgIGNvbnN0IGRhdGFUeXBlID0gZ2VuLmxldChcImRhdGFUeXBlXCIsICgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9YCk7XG4gICAgY29uc3QgY29lcmNlZCA9IGdlbi5sZXQoXCJjb2VyY2VkXCIsICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApO1xuICAgIGlmIChvcHRzLmNvZXJjZVR5cGVzID09PSBcImFycmF5XCIpIHtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YVR5cGV9ID09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkoJHtkYXRhfSkgJiYgJHtkYXRhfS5sZW5ndGggPT0gMWAsICgpID0+IGdlblxuICAgICAgICAgICAgLmFzc2lnbihkYXRhLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9WzBdYClcbiAgICAgICAgICAgIC5hc3NpZ24oZGF0YVR5cGUsICgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9YClcbiAgICAgICAgICAgIC5pZihjaGVja0RhdGFUeXBlcyh0eXBlcywgZGF0YSwgb3B0cy5zdHJpY3ROdW1iZXJzKSwgKCkgPT4gZ2VuLmFzc2lnbihjb2VyY2VkLCBkYXRhKSkpO1xuICAgIH1cbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb2VyY2VkfSAhPT0gdW5kZWZpbmVkYCk7XG4gICAgZm9yIChjb25zdCB0IG9mIGNvZXJjZVRvKSB7XG4gICAgICAgIGlmIChDT0VSQ0lCTEUuaGFzKHQpIHx8ICh0ID09PSBcImFycmF5XCIgJiYgb3B0cy5jb2VyY2VUeXBlcyA9PT0gXCJhcnJheVwiKSkge1xuICAgICAgICAgICAgY29lcmNlU3BlY2lmaWNUeXBlKHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdlbi5lbHNlKCk7XG4gICAgcmVwb3J0VHlwZUVycm9yKGl0KTtcbiAgICBnZW4uZW5kSWYoKTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb2VyY2VkfSAhPT0gdW5kZWZpbmVkYCwgKCkgPT4ge1xuICAgICAgICBnZW4uYXNzaWduKGRhdGEsIGNvZXJjZWQpO1xuICAgICAgICBhc3NpZ25QYXJlbnREYXRhKGl0LCBjb2VyY2VkKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjb2VyY2VTcGVjaWZpY1R5cGUodCkge1xuICAgICAgICBzd2l0Y2ggKHQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PSBcIm51bWJlclwiIHx8ICR7ZGF0YVR5cGV9ID09IFwiYm9vbGVhblwiYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCAoMCwgY29kZWdlbl8xLl8pIGBcIlwiICsgJHtkYXRhfWApXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSA9PT0gbnVsbGApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgXCJcImApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PSBcImJvb2xlYW5cIiB8fCAke2RhdGF9ID09PSBudWxsXG4gICAgICAgICAgICAgIHx8ICgke2RhdGFUeXBlfSA9PSBcInN0cmluZ1wiICYmICR7ZGF0YX0gJiYgJHtkYXRhfSA9PSArJHtkYXRhfSlgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsICgwLCBjb2RlZ2VuXzEuXykgYCske2RhdGF9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcImludGVnZXJcIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PT0gXCJib29sZWFuXCIgfHwgJHtkYXRhfSA9PT0gbnVsbFxuICAgICAgICAgICAgICB8fCAoJHtkYXRhVHlwZX0gPT09IFwic3RyaW5nXCIgJiYgJHtkYXRhfSAmJiAke2RhdGF9ID09ICske2RhdGF9ICYmICEoJHtkYXRhfSAlIDEpKWApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgKyR7ZGF0YX1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09IFwiZmFsc2VcIiB8fCAke2RhdGF9ID09PSAwIHx8ICR7ZGF0YX0gPT09IG51bGxgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09IFwidHJ1ZVwiIHx8ICR7ZGF0YX0gPT09IDFgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJudWxsXCI6XG4gICAgICAgICAgICAgICAgZ2VuLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSBcIlwiIHx8ICR7ZGF0YX0gPT09IDAgfHwgJHtkYXRhfSA9PT0gZmFsc2VgKTtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKGNvZXJjZWQsIG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJhcnJheVwiOlxuICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YVR5cGV9ID09PSBcInN0cmluZ1wiIHx8ICR7ZGF0YVR5cGV9ID09PSBcIm51bWJlclwiXG4gICAgICAgICAgICAgIHx8ICR7ZGF0YVR5cGV9ID09PSBcImJvb2xlYW5cIiB8fCAke2RhdGF9ID09PSBudWxsYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCAoMCwgY29kZWdlbl8xLl8pIGBbJHtkYXRhfV1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2lnblBhcmVudERhdGEoeyBnZW4sIHBhcmVudERhdGEsIHBhcmVudERhdGFQcm9wZXJ0eSB9LCBleHByKSB7XG4gICAgLy8gVE9ETyB1c2UgZ2VuLnByb3BlcnR5XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7cGFyZW50RGF0YX0gIT09IHVuZGVmaW5lZGAsICgpID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtwYXJlbnREYXRhfVske3BhcmVudERhdGFQcm9wZXJ0eX1dYCwgZXhwcikpO1xufVxuZnVuY3Rpb24gY2hlY2tEYXRhVHlwZShkYXRhVHlwZSwgZGF0YSwgc3RyaWN0TnVtcywgY29ycmVjdCA9IERhdGFUeXBlLkNvcnJlY3QpIHtcbiAgICBjb25zdCBFUSA9IGNvcnJlY3QgPT09IERhdGFUeXBlLkNvcnJlY3QgPyBjb2RlZ2VuXzEub3BlcmF0b3JzLkVRIDogY29kZWdlbl8xLm9wZXJhdG9ycy5ORVE7XG4gICAgbGV0IGNvbmQ7XG4gICAgc3dpdGNoIChkYXRhVHlwZSkge1xuICAgICAgICBjYXNlIFwibnVsbFwiOlxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gJHtFUX0gbnVsbGA7XG4gICAgICAgIGNhc2UgXCJhcnJheVwiOlxuICAgICAgICAgICAgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYEFycmF5LmlzQXJyYXkoJHtkYXRhfSlgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgIGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ICYmIHR5cGVvZiAke2RhdGF9ID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoJHtkYXRhfSlgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XG4gICAgICAgICAgICBjb25kID0gbnVtQ29uZCgoMCwgY29kZWdlbl8xLl8pIGAhKCR7ZGF0YX0gJSAxKSAmJiAhaXNOYU4oJHtkYXRhfSlgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICBjb25kID0gbnVtQ29uZCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZGF0YX0gJHtFUX0gJHtkYXRhVHlwZX1gO1xuICAgIH1cbiAgICByZXR1cm4gY29ycmVjdCA9PT0gRGF0YVR5cGUuQ29ycmVjdCA/IGNvbmQgOiAoMCwgY29kZWdlbl8xLm5vdCkoY29uZCk7XG4gICAgZnVuY3Rpb24gbnVtQ29uZChfY29uZCA9IGNvZGVnZW5fMS5uaWwpIHtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuYW5kKSgoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfSA9PSBcIm51bWJlclwiYCwgX2NvbmQsIHN0cmljdE51bXMgPyAoMCwgY29kZWdlbl8xLl8pIGBpc0Zpbml0ZSgke2RhdGF9KWAgOiBjb2RlZ2VuXzEubmlsKTtcbiAgICB9XG59XG5leHBvcnRzLmNoZWNrRGF0YVR5cGUgPSBjaGVja0RhdGFUeXBlO1xuZnVuY3Rpb24gY2hlY2tEYXRhVHlwZXMoZGF0YVR5cGVzLCBkYXRhLCBzdHJpY3ROdW1zLCBjb3JyZWN0KSB7XG4gICAgaWYgKGRhdGFUeXBlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrRGF0YVR5cGUoZGF0YVR5cGVzWzBdLCBkYXRhLCBzdHJpY3ROdW1zLCBjb3JyZWN0KTtcbiAgICB9XG4gICAgbGV0IGNvbmQ7XG4gICAgY29uc3QgdHlwZXMgPSAoMCwgdXRpbF8xLnRvSGFzaCkoZGF0YVR5cGVzKTtcbiAgICBpZiAodHlwZXMuYXJyYXkgJiYgdHlwZXMub2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IG5vdE9iaiA9ICgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9ICE9IFwib2JqZWN0XCJgO1xuICAgICAgICBjb25kID0gdHlwZXMubnVsbCA/IG5vdE9iaiA6ICgwLCBjb2RlZ2VuXzEuXykgYCEke2RhdGF9IHx8ICR7bm90T2JqfWA7XG4gICAgICAgIGRlbGV0ZSB0eXBlcy5udWxsO1xuICAgICAgICBkZWxldGUgdHlwZXMuYXJyYXk7XG4gICAgICAgIGRlbGV0ZSB0eXBlcy5vYmplY3Q7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25kID0gY29kZWdlbl8xLm5pbDtcbiAgICB9XG4gICAgaWYgKHR5cGVzLm51bWJlcilcbiAgICAgICAgZGVsZXRlIHR5cGVzLmludGVnZXI7XG4gICAgZm9yIChjb25zdCB0IGluIHR5cGVzKVxuICAgICAgICBjb25kID0gKDAsIGNvZGVnZW5fMS5hbmQpKGNvbmQsIGNoZWNrRGF0YVR5cGUodCwgZGF0YSwgc3RyaWN0TnVtcywgY29ycmVjdCkpO1xuICAgIHJldHVybiBjb25kO1xufVxuZXhwb3J0cy5jaGVja0RhdGFUeXBlcyA9IGNoZWNrRGF0YVR5cGVzO1xuY29uc3QgdHlwZUVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHNjaGVtYSB9KSA9PiBgbXVzdCBiZSAke3NjaGVtYX1gLFxuICAgIHBhcmFtczogKHsgc2NoZW1hLCBzY2hlbWFWYWx1ZSB9KSA9PiB0eXBlb2Ygc2NoZW1hID09IFwic3RyaW5nXCIgPyAoMCwgY29kZWdlbl8xLl8pIGB7dHlwZTogJHtzY2hlbWF9fWAgOiAoMCwgY29kZWdlbl8xLl8pIGB7dHlwZTogJHtzY2hlbWFWYWx1ZX19YCxcbn07XG5mdW5jdGlvbiByZXBvcnRUeXBlRXJyb3IoaXQpIHtcbiAgICBjb25zdCBjeHQgPSBnZXRUeXBlRXJyb3JDb250ZXh0KGl0KTtcbiAgICAoMCwgZXJyb3JzXzEucmVwb3J0RXJyb3IpKGN4dCwgdHlwZUVycm9yKTtcbn1cbmV4cG9ydHMucmVwb3J0VHlwZUVycm9yID0gcmVwb3J0VHlwZUVycm9yO1xuZnVuY3Rpb24gZ2V0VHlwZUVycm9yQ29udGV4dChpdCkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBzY2hlbWEgfSA9IGl0O1xuICAgIGNvbnN0IHNjaGVtYUNvZGUgPSAoMCwgdXRpbF8xLnNjaGVtYVJlZk9yVmFsKShpdCwgc2NoZW1hLCBcInR5cGVcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2VuLFxuICAgICAgICBrZXl3b3JkOiBcInR5cGVcIixcbiAgICAgICAgZGF0YSxcbiAgICAgICAgc2NoZW1hOiBzY2hlbWEudHlwZSxcbiAgICAgICAgc2NoZW1hQ29kZSxcbiAgICAgICAgc2NoZW1hVmFsdWU6IHNjaGVtYUNvZGUsXG4gICAgICAgIHBhcmVudFNjaGVtYTogc2NoZW1hLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBpdCxcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YVR5cGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzc2lnbkRlZmF1bHRzID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmZ1bmN0aW9uIGFzc2lnbkRlZmF1bHRzKGl0LCB0eSkge1xuICAgIGNvbnN0IHsgcHJvcGVydGllcywgaXRlbXMgfSA9IGl0LnNjaGVtYTtcbiAgICBpZiAodHkgPT09IFwib2JqZWN0XCIgJiYgcHJvcGVydGllcykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBhc3NpZ25EZWZhdWx0KGl0LCBrZXksIHByb3BlcnRpZXNba2V5XS5kZWZhdWx0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eSA9PT0gXCJhcnJheVwiICYmIEFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goKHNjaCwgaSkgPT4gYXNzaWduRGVmYXVsdChpdCwgaSwgc2NoLmRlZmF1bHQpKTtcbiAgICB9XG59XG5leHBvcnRzLmFzc2lnbkRlZmF1bHRzID0gYXNzaWduRGVmYXVsdHM7XG5mdW5jdGlvbiBhc3NpZ25EZWZhdWx0KGl0LCBwcm9wLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBjb25zdCB7IGdlbiwgY29tcG9zaXRlUnVsZSwgZGF0YSwgb3B0cyB9ID0gaXQ7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgY2hpbGREYXRhID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkocHJvcCl9YDtcbiAgICBpZiAoY29tcG9zaXRlUnVsZSkge1xuICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBkZWZhdWx0IGlzIGlnbm9yZWQgZm9yOiAke2NoaWxkRGF0YX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgY29uZGl0aW9uID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtjaGlsZERhdGF9ID09PSB1bmRlZmluZWRgO1xuICAgIGlmIChvcHRzLnVzZURlZmF1bHRzID09PSBcImVtcHR5XCIpIHtcbiAgICAgICAgY29uZGl0aW9uID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtjb25kaXRpb259IHx8ICR7Y2hpbGREYXRhfSA9PT0gbnVsbCB8fCAke2NoaWxkRGF0YX0gPT09IFwiXCJgO1xuICAgIH1cbiAgICAvLyBgJHtjaGlsZERhdGF9ID09PSB1bmRlZmluZWRgICtcbiAgICAvLyAob3B0cy51c2VEZWZhdWx0cyA9PT0gXCJlbXB0eVwiID8gYCB8fCAke2NoaWxkRGF0YX0gPT09IG51bGwgfHwgJHtjaGlsZERhdGF9ID09PSBcIlwiYCA6IFwiXCIpXG4gICAgZ2VuLmlmKGNvbmRpdGlvbiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtjaGlsZERhdGF9ID0gJHsoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkoZGVmYXVsdFZhbHVlKX1gKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXREYXRhID0gZXhwb3J0cy5LZXl3b3JkQ3h0ID0gZXhwb3J0cy52YWxpZGF0ZUZ1bmN0aW9uQ29kZSA9IHZvaWQgMDtcbmNvbnN0IGJvb2xTY2hlbWFfMSA9IHJlcXVpcmUoXCIuL2Jvb2xTY2hlbWFcIik7XG5jb25zdCBkYXRhVHlwZV8xID0gcmVxdWlyZShcIi4vZGF0YVR5cGVcIik7XG5jb25zdCBhcHBsaWNhYmlsaXR5XzEgPSByZXF1aXJlKFwiLi9hcHBsaWNhYmlsaXR5XCIpO1xuY29uc3QgZGF0YVR5cGVfMiA9IHJlcXVpcmUoXCIuL2RhdGFUeXBlXCIpO1xuY29uc3QgZGVmYXVsdHNfMSA9IHJlcXVpcmUoXCIuL2RlZmF1bHRzXCIpO1xuY29uc3Qga2V5d29yZF8xID0gcmVxdWlyZShcIi4va2V5d29yZFwiKTtcbmNvbnN0IHN1YnNjaGVtYV8xID0gcmVxdWlyZShcIi4vc3Vic2NoZW1hXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL25hbWVzXCIpO1xuY29uc3QgcmVzb2x2ZV8xID0gcmVxdWlyZShcIi4uL3Jlc29sdmVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbi8vIHNjaGVtYSBjb21waWxhdGlvbiAtIGdlbmVyYXRlcyB2YWxpZGF0aW9uIGZ1bmN0aW9uLCBzdWJzY2hlbWFDb2RlIChiZWxvdykgaXMgdXNlZCBmb3Igc3Vic2NoZW1hc1xuZnVuY3Rpb24gdmFsaWRhdGVGdW5jdGlvbkNvZGUoaXQpIHtcbiAgICBpZiAoaXNTY2hlbWFPYmooaXQpKSB7XG4gICAgICAgIGNoZWNrS2V5d29yZHMoaXQpO1xuICAgICAgICBpZiAoc2NoZW1hQ3h0SGFzUnVsZXMoaXQpKSB7XG4gICAgICAgICAgICB0b3BTY2hlbWFPYmpDb2RlKGl0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZUZ1bmN0aW9uKGl0LCAoKSA9PiAoMCwgYm9vbFNjaGVtYV8xLnRvcEJvb2xPckVtcHR5U2NoZW1hKShpdCkpO1xufVxuZXhwb3J0cy52YWxpZGF0ZUZ1bmN0aW9uQ29kZSA9IHZhbGlkYXRlRnVuY3Rpb25Db2RlO1xuZnVuY3Rpb24gdmFsaWRhdGVGdW5jdGlvbih7IGdlbiwgdmFsaWRhdGVOYW1lLCBzY2hlbWEsIHNjaGVtYUVudiwgb3B0cyB9LCBib2R5KSB7XG4gICAgaWYgKG9wdHMuY29kZS5lczUpIHtcbiAgICAgICAgZ2VuLmZ1bmModmFsaWRhdGVOYW1lLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5kYXRhfSwgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fWAsIHNjaGVtYUVudi4kYXN5bmMsICgpID0+IHtcbiAgICAgICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYFwidXNlIHN0cmljdFwiOyAke2Z1bmNTb3VyY2VVcmwoc2NoZW1hLCBvcHRzKX1gKTtcbiAgICAgICAgICAgIGRlc3RydWN0dXJlVmFsQ3h0RVM1KGdlbiwgb3B0cyk7XG4gICAgICAgICAgICBnZW4uY29kZShib2R5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4uZnVuYyh2YWxpZGF0ZU5hbWUsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmRhdGF9LCAke2Rlc3RydWN0dXJlVmFsQ3h0KG9wdHMpfWAsIHNjaGVtYUVudi4kYXN5bmMsICgpID0+IGdlbi5jb2RlKGZ1bmNTb3VyY2VVcmwoc2NoZW1hLCBvcHRzKSkuY29kZShib2R5KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVzdHJ1Y3R1cmVWYWxDeHQob3B0cykge1xuICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGB7JHtuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRofT1cIlwiLCAke25hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhfSwgJHtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5fSwgJHtuYW1lc18xLmRlZmF1bHQucm9vdERhdGF9PSR7bmFtZXNfMS5kZWZhdWx0LmRhdGF9JHtvcHRzLmR5bmFtaWNSZWYgPyAoMCwgY29kZWdlbl8xLl8pIGAsICR7bmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzfT17fWAgOiBjb2RlZ2VuXzEubmlsfX09e31gO1xufVxuZnVuY3Rpb24gZGVzdHJ1Y3R1cmVWYWxDeHRFUzUoZ2VuLCBvcHRzKSB7XG4gICAgZ2VuLmlmKG5hbWVzXzEuZGVmYXVsdC52YWxDeHQsICgpID0+IHtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9LiR7bmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aH1gKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhfWApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhUHJvcGVydHksICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH0uJHtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5fWApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5yb290RGF0YSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5yb290RGF0YX1gKTtcbiAgICAgICAgaWYgKG9wdHMuZHluYW1pY1JlZilcbiAgICAgICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9LiR7bmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzfWApO1xuICAgIH0sICgpID0+IHtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCAoMCwgY29kZWdlbl8xLl8pIGBcIlwiYCk7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGEsICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhUHJvcGVydHksICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5yb290RGF0YSwgbmFtZXNfMS5kZWZhdWx0LmRhdGEpO1xuICAgICAgICBpZiAob3B0cy5keW5hbWljUmVmKVxuICAgICAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnMsICgwLCBjb2RlZ2VuXzEuXykgYHt9YCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB0b3BTY2hlbWFPYmpDb2RlKGl0KSB7XG4gICAgY29uc3QgeyBzY2hlbWEsIG9wdHMsIGdlbiB9ID0gaXQ7XG4gICAgdmFsaWRhdGVGdW5jdGlvbihpdCwgKCkgPT4ge1xuICAgICAgICBpZiAob3B0cy4kY29tbWVudCAmJiBzY2hlbWEuJGNvbW1lbnQpXG4gICAgICAgICAgICBjb21tZW50S2V5d29yZChpdCk7XG4gICAgICAgIGNoZWNrTm9EZWZhdWx0KGl0KTtcbiAgICAgICAgZ2VuLmxldChuYW1lc18xLmRlZmF1bHQudkVycm9ycywgbnVsbCk7XG4gICAgICAgIGdlbi5sZXQobmFtZXNfMS5kZWZhdWx0LmVycm9ycywgMCk7XG4gICAgICAgIGlmIChvcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICAgICAgcmVzZXRFdmFsdWF0ZWQoaXQpO1xuICAgICAgICB0eXBlQW5kS2V5d29yZHMoaXQpO1xuICAgICAgICByZXR1cm5SZXN1bHRzKGl0KTtcbiAgICB9KTtcbiAgICByZXR1cm47XG59XG5mdW5jdGlvbiByZXNldEV2YWx1YXRlZChpdCkge1xuICAgIC8vIFRPRE8gbWF5YmUgc29tZSBob29rIHRvIGV4ZWN1dGUgaXQgaW4gdGhlIGVuZCB0byBjaGVjayB3aGV0aGVyIHByb3BzL2l0ZW1zIGFyZSBOYW1lLCBhcyBpbiBhc3NpZ25FdmFsdWF0ZWRcbiAgICBjb25zdCB7IGdlbiwgdmFsaWRhdGVOYW1lIH0gPSBpdDtcbiAgICBpdC5ldmFsdWF0ZWQgPSBnZW4uY29uc3QoXCJldmFsdWF0ZWRcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHt2YWxpZGF0ZU5hbWV9LmV2YWx1YXRlZGApO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2l0LmV2YWx1YXRlZH0uZHluYW1pY1Byb3BzYCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2l0LmV2YWx1YXRlZH0ucHJvcHNgLCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKSk7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuZXZhbHVhdGVkfS5keW5hbWljSXRlbXNgLCAoKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuZXZhbHVhdGVkfS5pdGVtc2AsICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApKTtcbn1cbmZ1bmN0aW9uIGZ1bmNTb3VyY2VVcmwoc2NoZW1hLCBvcHRzKSB7XG4gICAgY29uc3Qgc2NoSWQgPSB0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgc2NoZW1hW29wdHMuc2NoZW1hSWRdO1xuICAgIHJldHVybiBzY2hJZCAmJiAob3B0cy5jb2RlLnNvdXJjZSB8fCBvcHRzLmNvZGUucHJvY2VzcykgPyAoMCwgY29kZWdlbl8xLl8pIGAvKiMgc291cmNlVVJMPSR7c2NoSWR9ICovYCA6IGNvZGVnZW5fMS5uaWw7XG59XG4vLyBzY2hlbWEgY29tcGlsYXRpb24gLSB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgcmVjdXJzaXZlbHkgdG8gZ2VuZXJhdGUgY29kZSBmb3Igc3ViLXNjaGVtYXNcbmZ1bmN0aW9uIHN1YnNjaGVtYUNvZGUoaXQsIHZhbGlkKSB7XG4gICAgaWYgKGlzU2NoZW1hT2JqKGl0KSkge1xuICAgICAgICBjaGVja0tleXdvcmRzKGl0KTtcbiAgICAgICAgaWYgKHNjaGVtYUN4dEhhc1J1bGVzKGl0KSkge1xuICAgICAgICAgICAgc3ViU2NoZW1hT2JqQ29kZShpdCwgdmFsaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgICgwLCBib29sU2NoZW1hXzEuYm9vbE9yRW1wdHlTY2hlbWEpKGl0LCB2YWxpZCk7XG59XG5mdW5jdGlvbiBzY2hlbWFDeHRIYXNSdWxlcyh7IHNjaGVtYSwgc2VsZiB9KSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiAhc2NoZW1hO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSlcbiAgICAgICAgaWYgKHNlbGYuUlVMRVMuYWxsW2tleV0pXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc1NjaGVtYU9iaihpdCkge1xuICAgIHJldHVybiB0eXBlb2YgaXQuc2NoZW1hICE9IFwiYm9vbGVhblwiO1xufVxuZnVuY3Rpb24gc3ViU2NoZW1hT2JqQ29kZShpdCwgdmFsaWQpIHtcbiAgICBjb25zdCB7IHNjaGVtYSwgZ2VuLCBvcHRzIH0gPSBpdDtcbiAgICBpZiAob3B0cy4kY29tbWVudCAmJiBzY2hlbWEuJGNvbW1lbnQpXG4gICAgICAgIGNvbW1lbnRLZXl3b3JkKGl0KTtcbiAgICB1cGRhdGVDb250ZXh0KGl0KTtcbiAgICBjaGVja0FzeW5jU2NoZW1hKGl0KTtcbiAgICBjb25zdCBlcnJzQ291bnQgPSBnZW4uY29uc3QoXCJfZXJyc1wiLCBuYW1lc18xLmRlZmF1bHQuZXJyb3JzKTtcbiAgICB0eXBlQW5kS2V5d29yZHMoaXQsIGVycnNDb3VudCk7XG4gICAgLy8gVE9ETyB2YXJcbiAgICBnZW4udmFyKHZhbGlkLCAoMCwgY29kZWdlbl8xLl8pIGAke2VycnNDb3VudH0gPT09ICR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc31gKTtcbn1cbmZ1bmN0aW9uIGNoZWNrS2V5d29yZHMoaXQpIHtcbiAgICAoMCwgdXRpbF8xLmNoZWNrVW5rbm93blJ1bGVzKShpdCk7XG4gICAgY2hlY2tSZWZzQW5kS2V5d29yZHMoaXQpO1xufVxuZnVuY3Rpb24gdHlwZUFuZEtleXdvcmRzKGl0LCBlcnJzQ291bnQpIHtcbiAgICBpZiAoaXQub3B0cy5qdGQpXG4gICAgICAgIHJldHVybiBzY2hlbWFLZXl3b3JkcyhpdCwgW10sIGZhbHNlLCBlcnJzQ291bnQpO1xuICAgIGNvbnN0IHR5cGVzID0gKDAsIGRhdGFUeXBlXzEuZ2V0U2NoZW1hVHlwZXMpKGl0LnNjaGVtYSk7XG4gICAgY29uc3QgY2hlY2tlZFR5cGVzID0gKDAsIGRhdGFUeXBlXzEuY29lcmNlQW5kQ2hlY2tEYXRhVHlwZSkoaXQsIHR5cGVzKTtcbiAgICBzY2hlbWFLZXl3b3JkcyhpdCwgdHlwZXMsICFjaGVja2VkVHlwZXMsIGVycnNDb3VudCk7XG59XG5mdW5jdGlvbiBjaGVja1JlZnNBbmRLZXl3b3JkcyhpdCkge1xuICAgIGNvbnN0IHsgc2NoZW1hLCBlcnJTY2hlbWFQYXRoLCBvcHRzLCBzZWxmIH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hLiRyZWYgJiYgb3B0cy5pZ25vcmVLZXl3b3Jkc1dpdGhSZWYgJiYgKDAsIHV0aWxfMS5zY2hlbWFIYXNSdWxlc0J1dFJlZikoc2NoZW1hLCBzZWxmLlJVTEVTKSkge1xuICAgICAgICBzZWxmLmxvZ2dlci53YXJuKGAkcmVmOiBrZXl3b3JkcyBpZ25vcmVkIGluIHNjaGVtYSBhdCBwYXRoIFwiJHtlcnJTY2hlbWFQYXRofVwiYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tOb0RlZmF1bHQoaXQpIHtcbiAgICBjb25zdCB7IHNjaGVtYSwgb3B0cyB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYS5kZWZhdWx0ICE9PSB1bmRlZmluZWQgJiYgb3B0cy51c2VEZWZhdWx0cyAmJiBvcHRzLnN0cmljdFNjaGVtYSkge1xuICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIFwiZGVmYXVsdCBpcyBpZ25vcmVkIGluIHRoZSBzY2hlbWEgcm9vdFwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVDb250ZXh0KGl0KSB7XG4gICAgY29uc3Qgc2NoSWQgPSBpdC5zY2hlbWFbaXQub3B0cy5zY2hlbWFJZF07XG4gICAgaWYgKHNjaElkKVxuICAgICAgICBpdC5iYXNlSWQgPSAoMCwgcmVzb2x2ZV8xLnJlc29sdmVVcmwpKGl0Lm9wdHMudXJpUmVzb2x2ZXIsIGl0LmJhc2VJZCwgc2NoSWQpO1xufVxuZnVuY3Rpb24gY2hlY2tBc3luY1NjaGVtYShpdCkge1xuICAgIGlmIChpdC5zY2hlbWEuJGFzeW5jICYmICFpdC5zY2hlbWFFbnYuJGFzeW5jKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3luYyBzY2hlbWEgaW4gc3luYyBzY2hlbWFcIik7XG59XG5mdW5jdGlvbiBjb21tZW50S2V5d29yZCh7IGdlbiwgc2NoZW1hRW52LCBzY2hlbWEsIGVyclNjaGVtYVBhdGgsIG9wdHMgfSkge1xuICAgIGNvbnN0IG1zZyA9IHNjaGVtYS4kY29tbWVudDtcbiAgICBpZiAob3B0cy4kY29tbWVudCA9PT0gdHJ1ZSkge1xuICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5zZWxmfS5sb2dnZXIubG9nKCR7bXNnfSlgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9wdHMuJGNvbW1lbnQgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYVBhdGggPSAoMCwgY29kZWdlbl8xLnN0cikgYCR7ZXJyU2NoZW1hUGF0aH0vJGNvbW1lbnRgO1xuICAgICAgICBjb25zdCByb290TmFtZSA9IGdlbi5zY29wZVZhbHVlKFwicm9vdFwiLCB7IHJlZjogc2NoZW1hRW52LnJvb3QgfSk7XG4gICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnNlbGZ9Lm9wdHMuJGNvbW1lbnQoJHttc2d9LCAke3NjaGVtYVBhdGh9LCAke3Jvb3ROYW1lfS5zY2hlbWEpYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmV0dXJuUmVzdWx0cyhpdCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWFFbnYsIHZhbGlkYXRlTmFtZSwgVmFsaWRhdGlvbkVycm9yLCBvcHRzIH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hRW52LiRhc3luYykge1xuICAgICAgICAvLyBUT0RPIGFzc2lnbiB1bmV2YWx1YXRlZFxuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfSA9PT0gMGAsICgpID0+IGdlbi5yZXR1cm4obmFtZXNfMS5kZWZhdWx0LmRhdGEpLCAoKSA9PiBnZW4udGhyb3coKDAsIGNvZGVnZW5fMS5fKSBgbmV3ICR7VmFsaWRhdGlvbkVycm9yfSgke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSlgKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVOYW1lfS5lcnJvcnNgLCBuYW1lc18xLmRlZmF1bHQudkVycm9ycyk7XG4gICAgICAgIGlmIChvcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICAgICAgYXNzaWduRXZhbHVhdGVkKGl0KTtcbiAgICAgICAgZ2VuLnJldHVybigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9ID09PSAwYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzaWduRXZhbHVhdGVkKHsgZ2VuLCBldmFsdWF0ZWQsIHByb3BzLCBpdGVtcyB9KSB7XG4gICAgaWYgKHByb3BzIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpXG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtldmFsdWF0ZWR9LnByb3BzYCwgcHJvcHMpO1xuICAgIGlmIChpdGVtcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKVxuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXZhbHVhdGVkfS5pdGVtc2AsIGl0ZW1zKTtcbn1cbmZ1bmN0aW9uIHNjaGVtYUtleXdvcmRzKGl0LCB0eXBlcywgdHlwZUVycm9ycywgZXJyc0NvdW50KSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgZGF0YSwgYWxsRXJyb3JzLCBvcHRzLCBzZWxmIH0gPSBpdDtcbiAgICBjb25zdCB7IFJVTEVTIH0gPSBzZWxmO1xuICAgIGlmIChzY2hlbWEuJHJlZiAmJiAob3B0cy5pZ25vcmVLZXl3b3Jkc1dpdGhSZWYgfHwgISgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaGVtYSwgUlVMRVMpKSkge1xuICAgICAgICBnZW4uYmxvY2soKCkgPT4ga2V5d29yZENvZGUoaXQsIFwiJHJlZlwiLCBSVUxFUy5hbGwuJHJlZi5kZWZpbml0aW9uKSk7IC8vIFRPRE8gdHlwZWNhc3RcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW9wdHMuanRkKVxuICAgICAgICBjaGVja1N0cmljdFR5cGVzKGl0LCB0eXBlcyk7XG4gICAgZ2VuLmJsb2NrKCgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBSVUxFUy5ydWxlcylcbiAgICAgICAgICAgIGdyb3VwS2V5d29yZHMoZ3JvdXApO1xuICAgICAgICBncm91cEtleXdvcmRzKFJVTEVTLnBvc3QpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGdyb3VwS2V5d29yZHMoZ3JvdXApIHtcbiAgICAgICAgaWYgKCEoMCwgYXBwbGljYWJpbGl0eV8xLnNob3VsZFVzZUdyb3VwKShzY2hlbWEsIGdyb3VwKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGdyb3VwLnR5cGUpIHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgZGF0YVR5cGVfMi5jaGVja0RhdGFUeXBlKShncm91cC50eXBlLCBkYXRhLCBvcHRzLnN0cmljdE51bWJlcnMpKTtcbiAgICAgICAgICAgIGl0ZXJhdGVLZXl3b3JkcyhpdCwgZ3JvdXApO1xuICAgICAgICAgICAgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMSAmJiB0eXBlc1swXSA9PT0gZ3JvdXAudHlwZSAmJiB0eXBlRXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgZ2VuLmVsc2UoKTtcbiAgICAgICAgICAgICAgICAoMCwgZGF0YVR5cGVfMi5yZXBvcnRUeXBlRXJyb3IpKGl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdlbi5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaXRlcmF0ZUtleXdvcmRzKGl0LCBncm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETyBtYWtlIGl0IFwib2tcIiBjYWxsP1xuICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9ID09PSAke2VycnNDb3VudCB8fCAwfWApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGl0ZXJhdGVLZXl3b3JkcyhpdCwgZ3JvdXApIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBvcHRzOiB7IHVzZURlZmF1bHRzIH0sIH0gPSBpdDtcbiAgICBpZiAodXNlRGVmYXVsdHMpXG4gICAgICAgICgwLCBkZWZhdWx0c18xLmFzc2lnbkRlZmF1bHRzKShpdCwgZ3JvdXAudHlwZSk7XG4gICAgZ2VuLmJsb2NrKCgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIGdyb3VwLnJ1bGVzKSB7XG4gICAgICAgICAgICBpZiAoKDAsIGFwcGxpY2FiaWxpdHlfMS5zaG91bGRVc2VSdWxlKShzY2hlbWEsIHJ1bGUpKSB7XG4gICAgICAgICAgICAgICAga2V5d29yZENvZGUoaXQsIHJ1bGUua2V5d29yZCwgcnVsZS5kZWZpbml0aW9uLCBncm91cC50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gY2hlY2tTdHJpY3RUeXBlcyhpdCwgdHlwZXMpIHtcbiAgICBpZiAoaXQuc2NoZW1hRW52Lm1ldGEgfHwgIWl0Lm9wdHMuc3RyaWN0VHlwZXMpXG4gICAgICAgIHJldHVybjtcbiAgICBjaGVja0NvbnRleHRUeXBlcyhpdCwgdHlwZXMpO1xuICAgIGlmICghaXQub3B0cy5hbGxvd1VuaW9uVHlwZXMpXG4gICAgICAgIGNoZWNrTXVsdGlwbGVUeXBlcyhpdCwgdHlwZXMpO1xuICAgIGNoZWNrS2V5d29yZFR5cGVzKGl0LCBpdC5kYXRhVHlwZXMpO1xufVxuZnVuY3Rpb24gY2hlY2tDb250ZXh0VHlwZXMoaXQsIHR5cGVzKSB7XG4gICAgaWYgKCF0eXBlcy5sZW5ndGgpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoIWl0LmRhdGFUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgaXQuZGF0YVR5cGVzID0gdHlwZXM7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHlwZXMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICBpZiAoIWluY2x1ZGVzVHlwZShpdC5kYXRhVHlwZXMsIHQpKSB7XG4gICAgICAgICAgICBzdHJpY3RUeXBlc0Vycm9yKGl0LCBgdHlwZSBcIiR7dH1cIiBub3QgYWxsb3dlZCBieSBjb250ZXh0IFwiJHtpdC5kYXRhVHlwZXMuam9pbihcIixcIil9XCJgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIG5hcnJvd1NjaGVtYVR5cGVzKGl0LCB0eXBlcyk7XG59XG5mdW5jdGlvbiBjaGVja011bHRpcGxlVHlwZXMoaXQsIHRzKSB7XG4gICAgaWYgKHRzLmxlbmd0aCA+IDEgJiYgISh0cy5sZW5ndGggPT09IDIgJiYgdHMuaW5jbHVkZXMoXCJudWxsXCIpKSkge1xuICAgICAgICBzdHJpY3RUeXBlc0Vycm9yKGl0LCBcInVzZSBhbGxvd1VuaW9uVHlwZXMgdG8gYWxsb3cgdW5pb24gdHlwZSBrZXl3b3JkXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNoZWNrS2V5d29yZFR5cGVzKGl0LCB0cykge1xuICAgIGNvbnN0IHJ1bGVzID0gaXQuc2VsZi5SVUxFUy5hbGw7XG4gICAgZm9yIChjb25zdCBrZXl3b3JkIGluIHJ1bGVzKSB7XG4gICAgICAgIGNvbnN0IHJ1bGUgPSBydWxlc1trZXl3b3JkXTtcbiAgICAgICAgaWYgKHR5cGVvZiBydWxlID09IFwib2JqZWN0XCIgJiYgKDAsIGFwcGxpY2FiaWxpdHlfMS5zaG91bGRVc2VSdWxlKShpdC5zY2hlbWEsIHJ1bGUpKSB7XG4gICAgICAgICAgICBjb25zdCB7IHR5cGUgfSA9IHJ1bGUuZGVmaW5pdGlvbjtcbiAgICAgICAgICAgIGlmICh0eXBlLmxlbmd0aCAmJiAhdHlwZS5zb21lKCh0KSA9PiBoYXNBcHBsaWNhYmxlVHlwZSh0cywgdCkpKSB7XG4gICAgICAgICAgICAgICAgc3RyaWN0VHlwZXNFcnJvcihpdCwgYG1pc3NpbmcgdHlwZSBcIiR7dHlwZS5qb2luKFwiLFwiKX1cIiBmb3Iga2V5d29yZCBcIiR7a2V5d29yZH1cImApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaGFzQXBwbGljYWJsZVR5cGUoc2NoVHMsIGt3ZFQpIHtcbiAgICByZXR1cm4gc2NoVHMuaW5jbHVkZXMoa3dkVCkgfHwgKGt3ZFQgPT09IFwibnVtYmVyXCIgJiYgc2NoVHMuaW5jbHVkZXMoXCJpbnRlZ2VyXCIpKTtcbn1cbmZ1bmN0aW9uIGluY2x1ZGVzVHlwZSh0cywgdCkge1xuICAgIHJldHVybiB0cy5pbmNsdWRlcyh0KSB8fCAodCA9PT0gXCJpbnRlZ2VyXCIgJiYgdHMuaW5jbHVkZXMoXCJudW1iZXJcIikpO1xufVxuZnVuY3Rpb24gbmFycm93U2NoZW1hVHlwZXMoaXQsIHdpdGhUeXBlcykge1xuICAgIGNvbnN0IHRzID0gW107XG4gICAgZm9yIChjb25zdCB0IG9mIGl0LmRhdGFUeXBlcykge1xuICAgICAgICBpZiAoaW5jbHVkZXNUeXBlKHdpdGhUeXBlcywgdCkpXG4gICAgICAgICAgICB0cy5wdXNoKHQpO1xuICAgICAgICBlbHNlIGlmICh3aXRoVHlwZXMuaW5jbHVkZXMoXCJpbnRlZ2VyXCIpICYmIHQgPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICB0cy5wdXNoKFwiaW50ZWdlclwiKTtcbiAgICB9XG4gICAgaXQuZGF0YVR5cGVzID0gdHM7XG59XG5mdW5jdGlvbiBzdHJpY3RUeXBlc0Vycm9yKGl0LCBtc2cpIHtcbiAgICBjb25zdCBzY2hlbWFQYXRoID0gaXQuc2NoZW1hRW52LmJhc2VJZCArIGl0LmVyclNjaGVtYVBhdGg7XG4gICAgbXNnICs9IGAgYXQgXCIke3NjaGVtYVBhdGh9XCIgKHN0cmljdFR5cGVzKWA7XG4gICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBtc2csIGl0Lm9wdHMuc3RyaWN0VHlwZXMpO1xufVxuY2xhc3MgS2V5d29yZEN4dCB7XG4gICAgY29uc3RydWN0b3IoaXQsIGRlZiwga2V5d29yZCkge1xuICAgICAgICAoMCwga2V5d29yZF8xLnZhbGlkYXRlS2V5d29yZFVzYWdlKShpdCwgZGVmLCBrZXl3b3JkKTtcbiAgICAgICAgdGhpcy5nZW4gPSBpdC5nZW47XG4gICAgICAgIHRoaXMuYWxsRXJyb3JzID0gaXQuYWxsRXJyb3JzO1xuICAgICAgICB0aGlzLmtleXdvcmQgPSBrZXl3b3JkO1xuICAgICAgICB0aGlzLmRhdGEgPSBpdC5kYXRhO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IGl0LnNjaGVtYVtrZXl3b3JkXTtcbiAgICAgICAgdGhpcy4kZGF0YSA9IGRlZi4kZGF0YSAmJiBpdC5vcHRzLiRkYXRhICYmIHRoaXMuc2NoZW1hICYmIHRoaXMuc2NoZW1hLiRkYXRhO1xuICAgICAgICB0aGlzLnNjaGVtYVZhbHVlID0gKDAsIHV0aWxfMS5zY2hlbWFSZWZPclZhbCkoaXQsIHRoaXMuc2NoZW1hLCBrZXl3b3JkLCB0aGlzLiRkYXRhKTtcbiAgICAgICAgdGhpcy5zY2hlbWFUeXBlID0gZGVmLnNjaGVtYVR5cGU7XG4gICAgICAgIHRoaXMucGFyZW50U2NoZW1hID0gaXQuc2NoZW1hO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHt9O1xuICAgICAgICB0aGlzLml0ID0gaXQ7XG4gICAgICAgIHRoaXMuZGVmID0gZGVmO1xuICAgICAgICBpZiAodGhpcy4kZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlbWFDb2RlID0gaXQuZ2VuLmNvbnN0KFwidlNjaGVtYVwiLCBnZXREYXRhKHRoaXMuJGRhdGEsIGl0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYUNvZGUgPSB0aGlzLnNjaGVtYVZhbHVlO1xuICAgICAgICAgICAgaWYgKCEoMCwga2V5d29yZF8xLnZhbGlkU2NoZW1hVHlwZSkodGhpcy5zY2hlbWEsIGRlZi5zY2hlbWFUeXBlLCBkZWYuYWxsb3dVbmRlZmluZWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2tleXdvcmR9IHZhbHVlIG11c3QgYmUgJHtKU09OLnN0cmluZ2lmeShkZWYuc2NoZW1hVHlwZSl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY29kZVwiIGluIGRlZiA/IGRlZi50cmFja0Vycm9ycyA6IGRlZi5lcnJvcnMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmVycnNDb3VudCA9IGl0Lmdlbi5jb25zdChcIl9lcnJzXCIsIG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdChjb25kaXRpb24sIHN1Y2Nlc3NBY3Rpb24sIGZhaWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5mYWlsUmVzdWx0KCgwLCBjb2RlZ2VuXzEubm90KShjb25kaXRpb24pLCBzdWNjZXNzQWN0aW9uLCBmYWlsQWN0aW9uKTtcbiAgICB9XG4gICAgZmFpbFJlc3VsdChjb25kaXRpb24sIHN1Y2Nlc3NBY3Rpb24sIGZhaWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5nZW4uaWYoY29uZGl0aW9uKTtcbiAgICAgICAgaWYgKGZhaWxBY3Rpb24pXG4gICAgICAgICAgICBmYWlsQWN0aW9uKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoKTtcbiAgICAgICAgaWYgKHN1Y2Nlc3NBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuLmVsc2UoKTtcbiAgICAgICAgICAgIHN1Y2Nlc3NBY3Rpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICB0aGlzLmdlbi5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuLmVuZElmKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4uZWxzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhc3MoY29uZGl0aW9uLCBmYWlsQWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZmFpbFJlc3VsdCgoMCwgY29kZWdlbl8xLm5vdCkoY29uZGl0aW9uKSwgdW5kZWZpbmVkLCBmYWlsQWN0aW9uKTtcbiAgICB9XG4gICAgZmFpbChjb25kaXRpb24pIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuLmlmKGZhbHNlKTsgLy8gdGhpcyBicmFuY2ggd2lsbCBiZSByZW1vdmVkIGJ5IGdlbi5vcHRpbWl6ZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2VuLmlmKGNvbmRpdGlvbik7XG4gICAgICAgIHRoaXMuZXJyb3IoKTtcbiAgICAgICAgaWYgKHRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgdGhpcy5nZW4uZW5kSWYoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5nZW4uZWxzZSgpO1xuICAgIH1cbiAgICBmYWlsJGRhdGEoY29uZGl0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy4kZGF0YSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWwoY29uZGl0aW9uKTtcbiAgICAgICAgY29uc3QgeyBzY2hlbWFDb2RlIH0gPSB0aGlzO1xuICAgICAgICB0aGlzLmZhaWwoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSAhPT0gdW5kZWZpbmVkICYmICgkeygwLCBjb2RlZ2VuXzEub3IpKHRoaXMuaW52YWxpZCRkYXRhKCksIGNvbmRpdGlvbil9KWApO1xuICAgIH1cbiAgICBlcnJvcihhcHBlbmQsIGVycm9yUGFyYW1zLCBlcnJvclBhdGhzKSB7XG4gICAgICAgIGlmIChlcnJvclBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbXMoZXJyb3JQYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoYXBwZW5kLCBlcnJvclBhdGhzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1zKHt9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lcnJvcihhcHBlbmQsIGVycm9yUGF0aHMpO1xuICAgIH1cbiAgICBfZXJyb3IoYXBwZW5kLCBlcnJvclBhdGhzKSB7XG4gICAgICAgIDtcbiAgICAgICAgKGFwcGVuZCA/IGVycm9yc18xLnJlcG9ydEV4dHJhRXJyb3IgOiBlcnJvcnNfMS5yZXBvcnRFcnJvcikodGhpcywgdGhpcy5kZWYuZXJyb3IsIGVycm9yUGF0aHMpO1xuICAgIH1cbiAgICAkZGF0YUVycm9yKCkge1xuICAgICAgICAoMCwgZXJyb3JzXzEucmVwb3J0RXJyb3IpKHRoaXMsIHRoaXMuZGVmLiRkYXRhRXJyb3IgfHwgZXJyb3JzXzEua2V5d29yZCREYXRhRXJyb3IpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyc0NvdW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZCBcInRyYWNrRXJyb3JzXCIgdG8ga2V5d29yZCBkZWZpbml0aW9uJyk7XG4gICAgICAgICgwLCBlcnJvcnNfMS5yZXNldEVycm9yc0NvdW50KSh0aGlzLmdlbiwgdGhpcy5lcnJzQ291bnQpO1xuICAgIH1cbiAgICBvayhjb25kKSB7XG4gICAgICAgIGlmICghdGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICB0aGlzLmdlbi5pZihjb25kKTtcbiAgICB9XG4gICAgc2V0UGFyYW1zKG9iaiwgYXNzaWduKSB7XG4gICAgICAgIGlmIChhc3NpZ24pXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucGFyYW1zLCBvYmopO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9IG9iajtcbiAgICB9XG4gICAgYmxvY2skZGF0YSh2YWxpZCwgY29kZUJsb2NrLCAkZGF0YVZhbGlkID0gY29kZWdlbl8xLm5pbCkge1xuICAgICAgICB0aGlzLmdlbi5ibG9jaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrJGRhdGEodmFsaWQsICRkYXRhVmFsaWQpO1xuICAgICAgICAgICAgY29kZUJsb2NrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGVjayRkYXRhKHZhbGlkID0gY29kZWdlbl8xLm5pbCwgJGRhdGFWYWxpZCA9IGNvZGVnZW5fMS5uaWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRkYXRhKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hQ29kZSwgc2NoZW1hVHlwZSwgZGVmIH0gPSB0aGlzO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5vcikoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSA9PT0gdW5kZWZpbmVkYCwgJGRhdGFWYWxpZCkpO1xuICAgICAgICBpZiAodmFsaWQgIT09IGNvZGVnZW5fMS5uaWwpXG4gICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgaWYgKHNjaGVtYVR5cGUubGVuZ3RoIHx8IGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICAgICAgZ2VuLmVsc2VJZih0aGlzLmludmFsaWQkZGF0YSgpKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGFFcnJvcigpO1xuICAgICAgICAgICAgaWYgKHZhbGlkICE9PSBjb2RlZ2VuXzEubmlsKVxuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBnZW4uZWxzZSgpO1xuICAgIH1cbiAgICBpbnZhbGlkJGRhdGEoKSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWFDb2RlLCBzY2hlbWFUeXBlLCBkZWYsIGl0IH0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5vcikod3JvbmckRGF0YVR5cGUoKSwgaW52YWxpZCREYXRhU2NoZW1hKCkpO1xuICAgICAgICBmdW5jdGlvbiB3cm9uZyREYXRhVHlwZSgpIHtcbiAgICAgICAgICAgIGlmIChzY2hlbWFUeXBlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgICAgIGlmICghKHNjaGVtYUNvZGUgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdCA9IEFycmF5LmlzQXJyYXkoc2NoZW1hVHlwZSkgPyBzY2hlbWFUeXBlIDogW3NjaGVtYVR5cGVdO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAkeygwLCBkYXRhVHlwZV8yLmNoZWNrRGF0YVR5cGVzKShzdCwgc2NoZW1hQ29kZSwgaXQub3B0cy5zdHJpY3ROdW1iZXJzLCBkYXRhVHlwZV8yLkRhdGFUeXBlLldyb25nKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW5fMS5uaWw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaW52YWxpZCREYXRhU2NoZW1hKCkge1xuICAgICAgICAgICAgaWYgKGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlU2NoZW1hUmVmID0gZ2VuLnNjb3BlVmFsdWUoXCJ2YWxpZGF0ZSRkYXRhXCIsIHsgcmVmOiBkZWYudmFsaWRhdGVTY2hlbWEgfSk7IC8vIFRPRE8gdmFsdWUuY29kZSBmb3Igc3RhbmRhbG9uZVxuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAhJHt2YWxpZGF0ZVNjaGVtYVJlZn0oJHtzY2hlbWFDb2RlfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW5fMS5uaWw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3Vic2NoZW1hKGFwcGwsIHZhbGlkKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjaGVtYSA9ICgwLCBzdWJzY2hlbWFfMS5nZXRTdWJzY2hlbWEpKHRoaXMuaXQsIGFwcGwpO1xuICAgICAgICAoMCwgc3Vic2NoZW1hXzEuZXh0ZW5kU3Vic2NoZW1hRGF0YSkoc3Vic2NoZW1hLCB0aGlzLml0LCBhcHBsKTtcbiAgICAgICAgKDAsIHN1YnNjaGVtYV8xLmV4dGVuZFN1YnNjaGVtYU1vZGUpKHN1YnNjaGVtYSwgYXBwbCk7XG4gICAgICAgIGNvbnN0IG5leHRDb250ZXh0ID0geyAuLi50aGlzLml0LCAuLi5zdWJzY2hlbWEsIGl0ZW1zOiB1bmRlZmluZWQsIHByb3BzOiB1bmRlZmluZWQgfTtcbiAgICAgICAgc3Vic2NoZW1hQ29kZShuZXh0Q29udGV4dCwgdmFsaWQpO1xuICAgICAgICByZXR1cm4gbmV4dENvbnRleHQ7XG4gICAgfVxuICAgIG1lcmdlRXZhbHVhdGVkKHNjaGVtYUN4dCwgdG9OYW1lKSB7XG4gICAgICAgIGNvbnN0IHsgaXQsIGdlbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFpdC5vcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoaXQucHJvcHMgIT09IHRydWUgJiYgc2NoZW1hQ3h0LnByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGl0LnByb3BzID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLnByb3BzKGdlbiwgc2NoZW1hQ3h0LnByb3BzLCBpdC5wcm9wcywgdG9OYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXQuaXRlbXMgIT09IHRydWUgJiYgc2NoZW1hQ3h0Lml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGl0Lml0ZW1zID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLml0ZW1zKGdlbiwgc2NoZW1hQ3h0Lml0ZW1zLCBpdC5pdGVtcywgdG9OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtZXJnZVZhbGlkRXZhbHVhdGVkKHNjaGVtYUN4dCwgdmFsaWQpIHtcbiAgICAgICAgY29uc3QgeyBpdCwgZ2VuIH0gPSB0aGlzO1xuICAgICAgICBpZiAoaXQub3B0cy51bmV2YWx1YXRlZCAmJiAoaXQucHJvcHMgIT09IHRydWUgfHwgaXQuaXRlbXMgIT09IHRydWUpKSB7XG4gICAgICAgICAgICBnZW4uaWYodmFsaWQsICgpID0+IHRoaXMubWVyZ2VFdmFsdWF0ZWQoc2NoZW1hQ3h0LCBjb2RlZ2VuXzEuTmFtZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLktleXdvcmRDeHQgPSBLZXl3b3JkQ3h0O1xuZnVuY3Rpb24ga2V5d29yZENvZGUoaXQsIGtleXdvcmQsIGRlZiwgcnVsZVR5cGUpIHtcbiAgICBjb25zdCBjeHQgPSBuZXcgS2V5d29yZEN4dChpdCwgZGVmLCBrZXl3b3JkKTtcbiAgICBpZiAoXCJjb2RlXCIgaW4gZGVmKSB7XG4gICAgICAgIGRlZi5jb2RlKGN4dCwgcnVsZVR5cGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjeHQuJGRhdGEgJiYgZGVmLnZhbGlkYXRlKSB7XG4gICAgICAgICgwLCBrZXl3b3JkXzEuZnVuY0tleXdvcmRDb2RlKShjeHQsIGRlZik7XG4gICAgfVxuICAgIGVsc2UgaWYgKFwibWFjcm9cIiBpbiBkZWYpIHtcbiAgICAgICAgKDAsIGtleXdvcmRfMS5tYWNyb0tleXdvcmRDb2RlKShjeHQsIGRlZik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRlZi5jb21waWxlIHx8IGRlZi52YWxpZGF0ZSkge1xuICAgICAgICAoMCwga2V5d29yZF8xLmZ1bmNLZXl3b3JkQ29kZSkoY3h0LCBkZWYpO1xuICAgIH1cbn1cbmNvbnN0IEpTT05fUE9JTlRFUiA9IC9eXFwvKD86W15+XXx+MHx+MSkqJC87XG5jb25zdCBSRUxBVElWRV9KU09OX1BPSU5URVIgPSAvXihbMC05XSspKCN8XFwvKD86W15+XXx+MHx+MSkqKT8kLztcbmZ1bmN0aW9uIGdldERhdGEoJGRhdGEsIHsgZGF0YUxldmVsLCBkYXRhTmFtZXMsIGRhdGFQYXRoQXJyIH0pIHtcbiAgICBsZXQganNvblBvaW50ZXI7XG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKCRkYXRhID09PSBcIlwiKVxuICAgICAgICByZXR1cm4gbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhO1xuICAgIGlmICgkZGF0YVswXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgaWYgKCFKU09OX1BPSU5URVIudGVzdCgkZGF0YSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgSlNPTi1wb2ludGVyOiAkeyRkYXRhfWApO1xuICAgICAgICBqc29uUG9pbnRlciA9ICRkYXRhO1xuICAgICAgICBkYXRhID0gbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFJFTEFUSVZFX0pTT05fUE9JTlRFUi5leGVjKCRkYXRhKTtcbiAgICAgICAgaWYgKCFtYXRjaGVzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIEpTT04tcG9pbnRlcjogJHskZGF0YX1gKTtcbiAgICAgICAgY29uc3QgdXAgPSArbWF0Y2hlc1sxXTtcbiAgICAgICAganNvblBvaW50ZXIgPSBtYXRjaGVzWzJdO1xuICAgICAgICBpZiAoanNvblBvaW50ZXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICBpZiAodXAgPj0gZGF0YUxldmVsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyhcInByb3BlcnR5L2luZGV4XCIsIHVwKSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVBhdGhBcnJbZGF0YUxldmVsIC0gdXBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cCA+IGRhdGFMZXZlbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyhcImRhdGFcIiwgdXApKTtcbiAgICAgICAgZGF0YSA9IGRhdGFOYW1lc1tkYXRhTGV2ZWwgLSB1cF07XG4gICAgICAgIGlmICghanNvblBvaW50ZXIpXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgbGV0IGV4cHIgPSBkYXRhO1xuICAgIGNvbnN0IHNlZ21lbnRzID0ganNvblBvaW50ZXIuc3BsaXQoXCIvXCIpO1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICAgICAgZGF0YSA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKCgwLCB1dGlsXzEudW5lc2NhcGVKc29uUG9pbnRlcikoc2VnbWVudCkpfWA7XG4gICAgICAgICAgICBleHByID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtleHByfSAmJiAke2RhdGF9YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXhwcjtcbiAgICBmdW5jdGlvbiBlcnJvck1zZyhwb2ludGVyVHlwZSwgdXApIHtcbiAgICAgICAgcmV0dXJuIGBDYW5ub3QgYWNjZXNzICR7cG9pbnRlclR5cGV9ICR7dXB9IGxldmVscyB1cCwgY3VycmVudCBsZXZlbCBpcyAke2RhdGFMZXZlbH1gO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0RGF0YSA9IGdldERhdGE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVLZXl3b3JkVXNhZ2UgPSBleHBvcnRzLnZhbGlkU2NoZW1hVHlwZSA9IGV4cG9ydHMuZnVuY0tleXdvcmRDb2RlID0gZXhwb3J0cy5tYWNyb0tleXdvcmRDb2RlID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL25hbWVzXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uLy4uL3ZvY2FidWxhcmllcy9jb2RlXCIpO1xuY29uc3QgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xuZnVuY3Rpb24gbWFjcm9LZXl3b3JkQ29kZShjeHQsIGRlZikge1xuICAgIGNvbnN0IHsgZ2VuLCBrZXl3b3JkLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCBtYWNyb1NjaGVtYSA9IGRlZi5tYWNyby5jYWxsKGl0LnNlbGYsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCk7XG4gICAgY29uc3Qgc2NoZW1hUmVmID0gdXNlS2V5d29yZChnZW4sIGtleXdvcmQsIG1hY3JvU2NoZW1hKTtcbiAgICBpZiAoaXQub3B0cy52YWxpZGF0ZVNjaGVtYSAhPT0gZmFsc2UpXG4gICAgICAgIGl0LnNlbGYudmFsaWRhdGVTY2hlbWEobWFjcm9TY2hlbWEsIHRydWUpO1xuICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgc2NoZW1hOiBtYWNyb1NjaGVtYSxcbiAgICAgICAgc2NoZW1hUGF0aDogY29kZWdlbl8xLm5pbCxcbiAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWAsXG4gICAgICAgIHRvcFNjaGVtYVJlZjogc2NoZW1hUmVmLFxuICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgIH0sIHZhbGlkKTtcbiAgICBjeHQucGFzcyh2YWxpZCwgKCkgPT4gY3h0LmVycm9yKHRydWUpKTtcbn1cbmV4cG9ydHMubWFjcm9LZXl3b3JkQ29kZSA9IG1hY3JvS2V5d29yZENvZGU7XG5mdW5jdGlvbiBmdW5jS2V5d29yZENvZGUoY3h0LCBkZWYpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgeyBnZW4sIGtleXdvcmQsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCAkZGF0YSwgaXQgfSA9IGN4dDtcbiAgICBjaGVja0FzeW5jS2V5d29yZChpdCwgZGVmKTtcbiAgICBjb25zdCB2YWxpZGF0ZSA9ICEkZGF0YSAmJiBkZWYuY29tcGlsZSA/IGRlZi5jb21waWxlLmNhbGwoaXQuc2VsZiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0KSA6IGRlZi52YWxpZGF0ZTtcbiAgICBjb25zdCB2YWxpZGF0ZVJlZiA9IHVzZUtleXdvcmQoZ2VuLCBrZXl3b3JkLCB2YWxpZGF0ZSk7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIik7XG4gICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsIHZhbGlkYXRlS2V5d29yZCk7XG4gICAgY3h0Lm9rKChfYSA9IGRlZi52YWxpZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsaWQpO1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlS2V5d29yZCgpIHtcbiAgICAgICAgaWYgKGRlZi5lcnJvcnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhc3NpZ25WYWxpZCgpO1xuICAgICAgICAgICAgaWYgKGRlZi5tb2RpZnlpbmcpXG4gICAgICAgICAgICAgICAgbW9kaWZ5RGF0YShjeHQpO1xuICAgICAgICAgICAgcmVwb3J0RXJycygoKSA9PiBjeHQuZXJyb3IoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBydWxlRXJycyA9IGRlZi5hc3luYyA/IHZhbGlkYXRlQXN5bmMoKSA6IHZhbGlkYXRlU3luYygpO1xuICAgICAgICAgICAgaWYgKGRlZi5tb2RpZnlpbmcpXG4gICAgICAgICAgICAgICAgbW9kaWZ5RGF0YShjeHQpO1xuICAgICAgICAgICAgcmVwb3J0RXJycygoKSA9PiBhZGRFcnJzKGN4dCwgcnVsZUVycnMpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUFzeW5jKCkge1xuICAgICAgICBjb25zdCBydWxlRXJycyA9IGdlbi5sZXQoXCJydWxlRXJyc1wiLCBudWxsKTtcbiAgICAgICAgZ2VuLnRyeSgoKSA9PiBhc3NpZ25WYWxpZCgoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCBgKSwgKGUpID0+IGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKS5pZigoMCwgY29kZWdlbl8xLl8pIGAke2V9IGluc3RhbmNlb2YgJHtpdC5WYWxpZGF0aW9uRXJyb3J9YCwgKCkgPT4gZ2VuLmFzc2lnbihydWxlRXJycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtlfS5lcnJvcnNgKSwgKCkgPT4gZ2VuLnRocm93KGUpKSk7XG4gICAgICAgIHJldHVybiBydWxlRXJycztcbiAgICB9XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVTeW5jKCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUVycnMgPSAoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlUmVmfS5lcnJvcnNgO1xuICAgICAgICBnZW4uYXNzaWduKHZhbGlkYXRlRXJycywgbnVsbCk7XG4gICAgICAgIGFzc2lnblZhbGlkKGNvZGVnZW5fMS5uaWwpO1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVFcnJzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhc3NpZ25WYWxpZChfYXdhaXQgPSBkZWYuYXN5bmMgPyAoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCBgIDogY29kZWdlbl8xLm5pbCkge1xuICAgICAgICBjb25zdCBwYXNzQ3h0ID0gaXQub3B0cy5wYXNzQ29udGV4dCA/IG5hbWVzXzEuZGVmYXVsdC50aGlzIDogbmFtZXNfMS5kZWZhdWx0LnNlbGY7XG4gICAgICAgIGNvbnN0IHBhc3NTY2hlbWEgPSAhKChcImNvbXBpbGVcIiBpbiBkZWYgJiYgISRkYXRhKSB8fCBkZWYuc2NoZW1hID09PSBmYWxzZSk7XG4gICAgICAgIGdlbi5hc3NpZ24odmFsaWQsICgwLCBjb2RlZ2VuXzEuXykgYCR7X2F3YWl0fSR7KDAsIGNvZGVfMS5jYWxsVmFsaWRhdGVDb2RlKShjeHQsIHZhbGlkYXRlUmVmLCBwYXNzQ3h0LCBwYXNzU2NoZW1hKX1gLCBkZWYubW9kaWZ5aW5nKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwb3J0RXJycyhlcnJvcnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKChfYSA9IGRlZi52YWxpZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsaWQpLCBlcnJvcnMpO1xuICAgIH1cbn1cbmV4cG9ydHMuZnVuY0tleXdvcmRDb2RlID0gZnVuY0tleXdvcmRDb2RlO1xuZnVuY3Rpb24gbW9kaWZ5RGF0YShjeHQpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICBnZW4uaWYoaXQucGFyZW50RGF0YSwgKCkgPT4gZ2VuLmFzc2lnbihkYXRhLCAoMCwgY29kZWdlbl8xLl8pIGAke2l0LnBhcmVudERhdGF9WyR7aXQucGFyZW50RGF0YVByb3BlcnR5fV1gKSk7XG59XG5mdW5jdGlvbiBhZGRFcnJzKGN4dCwgZXJycykge1xuICAgIGNvbnN0IHsgZ2VuIH0gPSBjeHQ7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYEFycmF5LmlzQXJyYXkoJHtlcnJzfSlgLCAoKSA9PiB7XG4gICAgICAgIGdlblxuICAgICAgICAgICAgLmFzc2lnbihuYW1lc18xLmRlZmF1bHQudkVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30gPT09IG51bGwgPyAke2VycnN9IDogJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30uY29uY2F0KCR7ZXJyc30pYClcbiAgICAgICAgICAgIC5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LmVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30ubGVuZ3RoYCk7XG4gICAgICAgICgwLCBlcnJvcnNfMS5leHRlbmRFcnJvcnMpKGN4dCk7XG4gICAgfSwgKCkgPT4gY3h0LmVycm9yKCkpO1xufVxuZnVuY3Rpb24gY2hlY2tBc3luY0tleXdvcmQoeyBzY2hlbWFFbnYgfSwgZGVmKSB7XG4gICAgaWYgKGRlZi5hc3luYyAmJiAhc2NoZW1hRW52LiRhc3luYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXN5bmMga2V5d29yZCBpbiBzeW5jIHNjaGVtYVwiKTtcbn1cbmZ1bmN0aW9uIHVzZUtleXdvcmQoZ2VuLCBrZXl3b3JkLCByZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihga2V5d29yZCBcIiR7a2V5d29yZH1cIiBmYWlsZWQgdG8gY29tcGlsZWApO1xuICAgIHJldHVybiBnZW4uc2NvcGVWYWx1ZShcImtleXdvcmRcIiwgdHlwZW9mIHJlc3VsdCA9PSBcImZ1bmN0aW9uXCIgPyB7IHJlZjogcmVzdWx0IH0gOiB7IHJlZjogcmVzdWx0LCBjb2RlOiAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkocmVzdWx0KSB9KTtcbn1cbmZ1bmN0aW9uIHZhbGlkU2NoZW1hVHlwZShzY2hlbWEsIHNjaGVtYVR5cGUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAvLyBUT0RPIGFkZCB0ZXN0c1xuICAgIHJldHVybiAoIXNjaGVtYVR5cGUubGVuZ3RoIHx8XG4gICAgICAgIHNjaGVtYVR5cGUuc29tZSgoc3QpID0+IHN0ID09PSBcImFycmF5XCJcbiAgICAgICAgICAgID8gQXJyYXkuaXNBcnJheShzY2hlbWEpXG4gICAgICAgICAgICA6IHN0ID09PSBcIm9iamVjdFwiXG4gICAgICAgICAgICAgICAgPyBzY2hlbWEgJiYgdHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSlcbiAgICAgICAgICAgICAgICA6IHR5cGVvZiBzY2hlbWEgPT0gc3QgfHwgKGFsbG93VW5kZWZpbmVkICYmIHR5cGVvZiBzY2hlbWEgPT0gXCJ1bmRlZmluZWRcIikpKTtcbn1cbmV4cG9ydHMudmFsaWRTY2hlbWFUeXBlID0gdmFsaWRTY2hlbWFUeXBlO1xuZnVuY3Rpb24gdmFsaWRhdGVLZXl3b3JkVXNhZ2UoeyBzY2hlbWEsIG9wdHMsIHNlbGYsIGVyclNjaGVtYVBhdGggfSwgZGVmLCBrZXl3b3JkKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmLmtleXdvcmQpID8gIWRlZi5rZXl3b3JkLmluY2x1ZGVzKGtleXdvcmQpIDogZGVmLmtleXdvcmQgIT09IGtleXdvcmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgIH1cbiAgICBjb25zdCBkZXBzID0gZGVmLmRlcGVuZGVuY2llcztcbiAgICBpZiAoZGVwcyA9PT0gbnVsbCB8fCBkZXBzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZXBzLnNvbWUoKGt3ZCkgPT4gIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzY2hlbWEsIGt3ZCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgcGFyZW50IHNjaGVtYSBtdXN0IGhhdmUgZGVwZW5kZW5jaWVzIG9mICR7a2V5d29yZH06ICR7ZGVwcy5qb2luKFwiLFwiKX1gKTtcbiAgICB9XG4gICAgaWYgKGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICBjb25zdCB2YWxpZCA9IGRlZi52YWxpZGF0ZVNjaGVtYShzY2hlbWFba2V5d29yZF0pO1xuICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBga2V5d29yZCBcIiR7a2V5d29yZH1cIiB2YWx1ZSBpcyBpbnZhbGlkIGF0IHBhdGggXCIke2VyclNjaGVtYVBhdGh9XCI6IGAgK1xuICAgICAgICAgICAgICAgIHNlbGYuZXJyb3JzVGV4dChkZWYudmFsaWRhdGVTY2hlbWEuZXJyb3JzKTtcbiAgICAgICAgICAgIGlmIChvcHRzLnZhbGlkYXRlU2NoZW1hID09PSBcImxvZ1wiKVxuICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmVycm9yKG1zZyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlS2V5d29yZFVzYWdlID0gdmFsaWRhdGVLZXl3b3JkVXNhZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXl3b3JkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFNb2RlID0gZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFEYXRhID0gZXhwb3J0cy5nZXRTdWJzY2hlbWEgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuZnVuY3Rpb24gZ2V0U3Vic2NoZW1hKGl0LCB7IGtleXdvcmQsIHNjaGVtYVByb3AsIHNjaGVtYSwgc2NoZW1hUGF0aCwgZXJyU2NoZW1hUGF0aCwgdG9wU2NoZW1hUmVmIH0pIHtcbiAgICBpZiAoa2V5d29yZCAhPT0gdW5kZWZpbmVkICYmIHNjaGVtYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYm90aCBcImtleXdvcmRcIiBhbmQgXCJzY2hlbWFcIiBwYXNzZWQsIG9ubHkgb25lIGFsbG93ZWQnKTtcbiAgICB9XG4gICAgaWYgKGtleXdvcmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBzY2ggPSBpdC5zY2hlbWFba2V5d29yZF07XG4gICAgICAgIHJldHVybiBzY2hlbWFQcm9wID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoLFxuICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6ICgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuc2NoZW1hUGF0aH0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKGtleXdvcmQpfWAsXG4gICAgICAgICAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHNjaFtzY2hlbWFQcm9wXSxcbiAgICAgICAgICAgICAgICBzY2hlbWFQYXRoOiAoMCwgY29kZWdlbl8xLl8pIGAke2l0LnNjaGVtYVBhdGh9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShrZXl3b3JkKX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHNjaGVtYVByb3ApfWAsXG4gICAgICAgICAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfS8keygwLCB1dGlsXzEuZXNjYXBlRnJhZ21lbnQpKHNjaGVtYVByb3ApfWAsXG4gICAgICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoc2NoZW1hICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNjaGVtYVBhdGggPT09IHVuZGVmaW5lZCB8fCBlcnJTY2hlbWFQYXRoID09PSB1bmRlZmluZWQgfHwgdG9wU2NoZW1hUmVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJzY2hlbWFQYXRoXCIsIFwiZXJyU2NoZW1hUGF0aFwiIGFuZCBcInRvcFNjaGVtYVJlZlwiIGFyZSByZXF1aXJlZCB3aXRoIFwic2NoZW1hXCInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NoZW1hLFxuICAgICAgICAgICAgc2NoZW1hUGF0aCxcbiAgICAgICAgICAgIHRvcFNjaGVtYVJlZixcbiAgICAgICAgICAgIGVyclNjaGVtYVBhdGgsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignZWl0aGVyIFwia2V5d29yZFwiIG9yIFwic2NoZW1hXCIgbXVzdCBiZSBwYXNzZWQnKTtcbn1cbmV4cG9ydHMuZ2V0U3Vic2NoZW1hID0gZ2V0U3Vic2NoZW1hO1xuZnVuY3Rpb24gZXh0ZW5kU3Vic2NoZW1hRGF0YShzdWJzY2hlbWEsIGl0LCB7IGRhdGFQcm9wLCBkYXRhUHJvcFR5cGU6IGRwVHlwZSwgZGF0YSwgZGF0YVR5cGVzLCBwcm9wZXJ0eU5hbWUgfSkge1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQgJiYgZGF0YVByb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JvdGggXCJkYXRhXCIgYW5kIFwiZGF0YVByb3BcIiBwYXNzZWQsIG9ubHkgb25lIGFsbG93ZWQnKTtcbiAgICB9XG4gICAgY29uc3QgeyBnZW4gfSA9IGl0O1xuICAgIGlmIChkYXRhUHJvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHsgZXJyb3JQYXRoLCBkYXRhUGF0aEFyciwgb3B0cyB9ID0gaXQ7XG4gICAgICAgIGNvbnN0IG5leHREYXRhID0gZ2VuLmxldChcImRhdGFcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5kYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoZGF0YVByb3ApfWAsIHRydWUpO1xuICAgICAgICBkYXRhQ29udGV4dFByb3BzKG5leHREYXRhKTtcbiAgICAgICAgc3Vic2NoZW1hLmVycm9yUGF0aCA9ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtlcnJvclBhdGh9JHsoMCwgdXRpbF8xLmdldEVycm9yUGF0aCkoZGF0YVByb3AsIGRwVHlwZSwgb3B0cy5qc1Byb3BlcnR5U3ludGF4KX1gO1xuICAgICAgICBzdWJzY2hlbWEucGFyZW50RGF0YVByb3BlcnR5ID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhUHJvcH1gO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YVBhdGhBcnIgPSBbLi4uZGF0YVBhdGhBcnIsIHN1YnNjaGVtYS5wYXJlbnREYXRhUHJvcGVydHldO1xuICAgIH1cbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IG5leHREYXRhID0gZGF0YSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gZGF0YSA6IGdlbi5sZXQoXCJkYXRhXCIsIGRhdGEsIHRydWUpOyAvLyByZXBsYWNlYWJsZSBpZiB1c2VkIG9uY2U/XG4gICAgICAgIGRhdGFDb250ZXh0UHJvcHMobmV4dERhdGEpO1xuICAgICAgICBpZiAocHJvcGVydHlOYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzdWJzY2hlbWEucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICAvLyBUT0RPIHNvbWV0aGluZyBpcyBwb3NzaWJseSB3cm9uZyBoZXJlIHdpdGggbm90IGNoYW5naW5nIHBhcmVudERhdGFQcm9wZXJ0eSBhbmQgbm90IGFwcGVuZGluZyBkYXRhUGF0aEFyclxuICAgIH1cbiAgICBpZiAoZGF0YVR5cGVzKVxuICAgICAgICBzdWJzY2hlbWEuZGF0YVR5cGVzID0gZGF0YVR5cGVzO1xuICAgIGZ1bmN0aW9uIGRhdGFDb250ZXh0UHJvcHMoX25leHREYXRhKSB7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhID0gX25leHREYXRhO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YUxldmVsID0gaXQuZGF0YUxldmVsICsgMTtcbiAgICAgICAgc3Vic2NoZW1hLmRhdGFUeXBlcyA9IFtdO1xuICAgICAgICBpdC5kZWZpbmVkUHJvcGVydGllcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgc3Vic2NoZW1hLnBhcmVudERhdGEgPSBpdC5kYXRhO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YU5hbWVzID0gWy4uLml0LmRhdGFOYW1lcywgX25leHREYXRhXTtcbiAgICB9XG59XG5leHBvcnRzLmV4dGVuZFN1YnNjaGVtYURhdGEgPSBleHRlbmRTdWJzY2hlbWFEYXRhO1xuZnVuY3Rpb24gZXh0ZW5kU3Vic2NoZW1hTW9kZShzdWJzY2hlbWEsIHsganRkRGlzY3JpbWluYXRvciwganRkTWV0YWRhdGEsIGNvbXBvc2l0ZVJ1bGUsIGNyZWF0ZUVycm9ycywgYWxsRXJyb3JzIH0pIHtcbiAgICBpZiAoY29tcG9zaXRlUnVsZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzdWJzY2hlbWEuY29tcG9zaXRlUnVsZSA9IGNvbXBvc2l0ZVJ1bGU7XG4gICAgaWYgKGNyZWF0ZUVycm9ycyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzdWJzY2hlbWEuY3JlYXRlRXJyb3JzID0gY3JlYXRlRXJyb3JzO1xuICAgIGlmIChhbGxFcnJvcnMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgc3Vic2NoZW1hLmFsbEVycm9ycyA9IGFsbEVycm9ycztcbiAgICBzdWJzY2hlbWEuanRkRGlzY3JpbWluYXRvciA9IGp0ZERpc2NyaW1pbmF0b3I7IC8vIG5vdCBpbmhlcml0ZWRcbiAgICBzdWJzY2hlbWEuanRkTWV0YWRhdGEgPSBqdGRNZXRhZGF0YTsgLy8gbm90IGluaGVyaXRlZFxufVxuZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFNb2RlID0gZXh0ZW5kU3Vic2NoZW1hTW9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1YnNjaGVtYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29kZUdlbiA9IGV4cG9ydHMuTmFtZSA9IGV4cG9ydHMubmlsID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLnN0ciA9IGV4cG9ydHMuXyA9IGV4cG9ydHMuS2V5d29yZEN4dCA9IHZvaWQgMDtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS92YWxpZGF0ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIktleXdvcmRDeHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbGlkYXRlXzEuS2V5d29yZEN4dDsgfSB9KTtcbnZhciBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL2NvZGVnZW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuXzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0clwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLnN0cjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0cmluZ2lmeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLnN0cmluZ2lmeTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5pbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLm5pbDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5OYW1lOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29kZUdlblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLkNvZGVHZW47IH0gfSk7XG5jb25zdCB2YWxpZGF0aW9uX2Vycm9yXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3JcIik7XG5jb25zdCByZWZfZXJyb3JfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvcmVmX2Vycm9yXCIpO1xuY29uc3QgcnVsZXNfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvcnVsZXNcIik7XG5jb25zdCBjb21waWxlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlXCIpO1xuY29uc3QgY29kZWdlbl8yID0gcmVxdWlyZShcIi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgcmVzb2x2ZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9yZXNvbHZlXCIpO1xuY29uc3QgZGF0YVR5cGVfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvdmFsaWRhdGUvZGF0YVR5cGVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCAkZGF0YVJlZlNjaGVtYSA9IHJlcXVpcmUoXCIuL3JlZnMvZGF0YS5qc29uXCIpO1xuY29uc3QgdXJpXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lL3VyaVwiKTtcbmNvbnN0IGRlZmF1bHRSZWdFeHAgPSAoc3RyLCBmbGFncykgPT4gbmV3IFJlZ0V4cChzdHIsIGZsYWdzKTtcbmRlZmF1bHRSZWdFeHAuY29kZSA9IFwibmV3IFJlZ0V4cFwiO1xuY29uc3QgTUVUQV9JR05PUkVfT1BUSU9OUyA9IFtcInJlbW92ZUFkZGl0aW9uYWxcIiwgXCJ1c2VEZWZhdWx0c1wiLCBcImNvZXJjZVR5cGVzXCJdO1xuY29uc3QgRVhUX1NDT1BFX05BTUVTID0gbmV3IFNldChbXG4gICAgXCJ2YWxpZGF0ZVwiLFxuICAgIFwic2VyaWFsaXplXCIsXG4gICAgXCJwYXJzZVwiLFxuICAgIFwid3JhcHBlclwiLFxuICAgIFwicm9vdFwiLFxuICAgIFwic2NoZW1hXCIsXG4gICAgXCJrZXl3b3JkXCIsXG4gICAgXCJwYXR0ZXJuXCIsXG4gICAgXCJmb3JtYXRzXCIsXG4gICAgXCJ2YWxpZGF0ZSRkYXRhXCIsXG4gICAgXCJmdW5jXCIsXG4gICAgXCJvYmpcIixcbiAgICBcIkVycm9yXCIsXG5dKTtcbmNvbnN0IHJlbW92ZWRPcHRpb25zID0ge1xuICAgIGVycm9yRGF0YVBhdGg6IFwiXCIsXG4gICAgZm9ybWF0OiBcImB2YWxpZGF0ZUZvcm1hdHM6IGZhbHNlYCBjYW4gYmUgdXNlZCBpbnN0ZWFkLlwiLFxuICAgIG51bGxhYmxlOiAnXCJudWxsYWJsZVwiIGtleXdvcmQgaXMgc3VwcG9ydGVkIGJ5IGRlZmF1bHQuJyxcbiAgICBqc29uUG9pbnRlcnM6IFwiRGVwcmVjYXRlZCBqc1Byb3BlcnR5U3ludGF4IGNhbiBiZSB1c2VkIGluc3RlYWQuXCIsXG4gICAgZXh0ZW5kUmVmczogXCJEZXByZWNhdGVkIGlnbm9yZUtleXdvcmRzV2l0aFJlZiBjYW4gYmUgdXNlZCBpbnN0ZWFkLlwiLFxuICAgIG1pc3NpbmdSZWZzOiBcIlBhc3MgZW1wdHkgc2NoZW1hIHdpdGggJGlkIHRoYXQgc2hvdWxkIGJlIGlnbm9yZWQgdG8gYWp2LmFkZFNjaGVtYS5cIixcbiAgICBwcm9jZXNzQ29kZTogXCJVc2Ugb3B0aW9uIGBjb2RlOiB7cHJvY2VzczogKGNvZGUsIHNjaGVtYUVudjogb2JqZWN0KSA9PiBzdHJpbmd9YFwiLFxuICAgIHNvdXJjZUNvZGU6IFwiVXNlIG9wdGlvbiBgY29kZToge3NvdXJjZTogdHJ1ZX1gXCIsXG4gICAgc3RyaWN0RGVmYXVsdHM6IFwiSXQgaXMgZGVmYXVsdCBub3csIHNlZSBvcHRpb24gYHN0cmljdGAuXCIsXG4gICAgc3RyaWN0S2V5d29yZHM6IFwiSXQgaXMgZGVmYXVsdCBub3csIHNlZSBvcHRpb24gYHN0cmljdGAuXCIsXG4gICAgdW5pcXVlSXRlbXM6ICdcInVuaXF1ZUl0ZW1zXCIga2V5d29yZCBpcyBhbHdheXMgdmFsaWRhdGVkLicsXG4gICAgdW5rbm93bkZvcm1hdHM6IFwiRGlzYWJsZSBzdHJpY3QgbW9kZSBvciBwYXNzIGB0cnVlYCB0byBgYWp2LmFkZEZvcm1hdGAgKG9yIGBmb3JtYXRzYCBvcHRpb24pLlwiLFxuICAgIGNhY2hlOiBcIk1hcCBpcyB1c2VkIGFzIGNhY2hlLCBzY2hlbWEgb2JqZWN0IGFzIGtleS5cIixcbiAgICBzZXJpYWxpemU6IFwiTWFwIGlzIHVzZWQgYXMgY2FjaGUsIHNjaGVtYSBvYmplY3QgYXMga2V5LlwiLFxuICAgIGFqdkVycm9yczogXCJJdCBpcyBkZWZhdWx0IG5vdy5cIixcbn07XG5jb25zdCBkZXByZWNhdGVkT3B0aW9ucyA9IHtcbiAgICBpZ25vcmVLZXl3b3Jkc1dpdGhSZWY6IFwiXCIsXG4gICAganNQcm9wZXJ0eVN5bnRheDogXCJcIixcbiAgICB1bmljb2RlOiAnXCJtaW5MZW5ndGhcIi9cIm1heExlbmd0aFwiIGFjY291bnQgZm9yIHVuaWNvZGUgY2hhcmFjdGVycyBieSBkZWZhdWx0LicsXG59O1xuY29uc3QgTUFYX0VYUFJFU1NJT04gPSAyMDA7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuZnVuY3Rpb24gcmVxdWlyZWRPcHRpb25zKG8pIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcSwgX3IsIF9zLCBfdCwgX3UsIF92LCBfdywgX3gsIF95LCBfeiwgXzA7XG4gICAgY29uc3QgcyA9IG8uc3RyaWN0O1xuICAgIGNvbnN0IF9vcHR6ID0gKF9hID0gby5jb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0aW1pemU7XG4gICAgY29uc3Qgb3B0aW1pemUgPSBfb3B0eiA9PT0gdHJ1ZSB8fCBfb3B0eiA9PT0gdW5kZWZpbmVkID8gMSA6IF9vcHR6IHx8IDA7XG4gICAgY29uc3QgcmVnRXhwID0gKF9jID0gKF9iID0gby5jb2RlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVnRXhwKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBkZWZhdWx0UmVnRXhwO1xuICAgIGNvbnN0IHVyaVJlc29sdmVyID0gKF9kID0gby51cmlSZXNvbHZlcikgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogdXJpXzEuZGVmYXVsdDtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdHJpY3RTY2hlbWE6IChfZiA9IChfZSA9IG8uc3RyaWN0U2NoZW1hKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiBzKSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiB0cnVlLFxuICAgICAgICBzdHJpY3ROdW1iZXJzOiAoX2ggPSAoX2cgPSBvLnN0cmljdE51bWJlcnMpICE9PSBudWxsICYmIF9nICE9PSB2b2lkIDAgPyBfZyA6IHMpICE9PSBudWxsICYmIF9oICE9PSB2b2lkIDAgPyBfaCA6IHRydWUsXG4gICAgICAgIHN0cmljdFR5cGVzOiAoX2sgPSAoX2ogPSBvLnN0cmljdFR5cGVzKSAhPT0gbnVsbCAmJiBfaiAhPT0gdm9pZCAwID8gX2ogOiBzKSAhPT0gbnVsbCAmJiBfayAhPT0gdm9pZCAwID8gX2sgOiBcImxvZ1wiLFxuICAgICAgICBzdHJpY3RUdXBsZXM6IChfbSA9IChfbCA9IG8uc3RyaWN0VHVwbGVzKSAhPT0gbnVsbCAmJiBfbCAhPT0gdm9pZCAwID8gX2wgOiBzKSAhPT0gbnVsbCAmJiBfbSAhPT0gdm9pZCAwID8gX20gOiBcImxvZ1wiLFxuICAgICAgICBzdHJpY3RSZXF1aXJlZDogKF9wID0gKF9vID0gby5zdHJpY3RSZXF1aXJlZCkgIT09IG51bGwgJiYgX28gIT09IHZvaWQgMCA/IF9vIDogcykgIT09IG51bGwgJiYgX3AgIT09IHZvaWQgMCA/IF9wIDogZmFsc2UsXG4gICAgICAgIGNvZGU6IG8uY29kZSA/IHsgLi4uby5jb2RlLCBvcHRpbWl6ZSwgcmVnRXhwIH0gOiB7IG9wdGltaXplLCByZWdFeHAgfSxcbiAgICAgICAgbG9vcFJlcXVpcmVkOiAoX3EgPSBvLmxvb3BSZXF1aXJlZCkgIT09IG51bGwgJiYgX3EgIT09IHZvaWQgMCA/IF9xIDogTUFYX0VYUFJFU1NJT04sXG4gICAgICAgIGxvb3BFbnVtOiAoX3IgPSBvLmxvb3BFbnVtKSAhPT0gbnVsbCAmJiBfciAhPT0gdm9pZCAwID8gX3IgOiBNQVhfRVhQUkVTU0lPTixcbiAgICAgICAgbWV0YTogKF9zID0gby5tZXRhKSAhPT0gbnVsbCAmJiBfcyAhPT0gdm9pZCAwID8gX3MgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlczogKF90ID0gby5tZXNzYWdlcykgIT09IG51bGwgJiYgX3QgIT09IHZvaWQgMCA/IF90IDogdHJ1ZSxcbiAgICAgICAgaW5saW5lUmVmczogKF91ID0gby5pbmxpbmVSZWZzKSAhPT0gbnVsbCAmJiBfdSAhPT0gdm9pZCAwID8gX3UgOiB0cnVlLFxuICAgICAgICBzY2hlbWFJZDogKF92ID0gby5zY2hlbWFJZCkgIT09IG51bGwgJiYgX3YgIT09IHZvaWQgMCA/IF92IDogXCIkaWRcIixcbiAgICAgICAgYWRkVXNlZFNjaGVtYTogKF93ID0gby5hZGRVc2VkU2NoZW1hKSAhPT0gbnVsbCAmJiBfdyAhPT0gdm9pZCAwID8gX3cgOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZVNjaGVtYTogKF94ID0gby52YWxpZGF0ZVNjaGVtYSkgIT09IG51bGwgJiYgX3ggIT09IHZvaWQgMCA/IF94IDogdHJ1ZSxcbiAgICAgICAgdmFsaWRhdGVGb3JtYXRzOiAoX3kgPSBvLnZhbGlkYXRlRm9ybWF0cykgIT09IG51bGwgJiYgX3kgIT09IHZvaWQgMCA/IF95IDogdHJ1ZSxcbiAgICAgICAgdW5pY29kZVJlZ0V4cDogKF96ID0gby51bmljb2RlUmVnRXhwKSAhPT0gbnVsbCAmJiBfeiAhPT0gdm9pZCAwID8gX3ogOiB0cnVlLFxuICAgICAgICBpbnQzMnJhbmdlOiAoXzAgPSBvLmludDMycmFuZ2UpICE9PSBudWxsICYmIF8wICE9PSB2b2lkIDAgPyBfMCA6IHRydWUsXG4gICAgICAgIHVyaVJlc29sdmVyOiB1cmlSZXNvbHZlcixcbiAgICB9O1xufVxuY2xhc3MgQWp2IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5zY2hlbWFzID0ge307XG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLmZvcm1hdHMgPSB7fTtcbiAgICAgICAgdGhpcy5fY29tcGlsYXRpb25zID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl9sb2FkaW5nID0ge307XG4gICAgICAgIHRoaXMuX2NhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICBvcHRzID0gdGhpcy5vcHRzID0geyAuLi5vcHRzLCAuLi5yZXF1aXJlZE9wdGlvbnMob3B0cykgfTtcbiAgICAgICAgY29uc3QgeyBlczUsIGxpbmVzIH0gPSB0aGlzLm9wdHMuY29kZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IG5ldyBjb2RlZ2VuXzIuVmFsdWVTY29wZSh7IHNjb3BlOiB7fSwgcHJlZml4ZXM6IEVYVF9TQ09QRV9OQU1FUywgZXM1LCBsaW5lcyB9KTtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBnZXRMb2dnZXIob3B0cy5sb2dnZXIpO1xuICAgICAgICBjb25zdCBmb3JtYXRPcHQgPSBvcHRzLnZhbGlkYXRlRm9ybWF0cztcbiAgICAgICAgb3B0cy52YWxpZGF0ZUZvcm1hdHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5SVUxFUyA9ICgwLCBydWxlc18xLmdldFJ1bGVzKSgpO1xuICAgICAgICBjaGVja09wdGlvbnMuY2FsbCh0aGlzLCByZW1vdmVkT3B0aW9ucywgb3B0cywgXCJOT1QgU1VQUE9SVEVEXCIpO1xuICAgICAgICBjaGVja09wdGlvbnMuY2FsbCh0aGlzLCBkZXByZWNhdGVkT3B0aW9ucywgb3B0cywgXCJERVBSRUNBVEVEXCIsIFwid2FyblwiKTtcbiAgICAgICAgdGhpcy5fbWV0YU9wdHMgPSBnZXRNZXRhU2NoZW1hT3B0aW9ucy5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAob3B0cy5mb3JtYXRzKVxuICAgICAgICAgICAgYWRkSW5pdGlhbEZvcm1hdHMuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkVm9jYWJ1bGFyaWVzKCk7XG4gICAgICAgIHRoaXMuX2FkZERlZmF1bHRNZXRhU2NoZW1hKCk7XG4gICAgICAgIGlmIChvcHRzLmtleXdvcmRzKVxuICAgICAgICAgICAgYWRkSW5pdGlhbEtleXdvcmRzLmNhbGwodGhpcywgb3B0cy5rZXl3b3Jkcyk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5tZXRhID09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB0aGlzLmFkZE1ldGFTY2hlbWEob3B0cy5tZXRhKTtcbiAgICAgICAgYWRkSW5pdGlhbFNjaGVtYXMuY2FsbCh0aGlzKTtcbiAgICAgICAgb3B0cy52YWxpZGF0ZUZvcm1hdHMgPSBmb3JtYXRPcHQ7XG4gICAgfVxuICAgIF9hZGRWb2NhYnVsYXJpZXMoKSB7XG4gICAgICAgIHRoaXMuYWRkS2V5d29yZChcIiRhc3luY1wiKTtcbiAgICB9XG4gICAgX2FkZERlZmF1bHRNZXRhU2NoZW1hKCkge1xuICAgICAgICBjb25zdCB7ICRkYXRhLCBtZXRhLCBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICBsZXQgX2RhdGFSZWZTY2hlbWEgPSAkZGF0YVJlZlNjaGVtYTtcbiAgICAgICAgaWYgKHNjaGVtYUlkID09PSBcImlkXCIpIHtcbiAgICAgICAgICAgIF9kYXRhUmVmU2NoZW1hID0geyAuLi4kZGF0YVJlZlNjaGVtYSB9O1xuICAgICAgICAgICAgX2RhdGFSZWZTY2hlbWEuaWQgPSBfZGF0YVJlZlNjaGVtYS4kaWQ7XG4gICAgICAgICAgICBkZWxldGUgX2RhdGFSZWZTY2hlbWEuJGlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRhICYmICRkYXRhKVxuICAgICAgICAgICAgdGhpcy5hZGRNZXRhU2NoZW1hKF9kYXRhUmVmU2NoZW1hLCBfZGF0YVJlZlNjaGVtYVtzY2hlbWFJZF0sIGZhbHNlKTtcbiAgICB9XG4gICAgZGVmYXVsdE1ldGEoKSB7XG4gICAgICAgIGNvbnN0IHsgbWV0YSwgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdHMuZGVmYXVsdE1ldGEgPSB0eXBlb2YgbWV0YSA9PSBcIm9iamVjdFwiID8gbWV0YVtzY2hlbWFJZF0gfHwgbWV0YSA6IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHZhbGlkYXRlKHNjaGVtYUtleVJlZiwgLy8ga2V5LCByZWYgb3Igc2NoZW1hIG9iamVjdFxuICAgIGRhdGEgLy8gdG8gYmUgdmFsaWRhdGVkXG4gICAgKSB7XG4gICAgICAgIGxldCB2O1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYUtleVJlZiA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5nZXRTY2hlbWEoc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgICAgIGlmICghdilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIHNjaGVtYSB3aXRoIGtleSBvciByZWYgXCIke3NjaGVtYUtleVJlZn1cImApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdiA9IHRoaXMuY29tcGlsZShzY2hlbWFLZXlSZWYpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkID0gdihkYXRhKTtcbiAgICAgICAgaWYgKCEoXCIkYXN5bmNcIiBpbiB2KSlcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gdi5lcnJvcnM7XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9XG4gICAgY29tcGlsZShzY2hlbWEsIF9tZXRhKSB7XG4gICAgICAgIGNvbnN0IHNjaCA9IHRoaXMuX2FkZFNjaGVtYShzY2hlbWEsIF9tZXRhKTtcbiAgICAgICAgcmV0dXJuIChzY2gudmFsaWRhdGUgfHwgdGhpcy5fY29tcGlsZVNjaGVtYUVudihzY2gpKTtcbiAgICB9XG4gICAgY29tcGlsZUFzeW5jKHNjaGVtYSwgbWV0YSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5sb2FkU2NoZW1hICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucy5sb2FkU2NoZW1hIHNob3VsZCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbG9hZFNjaGVtYSB9ID0gdGhpcy5vcHRzO1xuICAgICAgICByZXR1cm4gcnVuQ29tcGlsZUFzeW5jLmNhbGwodGhpcywgc2NoZW1hLCBtZXRhKTtcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gcnVuQ29tcGlsZUFzeW5jKF9zY2hlbWEsIF9tZXRhKSB7XG4gICAgICAgICAgICBhd2FpdCBsb2FkTWV0YVNjaGVtYS5jYWxsKHRoaXMsIF9zY2hlbWEuJHNjaGVtYSk7XG4gICAgICAgICAgICBjb25zdCBzY2ggPSB0aGlzLl9hZGRTY2hlbWEoX3NjaGVtYSwgX21ldGEpO1xuICAgICAgICAgICAgcmV0dXJuIHNjaC52YWxpZGF0ZSB8fCBfY29tcGlsZUFzeW5jLmNhbGwodGhpcywgc2NoKTtcbiAgICAgICAgfVxuICAgICAgICBhc3luYyBmdW5jdGlvbiBsb2FkTWV0YVNjaGVtYSgkcmVmKSB7XG4gICAgICAgICAgICBpZiAoJHJlZiAmJiAhdGhpcy5nZXRTY2hlbWEoJHJlZikpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBydW5Db21waWxlQXN5bmMuY2FsbCh0aGlzLCB7ICRyZWYgfSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gX2NvbXBpbGVBc3luYyhzY2gpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVTY2hlbWFFbnYoc2NoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIHJlZl9lcnJvcl8xLmRlZmF1bHQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIGNoZWNrTG9hZGVkLmNhbGwodGhpcywgZSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgbG9hZE1pc3NpbmdTY2hlbWEuY2FsbCh0aGlzLCBlLm1pc3NpbmdTY2hlbWEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29tcGlsZUFzeW5jLmNhbGwodGhpcywgc2NoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0xvYWRlZCh7IG1pc3NpbmdTY2hlbWE6IHJlZiwgbWlzc2luZ1JlZiB9KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWZzW3JlZl0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFueVNjaGVtYSAke3JlZn0gaXMgbG9hZGVkIGJ1dCAke21pc3NpbmdSZWZ9IGNhbm5vdCBiZSByZXNvbHZlZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRNaXNzaW5nU2NoZW1hKHJlZikge1xuICAgICAgICAgICAgY29uc3QgX3NjaGVtYSA9IGF3YWl0IF9sb2FkU2NoZW1hLmNhbGwodGhpcywgcmVmKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWZzW3JlZl0pXG4gICAgICAgICAgICAgICAgYXdhaXQgbG9hZE1ldGFTY2hlbWEuY2FsbCh0aGlzLCBfc2NoZW1hLiRzY2hlbWEpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlZnNbcmVmXSlcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNjaGVtYShfc2NoZW1hLCByZWYsIG1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIF9sb2FkU2NoZW1hKHJlZikge1xuICAgICAgICAgICAgY29uc3QgcCA9IHRoaXMuX2xvYWRpbmdbcmVmXTtcbiAgICAgICAgICAgIGlmIChwKVxuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgKHRoaXMuX2xvYWRpbmdbcmVmXSA9IGxvYWRTY2hlbWEocmVmKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbG9hZGluZ1tyZWZdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEFkZHMgc2NoZW1hIHRvIHRoZSBpbnN0YW5jZVxuICAgIGFkZFNjaGVtYShzY2hlbWEsIC8vIElmIGFycmF5IGlzIHBhc3NlZCwgYGtleWAgd2lsbCBiZSBpZ25vcmVkXG4gICAga2V5LCAvLyBPcHRpb25hbCBzY2hlbWEga2V5LiBDYW4gYmUgcGFzc2VkIHRvIGB2YWxpZGF0ZWAgbWV0aG9kIGluc3RlYWQgb2Ygc2NoZW1hIG9iamVjdCBvciBpZC9yZWYuIE9uZSBzY2hlbWEgcGVyIGluc3RhbmNlIGNhbiBoYXZlIGVtcHR5IGBpZGAgYW5kIGBrZXlgLlxuICAgIF9tZXRhLCAvLyB0cnVlIGlmIHNjaGVtYSBpcyBhIG1ldGEtc2NoZW1hLiBVc2VkIGludGVybmFsbHksIGFkZE1ldGFTY2hlbWEgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgICBfdmFsaWRhdGVTY2hlbWEgPSB0aGlzLm9wdHMudmFsaWRhdGVTY2hlbWEgLy8gZmFsc2UgdG8gc2tpcCBzY2hlbWEgdmFsaWRhdGlvbi4gVXNlZCBpbnRlcm5hbGx5LCBvcHRpb24gdmFsaWRhdGVTY2hlbWEgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgICApIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY2ggb2Ygc2NoZW1hKVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hKHNjaCwgdW5kZWZpbmVkLCBfbWV0YSwgX3ZhbGlkYXRlU2NoZW1hKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpZDtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgICAgIGlkID0gc2NoZW1hW3NjaGVtYUlkXTtcbiAgICAgICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBpZCAhPSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzY2hlbWEgJHtzY2hlbWFJZH0gbXVzdCBiZSBzdHJpbmdgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXkgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShrZXkgfHwgaWQpO1xuICAgICAgICB0aGlzLl9jaGVja1VuaXF1ZShrZXkpO1xuICAgICAgICB0aGlzLnNjaGVtYXNba2V5XSA9IHRoaXMuX2FkZFNjaGVtYShzY2hlbWEsIF9tZXRhLCBrZXksIF92YWxpZGF0ZVNjaGVtYSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBBZGQgc2NoZW1hIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHZhbGlkYXRlIG90aGVyIHNjaGVtYXNcbiAgICAvLyBvcHRpb25zIGluIE1FVEFfSUdOT1JFX09QVElPTlMgYXJlIGFsd2F5IHNldCB0byBmYWxzZVxuICAgIGFkZE1ldGFTY2hlbWEoc2NoZW1hLCBrZXksIC8vIHNjaGVtYSBrZXlcbiAgICBfdmFsaWRhdGVTY2hlbWEgPSB0aGlzLm9wdHMudmFsaWRhdGVTY2hlbWEgLy8gZmFsc2UgdG8gc2tpcCBzY2hlbWEgdmFsaWRhdGlvbiwgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdmFsaWRhdGVTY2hlbWEgb3B0aW9uIGZvciBtZXRhLXNjaGVtYVxuICAgICkge1xuICAgICAgICB0aGlzLmFkZFNjaGVtYShzY2hlbWEsIGtleSwgdHJ1ZSwgX3ZhbGlkYXRlU2NoZW1hKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vICBWYWxpZGF0ZSBzY2hlbWEgYWdhaW5zdCBpdHMgbWV0YS1zY2hlbWFcbiAgICB2YWxpZGF0ZVNjaGVtYShzY2hlbWEsIHRocm93T3JMb2dFcnJvcikge1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBsZXQgJHNjaGVtYTtcbiAgICAgICAgJHNjaGVtYSA9IHNjaGVtYS4kc2NoZW1hO1xuICAgICAgICBpZiAoJHNjaGVtYSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiAkc2NoZW1hICE9IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIiRzY2hlbWEgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICAkc2NoZW1hID0gJHNjaGVtYSB8fCB0aGlzLm9wdHMuZGVmYXVsdE1ldGEgfHwgdGhpcy5kZWZhdWx0TWV0YSgpO1xuICAgICAgICBpZiAoISRzY2hlbWEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJtZXRhLXNjaGVtYSBub3QgYXZhaWxhYmxlXCIpO1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLnZhbGlkYXRlKCRzY2hlbWEsIHNjaGVtYSk7XG4gICAgICAgIGlmICghdmFsaWQgJiYgdGhyb3dPckxvZ0Vycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gXCJzY2hlbWEgaXMgaW52YWxpZDogXCIgKyB0aGlzLmVycm9yc1RleHQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudmFsaWRhdGVTY2hlbWEgPT09IFwibG9nXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9XG4gICAgLy8gR2V0IGNvbXBpbGVkIHNjaGVtYSBieSBga2V5YCBvciBgcmVmYC5cbiAgICAvLyAoYGtleWAgdGhhdCB3YXMgcGFzc2VkIHRvIGBhZGRTY2hlbWFgIG9yIGZ1bGwgc2NoZW1hIHJlZmVyZW5jZSAtIGBzY2hlbWEuJGlkYCBvciByZXNvbHZlZCBpZClcbiAgICBnZXRTY2hlbWEoa2V5UmVmKSB7XG4gICAgICAgIGxldCBzY2g7XG4gICAgICAgIHdoaWxlICh0eXBlb2YgKHNjaCA9IGdldFNjaEVudi5jYWxsKHRoaXMsIGtleVJlZikpID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBrZXlSZWYgPSBzY2g7XG4gICAgICAgIGlmIChzY2ggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBjb21waWxlXzEuU2NoZW1hRW52KHsgc2NoZW1hOiB7fSwgc2NoZW1hSWQgfSk7XG4gICAgICAgICAgICBzY2ggPSBjb21waWxlXzEucmVzb2x2ZVNjaGVtYS5jYWxsKHRoaXMsIHJvb3QsIGtleVJlZik7XG4gICAgICAgICAgICBpZiAoIXNjaClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnJlZnNba2V5UmVmXSA9IHNjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHNjaC52YWxpZGF0ZSB8fCB0aGlzLl9jb21waWxlU2NoZW1hRW52KHNjaCkpO1xuICAgIH1cbiAgICAvLyBSZW1vdmUgY2FjaGVkIHNjaGVtYShzKS5cbiAgICAvLyBJZiBubyBwYXJhbWV0ZXIgaXMgcGFzc2VkIGFsbCBzY2hlbWFzIGJ1dCBtZXRhLXNjaGVtYXMgYXJlIHJlbW92ZWQuXG4gICAgLy8gSWYgUmVnRXhwIGlzIHBhc3NlZCBhbGwgc2NoZW1hcyB3aXRoIGtleS9pZCBtYXRjaGluZyBwYXR0ZXJuIGJ1dCBtZXRhLXNjaGVtYXMgYXJlIHJlbW92ZWQuXG4gICAgLy8gRXZlbiBpZiBzY2hlbWEgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBzY2hlbWFzIGl0IHN0aWxsIGNhbiBiZSByZW1vdmVkIGFzIG90aGVyIHNjaGVtYXMgaGF2ZSBsb2NhbCByZWZlcmVuY2VzLlxuICAgIHJlbW92ZVNjaGVtYShzY2hlbWFLZXlSZWYpIHtcbiAgICAgICAgaWYgKHNjaGVtYUtleVJlZiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQWxsU2NoZW1hcyh0aGlzLnNjaGVtYXMsIHNjaGVtYUtleVJlZik7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxTY2hlbWFzKHRoaXMucmVmcywgc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHNjaGVtYUtleVJlZikge1xuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUFsbFNjaGVtYXModGhpcy5zY2hlbWFzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxTY2hlbWFzKHRoaXMucmVmcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjaCA9IGdldFNjaEVudi5jYWxsKHRoaXMsIHNjaGVtYUtleVJlZik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2ggPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKHNjaC5zY2hlbWEpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNjaGVtYXNbc2NoZW1hS2V5UmVmXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5yZWZzW3NjaGVtYUtleVJlZl07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWNoZUtleSA9IHNjaGVtYUtleVJlZjtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoY2FjaGVLZXkpO1xuICAgICAgICAgICAgICAgIGxldCBpZCA9IHNjaGVtYUtleVJlZlt0aGlzLm9wdHMuc2NoZW1hSWRdO1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZCA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2NoZW1hc1tpZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlZnNbaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2LnJlbW92ZVNjaGVtYTogaW52YWxpZCBwYXJhbWV0ZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIFwidm9jYWJ1bGFyeVwiIC0gYSBjb2xsZWN0aW9uIG9mIGtleXdvcmRzXG4gICAgYWRkVm9jYWJ1bGFyeShkZWZpbml0aW9ucykge1xuICAgICAgICBmb3IgKGNvbnN0IGRlZiBvZiBkZWZpbml0aW9ucylcbiAgICAgICAgICAgIHRoaXMuYWRkS2V5d29yZChkZWYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkS2V5d29yZChrd2RPckRlZiwgZGVmIC8vIGRlcHJlY2F0ZWRcbiAgICApIHtcbiAgICAgICAgbGV0IGtleXdvcmQ7XG4gICAgICAgIGlmICh0eXBlb2Yga3dkT3JEZWYgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAga2V5d29yZCA9IGt3ZE9yRGVmO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWYgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJ0aGVzZSBwYXJhbWV0ZXJzIGFyZSBkZXByZWNhdGVkLCBzZWUgZG9jcyBmb3IgYWRkS2V5d29yZFwiKTtcbiAgICAgICAgICAgICAgICBkZWYua2V5d29yZCA9IGtleXdvcmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGt3ZE9yRGVmID09IFwib2JqZWN0XCIgJiYgZGVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlZiA9IGt3ZE9yRGVmO1xuICAgICAgICAgICAga2V5d29yZCA9IGRlZi5rZXl3b3JkO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5d29yZCkgJiYgIWtleXdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWRkS2V5d29yZHM6IGtleXdvcmQgbXVzdCBiZSBzdHJpbmcgb3Igbm9uLWVtcHR5IGFycmF5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBhZGRLZXl3b3JkcyBwYXJhbWV0ZXJzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNoZWNrS2V5d29yZC5jYWxsKHRoaXMsIGtleXdvcmQsIGRlZik7XG4gICAgICAgIGlmICghZGVmKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmVhY2hJdGVtKShrZXl3b3JkLCAoa3dkKSA9PiBhZGRSdWxlLmNhbGwodGhpcywga3dkKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBrZXl3b3JkTWV0YXNjaGVtYS5jYWxsKHRoaXMsIGRlZik7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb24gPSB7XG4gICAgICAgICAgICAuLi5kZWYsXG4gICAgICAgICAgICB0eXBlOiAoMCwgZGF0YVR5cGVfMS5nZXRKU09OVHlwZXMpKGRlZi50eXBlKSxcbiAgICAgICAgICAgIHNjaGVtYVR5cGU6ICgwLCBkYXRhVHlwZV8xLmdldEpTT05UeXBlcykoZGVmLnNjaGVtYVR5cGUpLFxuICAgICAgICB9O1xuICAgICAgICAoMCwgdXRpbF8xLmVhY2hJdGVtKShrZXl3b3JkLCBkZWZpbml0aW9uLnR5cGUubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IChrKSA9PiBhZGRSdWxlLmNhbGwodGhpcywgaywgZGVmaW5pdGlvbilcbiAgICAgICAgICAgIDogKGspID0+IGRlZmluaXRpb24udHlwZS5mb3JFYWNoKCh0KSA9PiBhZGRSdWxlLmNhbGwodGhpcywgaywgZGVmaW5pdGlvbiwgdCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldEtleXdvcmQoa2V5d29yZCkge1xuICAgICAgICBjb25zdCBydWxlID0gdGhpcy5SVUxFUy5hbGxba2V5d29yZF07XG4gICAgICAgIHJldHVybiB0eXBlb2YgcnVsZSA9PSBcIm9iamVjdFwiID8gcnVsZS5kZWZpbml0aW9uIDogISFydWxlO1xuICAgIH1cbiAgICAvLyBSZW1vdmUga2V5d29yZFxuICAgIHJlbW92ZUtleXdvcmQoa2V5d29yZCkge1xuICAgICAgICAvLyBUT0RPIHJldHVybiB0eXBlIHNob3VsZCBiZSBBanZcbiAgICAgICAgY29uc3QgeyBSVUxFUyB9ID0gdGhpcztcbiAgICAgICAgZGVsZXRlIFJVTEVTLmtleXdvcmRzW2tleXdvcmRdO1xuICAgICAgICBkZWxldGUgUlVMRVMuYWxsW2tleXdvcmRdO1xuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIFJVTEVTLnJ1bGVzKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gZ3JvdXAucnVsZXMuZmluZEluZGV4KChydWxlKSA9PiBydWxlLmtleXdvcmQgPT09IGtleXdvcmQpO1xuICAgICAgICAgICAgaWYgKGkgPj0gMClcbiAgICAgICAgICAgICAgICBncm91cC5ydWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIEFkZCBmb3JtYXRcbiAgICBhZGRGb3JtYXQobmFtZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBmb3JtYXQgPSBuZXcgUmVnRXhwKGZvcm1hdCk7XG4gICAgICAgIHRoaXMuZm9ybWF0c1tuYW1lXSA9IGZvcm1hdDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVycm9yc1RleHQoZXJyb3JzID0gdGhpcy5lcnJvcnMsIC8vIG9wdGlvbmFsIGFycmF5IG9mIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgeyBzZXBhcmF0b3IgPSBcIiwgXCIsIGRhdGFWYXIgPSBcImRhdGFcIiB9ID0ge30gLy8gb3B0aW9uYWwgb3B0aW9ucyB3aXRoIHByb3BlcnRpZXMgYHNlcGFyYXRvcmAgYW5kIGBkYXRhVmFyYFxuICAgICkge1xuICAgICAgICBpZiAoIWVycm9ycyB8fCBlcnJvcnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIFwiTm8gZXJyb3JzXCI7XG4gICAgICAgIHJldHVybiBlcnJvcnNcbiAgICAgICAgICAgIC5tYXAoKGUpID0+IGAke2RhdGFWYXJ9JHtlLmluc3RhbmNlUGF0aH0gJHtlLm1lc3NhZ2V9YClcbiAgICAgICAgICAgIC5yZWR1Y2UoKHRleHQsIG1zZykgPT4gdGV4dCArIHNlcGFyYXRvciArIG1zZyk7XG4gICAgfVxuICAgICRkYXRhTWV0YVNjaGVtYShtZXRhU2NoZW1hLCBrZXl3b3Jkc0pzb25Qb2ludGVycykge1xuICAgICAgICBjb25zdCBydWxlcyA9IHRoaXMuUlVMRVMuYWxsO1xuICAgICAgICBtZXRhU2NoZW1hID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXRhU2NoZW1hKSk7XG4gICAgICAgIGZvciAoY29uc3QganNvblBvaW50ZXIgb2Yga2V5d29yZHNKc29uUG9pbnRlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzID0ganNvblBvaW50ZXIuc3BsaXQoXCIvXCIpLnNsaWNlKDEpOyAvLyBmaXJzdCBzZWdtZW50IGlzIGFuIGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgbGV0IGtleXdvcmRzID0gbWV0YVNjaGVtYTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnIG9mIHNlZ21lbnRzKVxuICAgICAgICAgICAgICAgIGtleXdvcmRzID0ga2V5d29yZHNbc2VnXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcnVsZSA9IHJ1bGVzW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBydWxlICE9IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgJGRhdGEgfSA9IHJ1bGUuZGVmaW5pdGlvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWEgPSBrZXl3b3Jkc1trZXldO1xuICAgICAgICAgICAgICAgIGlmICgkZGF0YSAmJiBzY2hlbWEpXG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmRzW2tleV0gPSBzY2hlbWFPckRhdGEoc2NoZW1hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWV0YVNjaGVtYTtcbiAgICB9XG4gICAgX3JlbW92ZUFsbFNjaGVtYXMoc2NoZW1hcywgcmVnZXgpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXlSZWYgaW4gc2NoZW1hcykge1xuICAgICAgICAgICAgY29uc3Qgc2NoID0gc2NoZW1hc1trZXlSZWZdO1xuICAgICAgICAgICAgaWYgKCFyZWdleCB8fCByZWdleC50ZXN0KGtleVJlZikpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNjaCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzY2hlbWFzW2tleVJlZl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjaCAmJiAhc2NoLm1ldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKHNjaC5zY2hlbWEpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc2NoZW1hc1trZXlSZWZdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfYWRkU2NoZW1hKHNjaGVtYSwgbWV0YSwgYmFzZUlkLCB2YWxpZGF0ZVNjaGVtYSA9IHRoaXMub3B0cy52YWxpZGF0ZVNjaGVtYSwgYWRkU2NoZW1hID0gdGhpcy5vcHRzLmFkZFVzZWRTY2hlbWEpIHtcbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGlkID0gc2NoZW1hW3NjaGVtYUlkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuanRkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNjaGVtYSBtdXN0IGJlIG9iamVjdFwiKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzY2hlbWEgIT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIG11c3QgYmUgb2JqZWN0IG9yIGJvb2xlYW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNjaCA9IHRoaXMuX2NhY2hlLmdldChzY2hlbWEpO1xuICAgICAgICBpZiAoc2NoICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gc2NoO1xuICAgICAgICBiYXNlSWQgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShpZCB8fCBiYXNlSWQpO1xuICAgICAgICBjb25zdCBsb2NhbFJlZnMgPSByZXNvbHZlXzEuZ2V0U2NoZW1hUmVmcy5jYWxsKHRoaXMsIHNjaGVtYSwgYmFzZUlkKTtcbiAgICAgICAgc2NoID0gbmV3IGNvbXBpbGVfMS5TY2hlbWFFbnYoeyBzY2hlbWEsIHNjaGVtYUlkLCBtZXRhLCBiYXNlSWQsIGxvY2FsUmVmcyB9KTtcbiAgICAgICAgdGhpcy5fY2FjaGUuc2V0KHNjaC5zY2hlbWEsIHNjaCk7XG4gICAgICAgIGlmIChhZGRTY2hlbWEgJiYgIWJhc2VJZC5zdGFydHNXaXRoKFwiI1wiKSkge1xuICAgICAgICAgICAgLy8gVE9ETyBhdG0gaXQgaXMgYWxsb3dlZCB0byBvdmVyd3JpdGUgc2NoZW1hcyB3aXRob3V0IGlkIChpbnN0ZWFkIG9mIG5vdCBhZGRpbmcgdGhlbSlcbiAgICAgICAgICAgIGlmIChiYXNlSWQpXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tVbmlxdWUoYmFzZUlkKTtcbiAgICAgICAgICAgIHRoaXMucmVmc1tiYXNlSWRdID0gc2NoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0ZVNjaGVtYSlcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVTY2hlbWEoc2NoZW1hLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHNjaDtcbiAgICB9XG4gICAgX2NoZWNrVW5pcXVlKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLnNjaGVtYXNbaWRdIHx8IHRoaXMucmVmc1tpZF0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc2NoZW1hIHdpdGgga2V5IG9yIGlkIFwiJHtpZH1cIiBhbHJlYWR5IGV4aXN0c2ApO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9jb21waWxlU2NoZW1hRW52KHNjaCkge1xuICAgICAgICBpZiAoc2NoLm1ldGEpXG4gICAgICAgICAgICB0aGlzLl9jb21waWxlTWV0YVNjaGVtYShzY2gpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb21waWxlXzEuY29tcGlsZVNjaGVtYS5jYWxsKHRoaXMsIHNjaCk7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIXNjaC52YWxpZGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgcmV0dXJuIHNjaC52YWxpZGF0ZTtcbiAgICB9XG4gICAgX2NvbXBpbGVNZXRhU2NoZW1hKHNjaCkge1xuICAgICAgICBjb25zdCBjdXJyZW50T3B0cyA9IHRoaXMub3B0cztcbiAgICAgICAgdGhpcy5vcHRzID0gdGhpcy5fbWV0YU9wdHM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb21waWxlXzEuY29tcGlsZVNjaGVtYS5jYWxsKHRoaXMsIHNjaCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMgPSBjdXJyZW50T3B0cztcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEFqdjtcbkFqdi5WYWxpZGF0aW9uRXJyb3IgPSB2YWxpZGF0aW9uX2Vycm9yXzEuZGVmYXVsdDtcbkFqdi5NaXNzaW5nUmVmRXJyb3IgPSByZWZfZXJyb3JfMS5kZWZhdWx0O1xuZnVuY3Rpb24gY2hlY2tPcHRpb25zKGNoZWNrT3B0cywgb3B0aW9ucywgbXNnLCBsb2cgPSBcImVycm9yXCIpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGVja09wdHMpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0ga2V5O1xuICAgICAgICBpZiAob3B0IGluIG9wdGlvbnMpXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcltsb2ddKGAke21zZ306IG9wdGlvbiAke2tleX0uICR7Y2hlY2tPcHRzW29wdF19YCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0U2NoRW52KGtleVJlZikge1xuICAgIGtleVJlZiA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKGtleVJlZik7IC8vIFRPRE8gdGVzdHMgZmFpbCB3aXRob3V0IHRoaXMgbGluZVxuICAgIHJldHVybiB0aGlzLnNjaGVtYXNba2V5UmVmXSB8fCB0aGlzLnJlZnNba2V5UmVmXTtcbn1cbmZ1bmN0aW9uIGFkZEluaXRpYWxTY2hlbWFzKCkge1xuICAgIGNvbnN0IG9wdHNTY2hlbWFzID0gdGhpcy5vcHRzLnNjaGVtYXM7XG4gICAgaWYgKCFvcHRzU2NoZW1hcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdHNTY2hlbWFzKSlcbiAgICAgICAgdGhpcy5hZGRTY2hlbWEob3B0c1NjaGVtYXMpO1xuICAgIGVsc2VcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0c1NjaGVtYXMpXG4gICAgICAgICAgICB0aGlzLmFkZFNjaGVtYShvcHRzU2NoZW1hc1trZXldLCBrZXkpO1xufVxuZnVuY3Rpb24gYWRkSW5pdGlhbEZvcm1hdHMoKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIGluIHRoaXMub3B0cy5mb3JtYXRzKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMub3B0cy5mb3JtYXRzW25hbWVdO1xuICAgICAgICBpZiAoZm9ybWF0KVxuICAgICAgICAgICAgdGhpcy5hZGRGb3JtYXQobmFtZSwgZm9ybWF0KTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRJbml0aWFsS2V5d29yZHMoZGVmcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRlZnMpKSB7XG4gICAgICAgIHRoaXMuYWRkVm9jYWJ1bGFyeShkZWZzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxvZ2dlci53YXJuKFwia2V5d29yZHMgb3B0aW9uIGFzIG1hcCBpcyBkZXByZWNhdGVkLCBwYXNzIGFycmF5XCIpO1xuICAgIGZvciAoY29uc3Qga2V5d29yZCBpbiBkZWZzKSB7XG4gICAgICAgIGNvbnN0IGRlZiA9IGRlZnNba2V5d29yZF07XG4gICAgICAgIGlmICghZGVmLmtleXdvcmQpXG4gICAgICAgICAgICBkZWYua2V5d29yZCA9IGtleXdvcmQ7XG4gICAgICAgIHRoaXMuYWRkS2V5d29yZChkZWYpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE1ldGFTY2hlbWFPcHRpb25zKCkge1xuICAgIGNvbnN0IG1ldGFPcHRzID0geyAuLi50aGlzLm9wdHMgfTtcbiAgICBmb3IgKGNvbnN0IG9wdCBvZiBNRVRBX0lHTk9SRV9PUFRJT05TKVxuICAgICAgICBkZWxldGUgbWV0YU9wdHNbb3B0XTtcbiAgICByZXR1cm4gbWV0YU9wdHM7XG59XG5jb25zdCBub0xvZ3MgPSB7IGxvZygpIHsgfSwgd2FybigpIHsgfSwgZXJyb3IoKSB7IH0gfTtcbmZ1bmN0aW9uIGdldExvZ2dlcihsb2dnZXIpIHtcbiAgICBpZiAobG9nZ2VyID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuIG5vTG9ncztcbiAgICBpZiAobG9nZ2VyID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBjb25zb2xlO1xuICAgIGlmIChsb2dnZXIubG9nICYmIGxvZ2dlci53YXJuICYmIGxvZ2dlci5lcnJvcilcbiAgICAgICAgcmV0dXJuIGxvZ2dlcjtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJsb2dnZXIgbXVzdCBpbXBsZW1lbnQgbG9nLCB3YXJuIGFuZCBlcnJvciBtZXRob2RzXCIpO1xufVxuY29uc3QgS0VZV09SRF9OQU1FID0gL15bYS16XyRdW2EtejAtOV8kOi1dKiQvaTtcbmZ1bmN0aW9uIGNoZWNrS2V5d29yZChrZXl3b3JkLCBkZWYpIHtcbiAgICBjb25zdCB7IFJVTEVTIH0gPSB0aGlzO1xuICAgICgwLCB1dGlsXzEuZWFjaEl0ZW0pKGtleXdvcmQsIChrd2QpID0+IHtcbiAgICAgICAgaWYgKFJVTEVTLmtleXdvcmRzW2t3ZF0pXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEtleXdvcmQgJHtrd2R9IGlzIGFscmVhZHkgZGVmaW5lZGApO1xuICAgICAgICBpZiAoIUtFWVdPUkRfTkFNRS50ZXN0KGt3ZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEtleXdvcmQgJHtrd2R9IGhhcyBpbnZhbGlkIG5hbWVgKTtcbiAgICB9KTtcbiAgICBpZiAoIWRlZilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChkZWYuJGRhdGEgJiYgIShcImNvZGVcIiBpbiBkZWYgfHwgXCJ2YWxpZGF0ZVwiIGluIGRlZikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCckZGF0YSBrZXl3b3JkIG11c3QgaGF2ZSBcImNvZGVcIiBvciBcInZhbGlkYXRlXCIgZnVuY3Rpb24nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRSdWxlKGtleXdvcmQsIGRlZmluaXRpb24sIGRhdGFUeXBlKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHBvc3QgPSBkZWZpbml0aW9uID09PSBudWxsIHx8IGRlZmluaXRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlZmluaXRpb24ucG9zdDtcbiAgICBpZiAoZGF0YVR5cGUgJiYgcG9zdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdrZXl3b3JkIHdpdGggXCJwb3N0XCIgZmxhZyBjYW5ub3QgaGF2ZSBcInR5cGVcIicpO1xuICAgIGNvbnN0IHsgUlVMRVMgfSA9IHRoaXM7XG4gICAgbGV0IHJ1bGVHcm91cCA9IHBvc3QgPyBSVUxFUy5wb3N0IDogUlVMRVMucnVsZXMuZmluZCgoeyB0eXBlOiB0IH0pID0+IHQgPT09IGRhdGFUeXBlKTtcbiAgICBpZiAoIXJ1bGVHcm91cCkge1xuICAgICAgICBydWxlR3JvdXAgPSB7IHR5cGU6IGRhdGFUeXBlLCBydWxlczogW10gfTtcbiAgICAgICAgUlVMRVMucnVsZXMucHVzaChydWxlR3JvdXApO1xuICAgIH1cbiAgICBSVUxFUy5rZXl3b3Jkc1trZXl3b3JkXSA9IHRydWU7XG4gICAgaWYgKCFkZWZpbml0aW9uKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgcnVsZSA9IHtcbiAgICAgICAga2V5d29yZCxcbiAgICAgICAgZGVmaW5pdGlvbjoge1xuICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgIHR5cGU6ICgwLCBkYXRhVHlwZV8xLmdldEpTT05UeXBlcykoZGVmaW5pdGlvbi50eXBlKSxcbiAgICAgICAgICAgIHNjaGVtYVR5cGU6ICgwLCBkYXRhVHlwZV8xLmdldEpTT05UeXBlcykoZGVmaW5pdGlvbi5zY2hlbWFUeXBlKSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChkZWZpbml0aW9uLmJlZm9yZSlcbiAgICAgICAgYWRkQmVmb3JlUnVsZS5jYWxsKHRoaXMsIHJ1bGVHcm91cCwgcnVsZSwgZGVmaW5pdGlvbi5iZWZvcmUpO1xuICAgIGVsc2VcbiAgICAgICAgcnVsZUdyb3VwLnJ1bGVzLnB1c2gocnVsZSk7XG4gICAgUlVMRVMuYWxsW2tleXdvcmRdID0gcnVsZTtcbiAgICAoX2EgPSBkZWZpbml0aW9uLmltcGxlbWVudHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKChrd2QpID0+IHRoaXMuYWRkS2V5d29yZChrd2QpKTtcbn1cbmZ1bmN0aW9uIGFkZEJlZm9yZVJ1bGUocnVsZUdyb3VwLCBydWxlLCBiZWZvcmUpIHtcbiAgICBjb25zdCBpID0gcnVsZUdyb3VwLnJ1bGVzLmZpbmRJbmRleCgoX3J1bGUpID0+IF9ydWxlLmtleXdvcmQgPT09IGJlZm9yZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgICBydWxlR3JvdXAucnVsZXMuc3BsaWNlKGksIDAsIHJ1bGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcnVsZUdyb3VwLnJ1bGVzLnB1c2gocnVsZSk7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYHJ1bGUgJHtiZWZvcmV9IGlzIG5vdCBkZWZpbmVkYCk7XG4gICAgfVxufVxuZnVuY3Rpb24ga2V5d29yZE1ldGFzY2hlbWEoZGVmKSB7XG4gICAgbGV0IHsgbWV0YVNjaGVtYSB9ID0gZGVmO1xuICAgIGlmIChtZXRhU2NoZW1hID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZGVmLiRkYXRhICYmIHRoaXMub3B0cy4kZGF0YSlcbiAgICAgICAgbWV0YVNjaGVtYSA9IHNjaGVtYU9yRGF0YShtZXRhU2NoZW1hKTtcbiAgICBkZWYudmFsaWRhdGVTY2hlbWEgPSB0aGlzLmNvbXBpbGUobWV0YVNjaGVtYSwgdHJ1ZSk7XG59XG5jb25zdCAkZGF0YVJlZiA9IHtcbiAgICAkcmVmOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9hanYtdmFsaWRhdG9yL2Fqdi9tYXN0ZXIvbGliL3JlZnMvZGF0YS5qc29uI1wiLFxufTtcbmZ1bmN0aW9uIHNjaGVtYU9yRGF0YShzY2hlbWEpIHtcbiAgICByZXR1cm4geyBhbnlPZjogW3NjaGVtYSwgJGRhdGFSZWZdIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWV0YVNjaGVtYSA9IHJlcXVpcmUoXCIuL3NjaGVtYS5qc29uXCIpO1xuY29uc3QgYXBwbGljYXRvciA9IHJlcXVpcmUoXCIuL21ldGEvYXBwbGljYXRvci5qc29uXCIpO1xuY29uc3QgdW5ldmFsdWF0ZWQgPSByZXF1aXJlKFwiLi9tZXRhL3VuZXZhbHVhdGVkLmpzb25cIik7XG5jb25zdCBjb250ZW50ID0gcmVxdWlyZShcIi4vbWV0YS9jb250ZW50Lmpzb25cIik7XG5jb25zdCBjb3JlID0gcmVxdWlyZShcIi4vbWV0YS9jb3JlLmpzb25cIik7XG5jb25zdCBmb3JtYXQgPSByZXF1aXJlKFwiLi9tZXRhL2Zvcm1hdC1hbm5vdGF0aW9uLmpzb25cIik7XG5jb25zdCBtZXRhZGF0YSA9IHJlcXVpcmUoXCIuL21ldGEvbWV0YS1kYXRhLmpzb25cIik7XG5jb25zdCB2YWxpZGF0aW9uID0gcmVxdWlyZShcIi4vbWV0YS92YWxpZGF0aW9uLmpzb25cIik7XG5jb25zdCBNRVRBX1NVUFBPUlRfREFUQSA9IFtcIi9wcm9wZXJ0aWVzXCJdO1xuZnVuY3Rpb24gYWRkTWV0YVNjaGVtYTIwMjAoJGRhdGEpIHtcbiAgICA7XG4gICAgW1xuICAgICAgICBtZXRhU2NoZW1hLFxuICAgICAgICBhcHBsaWNhdG9yLFxuICAgICAgICB1bmV2YWx1YXRlZCxcbiAgICAgICAgY29udGVudCxcbiAgICAgICAgY29yZSxcbiAgICAgICAgd2l0aCRkYXRhKHRoaXMsIGZvcm1hdCksXG4gICAgICAgIG1ldGFkYXRhLFxuICAgICAgICB3aXRoJGRhdGEodGhpcywgdmFsaWRhdGlvbiksXG4gICAgXS5mb3JFYWNoKChzY2gpID0+IHRoaXMuYWRkTWV0YVNjaGVtYShzY2gsIHVuZGVmaW5lZCwgZmFsc2UpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgICBmdW5jdGlvbiB3aXRoJGRhdGEoYWp2LCBzY2gpIHtcbiAgICAgICAgcmV0dXJuICRkYXRhID8gYWp2LiRkYXRhTWV0YVNjaGVtYShzY2gsIE1FVEFfU1VQUE9SVF9EQVRBKSA6IHNjaDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBhZGRNZXRhU2NoZW1hMjAyMDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Fqdi12YWxpZGF0b3IvYWp2L2lzc3Vlcy84ODlcbmNvbnN0IGVxdWFsID0gcmVxdWlyZShcImZhc3QtZGVlcC1lcXVhbFwiKTtcbmVxdWFsLmNvZGUgPSAncmVxdWlyZShcImFqdi9kaXN0L3J1bnRpbWUvZXF1YWxcIikuZGVmYXVsdCc7XG5leHBvcnRzLmRlZmF1bHQgPSBlcXVhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVxdWFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9wdW55Y29kZS5qcyAtIHB1bnljb2RlLnVjczIuZGVjb2RlXG5mdW5jdGlvbiB1Y3MybGVuZ3RoKHN0cikge1xuICAgIGNvbnN0IGxlbiA9IHN0ci5sZW5ndGg7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IHBvcyA9IDA7XG4gICAgbGV0IHZhbHVlO1xuICAgIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICAgICAgbGVuZ3RoKys7XG4gICAgICAgIHZhbHVlID0gc3RyLmNoYXJDb2RlQXQocG9zKyspO1xuICAgICAgICBpZiAodmFsdWUgPj0gMHhkODAwICYmIHZhbHVlIDw9IDB4ZGJmZiAmJiBwb3MgPCBsZW4pIHtcbiAgICAgICAgICAgIC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuICAgICAgICAgICAgdmFsdWUgPSBzdHIuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAgICAgaWYgKCh2YWx1ZSAmIDB4ZmMwMCkgPT09IDB4ZGMwMClcbiAgICAgICAgICAgICAgICBwb3MrKzsgLy8gbG93IHN1cnJvZ2F0ZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG59XG5leHBvcnRzLmRlZmF1bHQgPSB1Y3MybGVuZ3RoO1xudWNzMmxlbmd0aC5jb2RlID0gJ3JlcXVpcmUoXCJhanYvZGlzdC9ydW50aW1lL3VjczJsZW5ndGhcIikuZGVmYXVsdCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11Y3MybGVuZ3RoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXJpID0gcmVxdWlyZShcInVyaS1qc1wiKTtcbnVyaS5jb2RlID0gJ3JlcXVpcmUoXCJhanYvZGlzdC9ydW50aW1lL3VyaVwiKS5kZWZhdWx0JztcbmV4cG9ydHMuZGVmYXVsdCA9IHVyaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVyaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFZhbGlkYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihlcnJvcnMpIHtcbiAgICAgICAgc3VwZXIoXCJ2YWxpZGF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgIHRoaXMuYWp2ID0gdGhpcy52YWxpZGF0aW9uID0gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWYWxpZGF0aW9uRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12YWxpZGF0aW9uX2Vycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcyA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IGxlbiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSBtb3JlIHRoYW4gJHtsZW59IGl0ZW1zYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBsZW4gfSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7bGVufX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImFkZGl0aW9uYWxJdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJib29sZWFuXCIsIFwib2JqZWN0XCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgJ1wiYWRkaXRpb25hbEl0ZW1zXCIgaXMgaWdub3JlZCB3aGVuIFwiaXRlbXNcIiBpcyBub3QgYW4gYXJyYXkgb2Ygc2NoZW1hcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zKGN4dCwgaXRlbXMpO1xuICAgIH0sXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVBZGRpdGlvbmFsSXRlbXMoY3h0LCBpdGVtcykge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBsZW46IGl0ZW1zLmxlbmd0aCB9KTtcbiAgICAgICAgY3h0LnBhc3MoKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59IDw9ICR7aXRlbXMubGVuZ3RofWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLnZhcihcInZhbGlkXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA8PSAke2l0ZW1zLmxlbmd0aH1gKTsgLy8gVE9ETyB2YXJcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IHZhbGlkYXRlSXRlbXModmFsaWQpKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVJdGVtcyh2YWxpZCkge1xuICAgICAgICBnZW4uZm9yUmFuZ2UoXCJpXCIsIGl0ZW1zLmxlbmd0aCwgbGVuLCAoaSkgPT4ge1xuICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQsIGRhdGFQcm9wOiBpLCBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLk51bSB9LCB2YWxpZCk7XG4gICAgICAgICAgICBpZiAoIWl0LmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zID0gdmFsaWRhdGVBZGRpdGlvbmFsSXRlbXM7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGRpdGlvbmFsSXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJtdXN0IE5PVCBoYXZlIGFkZGl0aW9uYWwgcHJvcGVydGllc1wiLFxuICAgIHBhcmFtczogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHthZGRpdGlvbmFsUHJvcGVydHk6ICR7cGFyYW1zLmFkZGl0aW9uYWxQcm9wZXJ0eX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFtcIm9iamVjdFwiXSxcbiAgICBzY2hlbWFUeXBlOiBbXCJib29sZWFuXCIsIFwib2JqZWN0XCJdLFxuICAgIGFsbG93VW5kZWZpbmVkOiB0cnVlLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgZGF0YSwgZXJyc0NvdW50LCBpdCB9ID0gY3h0O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFlcnJzQ291bnQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgIGNvbnN0IHsgYWxsRXJyb3JzLCBvcHRzIH0gPSBpdDtcbiAgICAgICAgaXQucHJvcHMgPSB0cnVlO1xuICAgICAgICBpZiAob3B0cy5yZW1vdmVBZGRpdGlvbmFsICE9PSBcImFsbFwiICYmICgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBwcm9wcyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykocGFyZW50U2NoZW1hLnByb3BlcnRpZXMpO1xuICAgICAgICBjb25zdCBwYXRQcm9wcyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykocGFyZW50U2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzKTtcbiAgICAgICAgY2hlY2tBZGRpdGlvbmFsUHJvcGVydGllcygpO1xuICAgICAgICBjeHQub2soKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJzQ291bnR9ID09PSAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9YCk7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWRkaXRpb25hbFByb3BlcnRpZXMoKSB7XG4gICAgICAgICAgICBnZW4uZm9ySW4oXCJrZXlcIiwgZGF0YSwgKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcHJvcHMubGVuZ3RoICYmICFwYXRQcm9wcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0eUNvZGUoa2V5KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdlbi5pZihpc0FkZGl0aW9uYWwoa2V5KSwgKCkgPT4gYWRkaXRpb25hbFByb3BlcnR5Q29kZShrZXkpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzQWRkaXRpb25hbChrZXkpIHtcbiAgICAgICAgICAgIGxldCBkZWZpbmVkUHJvcDtcbiAgICAgICAgICAgIGlmIChwcm9wcy5sZW5ndGggPiA4KSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBtYXliZSBhbiBvcHRpb24gaW5zdGVhZCBvZiBoYXJkLWNvZGVkIDg/XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHNTY2hlbWEgPSAoMCwgdXRpbF8xLnNjaGVtYVJlZk9yVmFsKShpdCwgcGFyZW50U2NoZW1hLnByb3BlcnRpZXMsIFwicHJvcGVydGllc1wiKTtcbiAgICAgICAgICAgICAgICBkZWZpbmVkUHJvcCA9ICgwLCBjb2RlXzEuaXNPd25Qcm9wZXJ0eSkoZ2VuLCBwcm9wc1NjaGVtYSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRlZmluZWRQcm9wID0gKDAsIGNvZGVnZW5fMS5vcikoLi4ucHJvcHMubWFwKChwKSA9PiAoMCwgY29kZWdlbl8xLl8pIGAke2tleX0gPT09ICR7cH1gKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVkUHJvcCA9IGNvZGVnZW5fMS5uaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0UHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lZFByb3AgPSAoMCwgY29kZWdlbl8xLm9yKShkZWZpbmVkUHJvcCwgLi4ucGF0UHJvcHMubWFwKChwKSA9PiAoMCwgY29kZWdlbl8xLl8pIGAkeygwLCBjb2RlXzEudXNlUGF0dGVybikoY3h0LCBwKX0udGVzdCgke2tleX0pYCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEubm90KShkZWZpbmVkUHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlQWRkaXRpb25hbChrZXkpIHtcbiAgICAgICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYGRlbGV0ZSAke2RhdGF9WyR7a2V5fV1gKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhZGRpdGlvbmFsUHJvcGVydHlDb2RlKGtleSkge1xuICAgICAgICAgICAgaWYgKG9wdHMucmVtb3ZlQWRkaXRpb25hbCA9PT0gXCJhbGxcIiB8fCAob3B0cy5yZW1vdmVBZGRpdGlvbmFsICYmIHNjaGVtYSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlQWRkaXRpb25hbChrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGFkZGl0aW9uYWxQcm9wZXJ0eToga2V5IH0pO1xuICAgICAgICAgICAgICAgIGN4dC5lcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICBnZW4uYnJlYWsoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmICEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5yZW1vdmVBZGRpdGlvbmFsID09PSBcImZhaWxpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUFkZGl0aW9uYWxTY2hlbWEoa2V5LCB2YWxpZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3h0LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVBZGRpdGlvbmFsKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlBZGRpdGlvbmFsU2NoZW1hKGtleSwgdmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiBnZW4uYnJlYWsoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5QWRkaXRpb25hbFNjaGVtYShrZXksIHZhbGlkLCBlcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YnNjaGVtYSA9IHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIsXG4gICAgICAgICAgICAgICAgZGF0YVByb3A6IGtleSxcbiAgICAgICAgICAgICAgICBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLlN0cixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZXJyb3JzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3Vic2NoZW1hLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVycm9yczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFsbEVycm9yczogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHN1YnNjaGVtYSwgdmFsaWQpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGRpdGlvbmFsUHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhbGxPZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgc2NoZW1hLmZvckVhY2goKHNjaCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2gpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkOiBcImFsbE9mXCIsIHNjaGVtYVByb3A6IGkgfSwgdmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQpO1xuICAgICAgICB9KTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFsbE9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhbnlPZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBjb2RlOiBjb2RlXzEudmFsaWRhdGVVbmlvbixcbiAgICBlcnJvcjogeyBtZXNzYWdlOiBcIm11c3QgbWF0Y2ggYSBzY2hlbWEgaW4gYW55T2ZcIiB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFueU9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbWluLCBtYXggfSB9KSA9PiBtYXggPT09IHVuZGVmaW5lZFxuICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBjb250YWluIGF0IGxlYXN0ICR7bWlufSB2YWxpZCBpdGVtKHMpYFxuICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBjb250YWluIGF0IGxlYXN0ICR7bWlufSBhbmQgbm8gbW9yZSB0aGFuICR7bWF4fSB2YWxpZCBpdGVtKHMpYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBtaW4sIG1heCB9IH0pID0+IG1heCA9PT0gdW5kZWZpbmVkID8gKDAsIGNvZGVnZW5fMS5fKSBge21pbkNvbnRhaW5zOiAke21pbn19YCA6ICgwLCBjb2RlZ2VuXzEuXykgYHttaW5Db250YWluczogJHttaW59LCBtYXhDb250YWluczogJHttYXh9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiY29udGFpbnNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGxldCBtaW47XG4gICAgICAgIGxldCBtYXg7XG4gICAgICAgIGNvbnN0IHsgbWluQ29udGFpbnMsIG1heENvbnRhaW5zIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGlmIChpdC5vcHRzLm5leHQpIHtcbiAgICAgICAgICAgIG1pbiA9IG1pbkNvbnRhaW5zID09PSB1bmRlZmluZWQgPyAxIDogbWluQ29udGFpbnM7XG4gICAgICAgICAgICBtYXggPSBtYXhDb250YWlucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1pbiA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGVuID0gZ2VuLmNvbnN0KFwibGVuXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoYCk7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBtaW4sIG1heCB9KTtcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkICYmIG1pbiA9PT0gMCkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgXCJtaW5Db250YWluc1wiID09IDAgd2l0aG91dCBcIm1heENvbnRhaW5zXCI6IFwiY29udGFpbnNcIiBrZXl3b3JkIGlnbm9yZWRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQgJiYgbWluID4gbWF4KSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBcIm1pbkNvbnRhaW5zXCIgPiBcIm1heENvbnRhaW5zXCIgaXMgYWx3YXlzIGludmFsaWRgKTtcbiAgICAgICAgICAgIGN4dC5mYWlsKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgICAgICBsZXQgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA+PSAke21pbn1gO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2NvbmR9ICYmICR7bGVufSA8PSAke21heH1gO1xuICAgICAgICAgICAgY3h0LnBhc3MoY29uZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGlmIChtYXggPT09IHVuZGVmaW5lZCAmJiBtaW4gPT09IDEpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlSXRlbXModmFsaWQsICgpID0+IGdlbi5pZih2YWxpZCwgKCkgPT4gZ2VuLmJyZWFrKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtaW4gPT09IDApIHtcbiAgICAgICAgICAgIGdlbi5sZXQodmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aCA+IDBgLCB2YWxpZGF0ZUl0ZW1zV2l0aENvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbi5sZXQodmFsaWQsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhbGlkYXRlSXRlbXNXaXRoQ291bnQoKTtcbiAgICAgICAgfVxuICAgICAgICBjeHQucmVzdWx0KHZhbGlkLCAoKSA9PiBjeHQucmVzZXQoKSk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlSXRlbXNXaXRoQ291bnQoKSB7XG4gICAgICAgICAgICBjb25zdCBzY2hWYWxpZCA9IGdlbi5uYW1lKFwiX3ZhbGlkXCIpO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBnZW4ubGV0KFwiY291bnRcIiwgMCk7XG4gICAgICAgICAgICB2YWxpZGF0ZUl0ZW1zKHNjaFZhbGlkLCAoKSA9PiBnZW4uaWYoc2NoVmFsaWQsICgpID0+IGNoZWNrTGltaXRzKGNvdW50KSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlSXRlbXMoX3ZhbGlkLCBibG9jaykge1xuICAgICAgICAgICAgZ2VuLmZvclJhbmdlKFwiaVwiLCAwLCBsZW4sIChpKSA9PiB7XG4gICAgICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwiY29udGFpbnNcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVByb3A6IGksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wVHlwZTogdXRpbF8xLlR5cGUuTnVtLFxuICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIF92YWxpZCk7XG4gICAgICAgICAgICAgICAgYmxvY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTGltaXRzKGNvdW50KSB7XG4gICAgICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke2NvdW50fSsrYCk7XG4gICAgICAgICAgICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb3VudH0gPj0gJHttaW59YCwgKCkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSkuYnJlYWsoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb3VudH0gPiAke21heH1gLCAoKSA9PiBnZW4uYXNzaWduKHZhbGlkLCBmYWxzZSkuYnJlYWsoKSk7XG4gICAgICAgICAgICAgICAgaWYgKG1pbiA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb3VudH0gPj0gJHttaW59YCwgKCkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250YWlucy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVTY2hlbWFEZXBzID0gZXhwb3J0cy52YWxpZGF0ZVByb3BlcnR5RGVwcyA9IGV4cG9ydHMuZXJyb3IgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuZXhwb3J0cy5lcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgcHJvcGVydHksIGRlcHNDb3VudCwgZGVwcyB9IH0pID0+IHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlfaWVzID0gZGVwc0NvdW50ID09PSAxID8gXCJwcm9wZXJ0eVwiIDogXCJwcm9wZXJ0aWVzXCI7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgaGF2ZSAke3Byb3BlcnR5X2llc30gJHtkZXBzfSB3aGVuIHByb3BlcnR5ICR7cHJvcGVydHl9IGlzIHByZXNlbnRgO1xuICAgIH0sXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgcHJvcGVydHksIGRlcHNDb3VudCwgZGVwcywgbWlzc2luZ1Byb3BlcnR5IH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge3Byb3BlcnR5OiAke3Byb3BlcnR5fSxcbiAgICBtaXNzaW5nUHJvcGVydHk6ICR7bWlzc2luZ1Byb3BlcnR5fSxcbiAgICBkZXBzQ291bnQ6ICR7ZGVwc0NvdW50fSxcbiAgICBkZXBzOiAke2RlcHN9fWAsIC8vIFRPRE8gY2hhbmdlIHRvIHJlZmVyZW5jZVxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImRlcGVuZGVuY2llc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJvYmplY3RcIixcbiAgICBlcnJvcjogZXhwb3J0cy5lcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCBbcHJvcERlcHMsIHNjaERlcHNdID0gc3BsaXREZXBlbmRlbmNpZXMoY3h0KTtcbiAgICAgICAgdmFsaWRhdGVQcm9wZXJ0eURlcHMoY3h0LCBwcm9wRGVwcyk7XG4gICAgICAgIHZhbGlkYXRlU2NoZW1hRGVwcyhjeHQsIHNjaERlcHMpO1xuICAgIH0sXG59O1xuZnVuY3Rpb24gc3BsaXREZXBlbmRlbmNpZXMoeyBzY2hlbWEgfSkge1xuICAgIGNvbnN0IHByb3BlcnR5RGVwcyA9IHt9O1xuICAgIGNvbnN0IHNjaGVtYURlcHMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJfX3Byb3RvX19cIilcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBkZXBzID0gQXJyYXkuaXNBcnJheShzY2hlbWFba2V5XSkgPyBwcm9wZXJ0eURlcHMgOiBzY2hlbWFEZXBzO1xuICAgICAgICBkZXBzW2tleV0gPSBzY2hlbWFba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIFtwcm9wZXJ0eURlcHMsIHNjaGVtYURlcHNdO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0eURlcHMoY3h0LCBwcm9wZXJ0eURlcHMgPSBjeHQuc2NoZW1hKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BlcnR5RGVwcykubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgbWlzc2luZyA9IGdlbi5sZXQoXCJtaXNzaW5nXCIpO1xuICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wZXJ0eURlcHMpIHtcbiAgICAgICAgY29uc3QgZGVwcyA9IHByb3BlcnR5RGVwc1twcm9wXTtcbiAgICAgICAgaWYgKGRlcHMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IGhhc1Byb3BlcnR5ID0gKDAsIGNvZGVfMS5wcm9wZXJ0eUluRGF0YSkoZ2VuLCBkYXRhLCBwcm9wLCBpdC5vcHRzLm93blByb3BlcnRpZXMpO1xuICAgICAgICBjeHQuc2V0UGFyYW1zKHtcbiAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wLFxuICAgICAgICAgICAgZGVwc0NvdW50OiBkZXBzLmxlbmd0aCxcbiAgICAgICAgICAgIGRlcHM6IGRlcHMuam9pbihcIiwgXCIpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGl0LmFsbEVycm9ycykge1xuICAgICAgICAgICAgZ2VuLmlmKGhhc1Byb3BlcnR5LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZXBQcm9wIG9mIGRlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgKDAsIGNvZGVfMS5jaGVja1JlcG9ydE1pc3NpbmdQcm9wKShjeHQsIGRlcFByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7aGFzUHJvcGVydHl9ICYmICgkeygwLCBjb2RlXzEuY2hlY2tNaXNzaW5nUHJvcCkoY3h0LCBkZXBzLCBtaXNzaW5nKX0pYCk7XG4gICAgICAgICAgICAoMCwgY29kZV8xLnJlcG9ydE1pc3NpbmdQcm9wKShjeHQsIG1pc3NpbmcpO1xuICAgICAgICAgICAgZ2VuLmVsc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVQcm9wZXJ0eURlcHMgPSB2YWxpZGF0ZVByb3BlcnR5RGVwcztcbmZ1bmN0aW9uIHZhbGlkYXRlU2NoZW1hRGVwcyhjeHQsIHNjaGVtYURlcHMgPSBjeHQuc2NoZW1hKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgIGZvciAoY29uc3QgcHJvcCBpbiBzY2hlbWFEZXBzKSB7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hRGVwc1twcm9wXSkpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlXzEucHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgcHJvcCwgaXQub3B0cy5vd25Qcm9wZXJ0aWVzKSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQsIHNjaGVtYVByb3A6IHByb3AgfSwgdmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm1lcmdlVmFsaWRFdmFsdWF0ZWQoc2NoQ3h0LCB2YWxpZCk7XG4gICAgICAgIH0sICgpID0+IGdlbi52YXIodmFsaWQsIHRydWUpIC8vIFRPRE8gdmFyXG4gICAgICAgICk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVNjaGVtYURlcHMgPSB2YWxpZGF0ZVNjaGVtYURlcHM7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZXBlbmRlbmNpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkZXBlbmRlbmNpZXNfMSA9IHJlcXVpcmUoXCIuL2RlcGVuZGVuY2llc1wiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImRlcGVuZGVudFNjaGVtYXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwib2JqZWN0XCIsXG4gICAgY29kZTogKGN4dCkgPT4gKDAsIGRlcGVuZGVuY2llc18xLnZhbGlkYXRlU2NoZW1hRGVwcykoY3h0KSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZXBlbmRlbnRTY2hlbWFzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IG1hdGNoIFwiJHtwYXJhbXMuaWZDbGF1c2V9XCIgc2NoZW1hYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtcyB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7ZmFpbGluZ0tleXdvcmQ6ICR7cGFyYW1zLmlmQ2xhdXNlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImlmXCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAocGFyZW50U2NoZW1hLnRoZW4gPT09IHVuZGVmaW5lZCAmJiBwYXJlbnRTY2hlbWEuZWxzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsICdcImlmXCIgd2l0aG91dCBcInRoZW5cIiBhbmQgXCJlbHNlXCIgaXMgaWdub3JlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhc1RoZW4gPSBoYXNTY2hlbWEoaXQsIFwidGhlblwiKTtcbiAgICAgICAgY29uc3QgaGFzRWxzZSA9IGhhc1NjaGVtYShpdCwgXCJlbHNlXCIpO1xuICAgICAgICBpZiAoIWhhc1RoZW4gJiYgIWhhc0Vsc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIHRydWUpO1xuICAgICAgICBjb25zdCBzY2hWYWxpZCA9IGdlbi5uYW1lKFwiX3ZhbGlkXCIpO1xuICAgICAgICB2YWxpZGF0ZUlmKCk7XG4gICAgICAgIGN4dC5yZXNldCgpO1xuICAgICAgICBpZiAoaGFzVGhlbiAmJiBoYXNFbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBpZkNsYXVzZSA9IGdlbi5sZXQoXCJpZkNsYXVzZVwiKTtcbiAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBpZkNsYXVzZSB9KTtcbiAgICAgICAgICAgIGdlbi5pZihzY2hWYWxpZCwgdmFsaWRhdGVDbGF1c2UoXCJ0aGVuXCIsIGlmQ2xhdXNlKSwgdmFsaWRhdGVDbGF1c2UoXCJlbHNlXCIsIGlmQ2xhdXNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGFzVGhlbikge1xuICAgICAgICAgICAgZ2VuLmlmKHNjaFZhbGlkLCB2YWxpZGF0ZUNsYXVzZShcInRoZW5cIikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KShzY2hWYWxpZCksIHZhbGlkYXRlQ2xhdXNlKFwiZWxzZVwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY3h0LnBhc3ModmFsaWQsICgpID0+IGN4dC5lcnJvcih0cnVlKSk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlSWYoKSB7XG4gICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImlmXCIsXG4gICAgICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVFcnJvcnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFsbEVycm9yczogZmFsc2UsXG4gICAgICAgICAgICB9LCBzY2hWYWxpZCk7XG4gICAgICAgICAgICBjeHQubWVyZ2VFdmFsdWF0ZWQoc2NoQ3h0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUNsYXVzZShrZXl3b3JkLCBpZkNsYXVzZSkge1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHsga2V5d29yZCB9LCBzY2hWYWxpZCk7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgc2NoVmFsaWQpO1xuICAgICAgICAgICAgICAgIGN4dC5tZXJnZVZhbGlkRXZhbHVhdGVkKHNjaEN4dCwgdmFsaWQpO1xuICAgICAgICAgICAgICAgIGlmIChpZkNsYXVzZSlcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbihpZkNsYXVzZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtrZXl3b3JkfWApO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGlmQ2xhdXNlOiBrZXl3b3JkIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZnVuY3Rpb24gaGFzU2NoZW1hKGl0LCBrZXl3b3JkKSB7XG4gICAgY29uc3Qgc2NoZW1hID0gaXQuc2NoZW1hW2tleXdvcmRdO1xuICAgIHJldHVybiBzY2hlbWEgIT09IHVuZGVmaW5lZCAmJiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFkZGl0aW9uYWxJdGVtc18xID0gcmVxdWlyZShcIi4vYWRkaXRpb25hbEl0ZW1zXCIpO1xuY29uc3QgcHJlZml4SXRlbXNfMSA9IHJlcXVpcmUoXCIuL3ByZWZpeEl0ZW1zXCIpO1xuY29uc3QgaXRlbXNfMSA9IHJlcXVpcmUoXCIuL2l0ZW1zXCIpO1xuY29uc3QgaXRlbXMyMDIwXzEgPSByZXF1aXJlKFwiLi9pdGVtczIwMjBcIik7XG5jb25zdCBjb250YWluc18xID0gcmVxdWlyZShcIi4vY29udGFpbnNcIik7XG5jb25zdCBkZXBlbmRlbmNpZXNfMSA9IHJlcXVpcmUoXCIuL2RlcGVuZGVuY2llc1wiKTtcbmNvbnN0IHByb3BlcnR5TmFtZXNfMSA9IHJlcXVpcmUoXCIuL3Byb3BlcnR5TmFtZXNcIik7XG5jb25zdCBhZGRpdGlvbmFsUHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vYWRkaXRpb25hbFByb3BlcnRpZXNcIik7XG5jb25zdCBwcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9wcm9wZXJ0aWVzXCIpO1xuY29uc3QgcGF0dGVyblByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL3BhdHRlcm5Qcm9wZXJ0aWVzXCIpO1xuY29uc3Qgbm90XzEgPSByZXF1aXJlKFwiLi9ub3RcIik7XG5jb25zdCBhbnlPZl8xID0gcmVxdWlyZShcIi4vYW55T2ZcIik7XG5jb25zdCBvbmVPZl8xID0gcmVxdWlyZShcIi4vb25lT2ZcIik7XG5jb25zdCBhbGxPZl8xID0gcmVxdWlyZShcIi4vYWxsT2ZcIik7XG5jb25zdCBpZl8xID0gcmVxdWlyZShcIi4vaWZcIik7XG5jb25zdCB0aGVuRWxzZV8xID0gcmVxdWlyZShcIi4vdGhlbkVsc2VcIik7XG5mdW5jdGlvbiBnZXRBcHBsaWNhdG9yKGRyYWZ0MjAyMCA9IGZhbHNlKSB7XG4gICAgY29uc3QgYXBwbGljYXRvciA9IFtcbiAgICAgICAgLy8gYW55XG4gICAgICAgIG5vdF8xLmRlZmF1bHQsXG4gICAgICAgIGFueU9mXzEuZGVmYXVsdCxcbiAgICAgICAgb25lT2ZfMS5kZWZhdWx0LFxuICAgICAgICBhbGxPZl8xLmRlZmF1bHQsXG4gICAgICAgIGlmXzEuZGVmYXVsdCxcbiAgICAgICAgdGhlbkVsc2VfMS5kZWZhdWx0LFxuICAgICAgICAvLyBvYmplY3RcbiAgICAgICAgcHJvcGVydHlOYW1lc18xLmRlZmF1bHQsXG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzXzEuZGVmYXVsdCxcbiAgICAgICAgZGVwZW5kZW5jaWVzXzEuZGVmYXVsdCxcbiAgICAgICAgcHJvcGVydGllc18xLmRlZmF1bHQsXG4gICAgICAgIHBhdHRlcm5Qcm9wZXJ0aWVzXzEuZGVmYXVsdCxcbiAgICBdO1xuICAgIC8vIGFycmF5XG4gICAgaWYgKGRyYWZ0MjAyMClcbiAgICAgICAgYXBwbGljYXRvci5wdXNoKHByZWZpeEl0ZW1zXzEuZGVmYXVsdCwgaXRlbXMyMDIwXzEuZGVmYXVsdCk7XG4gICAgZWxzZVxuICAgICAgICBhcHBsaWNhdG9yLnB1c2goYWRkaXRpb25hbEl0ZW1zXzEuZGVmYXVsdCwgaXRlbXNfMS5kZWZhdWx0KTtcbiAgICBhcHBsaWNhdG9yLnB1c2goY29udGFpbnNfMS5kZWZhdWx0KTtcbiAgICByZXR1cm4gYXBwbGljYXRvcjtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGdldEFwcGxpY2F0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVUdXBsZSA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJpdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJhcnJheVwiLCBcImJvb2xlYW5cIl0sXG4gICAgYmVmb3JlOiBcInVuaXF1ZUl0ZW1zXCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBzY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGVUdXBsZShjeHQsIFwiYWRkaXRpb25hbEl0ZW1zXCIsIHNjaGVtYSk7XG4gICAgICAgIGl0Lml0ZW1zID0gdHJ1ZTtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjeHQub2soKDAsIGNvZGVfMS52YWxpZGF0ZUFycmF5KShjeHQpKTtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHZhbGlkYXRlVHVwbGUoY3h0LCBleHRyYUl0ZW1zLCBzY2hBcnIgPSBjeHQuc2NoZW1hKSB7XG4gICAgY29uc3QgeyBnZW4sIHBhcmVudFNjaGVtYSwgZGF0YSwga2V5d29yZCwgaXQgfSA9IGN4dDtcbiAgICBjaGVja1N0cmljdFR1cGxlKHBhcmVudFNjaGVtYSk7XG4gICAgaWYgKGl0Lm9wdHMudW5ldmFsdWF0ZWQgJiYgc2NoQXJyLmxlbmd0aCAmJiBpdC5pdGVtcyAhPT0gdHJ1ZSkge1xuICAgICAgICBpdC5pdGVtcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5pdGVtcyhnZW4sIHNjaEFyci5sZW5ndGgsIGl0Lml0ZW1zKTtcbiAgICB9XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgIHNjaEFyci5mb3JFYWNoKChzY2gsIGkpID0+IHtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2gpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59ID4gJHtpfWAsICgpID0+IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAga2V5d29yZCxcbiAgICAgICAgICAgIHNjaGVtYVByb3A6IGksXG4gICAgICAgICAgICBkYXRhUHJvcDogaSxcbiAgICAgICAgfSwgdmFsaWQpKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjaGVja1N0cmljdFR1cGxlKHNjaCkge1xuICAgICAgICBjb25zdCB7IG9wdHMsIGVyclNjaGVtYVBhdGggfSA9IGl0O1xuICAgICAgICBjb25zdCBsID0gc2NoQXJyLmxlbmd0aDtcbiAgICAgICAgY29uc3QgZnVsbFR1cGxlID0gbCA9PT0gc2NoLm1pbkl0ZW1zICYmIChsID09PSBzY2gubWF4SXRlbXMgfHwgc2NoW2V4dHJhSXRlbXNdID09PSBmYWxzZSk7XG4gICAgICAgIGlmIChvcHRzLnN0cmljdFR1cGxlcyAmJiAhZnVsbFR1cGxlKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBgXCIke2tleXdvcmR9XCIgaXMgJHtsfS10dXBsZSwgYnV0IG1pbkl0ZW1zIG9yIG1heEl0ZW1zLyR7ZXh0cmFJdGVtc30gYXJlIG5vdCBzcGVjaWZpZWQgb3IgZGlmZmVyZW50IGF0IHBhdGggXCIke2VyclNjaGVtYVBhdGh9XCJgO1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBtc2csIG9wdHMuc3RyaWN0VHVwbGVzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVUdXBsZSA9IHZhbGlkYXRlVHVwbGU7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVtcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBhZGRpdGlvbmFsSXRlbXNfMSA9IHJlcXVpcmUoXCIuL2FkZGl0aW9uYWxJdGVtc1wiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBsZW4gfSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgbW9yZSB0aGFuICR7bGVufSBpdGVtc2AsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgbGVuIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke2xlbn19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJpdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgcHJlZml4SXRlbXMgfSA9IHBhcmVudFNjaGVtYTtcbiAgICAgICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChwcmVmaXhJdGVtcylcbiAgICAgICAgICAgICgwLCBhZGRpdGlvbmFsSXRlbXNfMS52YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcykoY3h0LCBwcmVmaXhJdGVtcyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGN4dC5vaygoMCwgY29kZV8xLnZhbGlkYXRlQXJyYXkpKGN4dCkpO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlbXMyMDIwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIm5vdFwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgdHJhY2tFcnJvcnM6IHRydWUsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgICAgICBjeHQuZmFpbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICBrZXl3b3JkOiBcIm5vdFwiLFxuICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNyZWF0ZUVycm9yczogZmFsc2UsXG4gICAgICAgICAgICBhbGxFcnJvcnM6IGZhbHNlLFxuICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgIGN4dC5mYWlsUmVzdWx0KHZhbGlkLCAoKSA9PiBjeHQucmVzZXQoKSwgKCkgPT4gY3h0LmVycm9yKCkpO1xuICAgIH0sXG4gICAgZXJyb3I6IHsgbWVzc2FnZTogXCJtdXN0IE5PVCBiZSB2YWxpZFwiIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm90LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcIm11c3QgbWF0Y2ggZXhhY3RseSBvbmUgc2NoZW1hIGluIG9uZU9mXCIsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge3Bhc3NpbmdTY2hlbWFzOiAke3BhcmFtcy5wYXNzaW5nfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIm9uZU9mXCIsXG4gICAgc2NoZW1hVHlwZTogXCJhcnJheVwiLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICBpZiAoaXQub3B0cy5kaXNjcmltaW5hdG9yICYmIHBhcmVudFNjaGVtYS5kaXNjcmltaW5hdG9yKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBzY2hBcnIgPSBzY2hlbWE7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIGZhbHNlKTtcbiAgICAgICAgY29uc3QgcGFzc2luZyA9IGdlbi5sZXQoXCJwYXNzaW5nXCIsIG51bGwpO1xuICAgICAgICBjb25zdCBzY2hWYWxpZCA9IGdlbi5uYW1lKFwiX3ZhbGlkXCIpO1xuICAgICAgICBjeHQuc2V0UGFyYW1zKHsgcGFzc2luZyB9KTtcbiAgICAgICAgLy8gVE9ETyBwb3NzaWJseSBmYWlsIHN0cmFpZ2h0IGF3YXkgKHdpdGggd2FybmluZyBvciBleGNlcHRpb24pIGlmIHRoZXJlIGFyZSB0d28gZW1wdHkgYWx3YXlzIHZhbGlkIHNjaGVtYXNcbiAgICAgICAgZ2VuLmJsb2NrKHZhbGlkYXRlT25lT2YpO1xuICAgICAgICBjeHQucmVzdWx0KHZhbGlkLCAoKSA9PiBjeHQucmVzZXQoKSwgKCkgPT4gY3h0LmVycm9yKHRydWUpKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVPbmVPZigpIHtcbiAgICAgICAgICAgIHNjaEFyci5mb3JFYWNoKChzY2gsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2NoQ3h0O1xuICAgICAgICAgICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoKSkge1xuICAgICAgICAgICAgICAgICAgICBnZW4udmFyKHNjaFZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5d29yZDogXCJvbmVPZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hUHJvcDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sIHNjaFZhbGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAgICAgLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoVmFsaWR9ICYmICR7dmFsaWR9YClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hc3NpZ24odmFsaWQsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihwYXNzaW5nLCAoMCwgY29kZWdlbl8xLl8pIGBbJHtwYXNzaW5nfSwgJHtpfV1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVsc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2VuLmlmKHNjaFZhbGlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHBhc3NpbmcsIGkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoQ3h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgY3h0Lm1lcmdlRXZhbHVhdGVkKHNjaEN4dCwgY29kZWdlbl8xLk5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9uZU9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IHV0aWxfMiA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJwYXR0ZXJuUHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJvYmplY3RcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBkYXRhLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgb3B0cyB9ID0gaXQ7XG4gICAgICAgIGNvbnN0IHBhdHRlcm5zID0gKDAsIGNvZGVfMS5hbGxTY2hlbWFQcm9wZXJ0aWVzKShzY2hlbWEpO1xuICAgICAgICBjb25zdCBhbHdheXNWYWxpZFBhdHRlcm5zID0gcGF0dGVybnMuZmlsdGVyKChwKSA9PiAoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hW3BdKSk7XG4gICAgICAgIGlmIChwYXR0ZXJucy5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgIChhbHdheXNWYWxpZFBhdHRlcm5zLmxlbmd0aCA9PT0gcGF0dGVybnMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgKCFpdC5vcHRzLnVuZXZhbHVhdGVkIHx8IGl0LnByb3BzID09PSB0cnVlKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGVja1Byb3BlcnRpZXMgPSBvcHRzLnN0cmljdFNjaGVtYSAmJiAhb3B0cy5hbGxvd01hdGNoaW5nUHJvcGVydGllcyAmJiBwYXJlbnRTY2hlbWEucHJvcGVydGllcztcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICBpZiAoaXQucHJvcHMgIT09IHRydWUgJiYgIShpdC5wcm9wcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKSkge1xuICAgICAgICAgICAgaXQucHJvcHMgPSAoMCwgdXRpbF8yLmV2YWx1YXRlZFByb3BzVG9OYW1lKShnZW4sIGl0LnByb3BzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHByb3BzIH0gPSBpdDtcbiAgICAgICAgdmFsaWRhdGVQYXR0ZXJuUHJvcGVydGllcygpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZVBhdHRlcm5Qcm9wZXJ0aWVzKCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXQgb2YgcGF0dGVybnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgICAgICAgICBjaGVja01hdGNoaW5nUHJvcGVydGllcyhwYXQpO1xuICAgICAgICAgICAgICAgIGlmIChpdC5hbGxFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcm9wZXJ0aWVzKHBhdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnZW4udmFyKHZhbGlkLCB0cnVlKTsgLy8gVE9ETyB2YXJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcm9wZXJ0aWVzKHBhdCk7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5pZih2YWxpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTWF0Y2hpbmdQcm9wZXJ0aWVzKHBhdCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIGNoZWNrUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKHBhdCkudGVzdChwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBwcm9wZXJ0eSAke3Byb3B9IG1hdGNoZXMgcGF0dGVybiAke3BhdH0gKHVzZSBhbGxvd01hdGNoaW5nUHJvcGVydGllcylgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0aWVzKHBhdCkge1xuICAgICAgICAgICAgZ2VuLmZvckluKFwia2V5XCIsIGRhdGEsIChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHsoMCwgY29kZV8xLnVzZVBhdHRlcm4pKGN4dCwgcGF0KX0udGVzdCgke2tleX0pYCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbHdheXNWYWxpZCA9IGFsd2F5c1ZhbGlkUGF0dGVybnMuaW5jbHVkZXMocGF0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbHdheXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5d29yZDogXCJwYXR0ZXJuUHJvcGVydGllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVByb3A6IHBhdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUHJvcDoga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wVHlwZTogdXRpbF8yLlR5cGUuU3RyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdC5vcHRzLnVuZXZhbHVhdGVkICYmIHByb3BzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7cHJvcHN9WyR7a2V5fV1gLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghYWx3YXlzVmFsaWQgJiYgIWl0LmFsbEVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuIHNob3J0LWNpcmN1aXQgaWYgYHVuZXZhbHVhdGVkUHJvcGVydGllc2AgaXMgbm90IHN1cHBvcnRlZCAob3B0cy5uZXh0ID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIGlmIGFsbCBwcm9wZXJ0aWVzIHdlcmUgZXZhbHVhdGVkIChwcm9wcyA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiBnZW4uYnJlYWsoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXR0ZXJuUHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGl0ZW1zXzEgPSByZXF1aXJlKFwiLi9pdGVtc1wiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInByZWZpeEl0ZW1zXCIsXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFtcImFycmF5XCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGNvZGU6IChjeHQpID0+ICgwLCBpdGVtc18xLnZhbGlkYXRlVHVwbGUpKGN4dCwgXCJpdGVtc1wiKSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVmaXhJdGVtcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS92YWxpZGF0ZVwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9hZGRpdGlvbmFsUHJvcGVydGllc1wiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInByb3BlcnRpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwib2JqZWN0XCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoaXQub3B0cy5yZW1vdmVBZGRpdGlvbmFsID09PSBcImFsbFwiICYmIHBhcmVudFNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllc18xLmRlZmF1bHQuY29kZShuZXcgdmFsaWRhdGVfMS5LZXl3b3JkQ3h0KGl0LCBhZGRpdGlvbmFsUHJvcGVydGllc18xLmRlZmF1bHQsIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbFByb3BzID0gKDAsIGNvZGVfMS5hbGxTY2hlbWFQcm9wZXJ0aWVzKShzY2hlbWEpO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgYWxsUHJvcHMpIHtcbiAgICAgICAgICAgIGl0LmRlZmluZWRQcm9wZXJ0aWVzLmFkZChwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXQub3B0cy51bmV2YWx1YXRlZCAmJiBhbGxQcm9wcy5sZW5ndGggJiYgaXQucHJvcHMgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGl0LnByb3BzID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLnByb3BzKGdlbiwgKDAsIHV0aWxfMS50b0hhc2gpKGFsbFByb3BzKSwgaXQucHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBhbGxQcm9wcy5maWx0ZXIoKHApID0+ICEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hW3BdKSk7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKGhhc0RlZmF1bHQocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBhcHBseVByb3BlcnR5U2NoZW1hKHByb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlXzEucHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgcHJvcCwgaXQub3B0cy5vd25Qcm9wZXJ0aWVzKSk7XG4gICAgICAgICAgICAgICAgYXBwbHlQcm9wZXJ0eVNjaGVtYShwcm9wKTtcbiAgICAgICAgICAgICAgICBpZiAoIWl0LmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmVsc2UoKS52YXIodmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGdlbi5lbmRJZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3h0Lml0LmRlZmluZWRQcm9wZXJ0aWVzLmFkZChwcm9wKTtcbiAgICAgICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFzRGVmYXVsdChwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gaXQub3B0cy51c2VEZWZhdWx0cyAmJiAhaXQuY29tcG9zaXRlUnVsZSAmJiBzY2hlbWFbcHJvcF0uZGVmYXVsdCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5UHJvcGVydHlTY2hlbWEocHJvcCkge1xuICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAga2V5d29yZDogXCJwcm9wZXJ0aWVzXCIsXG4gICAgICAgICAgICAgICAgc2NoZW1hUHJvcDogcHJvcCxcbiAgICAgICAgICAgICAgICBkYXRhUHJvcDogcHJvcCxcbiAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJwcm9wZXJ0eSBuYW1lIG11c3QgYmUgdmFsaWRcIixcbiAgICBwYXJhbXM6ICh7IHBhcmFtcyB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7cHJvcGVydHlOYW1lOiAke3BhcmFtcy5wcm9wZXJ0eU5hbWV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicHJvcGVydHlOYW1lc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgZ2VuLmZvckluKFwia2V5XCIsIGRhdGEsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBwcm9wZXJ0eU5hbWU6IGtleSB9KTtcbiAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwicHJvcGVydHlOYW1lc1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGtleSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZXM6IFtcInN0cmluZ1wiXSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IHtcbiAgICAgICAgICAgICAgICBjeHQuZXJyb3IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpdC5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5icmVhaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcGVydHlOYW1lcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogW1widGhlblwiLCBcImVsc2VcIl0sXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBjb2RlKHsga2V5d29yZCwgcGFyZW50U2NoZW1hLCBpdCB9KSB7XG4gICAgICAgIGlmIChwYXJlbnRTY2hlbWEuaWYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgYFwiJHtrZXl3b3JkfVwiIHdpdGhvdXQgXCJpZlwiIGlzIGlnbm9yZWRgKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW5FbHNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZVVuaW9uID0gZXhwb3J0cy52YWxpZGF0ZUFycmF5ID0gZXhwb3J0cy51c2VQYXR0ZXJuID0gZXhwb3J0cy5jYWxsVmFsaWRhdGVDb2RlID0gZXhwb3J0cy5zY2hlbWFQcm9wZXJ0aWVzID0gZXhwb3J0cy5hbGxTY2hlbWFQcm9wZXJ0aWVzID0gZXhwb3J0cy5ub1Byb3BlcnR5SW5EYXRhID0gZXhwb3J0cy5wcm9wZXJ0eUluRGF0YSA9IGV4cG9ydHMuaXNPd25Qcm9wZXJ0eSA9IGV4cG9ydHMuaGFzUHJvcEZ1bmMgPSBleHBvcnRzLnJlcG9ydE1pc3NpbmdQcm9wID0gZXhwb3J0cy5jaGVja01pc3NpbmdQcm9wID0gZXhwb3J0cy5jaGVja1JlcG9ydE1pc3NpbmdQcm9wID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCB1dGlsXzIgPSByZXF1aXJlKFwiLi4vY29tcGlsZS91dGlsXCIpO1xuZnVuY3Rpb24gY2hlY2tSZXBvcnRNaXNzaW5nUHJvcChjeHQsIHByb3ApIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICBnZW4uaWYobm9Qcm9wZXJ0eUluRGF0YShnZW4sIGRhdGEsIHByb3AsIGl0Lm9wdHMub3duUHJvcGVydGllcyksICgpID0+IHtcbiAgICAgICAgY3h0LnNldFBhcmFtcyh7IG1pc3NpbmdQcm9wZXJ0eTogKDAsIGNvZGVnZW5fMS5fKSBgJHtwcm9wfWAgfSwgdHJ1ZSk7XG4gICAgICAgIGN4dC5lcnJvcigpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5jaGVja1JlcG9ydE1pc3NpbmdQcm9wID0gY2hlY2tSZXBvcnRNaXNzaW5nUHJvcDtcbmZ1bmN0aW9uIGNoZWNrTWlzc2luZ1Byb3AoeyBnZW4sIGRhdGEsIGl0OiB7IG9wdHMgfSB9LCBwcm9wZXJ0aWVzLCBtaXNzaW5nKSB7XG4gICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEub3IpKC4uLnByb3BlcnRpZXMubWFwKChwcm9wKSA9PiAoMCwgY29kZWdlbl8xLmFuZCkobm9Qcm9wZXJ0eUluRGF0YShnZW4sIGRhdGEsIHByb3AsIG9wdHMub3duUHJvcGVydGllcyksICgwLCBjb2RlZ2VuXzEuXykgYCR7bWlzc2luZ30gPSAke3Byb3B9YCkpKTtcbn1cbmV4cG9ydHMuY2hlY2tNaXNzaW5nUHJvcCA9IGNoZWNrTWlzc2luZ1Byb3A7XG5mdW5jdGlvbiByZXBvcnRNaXNzaW5nUHJvcChjeHQsIG1pc3NpbmcpIHtcbiAgICBjeHQuc2V0UGFyYW1zKHsgbWlzc2luZ1Byb3BlcnR5OiBtaXNzaW5nIH0sIHRydWUpO1xuICAgIGN4dC5lcnJvcigpO1xufVxuZXhwb3J0cy5yZXBvcnRNaXNzaW5nUHJvcCA9IHJlcG9ydE1pc3NpbmdQcm9wO1xuZnVuY3Rpb24gaGFzUHJvcEZ1bmMoZ2VuKSB7XG4gICAgcmV0dXJuIGdlbi5zY29wZVZhbHVlKFwiZnVuY1wiLCB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5ib3VuZC1tZXRob2RcbiAgICAgICAgcmVmOiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgICAgICBjb2RlOiAoMCwgY29kZWdlbl8xLl8pIGBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5YCxcbiAgICB9KTtcbn1cbmV4cG9ydHMuaGFzUHJvcEZ1bmMgPSBoYXNQcm9wRnVuYztcbmZ1bmN0aW9uIGlzT3duUHJvcGVydHkoZ2VuLCBkYXRhLCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke2hhc1Byb3BGdW5jKGdlbil9LmNhbGwoJHtkYXRhfSwgJHtwcm9wZXJ0eX0pYDtcbn1cbmV4cG9ydHMuaXNPd25Qcm9wZXJ0eSA9IGlzT3duUHJvcGVydHk7XG5mdW5jdGlvbiBwcm9wZXJ0eUluRGF0YShnZW4sIGRhdGEsIHByb3BlcnR5LCBvd25Qcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHByb3BlcnR5KX0gIT09IHVuZGVmaW5lZGA7XG4gICAgcmV0dXJuIG93blByb3BlcnRpZXMgPyAoMCwgY29kZWdlbl8xLl8pIGAke2NvbmR9ICYmICR7aXNPd25Qcm9wZXJ0eShnZW4sIGRhdGEsIHByb3BlcnR5KX1gIDogY29uZDtcbn1cbmV4cG9ydHMucHJvcGVydHlJbkRhdGEgPSBwcm9wZXJ0eUluRGF0YTtcbmZ1bmN0aW9uIG5vUHJvcGVydHlJbkRhdGEoZ2VuLCBkYXRhLCBwcm9wZXJ0eSwgb3duUHJvcGVydGllcykge1xuICAgIGNvbnN0IGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShwcm9wZXJ0eSl9ID09PSB1bmRlZmluZWRgO1xuICAgIHJldHVybiBvd25Qcm9wZXJ0aWVzID8gKDAsIGNvZGVnZW5fMS5vcikoY29uZCwgKDAsIGNvZGVnZW5fMS5ub3QpKGlzT3duUHJvcGVydHkoZ2VuLCBkYXRhLCBwcm9wZXJ0eSkpKSA6IGNvbmQ7XG59XG5leHBvcnRzLm5vUHJvcGVydHlJbkRhdGEgPSBub1Byb3BlcnR5SW5EYXRhO1xuZnVuY3Rpb24gYWxsU2NoZW1hUHJvcGVydGllcyhzY2hlbWFNYXApIHtcbiAgICByZXR1cm4gc2NoZW1hTWFwID8gT2JqZWN0LmtleXMoc2NoZW1hTWFwKS5maWx0ZXIoKHApID0+IHAgIT09IFwiX19wcm90b19fXCIpIDogW107XG59XG5leHBvcnRzLmFsbFNjaGVtYVByb3BlcnRpZXMgPSBhbGxTY2hlbWFQcm9wZXJ0aWVzO1xuZnVuY3Rpb24gc2NoZW1hUHJvcGVydGllcyhpdCwgc2NoZW1hTWFwKSB7XG4gICAgcmV0dXJuIGFsbFNjaGVtYVByb3BlcnRpZXMoc2NoZW1hTWFwKS5maWx0ZXIoKHApID0+ICEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hTWFwW3BdKSk7XG59XG5leHBvcnRzLnNjaGVtYVByb3BlcnRpZXMgPSBzY2hlbWFQcm9wZXJ0aWVzO1xuZnVuY3Rpb24gY2FsbFZhbGlkYXRlQ29kZSh7IHNjaGVtYUNvZGUsIGRhdGEsIGl0OiB7IGdlbiwgdG9wU2NoZW1hUmVmLCBzY2hlbWFQYXRoLCBlcnJvclBhdGggfSwgaXQgfSwgZnVuYywgY29udGV4dCwgcGFzc1NjaGVtYSkge1xuICAgIGNvbnN0IGRhdGFBbmRTY2hlbWEgPSBwYXNzU2NoZW1hID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSwgJHtkYXRhfSwgJHt0b3BTY2hlbWFSZWZ9JHtzY2hlbWFQYXRofWAgOiBkYXRhO1xuICAgIGNvbnN0IHZhbEN4dCA9IFtcbiAgICAgICAgW25hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsICgwLCBjb2RlZ2VuXzEuc3RyQ29uY2F0KShuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCBlcnJvclBhdGgpXSxcbiAgICAgICAgW25hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhLCBpdC5wYXJlbnREYXRhXSxcbiAgICAgICAgW25hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhUHJvcGVydHksIGl0LnBhcmVudERhdGFQcm9wZXJ0eV0sXG4gICAgICAgIFtuYW1lc18xLmRlZmF1bHQucm9vdERhdGEsIG5hbWVzXzEuZGVmYXVsdC5yb290RGF0YV0sXG4gICAgXTtcbiAgICBpZiAoaXQub3B0cy5keW5hbWljUmVmKVxuICAgICAgICB2YWxDeHQucHVzaChbbmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzLCBuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnNdKTtcbiAgICBjb25zdCBhcmdzID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhQW5kU2NoZW1hfSwgJHtnZW4ub2JqZWN0KC4uLnZhbEN4dCl9YDtcbiAgICByZXR1cm4gY29udGV4dCAhPT0gY29kZWdlbl8xLm5pbCA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZnVuY30uY2FsbCgke2NvbnRleHR9LCAke2FyZ3N9KWAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2Z1bmN9KCR7YXJnc30pYDtcbn1cbmV4cG9ydHMuY2FsbFZhbGlkYXRlQ29kZSA9IGNhbGxWYWxpZGF0ZUNvZGU7XG5jb25zdCBuZXdSZWdFeHAgPSAoMCwgY29kZWdlbl8xLl8pIGBuZXcgUmVnRXhwYDtcbmZ1bmN0aW9uIHVzZVBhdHRlcm4oeyBnZW4sIGl0OiB7IG9wdHMgfSB9LCBwYXR0ZXJuKSB7XG4gICAgY29uc3QgdSA9IG9wdHMudW5pY29kZVJlZ0V4cCA/IFwidVwiIDogXCJcIjtcbiAgICBjb25zdCB7IHJlZ0V4cCB9ID0gb3B0cy5jb2RlO1xuICAgIGNvbnN0IHJ4ID0gcmVnRXhwKHBhdHRlcm4sIHUpO1xuICAgIHJldHVybiBnZW4uc2NvcGVWYWx1ZShcInBhdHRlcm5cIiwge1xuICAgICAgICBrZXk6IHJ4LnRvU3RyaW5nKCksXG4gICAgICAgIHJlZjogcngsXG4gICAgICAgIGNvZGU6ICgwLCBjb2RlZ2VuXzEuXykgYCR7cmVnRXhwLmNvZGUgPT09IFwibmV3IFJlZ0V4cFwiID8gbmV3UmVnRXhwIDogKDAsIHV0aWxfMi51c2VGdW5jKShnZW4sIHJlZ0V4cCl9KCR7cGF0dGVybn0sICR7dX0pYCxcbiAgICB9KTtcbn1cbmV4cG9ydHMudXNlUGF0dGVybiA9IHVzZVBhdHRlcm47XG5mdW5jdGlvbiB2YWxpZGF0ZUFycmF5KGN4dCkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICBpZiAoaXQuYWxsRXJyb3JzKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkQXJyID0gZ2VuLmxldChcInZhbGlkXCIsIHRydWUpO1xuICAgICAgICB2YWxpZGF0ZUl0ZW1zKCgpID0+IGdlbi5hc3NpZ24odmFsaWRBcnIsIGZhbHNlKSk7XG4gICAgICAgIHJldHVybiB2YWxpZEFycjtcbiAgICB9XG4gICAgZ2VuLnZhcih2YWxpZCwgdHJ1ZSk7XG4gICAgdmFsaWRhdGVJdGVtcygoKSA9PiBnZW4uYnJlYWsoKSk7XG4gICAgcmV0dXJuIHZhbGlkO1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlSXRlbXMobm90VmFsaWQpIHtcbiAgICAgICAgY29uc3QgbGVuID0gZ2VuLmNvbnN0KFwibGVuXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoYCk7XG4gICAgICAgIGdlbi5mb3JSYW5nZShcImlcIiwgMCwgbGVuLCAoaSkgPT4ge1xuICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAga2V5d29yZCxcbiAgICAgICAgICAgICAgICBkYXRhUHJvcDogaSxcbiAgICAgICAgICAgICAgICBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLk51bSxcbiAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCBub3RWYWxpZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVBcnJheSA9IHZhbGlkYXRlQXJyYXk7XG5mdW5jdGlvbiB2YWxpZGF0ZVVuaW9uKGN4dCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICBjb25zdCBhbHdheXNWYWxpZCA9IHNjaGVtYS5zb21lKChzY2gpID0+ICgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2gpKTtcbiAgICBpZiAoYWx3YXlzVmFsaWQgJiYgIWl0Lm9wdHMudW5ldmFsdWF0ZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCBmYWxzZSk7XG4gICAgY29uc3Qgc2NoVmFsaWQgPSBnZW4ubmFtZShcIl92YWxpZFwiKTtcbiAgICBnZW4uYmxvY2soKCkgPT4gc2NoZW1hLmZvckVhY2goKF9zY2gsIGkpID0+IHtcbiAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICBrZXl3b3JkLFxuICAgICAgICAgICAgc2NoZW1hUHJvcDogaSxcbiAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgIH0sIHNjaFZhbGlkKTtcbiAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgKDAsIGNvZGVnZW5fMS5fKSBgJHt2YWxpZH0gfHwgJHtzY2hWYWxpZH1gKTtcbiAgICAgICAgY29uc3QgbWVyZ2VkID0gY3h0Lm1lcmdlVmFsaWRFdmFsdWF0ZWQoc2NoQ3h0LCBzY2hWYWxpZCk7XG4gICAgICAgIC8vIGNhbiBzaG9ydC1jaXJjdWl0IGlmIGB1bmV2YWx1YXRlZFByb3BlcnRpZXMvSXRlbXNgIG5vdCBzdXBwb3J0ZWQgKG9wdHMudW5ldmFsdWF0ZWQgIT09IHRydWUpXG4gICAgICAgIC8vIG9yIGlmIGFsbCBwcm9wZXJ0aWVzIGFuZCBpdGVtcyB3ZXJlIGV2YWx1YXRlZCAoaXQucHJvcHMgPT09IHRydWUgJiYgaXQuaXRlbXMgPT09IHRydWUpXG4gICAgICAgIGlmICghbWVyZ2VkKVxuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCkpO1xuICAgIH0pKTtcbiAgICBjeHQucmVzdWx0KHZhbGlkLCAoKSA9PiBjeHQucmVzZXQoKSwgKCkgPT4gY3h0LmVycm9yKHRydWUpKTtcbn1cbmV4cG9ydHMudmFsaWRhdGVVbmlvbiA9IHZhbGlkYXRlVW5pb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiaWRcIixcbiAgICBjb2RlKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05PVCBTVVBQT1JURUQ6IGtleXdvcmQgXCJpZFwiLCB1c2UgXCIkaWRcIiBmb3Igc2NoZW1hIElEJyk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGlkXzEgPSByZXF1aXJlKFwiLi9pZFwiKTtcbmNvbnN0IHJlZl8xID0gcmVxdWlyZShcIi4vcmVmXCIpO1xuY29uc3QgY29yZSA9IFtcbiAgICBcIiRzY2hlbWFcIixcbiAgICBcIiRpZFwiLFxuICAgIFwiJGRlZnNcIixcbiAgICBcIiR2b2NhYnVsYXJ5XCIsXG4gICAgeyBrZXl3b3JkOiBcIiRjb21tZW50XCIgfSxcbiAgICBcImRlZmluaXRpb25zXCIsXG4gICAgaWRfMS5kZWZhdWx0LFxuICAgIHJlZl8xLmRlZmF1bHQsXG5dO1xuZXhwb3J0cy5kZWZhdWx0ID0gY29yZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jYWxsUmVmID0gZXhwb3J0cy5nZXRWYWxpZGF0ZSA9IHZvaWQgMDtcbmNvbnN0IHJlZl9lcnJvcl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvcmVmX2Vycm9yXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL25hbWVzXCIpO1xuY29uc3QgY29tcGlsZV8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiJHJlZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwic3RyaW5nXCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYTogJHJlZiwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBiYXNlSWQsIHNjaGVtYUVudjogZW52LCB2YWxpZGF0ZU5hbWUsIG9wdHMsIHNlbGYgfSA9IGl0O1xuICAgICAgICBjb25zdCB7IHJvb3QgfSA9IGVudjtcbiAgICAgICAgaWYgKCgkcmVmID09PSBcIiNcIiB8fCAkcmVmID09PSBcIiMvXCIpICYmIGJhc2VJZCA9PT0gcm9vdC5iYXNlSWQpXG4gICAgICAgICAgICByZXR1cm4gY2FsbFJvb3RSZWYoKTtcbiAgICAgICAgY29uc3Qgc2NoT3JFbnYgPSBjb21waWxlXzEucmVzb2x2ZVJlZi5jYWxsKHNlbGYsIHJvb3QsIGJhc2VJZCwgJHJlZik7XG4gICAgICAgIGlmIChzY2hPckVudiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IHJlZl9lcnJvcl8xLmRlZmF1bHQoaXQub3B0cy51cmlSZXNvbHZlciwgYmFzZUlkLCAkcmVmKTtcbiAgICAgICAgaWYgKHNjaE9yRW52IGluc3RhbmNlb2YgY29tcGlsZV8xLlNjaGVtYUVudilcbiAgICAgICAgICAgIHJldHVybiBjYWxsVmFsaWRhdGUoc2NoT3JFbnYpO1xuICAgICAgICByZXR1cm4gaW5saW5lUmVmU2NoZW1hKHNjaE9yRW52KTtcbiAgICAgICAgZnVuY3Rpb24gY2FsbFJvb3RSZWYoKSB7XG4gICAgICAgICAgICBpZiAoZW52ID09PSByb290KVxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsUmVmKGN4dCwgdmFsaWRhdGVOYW1lLCBlbnYsIGVudi4kYXN5bmMpO1xuICAgICAgICAgICAgY29uc3Qgcm9vdE5hbWUgPSBnZW4uc2NvcGVWYWx1ZShcInJvb3RcIiwgeyByZWY6IHJvb3QgfSk7XG4gICAgICAgICAgICByZXR1cm4gY2FsbFJlZihjeHQsICgwLCBjb2RlZ2VuXzEuXykgYCR7cm9vdE5hbWV9LnZhbGlkYXRlYCwgcm9vdCwgcm9vdC4kYXN5bmMpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxWYWxpZGF0ZShzY2gpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBnZXRWYWxpZGF0ZShjeHQsIHNjaCk7XG4gICAgICAgICAgICBjYWxsUmVmKGN4dCwgdiwgc2NoLCBzY2guJGFzeW5jKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpbmxpbmVSZWZTY2hlbWEoc2NoKSB7XG4gICAgICAgICAgICBjb25zdCBzY2hOYW1lID0gZ2VuLnNjb3BlVmFsdWUoXCJzY2hlbWFcIiwgb3B0cy5jb2RlLnNvdXJjZSA9PT0gdHJ1ZSA/IHsgcmVmOiBzY2gsIGNvZGU6ICgwLCBjb2RlZ2VuXzEuc3RyaW5naWZ5KShzY2gpIH0gOiB7IHJlZjogc2NoIH0pO1xuICAgICAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiBzY2gsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVzOiBbXSxcbiAgICAgICAgICAgICAgICBzY2hlbWFQYXRoOiBjb2RlZ2VuXzEubmlsLFxuICAgICAgICAgICAgICAgIHRvcFNjaGVtYVJlZjogc2NoTmFtZSxcbiAgICAgICAgICAgICAgICBlcnJTY2hlbWFQYXRoOiAkcmVmLFxuICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm1lcmdlRXZhbHVhdGVkKHNjaEN4dCk7XG4gICAgICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5mdW5jdGlvbiBnZXRWYWxpZGF0ZShjeHQsIHNjaCkge1xuICAgIGNvbnN0IHsgZ2VuIH0gPSBjeHQ7XG4gICAgcmV0dXJuIHNjaC52YWxpZGF0ZVxuICAgICAgICA/IGdlbi5zY29wZVZhbHVlKFwidmFsaWRhdGVcIiwgeyByZWY6IHNjaC52YWxpZGF0ZSB9KVxuICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7Z2VuLnNjb3BlVmFsdWUoXCJ3cmFwcGVyXCIsIHsgcmVmOiBzY2ggfSl9LnZhbGlkYXRlYDtcbn1cbmV4cG9ydHMuZ2V0VmFsaWRhdGUgPSBnZXRWYWxpZGF0ZTtcbmZ1bmN0aW9uIGNhbGxSZWYoY3h0LCB2LCBzY2gsICRhc3luYykge1xuICAgIGNvbnN0IHsgZ2VuLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHsgYWxsRXJyb3JzLCBzY2hlbWFFbnY6IGVudiwgb3B0cyB9ID0gaXQ7XG4gICAgY29uc3QgcGFzc0N4dCA9IG9wdHMucGFzc0NvbnRleHQgPyBuYW1lc18xLmRlZmF1bHQudGhpcyA6IGNvZGVnZW5fMS5uaWw7XG4gICAgaWYgKCRhc3luYylcbiAgICAgICAgY2FsbEFzeW5jUmVmKCk7XG4gICAgZWxzZVxuICAgICAgICBjYWxsU3luY1JlZigpO1xuICAgIGZ1bmN0aW9uIGNhbGxBc3luY1JlZigpIHtcbiAgICAgICAgaWYgKCFlbnYuJGFzeW5jKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXN5bmMgc2NoZW1hIHJlZmVyZW5jZWQgYnkgc3luYyBzY2hlbWFcIik7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIpO1xuICAgICAgICBnZW4udHJ5KCgpID0+IHtcbiAgICAgICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYGF3YWl0ICR7KDAsIGNvZGVfMS5jYWxsVmFsaWRhdGVDb2RlKShjeHQsIHYsIHBhc3NDeHQpfWApO1xuICAgICAgICAgICAgYWRkRXZhbHVhdGVkRnJvbSh2KTsgLy8gVE9ETyB3aWxsIG5vdCB3b3JrIHdpdGggYXN5bmMsIGl0IGhhcyB0byBiZSByZXR1cm5lZCB3aXRoIHRoZSByZXN1bHRcbiAgICAgICAgICAgIGlmICghYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHRydWUpO1xuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCEoJHtlfSBpbnN0YW5jZW9mICR7aXQuVmFsaWRhdGlvbkVycm9yfSlgLCAoKSA9PiBnZW4udGhyb3coZSkpO1xuICAgICAgICAgICAgYWRkRXJyb3JzRnJvbShlKTtcbiAgICAgICAgICAgIGlmICghYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNhbGxTeW5jUmVmKCkge1xuICAgICAgICBjeHQucmVzdWx0KCgwLCBjb2RlXzEuY2FsbFZhbGlkYXRlQ29kZSkoY3h0LCB2LCBwYXNzQ3h0KSwgKCkgPT4gYWRkRXZhbHVhdGVkRnJvbSh2KSwgKCkgPT4gYWRkRXJyb3JzRnJvbSh2KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZEVycm9yc0Zyb20oc291cmNlKSB7XG4gICAgICAgIGNvbnN0IGVycnMgPSAoMCwgY29kZWdlbl8xLl8pIGAke3NvdXJjZX0uZXJyb3JzYDtcbiAgICAgICAgZ2VuLmFzc2lnbihuYW1lc18xLmRlZmF1bHQudkVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30gPT09IG51bGwgPyAke2VycnN9IDogJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30uY29uY2F0KCR7ZXJyc30pYCk7IC8vIFRPRE8gdGFnZ2VkXG4gICAgICAgIGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LmVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30ubGVuZ3RoYCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZEV2YWx1YXRlZEZyb20oc291cmNlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCFpdC5vcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBzY2hFdmFsdWF0ZWQgPSAoX2EgPSBzY2ggPT09IG51bGwgfHwgc2NoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2gudmFsaWRhdGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ldmFsdWF0ZWQ7XG4gICAgICAgIC8vIFRPRE8gcmVmYWN0b3JcbiAgICAgICAgaWYgKGl0LnByb3BzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoc2NoRXZhbHVhdGVkICYmICFzY2hFdmFsdWF0ZWQuZHluYW1pY1Byb3BzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjaEV2YWx1YXRlZC5wcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0LnByb3BzID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLnByb3BzKGdlbiwgc2NoRXZhbHVhdGVkLnByb3BzLCBpdC5wcm9wcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBnZW4udmFyKFwicHJvcHNcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtzb3VyY2V9LmV2YWx1YXRlZC5wcm9wc2ApO1xuICAgICAgICAgICAgICAgIGl0LnByb3BzID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLnByb3BzKGdlbiwgcHJvcHMsIGl0LnByb3BzLCBjb2RlZ2VuXzEuTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0Lml0ZW1zICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoc2NoRXZhbHVhdGVkICYmICFzY2hFdmFsdWF0ZWQuZHluYW1pY0l0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjaEV2YWx1YXRlZC5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0Lml0ZW1zID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLml0ZW1zKGdlbiwgc2NoRXZhbHVhdGVkLml0ZW1zLCBpdC5pdGVtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBnZW4udmFyKFwiaXRlbXNcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtzb3VyY2V9LmV2YWx1YXRlZC5pdGVtc2ApO1xuICAgICAgICAgICAgICAgIGl0Lml0ZW1zID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLml0ZW1zKGdlbiwgaXRlbXMsIGl0Lml0ZW1zLCBjb2RlZ2VuXzEuTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmNhbGxSZWYgPSBjYWxsUmVmO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVmLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vZGlzY3JpbWluYXRvci90eXBlc1wiKTtcbmNvbnN0IGNvbXBpbGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBkaXNjckVycm9yLCB0YWdOYW1lIH0gfSkgPT4gZGlzY3JFcnJvciA9PT0gdHlwZXNfMS5EaXNjckVycm9yLlRhZ1xuICAgICAgICA/IGB0YWcgXCIke3RhZ05hbWV9XCIgbXVzdCBiZSBzdHJpbmdgXG4gICAgICAgIDogYHZhbHVlIG9mIHRhZyBcIiR7dGFnTmFtZX1cIiBtdXN0IGJlIGluIG9uZU9mYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBkaXNjckVycm9yLCB0YWcsIHRhZ05hbWUgfSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7ZXJyb3I6ICR7ZGlzY3JFcnJvcn0sIHRhZzogJHt0YWdOYW1lfSwgdGFnVmFsdWU6ICR7dGFnfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImRpc2NyaW1pbmF0b3JcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwib2JqZWN0XCIsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IG9uZU9mIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGlmICghaXQub3B0cy5kaXNjcmltaW5hdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkaXNjcmltaW5hdG9yOiByZXF1aXJlcyBkaXNjcmltaW5hdG9yIG9wdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YWdOYW1lID0gc2NoZW1hLnByb3BlcnR5TmFtZTtcbiAgICAgICAgaWYgKHR5cGVvZiB0YWdOYW1lICE9IFwic3RyaW5nXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkaXNjcmltaW5hdG9yOiByZXF1aXJlcyBwcm9wZXJ0eU5hbWVcIik7XG4gICAgICAgIGlmIChzY2hlbWEubWFwcGluZylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRpc2NyaW1pbmF0b3I6IG1hcHBpbmcgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgaWYgKCFvbmVPZilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRpc2NyaW1pbmF0b3I6IHJlcXVpcmVzIG9uZU9mIGtleXdvcmRcIik7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIGZhbHNlKTtcbiAgICAgICAgY29uc3QgdGFnID0gZ2VuLmNvbnN0KFwidGFnXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHRhZ05hbWUpfWApO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7dGFnfSA9PSBcInN0cmluZ1wiYCwgKCkgPT4gdmFsaWRhdGVNYXBwaW5nKCksICgpID0+IGN4dC5lcnJvcihmYWxzZSwgeyBkaXNjckVycm9yOiB0eXBlc18xLkRpc2NyRXJyb3IuVGFnLCB0YWcsIHRhZ05hbWUgfSkpO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZU1hcHBpbmcoKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gZ2V0TWFwcGluZygpO1xuICAgICAgICAgICAgZ2VuLmlmKGZhbHNlKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGFnVmFsdWUgaW4gbWFwcGluZykge1xuICAgICAgICAgICAgICAgIGdlbi5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHt0YWd9ID09PSAke3RhZ1ZhbHVlfWApO1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGFwcGx5VGFnU2NoZW1hKG1hcHBpbmdbdGFnVmFsdWVdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZW4uZWxzZSgpO1xuICAgICAgICAgICAgY3h0LmVycm9yKGZhbHNlLCB7IGRpc2NyRXJyb3I6IHR5cGVzXzEuRGlzY3JFcnJvci5NYXBwaW5nLCB0YWcsIHRhZ05hbWUgfSk7XG4gICAgICAgICAgICBnZW4uZW5kSWYoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcHBseVRhZ1NjaGVtYShzY2hlbWFQcm9wKSB7XG4gICAgICAgICAgICBjb25zdCBfdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQ6IFwib25lT2ZcIiwgc2NoZW1hUHJvcCB9LCBfdmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm1lcmdlRXZhbHVhdGVkKHNjaEN4dCwgY29kZWdlbl8xLk5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIF92YWxpZDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRNYXBwaW5nKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3Qgb25lT2ZNYXBwaW5nID0ge307XG4gICAgICAgICAgICBjb25zdCB0b3BSZXF1aXJlZCA9IGhhc1JlcXVpcmVkKHBhcmVudFNjaGVtYSk7XG4gICAgICAgICAgICBsZXQgdGFnUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbmVPZi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzY2ggPSBvbmVPZltpXTtcbiAgICAgICAgICAgICAgICBpZiAoKHNjaCA9PT0gbnVsbCB8fCBzY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaC4kcmVmKSAmJiAhKDAsIHV0aWxfMS5zY2hlbWFIYXNSdWxlc0J1dFJlZikoc2NoLCBpdC5zZWxmLlJVTEVTKSkge1xuICAgICAgICAgICAgICAgICAgICBzY2ggPSBjb21waWxlXzEucmVzb2x2ZVJlZi5jYWxsKGl0LnNlbGYsIGl0LnNjaGVtYUVudi5yb290LCBpdC5iYXNlSWQsIHNjaCA9PT0gbnVsbCB8fCBzY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaC4kcmVmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaCBpbnN0YW5jZW9mIGNvbXBpbGVfMS5TY2hlbWFFbnYpXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2ggPSBzY2guc2NoZW1hO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wU2NoID0gKF9hID0gc2NoID09PSBudWxsIHx8IHNjaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoLnByb3BlcnRpZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0YWdOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3BTY2ggIT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRpc2NyaW1pbmF0b3I6IG9uZU9mIHN1YnNjaGVtYXMgKG9yIHJlZmVyZW5jZWQgc2NoZW1hcykgbXVzdCBoYXZlIFwicHJvcGVydGllcy8ke3RhZ05hbWV9XCJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFnUmVxdWlyZWQgPSB0YWdSZXF1aXJlZCAmJiAodG9wUmVxdWlyZWQgfHwgaGFzUmVxdWlyZWQoc2NoKSk7XG4gICAgICAgICAgICAgICAgYWRkTWFwcGluZ3MocHJvcFNjaCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRhZ1JlcXVpcmVkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGlzY3JpbWluYXRvcjogXCIke3RhZ05hbWV9XCIgbXVzdCBiZSByZXF1aXJlZGApO1xuICAgICAgICAgICAgcmV0dXJuIG9uZU9mTWFwcGluZztcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhc1JlcXVpcmVkKHsgcmVxdWlyZWQgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHJlcXVpcmVkKSAmJiByZXF1aXJlZC5pbmNsdWRlcyh0YWdOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZE1hcHBpbmdzKHNjaCwgaSkge1xuICAgICAgICAgICAgICAgIGlmIChzY2guY29uc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkTWFwcGluZyhzY2guY29uc3QsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzY2guZW51bSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRhZ1ZhbHVlIG9mIHNjaC5lbnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRNYXBwaW5nKHRhZ1ZhbHVlLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNjcmltaW5hdG9yOiBcInByb3BlcnRpZXMvJHt0YWdOYW1lfVwiIG11c3QgaGF2ZSBcImNvbnN0XCIgb3IgXCJlbnVtXCJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRNYXBwaW5nKHRhZ1ZhbHVlLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YWdWYWx1ZSAhPSBcInN0cmluZ1wiIHx8IHRhZ1ZhbHVlIGluIG9uZU9mTWFwcGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRpc2NyaW1pbmF0b3I6IFwiJHt0YWdOYW1lfVwiIHZhbHVlcyBtdXN0IGJlIHVuaXF1ZSBzdHJpbmdzYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uZU9mTWFwcGluZ1t0YWdWYWx1ZV0gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlzY3JFcnJvciA9IHZvaWQgMDtcbnZhciBEaXNjckVycm9yO1xuKGZ1bmN0aW9uIChEaXNjckVycm9yKSB7XG4gICAgRGlzY3JFcnJvcltcIlRhZ1wiXSA9IFwidGFnXCI7XG4gICAgRGlzY3JFcnJvcltcIk1hcHBpbmdcIl0gPSBcIm1hcHBpbmdcIjtcbn0pKERpc2NyRXJyb3IgPSBleHBvcnRzLkRpc2NyRXJyb3IgfHwgKGV4cG9ydHMuRGlzY3JFcnJvciA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCIuL2NvcmVcIik7XG5jb25zdCB2YWxpZGF0aW9uXzEgPSByZXF1aXJlKFwiLi92YWxpZGF0aW9uXCIpO1xuY29uc3QgYXBwbGljYXRvcl8xID0gcmVxdWlyZShcIi4vYXBwbGljYXRvclwiKTtcbmNvbnN0IGR5bmFtaWNfMSA9IHJlcXVpcmUoXCIuL2R5bmFtaWNcIik7XG5jb25zdCBuZXh0XzEgPSByZXF1aXJlKFwiLi9uZXh0XCIpO1xuY29uc3QgdW5ldmFsdWF0ZWRfMSA9IHJlcXVpcmUoXCIuL3VuZXZhbHVhdGVkXCIpO1xuY29uc3QgZm9ybWF0XzEgPSByZXF1aXJlKFwiLi9mb3JtYXRcIik7XG5jb25zdCBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4vbWV0YWRhdGFcIik7XG5jb25zdCBkcmFmdDIwMjBWb2NhYnVsYXJpZXMgPSBbXG4gICAgZHluYW1pY18xLmRlZmF1bHQsXG4gICAgY29yZV8xLmRlZmF1bHQsXG4gICAgdmFsaWRhdGlvbl8xLmRlZmF1bHQsXG4gICAgKDAsIGFwcGxpY2F0b3JfMS5kZWZhdWx0KSh0cnVlKSxcbiAgICBmb3JtYXRfMS5kZWZhdWx0LFxuICAgIG1ldGFkYXRhXzEubWV0YWRhdGFWb2NhYnVsYXJ5LFxuICAgIG1ldGFkYXRhXzEuY29udGVudFZvY2FidWxhcnksXG4gICAgbmV4dF8xLmRlZmF1bHQsXG4gICAgdW5ldmFsdWF0ZWRfMS5kZWZhdWx0LFxuXTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRyYWZ0MjAyMFZvY2FidWxhcmllcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRyYWZ0MjAyMC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCIuL2NvcmVcIik7XG5jb25zdCB2YWxpZGF0aW9uXzEgPSByZXF1aXJlKFwiLi92YWxpZGF0aW9uXCIpO1xuY29uc3QgYXBwbGljYXRvcl8xID0gcmVxdWlyZShcIi4vYXBwbGljYXRvclwiKTtcbmNvbnN0IGZvcm1hdF8xID0gcmVxdWlyZShcIi4vZm9ybWF0XCIpO1xuY29uc3QgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuL21ldGFkYXRhXCIpO1xuY29uc3QgZHJhZnQ3Vm9jYWJ1bGFyaWVzID0gW1xuICAgIGNvcmVfMS5kZWZhdWx0LFxuICAgIHZhbGlkYXRpb25fMS5kZWZhdWx0LFxuICAgICgwLCBhcHBsaWNhdG9yXzEuZGVmYXVsdCkoKSxcbiAgICBmb3JtYXRfMS5kZWZhdWx0LFxuICAgIG1ldGFkYXRhXzEubWV0YWRhdGFWb2NhYnVsYXJ5LFxuICAgIG1ldGFkYXRhXzEuY29udGVudFZvY2FidWxhcnksXG5dO1xuZXhwb3J0cy5kZWZhdWx0ID0gZHJhZnQ3Vm9jYWJ1bGFyaWVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhZnQ3LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5keW5hbWljQW5jaG9yID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9uYW1lc1wiKTtcbmNvbnN0IGNvbXBpbGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlXCIpO1xuY29uc3QgcmVmXzEgPSByZXF1aXJlKFwiLi4vY29yZS9yZWZcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCIkZHluYW1pY0FuY2hvclwiLFxuICAgIHNjaGVtYVR5cGU6IFwic3RyaW5nXCIsXG4gICAgY29kZTogKGN4dCkgPT4gZHluYW1pY0FuY2hvcihjeHQsIGN4dC5zY2hlbWEpLFxufTtcbmZ1bmN0aW9uIGR5bmFtaWNBbmNob3IoY3h0LCBhbmNob3IpIHtcbiAgICBjb25zdCB7IGdlbiwgaXQgfSA9IGN4dDtcbiAgICBpdC5zY2hlbWFFbnYucm9vdC5keW5hbWljQW5jaG9yc1thbmNob3JdID0gdHJ1ZTtcbiAgICBjb25zdCB2ID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnN9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShhbmNob3IpfWA7XG4gICAgY29uc3QgdmFsaWRhdGUgPSBpdC5lcnJTY2hlbWFQYXRoID09PSBcIiNcIiA/IGl0LnZhbGlkYXRlTmFtZSA6IF9nZXRWYWxpZGF0ZShjeHQpO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAhJHt2fWAsICgpID0+IGdlbi5hc3NpZ24odiwgdmFsaWRhdGUpKTtcbn1cbmV4cG9ydHMuZHluYW1pY0FuY2hvciA9IGR5bmFtaWNBbmNob3I7XG5mdW5jdGlvbiBfZ2V0VmFsaWRhdGUoY3h0KSB7XG4gICAgY29uc3QgeyBzY2hlbWFFbnYsIHNjaGVtYSwgc2VsZiB9ID0gY3h0Lml0O1xuICAgIGNvbnN0IHsgcm9vdCwgYmFzZUlkLCBsb2NhbFJlZnMsIG1ldGEgfSA9IHNjaGVtYUVudi5yb290O1xuICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHNlbGYub3B0cztcbiAgICBjb25zdCBzY2ggPSBuZXcgY29tcGlsZV8xLlNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIHJvb3QsIGJhc2VJZCwgbG9jYWxSZWZzLCBtZXRhIH0pO1xuICAgIGNvbXBpbGVfMS5jb21waWxlU2NoZW1hLmNhbGwoc2VsZiwgc2NoKTtcbiAgICByZXR1cm4gKDAsIHJlZl8xLmdldFZhbGlkYXRlKShjeHQsIHNjaCk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1keW5hbWljQW5jaG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5keW5hbWljUmVmID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9uYW1lc1wiKTtcbmNvbnN0IHJlZl8xID0gcmVxdWlyZShcIi4uL2NvcmUvcmVmXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiJGR5bmFtaWNSZWZcIixcbiAgICBzY2hlbWFUeXBlOiBcInN0cmluZ1wiLFxuICAgIGNvZGU6IChjeHQpID0+IGR5bmFtaWNSZWYoY3h0LCBjeHQuc2NoZW1hKSxcbn07XG5mdW5jdGlvbiBkeW5hbWljUmVmKGN4dCwgcmVmKSB7XG4gICAgY29uc3QgeyBnZW4sIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgaWYgKHJlZlswXSAhPT0gXCIjXCIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgXCIke2tleXdvcmR9XCIgb25seSBzdXBwb3J0cyBoYXNoIGZyYWdtZW50IHJlZmVyZW5jZWApO1xuICAgIGNvbnN0IGFuY2hvciA9IHJlZi5zbGljZSgxKTtcbiAgICBpZiAoaXQuYWxsRXJyb3JzKSB7XG4gICAgICAgIF9keW5hbWljUmVmKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCBmYWxzZSk7XG4gICAgICAgIF9keW5hbWljUmVmKHZhbGlkKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX2R5bmFtaWNSZWYodmFsaWQpIHtcbiAgICAgICAgLy8gVE9ETyB0aGUgYXNzdW1wdGlvbiBoZXJlIGlzIHRoYXQgYHJlY3Vyc2l2ZVJlZjogI2AgYWx3YXlzIHBvaW50cyB0byB0aGUgcm9vdFxuICAgICAgICAvLyBvZiB0aGUgc2NoZW1hIG9iamVjdCwgd2hpY2ggaXMgbm90IGNvcnJlY3QsIGJlY2F1c2UgdGhlcmUgbWF5IGJlICRpZCB0aGF0XG4gICAgICAgIC8vIG1ha2VzICMgcG9pbnQgdG8gaXQsIGFuZCB0aGUgdGFyZ2V0IHNjaGVtYSBtYXkgbm90IGNvbnRhaW4gZHluYW1pYy9yZWN1cnNpdmVBbmNob3IuXG4gICAgICAgIC8vIEJlY2F1c2Ugb2YgdGhhdCAyIHRlc3RzIGluIHJlY3Vyc2l2ZVJlZi5qc29uIGZhaWwuXG4gICAgICAgIC8vIFRoaXMgaXMgYSBzaW1pbGFyIHByb2JsZW0gdG8gIzgxNSAoYCRpZGAgZG9lc24ndCBhbHRlciByZXNvbHV0aW9uIHNjb3BlIGZvciBgeyBcIiRyZWZcIjogXCIjXCIgfWApLlxuICAgICAgICAvLyAoVGhpcyBwcm9ibGVtIGlzIG5vdCB0ZXN0ZWQgaW4gSlNPTi1TY2hlbWEtVGVzdC1TdWl0ZSlcbiAgICAgICAgaWYgKGl0LnNjaGVtYUVudi5yb290LmR5bmFtaWNBbmNob3JzW2FuY2hvcl0pIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBnZW4ubGV0KFwiX3ZcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnN9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShhbmNob3IpfWApO1xuICAgICAgICAgICAgZ2VuLmlmKHYsIF9jYWxsUmVmKHYsIHZhbGlkKSwgX2NhbGxSZWYoaXQudmFsaWRhdGVOYW1lLCB2YWxpZCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX2NhbGxSZWYoaXQudmFsaWRhdGVOYW1lLCB2YWxpZCkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBfY2FsbFJlZih2YWxpZGF0ZSwgdmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkXG4gICAgICAgICAgICA/ICgpID0+IGdlbi5ibG9jaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgKDAsIHJlZl8xLmNhbGxSZWYpKGN4dCwgdmFsaWRhdGUpO1xuICAgICAgICAgICAgICAgIGdlbi5sZXQodmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogKCkgPT4gKDAsIHJlZl8xLmNhbGxSZWYpKGN4dCwgdmFsaWRhdGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZHluYW1pY1JlZiA9IGR5bmFtaWNSZWY7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1keW5hbWljUmVmLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZHluYW1pY0FuY2hvcl8xID0gcmVxdWlyZShcIi4vZHluYW1pY0FuY2hvclwiKTtcbmNvbnN0IGR5bmFtaWNSZWZfMSA9IHJlcXVpcmUoXCIuL2R5bmFtaWNSZWZcIik7XG5jb25zdCByZWN1cnNpdmVBbmNob3JfMSA9IHJlcXVpcmUoXCIuL3JlY3Vyc2l2ZUFuY2hvclwiKTtcbmNvbnN0IHJlY3Vyc2l2ZVJlZl8xID0gcmVxdWlyZShcIi4vcmVjdXJzaXZlUmVmXCIpO1xuY29uc3QgZHluYW1pYyA9IFtkeW5hbWljQW5jaG9yXzEuZGVmYXVsdCwgZHluYW1pY1JlZl8xLmRlZmF1bHQsIHJlY3Vyc2l2ZUFuY2hvcl8xLmRlZmF1bHQsIHJlY3Vyc2l2ZVJlZl8xLmRlZmF1bHRdO1xuZXhwb3J0cy5kZWZhdWx0ID0gZHluYW1pYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZHluYW1pY0FuY2hvcl8xID0gcmVxdWlyZShcIi4vZHluYW1pY0FuY2hvclwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCIkcmVjdXJzaXZlQW5jaG9yXCIsXG4gICAgc2NoZW1hVHlwZTogXCJib29sZWFuXCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgaWYgKGN4dC5zY2hlbWEpXG4gICAgICAgICAgICAoMCwgZHluYW1pY0FuY2hvcl8xLmR5bmFtaWNBbmNob3IpKGN4dCwgXCJcIik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShjeHQuaXQsIFwiJHJlY3Vyc2l2ZUFuY2hvcjogZmFsc2UgaXMgaWdub3JlZFwiKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlY3Vyc2l2ZUFuY2hvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGR5bmFtaWNSZWZfMSA9IHJlcXVpcmUoXCIuL2R5bmFtaWNSZWZcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCIkcmVjdXJzaXZlUmVmXCIsXG4gICAgc2NoZW1hVHlwZTogXCJzdHJpbmdcIixcbiAgICBjb2RlOiAoY3h0KSA9PiAoMCwgZHluYW1pY1JlZl8xLmR5bmFtaWNSZWYpKGN4dCwgY3h0LnNjaGVtYSksXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVjdXJzaXZlUmVmLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IG1hdGNoIGZvcm1hdCBcIiR7c2NoZW1hQ29kZX1cImAsXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtmb3JtYXQ6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJmb3JtYXRcIixcbiAgICB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0sXG4gICAgc2NoZW1hVHlwZTogXCJzdHJpbmdcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCwgcnVsZVR5cGUpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsICRkYXRhLCBzY2hlbWEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgb3B0cywgZXJyU2NoZW1hUGF0aCwgc2NoZW1hRW52LCBzZWxmIH0gPSBpdDtcbiAgICAgICAgaWYgKCFvcHRzLnZhbGlkYXRlRm9ybWF0cylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCRkYXRhKVxuICAgICAgICAgICAgdmFsaWRhdGUkRGF0YUZvcm1hdCgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB2YWxpZGF0ZUZvcm1hdCgpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZSREYXRhRm9ybWF0KCkge1xuICAgICAgICAgICAgY29uc3QgZm10cyA9IGdlbi5zY29wZVZhbHVlKFwiZm9ybWF0c1wiLCB7XG4gICAgICAgICAgICAgICAgcmVmOiBzZWxmLmZvcm1hdHMsXG4gICAgICAgICAgICAgICAgY29kZTogb3B0cy5jb2RlLmZvcm1hdHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGZEZWYgPSBnZW4uY29uc3QoXCJmRGVmXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7Zm10c31bJHtzY2hlbWFDb2RlfV1gKTtcbiAgICAgICAgICAgIGNvbnN0IGZUeXBlID0gZ2VuLmxldChcImZUeXBlXCIpO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gZ2VuLmxldChcImZvcm1hdFwiKTtcbiAgICAgICAgICAgIC8vIFRPRE8gc2ltcGxpZnlcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtmRGVmfSA9PSBcIm9iamVjdFwiICYmICEoJHtmRGVmfSBpbnN0YW5jZW9mIFJlZ0V4cClgLCAoKSA9PiBnZW4uYXNzaWduKGZUeXBlLCAoMCwgY29kZWdlbl8xLl8pIGAke2ZEZWZ9LnR5cGUgfHwgXCJzdHJpbmdcImApLmFzc2lnbihmb3JtYXQsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZkRlZn0udmFsaWRhdGVgKSwgKCkgPT4gZ2VuLmFzc2lnbihmVHlwZSwgKDAsIGNvZGVnZW5fMS5fKSBgXCJzdHJpbmdcImApLmFzc2lnbihmb3JtYXQsIGZEZWYpKTtcbiAgICAgICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5vcikodW5rbm93bkZtdCgpLCBpbnZhbGlkRm10KCkpKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVua25vd25GbXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuc3RyaWN0U2NoZW1hID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW5fMS5uaWw7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoZW1hQ29kZX0gJiYgISR7Zm9ybWF0fWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpbnZhbGlkRm10KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxGb3JtYXQgPSBzY2hlbWFFbnYuJGFzeW5jXG4gICAgICAgICAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5fKSBgKCR7ZkRlZn0uYXN5bmMgPyBhd2FpdCAke2Zvcm1hdH0oJHtkYXRhfSkgOiAke2Zvcm1hdH0oJHtkYXRhfSkpYFxuICAgICAgICAgICAgICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7Zm9ybWF0fSgke2RhdGF9KWA7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWREYXRhID0gKDAsIGNvZGVnZW5fMS5fKSBgKHR5cGVvZiAke2Zvcm1hdH0gPT0gXCJmdW5jdGlvblwiID8gJHtjYWxsRm9ybWF0fSA6ICR7Zm9ybWF0fS50ZXN0KCR7ZGF0YX0pKWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7Zm9ybWF0fSAmJiAke2Zvcm1hdH0gIT09IHRydWUgJiYgJHtmVHlwZX0gPT09ICR7cnVsZVR5cGV9ICYmICEke3ZhbGlkRGF0YX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KCkge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0RGVmID0gc2VsZi5mb3JtYXRzW3NjaGVtYV07XG4gICAgICAgICAgICBpZiAoIWZvcm1hdERlZikge1xuICAgICAgICAgICAgICAgIHVua25vd25Gb3JtYXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0RGVmID09PSB0cnVlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IFtmbXRUeXBlLCBmb3JtYXQsIGZtdFJlZl0gPSBnZXRGb3JtYXQoZm9ybWF0RGVmKTtcbiAgICAgICAgICAgIGlmIChmbXRUeXBlID09PSBydWxlVHlwZSlcbiAgICAgICAgICAgICAgICBjeHQucGFzcyh2YWxpZENvbmRpdGlvbigpKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVua25vd25Gb3JtYXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuc3RyaWN0U2NoZW1hID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci53YXJuKHVua25vd25Nc2coKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVua25vd25Nc2coKSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdW5rbm93bk1zZygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGB1bmtub3duIGZvcm1hdCBcIiR7c2NoZW1hfVwiIGlnbm9yZWQgaW4gc2NoZW1hIGF0IHBhdGggXCIke2VyclNjaGVtYVBhdGh9XCJgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEZvcm1hdChmbXREZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2RlID0gZm10RGVmIGluc3RhbmNlb2YgUmVnRXhwXG4gICAgICAgICAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5yZWdleHBDb2RlKShmbXREZWYpXG4gICAgICAgICAgICAgICAgICAgIDogb3B0cy5jb2RlLmZvcm1hdHNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtvcHRzLmNvZGUuZm9ybWF0c30keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHNjaGVtYSl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZm10ID0gZ2VuLnNjb3BlVmFsdWUoXCJmb3JtYXRzXCIsIHsga2V5OiBzY2hlbWEsIHJlZjogZm10RGVmLCBjb2RlIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm10RGVmID09IFwib2JqZWN0XCIgJiYgIShmbXREZWYgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbZm10RGVmLnR5cGUgfHwgXCJzdHJpbmdcIiwgZm10RGVmLnZhbGlkYXRlLCAoMCwgY29kZWdlbl8xLl8pIGAke2ZtdH0udmFsaWRhdGVgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcInN0cmluZ1wiLCBmbXREZWYsIGZtdF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB2YWxpZENvbmRpdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1hdERlZiA9PSBcIm9iamVjdFwiICYmICEoZm9ybWF0RGVmIGluc3RhbmNlb2YgUmVnRXhwKSAmJiBmb3JtYXREZWYuYXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzY2hlbWFFbnYuJGFzeW5jKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXN5bmMgZm9ybWF0IGluIHN5bmMgc2NoZW1hXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgYXdhaXQgJHtmbXRSZWZ9KCR7ZGF0YX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBmb3JtYXQgPT0gXCJmdW5jdGlvblwiID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtmbXRSZWZ9KCR7ZGF0YX0pYCA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7Zm10UmVmfS50ZXN0KCR7ZGF0YX0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ybWF0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZm9ybWF0XzEgPSByZXF1aXJlKFwiLi9mb3JtYXRcIik7XG5jb25zdCBmb3JtYXQgPSBbZm9ybWF0XzEuZGVmYXVsdF07XG5leHBvcnRzLmRlZmF1bHQgPSBmb3JtYXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29udGVudFZvY2FidWxhcnkgPSBleHBvcnRzLm1ldGFkYXRhVm9jYWJ1bGFyeSA9IHZvaWQgMDtcbmV4cG9ydHMubWV0YWRhdGFWb2NhYnVsYXJ5ID0gW1xuICAgIFwidGl0bGVcIixcbiAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgXCJkZWZhdWx0XCIsXG4gICAgXCJkZXByZWNhdGVkXCIsXG4gICAgXCJyZWFkT25seVwiLFxuICAgIFwid3JpdGVPbmx5XCIsXG4gICAgXCJleGFtcGxlc1wiLFxuXTtcbmV4cG9ydHMuY29udGVudFZvY2FidWxhcnkgPSBbXG4gICAgXCJjb250ZW50TWVkaWFUeXBlXCIsXG4gICAgXCJjb250ZW50RW5jb2RpbmdcIixcbiAgICBcImNvbnRlbnRTY2hlbWFcIixcbl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXRhZGF0YS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRlcGVuZGVudFJlcXVpcmVkXzEgPSByZXF1aXJlKFwiLi92YWxpZGF0aW9uL2RlcGVuZGVudFJlcXVpcmVkXCIpO1xuY29uc3QgZGVwZW5kZW50U2NoZW1hc18xID0gcmVxdWlyZShcIi4vYXBwbGljYXRvci9kZXBlbmRlbnRTY2hlbWFzXCIpO1xuY29uc3QgbGltaXRDb250YWluc18xID0gcmVxdWlyZShcIi4vdmFsaWRhdGlvbi9saW1pdENvbnRhaW5zXCIpO1xuY29uc3QgbmV4dCA9IFtkZXBlbmRlbnRSZXF1aXJlZF8xLmRlZmF1bHQsIGRlcGVuZGVudFNjaGVtYXNfMS5kZWZhdWx0LCBsaW1pdENvbnRhaW5zXzEuZGVmYXVsdF07XG5leHBvcnRzLmRlZmF1bHQgPSBuZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmV4dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHVuZXZhbHVhdGVkUHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vdW5ldmFsdWF0ZWRQcm9wZXJ0aWVzXCIpO1xuY29uc3QgdW5ldmFsdWF0ZWRJdGVtc18xID0gcmVxdWlyZShcIi4vdW5ldmFsdWF0ZWRJdGVtc1wiKTtcbmNvbnN0IHVuZXZhbHVhdGVkID0gW3VuZXZhbHVhdGVkUHJvcGVydGllc18xLmRlZmF1bHQsIHVuZXZhbHVhdGVkSXRlbXNfMS5kZWZhdWx0XTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVuZXZhbHVhdGVkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBsZW4gfSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgbW9yZSB0aGFuICR7bGVufSBpdGVtc2AsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgbGVuIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke2xlbn19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJ1bmV2YWx1YXRlZEl0ZW1zXCIsXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFtcImJvb2xlYW5cIiwgXCJvYmplY3RcIl0sXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBpdC5pdGVtcyB8fCAwO1xuICAgICAgICBpZiAoaXRlbXMgPT09IHRydWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgICAgICBpZiAoc2NoZW1hID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGxlbjogaXRlbXMgfSk7XG4gICAgICAgICAgICBjeHQuZmFpbCgoMCwgY29kZWdlbl8xLl8pIGAke2xlbn0gPiAke2l0ZW1zfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJvYmplY3RcIiAmJiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLnZhcihcInZhbGlkXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA8PSAke2l0ZW1zfWApO1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IHZhbGlkYXRlSXRlbXModmFsaWQsIGl0ZW1zKSk7XG4gICAgICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICB9XG4gICAgICAgIGl0Lml0ZW1zID0gdHJ1ZTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVJdGVtcyh2YWxpZCwgZnJvbSkge1xuICAgICAgICAgICAgZ2VuLmZvclJhbmdlKFwiaVwiLCBmcm9tLCBsZW4sIChpKSA9PiB7XG4gICAgICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQ6IFwidW5ldmFsdWF0ZWRJdGVtc1wiLCBkYXRhUHJvcDogaSwgZGF0YVByb3BUeXBlOiB1dGlsXzEuVHlwZS5OdW0gfSwgdmFsaWQpO1xuICAgICAgICAgICAgICAgIGlmICghaXQuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuZXZhbHVhdGVkSXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9uYW1lc1wiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwibXVzdCBOT1QgaGF2ZSB1bmV2YWx1YXRlZCBwcm9wZXJ0aWVzXCIsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge3VuZXZhbHVhdGVkUHJvcGVydHk6ICR7cGFyYW1zLnVuZXZhbHVhdGVkUHJvcGVydHl9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwidW5ldmFsdWF0ZWRQcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJib29sZWFuXCIsIFwib2JqZWN0XCJdLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIGVycnNDb3VudCwgaXQgfSA9IGN4dDtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghZXJyc0NvdW50KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICBjb25zdCB7IGFsbEVycm9ycywgcHJvcHMgfSA9IGl0O1xuICAgICAgICBpZiAocHJvcHMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkge1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7cHJvcHN9ICE9PSB0cnVlYCwgKCkgPT4gZ2VuLmZvckluKFwia2V5XCIsIGRhdGEsIChrZXkpID0+IGdlbi5pZih1bmV2YWx1YXRlZER5bmFtaWMocHJvcHMsIGtleSksICgpID0+IHVuZXZhbHVhdGVkUHJvcENvZGUoa2V5KSkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZ2VuLmZvckluKFwia2V5XCIsIGRhdGEsIChrZXkpID0+IHByb3BzID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IHVuZXZhbHVhdGVkUHJvcENvZGUoa2V5KVxuICAgICAgICAgICAgICAgIDogZ2VuLmlmKHVuZXZhbHVhdGVkU3RhdGljKHByb3BzLCBrZXkpLCAoKSA9PiB1bmV2YWx1YXRlZFByb3BDb2RlKGtleSkpKTtcbiAgICAgICAgfVxuICAgICAgICBpdC5wcm9wcyA9IHRydWU7XG4gICAgICAgIGN4dC5vaygoMCwgY29kZWdlbl8xLl8pIGAke2VycnNDb3VudH0gPT09ICR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc31gKTtcbiAgICAgICAgZnVuY3Rpb24gdW5ldmFsdWF0ZWRQcm9wQ29kZShrZXkpIHtcbiAgICAgICAgICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IHVuZXZhbHVhdGVkUHJvcGVydHk6IGtleSB9KTtcbiAgICAgICAgICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZDogXCJ1bmV2YWx1YXRlZFByb3BlcnRpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVByb3A6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVByb3BUeXBlOiB1dGlsXzEuVHlwZS5TdHIsXG4gICAgICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICAgICAgICAgIGlmICghYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHVuZXZhbHVhdGVkRHluYW1pYyhldmFsdWF0ZWRQcm9wcywga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgISR7ZXZhbHVhdGVkUHJvcHN9IHx8ICEke2V2YWx1YXRlZFByb3BzfVske2tleX1dYDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1bmV2YWx1YXRlZFN0YXRpYyhldmFsdWF0ZWRQcm9wcywga2V5KSB7XG4gICAgICAgICAgICBjb25zdCBwcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwIGluIGV2YWx1YXRlZFByb3BzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2YWx1YXRlZFByb3BzW3BdID09PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKCgwLCBjb2RlZ2VuXzEuXykgYCR7a2V5fSAhPT0gJHtwfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuYW5kKSguLi5wcyk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuZXZhbHVhdGVkUHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXF1YWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL2VxdWFsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJtdXN0IGJlIGVxdWFsIHRvIGNvbnN0YW50XCIsXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHthbGxvd2VkVmFsdWU6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJjb25zdFwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCAkZGF0YSwgc2NoZW1hQ29kZSwgc2NoZW1hIH0gPSBjeHQ7XG4gICAgICAgIGlmICgkZGF0YSB8fCAoc2NoZW1hICYmIHR5cGVvZiBzY2hlbWEgPT0gXCJvYmplY3RcIikpIHtcbiAgICAgICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgISR7KDAsIHV0aWxfMS51c2VGdW5jKShnZW4sIGVxdWFsXzEuZGVmYXVsdCl9KCR7ZGF0YX0sICR7c2NoZW1hQ29kZX0pYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjeHQuZmFpbCgoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYX0gIT09ICR7ZGF0YX1gKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkZXBlbmRlbmNpZXNfMSA9IHJlcXVpcmUoXCIuLi9hcHBsaWNhdG9yL2RlcGVuZGVuY2llc1wiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImRlcGVuZGVudFJlcXVpcmVkXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm9iamVjdFwiLFxuICAgIGVycm9yOiBkZXBlbmRlbmNpZXNfMS5lcnJvcixcbiAgICBjb2RlOiAoY3h0KSA9PiAoMCwgZGVwZW5kZW5jaWVzXzEudmFsaWRhdGVQcm9wZXJ0eURlcHMpKGN4dCksXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVwZW5kZW50UmVxdWlyZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVxdWFsXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9lcXVhbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBlcXVhbCB0byBvbmUgb2YgdGhlIGFsbG93ZWQgdmFsdWVzXCIsXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHthbGxvd2VkVmFsdWVzOiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiZW51bVwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgJGRhdGEsIHNjaGVtYSwgc2NoZW1hQ29kZSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKCEkZGF0YSAmJiBzY2hlbWEubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZW51bSBtdXN0IGhhdmUgbm9uLWVtcHR5IGFycmF5XCIpO1xuICAgICAgICBjb25zdCB1c2VMb29wID0gc2NoZW1hLmxlbmd0aCA+PSBpdC5vcHRzLmxvb3BFbnVtO1xuICAgICAgICBsZXQgZXFsO1xuICAgICAgICBjb25zdCBnZXRFcWwgPSAoKSA9PiAoZXFsICE9PSBudWxsICYmIGVxbCAhPT0gdm9pZCAwID8gZXFsIDogKGVxbCA9ICgwLCB1dGlsXzEudXNlRnVuYykoZ2VuLCBlcXVhbF8xLmRlZmF1bHQpKSk7XG4gICAgICAgIGxldCB2YWxpZDtcbiAgICAgICAgaWYgKHVzZUxvb3AgfHwgJGRhdGEpIHtcbiAgICAgICAgICAgIHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIpO1xuICAgICAgICAgICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsIGxvb3BFbnVtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICAgICAgY29uc3QgdlNjaGVtYSA9IGdlbi5jb25zdChcInZTY2hlbWFcIiwgc2NoZW1hQ29kZSk7XG4gICAgICAgICAgICB2YWxpZCA9ICgwLCBjb2RlZ2VuXzEub3IpKC4uLnNjaGVtYS5tYXAoKF94LCBpKSA9PiBlcXVhbENvZGUodlNjaGVtYSwgaSkpKTtcbiAgICAgICAgfVxuICAgICAgICBjeHQucGFzcyh2YWxpZCk7XG4gICAgICAgIGZ1bmN0aW9uIGxvb3BFbnVtKCkge1xuICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpO1xuICAgICAgICAgICAgZ2VuLmZvck9mKFwidlwiLCBzY2hlbWFDb2RlLCAodikgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Z2V0RXFsKCl9KCR7ZGF0YX0sICR7dn0pYCwgKCkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSkuYnJlYWsoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGVxdWFsQ29kZSh2U2NoZW1hLCBpKSB7XG4gICAgICAgICAgICBjb25zdCBzY2ggPSBzY2hlbWFbaV07XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHNjaCA9PT0gXCJvYmplY3RcIiAmJiBzY2ggIT09IG51bGxcbiAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7Z2V0RXFsKCl9KCR7ZGF0YX0sICR7dlNjaGVtYX1bJHtpfV0pYFxuICAgICAgICAgICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSA9PT0gJHtzY2h9YDtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW51bS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGxpbWl0TnVtYmVyXzEgPSByZXF1aXJlKFwiLi9saW1pdE51bWJlclwiKTtcbmNvbnN0IG11bHRpcGxlT2ZfMSA9IHJlcXVpcmUoXCIuL211bHRpcGxlT2ZcIik7XG5jb25zdCBsaW1pdExlbmd0aF8xID0gcmVxdWlyZShcIi4vbGltaXRMZW5ndGhcIik7XG5jb25zdCBwYXR0ZXJuXzEgPSByZXF1aXJlKFwiLi9wYXR0ZXJuXCIpO1xuY29uc3QgbGltaXRQcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9saW1pdFByb3BlcnRpZXNcIik7XG5jb25zdCByZXF1aXJlZF8xID0gcmVxdWlyZShcIi4vcmVxdWlyZWRcIik7XG5jb25zdCBsaW1pdEl0ZW1zXzEgPSByZXF1aXJlKFwiLi9saW1pdEl0ZW1zXCIpO1xuY29uc3QgdW5pcXVlSXRlbXNfMSA9IHJlcXVpcmUoXCIuL3VuaXF1ZUl0ZW1zXCIpO1xuY29uc3QgY29uc3RfMSA9IHJlcXVpcmUoXCIuL2NvbnN0XCIpO1xuY29uc3QgZW51bV8xID0gcmVxdWlyZShcIi4vZW51bVwiKTtcbmNvbnN0IHZhbGlkYXRpb24gPSBbXG4gICAgLy8gbnVtYmVyXG4gICAgbGltaXROdW1iZXJfMS5kZWZhdWx0LFxuICAgIG11bHRpcGxlT2ZfMS5kZWZhdWx0LFxuICAgIC8vIHN0cmluZ1xuICAgIGxpbWl0TGVuZ3RoXzEuZGVmYXVsdCxcbiAgICBwYXR0ZXJuXzEuZGVmYXVsdCxcbiAgICAvLyBvYmplY3RcbiAgICBsaW1pdFByb3BlcnRpZXNfMS5kZWZhdWx0LFxuICAgIHJlcXVpcmVkXzEuZGVmYXVsdCxcbiAgICAvLyBhcnJheVxuICAgIGxpbWl0SXRlbXNfMS5kZWZhdWx0LFxuICAgIHVuaXF1ZUl0ZW1zXzEuZGVmYXVsdCxcbiAgICAvLyBhbnlcbiAgICB7IGtleXdvcmQ6IFwidHlwZVwiLCBzY2hlbWFUeXBlOiBbXCJzdHJpbmdcIiwgXCJhcnJheVwiXSB9LFxuICAgIHsga2V5d29yZDogXCJudWxsYWJsZVwiLCBzY2hlbWFUeXBlOiBcImJvb2xlYW5cIiB9LFxuICAgIGNvbnN0XzEuZGVmYXVsdCxcbiAgICBlbnVtXzEuZGVmYXVsdCxcbl07XG5leHBvcnRzLmRlZmF1bHQgPSB2YWxpZGF0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFtcIm1heENvbnRhaW5zXCIsIFwibWluQ29udGFpbnNcIl0sXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgY29kZSh7IGtleXdvcmQsIHBhcmVudFNjaGVtYSwgaXQgfSkge1xuICAgICAgICBpZiAocGFyZW50U2NoZW1hLmNvbnRhaW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgYFwiJHtrZXl3b3JkfVwiIHdpdGhvdXQgXCJjb250YWluc1wiIGlzIGlnbm9yZWRgKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXRDb250YWlucy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSB7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBrZXl3b3JkID09PSBcIm1heEl0ZW1zXCIgPyBcIm1vcmVcIiA6IFwiZmV3ZXJcIjtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSAke2NvbXB9IHRoYW4gJHtzY2hlbWFDb2RlfSBpdGVtc2A7XG4gICAgfSxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFtcIm1heEl0ZW1zXCIsIFwibWluSXRlbXNcIl0sXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFDb2RlIH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IG9wID0ga2V5d29yZCA9PT0gXCJtYXhJdGVtc1wiID8gY29kZWdlbl8xLm9wZXJhdG9ycy5HVCA6IGNvZGVnZW5fMS5vcGVyYXRvcnMuTFQ7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGggJHtvcH0gJHtzY2hlbWFDb2RlfWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXRJdGVtcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgdWNzMmxlbmd0aF8xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvdWNzMmxlbmd0aFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2UoeyBrZXl3b3JkLCBzY2hlbWFDb2RlIH0pIHtcbiAgICAgICAgY29uc3QgY29tcCA9IGtleXdvcmQgPT09IFwibWF4TGVuZ3RoXCIgPyBcIm1vcmVcIiA6IFwiZmV3ZXJcIjtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSAke2NvbXB9IHRoYW4gJHtzY2hlbWFDb2RlfSBjaGFyYWN0ZXJzYDtcbiAgICB9LFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogW1wibWF4TGVuZ3RoXCIsIFwibWluTGVuZ3RoXCJdLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IG9wID0ga2V5d29yZCA9PT0gXCJtYXhMZW5ndGhcIiA/IGNvZGVnZW5fMS5vcGVyYXRvcnMuR1QgOiBjb2RlZ2VuXzEub3BlcmF0b3JzLkxUO1xuICAgICAgICBjb25zdCBsZW4gPSBpdC5vcHRzLnVuaWNvZGUgPT09IGZhbHNlID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHsoMCwgdXRpbF8xLnVzZUZ1bmMpKGN4dC5nZW4sIHVjczJsZW5ndGhfMS5kZWZhdWx0KX0oJHtkYXRhfSlgO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSAke29wfSAke3NjaGVtYUNvZGV9YCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW1pdExlbmd0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBvcHMgPSBjb2RlZ2VuXzEub3BlcmF0b3JzO1xuY29uc3QgS1dEcyA9IHtcbiAgICBtYXhpbXVtOiB7IG9rU3RyOiBcIjw9XCIsIG9rOiBvcHMuTFRFLCBmYWlsOiBvcHMuR1QgfSxcbiAgICBtaW5pbXVtOiB7IG9rU3RyOiBcIj49XCIsIG9rOiBvcHMuR1RFLCBmYWlsOiBvcHMuTFQgfSxcbiAgICBleGNsdXNpdmVNYXhpbXVtOiB7IG9rU3RyOiBcIjxcIiwgb2s6IG9wcy5MVCwgZmFpbDogb3BzLkdURSB9LFxuICAgIGV4Y2x1c2l2ZU1pbmltdW06IHsgb2tTdHI6IFwiPlwiLCBvazogb3BzLkdULCBmYWlsOiBvcHMuTFRFIH0sXG59O1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgYmUgJHtLV0RzW2tleXdvcmRdLm9rU3RyfSAke3NjaGVtYUNvZGV9YCxcbiAgICBwYXJhbXM6ICh7IGtleXdvcmQsIHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2NvbXBhcmlzb246ICR7S1dEc1trZXl3b3JkXS5va1N0cn0sIGxpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IE9iamVjdC5rZXlzKEtXRHMpLFxuICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYUNvZGUgfSA9IGN4dDtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ICR7S1dEc1trZXl3b3JkXS5mYWlsfSAke3NjaGVtYUNvZGV9IHx8IGlzTmFOKCR7ZGF0YX0pYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW1pdE51bWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSB7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBrZXl3b3JkID09PSBcIm1heFByb3BlcnRpZXNcIiA/IFwibW9yZVwiIDogXCJmZXdlclwiO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlICR7Y29tcH0gdGhhbiAke3NjaGVtYUNvZGV9IHByb3BlcnRpZXNgO1xuICAgIH0sXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtsaW1pdDogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBbXCJtYXhQcm9wZXJ0aWVzXCIsIFwibWluUHJvcGVydGllc1wiXSxcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFDb2RlIH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IG9wID0ga2V5d29yZCA9PT0gXCJtYXhQcm9wZXJ0aWVzXCIgPyBjb2RlZ2VuXzEub3BlcmF0b3JzLkdUIDogY29kZWdlbl8xLm9wZXJhdG9ycy5MVDtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGBPYmplY3Qua2V5cygke2RhdGF9KS5sZW5ndGggJHtvcH0gJHtzY2hlbWFDb2RlfWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXRQcm9wZXJ0aWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGJlIG11bHRpcGxlIG9mICR7c2NoZW1hQ29kZX1gLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bXVsdGlwbGVPZjogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIm11bHRpcGxlT2ZcIixcbiAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8vIGNvbnN0IGJkdCA9IGJhZCREYXRhVHlwZShzY2hlbWFDb2RlLCA8c3RyaW5nPmRlZi5zY2hlbWFUeXBlLCAkZGF0YSlcbiAgICAgICAgY29uc3QgcHJlYyA9IGl0Lm9wdHMubXVsdGlwbGVPZlByZWNpc2lvbjtcbiAgICAgICAgY29uc3QgcmVzID0gZ2VuLmxldChcInJlc1wiKTtcbiAgICAgICAgY29uc3QgaW52YWxpZCA9IHByZWNcbiAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5fKSBgTWF0aC5hYnMoTWF0aC5yb3VuZCgke3Jlc30pIC0gJHtyZXN9KSA+IDFlLSR7cHJlY31gXG4gICAgICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7cmVzfSAhPT0gcGFyc2VJbnQoJHtyZXN9KWA7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgKCR7c2NoZW1hQ29kZX0gPT09IDAgfHwgKCR7cmVzfSA9ICR7ZGF0YX0vJHtzY2hlbWFDb2RlfSwgJHtpbnZhbGlkfSkpYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aXBsZU9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgbWF0Y2ggcGF0dGVybiBcIiR7c2NoZW1hQ29kZX1cImAsXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtwYXR0ZXJuOiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicGF0dGVyblwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgc2NoZW1hVHlwZTogXCJzdHJpbmdcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGRhdGEsICRkYXRhLCBzY2hlbWEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8vIFRPRE8gcmVnZXhwIHNob3VsZCBiZSB3cmFwcGVkIGluIHRyeS9jYXRjaHNcbiAgICAgICAgY29uc3QgdSA9IGl0Lm9wdHMudW5pY29kZVJlZ0V4cCA/IFwidVwiIDogXCJcIjtcbiAgICAgICAgY29uc3QgcmVnRXhwID0gJGRhdGEgPyAoMCwgY29kZWdlbl8xLl8pIGAobmV3IFJlZ0V4cCgke3NjaGVtYUNvZGV9LCAke3V9KSlgIDogKDAsIGNvZGVfMS51c2VQYXR0ZXJuKShjeHQsIHNjaGVtYSk7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgISR7cmVnRXhwfS50ZXN0KCR7ZGF0YX0pYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXR0ZXJuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBtaXNzaW5nUHJvcGVydHkgfSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgaGF2ZSByZXF1aXJlZCBwcm9wZXJ0eSAnJHttaXNzaW5nUHJvcGVydHl9J2AsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgbWlzc2luZ1Byb3BlcnR5IH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge21pc3NpbmdQcm9wZXJ0eTogJHttaXNzaW5nUHJvcGVydHl9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicmVxdWlyZWRcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBzY2hlbWFDb2RlLCBkYXRhLCAkZGF0YSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBvcHRzIH0gPSBpdDtcbiAgICAgICAgaWYgKCEkZGF0YSAmJiBzY2hlbWEubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB1c2VMb29wID0gc2NoZW1hLmxlbmd0aCA+PSBvcHRzLmxvb3BSZXF1aXJlZDtcbiAgICAgICAgaWYgKGl0LmFsbEVycm9ycylcbiAgICAgICAgICAgIGFsbEVycm9yc01vZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZXhpdE9uRXJyb3JNb2RlKCk7XG4gICAgICAgIGlmIChvcHRzLnN0cmljdFJlcXVpcmVkKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IGN4dC5wYXJlbnRTY2hlbWEucHJvcGVydGllcztcbiAgICAgICAgICAgIGNvbnN0IHsgZGVmaW5lZFByb3BlcnRpZXMgfSA9IGN4dC5pdDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVxdWlyZWRLZXkgb2Ygc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgaWYgKChwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHNbcmVxdWlyZWRLZXldKSA9PT0gdW5kZWZpbmVkICYmICFkZWZpbmVkUHJvcGVydGllcy5oYXMocmVxdWlyZWRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYVBhdGggPSBpdC5zY2hlbWFFbnYuYmFzZUlkICsgaXQuZXJyU2NoZW1hUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbXNnID0gYHJlcXVpcmVkIHByb3BlcnR5IFwiJHtyZXF1aXJlZEtleX1cIiBpcyBub3QgZGVmaW5lZCBhdCBcIiR7c2NoZW1hUGF0aH1cIiAoc3RyaWN0UmVxdWlyZWQpYDtcbiAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBtc2csIGl0Lm9wdHMuc3RyaWN0UmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhbGxFcnJvcnNNb2RlKCkge1xuICAgICAgICAgICAgaWYgKHVzZUxvb3AgfHwgJGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjeHQuYmxvY2skZGF0YShjb2RlZ2VuXzEubmlsLCBsb29wQWxsUmVxdWlyZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICAoMCwgY29kZV8xLmNoZWNrUmVwb3J0TWlzc2luZ1Byb3ApKGN4dCwgcHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGV4aXRPbkVycm9yTW9kZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pc3NpbmcgPSBnZW4ubGV0KFwibWlzc2luZ1wiKTtcbiAgICAgICAgICAgIGlmICh1c2VMb29wIHx8ICRkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsICgpID0+IGxvb3BVbnRpbE1pc3NpbmcobWlzc2luZywgdmFsaWQpKTtcbiAgICAgICAgICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlXzEuY2hlY2tNaXNzaW5nUHJvcCkoY3h0LCBzY2hlbWEsIG1pc3NpbmcpKTtcbiAgICAgICAgICAgICAgICAoMCwgY29kZV8xLnJlcG9ydE1pc3NpbmdQcm9wKShjeHQsIG1pc3NpbmcpO1xuICAgICAgICAgICAgICAgIGdlbi5lbHNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbG9vcEFsbFJlcXVpcmVkKCkge1xuICAgICAgICAgICAgZ2VuLmZvck9mKFwicHJvcFwiLCBzY2hlbWFDb2RlLCAocHJvcCkgPT4ge1xuICAgICAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBtaXNzaW5nUHJvcGVydHk6IHByb3AgfSk7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlXzEubm9Qcm9wZXJ0eUluRGF0YSkoZ2VuLCBkYXRhLCBwcm9wLCBvcHRzLm93blByb3BlcnRpZXMpLCAoKSA9PiBjeHQuZXJyb3IoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsb29wVW50aWxNaXNzaW5nKG1pc3NpbmcsIHZhbGlkKSB7XG4gICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgbWlzc2luZ1Byb3BlcnR5OiBtaXNzaW5nIH0pO1xuICAgICAgICAgICAgZ2VuLmZvck9mKG1pc3NpbmcsIHNjaGVtYUNvZGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCAoMCwgY29kZV8xLnByb3BlcnR5SW5EYXRhKShnZW4sIGRhdGEsIG1pc3NpbmcsIG9wdHMub3duUHJvcGVydGllcykpO1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4dC5lcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uYnJlYWsoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGNvZGVnZW5fMS5uaWwpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXF1aXJlZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRhdGFUeXBlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS92YWxpZGF0ZS9kYXRhVHlwZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXF1YWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL2VxdWFsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IGksIGogfSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgZHVwbGljYXRlIGl0ZW1zIChpdGVtcyAjIyAke2p9IGFuZCAke2l9IGFyZSBpZGVudGljYWwpYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBpLCBqIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2k6ICR7aX0sIGo6ICR7an19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBcImJvb2xlYW5cIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgJGRhdGEsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoISRkYXRhICYmICFzY2hlbWEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIpO1xuICAgICAgICBjb25zdCBpdGVtVHlwZXMgPSBwYXJlbnRTY2hlbWEuaXRlbXMgPyAoMCwgZGF0YVR5cGVfMS5nZXRTY2hlbWFUeXBlcykocGFyZW50U2NoZW1hLml0ZW1zKSA6IFtdO1xuICAgICAgICBjeHQuYmxvY2skZGF0YSh2YWxpZCwgdmFsaWRhdGVVbmlxdWVJdGVtcywgKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSA9PT0gZmFsc2VgKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVVbmlxdWVJdGVtcygpIHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBnZW4ubGV0KFwiaVwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgICAgICAgICAgY29uc3QgaiA9IGdlbi5sZXQoXCJqXCIpO1xuICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGksIGogfSk7XG4gICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2l9ID4gMWAsICgpID0+IChjYW5PcHRpbWl6ZSgpID8gbG9vcE4gOiBsb29wTjIpKGksIGopKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjYW5PcHRpbWl6ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtVHlwZXMubGVuZ3RoID4gMCAmJiAhaXRlbVR5cGVzLnNvbWUoKHQpID0+IHQgPT09IFwib2JqZWN0XCIgfHwgdCA9PT0gXCJhcnJheVwiKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsb29wTihpLCBqKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gZ2VuLm5hbWUoXCJpdGVtXCIpO1xuICAgICAgICAgICAgY29uc3Qgd3JvbmdUeXBlID0gKDAsIGRhdGFUeXBlXzEuY2hlY2tEYXRhVHlwZXMpKGl0ZW1UeXBlcywgaXRlbSwgaXQub3B0cy5zdHJpY3ROdW1iZXJzLCBkYXRhVHlwZV8xLkRhdGFUeXBlLldyb25nKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGljZXMgPSBnZW4uY29uc3QoXCJpbmRpY2VzXCIsICgwLCBjb2RlZ2VuXzEuXykgYHt9YCk7XG4gICAgICAgICAgICBnZW4uZm9yKCgwLCBjb2RlZ2VuXzEuXykgYDske2l9LS07YCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdlbi5sZXQoaXRlbSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfVske2l9XWApO1xuICAgICAgICAgICAgICAgIGdlbi5pZih3cm9uZ1R5cGUsICgwLCBjb2RlZ2VuXzEuXykgYGNvbnRpbnVlYCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1UeXBlcy5sZW5ndGggPiAxKVxuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7aXRlbX0gPT0gXCJzdHJpbmdcImAsICgwLCBjb2RlZ2VuXzEuXykgYCR7aXRlbX0gKz0gXCJfXCJgKTtcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmlmKCgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2luZGljZXN9WyR7aXRlbX1dID09IFwibnVtYmVyXCJgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24oaiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtpbmRpY2VzfVske2l0ZW19XWApO1xuICAgICAgICAgICAgICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgJHtpbmRpY2VzfVske2l0ZW19XSA9ICR7aX1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGxvb3BOMihpLCBqKSB7XG4gICAgICAgICAgICBjb25zdCBlcWwgPSAoMCwgdXRpbF8xLnVzZUZ1bmMpKGdlbiwgZXF1YWxfMS5kZWZhdWx0KTtcbiAgICAgICAgICAgIGNvbnN0IG91dGVyID0gZ2VuLm5hbWUoXCJvdXRlclwiKTtcbiAgICAgICAgICAgIGdlbi5sYWJlbChvdXRlcikuZm9yKCgwLCBjb2RlZ2VuXzEuXykgYDske2l9LS07YCwgKCkgPT4gZ2VuLmZvcigoMCwgY29kZWdlbl8xLl8pIGAke2p9ID0gJHtpfTsgJHtqfS0tO2AsICgpID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2VxbH0oJHtkYXRhfVske2l9XSwgJHtkYXRhfVske2p9XSlgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpLmJyZWFrKG91dGVyKTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuaXF1ZUl0ZW1zLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxuLy8gZG8gbm90IGVkaXQgLmpzIGZpbGVzIGRpcmVjdGx5IC0gZWRpdCBzcmMvaW5kZXguanN0XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICBpZiAoYS5jb25zdHJ1Y3RvciAhPT0gYi5jb25zdHJ1Y3RvcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGxlbmd0aCwgaSwga2V5cztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG5cbiAgICBpZiAoYS5jb25zdHJ1Y3RvciA9PT0gUmVnRXhwKSByZXR1cm4gYS5zb3VyY2UgPT09IGIuc291cmNlICYmIGEuZmxhZ3MgPT09IGIuZmxhZ3M7XG4gICAgaWYgKGEudmFsdWVPZiAhPT0gT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mKSByZXR1cm4gYS52YWx1ZU9mKCkgPT09IGIudmFsdWVPZigpO1xuICAgIGlmIChhLnRvU3RyaW5nICE9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKSByZXR1cm4gYS50b1N0cmluZygpID09PSBiLnRvU3RyaW5nKCk7XG5cbiAgICBrZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCAhPT0gT2JqZWN0LmtleXMoYikubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIHRydWUgaWYgYm90aCBOYU4sIGZhbHNlIG90aGVyd2lzZVxuICByZXR1cm4gYSE9PWEgJiYgYiE9PWI7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJhdmVyc2UgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzY2hlbWEsIG9wdHMsIGNiKSB7XG4gIC8vIExlZ2FjeSBzdXBwb3J0IGZvciB2MC4zLjEgYW5kIGVhcmxpZXIuXG4gIGlmICh0eXBlb2Ygb3B0cyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRzO1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuXG4gIGNiID0gb3B0cy5jYiB8fCBjYjtcbiAgdmFyIHByZSA9ICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJykgPyBjYiA6IGNiLnByZSB8fCBmdW5jdGlvbigpIHt9O1xuICB2YXIgcG9zdCA9IGNiLnBvc3QgfHwgZnVuY3Rpb24oKSB7fTtcblxuICBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2hlbWEsICcnLCBzY2hlbWEpO1xufTtcblxuXG50cmF2ZXJzZS5rZXl3b3JkcyA9IHtcbiAgYWRkaXRpb25hbEl0ZW1zOiB0cnVlLFxuICBpdGVtczogdHJ1ZSxcbiAgY29udGFpbnM6IHRydWUsXG4gIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlLFxuICBwcm9wZXJ0eU5hbWVzOiB0cnVlLFxuICBub3Q6IHRydWUsXG4gIGlmOiB0cnVlLFxuICB0aGVuOiB0cnVlLFxuICBlbHNlOiB0cnVlXG59O1xuXG50cmF2ZXJzZS5hcnJheUtleXdvcmRzID0ge1xuICBpdGVtczogdHJ1ZSxcbiAgYWxsT2Y6IHRydWUsXG4gIGFueU9mOiB0cnVlLFxuICBvbmVPZjogdHJ1ZVxufTtcblxudHJhdmVyc2UucHJvcHNLZXl3b3JkcyA9IHtcbiAgJGRlZnM6IHRydWUsXG4gIGRlZmluaXRpb25zOiB0cnVlLFxuICBwcm9wZXJ0aWVzOiB0cnVlLFxuICBwYXR0ZXJuUHJvcGVydGllczogdHJ1ZSxcbiAgZGVwZW5kZW5jaWVzOiB0cnVlXG59O1xuXG50cmF2ZXJzZS5za2lwS2V5d29yZHMgPSB7XG4gIGRlZmF1bHQ6IHRydWUsXG4gIGVudW06IHRydWUsXG4gIGNvbnN0OiB0cnVlLFxuICByZXF1aXJlZDogdHJ1ZSxcbiAgbWF4aW11bTogdHJ1ZSxcbiAgbWluaW11bTogdHJ1ZSxcbiAgZXhjbHVzaXZlTWF4aW11bTogdHJ1ZSxcbiAgZXhjbHVzaXZlTWluaW11bTogdHJ1ZSxcbiAgbXVsdGlwbGVPZjogdHJ1ZSxcbiAgbWF4TGVuZ3RoOiB0cnVlLFxuICBtaW5MZW5ndGg6IHRydWUsXG4gIHBhdHRlcm46IHRydWUsXG4gIGZvcm1hdDogdHJ1ZSxcbiAgbWF4SXRlbXM6IHRydWUsXG4gIG1pbkl0ZW1zOiB0cnVlLFxuICB1bmlxdWVJdGVtczogdHJ1ZSxcbiAgbWF4UHJvcGVydGllczogdHJ1ZSxcbiAgbWluUHJvcGVydGllczogdHJ1ZVxufTtcblxuXG5mdW5jdGlvbiBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2hlbWEsIGpzb25QdHIsIHJvb3RTY2hlbWEsIHBhcmVudEpzb25QdHIsIHBhcmVudEtleXdvcmQsIHBhcmVudFNjaGVtYSwga2V5SW5kZXgpIHtcbiAgaWYgKHNjaGVtYSAmJiB0eXBlb2Ygc2NoZW1hID09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICBwcmUoc2NoZW1hLCBqc29uUHRyLCByb290U2NoZW1hLCBwYXJlbnRKc29uUHRyLCBwYXJlbnRLZXl3b3JkLCBwYXJlbnRTY2hlbWEsIGtleUluZGV4KTtcbiAgICBmb3IgKHZhciBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICB2YXIgc2NoID0gc2NoZW1hW2tleV07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2gpKSB7XG4gICAgICAgIGlmIChrZXkgaW4gdHJhdmVyc2UuYXJyYXlLZXl3b3Jkcykge1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxzY2gubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2hbaV0sIGpzb25QdHIgKyAnLycgKyBrZXkgKyAnLycgKyBpLCByb290U2NoZW1hLCBqc29uUHRyLCBrZXksIHNjaGVtYSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5IGluIHRyYXZlcnNlLnByb3BzS2V5d29yZHMpIHtcbiAgICAgICAgaWYgKHNjaCAmJiB0eXBlb2Ygc2NoID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzY2gpXG4gICAgICAgICAgICBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2hbcHJvcF0sIGpzb25QdHIgKyAnLycgKyBrZXkgKyAnLycgKyBlc2NhcGVKc29uUHRyKHByb3ApLCByb290U2NoZW1hLCBqc29uUHRyLCBrZXksIHNjaGVtYSwgcHJvcCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5IGluIHRyYXZlcnNlLmtleXdvcmRzIHx8IChvcHRzLmFsbEtleXMgJiYgIShrZXkgaW4gdHJhdmVyc2Uuc2tpcEtleXdvcmRzKSkpIHtcbiAgICAgICAgX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoLCBqc29uUHRyICsgJy8nICsga2V5LCByb290U2NoZW1hLCBqc29uUHRyLCBrZXksIHNjaGVtYSk7XG4gICAgICB9XG4gICAgfVxuICAgIHBvc3Qoc2NoZW1hLCBqc29uUHRyLCByb290U2NoZW1hLCBwYXJlbnRKc29uUHRyLCBwYXJlbnRLZXl3b3JkLCBwYXJlbnRTY2hlbWEsIGtleUluZGV4KTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVzY2FwZUpzb25QdHIoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvfi9nLCAnfjAnKS5yZXBsYWNlKC9cXC8vZywgJ34xJyk7XG59XG4iLCIvKiogQGxpY2Vuc2UgVVJJLmpzIHY0LjQuMSAoYykgMjAxMSBHYXJ5IENvdXJ0LiBMaWNlbnNlOiBodHRwOi8vZ2l0aHViLmNvbS9nYXJ5Y291cnQvdXJpLWpzICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwuVVJJID0gZ2xvYmFsLlVSSSB8fCB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbWVyZ2UoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHNldHMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgc2V0c1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBpZiAoc2V0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHNldHNbMF0gPSBzZXRzWzBdLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgdmFyIHhsID0gc2V0cy5sZW5ndGggLSAxO1xuICAgICAgICBmb3IgKHZhciB4ID0gMTsgeCA8IHhsOyArK3gpIHtcbiAgICAgICAgICAgIHNldHNbeF0gPSBzZXRzW3hdLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRzW3hsXSA9IHNldHNbeGxdLnNsaWNlKDEpO1xuICAgICAgICByZXR1cm4gc2V0cy5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0c1swXTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJleHAoc3RyKSB7XG4gICAgcmV0dXJuIFwiKD86XCIgKyBzdHIgKyBcIilcIjtcbn1cbmZ1bmN0aW9uIHR5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8gPT09IHVuZGVmaW5lZCA/IFwidW5kZWZpbmVkXCIgOiBvID09PSBudWxsID8gXCJudWxsXCIgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc3BsaXQoXCIgXCIpLnBvcCgpLnNwbGl0KFwiXVwiKS5zaGlmdCgpLnRvTG93ZXJDYXNlKCk7XG59XG5mdW5jdGlvbiB0b1VwcGVyQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKCk7XG59XG5mdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICAgIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGwgPyBvYmogaW5zdGFuY2VvZiBBcnJheSA/IG9iaiA6IHR5cGVvZiBvYmoubGVuZ3RoICE9PSBcIm51bWJlclwiIHx8IG9iai5zcGxpdCB8fCBvYmouc2V0SW50ZXJ2YWwgfHwgb2JqLmNhbGwgPyBbb2JqXSA6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaikgOiBbXTtcbn1cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB0YXJnZXQ7XG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRXhwcyhpc0lSSSkge1xuICAgIHZhciBBTFBIQSQkID0gXCJbQS1aYS16XVwiLFxuICAgICAgICBDUiQgPSBcIltcXFxceDBEXVwiLFxuICAgICAgICBESUdJVCQkID0gXCJbMC05XVwiLFxuICAgICAgICBEUVVPVEUkJCA9IFwiW1xcXFx4MjJdXCIsXG4gICAgICAgIEhFWERJRyQkID0gbWVyZ2UoRElHSVQkJCwgXCJbQS1GYS1mXVwiKSxcbiAgICAgICAgLy9jYXNlLWluc2Vuc2l0aXZlXG4gICAgTEYkJCA9IFwiW1xcXFx4MEFdXCIsXG4gICAgICAgIFNQJCQgPSBcIltcXFxceDIwXVwiLFxuICAgICAgICBQQ1RfRU5DT0RFRCQgPSBzdWJleHAoc3ViZXhwKFwiJVtFRmVmXVwiICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIlWzg5QS1GYS1mXVwiICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSksXG4gICAgICAgIC8vZXhwYW5kZWRcbiAgICBHRU5fREVMSU1TJCQgPSBcIltcXFxcOlxcXFwvXFxcXD9cXFxcI1xcXFxbXFxcXF1cXFxcQF1cIixcbiAgICAgICAgU1VCX0RFTElNUyQkID0gXCJbXFxcXCFcXFxcJFxcXFwmXFxcXCdcXFxcKFxcXFwpXFxcXCpcXFxcK1xcXFwsXFxcXDtcXFxcPV1cIixcbiAgICAgICAgUkVTRVJWRUQkJCA9IG1lcmdlKEdFTl9ERUxJTVMkJCwgU1VCX0RFTElNUyQkKSxcbiAgICAgICAgVUNTQ0hBUiQkID0gaXNJUkkgPyBcIltcXFxceEEwLVxcXFx1MjAwRFxcXFx1MjAxMC1cXFxcdTIwMjlcXFxcdTIwMkYtXFxcXHVEN0ZGXFxcXHVGOTAwLVxcXFx1RkRDRlxcXFx1RkRGMC1cXFxcdUZGRUZdXCIgOiBcIltdXCIsXG4gICAgICAgIC8vc3Vic2V0LCBleGNsdWRlcyBiaWRpIGNvbnRyb2wgY2hhcmFjdGVyc1xuICAgIElQUklWQVRFJCQgPSBpc0lSSSA/IFwiW1xcXFx1RTAwMC1cXFxcdUY4RkZdXCIgOiBcIltdXCIsXG4gICAgICAgIC8vc3Vic2V0XG4gICAgVU5SRVNFUlZFRCQkID0gbWVyZ2UoQUxQSEEkJCwgRElHSVQkJCwgXCJbXFxcXC1cXFxcLlxcXFxfXFxcXH5dXCIsIFVDU0NIQVIkJCksXG4gICAgICAgIFNDSEVNRSQgPSBzdWJleHAoQUxQSEEkJCArIG1lcmdlKEFMUEhBJCQsIERJR0lUJCQsIFwiW1xcXFwrXFxcXC1cXFxcLl1cIikgKyBcIipcIiksXG4gICAgICAgIFVTRVJJTkZPJCA9IHN1YmV4cChzdWJleHAoUENUX0VOQ09ERUQkICsgXCJ8XCIgKyBtZXJnZShVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpdXCIpKSArIFwiKlwiKSxcbiAgICAgICAgREVDX09DVEVUJCA9IHN1YmV4cChzdWJleHAoXCIyNVswLTVdXCIpICsgXCJ8XCIgKyBzdWJleHAoXCIyWzAtNF1cIiArIERJR0lUJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIxXCIgKyBESUdJVCQkICsgRElHSVQkJCkgKyBcInxcIiArIHN1YmV4cChcIlsxLTldXCIgKyBESUdJVCQkKSArIFwifFwiICsgRElHSVQkJCksXG4gICAgICAgIERFQ19PQ1RFVF9SRUxBWEVEJCA9IHN1YmV4cChzdWJleHAoXCIyNVswLTVdXCIpICsgXCJ8XCIgKyBzdWJleHAoXCIyWzAtNF1cIiArIERJR0lUJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIxXCIgKyBESUdJVCQkICsgRElHSVQkJCkgKyBcInxcIiArIHN1YmV4cChcIjA/WzEtOV1cIiArIERJR0lUJCQpICsgXCJ8MD8wP1wiICsgRElHSVQkJCksXG4gICAgICAgIC8vcmVsYXhlZCBwYXJzaW5nIHJ1bGVzXG4gICAgSVBWNEFERFJFU1MkID0gc3ViZXhwKERFQ19PQ1RFVF9SRUxBWEVEJCArIFwiXFxcXC5cIiArIERFQ19PQ1RFVF9SRUxBWEVEJCArIFwiXFxcXC5cIiArIERFQ19PQ1RFVF9SRUxBWEVEJCArIFwiXFxcXC5cIiArIERFQ19PQ1RFVF9SRUxBWEVEJCksXG4gICAgICAgIEgxNiQgPSBzdWJleHAoSEVYRElHJCQgKyBcInsxLDR9XCIpLFxuICAgICAgICBMUzMyJCA9IHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIiArIEgxNiQpICsgXCJ8XCIgKyBJUFY0QUREUkVTUyQpLFxuICAgICAgICBJUFY2QUREUkVTUzEkID0gc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezZ9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgNiggaDE2IFwiOlwiICkgbHMzMlxuICAgIElQVjZBRERSRVNTMiQgPSBzdWJleHAoXCJcXFxcOlxcXFw6XCIgKyBzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcIns1fVwiICsgTFMzMiQpLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICBcIjo6XCIgNSggaDE2IFwiOlwiICkgbHMzMlxuICAgIElQVjZBRERSRVNTMyQgPSBzdWJleHAoc3ViZXhwKEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiICsgc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7NH1cIiArIExTMzIkKSxcbiAgICAgICAgLy9bICAgICAgICAgICAgICAgaDE2IF0gXCI6OlwiIDQoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzQkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDF9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezN9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAqMSggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiIDMoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzUkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDJ9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezJ9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAqMiggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiIDIoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzYkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDN9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIEgxNiQgKyBcIlxcXFw6XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAqMyggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiICAgIGgxNiBcIjpcIiAgIGxzMzJcbiAgICBJUFY2QUREUkVTUzckID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDR9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIExTMzIkKSxcbiAgICAgICAgLy9bICo0KCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCIgICAgICAgICAgICAgIGxzMzJcbiAgICBJUFY2QUREUkVTUzgkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDV9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIEgxNiQpLFxuICAgICAgICAvL1sgKjUoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAgICAgICAgICAgICAgaDE2XG4gICAgSVBWNkFERFJFU1M5JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCw2fVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIpLFxuICAgICAgICAvL1sgKjYoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIlxuICAgIElQVjZBRERSRVNTJCA9IHN1YmV4cChbSVBWNkFERFJFU1MxJCwgSVBWNkFERFJFU1MyJCwgSVBWNkFERFJFU1MzJCwgSVBWNkFERFJFU1M0JCwgSVBWNkFERFJFU1M1JCwgSVBWNkFERFJFU1M2JCwgSVBWNkFERFJFU1M3JCwgSVBWNkFERFJFU1M4JCwgSVBWNkFERFJFU1M5JF0uam9pbihcInxcIikpLFxuICAgICAgICBaT05FSUQkID0gc3ViZXhwKHN1YmV4cChVTlJFU0VSVkVEJCQgKyBcInxcIiArIFBDVF9FTkNPREVEJCkgKyBcIitcIiksXG4gICAgICAgIC8vUkZDIDY4NzRcbiAgICBJUFY2QUREUlokID0gc3ViZXhwKElQVjZBRERSRVNTJCArIFwiXFxcXCUyNVwiICsgWk9ORUlEJCksXG4gICAgICAgIC8vUkZDIDY4NzRcbiAgICBJUFY2QUREUlpfUkVMQVhFRCQgPSBzdWJleHAoSVBWNkFERFJFU1MkICsgc3ViZXhwKFwiXFxcXCUyNXxcXFxcJSg/IVwiICsgSEVYRElHJCQgKyBcInsyfSlcIikgKyBaT05FSUQkKSxcbiAgICAgICAgLy9SRkMgNjg3NCwgd2l0aCByZWxheGVkIHBhcnNpbmcgcnVsZXNcbiAgICBJUFZGVVRVUkUkID0gc3ViZXhwKFwiW3ZWXVwiICsgSEVYRElHJCQgKyBcIitcXFxcLlwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFw6XVwiKSArIFwiK1wiKSxcbiAgICAgICAgSVBfTElURVJBTCQgPSBzdWJleHAoXCJcXFxcW1wiICsgc3ViZXhwKElQVjZBRERSWl9SRUxBWEVEJCArIFwifFwiICsgSVBWNkFERFJFU1MkICsgXCJ8XCIgKyBJUFZGVVRVUkUkKSArIFwiXFxcXF1cIiksXG4gICAgICAgIC8vUkZDIDY4NzRcbiAgICBSRUdfTkFNRSQgPSBzdWJleHAoc3ViZXhwKFBDVF9FTkNPREVEJCArIFwifFwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpKSArIFwiKlwiKSxcbiAgICAgICAgSE9TVCQgPSBzdWJleHAoSVBfTElURVJBTCQgKyBcInxcIiArIElQVjRBRERSRVNTJCArIFwiKD8hXCIgKyBSRUdfTkFNRSQgKyBcIilcIiArIFwifFwiICsgUkVHX05BTUUkKSxcbiAgICAgICAgUE9SVCQgPSBzdWJleHAoRElHSVQkJCArIFwiKlwiKSxcbiAgICAgICAgQVVUSE9SSVRZJCA9IHN1YmV4cChzdWJleHAoVVNFUklORk8kICsgXCJAXCIpICsgXCI/XCIgKyBIT1NUJCArIHN1YmV4cChcIlxcXFw6XCIgKyBQT1JUJCkgKyBcIj9cIiksXG4gICAgICAgIFBDSEFSJCA9IHN1YmV4cChQQ1RfRU5DT0RFRCQgKyBcInxcIiArIG1lcmdlKFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcOlxcXFxAXVwiKSksXG4gICAgICAgIFNFR01FTlQkID0gc3ViZXhwKFBDSEFSJCArIFwiKlwiKSxcbiAgICAgICAgU0VHTUVOVF9OWiQgPSBzdWJleHAoUENIQVIkICsgXCIrXCIpLFxuICAgICAgICBTRUdNRU5UX05aX05DJCA9IHN1YmV4cChzdWJleHAoUENUX0VOQ09ERUQkICsgXCJ8XCIgKyBtZXJnZShVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXEBdXCIpKSArIFwiK1wiKSxcbiAgICAgICAgUEFUSF9BQkVNUFRZJCA9IHN1YmV4cChzdWJleHAoXCJcXFxcL1wiICsgU0VHTUVOVCQpICsgXCIqXCIpLFxuICAgICAgICBQQVRIX0FCU09MVVRFJCA9IHN1YmV4cChcIlxcXFwvXCIgKyBzdWJleHAoU0VHTUVOVF9OWiQgKyBQQVRIX0FCRU1QVFkkKSArIFwiP1wiKSxcbiAgICAgICAgLy9zaW1wbGlmaWVkXG4gICAgUEFUSF9OT1NDSEVNRSQgPSBzdWJleHAoU0VHTUVOVF9OWl9OQyQgKyBQQVRIX0FCRU1QVFkkKSxcbiAgICAgICAgLy9zaW1wbGlmaWVkXG4gICAgUEFUSF9ST09UTEVTUyQgPSBzdWJleHAoU0VHTUVOVF9OWiQgKyBQQVRIX0FCRU1QVFkkKSxcbiAgICAgICAgLy9zaW1wbGlmaWVkXG4gICAgUEFUSF9FTVBUWSQgPSBcIig/IVwiICsgUENIQVIkICsgXCIpXCIsXG4gICAgICAgIFBBVEgkID0gc3ViZXhwKFBBVEhfQUJFTVBUWSQgKyBcInxcIiArIFBBVEhfQUJTT0xVVEUkICsgXCJ8XCIgKyBQQVRIX05PU0NIRU1FJCArIFwifFwiICsgUEFUSF9ST09UTEVTUyQgKyBcInxcIiArIFBBVEhfRU1QVFkkKSxcbiAgICAgICAgUVVFUlkkID0gc3ViZXhwKHN1YmV4cChQQ0hBUiQgKyBcInxcIiArIG1lcmdlKFwiW1xcXFwvXFxcXD9dXCIsIElQUklWQVRFJCQpKSArIFwiKlwiKSxcbiAgICAgICAgRlJBR01FTlQkID0gc3ViZXhwKHN1YmV4cChQQ0hBUiQgKyBcInxbXFxcXC9cXFxcP11cIikgKyBcIipcIiksXG4gICAgICAgIEhJRVJfUEFSVCQgPSBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcL1wiICsgQVVUSE9SSVRZJCArIFBBVEhfQUJFTVBUWSQpICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9ST09UTEVTUyQgKyBcInxcIiArIFBBVEhfRU1QVFkkKSxcbiAgICAgICAgVVJJJCA9IHN1YmV4cChTQ0hFTUUkICsgXCJcXFxcOlwiICsgSElFUl9QQVJUJCArIHN1YmV4cChcIlxcXFw/XCIgKyBRVUVSWSQpICsgXCI/XCIgKyBzdWJleHAoXCJcXFxcI1wiICsgRlJBR01FTlQkKSArIFwiP1wiKSxcbiAgICAgICAgUkVMQVRJVkVfUEFSVCQgPSBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcL1wiICsgQVVUSE9SSVRZJCArIFBBVEhfQUJFTVBUWSQpICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9OT1NDSEVNRSQgKyBcInxcIiArIFBBVEhfRU1QVFkkKSxcbiAgICAgICAgUkVMQVRJVkUkID0gc3ViZXhwKFJFTEFUSVZFX1BBUlQkICsgc3ViZXhwKFwiXFxcXD9cIiArIFFVRVJZJCkgKyBcIj9cIiArIHN1YmV4cChcIlxcXFwjXCIgKyBGUkFHTUVOVCQpICsgXCI/XCIpLFxuICAgICAgICBVUklfUkVGRVJFTkNFJCA9IHN1YmV4cChVUkkkICsgXCJ8XCIgKyBSRUxBVElWRSQpLFxuICAgICAgICBBQlNPTFVURV9VUkkkID0gc3ViZXhwKFNDSEVNRSQgKyBcIlxcXFw6XCIgKyBISUVSX1BBUlQkICsgc3ViZXhwKFwiXFxcXD9cIiArIFFVRVJZJCkgKyBcIj9cIiksXG4gICAgICAgIEdFTkVSSUNfUkVGJCA9IFwiXihcIiArIFNDSEVNRSQgKyBcIilcXFxcOlwiICsgc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC8oXCIgKyBzdWJleHAoXCIoXCIgKyBVU0VSSU5GTyQgKyBcIilAXCIpICsgXCI/KFwiICsgSE9TVCQgKyBcIilcIiArIHN1YmV4cChcIlxcXFw6KFwiICsgUE9SVCQgKyBcIilcIikgKyBcIj8pXCIpICsgXCI/KFwiICsgUEFUSF9BQkVNUFRZJCArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfUk9PVExFU1MkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCArIFwiKVwiKSArIHN1YmV4cChcIlxcXFw/KFwiICsgUVVFUlkkICsgXCIpXCIpICsgXCI/XCIgKyBzdWJleHAoXCJcXFxcIyhcIiArIEZSQUdNRU5UJCArIFwiKVwiKSArIFwiPyRcIixcbiAgICAgICAgUkVMQVRJVkVfUkVGJCA9IFwiXigpezB9XCIgKyBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcLyhcIiArIHN1YmV4cChcIihcIiArIFVTRVJJTkZPJCArIFwiKUBcIikgKyBcIj8oXCIgKyBIT1NUJCArIFwiKVwiICsgc3ViZXhwKFwiXFxcXDooXCIgKyBQT1JUJCArIFwiKVwiKSArIFwiPylcIikgKyBcIj8oXCIgKyBQQVRIX0FCRU1QVFkkICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9OT1NDSEVNRSQgKyBcInxcIiArIFBBVEhfRU1QVFkkICsgXCIpXCIpICsgc3ViZXhwKFwiXFxcXD8oXCIgKyBRVUVSWSQgKyBcIilcIikgKyBcIj9cIiArIHN1YmV4cChcIlxcXFwjKFwiICsgRlJBR01FTlQkICsgXCIpXCIpICsgXCI/JFwiLFxuICAgICAgICBBQlNPTFVURV9SRUYkID0gXCJeKFwiICsgU0NIRU1FJCArIFwiKVxcXFw6XCIgKyBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcLyhcIiArIHN1YmV4cChcIihcIiArIFVTRVJJTkZPJCArIFwiKUBcIikgKyBcIj8oXCIgKyBIT1NUJCArIFwiKVwiICsgc3ViZXhwKFwiXFxcXDooXCIgKyBQT1JUJCArIFwiKVwiKSArIFwiPylcIikgKyBcIj8oXCIgKyBQQVRIX0FCRU1QVFkkICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9ST09UTEVTUyQgKyBcInxcIiArIFBBVEhfRU1QVFkkICsgXCIpXCIpICsgc3ViZXhwKFwiXFxcXD8oXCIgKyBRVUVSWSQgKyBcIilcIikgKyBcIj8kXCIsXG4gICAgICAgIFNBTUVET0NfUkVGJCA9IFwiXlwiICsgc3ViZXhwKFwiXFxcXCMoXCIgKyBGUkFHTUVOVCQgKyBcIilcIikgKyBcIj8kXCIsXG4gICAgICAgIEFVVEhPUklUWV9SRUYkID0gXCJeXCIgKyBzdWJleHAoXCIoXCIgKyBVU0VSSU5GTyQgKyBcIilAXCIpICsgXCI/KFwiICsgSE9TVCQgKyBcIilcIiArIHN1YmV4cChcIlxcXFw6KFwiICsgUE9SVCQgKyBcIilcIikgKyBcIj8kXCI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgTk9UX1NDSEVNRTogbmV3IFJlZ0V4cChtZXJnZShcIlteXVwiLCBBTFBIQSQkLCBESUdJVCQkLCBcIltcXFxcK1xcXFwtXFxcXC5dXCIpLCBcImdcIiksXG4gICAgICAgIE5PVF9VU0VSSU5GTzogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVcXFxcOl1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9IT1NUOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJVxcXFxbXFxcXF1cXFxcOl1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9QQVRIOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJVxcXFwvXFxcXDpcXFxcQF1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9QQVRIX05PU0NIRU1FOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJVxcXFwvXFxcXEBdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfUVVFUlk6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpcXFxcQFxcXFwvXFxcXD9dXCIsIElQUklWQVRFJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9GUkFHTUVOVDogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcOlxcXFxAXFxcXC9cXFxcP11cIiksIFwiZ1wiKSxcbiAgICAgICAgRVNDQVBFOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15dXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBVTlJFU0VSVkVEOiBuZXcgUmVnRXhwKFVOUkVTRVJWRUQkJCwgXCJnXCIpLFxuICAgICAgICBPVEhFUl9DSEFSUzogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVdXCIsIFVOUkVTRVJWRUQkJCwgUkVTRVJWRUQkJCksIFwiZ1wiKSxcbiAgICAgICAgUENUX0VOQ09ERUQ6IG5ldyBSZWdFeHAoUENUX0VOQ09ERUQkLCBcImdcIiksXG4gICAgICAgIElQVjRBRERSRVNTOiBuZXcgUmVnRXhwKFwiXihcIiArIElQVjRBRERSRVNTJCArIFwiKSRcIiksXG4gICAgICAgIElQVjZBRERSRVNTOiBuZXcgUmVnRXhwKFwiXlxcXFxbPyhcIiArIElQVjZBRERSRVNTJCArIFwiKVwiICsgc3ViZXhwKHN1YmV4cChcIlxcXFwlMjV8XFxcXCUoPyFcIiArIEhFWERJRyQkICsgXCJ7Mn0pXCIpICsgXCIoXCIgKyBaT05FSUQkICsgXCIpXCIpICsgXCI/XFxcXF0/JFwiKSAvL1JGQyA2ODc0LCB3aXRoIHJlbGF4ZWQgcGFyc2luZyBydWxlc1xuICAgIH07XG59XG52YXIgVVJJX1BST1RPQ09MID0gYnVpbGRFeHBzKGZhbHNlKTtcblxudmFyIElSSV9QUk9UT0NPTCA9IGJ1aWxkRXhwcyh0cnVlKTtcblxudmFyIHNsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbnZhciB0b0NvbnN1bWFibGVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59O1xuXG4vKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cbnZhciBtYXhJbnQgPSAyMTQ3NDgzNjQ3OyAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cbi8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cbnZhciBiYXNlID0gMzY7XG52YXIgdE1pbiA9IDE7XG52YXIgdE1heCA9IDI2O1xudmFyIHNrZXcgPSAzODtcbnZhciBkYW1wID0gNzAwO1xudmFyIGluaXRpYWxCaWFzID0gNzI7XG52YXIgaW5pdGlhbE4gPSAxMjg7IC8vIDB4ODBcbnZhciBkZWxpbWl0ZXIgPSAnLSc7IC8vICdcXHgyRCdcblxuLyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cbnZhciByZWdleFB1bnljb2RlID0gL154bi0tLztcbnZhciByZWdleE5vbkFTQ0lJID0gL1teXFwwLVxceDdFXS87IC8vIG5vbi1BU0NJSSBjaGFyc1xudmFyIHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2c7IC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuLyoqIEVycm9yIG1lc3NhZ2VzICovXG52YXIgZXJyb3JzID0ge1xuXHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xufTtcblxuLyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xudmFyIGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbjtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIGVycm9yJDEodHlwZSkge1xuXHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xufVxuXG4vKipcbiAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcbiAqIGl0ZW0uXG4gKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IGFycmF5IG9mIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRyZXN1bHRbbGVuZ3RoXSA9IGZuKGFycmF5W2xlbmd0aF0pO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG4gKiBhZGRyZXNzZXMuXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeVxuICogY2hhcmFjdGVyLlxuICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcbiAqIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHR2YXIgcGFydHMgPSBzdHJpbmcuc3BsaXQoJ0AnKTtcblx0dmFyIHJlc3VsdCA9ICcnO1xuXHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdC8vIEluIGVtYWlsIGFkZHJlc3Nlcywgb25seSB0aGUgZG9tYWluIG5hbWUgc2hvdWxkIGJlIHB1bnljb2RlZC4gTGVhdmVcblx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdHN0cmluZyA9IHBhcnRzWzFdO1xuXHR9XG5cdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmVnZXhTZXBhcmF0b3JzLCAnXFx4MkUnKTtcblx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdHJldHVybiByZXN1bHQgKyBlbmNvZGVkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgbnVtZXJpYyBjb2RlIHBvaW50cyBvZiBlYWNoIFVuaWNvZGVcbiAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcbiAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG4gKiBVQ1MtMiBleHBvc2VzIGFzIHNlcGFyYXRlIGNoYXJhY3RlcnMpIGludG8gYSBzaW5nbGUgY29kZSBwb2ludCxcbiAqIG1hdGNoaW5nIFVURi0xNi5cbiAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG4gKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuICogQG5hbWUgZGVjb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuICovXG5mdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHR2YXIgb3V0cHV0ID0gW107XG5cdHZhciBjb3VudGVyID0gMDtcblx0dmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG5cdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0dmFyIHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBJdCdzIGEgaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyLlxuXHRcdFx0dmFyIGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkge1xuXHRcdFx0XHQvLyBMb3cgc3Vycm9nYXRlLlxuXHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSXQncyBhbiB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGVcblx0XHRcdFx0Ly8gbmV4dCBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXIuXG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvdXRwdXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0cmluZyBiYXNlZCBvbiBhbiBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG4gKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuICogQG5hbWUgZW5jb2RlXG4gKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuICovXG52YXIgdWNzMmVuY29kZSA9IGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0cmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50LmFwcGx5KFN0cmluZywgdG9Db25zdW1hYmxlQXJyYXkoYXJyYXkpKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBiYXNpYyBjb2RlIHBvaW50IGludG8gYSBkaWdpdC9pbnRlZ2VyLlxuICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVQb2ludCBUaGUgYmFzaWMgbnVtZXJpYyBjb2RlIHBvaW50IHZhbHVlLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG4gKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG4gKiB0aGUgY29kZSBwb2ludCBkb2VzIG5vdCByZXByZXNlbnQgYSB2YWx1ZS5cbiAqL1xudmFyIGJhc2ljVG9EaWdpdCA9IGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0aWYgKGNvZGVQb2ludCAtIDB4MzAgPCAweDBBKSB7XG5cdFx0cmV0dXJuIGNvZGVQb2ludCAtIDB4MTY7XG5cdH1cblx0aWYgKGNvZGVQb2ludCAtIDB4NDEgPCAweDFBKSB7XG5cdFx0cmV0dXJuIGNvZGVQb2ludCAtIDB4NDE7XG5cdH1cblx0aWYgKGNvZGVQb2ludCAtIDB4NjEgPCAweDFBKSB7XG5cdFx0cmV0dXJuIGNvZGVQb2ludCAtIDB4NjE7XG5cdH1cblx0cmV0dXJuIGJhc2U7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cbiAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2VcbiAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcbiAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG4gKi9cbnZhciBkaWdpdFRvQmFzaWMgPSBmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0Ly8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG5cdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG59O1xuXG4vKipcbiAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuICogQHByaXZhdGVcbiAqL1xudmFyIGFkYXB0ID0gZnVuY3Rpb24gYWRhcHQoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG5cdHZhciBrID0gMDtcblx0ZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcblx0ZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuXHRmb3IgKDsgLyogbm8gaW5pdGlhbGl6YXRpb24gKi9kZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcblx0fVxuXHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzIHRvIGEgc3RyaW5nIG9mIFVuaWNvZGVcbiAqIHN5bWJvbHMuXG4gKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cbiAqL1xudmFyIGRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHQvLyBEb24ndCB1c2UgVUNTLTIuXG5cdHZhciBvdXRwdXQgPSBbXTtcblx0dmFyIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHR2YXIgaSA9IDA7XG5cdHZhciBuID0gaW5pdGlhbE47XG5cdHZhciBiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50czogbGV0IGBiYXNpY2AgYmUgdGhlIG51bWJlciBvZiBpbnB1dCBjb2RlXG5cdC8vIHBvaW50cyBiZWZvcmUgdGhlIGxhc3QgZGVsaW1pdGVyLCBvciBgMGAgaWYgdGhlcmUgaXMgbm9uZSwgdGhlbiBjb3B5XG5cdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdHZhciBiYXNpYyA9IGlucHV0Lmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG5cdGlmIChiYXNpYyA8IDApIHtcblx0XHRiYXNpYyA9IDA7XG5cdH1cblxuXHRmb3IgKHZhciBqID0gMDsgaiA8IGJhc2ljOyArK2opIHtcblx0XHQvLyBpZiBpdCdzIG5vdCBhIGJhc2ljIGNvZGUgcG9pbnRcblx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRlcnJvciQxKCdub3QtYmFzaWMnKTtcblx0XHR9XG5cdFx0b3V0cHV0LnB1c2goaW5wdXQuY2hhckNvZGVBdChqKSk7XG5cdH1cblxuXHQvLyBNYWluIGRlY29kaW5nIGxvb3A6IHN0YXJ0IGp1c3QgYWZ0ZXIgdGhlIGxhc3QgZGVsaW1pdGVyIGlmIGFueSBiYXNpYyBjb2RlXG5cdC8vIHBvaW50cyB3ZXJlIGNvcGllZDsgc3RhcnQgYXQgdGhlIGJlZ2lubmluZyBvdGhlcndpc2UuXG5cblx0Zm9yICh2YXIgaW5kZXggPSBiYXNpYyA+IDAgPyBiYXNpYyArIDEgOiAwOyBpbmRleCA8IGlucHV0TGVuZ3RoOykgLyogbm8gZmluYWwgZXhwcmVzc2lvbiAqL3tcblxuXHRcdC8vIGBpbmRleGAgaXMgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGNoYXJhY3RlciB0byBiZSBjb25zdW1lZC5cblx0XHQvLyBEZWNvZGUgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciBpbnRvIGBkZWx0YWAsXG5cdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHQvLyBpZiB3ZSBpbmNyZWFzZSBgaWAgYXMgd2UgZ28sIHRoZW4gc3VidHJhY3Qgb2ZmIGl0cyBzdGFydGluZ1xuXHRcdC8vIHZhbHVlIGF0IHRoZSBlbmQgdG8gb2J0YWluIGBkZWx0YWAuXG5cdFx0dmFyIG9sZGkgPSBpO1xuXHRcdGZvciAodmFyIHcgPSAxLCBrID0gYmFzZTs7IC8qIG5vIGNvbmRpdGlvbiAqL2sgKz0gYmFzZSkge1xuXG5cdFx0XHRpZiAoaW5kZXggPj0gaW5wdXRMZW5ndGgpIHtcblx0XHRcdFx0ZXJyb3IkMSgnaW52YWxpZC1pbnB1dCcpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZGlnaXQgPSBiYXNpY1RvRGlnaXQoaW5wdXQuY2hhckNvZGVBdChpbmRleCsrKSk7XG5cblx0XHRcdGlmIChkaWdpdCA+PSBiYXNlIHx8IGRpZ2l0ID4gZmxvb3IoKG1heEludCAtIGkpIC8gdykpIHtcblx0XHRcdFx0ZXJyb3IkMSgnb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0aSArPSBkaWdpdCAqIHc7XG5cdFx0XHR2YXIgdCA9IGsgPD0gYmlhcyA/IHRNaW4gOiBrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzO1xuXG5cdFx0XHRpZiAoZGlnaXQgPCB0KSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgYmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0aWYgKHcgPiBmbG9vcihtYXhJbnQgLyBiYXNlTWludXNUKSkge1xuXHRcdFx0XHRlcnJvciQxKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cdFx0fVxuXG5cdFx0dmFyIG91dCA9IG91dHB1dC5sZW5ndGggKyAxO1xuXHRcdGJpYXMgPSBhZGFwdChpIC0gb2xkaSwgb3V0LCBvbGRpID09IDApO1xuXG5cdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHQvLyBpbmNyZW1lbnRpbmcgYG5gIGVhY2ggdGltZSwgc28gd2UnbGwgZml4IHRoYXQgbm93OlxuXHRcdGlmIChmbG9vcihpIC8gb3V0KSA+IG1heEludCAtIG4pIHtcblx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0fVxuXG5cdFx0biArPSBmbG9vcihpIC8gb3V0KTtcblx0XHRpICU9IG91dDtcblxuXHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXQuXG5cdFx0b3V0cHV0LnNwbGljZShpKyssIDAsIG4pO1xuXHR9XG5cblx0cmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50LmFwcGx5KFN0cmluZywgb3V0cHV0KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcbiAqIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG4gKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cbiAqL1xudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuXHR2YXIgb3V0cHV0ID0gW107XG5cblx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gYW4gYXJyYXkgb2YgVW5pY29kZSBjb2RlIHBvaW50cy5cblx0aW5wdXQgPSB1Y3MyZGVjb2RlKGlucHV0KTtcblxuXHQvLyBDYWNoZSB0aGUgbGVuZ3RoLlxuXHR2YXIgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0Ly8gSW5pdGlhbGl6ZSB0aGUgc3RhdGUuXG5cdHZhciBuID0gaW5pdGlhbE47XG5cdHZhciBkZWx0YSA9IDA7XG5cdHZhciBiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50cy5cblx0dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuXHR2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcblx0dmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG5cdHRyeSB7XG5cdFx0Zm9yICh2YXIgX2l0ZXJhdG9yID0gaW5wdXRbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG5cdFx0XHR2YXIgX2N1cnJlbnRWYWx1ZTIgPSBfc3RlcC52YWx1ZTtcblxuXHRcdFx0aWYgKF9jdXJyZW50VmFsdWUyIDwgMHg4MCkge1xuXHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoX2N1cnJlbnRWYWx1ZTIpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcblx0XHRfaXRlcmF0b3JFcnJvciA9IGVycjtcblx0fSBmaW5hbGx5IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcblx0XHRcdFx0X2l0ZXJhdG9yLnJldHVybigpO1xuXHRcdFx0fVxuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcblx0XHRcdFx0dGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dmFyIGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblx0dmFyIGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGg7XG5cblx0Ly8gYGhhbmRsZWRDUENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHQvLyBGaW5pc2ggdGhlIGJhc2ljIHN0cmluZyB3aXRoIGEgZGVsaW1pdGVyIHVubGVzcyBpdCdzIGVtcHR5LlxuXHRpZiAoYmFzaWNMZW5ndGgpIHtcblx0XHRvdXRwdXQucHVzaChkZWxpbWl0ZXIpO1xuXHR9XG5cblx0Ly8gTWFpbiBlbmNvZGluZyBsb29wOlxuXHR3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuXG5cdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdC8vIGxhcmdlciBvbmU6XG5cdFx0dmFyIG0gPSBtYXhJbnQ7XG5cdFx0dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcblx0XHR2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG5cdFx0dmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuXHRcdHRyeSB7XG5cdFx0XHRmb3IgKHZhciBfaXRlcmF0b3IyID0gaW5wdXRbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRWYWx1ZSA9IF9zdGVwMi52YWx1ZTtcblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3cuXG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuXHRcdFx0X2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yMi5yZXR1cm4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0aWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuXHRcdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yMjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG5cdFx0aWYgKG0gLSBuID4gZmxvb3IoKG1heEludCAtIGRlbHRhKSAvIGhhbmRsZWRDUENvdW50UGx1c09uZSkpIHtcblx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0fVxuXG5cdFx0ZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcblx0XHRuID0gbTtcblxuXHRcdHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG5cdFx0dmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuXHRcdHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cblx0XHR0cnkge1xuXHRcdFx0Zm9yICh2YXIgX2l0ZXJhdG9yMyA9IGlucHV0W1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG5cdFx0XHRcdHZhciBfY3VycmVudFZhbHVlID0gX3N0ZXAzLnZhbHVlO1xuXG5cdFx0XHRcdGlmIChfY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG5cdFx0XHRcdFx0ZXJyb3IkMSgnb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoX2N1cnJlbnRWYWx1ZSA9PSBuKSB7XG5cdFx0XHRcdFx0Ly8gUmVwcmVzZW50IGRlbHRhIGFzIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIuXG5cdFx0XHRcdFx0dmFyIHEgPSBkZWx0YTtcblx0XHRcdFx0XHRmb3IgKHZhciBrID0gYmFzZTs7IC8qIG5vIGNvbmRpdGlvbiAqL2sgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dmFyIHQgPSBrIDw9IGJpYXMgPyB0TWluIDogayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcztcblx0XHRcdFx0XHRcdGlmIChxIDwgdCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHR2YXIgYmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKSk7XG5cdFx0XHRcdFx0XHRxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSwgMCkpKTtcblx0XHRcdFx0XHRiaWFzID0gYWRhcHQoZGVsdGEsIGhhbmRsZWRDUENvdW50UGx1c09uZSwgaGFuZGxlZENQQ291bnQgPT0gYmFzaWNMZW5ndGgpO1xuXHRcdFx0XHRcdGRlbHRhID0gMDtcblx0XHRcdFx0XHQrK2hhbmRsZWRDUENvdW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuXHRcdFx0X2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yMy5yZXR1cm4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0aWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuXHRcdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yMztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCsrZGVsdGE7XG5cdFx0KytuO1xuXHR9XG5cdHJldHVybiBvdXRwdXQuam9pbignJyk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3NcbiAqIHRvIFVuaWNvZGUuIE9ubHkgdGhlIFB1bnljb2RlZCBwYXJ0cyBvZiB0aGUgaW5wdXQgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS5cbiAqIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlblxuICogY29udmVydGVkIHRvIFVuaWNvZGUuXG4gKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGVkIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG9cbiAqIGNvbnZlcnQgdG8gVW5pY29kZS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBVbmljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBQdW55Y29kZVxuICogc3RyaW5nLlxuICovXG52YXIgdG9Vbmljb2RlID0gZnVuY3Rpb24gdG9Vbmljb2RlKGlucHV0KSB7XG5cdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZykgPyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpIDogc3RyaW5nO1xuXHR9KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBVbmljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzIHRvXG4gKiBQdW55Y29kZS4gT25seSB0aGUgbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCxcbiAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuICogQVNDSUkuXG4gKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG4gKiBVbmljb2RlIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUgb3JcbiAqIGVtYWlsIGFkZHJlc3MuXG4gKi9cbnZhciB0b0FTQ0lJID0gZnVuY3Rpb24gdG9BU0NJSShpbnB1dCkge1xuXHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHJlZ2V4Tm9uQVNDSUkudGVzdChzdHJpbmcpID8gJ3huLS0nICsgZW5jb2RlKHN0cmluZykgOiBzdHJpbmc7XG5cdH0pO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cbnZhciBwdW55Y29kZSA9IHtcblx0LyoqXG4gICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuICAqIEBtZW1iZXJPZiBwdW55Y29kZVxuICAqIEB0eXBlIFN0cmluZ1xuICAqL1xuXHQndmVyc2lvbic6ICcyLjEuMCcsXG5cdC8qKlxuICAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG4gICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cbiAgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cbiAgKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAgKiBAdHlwZSBPYmplY3RcbiAgKi9cblx0J3VjczInOiB7XG5cdFx0J2RlY29kZSc6IHVjczJkZWNvZGUsXG5cdFx0J2VuY29kZSc6IHVjczJlbmNvZGVcblx0fSxcblx0J2RlY29kZSc6IGRlY29kZSxcblx0J2VuY29kZSc6IGVuY29kZSxcblx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHQndG9Vbmljb2RlJzogdG9Vbmljb2RlXG59O1xuXG4vKipcbiAqIFVSSS5qc1xuICpcbiAqIEBmaWxlb3ZlcnZpZXcgQW4gUkZDIDM5ODYgY29tcGxpYW50LCBzY2hlbWUgZXh0ZW5kYWJsZSBVUkkgcGFyc2luZy92YWxpZGF0aW5nL3Jlc29sdmluZyBsaWJyYXJ5IGZvciBKYXZhU2NyaXB0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmdhcnkuY291cnRAZ21haWwuY29tXCI+R2FyeSBDb3VydDwvYT5cbiAqIEBzZWUgaHR0cDovL2dpdGh1Yi5jb20vZ2FyeWNvdXJ0L3VyaS1qc1xuICovXG4vKipcbiAqIENvcHlyaWdodCAyMDExIEdhcnkgQ291cnQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbiwgYXJlXG4gKiBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAgICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZlxuICogICAgICAgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICpcbiAqICAgIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0XG4gKiAgICAgICBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFsc1xuICogICAgICAgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgR0FSWSBDT1VSVCBgYEFTIElTJycgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRURcbiAqIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkRcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBHQVJZIENPVVJUIE9SXG4gKiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUlxuICogU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuICogQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xuICogTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGXG4gKiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiBUaGUgdmlld3MgYW5kIGNvbmNsdXNpb25zIGNvbnRhaW5lZCBpbiB0aGUgc29mdHdhcmUgYW5kIGRvY3VtZW50YXRpb24gYXJlIHRob3NlIG9mIHRoZVxuICogYXV0aG9ycyBhbmQgc2hvdWxkIG5vdCBiZSBpbnRlcnByZXRlZCBhcyByZXByZXNlbnRpbmcgb2ZmaWNpYWwgcG9saWNpZXMsIGVpdGhlciBleHByZXNzZWRcbiAqIG9yIGltcGxpZWQsIG9mIEdhcnkgQ291cnQuXG4gKi9cbnZhciBTQ0hFTUVTID0ge307XG5mdW5jdGlvbiBwY3RFbmNDaGFyKGNocikge1xuICAgIHZhciBjID0gY2hyLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIGUgPSB2b2lkIDA7XG4gICAgaWYgKGMgPCAxNikgZSA9IFwiJTBcIiArIGMudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7ZWxzZSBpZiAoYyA8IDEyOCkgZSA9IFwiJVwiICsgYy50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtlbHNlIGlmIChjIDwgMjA0OCkgZSA9IFwiJVwiICsgKGMgPj4gNiB8IDE5MikudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIiVcIiArIChjICYgNjMgfCAxMjgpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO2Vsc2UgZSA9IFwiJVwiICsgKGMgPj4gMTIgfCAyMjQpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCIlXCIgKyAoYyA+PiA2ICYgNjMgfCAxMjgpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCIlXCIgKyAoYyAmIDYzIHwgMTI4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIHBjdERlY0NoYXJzKHN0cikge1xuICAgIHZhciBuZXdTdHIgPSBcIlwiO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaWwgPSBzdHIubGVuZ3RoO1xuICAgIHdoaWxlIChpIDwgaWwpIHtcbiAgICAgICAgdmFyIGMgPSBwYXJzZUludChzdHIuc3Vic3RyKGkgKyAxLCAyKSwgMTYpO1xuICAgICAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgICAgICAgbmV3U3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gICAgICAgICAgICBpICs9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA+PSAxOTQgJiYgYyA8IDIyNCkge1xuICAgICAgICAgICAgaWYgKGlsIC0gaSA+PSA2KSB7XG4gICAgICAgICAgICAgICAgdmFyIGMyID0gcGFyc2VJbnQoc3RyLnN1YnN0cihpICsgNCwgMiksIDE2KTtcbiAgICAgICAgICAgICAgICBuZXdTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDMxKSA8PCA2IHwgYzIgJiA2Myk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0ciArPSBzdHIuc3Vic3RyKGksIDYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSArPSA2O1xuICAgICAgICB9IGVsc2UgaWYgKGMgPj0gMjI0KSB7XG4gICAgICAgICAgICBpZiAoaWwgLSBpID49IDkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2MgPSBwYXJzZUludChzdHIuc3Vic3RyKGkgKyA0LCAyKSwgMTYpO1xuICAgICAgICAgICAgICAgIHZhciBjMyA9IHBhcnNlSW50KHN0ci5zdWJzdHIoaSArIDcsIDIpLCAxNik7XG4gICAgICAgICAgICAgICAgbmV3U3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAxNSkgPDwgMTIgfCAoX2MgJiA2MykgPDwgNiB8IGMzICYgNjMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdHIgKz0gc3RyLnN1YnN0cihpLCA5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgKz0gOTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1N0ciArPSBzdHIuc3Vic3RyKGksIDMpO1xuICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdTdHI7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplQ29tcG9uZW50RW5jb2RpbmcoY29tcG9uZW50cywgcHJvdG9jb2wpIHtcbiAgICBmdW5jdGlvbiBkZWNvZGVVbnJlc2VydmVkKHN0cikge1xuICAgICAgICB2YXIgZGVjU3RyID0gcGN0RGVjQ2hhcnMoc3RyKTtcbiAgICAgICAgcmV0dXJuICFkZWNTdHIubWF0Y2gocHJvdG9jb2wuVU5SRVNFUlZFRCkgPyBzdHIgOiBkZWNTdHI7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLnNjaGVtZSkgY29tcG9uZW50cy5zY2hlbWUgPSBTdHJpbmcoY29tcG9uZW50cy5zY2hlbWUpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnRvTG93ZXJDYXNlKCkucmVwbGFjZShwcm90b2NvbC5OT1RfU0NIRU1FLCBcIlwiKTtcbiAgICBpZiAoY29tcG9uZW50cy51c2VyaW5mbyAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLnVzZXJpbmZvID0gU3RyaW5nKGNvbXBvbmVudHMudXNlcmluZm8pLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UocHJvdG9jb2wuTk9UX1VTRVJJTkZPLCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgaWYgKGNvbXBvbmVudHMuaG9zdCAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLmhvc3QgPSBTdHJpbmcoY29tcG9uZW50cy5ob3N0KS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UocHJvdG9jb2wuTk9UX0hPU1QsIHBjdEVuY0NoYXIpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKTtcbiAgICBpZiAoY29tcG9uZW50cy5wYXRoICE9PSB1bmRlZmluZWQpIGNvbXBvbmVudHMucGF0aCA9IFN0cmluZyhjb21wb25lbnRzLnBhdGgpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UoY29tcG9uZW50cy5zY2hlbWUgPyBwcm90b2NvbC5OT1RfUEFUSCA6IHByb3RvY29sLk5PVF9QQVRIX05PU0NIRU1FLCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgaWYgKGNvbXBvbmVudHMucXVlcnkgIT09IHVuZGVmaW5lZCkgY29tcG9uZW50cy5xdWVyeSA9IFN0cmluZyhjb21wb25lbnRzLnF1ZXJ5KS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKHByb3RvY29sLk5PVF9RVUVSWSwgcGN0RW5jQ2hhcikucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpO1xuICAgIGlmIChjb21wb25lbnRzLmZyYWdtZW50ICE9PSB1bmRlZmluZWQpIGNvbXBvbmVudHMuZnJhZ21lbnQgPSBTdHJpbmcoY29tcG9uZW50cy5mcmFnbWVudCkucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShwcm90b2NvbC5OT1RfRlJBR01FTlQsIHBjdEVuY0NoYXIpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKTtcbiAgICByZXR1cm4gY29tcG9uZW50cztcbn1cblxuZnVuY3Rpb24gX3N0cmlwTGVhZGluZ1plcm9zKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXjAqKC4qKS8sIFwiJDFcIikgfHwgXCIwXCI7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplSVB2NChob3N0LCBwcm90b2NvbCkge1xuICAgIHZhciBtYXRjaGVzID0gaG9zdC5tYXRjaChwcm90b2NvbC5JUFY0QUREUkVTUykgfHwgW107XG5cbiAgICB2YXIgX21hdGNoZXMgPSBzbGljZWRUb0FycmF5KG1hdGNoZXMsIDIpLFxuICAgICAgICBhZGRyZXNzID0gX21hdGNoZXNbMV07XG5cbiAgICBpZiAoYWRkcmVzcykge1xuICAgICAgICByZXR1cm4gYWRkcmVzcy5zcGxpdChcIi5cIikubWFwKF9zdHJpcExlYWRpbmdaZXJvcykuam9pbihcIi5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxufVxuZnVuY3Rpb24gX25vcm1hbGl6ZUlQdjYoaG9zdCwgcHJvdG9jb2wpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IGhvc3QubWF0Y2gocHJvdG9jb2wuSVBWNkFERFJFU1MpIHx8IFtdO1xuXG4gICAgdmFyIF9tYXRjaGVzMiA9IHNsaWNlZFRvQXJyYXkobWF0Y2hlcywgMyksXG4gICAgICAgIGFkZHJlc3MgPSBfbWF0Y2hlczJbMV0sXG4gICAgICAgIHpvbmUgPSBfbWF0Y2hlczJbMl07XG5cbiAgICBpZiAoYWRkcmVzcykge1xuICAgICAgICB2YXIgX2FkZHJlc3MkdG9Mb3dlckNhc2UkID0gYWRkcmVzcy50b0xvd2VyQ2FzZSgpLnNwbGl0KCc6OicpLnJldmVyc2UoKSxcbiAgICAgICAgICAgIF9hZGRyZXNzJHRvTG93ZXJDYXNlJDIgPSBzbGljZWRUb0FycmF5KF9hZGRyZXNzJHRvTG93ZXJDYXNlJCwgMiksXG4gICAgICAgICAgICBsYXN0ID0gX2FkZHJlc3MkdG9Mb3dlckNhc2UkMlswXSxcbiAgICAgICAgICAgIGZpcnN0ID0gX2FkZHJlc3MkdG9Mb3dlckNhc2UkMlsxXTtcblxuICAgICAgICB2YXIgZmlyc3RGaWVsZHMgPSBmaXJzdCA/IGZpcnN0LnNwbGl0KFwiOlwiKS5tYXAoX3N0cmlwTGVhZGluZ1plcm9zKSA6IFtdO1xuICAgICAgICB2YXIgbGFzdEZpZWxkcyA9IGxhc3Quc3BsaXQoXCI6XCIpLm1hcChfc3RyaXBMZWFkaW5nWmVyb3MpO1xuICAgICAgICB2YXIgaXNMYXN0RmllbGRJUHY0QWRkcmVzcyA9IHByb3RvY29sLklQVjRBRERSRVNTLnRlc3QobGFzdEZpZWxkc1tsYXN0RmllbGRzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgdmFyIGZpZWxkQ291bnQgPSBpc0xhc3RGaWVsZElQdjRBZGRyZXNzID8gNyA6IDg7XG4gICAgICAgIHZhciBsYXN0RmllbGRzU3RhcnQgPSBsYXN0RmllbGRzLmxlbmd0aCAtIGZpZWxkQ291bnQ7XG4gICAgICAgIHZhciBmaWVsZHMgPSBBcnJheShmaWVsZENvdW50KTtcbiAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBmaWVsZENvdW50OyArK3gpIHtcbiAgICAgICAgICAgIGZpZWxkc1t4XSA9IGZpcnN0RmllbGRzW3hdIHx8IGxhc3RGaWVsZHNbbGFzdEZpZWxkc1N0YXJ0ICsgeF0gfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTGFzdEZpZWxkSVB2NEFkZHJlc3MpIHtcbiAgICAgICAgICAgIGZpZWxkc1tmaWVsZENvdW50IC0gMV0gPSBfbm9ybWFsaXplSVB2NChmaWVsZHNbZmllbGRDb3VudCAtIDFdLCBwcm90b2NvbCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFsbFplcm9GaWVsZHMgPSBmaWVsZHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKCFmaWVsZCB8fCBmaWVsZCA9PT0gXCIwXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdExvbmdlc3QgPSBhY2NbYWNjLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0TG9uZ2VzdCAmJiBsYXN0TG9uZ2VzdC5pbmRleCArIGxhc3RMb25nZXN0Lmxlbmd0aCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdExvbmdlc3QubGVuZ3RoKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2goeyBpbmRleDogaW5kZXgsIGxlbmd0aDogMSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIHZhciBsb25nZXN0WmVyb0ZpZWxkcyA9IGFsbFplcm9GaWVsZHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgICAgIH0pWzBdO1xuICAgICAgICB2YXIgbmV3SG9zdCA9IHZvaWQgMDtcbiAgICAgICAgaWYgKGxvbmdlc3RaZXJvRmllbGRzICYmIGxvbmdlc3RaZXJvRmllbGRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBuZXdGaXJzdCA9IGZpZWxkcy5zbGljZSgwLCBsb25nZXN0WmVyb0ZpZWxkcy5pbmRleCk7XG4gICAgICAgICAgICB2YXIgbmV3TGFzdCA9IGZpZWxkcy5zbGljZShsb25nZXN0WmVyb0ZpZWxkcy5pbmRleCArIGxvbmdlc3RaZXJvRmllbGRzLmxlbmd0aCk7XG4gICAgICAgICAgICBuZXdIb3N0ID0gbmV3Rmlyc3Quam9pbihcIjpcIikgKyBcIjo6XCIgKyBuZXdMYXN0LmpvaW4oXCI6XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SG9zdCA9IGZpZWxkcy5qb2luKFwiOlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoem9uZSkge1xuICAgICAgICAgICAgbmV3SG9zdCArPSBcIiVcIiArIHpvbmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0hvc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxufVxudmFyIFVSSV9QQVJTRSA9IC9eKD86KFteOlxcLz8jXSspOik/KD86XFwvXFwvKCg/OihbXlxcLz8jQF0qKUApPyhcXFtbXlxcLz8jXFxdXStcXF18W15cXC8/IzpdKikoPzpcXDooXFxkKikpPykpPyhbXj8jXSopKD86XFw/KFteI10qKSk/KD86IygoPzoufFxcbnxcXHIpKikpPy9pO1xudmFyIE5PX01BVENIX0lTX1VOREVGSU5FRCA9IFwiXCIubWF0Y2goLygpezB9LylbMV0gPT09IHVuZGVmaW5lZDtcbmZ1bmN0aW9uIHBhcnNlKHVyaVN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIHZhciBjb21wb25lbnRzID0ge307XG4gICAgdmFyIHByb3RvY29sID0gb3B0aW9ucy5pcmkgIT09IGZhbHNlID8gSVJJX1BST1RPQ09MIDogVVJJX1BST1RPQ09MO1xuICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZSA9PT0gXCJzdWZmaXhcIikgdXJpU3RyaW5nID0gKG9wdGlvbnMuc2NoZW1lID8gb3B0aW9ucy5zY2hlbWUgKyBcIjpcIiA6IFwiXCIpICsgXCIvL1wiICsgdXJpU3RyaW5nO1xuICAgIHZhciBtYXRjaGVzID0gdXJpU3RyaW5nLm1hdGNoKFVSSV9QQVJTRSk7XG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgaWYgKE5PX01BVENIX0lTX1VOREVGSU5FRCkge1xuICAgICAgICAgICAgLy9zdG9yZSBlYWNoIGNvbXBvbmVudFxuICAgICAgICAgICAgY29tcG9uZW50cy5zY2hlbWUgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29tcG9uZW50cy51c2VyaW5mbyA9IG1hdGNoZXNbM107XG4gICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSBtYXRjaGVzWzRdO1xuICAgICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gcGFyc2VJbnQobWF0Y2hlc1s1XSwgMTApO1xuICAgICAgICAgICAgY29tcG9uZW50cy5wYXRoID0gbWF0Y2hlc1s2XSB8fCBcIlwiO1xuICAgICAgICAgICAgY29tcG9uZW50cy5xdWVyeSA9IG1hdGNoZXNbN107XG4gICAgICAgICAgICBjb21wb25lbnRzLmZyYWdtZW50ID0gbWF0Y2hlc1s4XTtcbiAgICAgICAgICAgIC8vZml4IHBvcnQgbnVtYmVyXG4gICAgICAgICAgICBpZiAoaXNOYU4oY29tcG9uZW50cy5wb3J0KSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IG1hdGNoZXNbNV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0lFIEZJWCBmb3IgaW1wcm9wZXIgUmVnRXhwIG1hdGNoaW5nXG4gICAgICAgICAgICAvL3N0b3JlIGVhY2ggY29tcG9uZW50XG4gICAgICAgICAgICBjb21wb25lbnRzLnNjaGVtZSA9IG1hdGNoZXNbMV0gfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29tcG9uZW50cy51c2VyaW5mbyA9IHVyaVN0cmluZy5pbmRleE9mKFwiQFwiKSAhPT0gLTEgPyBtYXRjaGVzWzNdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29tcG9uZW50cy5ob3N0ID0gdXJpU3RyaW5nLmluZGV4T2YoXCIvL1wiKSAhPT0gLTEgPyBtYXRjaGVzWzRdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gcGFyc2VJbnQobWF0Y2hlc1s1XSwgMTApO1xuICAgICAgICAgICAgY29tcG9uZW50cy5wYXRoID0gbWF0Y2hlc1s2XSB8fCBcIlwiO1xuICAgICAgICAgICAgY29tcG9uZW50cy5xdWVyeSA9IHVyaVN0cmluZy5pbmRleE9mKFwiP1wiKSAhPT0gLTEgPyBtYXRjaGVzWzddIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29tcG9uZW50cy5mcmFnbWVudCA9IHVyaVN0cmluZy5pbmRleE9mKFwiI1wiKSAhPT0gLTEgPyBtYXRjaGVzWzhdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgLy9maXggcG9ydCBudW1iZXJcbiAgICAgICAgICAgIGlmIChpc05hTihjb21wb25lbnRzLnBvcnQpKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gdXJpU3RyaW5nLm1hdGNoKC9cXC9cXC8oPzoufFxcbikqXFw6KD86XFwvfFxcP3xcXCN8JCkvKSA/IG1hdGNoZXNbNF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBvbmVudHMuaG9zdCkge1xuICAgICAgICAgICAgLy9ub3JtYWxpemUgSVAgaG9zdHNcbiAgICAgICAgICAgIGNvbXBvbmVudHMuaG9zdCA9IF9ub3JtYWxpemVJUHY2KF9ub3JtYWxpemVJUHY0KGNvbXBvbmVudHMuaG9zdCwgcHJvdG9jb2wpLCBwcm90b2NvbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9kZXRlcm1pbmUgcmVmZXJlbmNlIHR5cGVcbiAgICAgICAgaWYgKGNvbXBvbmVudHMuc2NoZW1lID09PSB1bmRlZmluZWQgJiYgY29tcG9uZW50cy51c2VyaW5mbyA9PT0gdW5kZWZpbmVkICYmIGNvbXBvbmVudHMuaG9zdCA9PT0gdW5kZWZpbmVkICYmIGNvbXBvbmVudHMucG9ydCA9PT0gdW5kZWZpbmVkICYmICFjb21wb25lbnRzLnBhdGggJiYgY29tcG9uZW50cy5xdWVyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnJlZmVyZW5jZSA9IFwic2FtZS1kb2N1bWVudFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudHMuc2NoZW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucmVmZXJlbmNlID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudHMuZnJhZ21lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5yZWZlcmVuY2UgPSBcImFic29sdXRlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnJlZmVyZW5jZSA9IFwidXJpXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9jaGVjayBmb3IgcmVmZXJlbmNlIGVycm9yc1xuICAgICAgICBpZiAob3B0aW9ucy5yZWZlcmVuY2UgJiYgb3B0aW9ucy5yZWZlcmVuY2UgIT09IFwic3VmZml4XCIgJiYgb3B0aW9ucy5yZWZlcmVuY2UgIT09IGNvbXBvbmVudHMucmVmZXJlbmNlKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIlVSSSBpcyBub3QgYSBcIiArIG9wdGlvbnMucmVmZXJlbmNlICsgXCIgcmVmZXJlbmNlLlwiO1xuICAgICAgICB9XG4gICAgICAgIC8vZmluZCBzY2hlbWUgaGFuZGxlclxuICAgICAgICB2YXIgc2NoZW1lSGFuZGxlciA9IFNDSEVNRVNbKG9wdGlvbnMuc2NoZW1lIHx8IGNvbXBvbmVudHMuc2NoZW1lIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAvL2NoZWNrIGlmIHNjaGVtZSBjYW4ndCBoYW5kbGUgSVJJc1xuICAgICAgICBpZiAoIW9wdGlvbnMudW5pY29kZVN1cHBvcnQgJiYgKCFzY2hlbWVIYW5kbGVyIHx8ICFzY2hlbWVIYW5kbGVyLnVuaWNvZGVTdXBwb3J0KSkge1xuICAgICAgICAgICAgLy9pZiBob3N0IGNvbXBvbmVudCBpcyBhIGRvbWFpbiBuYW1lXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50cy5ob3N0ICYmIChvcHRpb25zLmRvbWFpbkhvc3QgfHwgc2NoZW1lSGFuZGxlciAmJiBzY2hlbWVIYW5kbGVyLmRvbWFpbkhvc3QpKSB7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IFVuaWNvZGUgSUROIC0+IEFTQ0lJIElETlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuaG9zdCA9IHB1bnljb2RlLnRvQVNDSUkoY29tcG9uZW50cy5ob3N0LnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHBjdERlY0NoYXJzKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiSG9zdCdzIGRvbWFpbiBuYW1lIGNhbiBub3QgYmUgY29udmVydGVkIHRvIEFTQ0lJIHZpYSBwdW55Y29kZTogXCIgKyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29udmVydCBJUkkgLT4gVVJJXG4gICAgICAgICAgICBfbm9ybWFsaXplQ29tcG9uZW50RW5jb2RpbmcoY29tcG9uZW50cywgVVJJX1BST1RPQ09MKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vbm9ybWFsaXplIGVuY29kaW5nc1xuICAgICAgICAgICAgX25vcm1hbGl6ZUNvbXBvbmVudEVuY29kaW5nKGNvbXBvbmVudHMsIHByb3RvY29sKTtcbiAgICAgICAgfVxuICAgICAgICAvL3BlcmZvcm0gc2NoZW1lIHNwZWNpZmljIHBhcnNpbmdcbiAgICAgICAgaWYgKHNjaGVtZUhhbmRsZXIgJiYgc2NoZW1lSGFuZGxlci5wYXJzZSkge1xuICAgICAgICAgICAgc2NoZW1lSGFuZGxlci5wYXJzZShjb21wb25lbnRzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiVVJJIGNhbiBub3QgYmUgcGFyc2VkLlwiO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50cztcbn1cblxuZnVuY3Rpb24gX3JlY29tcG9zZUF1dGhvcml0eShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgdmFyIHByb3RvY29sID0gb3B0aW9ucy5pcmkgIT09IGZhbHNlID8gSVJJX1BST1RPQ09MIDogVVJJX1BST1RPQ09MO1xuICAgIHZhciB1cmlUb2tlbnMgPSBbXTtcbiAgICBpZiAoY29tcG9uZW50cy51c2VyaW5mbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKGNvbXBvbmVudHMudXNlcmluZm8pO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIkBcIik7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLmhvc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvL25vcm1hbGl6ZSBJUCBob3N0cywgYWRkIGJyYWNrZXRzIGFuZCBlc2NhcGUgem9uZSBzZXBhcmF0b3IgZm9yIElQdjZcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goX25vcm1hbGl6ZUlQdjYoX25vcm1hbGl6ZUlQdjQoU3RyaW5nKGNvbXBvbmVudHMuaG9zdCksIHByb3RvY29sKSwgcHJvdG9jb2wpLnJlcGxhY2UocHJvdG9jb2wuSVBWNkFERFJFU1MsIGZ1bmN0aW9uIChfLCAkMSwgJDIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIltcIiArICQxICsgKCQyID8gXCIlMjVcIiArICQyIDogXCJcIikgKyBcIl1cIjtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMucG9ydCA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgY29tcG9uZW50cy5wb3J0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFwiOlwiKTtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goU3RyaW5nKGNvbXBvbmVudHMucG9ydCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXJpVG9rZW5zLmxlbmd0aCA/IHVyaVRva2Vucy5qb2luKFwiXCIpIDogdW5kZWZpbmVkO1xufVxuXG52YXIgUkRTMSA9IC9eXFwuXFwuP1xcLy87XG52YXIgUkRTMiA9IC9eXFwvXFwuKFxcL3wkKS87XG52YXIgUkRTMyA9IC9eXFwvXFwuXFwuKFxcL3wkKS87XG52YXIgUkRTNSA9IC9eXFwvPyg/Oi58XFxuKSo/KD89XFwvfCQpLztcbmZ1bmN0aW9uIHJlbW92ZURvdFNlZ21lbnRzKGlucHV0KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdO1xuICAgIHdoaWxlIChpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKFJEUzEpKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoUkRTMSwgXCJcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQubWF0Y2goUkRTMikpIHtcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZShSRFMyLCBcIi9cIik7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQubWF0Y2goUkRTMykpIHtcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZShSRFMzLCBcIi9cIik7XG4gICAgICAgICAgICBvdXRwdXQucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQgPT09IFwiLlwiIHx8IGlucHV0ID09PSBcIi4uXCIpIHtcbiAgICAgICAgICAgIGlucHV0ID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpbSA9IGlucHV0Lm1hdGNoKFJEUzUpO1xuICAgICAgICAgICAgaWYgKGltKSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBpbVswXTtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnNsaWNlKHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBkb3Qgc2VnbWVudCBjb25kaXRpb25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dC5qb2luKFwiXCIpO1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemUoY29tcG9uZW50cykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIHZhciBwcm90b2NvbCA9IG9wdGlvbnMuaXJpID8gSVJJX1BST1RPQ09MIDogVVJJX1BST1RPQ09MO1xuICAgIHZhciB1cmlUb2tlbnMgPSBbXTtcbiAgICAvL2ZpbmQgc2NoZW1lIGhhbmRsZXJcbiAgICB2YXIgc2NoZW1lSGFuZGxlciA9IFNDSEVNRVNbKG9wdGlvbnMuc2NoZW1lIHx8IGNvbXBvbmVudHMuc2NoZW1lIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCldO1xuICAgIC8vcGVyZm9ybSBzY2hlbWUgc3BlY2lmaWMgc2VyaWFsaXphdGlvblxuICAgIGlmIChzY2hlbWVIYW5kbGVyICYmIHNjaGVtZUhhbmRsZXIuc2VyaWFsaXplKSBzY2hlbWVIYW5kbGVyLnNlcmlhbGl6ZShjb21wb25lbnRzLCBvcHRpb25zKTtcbiAgICBpZiAoY29tcG9uZW50cy5ob3N0KSB7XG4gICAgICAgIC8vaWYgaG9zdCBjb21wb25lbnQgaXMgYW4gSVB2NiBhZGRyZXNzXG4gICAgICAgIGlmIChwcm90b2NvbC5JUFY2QUREUkVTUy50ZXN0KGNvbXBvbmVudHMuaG9zdCkpIHt9XG4gICAgICAgIC8vVE9ETzogbm9ybWFsaXplIElQdjYgYWRkcmVzcyBhcyBwZXIgUkZDIDU5NTJcblxuICAgICAgICAvL2lmIGhvc3QgY29tcG9uZW50IGlzIGEgZG9tYWluIG5hbWVcbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5kb21haW5Ib3N0IHx8IHNjaGVtZUhhbmRsZXIgJiYgc2NoZW1lSGFuZGxlci5kb21haW5Ib3N0KSB7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IElETiB2aWEgcHVueWNvZGVcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSAhb3B0aW9ucy5pcmkgPyBwdW55Y29kZS50b0FTQ0lJKGNvbXBvbmVudHMuaG9zdC5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBwY3REZWNDaGFycykudG9Mb3dlckNhc2UoKSkgOiBwdW55Y29kZS50b1VuaWNvZGUoY29tcG9uZW50cy5ob3N0KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiSG9zdCdzIGRvbWFpbiBuYW1lIGNhbiBub3QgYmUgY29udmVydGVkIHRvIFwiICsgKCFvcHRpb25zLmlyaSA/IFwiQVNDSUlcIiA6IFwiVW5pY29kZVwiKSArIFwiIHZpYSBwdW55Y29kZTogXCIgKyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgLy9ub3JtYWxpemUgZW5jb2RpbmdcbiAgICBfbm9ybWFsaXplQ29tcG9uZW50RW5jb2RpbmcoY29tcG9uZW50cywgcHJvdG9jb2wpO1xuICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZSAhPT0gXCJzdWZmaXhcIiAmJiBjb21wb25lbnRzLnNjaGVtZSkge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChjb21wb25lbnRzLnNjaGVtZSk7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFwiOlwiKTtcbiAgICB9XG4gICAgdmFyIGF1dGhvcml0eSA9IF9yZWNvbXBvc2VBdXRob3JpdHkoY29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgaWYgKGF1dGhvcml0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZSAhPT0gXCJzdWZmaXhcIikge1xuICAgICAgICAgICAgdXJpVG9rZW5zLnB1c2goXCIvL1wiKTtcbiAgICAgICAgfVxuICAgICAgICB1cmlUb2tlbnMucHVzaChhdXRob3JpdHkpO1xuICAgICAgICBpZiAoY29tcG9uZW50cy5wYXRoICYmIGNvbXBvbmVudHMucGF0aC5jaGFyQXQoMCkgIT09IFwiL1wiKSB7XG4gICAgICAgICAgICB1cmlUb2tlbnMucHVzaChcIi9cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudHMucGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBzID0gY29tcG9uZW50cy5wYXRoO1xuICAgICAgICBpZiAoIW9wdGlvbnMuYWJzb2x1dGVQYXRoICYmICghc2NoZW1lSGFuZGxlciB8fCAhc2NoZW1lSGFuZGxlci5hYnNvbHV0ZVBhdGgpKSB7XG4gICAgICAgICAgICBzID0gcmVtb3ZlRG90U2VnbWVudHMocyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF1dGhvcml0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzID0gcy5yZXBsYWNlKC9eXFwvXFwvLywgXCIvJTJGXCIpOyAvL2Rvbid0IGFsbG93IHRoZSBwYXRoIHRvIHN0YXJ0IHdpdGggXCIvL1wiXG4gICAgICAgIH1cbiAgICAgICAgdXJpVG9rZW5zLnB1c2gocyk7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLnF1ZXJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goXCI/XCIpO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChjb21wb25lbnRzLnF1ZXJ5KTtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudHMuZnJhZ21lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIiNcIik7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKGNvbXBvbmVudHMuZnJhZ21lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdXJpVG9rZW5zLmpvaW4oXCJcIik7IC8vbWVyZ2UgdG9rZW5zIGludG8gYSBzdHJpbmdcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbXBvbmVudHMoYmFzZSwgcmVsYXRpdmUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgdmFyIHNraXBOb3JtYWxpemF0aW9uID0gYXJndW1lbnRzWzNdO1xuXG4gICAgdmFyIHRhcmdldCA9IHt9O1xuICAgIGlmICghc2tpcE5vcm1hbGl6YXRpb24pIHtcbiAgICAgICAgYmFzZSA9IHBhcnNlKHNlcmlhbGl6ZShiYXNlLCBvcHRpb25zKSwgb3B0aW9ucyk7IC8vbm9ybWFsaXplIGJhc2UgY29tcG9uZW50c1xuICAgICAgICByZWxhdGl2ZSA9IHBhcnNlKHNlcmlhbGl6ZShyZWxhdGl2ZSwgb3B0aW9ucyksIG9wdGlvbnMpOyAvL25vcm1hbGl6ZSByZWxhdGl2ZSBjb21wb25lbnRzXG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICghb3B0aW9ucy50b2xlcmFudCAmJiByZWxhdGl2ZS5zY2hlbWUpIHtcbiAgICAgICAgdGFyZ2V0LnNjaGVtZSA9IHJlbGF0aXZlLnNjaGVtZTtcbiAgICAgICAgLy90YXJnZXQuYXV0aG9yaXR5ID0gcmVsYXRpdmUuYXV0aG9yaXR5O1xuICAgICAgICB0YXJnZXQudXNlcmluZm8gPSByZWxhdGl2ZS51c2VyaW5mbztcbiAgICAgICAgdGFyZ2V0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICB0YXJnZXQucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgICAgIHRhcmdldC5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocmVsYXRpdmUucGF0aCB8fCBcIlwiKTtcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlbGF0aXZlLnVzZXJpbmZvICE9PSB1bmRlZmluZWQgfHwgcmVsYXRpdmUuaG9zdCAhPT0gdW5kZWZpbmVkIHx8IHJlbGF0aXZlLnBvcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy90YXJnZXQuYXV0aG9yaXR5ID0gcmVsYXRpdmUuYXV0aG9yaXR5O1xuICAgICAgICAgICAgdGFyZ2V0LnVzZXJpbmZvID0gcmVsYXRpdmUudXNlcmluZm87XG4gICAgICAgICAgICB0YXJnZXQuaG9zdCA9IHJlbGF0aXZlLmhvc3Q7XG4gICAgICAgICAgICB0YXJnZXQucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgICAgICAgICB0YXJnZXQucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlbGF0aXZlLnBhdGggfHwgXCJcIik7XG4gICAgICAgICAgICB0YXJnZXQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghcmVsYXRpdmUucGF0aCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gYmFzZS5wYXRoO1xuICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZS5xdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUucGF0aC5jaGFyQXQoMCkgPT09IFwiL1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocmVsYXRpdmUucGF0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChiYXNlLnVzZXJpbmZvICE9PSB1bmRlZmluZWQgfHwgYmFzZS5ob3N0ICE9PSB1bmRlZmluZWQgfHwgYmFzZS5wb3J0ICE9PSB1bmRlZmluZWQpICYmICFiYXNlLnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gXCIvXCIgKyByZWxhdGl2ZS5wYXRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFiYXNlLnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gcmVsYXRpdmUucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKDAsIGJhc2UucGF0aC5sYXN0SW5kZXhPZihcIi9cIikgKyAxKSArIHJlbGF0aXZlLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyh0YXJnZXQucGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhcmdldC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90YXJnZXQuYXV0aG9yaXR5ID0gYmFzZS5hdXRob3JpdHk7XG4gICAgICAgICAgICB0YXJnZXQudXNlcmluZm8gPSBiYXNlLnVzZXJpbmZvO1xuICAgICAgICAgICAgdGFyZ2V0Lmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICB0YXJnZXQucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuc2NoZW1lID0gYmFzZS5zY2hlbWU7XG4gICAgfVxuICAgIHRhcmdldC5mcmFnbWVudCA9IHJlbGF0aXZlLmZyYWdtZW50O1xuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUoYmFzZVVSSSwgcmVsYXRpdmVVUkksIG9wdGlvbnMpIHtcbiAgICB2YXIgc2NoZW1lbGVzc09wdGlvbnMgPSBhc3NpZ24oeyBzY2hlbWU6ICdudWxsJyB9LCBvcHRpb25zKTtcbiAgICByZXR1cm4gc2VyaWFsaXplKHJlc29sdmVDb21wb25lbnRzKHBhcnNlKGJhc2VVUkksIHNjaGVtZWxlc3NPcHRpb25zKSwgcGFyc2UocmVsYXRpdmVVUkksIHNjaGVtZWxlc3NPcHRpb25zKSwgc2NoZW1lbGVzc09wdGlvbnMsIHRydWUpLCBzY2hlbWVsZXNzT3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSh1cmksIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB1cmkgPSBzZXJpYWxpemUocGFyc2UodXJpLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0eXBlT2YodXJpKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB1cmkgPSBwYXJzZShzZXJpYWxpemUodXJpLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB1cmk7XG59XG5cbmZ1bmN0aW9uIGVxdWFsKHVyaUEsIHVyaUIsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHVyaUEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdXJpQSA9IHNlcmlhbGl6ZShwYXJzZSh1cmlBLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0eXBlT2YodXJpQSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdXJpQSA9IHNlcmlhbGl6ZSh1cmlBLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB1cmlCID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHVyaUIgPSBzZXJpYWxpemUocGFyc2UodXJpQiwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHlwZU9mKHVyaUIpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHVyaUIgPSBzZXJpYWxpemUodXJpQiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB1cmlBID09PSB1cmlCO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVDb21wb25lbnQoc3RyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHN0ciAmJiBzdHIudG9TdHJpbmcoKS5yZXBsYWNlKCFvcHRpb25zIHx8ICFvcHRpb25zLmlyaSA/IFVSSV9QUk9UT0NPTC5FU0NBUEUgOiBJUklfUFJPVE9DT0wuRVNDQVBFLCBwY3RFbmNDaGFyKTtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGVDb21wb25lbnQoc3RyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHN0ciAmJiBzdHIudG9TdHJpbmcoKS5yZXBsYWNlKCFvcHRpb25zIHx8ICFvcHRpb25zLmlyaSA/IFVSSV9QUk9UT0NPTC5QQ1RfRU5DT0RFRCA6IElSSV9QUk9UT0NPTC5QQ1RfRU5DT0RFRCwgcGN0RGVjQ2hhcnMpO1xufVxuXG52YXIgaGFuZGxlciA9IHtcbiAgICBzY2hlbWU6IFwiaHR0cFwiLFxuICAgIGRvbWFpbkhvc3Q6IHRydWUsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgLy9yZXBvcnQgbWlzc2luZyBob3N0XG4gICAgICAgIGlmICghY29tcG9uZW50cy5ob3N0KSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIkhUVFAgVVJJcyBtdXN0IGhhdmUgYSBob3N0LlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgIH0sXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgc2VjdXJlID0gU3RyaW5nKGNvbXBvbmVudHMuc2NoZW1lKS50b0xvd2VyQ2FzZSgpID09PSBcImh0dHBzXCI7XG4gICAgICAgIC8vbm9ybWFsaXplIHRoZSBkZWZhdWx0IHBvcnRcbiAgICAgICAgaWYgKGNvbXBvbmVudHMucG9ydCA9PT0gKHNlY3VyZSA/IDQ0MyA6IDgwKSB8fCBjb21wb25lbnRzLnBvcnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL25vcm1hbGl6ZSB0aGUgZW1wdHkgcGF0aFxuICAgICAgICBpZiAoIWNvbXBvbmVudHMucGF0aCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5wYXRoID0gXCIvXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9OT1RFOiBXZSBkbyBub3QgcGFyc2UgcXVlcnkgc3RyaW5ncyBmb3IgSFRUUCBVUklzXG4gICAgICAgIC8vYXMgV1dXIEZvcm0gVXJsIEVuY29kZWQgcXVlcnkgc3RyaW5ncyBhcmUgcGFydCBvZiB0aGUgSFRNTDQrIHNwZWMsXG4gICAgICAgIC8vYW5kIG5vdCB0aGUgSFRUUCBzcGVjLlxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICB9XG59O1xuXG52YXIgaGFuZGxlciQxID0ge1xuICAgIHNjaGVtZTogXCJodHRwc1wiLFxuICAgIGRvbWFpbkhvc3Q6IGhhbmRsZXIuZG9tYWluSG9zdCxcbiAgICBwYXJzZTogaGFuZGxlci5wYXJzZSxcbiAgICBzZXJpYWxpemU6IGhhbmRsZXIuc2VyaWFsaXplXG59O1xuXG5mdW5jdGlvbiBpc1NlY3VyZSh3c0NvbXBvbmVudHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdzQ29tcG9uZW50cy5zZWN1cmUgPT09ICdib29sZWFuJyA/IHdzQ29tcG9uZW50cy5zZWN1cmUgOiBTdHJpbmcod3NDb21wb25lbnRzLnNjaGVtZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJ3c3NcIjtcbn1cbi8vUkZDIDY0NTVcbnZhciBoYW5kbGVyJDIgPSB7XG4gICAgc2NoZW1lOiBcIndzXCIsXG4gICAgZG9tYWluSG9zdDogdHJ1ZSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgd3NDb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgLy9pbmRpY2F0ZSBpZiB0aGUgc2VjdXJlIGZsYWcgaXMgc2V0XG4gICAgICAgIHdzQ29tcG9uZW50cy5zZWN1cmUgPSBpc1NlY3VyZSh3c0NvbXBvbmVudHMpO1xuICAgICAgICAvL2NvbnN0cnVjdCByZXNvdWNlIG5hbWVcbiAgICAgICAgd3NDb21wb25lbnRzLnJlc291cmNlTmFtZSA9ICh3c0NvbXBvbmVudHMucGF0aCB8fCAnLycpICsgKHdzQ29tcG9uZW50cy5xdWVyeSA/ICc/JyArIHdzQ29tcG9uZW50cy5xdWVyeSA6ICcnKTtcbiAgICAgICAgd3NDb21wb25lbnRzLnBhdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIHdzQ29tcG9uZW50cy5xdWVyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHdzQ29tcG9uZW50cztcbiAgICB9LFxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKHdzQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICAvL25vcm1hbGl6ZSB0aGUgZGVmYXVsdCBwb3J0XG4gICAgICAgIGlmICh3c0NvbXBvbmVudHMucG9ydCA9PT0gKGlzU2VjdXJlKHdzQ29tcG9uZW50cykgPyA0NDMgOiA4MCkgfHwgd3NDb21wb25lbnRzLnBvcnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5wb3J0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vZW5zdXJlIHNjaGVtZSBtYXRjaGVzIHNlY3VyZSBmbGFnXG4gICAgICAgIGlmICh0eXBlb2Ygd3NDb21wb25lbnRzLnNlY3VyZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMuc2NoZW1lID0gd3NDb21wb25lbnRzLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5zZWN1cmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZWNvbnN0cnVjdCBwYXRoIGZyb20gcmVzb3VyY2UgbmFtZVxuICAgICAgICBpZiAod3NDb21wb25lbnRzLnJlc291cmNlTmFtZSkge1xuICAgICAgICAgICAgdmFyIF93c0NvbXBvbmVudHMkcmVzb3VyYyA9IHdzQ29tcG9uZW50cy5yZXNvdXJjZU5hbWUuc3BsaXQoJz8nKSxcbiAgICAgICAgICAgICAgICBfd3NDb21wb25lbnRzJHJlc291cmMyID0gc2xpY2VkVG9BcnJheShfd3NDb21wb25lbnRzJHJlc291cmMsIDIpLFxuICAgICAgICAgICAgICAgIHBhdGggPSBfd3NDb21wb25lbnRzJHJlc291cmMyWzBdLFxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gX3dzQ29tcG9uZW50cyRyZXNvdXJjMlsxXTtcblxuICAgICAgICAgICAgd3NDb21wb25lbnRzLnBhdGggPSBwYXRoICYmIHBhdGggIT09ICcvJyA/IHBhdGggOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5yZXNvdXJjZU5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9mb3JiaWQgZnJhZ21lbnQgY29tcG9uZW50XG4gICAgICAgIHdzQ29tcG9uZW50cy5mcmFnbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHdzQ29tcG9uZW50cztcbiAgICB9XG59O1xuXG52YXIgaGFuZGxlciQzID0ge1xuICAgIHNjaGVtZTogXCJ3c3NcIixcbiAgICBkb21haW5Ib3N0OiBoYW5kbGVyJDIuZG9tYWluSG9zdCxcbiAgICBwYXJzZTogaGFuZGxlciQyLnBhcnNlLFxuICAgIHNlcmlhbGl6ZTogaGFuZGxlciQyLnNlcmlhbGl6ZVxufTtcblxudmFyIE8gPSB7fTtcbnZhciBpc0lSSSA9IHRydWU7XG4vL1JGQyAzOTg2XG52YXIgVU5SRVNFUlZFRCQkID0gXCJbQS1aYS16MC05XFxcXC1cXFxcLlxcXFxfXFxcXH5cIiArIChpc0lSSSA/IFwiXFxcXHhBMC1cXFxcdTIwMERcXFxcdTIwMTAtXFxcXHUyMDI5XFxcXHUyMDJGLVxcXFx1RDdGRlxcXFx1RjkwMC1cXFxcdUZEQ0ZcXFxcdUZERjAtXFxcXHVGRkVGXCIgOiBcIlwiKSArIFwiXVwiO1xudmFyIEhFWERJRyQkID0gXCJbMC05QS1GYS1mXVwiOyAvL2Nhc2UtaW5zZW5zaXRpdmVcbnZhciBQQ1RfRU5DT0RFRCQgPSBzdWJleHAoc3ViZXhwKFwiJVtFRmVmXVwiICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIlWzg5QS1GYS1mXVwiICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSk7IC8vZXhwYW5kZWRcbi8vUkZDIDUzMjIsIGV4Y2VwdCB0aGVzZSBzeW1ib2xzIGFzIHBlciBSRkMgNjA2ODogQCA6IC8gPyAjIFsgXSAmIDsgPVxuLy9jb25zdCBBVEVYVCQkID0gXCJbQS1aYS16MC05XFxcXCFcXFxcI1xcXFwkXFxcXCVcXFxcJlxcXFwnXFxcXCpcXFxcK1xcXFwtXFxcXC9cXFxcPVxcXFw/XFxcXF5cXFxcX1xcXFxgXFxcXHtcXFxcfFxcXFx9XFxcXH5dXCI7XG4vL2NvbnN0IFdTUCQkID0gXCJbXFxcXHgyMFxcXFx4MDldXCI7XG4vL2NvbnN0IE9CU19RVEVYVCQkID0gXCJbXFxcXHgwMS1cXFxceDA4XFxcXHgwQlxcXFx4MENcXFxceDBFLVxcXFx4MUZcXFxceDdGXVwiOyAgLy8oJWQxLTggLyAlZDExLTEyIC8gJWQxNC0zMSAvICVkMTI3KVxuLy9jb25zdCBRVEVYVCQkID0gbWVyZ2UoXCJbXFxcXHgyMVxcXFx4MjMtXFxcXHg1QlxcXFx4NUQtXFxcXHg3RV1cIiwgT0JTX1FURVhUJCQpOyAgLy8lZDMzIC8gJWQzNS05MSAvICVkOTMtMTI2IC8gb2JzLXF0ZXh0XG4vL2NvbnN0IFZDSEFSJCQgPSBcIltcXFxceDIxLVxcXFx4N0VdXCI7XG4vL2NvbnN0IFdTUCQkID0gXCJbXFxcXHgyMFxcXFx4MDldXCI7XG4vL2NvbnN0IE9CU19RUCQgPSBzdWJleHAoXCJcXFxcXFxcXFwiICsgbWVyZ2UoXCJbXFxcXHgwMFxcXFx4MERcXFxceDBBXVwiLCBPQlNfUVRFWFQkJCkpOyAgLy8lZDAgLyBDUiAvIExGIC8gb2JzLXF0ZXh0XG4vL2NvbnN0IEZXUyQgPSBzdWJleHAoc3ViZXhwKFdTUCQkICsgXCIqXCIgKyBcIlxcXFx4MERcXFxceDBBXCIpICsgXCI/XCIgKyBXU1AkJCArIFwiK1wiKTtcbi8vY29uc3QgUVVPVEVEX1BBSVIkID0gc3ViZXhwKHN1YmV4cChcIlxcXFxcXFxcXCIgKyBzdWJleHAoVkNIQVIkJCArIFwifFwiICsgV1NQJCQpKSArIFwifFwiICsgT0JTX1FQJCk7XG4vL2NvbnN0IFFVT1RFRF9TVFJJTkckID0gc3ViZXhwKCdcXFxcXCInICsgc3ViZXhwKEZXUyQgKyBcIj9cIiArIFFDT05URU5UJCkgKyBcIipcIiArIEZXUyQgKyBcIj9cIiArICdcXFxcXCInKTtcbnZhciBBVEVYVCQkID0gXCJbQS1aYS16MC05XFxcXCFcXFxcJFxcXFwlXFxcXCdcXFxcKlxcXFwrXFxcXC1cXFxcXlxcXFxfXFxcXGBcXFxce1xcXFx8XFxcXH1cXFxcfl1cIjtcbnZhciBRVEVYVCQkID0gXCJbXFxcXCFcXFxcJFxcXFwlXFxcXCdcXFxcKFxcXFwpXFxcXCpcXFxcK1xcXFwsXFxcXC1cXFxcLjAtOVxcXFw8XFxcXD5BLVpcXFxceDVFLVxcXFx4N0VdXCI7XG52YXIgVkNIQVIkJCA9IG1lcmdlKFFURVhUJCQsIFwiW1xcXFxcXFwiXFxcXFxcXFxdXCIpO1xudmFyIFNPTUVfREVMSU1TJCQgPSBcIltcXFxcIVxcXFwkXFxcXCdcXFxcKFxcXFwpXFxcXCpcXFxcK1xcXFwsXFxcXDtcXFxcOlxcXFxAXVwiO1xudmFyIFVOUkVTRVJWRUQgPSBuZXcgUmVnRXhwKFVOUkVTRVJWRUQkJCwgXCJnXCIpO1xudmFyIFBDVF9FTkNPREVEID0gbmV3IFJlZ0V4cChQQ1RfRU5DT0RFRCQsIFwiZ1wiKTtcbnZhciBOT1RfTE9DQUxfUEFSVCA9IG5ldyBSZWdFeHAobWVyZ2UoXCJbXl1cIiwgQVRFWFQkJCwgXCJbXFxcXC5dXCIsICdbXFxcXFwiXScsIFZDSEFSJCQpLCBcImdcIik7XG52YXIgTk9UX0hGTkFNRSA9IG5ldyBSZWdFeHAobWVyZ2UoXCJbXl1cIiwgVU5SRVNFUlZFRCQkLCBTT01FX0RFTElNUyQkKSwgXCJnXCIpO1xudmFyIE5PVF9IRlZBTFVFID0gTk9UX0hGTkFNRTtcbmZ1bmN0aW9uIGRlY29kZVVucmVzZXJ2ZWQoc3RyKSB7XG4gICAgdmFyIGRlY1N0ciA9IHBjdERlY0NoYXJzKHN0cik7XG4gICAgcmV0dXJuICFkZWNTdHIubWF0Y2goVU5SRVNFUlZFRCkgPyBzdHIgOiBkZWNTdHI7XG59XG52YXIgaGFuZGxlciQ0ID0ge1xuICAgIHNjaGVtZTogXCJtYWlsdG9cIixcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UkJDEoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgbWFpbHRvQ29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgICAgIHZhciB0byA9IG1haWx0b0NvbXBvbmVudHMudG8gPSBtYWlsdG9Db21wb25lbnRzLnBhdGggPyBtYWlsdG9Db21wb25lbnRzLnBhdGguc3BsaXQoXCIsXCIpIDogW107XG4gICAgICAgIG1haWx0b0NvbXBvbmVudHMucGF0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKG1haWx0b0NvbXBvbmVudHMucXVlcnkpIHtcbiAgICAgICAgICAgIHZhciB1bmtub3duSGVhZGVycyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBoZmllbGRzID0gbWFpbHRvQ29tcG9uZW50cy5xdWVyeS5zcGxpdChcIiZcIik7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMCwgeGwgPSBoZmllbGRzLmxlbmd0aDsgeCA8IHhsOyArK3gpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGZpZWxkID0gaGZpZWxkc1t4XS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChoZmllbGRbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9BZGRycyA9IGhmaWVsZFsxXS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfeCA9IDAsIF94bCA9IHRvQWRkcnMubGVuZ3RoOyBfeCA8IF94bDsgKytfeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvLnB1c2godG9BZGRyc1tfeF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdWJqZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWlsdG9Db21wb25lbnRzLnN1YmplY3QgPSB1bmVzY2FwZUNvbXBvbmVudChoZmllbGRbMV0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJib2R5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWlsdG9Db21wb25lbnRzLmJvZHkgPSB1bmVzY2FwZUNvbXBvbmVudChoZmllbGRbMV0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmtub3duSGVhZGVycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW3VuZXNjYXBlQ29tcG9uZW50KGhmaWVsZFswXSwgb3B0aW9ucyldID0gdW5lc2NhcGVDb21wb25lbnQoaGZpZWxkWzFdLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1bmtub3duSGVhZGVycykgbWFpbHRvQ29tcG9uZW50cy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgfVxuICAgICAgICBtYWlsdG9Db21wb25lbnRzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKHZhciBfeDIgPSAwLCBfeGwyID0gdG8ubGVuZ3RoOyBfeDIgPCBfeGwyOyArK194Mikge1xuICAgICAgICAgICAgdmFyIGFkZHIgPSB0b1tfeDJdLnNwbGl0KFwiQFwiKTtcbiAgICAgICAgICAgIGFkZHJbMF0gPSB1bmVzY2FwZUNvbXBvbmVudChhZGRyWzBdKTtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy51bmljb2RlU3VwcG9ydCkge1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBVbmljb2RlIElETiAtPiBBU0NJSSBJRE5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhZGRyWzFdID0gcHVueWNvZGUudG9BU0NJSSh1bmVzY2FwZUNvbXBvbmVudChhZGRyWzFdLCBvcHRpb25zKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haWx0b0NvbXBvbmVudHMuZXJyb3IgPSBtYWlsdG9Db21wb25lbnRzLmVycm9yIHx8IFwiRW1haWwgYWRkcmVzcydzIGRvbWFpbiBuYW1lIGNhbiBub3QgYmUgY29udmVydGVkIHRvIEFTQ0lJIHZpYSBwdW55Y29kZTogXCIgKyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkclsxXSA9IHVuZXNjYXBlQ29tcG9uZW50KGFkZHJbMV0sIG9wdGlvbnMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b1tfeDJdID0gYWRkci5qb2luKFwiQFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFpbHRvQ29tcG9uZW50cztcbiAgICB9LFxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplJCQxKG1haWx0b0NvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBtYWlsdG9Db21wb25lbnRzO1xuICAgICAgICB2YXIgdG8gPSB0b0FycmF5KG1haWx0b0NvbXBvbmVudHMudG8pO1xuICAgICAgICBpZiAodG8pIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwLCB4bCA9IHRvLmxlbmd0aDsgeCA8IHhsOyArK3gpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRyID0gU3RyaW5nKHRvW3hdKTtcbiAgICAgICAgICAgICAgICB2YXIgYXRJZHggPSB0b0FkZHIubGFzdEluZGV4T2YoXCJAXCIpO1xuICAgICAgICAgICAgICAgIHZhciBsb2NhbFBhcnQgPSB0b0FkZHIuc2xpY2UoMCwgYXRJZHgpLnJlcGxhY2UoUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UoUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKS5yZXBsYWNlKE5PVF9MT0NBTF9QQVJULCBwY3RFbmNDaGFyKTtcbiAgICAgICAgICAgICAgICB2YXIgZG9tYWluID0gdG9BZGRyLnNsaWNlKGF0SWR4ICsgMSk7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IElETiB2aWEgcHVueWNvZGVcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBkb21haW4gPSAhb3B0aW9ucy5pcmkgPyBwdW55Y29kZS50b0FTQ0lJKHVuZXNjYXBlQ29tcG9uZW50KGRvbWFpbiwgb3B0aW9ucykudG9Mb3dlckNhc2UoKSkgOiBwdW55Y29kZS50b1VuaWNvZGUoZG9tYWluKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiRW1haWwgYWRkcmVzcydzIGRvbWFpbiBuYW1lIGNhbiBub3QgYmUgY29udmVydGVkIHRvIFwiICsgKCFvcHRpb25zLmlyaSA/IFwiQVNDSUlcIiA6IFwiVW5pY29kZVwiKSArIFwiIHZpYSBwdW55Y29kZTogXCIgKyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b1t4XSA9IGxvY2FsUGFydCArIFwiQFwiICsgZG9tYWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50cy5wYXRoID0gdG8uam9pbihcIixcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhlYWRlcnMgPSBtYWlsdG9Db21wb25lbnRzLmhlYWRlcnMgPSBtYWlsdG9Db21wb25lbnRzLmhlYWRlcnMgfHwge307XG4gICAgICAgIGlmIChtYWlsdG9Db21wb25lbnRzLnN1YmplY3QpIGhlYWRlcnNbXCJzdWJqZWN0XCJdID0gbWFpbHRvQ29tcG9uZW50cy5zdWJqZWN0O1xuICAgICAgICBpZiAobWFpbHRvQ29tcG9uZW50cy5ib2R5KSBoZWFkZXJzW1wiYm9keVwiXSA9IG1haWx0b0NvbXBvbmVudHMuYm9keTtcbiAgICAgICAgdmFyIGZpZWxkcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIGhlYWRlcnMpIHtcbiAgICAgICAgICAgIGlmIChoZWFkZXJzW25hbWVdICE9PSBPW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgZmllbGRzLnB1c2gobmFtZS5yZXBsYWNlKFBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKFBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSkucmVwbGFjZShOT1RfSEZOQU1FLCBwY3RFbmNDaGFyKSArIFwiPVwiICsgaGVhZGVyc1tuYW1lXS5yZXBsYWNlKFBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKFBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSkucmVwbGFjZShOT1RfSEZWQUxVRSwgcGN0RW5jQ2hhcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnF1ZXJ5ID0gZmllbGRzLmpvaW4oXCImXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgIH1cbn07XG5cbnZhciBVUk5fUEFSU0UgPSAvXihbXlxcOl0rKVxcOiguKikvO1xuLy9SRkMgMjE0MVxudmFyIGhhbmRsZXIkNSA9IHtcbiAgICBzY2hlbWU6IFwidXJuXCIsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlJCQxKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBjb21wb25lbnRzLnBhdGggJiYgY29tcG9uZW50cy5wYXRoLm1hdGNoKFVSTl9QQVJTRSk7XG4gICAgICAgIHZhciB1cm5Db21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHZhciBzY2hlbWUgPSBvcHRpb25zLnNjaGVtZSB8fCB1cm5Db21wb25lbnRzLnNjaGVtZSB8fCBcInVyblwiO1xuICAgICAgICAgICAgdmFyIG5pZCA9IG1hdGNoZXNbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBuc3MgPSBtYXRjaGVzWzJdO1xuICAgICAgICAgICAgdmFyIHVyblNjaGVtZSA9IHNjaGVtZSArIFwiOlwiICsgKG9wdGlvbnMubmlkIHx8IG5pZCk7XG4gICAgICAgICAgICB2YXIgc2NoZW1lSGFuZGxlciA9IFNDSEVNRVNbdXJuU2NoZW1lXTtcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMubmlkID0gbmlkO1xuICAgICAgICAgICAgdXJuQ29tcG9uZW50cy5uc3MgPSBuc3M7XG4gICAgICAgICAgICB1cm5Db21wb25lbnRzLnBhdGggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoc2NoZW1lSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHVybkNvbXBvbmVudHMgPSBzY2hlbWVIYW5kbGVyLnBhcnNlKHVybkNvbXBvbmVudHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJuQ29tcG9uZW50cy5lcnJvciA9IHVybkNvbXBvbmVudHMuZXJyb3IgfHwgXCJVUk4gY2FuIG5vdCBiZSBwYXJzZWQuXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybkNvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSQkMSh1cm5Db21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzY2hlbWUgPSBvcHRpb25zLnNjaGVtZSB8fCB1cm5Db21wb25lbnRzLnNjaGVtZSB8fCBcInVyblwiO1xuICAgICAgICB2YXIgbmlkID0gdXJuQ29tcG9uZW50cy5uaWQ7XG4gICAgICAgIHZhciB1cm5TY2hlbWUgPSBzY2hlbWUgKyBcIjpcIiArIChvcHRpb25zLm5pZCB8fCBuaWQpO1xuICAgICAgICB2YXIgc2NoZW1lSGFuZGxlciA9IFNDSEVNRVNbdXJuU2NoZW1lXTtcbiAgICAgICAgaWYgKHNjaGVtZUhhbmRsZXIpIHtcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMgPSBzY2hlbWVIYW5kbGVyLnNlcmlhbGl6ZSh1cm5Db21wb25lbnRzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJpQ29tcG9uZW50cyA9IHVybkNvbXBvbmVudHM7XG4gICAgICAgIHZhciBuc3MgPSB1cm5Db21wb25lbnRzLm5zcztcbiAgICAgICAgdXJpQ29tcG9uZW50cy5wYXRoID0gKG5pZCB8fCBvcHRpb25zLm5pZCkgKyBcIjpcIiArIG5zcztcbiAgICAgICAgcmV0dXJuIHVyaUNvbXBvbmVudHM7XG4gICAgfVxufTtcblxudmFyIFVVSUQgPSAvXlswLTlBLUZhLWZdezh9KD86XFwtWzAtOUEtRmEtZl17NH0pezN9XFwtWzAtOUEtRmEtZl17MTJ9JC87XG4vL1JGQyA0MTIyXG52YXIgaGFuZGxlciQ2ID0ge1xuICAgIHNjaGVtZTogXCJ1cm46dXVpZFwiLFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZSh1cm5Db21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB1dWlkQ29tcG9uZW50cyA9IHVybkNvbXBvbmVudHM7XG4gICAgICAgIHV1aWRDb21wb25lbnRzLnV1aWQgPSB1dWlkQ29tcG9uZW50cy5uc3M7XG4gICAgICAgIHV1aWRDb21wb25lbnRzLm5zcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFvcHRpb25zLnRvbGVyYW50ICYmICghdXVpZENvbXBvbmVudHMudXVpZCB8fCAhdXVpZENvbXBvbmVudHMudXVpZC5tYXRjaChVVUlEKSkpIHtcbiAgICAgICAgICAgIHV1aWRDb21wb25lbnRzLmVycm9yID0gdXVpZENvbXBvbmVudHMuZXJyb3IgfHwgXCJVVUlEIGlzIG5vdCB2YWxpZC5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXVpZENvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSh1dWlkQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgdXJuQ29tcG9uZW50cyA9IHV1aWRDb21wb25lbnRzO1xuICAgICAgICAvL25vcm1hbGl6ZSBVVUlEXG4gICAgICAgIHVybkNvbXBvbmVudHMubnNzID0gKHV1aWRDb21wb25lbnRzLnV1aWQgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHVybkNvbXBvbmVudHM7XG4gICAgfVxufTtcblxuU0NIRU1FU1toYW5kbGVyLnNjaGVtZV0gPSBoYW5kbGVyO1xuU0NIRU1FU1toYW5kbGVyJDEuc2NoZW1lXSA9IGhhbmRsZXIkMTtcblNDSEVNRVNbaGFuZGxlciQyLnNjaGVtZV0gPSBoYW5kbGVyJDI7XG5TQ0hFTUVTW2hhbmRsZXIkMy5zY2hlbWVdID0gaGFuZGxlciQzO1xuU0NIRU1FU1toYW5kbGVyJDQuc2NoZW1lXSA9IGhhbmRsZXIkNDtcblNDSEVNRVNbaGFuZGxlciQ1LnNjaGVtZV0gPSBoYW5kbGVyJDU7XG5TQ0hFTUVTW2hhbmRsZXIkNi5zY2hlbWVdID0gaGFuZGxlciQ2O1xuXG5leHBvcnRzLlNDSEVNRVMgPSBTQ0hFTUVTO1xuZXhwb3J0cy5wY3RFbmNDaGFyID0gcGN0RW5jQ2hhcjtcbmV4cG9ydHMucGN0RGVjQ2hhcnMgPSBwY3REZWNDaGFycztcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmV4cG9ydHMucmVtb3ZlRG90U2VnbWVudHMgPSByZW1vdmVEb3RTZWdtZW50cztcbmV4cG9ydHMuc2VyaWFsaXplID0gc2VyaWFsaXplO1xuZXhwb3J0cy5yZXNvbHZlQ29tcG9uZW50cyA9IHJlc29sdmVDb21wb25lbnRzO1xuZXhwb3J0cy5yZXNvbHZlID0gcmVzb2x2ZTtcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xuZXhwb3J0cy5lcXVhbCA9IGVxdWFsO1xuZXhwb3J0cy5lc2NhcGVDb21wb25lbnQgPSBlc2NhcGVDb21wb25lbnQ7XG5leHBvcnRzLnVuZXNjYXBlQ29tcG9uZW50ID0gdW5lc2NhcGVDb21wb25lbnQ7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11cmkuYWxsLmpzLm1hcFxuIiwiaW1wb3J0IEFqdjIwMjAgZnJvbSAnYWp2L2Rpc3QvMjAyMCcgLy8gZHJhZnQgdGhhdCBzdXBwb3J0IFwidW5ldmFsdWF0ZWRQcm9wZXJ0aWVzXCJcbmltcG9ydCBhZGRGb3JtYXRzIGZyb20gJ2Fqdi1mb3JtYXRzJyAvLyBmb3JtYXQgdmFsaWRhdGlvbiBjb21lIGZyb20gYSBzZXBhcmF0ZSBwYWNrYWdlcyAoZW1haWwsIGRhdGUsIGV0YylcbmltcG9ydCBqZU1ldGFTY2hlbWEgZnJvbSBcIi4vbWV0YS1zY2hlbWFcIlxuaW1wb3J0IGFqdk1ldGFTY2hlbWEgZnJvbSBcImFqdi9kaXN0L3JlZnMvanNvbi1zY2hlbWEtMjAyMC0xMi9zY2hlbWEuanNvblwiXG5cbmNsYXNzIEFqdlZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWp2ID0gbmV3IEFqdjIwMjAoe1xuICAgICAgc3RyaWN0OiBmYWxzZSwgLy8gdG8gaWdub3JlIG5vbiBqc29uIHNjaGVtYSBrZXl3b3JkcyAob3B0aW9ucywgZGVmYXVsdFByb3BlcnRpZXMsIGV0YylcbiAgICAgIGFsbEVycm9yczogdHJ1ZSAvLyBvdGhlcndpc2UgaXQgc2hvd3MganVzdCB0aGUgZmlyc3QgZXJyb3IgcGVyIGtleXdvcmRcbiAgICB9KVxuXG4gICAgdGhpcy5hanYuYWRkRm9ybWF0KFwidGFic1wiLCB7fSkgLy8gc3VwcHJlc3Mgd2FybmluZyBmb3IgdW5rbm93biBmb3JtYXRzXG4gICAgdGhpcy5hanYuYWRkRm9ybWF0KFwidGFibGVcIiwge30pIC8vIHN1cHByZXNzIHdhcm5pbmcgZm9yIHVua25vd24gZm9ybWF0c1xuICAgIGFkZEZvcm1hdHModGhpcy5hanYpIC8vIGFjdGl2YXRlcyBmb3JtYXRzIHZhbGlkYXRpb24gKGVtYWlsLCBkYXRlLCBldGMpXG4gIH1cblxuICB2YWxpZGF0ZTIwMjAxMiAoanNvbikge1xuICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKGFqdk1ldGFTY2hlbWEsIGpzb24pXG4gIH1cblxuICB2YWxpZGF0ZUplTWV0YVNjaGVtYSAoanNvbikge1xuICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKGplTWV0YVNjaGVtYSwganNvbilcbiAgfVxuXG4gIHZhbGlkYXRlIChzY2hlbWEsIGpzb24pIHtcbiAgICBsZXQgZXJyb3JzID0gW11cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWxpZGF0ZSA9IHRoaXMuYWp2LmNvbXBpbGUoc2NoZW1hKVxuICAgICAgdmFsaWRhdGUoanNvbilcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsaWRhdGUuZXJyb3JzKSkge1xuICAgICAgICBlcnJvcnMgPSB2YWxpZGF0ZS5lcnJvcnNcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2NhdWdodCBlcnJvcjonLCBlcnJvcilcbiAgICB9XG5cbiAgICByZXR1cm4gZXJyb3JzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWp2VmFsaWRhdG9yIl0sInNvdXJjZVJvb3QiOiIifQ==