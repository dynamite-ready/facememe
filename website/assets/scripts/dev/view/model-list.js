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
		
		console.log(this);
		
		$("html, body").animate({
            scrollTop: Number(($("#" + (this.model.get("result-id"))).offset().top) + 10) + "px"
        }, 2000);
	}
});