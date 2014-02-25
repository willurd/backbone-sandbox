define([
	"backbone"
],

function(Backbone) {

	var NewsItem = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("News"),
		defaults: {
			title: "Default title",
			body: "Default body"
		}
	});

	return NewsItem;

});
