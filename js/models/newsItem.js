define([
	"backbone"
],

function(Backbone) {

	var NewsItem = Backbone.Model.extend({
		defaults: {
			title: "Default title",
			body: "Default body"
		}
	});

	return NewsItem;

});
