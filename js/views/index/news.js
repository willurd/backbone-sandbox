define([
	"underscore",
	"backbone",
	"collections/newsList",
	"views/index/news/item",
	"text!/templates/index/news.html"
],

function(_, Backbone, NewsList, NewsItemView, newsTemplate) {

	var NewsView = Backbone.View.extend({
		name: "NewsView",
		template: _.template(newsTemplate),

		initialize: function() {
			this.collection = new NewsList();

			this.listenTo(this.collection, "sync", this.addAll);

			this.super("initialize");
		},

		postInitialize: function() {
			this.collection.fetch();
		},

		addAll: function() {
			this.$el.empty();
			_.each(this.collection.models, this.addOne, this);
		},

		addOne: function(model) {
			var view = new NewsItemView({ model: model });
			this.$el.append(view.render().el);
		}
	});

	return NewsView;

});
