/**
 * This object represents the "application", but mostly it's just the
 * global event aggregator.
 */
define([
	"settings",
	"backbone"
], function(settings, Backbone) {

	var slice = Array.prototype.slice;

	var app = $.extend({}, Backbone.Events);

	app.on("title", function() {
		var args = slice.call(arguments);
		var title = args.join(" - ");
		document.title = title ? (title + " | " + settings.brand) : settings.brand;
	});

	return app;

});
