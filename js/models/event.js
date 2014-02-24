define([
	"backbone"
],

function(Backbone) {

	var Event = Backbone.Model.extend({
		defaults: {
			allDay: true
		}
	});

	return Event;

});
