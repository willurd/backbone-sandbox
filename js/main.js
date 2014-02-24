define([
	"jquery",
	"backbone"
],

function($, Backbone) {

	var app = $.extend({}, Backbone.Events);
	define("app", app);

	require([
		"settings",
		"views/app"
	], function(settings, AppView) {
		var appView = new AppView({ el: settings.appSelector });
		appView.render();
		appView.start();
	});

});
