/**
 * A small library of functional programming utility methods.
 */
define([
],

function() {

	var slice = Array.prototype.slice;

	var fp = {
		/**
		 * Returns a function which takes an object and returns object[name].
		 */
		prop: function(name) {
			return function(obj) {
				return obj[name];
			};
		},

		/**
		 * Returns a function which takes an object and calls object[name]().
		 */
		fn: function(name) {
			var args = slice.call(arguments, 1);

			return function(obj) {
				return obj[name].apply(obj, args);
			}
		},

		/**
		 * Returns a function which calls fn after being called count times.
		 */
		after: function(count, fn, context) {
			count++;

			var afterFn = function() {
				if (--count == 0) {
					fn.apply(context, arguments);
				}
			};

			afterFn();

			return afterFn;
		}
	};

	return fp;

});
