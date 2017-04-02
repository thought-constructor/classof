var classof = require('.')
var chai = require('chai'), assert = chai.assert

describe('classof', function () {
	
	it("should match `window` as 'Global', if defined", function () {
		
		if ('object' === typeof window)
			assert.equal('Global', classof(window))

	})
	
	it("should match `null` as 'Null'", function () {
		
		assert.equal('Null', classof(null))

	})
	
	it("should match `undefined` as 'Undefined'", function () {
		
		assert.equal('Undefined', classof(undefined))

	})
	
	it("should match arrays as 'Array'", function () {
		
		assert.equal('Array', classof([]))
		assert.equal('Array', classof([1, 2, 3]))

	})

})
