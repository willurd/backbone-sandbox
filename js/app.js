/**
 * This object represents the "application", but mostly it's just the
 * global event aggregator.
 */
define([
	"backbone"
], function() {

	var app = $.extend({}, Backbone.Events);

	return app;

});
