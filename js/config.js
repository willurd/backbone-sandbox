requirejs.config({
	deps: ["main"],

	noGlobal: true,

	paths: {
		"backbone": "/lib/backbone/backbone",
		"backbone.unclassified": "/lib/backbone.unclassified/backbone.unclassified",
		"backbone.extensions": "/plugins/backbone/backbone.extensions",
		"backbone.localStorage": "/lib/Backbone.localStorage/backbone.localStorage-min",
		"bootstrap": "/lib/bootstrap/dist/js/bootstrap.min",
		"calendar": "/lib/fullcalendar/fullcalendar.min",
		"fuzzy": "/lib/fuzzy-search/fuzzy-min",
		"jquery": "/lib/jquery/dist/jquery.min",
		"moment": "/lib/moment/moment",
		"mousetrap": "/lib/mousetrap/mousetrap.min",
		"underscore": "/lib/underscore/underscore",
		"text": "/lib/requirejs-text/text"
	},

	shim: {
		"main": {
			deps: [
				"backbone.unclassified",
				"backbone.extensions",
				"backbone.localStorage",
				"calendar"
			]
		},

		"backbone": {
			deps: ["jquery", "underscore"],
			exports: "backbone"
		},

		"backbone.extensions": {
			deps: ["backbone.unclassified"]
		},

		"backbone.localStorage": {
			deps: ["backbone"]
		},

		"backbone.unclassified": {
			deps: ["backbone"]
		},

		"bootstrap": {
			deps: ["jquery"]
		},

		"calendar": {
			deps: ["jquery"]
		},

		"fuzzy": {
			exports: "fuzzy"
		},

		"underscore": {
			exports: "_"
		}
	}
});
