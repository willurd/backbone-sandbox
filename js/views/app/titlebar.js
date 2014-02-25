define([
	"app",
	"settings",
	"underscore",
	"backbone",
	"text!/templates/app/titlebar.html"
],

function(app, settings, _, Backbone, titlebarTemplate) {

	var TitlebarView = Backbone.View.extend({
		name: "TitlebarView",
		template: _.template(titlebarTemplate),
		scope: {
			brand: settings.brand
		},

		ui: {
			menu: {
				items: ".navbar-nav li[data-route]"
			}
		},

		initialize: function() {
			this.listenTo(app.router, "route", this.onRoute);
			this.super("initialize");
		},

		onRoute: function(route, args) {
			this.ui.menu.items.removeClass("active");
			this.getMenuItem(route).addClass("active");
		},

		getMenuItem: function(route) {
			return this.ui.menu.items.filter("[data-route*=' " + route + " ']");
		}
	});

	return TitlebarView;

});
