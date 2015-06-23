module.exports = Backbone.Router.extend({
	routes: {
		"": "default",
		"wodge" : "wodge",
		"badger" : "badger"
	},
	
	default: function(){
		alert("ARGH!");
	},
	
	badger: function(params) {
		console.log("BADGER", params);
	},
	
	wodge: function(params){
		console.log("WODGE", params);
	}
});
