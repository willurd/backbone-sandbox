define([
	"backbone",
	"models/Event"
],

function(Backbone, Event) {

	var Events = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("Events"),
		model: Event
	});

	return Events;

});
