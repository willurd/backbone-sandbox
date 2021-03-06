define([
	"app",
	"backbone",
	"mousetrap",
	"views/index",
	"views/calendar",
	"views/directory",
	"views/fixtures",
	"views/directory/employees/employee",
	"models/employee",
],

function(app, Backbone, Mousetrap,
	IndexView, CalendarView,
	DirectoryView, FixturesView,
	EmployeeView,
	Employee) {

	var slice = Array.prototype.slice;

	var ORDERED_ROUTES = [
		"",
		"calendar",
		"directory",
		"fixtures"
	];

	function viewChanger(view, configFn) {
		var args = slice.call(arguments, 1);

		return function() {
			var params = slice.call(arguments);
			var options = {
				args: args,
				params: params
			};

			if (configFn) {
				options = configFn(options) || options;
			}

			app.trigger("view:change", view, options);
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
			"directory": "directory",
			"directory/employees/:id": "employee",
			"fixtures": "fixtures"
		},

		start: function() {
			Backbone.history.start();
		},

		index:     viewChanger(IndexView),
		calendar:  viewChanger(CalendarView),
		directory: viewChanger(DirectoryView),
		fixtures:  viewChanger(FixturesView),
		employee:  viewChanger(EmployeeView, function(options) {
			options.model = new Employee({ id: options.params[0] });
		})
	});

	return AppRouter;

});
