import classof
	from '.'

import {assert}
	from 'chai'

describe('classof', () => {
	it("should match `window` as 'Global', if defined", () => {
		
		if ('object' === typeof window)
			assert.equal('Global', classof(window))

	})
	it("should match `null` as 'Null'", () => {
		
		assert.equal('Null', classof(null))

	})
	it("should match `undefined` as 'Undefined'", () => {
		
		assert.equal('Undefined', classof(undefined))

	})
	it("should match arrays as 'Array'", () => {
		
		assert.equal('Array', classof([]))
		assert.equal('Array', classof([1, 2, 3]))

	})
})
