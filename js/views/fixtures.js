define([
	"jquery",
	"backbone",
	"util/fp",
	"text!/templates/fixtures.html",
	"collections/newsList",
	"collections/employees",
	"collections/events"
],

function($, Backbone, fp, template, NewsList, Employees, Events) {

	var FIXTURES = {
		news: {
			name: "News",
			url: "/api/v1/news",
			CollectionClass: NewsList
		},
		employees: {
			name: "Employees",
			url: "/api/v1/employees",
			CollectionClass: Employees
		},
		events: {
			name: "Events",
			url: "/api/v1/calendar",
			CollectionClass: Events
		}
	};

	var FixturesView = Backbone.View.extend({
		name: "FixturesView",
		title: "Fixtures",
		className: "view-fixtures",
		template: _.template(template),
		scope: {
			fixtures: FIXTURES
		},

		ui: {
			count: ".fixture-count",
			button: {
				reset: ".reset-button",
				resetAll: ".reset-all-button"
			}
		},

		events: {
			"click button.reset": "onResetButtonClick",
			"click button.resetAll": "resetAllFixtures"
		},

		postRender: function() {
			this.renderFixtureCounts();
		},

		renderFixtureCounts: function() {
			this.ui.count.each(function() {
				var $el = $(this);
				var key = $el.closest("[data-fixture]").data("fixture");
				var fixture = FIXTURES[key];
				var collection = new fixture.CollectionClass();

				collection.once("sync", function() {
					$el.text(collection.models.length);
				});

				collection.fetch();
			});
		},

		onResetButtonClick: function(event) {
			var $btn = $(event.target);
			var key = $btn.closest("[data-fixture]").data("fixture");
			this.resetFixture(key);
		},

		resetAllFixtures: function() {
			_.each(FIXTURES, function(fixture, key) {
				this.resetFixture(key);
			}, this);
		},

		resetFixture: function(key) {
			var fixture = FIXTURES[key];
			var collection = new fixture.CollectionClass();
			var $resetSuccessful = this.$("[data-fixture='" + key + "'] .reset-successful");
			var self = this;

			// Hide the success feedback if it's visible.
			$resetSuccessful.addClass("hide");

			collection.once("sync", function() {
				var addItems = fp.after(collection.models.length, function() {
					// Get the fresh set of items.
					$.getJSON(fixture.url, function(response) {
						_.each(response, function(item) {
							collection.create(item);
						});

						self.renderFixtureCounts();

						$resetSuccessful.removeClass("hide");
						setTimeout(function() {
							$resetSuccessful.addClass("hide");
						}, 2000);
					});
				});

				// Remove all items in the collection.
				_.each(collection.models, function(model) {
					model.on("destroy", addItems);
					setTimeout(function() {
						model.destroy();
					}, 0);
				});
			});

			// Get the items in the collection.
			collection.fetch();
		}
	});

	return FixturesView;

});
