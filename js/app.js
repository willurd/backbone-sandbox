/**
 * This object represents the "application", but mostly it's just the
 * global event aggregator.
 */
define([
	"settings",
	"backbone"
], function(settings, Backbone) {

	var slice = Array.prototype.slice;

	var app = $.extend({
		title: settings.brand
	}, Backbone.Events);

	// TODO: Move all of this stuff somewhere else.
	var loadingTimer = 0;
	var loadingFrames = ["/", "-", "\\", "|"];
	var loadingFrame = 0;
	var loadingDelay = 250;

	function advanceLoadingAnimation() {
		loadingFrame = (loadingFrame + 1) % loadingFrames.length;
		var frame = loadingFrames[loadingFrame];
		document.title = frame + " " + app.title;
	}

	app.on("title", function() {
		var args = slice.call(arguments);
		var title = args.join(" - ");
		app.title = title ? (title + " | " + settings.brand) : settings.brand;
		document.title = app.title;
	});

	app.on("loading", function() {
		if (loadingTimer) {
			return;
		}

		loadingFrame = 0;
		loadingTimer = setInterval(advanceLoadingAnimation, loadingDelay);
	});

	app.on("loading:stop", function() {
		clearInterval(loadingTimer);
		loadingTimer = 0;
		document.title = app.title;
	});

	return app;

});
