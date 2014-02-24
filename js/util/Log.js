define([
	"util/Class",
	"moment",
	"util/Strings"
],

function(Class, moment, Strings) {

	var LOGGERS = {};
	var slice = Array.prototype.slice;
	var longestNameLength = 10;

	function log(name, level, args) {
		longestNameLength = Math.max(longestNameLength, name.length);

		var message = [
			moment().format("YYYY/MM/DD hh:mm:ss.SSS"),
			"[",
			level,
			"]",
			Strings.pad.right(name, longestNameLength, " "),
			"|"
		].concat(slice.call(args));

		var method = level.toLowerCase();

		console[method].apply(console, message);
	}

	var Logger = Class.extend({
		initialize: function(name) {
			this.name = name;
		},

		log:   function() { log(this.name, "INFO",  arguments); },
		info:  function() { log(this.name, "INFO",  arguments); },
		debug: function() { log(this.name, "DEBUG", arguments); },
		warn:  function() { log(this.name, "WARN",  arguments); },
		error: function() { log(this.name, "ERROR", arguments); }
	});

	var Log = {
		get: function(name) {
			if (!(name in LOGGERS)) {
				LOGGERS[name] = new Logger(name);
			}

			return LOGGERS[name];
		}
	};

	return Log;

});
