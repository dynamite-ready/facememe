var enrollFace = require("../utils/api-calls").enrollFace;

module.exports = Backbone.Model.extend({
	defaults: {
		"id": null,	
		"firstname": null,
		"surname": null,
		"sex": null,
		"image": null
		// "enrolled": null // Is this model (hoho!) registered on the server?...
	},
	/*
	initialize: function(){
		if(!this.get("enrolled")){
			var _self = this;
			enrollFace(this.get("image"), this.get("id"), function(data){
				// To ensure that we don't push the image to the server for registration again.
				// Unfortunately, there's a bug in Backbone.localStorage on all browsers but Chrome.
				_self.set("enrolled", data.responseText);
				_self.save();
			});
		}
	}
	*/
});