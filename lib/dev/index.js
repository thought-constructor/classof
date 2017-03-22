import global
	from 'const-global'

function Arguments(/**/) {
	return arguments
}

const {toString} = Object.prototype

export const ARGUMENTS     = 'Arguments'
export const ARRAY         = 'Array'
export const ARRAY_BUFFER  = 'ArrayBuffer'
export const BOOLEAN       = 'Boolean'
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
	'[object Null]':              NULL,
	'[object Number]':            NUMBER,
	'[object Object]':            OBJECT,
	'[object RegExp]':            REG_EXP,
	'[object String]':            STRING,
	'[object Undefined]':         UNDEFINED,
}

let classof = function (w) {
	return global === w ? GLOBAL : OBJECT
}

if ('[object Arguments]' !== toString.call(Arguments()))
	classof = (function (classof) {

		return function (w) {
			return 'number' === typeof w.length && 'function' === typeof w.callee ? ARGUMENTS : classof(w)
		}

	})(classof)

if ('function' === typeof ArrayBuffer && '[object ArrayBuffer]' !== toString.call(new ArrayBuffer))
	classof = (function (classof) {

		return function (w) {
			return 'number' === typeof w.byteLength ? ARRAY_BUFFER : classof(w)
		}

	})(classof)

for (let class_Name in RECOGNIZED) if (/\BArray\]$/.test(class_Name)) {
	const TypedArray = global[class_Name.substring(8, class_Name.length - 1)]
	if ('function' === typeof TypedArray && '[object Array]' !== toString.call(TypedArray)) {

		classof = (function (classof) {

			return function (w) {
				return ARRAY_BUFFER === classof(w.buffer) ? ARRAY : classof(w)
			}

		})

		break
	}
}

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

export {classof}
export default classof
