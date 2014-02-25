define([
	"backbone"
],

function(Backbone) {

	var Employee = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("Employees"),
		getFullName: function() {
			return this.get("firstName") + " " + this.get("lastName");
		}
	});

	return Employee;

});
