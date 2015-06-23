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
		// Initial view.
		var displayModelList = new ModelList({collection: modelProfiles});
		
		var Webrtc2images = require('webrtc2images');
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
			}
			
			alert();
		});

		$(".snapshot").on("click", function(e){
			e.preventDefault();
			rtc2images.recordVideo(function(err, frames){
				if (err) {
				  console.log(err);
				} else {
				  console.log(frames);
				  detectFace(String(frames[0]));
				}
			});
		});

		var filebutton = require('file-button');
		 
		filebutton.
			create(). // create the instance
			on("fileinput", function(value){
				console.log(value.files, "BASTARD");
				var filereader = new FileReader();
				filereader.readAsDataURL(value.files[0]);
				filereader.onload = function(filereaderEvent){
					$("#upload-preview").attr("src", filereaderEvent.target.result);
					detectFace(String(filereaderEvent.target.result));
				}
			}).
			mount($(".upload")[0]); // mount the view on the button
	}
	
	function detectFace(imageData, callback){
		$.ajax(
			"https://api.kairos.com/detect", 
			{
				method: "post",
				contentType: "application/json",
				dataType: "raw",							
				// crossDomain: true,
				beforeSend: function(request){
					request.setRequestHeader("app_id", "c988513e");
					request.setRequestHeader("app_key", "075693bfbb5e271fa9a0e7df489ff947");
				},						
				data: JSON.stringify({ 
					"image": imageData.replace("data:image/jpeg;base64,", ""), 
					"selector": "FULL"
				}),
				success: function(data){
					console.log(data);
					if(callback) callback(data);
				}
			}
		);		
	}
}

	// Initialise on document ready.
$(document).on("ready", main);
