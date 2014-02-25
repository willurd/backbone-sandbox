define([
	"backbone",
	"text!/templates/directory/employees/employee.html"
],

function(Backbone, template) {

	var EmployeeView = Backbone.View.extend({
		name: "EmployeeView",
		template: _.template(template),
		renderOnInitialize: false,

		postInitialize: function() {
			this.listenTo(this.model, "sync", this.render);
			this.model.fetch();
		}
	});

	return EmployeeView;

});
