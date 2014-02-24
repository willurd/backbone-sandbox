define([
	"backbone",
	"text!/templates/index/news/item.html"
],

function(Backbone, template) {

	var NewsItemView = Backbone.View.extend({
		template: _.template(template)
	});

	return NewsItemView;

});
