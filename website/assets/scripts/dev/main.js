// Infrastructure... Where I can, I try to source NPM versions of key libraries.
// I attach these to the CommonJS 'global' object, to avoid the need for per module includes/requires.
global.$ = require("jquery");
global._ = require("underscore");
global.Backbone = require("backbone");
global.Backbone.LocalStorage = require("backbone.localstorage");
global.Backbone.$ = $;

// App initialisation. If something is broken, start here.
function main(){
	// App specific.
	var Router = require("./router/index.js");
	var Basic = require("./view/basic.js");
	var ModelProfiles = require("./collection/catwalk-model-profiles.js");
	
	// Initialise router.
	var router = new Router();
	Backbone.history.start();	
	
	// Initialise the Catwalk Model Profile collection.
	var modelProfiles = new ModelProfiles();
	
	// Mock data... Would ideally like to put this in a database.
	var data = require("./data/catwalk-model-profile-data.js");
	 
	_.each(data, function(item){
		console.log(
			"BADGER",
			modelProfiles.findWhere({
				firstname: item.firstname,
				surname: item.surname
			})			
		)
		
		if(
			!modelProfiles.findWhere({
				firstname: item.firstname,
				surname: item.surname
			})
		){	
			modelProfiles.create(item);
		}
	});

	// Initial view.
	var displayBasic = new Basic({collection: modelProfiles});	
}

// Initialise on document ready.
$(document).on("ready", main);
