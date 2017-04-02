var global = require('const-global')
var toString = Object.prototype.toString
var Arguments = function (/* ...arguments */) { return arguments }

var ARGUMENTS     = exports.ARGUMENTS     = 'Arguments'
var ARRAY         = exports.ARRAY         = 'Array'
var ARRAY_BUFFER  = exports.ARRAY_BUFFER  = 'ArrayBuffer'
var BOOLEAN       = exports.BOOLEAN       = 'Boolean'
var DATE          = exports.DATE          = 'Date'
var ERROR         = exports.ERROR         = 'Error'
var FUNCTION      = exports.FUNCTION      = 'Function'
var GLOBAL        = exports.GLOBAL        = 'Global'
var NULL          = exports.NULL          = 'Null'
var NUMBER        = exports.NUMBER        = 'Number'
var OBJECT        = exports.OBJECT        = 'Object'
var REG_EXP       = exports.REG_EXP       = 'RegExp'
var STRING        = exports.STRING        = 'String'
var UNDEFINED     = exports.UNDEFINED     = 'Undefined'

var RECOGNIZED  = {
	'[object Arguments]':         ARGUMENTS,
	'[object Array]':             ARRAY,
	'[object ArrayBuffer]':       ARRAY_BUFFER,
	'[object Boolean]':           BOOLEAN,
	'[object Int8Array]':         ARRAY,
	'[object Uint8Array]':        ARRAY,
	'[object Uint8ClampedArray]': ARRAY,
	'[object Int16Array]':        ARRAY,
	'[object Uint16Array]':       ARRAY,
	'[object Int32Array]':        ARRAY,
	'[object Uint32Array]':       ARRAY,
	'[object Float32Array]':      ARRAY,
	'[object Float64Array]':      ARRAY,
	'[object Date]':              DATE,
	'[object Error]':             ERROR,
	'[object Function]':          FUNCTION,
	'[object global]':            GLOBAL,
	'[object Global]':            GLOBAL,
	'[object Window]':            GLOBAL,
	'[object Null]':              NULL,
	'[object Number]':            NUMBER,
	'[object Object]':            OBJECT,
	'[object RegExp]':            REG_EXP,
	'[object String]':            STRING,
	'[object Undefined]':         UNDEFINED
}

var classof = function (w) {
	return global === w ? GLOBAL : OBJECT
}

var MATCHES_ARGUMENTS =
	'[object Arguments]' === toString.call(Arguments())

if (! MATCHES_ARGUMENTS) classof = (function (classof) {

	return function (w) {
		return 'number' === typeof w.length &&
			'function' === typeof w.callee ? ARGUMENTS : classof(w)
	}

})(classof)

var MATCHES_ARRAY_BUFFER =
	'function' === typeof ArrayBuffer &&
		'[object ArrayBuffer]' === toString.call(new ArrayBuffer)

if (! MATCHES_ARRAY_BUFFER) classof = (function (classof) {

	return function (w) {
		return 'number' === typeof w.byteLength ? ARRAY_BUFFER : classof(w)
	}

})(classof)

var MATCHES_TYPED_ARRAYS = false // At least, not as `[object Array]`, TBC'd...

if (! MATCHES_TYPED_ARRAYS) classof = (function (classof) {

	return function (w) {
		return ARRAY_BUFFER === classof(w.buffer) ? ARRAY : classof(w)
	}

}) (classof)

classof = (function (classof) {

	return function (w) {
		switch (typeof w) {
			case 'object': if (null === w) return 'Null'; break
			case 'undefined': return 'Undefined'
			case 'function': return 'Function'
			case 'boolean': return 'Boolean'
			case 'number': return 'Number'
			case 'string': return 'String'
		}
		const k = toString.call(w)
		return RECOGNIZED.hasOwnProperty(k) ? RECOGNIZED[k] : classof(w)
	}

})(classof)

module.exports = exports.default = classof
