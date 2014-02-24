define([
	"backbone",
	"collections/events",
	"text!/templates/calendar.html"
],

function(Backbone, Events, calendarTemplate) {

	var CalendarView = Backbone.View.extend({
		name: "CalendarView",
		className: "view-calendar",
		template: _.template(calendarTemplate),

		ui: {
			calendar: ".calendar"
		},

		postRender: function() {
			this.ui.calendar.fullCalendar({
				year: 2014,
				month: 1,
				header: {
					left: "prev,next today",
					center: "title",
					right: "month,basicWeek,basicDay"
				},
				events: function(start, end, callback) {
					var events = new Events();
					events.once("sync", function() {
						callback(events.toJSON());
					});
					events.fetch();
				}
			});
		},

		setEvents: function(events) {
			this.ui.calendar.fullCalendar("events", events);
		}
	});

	return CalendarView;

});
