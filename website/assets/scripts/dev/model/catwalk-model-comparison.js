var recognizeFaces = require("../utils/api-calls").recognizeFaces;

module.exports = Backbone.Model.extend({
	defaults: {
		"result": null,
		"result-id": null,
		"image": null
	},
	
	process: function(){		
		var _self = this;
		recognizeFaces(this.get("image"), function(data){
			_self.set("result", data.responseText);
			_self.trigger("comparison-complete");
		});
	}
});