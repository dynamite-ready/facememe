// Infrastructure... Where I can, I try to source NPM versions of key libraries. As a result, the source can be found in the node modules folder.
// I attach these libraries to the CommonJS 'global' object, to avoid the need for per module includes/requires.
global.$ = require("jquery");
global._ = require("underscore");
global.Mustache = require("mustache");
global.Backbone = require("backbone");
global.Backbone.LocalStorage = require("backbone.localstorage");
global.Backbone.$ = $;

// App initialisation. If something is broken, start here.
function main(){
	// App specific.
	var Router = require("./router/index.js");
	var ModelList = require("./view/model-list.js");
	var UserImage = require("./view/user-image.js");
	var ModelProfiles = require("./collection/catwalk-model-profiles.js");
	
	// Mock data... Would ideally like to put this in a database.
	var data = require("./data/catwalk-model-profile-data.js");
	
	// Keep track of what's been loaded so far.
	var dataItemCount = 0;
	
	// Initialise router.
	var router = new Router();
	Backbone.history.start();	
	
	// Initialise the Catwalk Model Profile collection.
	var modelProfiles = new ModelProfiles();
	
	// Attempt to retrieve the collection from cache.
	modelProfiles.fetch();

	if(modelProfiles.length == data.length){
		displayHomepage();
	} else {
		// If I've added or deleted an item from mock data, or the collection was originally empty, create a fresh collection
		_.each(data, function(item){
			dataItemCount++;
			modelProfiles.create(item);
			
			if(dataItemCount == data.length) displayHomepage();
		});
	}

	function displayHomepage(){
		// Homepage components.
		var displayModelList = new ModelList({collection: modelProfiles});
		var displayUserImage = new UserImage({collection: modelProfiles});
		
		var detectFace = require("./utils").detectFace;
	}
	

}

	// Initialise on document ready.
$(document).on("ready", main);
