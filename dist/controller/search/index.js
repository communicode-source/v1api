'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('./../../db/handler/user');

var _user2 = _interopRequireDefault(_user);

var _Response2 = require('../Response');

var _Response3 = _interopRequireDefault(_Response2);

var _fastLevenshtein = require('fast-levenshtein');

var _fastLevenshtein2 = _interopRequireDefault(_fastLevenshtein);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchController = function (_Response) {
	_inherits(SearchController, _Response);

	function SearchController() {
		_classCallCheck(this, SearchController);

		return _possibleConstructorReturn(this, (SearchController.__proto__ || Object.getPrototypeOf(SearchController)).apply(this, arguments));
	}

	_createClass(SearchController, [{
		key: 'search',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
				var id, dbHandler, data, statusCode, farray, larray, oarray, idArray;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								id = req.params.id;
								dbHandler = new _user2.default();
								data = void 0, statusCode = void 0;
								_context.prev = 3;
								farray = void 0, larray = void 0, oarray = void 0;

								if (id.includes('_')) {
									_context.next = 14;
									break;
								}

								_context.next = 8;
								return dbHandler.search(id);

							case 8:
								data = _context.sent;

								farray = data.map(function (i) {
									// Array of distance from first names
									if (i.fname != null) {
										return _fastLevenshtein2.default.get(i.fname, id);
									} else {
										return 100;
									}
								});
								larray = data.map(function (i) {
									// Array of distance from last names
									if (i.lname != null) {
										return _fastLevenshtein2.default.get(i.lname, id);
									} else {
										return 100;
									}
								});
								oarray = data.map(function (i) {
									// Array of distance from organization names
									if (i.organizationname != null) {
										return _fastLevenshtein2.default.get(i.oranizationname, id);
									} else {
										return 100;
									}
								});

								_context.next = 21;
								break;

							case 14:
								idArray = id.split("_");
								_context.next = 17;
								return dbHandler.dSearch(idArray);

							case 17:
								data = _context.sent;

								farray = data.map(function (i) {
									if (i.fname != null) {
										return _fastLevenshtein2.default.get(i.fname, idArray[0]);
									} else {
										return 100;
									}
								});
								larray = data.map(function (i) {
									if (i.lname != 0) {
										return _fastLevenshtein2.default.get(i.lname, idArray[1]);
									} else {
										return 100;
									}
								});
								oarray = data.map(function (i) {
									if (i.organizationname != null) {
										return _fastLevenshtein2.default.get(i.organizationname, id);
									} else {
										return 100;
									}
								});

							case 21:
								data.sort(function (item1, item2) {
									var useItem1 = void 0,
									    useItem2 = void 0;
									useItem1 = Math.min(farray[data.indexOf(item1)], larray[data.indexOf(item1)], oarray[data.indexOf(item1)]); // Use smallest levenshtein distance

									useItem2 = Math.min(farray[data.indexOf(item2)], larray[data.indexOf(item2)], oarray[data.indexOf(item2)]);

									return useItem1 - useItem2; // Sort
								});
								statusCode = this.statusCode['success'];
								_context.next = 30;
								break;

							case 25:
								_context.prev = 25;
								_context.t0 = _context['catch'](3);

								console.log(_context.t0);
								data = 'Internal Processing Error';
								statusCode = this.statusCode['not found'];

							case 30:
								return _context.abrupt('return', new _Response3.default(data, statusCode));

							case 31:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[3, 25]]);
			}));

			function search(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return search;
		}()
	}]);

	return SearchController;
}(_Response3.default);

;

module.exports = new SearchController();
//# sourceMappingURL=index.js.map