define([
	"backbone",
	"models/employee"
],

function(Backbone, Employee) {

	var Employees = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("Employees"),
		model: Employee,
		comparator: function(item) {
			return _.map(["firstName", "lastName"], item.get, item);
		}
	});

	return Employees;

});
