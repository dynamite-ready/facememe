var express = require("express");
var http = require("http");
var application = express();

global.event = require("events").EventEmitter;

http.globalAgent.maxSockets = 200;

/* Home...
application.route("/"). 
	get(function(req, res, next){ 
		res.send("COOL..."); 
	});	
*/
	
// Here's a route declaration, with an action on a specific method...
// I can see why people like this.	
application.route("/create"). 
	get(function(req, res, next){ 
		res.send("CREATE"); 
	});

// Here's a route declaration, with an action on a specific method...
// I can see why people like this.	
application.route("/delete"). 
	get(function(req, res, next){ 
		res.send("DELETE"); 
	});
	
// Here's a route declaration, with an action on a specific method...
// I can see why people like this.	
application.route("/update"). 
	get(function(req, res, next){ 
		res.send("UPDATE"); 
	});	
	
application.use(express.static("website/markup"));
application.use(express.static("website/assets"));
	
application.listen(80);