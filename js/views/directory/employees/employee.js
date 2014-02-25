define([
	"app",
	"backbone",
	"text!/templates/directory/employees/employee.html"
],

function(app, Backbone, template) {

	var EmployeeView = Backbone.View.extend({
		name: "EmployeeView",
		title: "Directory",
		template: _.template(template),
		renderOnInitialize: false,

		postInitialize: function() {
			this.listenTo(this.model, "sync", this.render);
			this.model.fetch();
		},

		postRender: function() {
			app.trigger("title", this.title, this.model.getFullName());
		}
	});

	return EmployeeView;

});
