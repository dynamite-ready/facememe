module.exports = Backbone.Model.extend({
	url: "http://api.skybiometry.com/fc/faces/detect.json", 
	defaults: { "image": "" },
	initialize: function(){
		var _self = this;
		this.fetch({
			method: "POST",
			data: { 
				"api_key": "467930ad92414500a2a0817b7b6efb6d", 
				"api_secret": "dd99cbb0458c4ae59f7ae2c753ae1f88", 
				"urls": this.get("image"),
				"attributes": "all"
			},
			error: function(error){ console.log("Error: ", error); },
			success: function(data){ 
				// console.log("YUSS", data);
				_self.set("data", data);
				
				// When the server responds.
				_self.trigger("loaded");
			}
		});
	}
});