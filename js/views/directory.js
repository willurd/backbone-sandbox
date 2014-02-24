define([
	"backbone",
	"text!/templates/directory.html",
	"components/filter-field/view",
	"views/directory/employees"
],

function(Backbone, directoryTemplate, FilterField, EmployeeListView) {

	var DirectoryView = Backbone.View.extend({
		name: "DirectoryView",
		className: "view-directory",
		template: _.template(directoryTemplate),

		outlets: {
			filterField: {
				view: FilterField,
				selector: ".outlet-filter-field",
				events: {
					"filter": "onFilter"
				}
			},
			employees: {
				view: EmployeeListView,
				selector: ".outlet-employees"
			}
		},

		onFilter: function(text) {
			var employees = this.outlet("employees");
			employees.trigger("filter", text);
		}
	});

	return DirectoryView;

});
