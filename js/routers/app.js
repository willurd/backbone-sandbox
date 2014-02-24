define([
	"app",
	"backbone",
	"views/index",
	"views/calendar",
	"views/customers",
	"views/directory",
	"views/fixtures"
],

function(app, Backbone,
	IndexView, CalendarView, CustomersView,
	DirectoryView, FixturesView) {

	function viewChanger(view) {
		return function() {
			app.trigger("view:change", view);
		};
	}

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

		index:     viewChanger(IndexView),
		calendar:  viewChanger(CalendarView),
		customers: viewChanger(CustomersView),
		directory: viewChanger(DirectoryView),
		fixtures:  viewChanger(FixturesView),
	});

	return AppRouter;

});
