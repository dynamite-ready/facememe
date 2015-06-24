var DisplayModelTemplate = require("../../../templates/model-list.html");

module.exports = Backbone.View.extend({
	el: '#container',
	
	initialize: function(){
		this.render();
	},
	
	render: function(){
		var models = this.collection;
		
		$("body").addClass("add-scrollbar");
		
		this.$el.append(
			$(
				Mustache.render(
					DisplayModelTemplate, 
					{ models: models.toJSON() }
				)
			)
		);
		var matchPercentage = Math.round((this.model.get("result")["images"][0]["transaction"]["confidence"]) * 100);
		var $matchedElement = $("#" + (this.model.get("result-id")));
		var matchedText = $matchedElement.find(".name").text();
		$matchedElement.find(".name").addClass("match")
		$matchedElement.find(".name").html(matchedText + ": <span class='percent'>" + matchPercentage + "%</span> " + "likeness... <a href='/'>reset?</a>");
		
		$("html, body").animate({
            scrollTop: Number(($matchedElement.offset().top) - 10) + "px"
        }, 2000);
	}
});