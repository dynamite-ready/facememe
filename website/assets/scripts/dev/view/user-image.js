var filebutton = require("file-button");
var DisplayModelTemplate = require("../../../templates/user-image.html");

module.exports = Backbone.View.extend({
	el: "#container",
	
    events: {
		"click .snapshot": "takeCameraSnapshot",
    },	
	
	initialize: function(){
		this.render();
	},

	render: function(){
		var models = this.collection;
		
		this.$el.prepend($(DisplayModelTemplate));
		this.setupFileUploadButton();
		this.setupCameraCapture();
		
		this.$el.find(".button.snapshot").addClass("hide");
		this.$el.find("#loading").fadeOut();
		
		document.documentElement.requestFullscreen();
	},
	
	setupFileUploadButton: function(){
		var _self = this;
		filebutton.
			create(). // create the instance
			on("fileinput", function(value){
				_self.uploadImage(_self, value);
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
				_self.$el.find("#video-preview, #actions .snapshot").addClass("hide");
			} else {
				_self.$el.find("#actions .snapshot").removeClass("hide");
				_self.$el.find("#upload-preview").addClass("hide");
			}
		});
		
		this.rtc2images = rtc2images;
	},
	
	takeCameraSnapshot: function(e){
		var _self = this;
		e.preventDefault();
		this.rtc2images.recordVideo(function(err, frames){
			if(err){ 
				console.log(err);
			} else {
				console.log(frames);
				_self.displayFinalImage(frames[0]);
			}
		});
	},

	uploadImage: function(_self, value){
		var filereader = new FileReader();
		filereader.readAsDataURL(value.files[0]);
		filereader.onload = function(filereaderEvent){
			_self.displayFinalImage(filereaderEvent.target.result);
		}
	},
	
	displayFinalImage: function(image){
		var _self = this;
		
		// Image should be a base64 encode image.
		this.$el.find("#video-preview, #actions .button").addClass("hide");
		this.$el.find("#upload-preview").removeClass("hide");
		this.$el.find("#upload-preview").attr("src", image);
		
		window.setTimeout(function(){
			_self.$el.find("#loading").fadeIn();
		}, 3000);
	}
});