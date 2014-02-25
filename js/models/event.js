define([
	"backbone"
],

function(Backbone) {

	var Event = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("Events"),
		defaults: {
			allDay: true
		}
	});

	return Event;

});
