define([
	"settings",
	"views/app"
],

function(settings, AppView) {

	var appView = new AppView({ el: settings.appSelector });
	appView.render();
	appView.start();

});
