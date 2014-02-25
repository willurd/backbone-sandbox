define([
	"backbone",
	"text!/templates/index/news/item.html",
	"util/Dates"
],

function(Backbone, template, Dates) {

	var NewsItemView = Backbone.View.extend({
		name: "NewsItemView",
		template: _.template(template),
		scope: {
			formatDate: Dates.formatDate
		}
	});

	return NewsItemView;

});
