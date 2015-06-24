var ModelList = require("../view/model-list.js");
var UserImage = require("../view/user-image.js");
var ModelProfiles = require("../collection/catwalk-model-profiles.js");
var ModelComparison = require("../model/catwalk-model-comparison.js");

// This needs to be available across both views.
global.modelComparison = new ModelComparison();

module.exports = Backbone.Router.extend({
	routes: {
		"": "home",
		"compare/:id" : "compare"
	},
	
	home: function(){
		$("#models, #user-image").remove();
		var displayUserImage = new UserImage({model: modelComparison});
	},
	
	compare: function(id){
		// Initialise the Catwalk Model Profile collection.
		var dataItemCount = 0;
		var modelProfiles = new ModelProfiles();
		var data = require("../data/catwalk-model-profile-data.js");
		
		modelProfiles.fetch();
		if(modelProfiles.length == data.length){
			displayModelList();
		} else {
			_.each(data, function(item){
				dataItemCount++;
				modelProfiles.create(item);
				
				if(dataItemCount == data.length) displayModelList();
			});			
		}
		
		function displayModelList(){
			var displayModelList = new ModelList({
				collection: modelProfiles,
				model: modelComparison
			});
		}
	}
});
