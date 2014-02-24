define([
],

function() {

	var slice = Array.prototype.slice;

	var fp = {
		fn: function(name) {
			var args = slice.call(arguments, 1);

			return function(obj) {
				return obj[name].apply(obj, args);
			}
		},

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
