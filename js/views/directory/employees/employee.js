define([
	"backbone",
	"text!/templates/directory/employees/employee.html"
],

function(Backbone, template) {

	var EmployeeView = Backbone.View.extend({
		name: "EmployeeView",
		template: _.template(template)
	});

	return EmployeeView;

});
