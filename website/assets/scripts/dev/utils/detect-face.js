module.exports = {
	function(imageData, callback){
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