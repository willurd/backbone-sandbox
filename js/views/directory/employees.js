define([
	"backbone",
	"fuzzy",
	"collections/employees",
	"views/directory/employees/employee",
	"text!/templates/directory/employees.html"
],

function(Backbone, fuzzy, Employees, EmployeeView, template) {

	var EmployeeListView = Backbone.View.extend({
		name: "EmployeeListView",
		template: _.template(template),
		filterText: "",

		initialize: function() {
			this.collection = new Employees();

			this.listenTo(this, "filter", this.filter);
			this.listenTo(this.collection, "sync", this.addMany);

			this.super("initialize");
		},

		postInitialize: function() {
			this.collection.fetch();
		},

		filter: function(text) {
			this.filterText = text || "";
			this.addMany();
		},

		matchesFilter: function(model) {
			return !this.filterText || fuzzy.test(this.filterText, model.getFullName());
		},

		addMany: function() {
			this.$el.empty();

			var coll = this.collection.filter(this.matchesFilter, this);
			_.each(coll, this.addOne, this);
		},

		addOne: function(model) {
			var view = new EmployeeView({ model: model });
			this.$el.append(view.render().el);
		}
	});

	return EmployeeListView;

});