/**
 * Utility methods for dates.
 */
define([
	"moment"
],

function(moment) {

	var Dates = {
		defaultFormat: "MMM Do YYYY [at] h:mma",

		formatDate: function(date, format) {
			return moment(date).format(format || Dates.defaultFormat);
		}
	};

	return Dates;

});
