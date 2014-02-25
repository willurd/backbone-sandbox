define([
	"backbone",
	"text!/templates/directory/employees/employee.html"
],

function(Backbone, template) {

	var EmployeeView = Backbone.View.extend({
		name: "EmployeeView",
		template: _.template(template),

		initialze: function(options) {
			this.log.debug(options);
		}
	});

	return EmployeeView;

});
