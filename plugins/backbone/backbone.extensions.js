define([
	"underscore",
	"backbone",
	"util/fp",
	"util/Log"
],

function(_, Backbone, fp, Log) {
	if (typeof Backbone === "undefined") {
		return console.error("backbone.extensions must be included after backbone");
	}

	var slice = Array.prototype.slice;

	/**
	 * Allows you to wrap or replace ("monkey-patch") methods on existing objects.
	 */
	function patch(obj, fn, creator) {
		obj[fn] = creator(obj[fn]) || obj[fn];
	}

	function defer(fn, context) {
		if (fn) {
			setTimeout(function() {
				fn.call(context);
			}, 0);
		}
	}

	patch(Backbone.View.prototype, "super", function(old) {
		return function(method) {
			var args = slice.call(arguments, 1);
			Backbone.View.prototype[method].apply(this, args);
		};
	});

	patch(Backbone.View.prototype, "initialize", function(old) {
		return function() {
			this.subviews = [];
			this.outletMap = {};
			this.log = Log.get(this.name || "...");

			defer(this.postInitialize, this);

			if (old) {
				return old.apply(this, arguments);
			}
		};
	});

	patch(Backbone.View.prototype, "destroy", function(old) {
		return function() {
			// this.log.debug("< destroy >");

			_.forEach(this.subviews, fp.fn("destroy"));

			this.remove();
			// this.unbind();
			// this.undelegateEvents();
			// this.$el.removeData().unbind();

			this.subviews = [];
			this.outletMap = {};
		};
	});

	patch(Backbone.View.prototype, "render", function(old) {
		return function() {
			var scope = {};

			// Get the right scope.
			if (this.scope) {
				if (typeof this.scope === "function") {
					scope = this.scope();
				} else {
					scope = this.scope;
				}
			} else if (this.model) {
				scope = this.model.toJSON();
			} else if (this.collection) {
				scope = this.collection.toJSON();
			}

			// Render the template.
			switch (typeof this.template) {
				case "function":
					this.$el.html(this.template(scope));
					break;
				case "string":
					this.$el.html(this.template);
			}

			// Update the ui object.
			this.refreshUi();
			this.renderOutlets();

			// Call our super render method.
			if (old) {
				old.apply(this, arguments);
			}

			defer(this.postRender, this);

			return this;
		};
	});

	patch(Backbone.View.prototype, "renderOutlets", function(old) {
		return function() {
			if (!this.outlets) {
				return;
			}

			for (var name in this.outlets) {
				var descriptor = this.outlets[name];

				var SubviewClass = descriptor.view;
				var events = descriptor.events || {};
				var el = this.$(descriptor.selector);
				var subview = new SubviewClass({ el: el });

				// Listen to events on the subview.
				_.each(events, function(method, eventName) {
					this.listenTo(subview, eventName, this[method]);
				}, this);

				this.outletMap[name] = subview;
				this.subviews.push(subview);

				subview.render();
			}
		};
	});

	patch(Backbone.View.prototype, "outlet", function(old) {
		return function(name) {
			return this.outletMap[name];
		};
	});
});
