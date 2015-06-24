var DisplayModelTemplate = require("../../../templates/model-list.html");

module.exports = Backbone.View.extend({
	el: '#container',
	
	initialize: function(){
		this.render();
	},
	
	render: function(){
		var models = this.collection;
		this.$el.append(
			$(
				Mustache.render(
					DisplayModelTemplate, 
					{ models: models.toJSON() }
				)
			)
		);
	},
	
	close: function(){
		this.remove();
	}	
});