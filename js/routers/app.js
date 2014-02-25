define([
	"app",
	"backbone",
	"mousetrap",
	"views/index",
	"views/calendar",
	"views/customers",
	"views/directory",
	"views/fixtures"
],

function(app, Backbone, Mousetrap,
	IndexView, CalendarView, CustomersView,
	DirectoryView, FixturesView) {

	var ORDERED_ROUTES = [
		"",
		"calendar",
		"directory",
		"fixtures"
	];

	function viewChanger(view) {
		return function() {
			app.trigger("view:change", view);
		};
	}

	// Add alt+<num> keyboard shortcuts for switching views.
	_.each(ORDERED_ROUTES, function(route, index) {
		Mousetrap.bind("alt+" + (index + 1), function() {
			app.router.navigate(route, { trigger: true });
		});
	});

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"calendar": "calendar",
			// "customers": "customers",
			"directory": "directory",
			"fixtures": "fixtures"
		},

		start: function() {
			Backbone.history.start();
		},

		index:     viewChanger(IndexView),
		calendar:  viewChanger(CalendarView),
		// customers: viewChanger(CustomersView),
		directory: viewChanger(DirectoryView),
		fixtures:  viewChanger(FixturesView),
	});

	return AppRouter;

});
