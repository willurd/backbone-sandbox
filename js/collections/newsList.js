define([
	"backbone",
	"models/newsItem"
],

function(Backbone, NewsItem) {

	var NewsList = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("NewsList"),
		model: NewsItem
	});

	return NewsList;

});
