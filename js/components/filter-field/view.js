define([
	"backbone",
	"text!/js/components/filter-field/template.html"
],

function(Backbone, template) {

	var FilterField = Backbone.View.extend({
		template: _.template(template),

		ui: {
			field: {
				filter: ".filter-field"
			},
			button: {
				clear: ".clear-button"
			}
		},

		events: {
			"submit form": "onSubmit",
			"input field.filter": "filter",
			"click button.clear": "clearFilter"
		},

		onSubmit: function(event) {
			event.preventDefault();
		},

		filter: function() {
			var filter = this.getFilter();
			this.ui.button.clear.toggleClass("hide", !filter);
			this.trigger("filter", filter);
		},

		clearFilter: function() {
			this.ui.field.filter.val("");
			this.filter();
			this.ui.field.filter.focus();
		},

		getFilter: function() {
			return this.ui.field.filter.val();
		}
	});

	return FilterField;

});
