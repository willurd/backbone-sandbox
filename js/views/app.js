define([
	"app",
	"underscore",
	"backbone",
	"util/Log",
	"routers/app",
	"text!/templates/app.html",
	"views/app/titlebar"
],

function(app, _, Backbone, Log, AppRouter, appTemplate, TitlebarView) {

	var AppView = Backbone.View.extend({
		name: "AppView",
		template: _.template(appTemplate),
		currentView: null,

		ui: {
			views: ".outlet-views"
		},

		outlets: {
			titlebar: {
				view: TitlebarView,
				selector: ".outlet-titlebar"
			}
		},

		initialize: function() {
			app.router = new AppRouter();

			this.listenTo(app, "view:change", this.changeView);

			this.super("initialize");
		},

		start: function() {
			app.router.start();
		},

		changeView: function(ViewClass, options) {
			if (this.currentView) {
				this.currentView.destroy();
				this.currentView = null;
			}

			// Think about html caching and an activate/deactivate lifecylce.
			this.ui.views.empty();

			// Add the view to the page.
			var view = new ViewClass(options || {});
			app.trigger("title", view.title);

			if (view.renderOnInitialize !== false) {
				view.render();
			}

			this.ui.views.append(view.el);
			this.currentView = view;
		}
	});

	return AppView;

});
