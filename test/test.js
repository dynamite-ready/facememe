var server = require("../index.js");
var Browser = require("zombie");
var browser = new Browser();

// browser.debug();

describe("Given that the Facememe homepage was requested...", function(){
	before(function(done){
		browser.visit("http://localhost", function(){ done(); });
	});
	
	it("It should have the correct title.", function(done){
		browser.assert.text("title", "Facememe...");
		done();			
    });
	
	it("It should display an empty image frame.", function(done){
		browser.wait({ element: "#user-image-frame" }).
			then(function(){
				browser.assert.element("#user-image-frame");
				done();			
			});
    });

	it("It should display an upload button.", function(done){
		browser.wait({ element: "#actions .upload" }).
			then(function(){
				browser.assert.element("#actions .upload");
				done();			
			});
    });
});