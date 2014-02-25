define([
	"underscore",
	"backbone",
	"text!/templates/index.html",
	"views/index/news"
],

function(_, Backbone, indexTemplate, NewsView) {

	var IndexView = Backbone.View.extend({
		name: "IndexView",
		title: "Home",
		className: "view-index",
		template: _.template(indexTemplate),

		outlets: {
			news: {
				view: NewsView,
				selector: ".outlet-news"
			}
		}
	});

	return IndexView;

});
