module.exports = Backbone.View.extend({
	// Expect:
	// this.modelProfiles.
	el: '#container',
	// It's the first function called when this view it's instantiated.
	initialize: function(){
		this.render();
	},
	// $el - it's a cached jQuery object (el), in which you can use jQuery functions
	//       to push content. Like the Hello World in this case.
	render: function(){
		var _self = this;
		_self.$el.html("WALTER");
		console.log("CUNT", JSON.stringify(this.collection));
	}
});