import global
	from 'const-global'

function Arguments(/**/) {
	return arguments
}

const {toString} = Object.prototype

export const ARGUMENTS     = 'Arguments'
export const ARRAY         = 'Array'
export const DATE          = 'Date'
export const ERROR         = 'Error'
export const FUNCTION      = 'Function'
export const GLOBAL        = 'Global'
export const NULL          = 'Null'
export const NUMBER        = 'Number'
export const OBJECT        = 'Object'
export const REG_EXP       = 'RegExp'
export const STRING        = 'String'
export const UNDEFINED     = 'Undefined'

const RECOGNIZED  = {
	'[object Arguments]': ARGUMENTS,
	'[object Array]':     ARRAY,
	'[object Date]':      DATE,
	'[object Error]':     ERROR,
	'[object Function]':  FUNCTION,
	'[object Null]':      NULL,
	'[object Number]':    NUMBER,
	'[object Object]':    OBJECT,
	'[object RegExp]':    REG_EXP,
	'[object String]':    STRING,
	'[object Undefined]': UNDEFINED,
}

let classof = function (w) {
	return global === w ? GLOBAL : OBJECT
}

if (ARGUMENTS !== classof(Arguments()))
	classof = (function (classof) {

		return function (w) {
			return null != w &&
				'number'   === typeof w.length &&
				'function' === typeof w.callee ? ARGUMENTS : classof(w)
		}

	})(classof)

if (UNDEFINED !== classof(undefined))
	classof = (function (classof) {

		return function (w) {
			return undefined === w ? UNDEFINED : classof(w)
		}

	})(classof)

if (NULL !== classof(null))
	classof = (function (classof) {

		return function (w) {
			return null === w ? NULL : classof(w)
		}

	})(classof)

classof = (function (classof) {

	return function (w) {
		const k = toString.call(w)
		return RECOGNIZED.hasOwnProperty(k) ? RECOGNIZED[k] : classof(w)
	}

})(classof)

export {classof}
export default classof
