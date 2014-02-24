define([
	"backbone"
],

function(Backbone) {

	var Employee = Backbone.Model.extend({
		getFullName: function() {
			return this.get("firstName") + " " + this.get("lastName");
		}
	});

	return Employee;

});
