define([
	"backbone",
	"models/newsItem"
],

function(Backbone, NewsItem) {

	var NewsList = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("News"),
		model: NewsItem
	});

	return NewsList;

});
