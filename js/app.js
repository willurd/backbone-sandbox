/**
 * This object represents the "application", but mostly it's just the
 * global event aggregator.
 */
define([
	"settings",
	"backbone"
], function(settings, Backbone) {

	var app = $.extend({}, Backbone.Events);

	return app;

});
