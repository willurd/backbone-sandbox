define([
	"backbone",
	"models/employee"
],

function(Backbone, Employee) {

	var Employees = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("Employees"),
		model: Employee,
		comparator: function(item) {
			return item.getFullName();
		}
	});

	return Employees;

});
