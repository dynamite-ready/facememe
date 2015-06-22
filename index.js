var express = require("express");
var http = require("http");
var application = express();

http.globalAgent.maxSockets = 200;

application.use(express.static("website/markup"));
application.use(express.static("website/assets"));
	
application.listen(80);