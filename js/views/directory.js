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

		ui: {
			label: {
				listCount: ".list-count-label"
			}
		},

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
				selector: ".outlet-employees",
				events: {
					"filtered": "onListFiltered"
				},
				triggers: {
					"filter": "filter"
				}
			}
		},

		onFilter: function(text) {
			this.trigger("filter", text);
		},

		onListFiltered: function(models) {
			this.ui.label.listCount.text(models.length);
		}
	});

	return DirectoryView;

});
