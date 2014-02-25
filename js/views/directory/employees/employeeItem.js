define([
	"backbone",
	"text!/templates/directory/employees/employeeItem.html"
],

function(Backbone, template) {

	var EmployeeItemView = Backbone.View.extend({
		name: "EmployeeItemView",
		template: _.template(template)
	});

	return EmployeeItemView;

});
