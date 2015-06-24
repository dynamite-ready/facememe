var ModelList = require("../view/model-list.js");
var UserImage = require("../view/user-image.js");
var ModelProfiles = require("../collection/catwalk-model-profiles.js");
var ModelComparison = require("../model/catwalk-model-comparison.js");

// This needs to be available across both views.
global.modelComparison = new ModelComparison();

// Mock data... Would ideally like to put this in a database.
var data = require("../data/catwalk-model-profile-data.js");

module.exports = Backbone.Router.extend({
	routes: {
		"": "home",
		"compare/:id" : "compare"
	},
	
	home: function(){
		/*
		var dataItemCount = 0;
		
		if(modelProfiles.length == data.length){
			displayHomepage();
		} else {
			// If I've added or deleted an item from mock data, or the collection was originally empty, create a fresh collection.
			_.each(data, function(item){
				dataItemCount++;
				modelProfiles.create(item);
				
				if(dataItemCount == data.length) displayHomepage();
			});
		}
		*/
		//function displayHomepage(){
			// Homepage components.
			$("#models, #user-image").remove();
			var displayUserImage = new UserImage({model: modelComparison});
		//}
	},
	
	compare: function(id){
		console.log("NOW TO RENDER THE MODEL COMPARISON VIEW...", id, modelComparison.get("result"));
		// Initialise the Catwalk Model Profile collection.
		var modelProfiles = new ModelProfiles();
		modelProfiles.fetch();
		
		var displayModelList = new ModelList({
			collection: modelProfiles,
			model: modelComparison
		});
	}
});
