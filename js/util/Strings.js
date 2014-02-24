/**
 * Utility methods for strings.
 */
define([
],

function() {

	function padFunction(fn) {
		return function(string, length, char) {
			char = char || Strings.pad.char;

			while (string.length < length) {
				string = fn(string, char);
			}

			return string;
		};
	}

	var Strings = {
		pad: {
			char: " ",
			left: padFunction(function(string, char) {
				return char + string;
			}),
			right: padFunction(function(string, char) {
				return string + char;
			})
		}
	};

	return Strings;

});
