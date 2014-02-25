define([
	"app",
	"settings",
	"underscore",
	"backbone",
	"util/Log",
	"routers/app",
	"text!/templates/app.html",
	"views/app/titlebar"
],

function(app, settings, _, Backbone, Log, AppRouter, appTemplate, TitlebarView) {

	var slice = Array.prototype.slice;

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
			this.loading = {
				timer: 0,
				frames: ["/", "-", "\\", "|"],
				frame: 0,
				delay: 250
			};

			app.router = new AppRouter();

			this.listenTo(app, "view:change", this.changeView);
			this.listenTo(app, "title", this.setTitle);
			this.listenTo(app, "loading", this.showLoading);
			this.listenTo(app, "loading:stop", this.hideLoading);

			app.trigger("title");

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
		},

		setTitle: function() {
			var args = slice.call(arguments);
			var title = args.join(" - ");
			app.title = title ? (title + " | " + settings.brand) : settings.brand;
			document.title = app.title;
		},

		showLoading: function() {
			if (this.loading.timer) {
				return;
			}

			this.loading.frame = 0;
			this.loading.timer = setInterval($.proxy(this.advanceLoadingAnimation, this), this.loading.delay);
		},

		hideLoading: function() {
			clearInterval(this.loading.timer);
			this.loading.timer = 0;
			document.title = app.title;
		},

		advanceLoadingAnimation: function() {
			this.loading.frame = (this.loading.frame + 1) % this.loading.frames.length;
			var frame = this.loading.frames[this.loading.frame];
			document.title = frame + " " + app.title;
		}
	});

	return AppView;

});
