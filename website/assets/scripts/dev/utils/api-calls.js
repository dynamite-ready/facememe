var kairosXhrOptions = {
	method: "post",
	contentType: "application/json",
	dataType: "raw",							
	beforeSend: function(request){
		request.setRequestHeader("app_id", "c988513e");
		request.setRequestHeader("app_key", "075693bfbb5e271fa9a0e7df489ff947");
	}
};	

module.exports = {
	detectFace: function(imageData, callback){
		var requestOptions = $.extend(kairosXhrOptions, {
			data: JSON.stringify({ 
				"image": imageData.replace("data:image/jpeg;base64,", ""), 
				"selector": "SETPOSE"
			}),
			complete: function(data){ if(callback) callback(data); }							
		});
		
		$.ajax("https://api.kairos.com/detect", requestOptions);		
	},
	
	enrollFace: function(imageData, imageId, callback){
		var requestOptions = $.extend(kairosXhrOptions, {
			data: JSON.stringify({ 
				"image": imageData, // Will be a standard image url. 
				"subject_id": imageId, 
				"gallery_name": "supermodels",
				"multiple_faces": false,
				"selector": "SETPOSE"
			}),						
			complete: function(data){ if(callback) callback(data); }				
		});
		
		$.ajax("https://api.kairos.com/enroll", requestOptions);		
	},
	
	recognizeFaces: function(imageData, callback){
		var requestOptions = $.extend(kairosXhrOptions, {
			data: JSON.stringify({ 
				"image": imageData.replace("data:image/jpeg;base64,", ""), 
				"gallery_name": "supermodels",
				"selector": "SETPOSE",
				"threshold": 0.45
			}),
			complete: function(data){ if(callback) callback(data); }	
		});
		
		$.ajax("https://api.kairos.com/recognize", requestOptions);
	}
}