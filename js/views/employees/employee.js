define([
	"backbone",
	"text!/templates/employees/employee.html"
],

function(Backbone, template) {

	var EmployeeView = Backbone.View.extend({
		template: _.template(template)
	});

	return EmployeeView;

});
