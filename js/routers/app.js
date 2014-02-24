define([
	"app",
	"jquery",
	"backbone",
	"util/Log",
	"views/index",
	"views/calendar",
	"views/customers",
	"views/directory",
	"views/fixtures"
],

function(app, $, Backbone, Log,
	IndexView, CalendarView, CustomersView,
	DirectoryView, FixturesView) {

	var log = Log.get("AppRouter");

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"calendar": "calendar",
			"customers": "customers",
			"directory": "directory",
			"fixtures": "fixtures"
		},

		start: function() {
			Backbone.history.start();
		},

		index: function() {
			app.trigger("view:change", IndexView);
		},

		calendar: function() {
			app.trigger("view:change", CalendarView);
		},

		customers: function() {
			app.trigger("view:change", CustomersView);
		},

		directory: function() {
			app.trigger("view:change", DirectoryView);
		},

		fixtures: function() {
			app.trigger("view:change", FixturesView);
		}
	});

	return AppRouter;

});
