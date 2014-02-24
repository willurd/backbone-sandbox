define([
	"backbone",
	"text!/templates/index/news/item.html"
],

function(Backbone, template) {

	var NewsItemView = Backbone.View.extend({
		name: "NewsItemView",
		template: _.template(template)
	});

	return NewsItemView;

});
