global.$ = require("jquery");
global.Backbone = require("backbone");
global.Backbone.$ = $;


$(document).on("ready", function(){
	var Router = require("./router/index.js");
	var Basic = require("./view/basic.js");

	var router = new Router();
	Backbone.history.start();	
	
	var displayBasic = new Basic();
});