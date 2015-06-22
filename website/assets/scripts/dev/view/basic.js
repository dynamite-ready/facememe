var DisplayModelTemplate = require("../../../templates/basic.html");

module.exports = Backbone.View.extend({
	// Expect:
	// this.modelProfiles.
	el: '#container',
	// It's the first function called when this view it's instantiated.
	initialize: function(){
		this.render();
	},
	// $el - it's a cached jQuery object (el), in which you can use jQuery functions
	//       to push content. Like the Hello World in this case.
	render: function(){
		this.$el.empty();
		var models = this.collection;
		this.$el.append(
			$(
				Mustache.render(
					DisplayModelTemplate, 
					{models: models.toJSON()}
				)
			)
		);
	}
});