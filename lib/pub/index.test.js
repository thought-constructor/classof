'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('classof', function () {
	it("should match `window` as 'Global', if defined", function () {

		if ('object' === (typeof window === 'undefined' ? 'undefined' : _typeof(window))) _chai.assert.equal('Global', (0, _2.default)(window));
	});
	it("should match `null` as 'Null'", function () {

		_chai.assert.equal('Null', (0, _2.default)(null));
	});
	it("should match `undefined` as 'Undefined'", function () {

		_chai.assert.equal('Undefined', (0, _2.default)(undefined));
	});
	it("should match arrays as 'Array'", function () {

		_chai.assert.equal('Array', (0, _2.default)([]));
		_chai.assert.equal('Array', (0, _2.default)([1, 2, 3]));
	});
});