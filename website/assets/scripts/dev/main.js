global.$ = require("jquery");

$(document).on("ready", function(){
	global.Backbone = require("backbone");
	global.Backbone.$ = $;

	var basic = require("./view/basic.js");

	var displayBasic = new basic();
});