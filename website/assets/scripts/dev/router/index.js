module.exports = Backbone.Router.extend({
	routes: {
		"wodge" : "wodge",
		"badger" : "badger"
	},
	
	badger: function(params) {
		console.log("BADGER", params);
	},
	
	wodge: function(params){
		console.log("WODGE", params);
	}
});
