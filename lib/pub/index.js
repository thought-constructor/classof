'use strict';

exports.__esModule = true;
exports.classof = exports.UNDEFINED = exports.STRING = exports.REG_EXP = exports.OBJECT = exports.NUMBER = exports.NULL = exports.GLOBAL = exports.FUNCTION = exports.ERROR = exports.DATE = exports.BOOLEAN = exports.ARRAY_BUFFER = exports.ARRAY = exports.ARGUMENTS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _constGlobal = require('const-global');

var _constGlobal2 = _interopRequireDefault(_constGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Arguments() /**/{
	return arguments;
}

var toString = Object.prototype.toString;
var ARGUMENTS = exports.ARGUMENTS = 'Arguments';
var ARRAY = exports.ARRAY = 'Array';
var ARRAY_BUFFER = exports.ARRAY_BUFFER = 'ArrayBuffer';
var BOOLEAN = exports.BOOLEAN = 'Boolean';
var DATE = exports.DATE = 'Date';
var ERROR = exports.ERROR = 'Error';
var FUNCTION = exports.FUNCTION = 'Function';
var GLOBAL = exports.GLOBAL = 'Global';
var NULL = exports.NULL = 'Null';
var NUMBER = exports.NUMBER = 'Number';
var OBJECT = exports.OBJECT = 'Object';
var REG_EXP = exports.REG_EXP = 'RegExp';
var STRING = exports.STRING = 'String';
var UNDEFINED = exports.UNDEFINED = 'Undefined';

var RECOGNIZED = {
	'[object Arguments]': ARGUMENTS,
	'[object Array]': ARRAY,
	'[object ArrayBuffer]': ARRAY_BUFFER,
	'[object Boolean]': BOOLEAN,
	'[object Int8Array]': ARRAY,
	'[object Uint8Array]': ARRAY,
	'[object Uint8ClampedArray]': ARRAY,
	'[object Int16Array]': ARRAY,
	'[object Uint16Array]': ARRAY,
	'[object Int32Array]': ARRAY,
	'[object Uint32Array]': ARRAY,
	'[object Float32Array]': ARRAY,
	'[object Float64Array]': ARRAY,
	'[object Date]': DATE,
	'[object Error]': ERROR,
	'[object Function]': FUNCTION,
	'[object Null]': NULL,
	'[object Number]': NUMBER,
	'[object Object]': OBJECT,
	'[object RegExp]': REG_EXP,
	'[object String]': STRING,
	'[object Undefined]': UNDEFINED
};

var classof = function classof(w) {
	return _constGlobal2.default === w ? GLOBAL : OBJECT;
};

if ('[object Arguments]' !== toString.call(Arguments())) exports.classof = classof = function (classof) {

	return function (w) {
		return 'number' === typeof w.length && 'function' === typeof w.callee ? ARGUMENTS : classof(w);
	};
}(classof);

if ('function' === typeof ArrayBuffer && '[object ArrayBuffer]' !== toString.call(new ArrayBuffer())) exports.classof = classof = function (classof) {

	return function (w) {
		return 'number' === typeof w.byteLength ? ARRAY_BUFFER : classof(w);
	};
}(classof);

for (var class_Name in RECOGNIZED) {
	if (/\BArray\]$/.test(class_Name)) {
		var TypedArray = _constGlobal2.default[class_Name.substring(8, class_Name.length - 1)];
		if ('function' === typeof TypedArray && '[object Array]' !== toString.call(TypedArray)) {

			exports.classof = classof = function classof(_classof) {

				return function (w) {
					return ARRAY_BUFFER === _classof(w.buffer) ? ARRAY : _classof(w);
				};
			};

			break;
		}
	}
}exports.classof = classof = function (classof) {

	return function (w) {
		switch (typeof w === 'undefined' ? 'undefined' : _typeof(w)) {
			case 'object':
				if (null === w) return 'Null';break;
			case 'undefined':
				return 'Undefined';
			case 'function':
				return 'Function';
			case 'boolean':
				return 'Boolean';
			case 'number':
				return 'Number';
			case 'string':
				return 'String';
		}
		var k = toString.call(w);
		return RECOGNIZED.hasOwnProperty(k) ? RECOGNIZED[k] : classof(w);
	};
}(classof);

exports.classof = classof;
exports.default = classof;