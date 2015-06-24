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
	var Router = require("./router/index.js");
	
	// Want the router to be available globally.
	global.router = new Router();
	Backbone.history.start(); 
}

// Initialise on document ready.
$(document).on("ready", main);
