var DisplayModelTemplate = require("../../../templates/user-image.html");
var filebutton = require("file-button");

module.exports = Backbone.View.extend({
	el: "#container",
	
    events: {
		"click .snapshot": "takeCameraSnapshot"
    },	
	
	initialize: function(){
		this.render();
	},

	render: function(){
		var models = this.collection;
		
		this.$el.prepend($(DisplayModelTemplate));
		this.setupFileUploadButton();
		this.setupCameraCapture();
		
		this.$el.find("#loading").hide();
	},
	
	setupFileUploadButton: function(){
		filebutton.
			create(). // create the instance
			on("fileinput", function(value){
				console.log(value.files, "BASTARD");
				var filereader = new FileReader();
				filereader.readAsDataURL(value.files[0]);
				filereader.onload = function(filereaderEvent){
					this.$el.find("#upload-preview").attr("src", filereaderEvent.target.result);
					detectFace(String(filereaderEvent.target.result));
				}
			}).
			mount($(".upload")[0]); // mount the view on the button
	},
	
	setupCameraCapture: function(){
		var _self = this;
		var Webrtc2images = require("webrtc2images");
		var rtc2images = new Webrtc2images({
			width: 320,
			height: 400,
			frames: 1,
			type: "image/jpeg",
			quality: 0.6,
			interval: 200
		});
	 
		rtc2images.startVideo(function(err){
			if(err){ 
				console.log(err); 
				_self.$el.find("#video-preview, #actions .snapshot").hide();
			} else _self.$el.find("#upload-preview").hide();
		});
		
		this.rtc2images = rtc2images;
	},
	
	takeCameraSnapshot: function(e){
		e.preventDefault();
		
		this.rtc2images.recordVideo(function(err, frames){
			if(err){ 
				console.log(err);
			} else {
				console.log(frames);
			}
		});
	}		
});