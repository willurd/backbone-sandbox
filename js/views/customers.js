define([
	"backbone",
	"text!/templates/customers.html"
],

function(Backbone, customersTemplate) {

	var CustomersView = Backbone.View.extend({
		name: "CustomersView",
		className: "view-customers",
		template: _.template(customersTemplate)
	});

	return CustomersView;

});
