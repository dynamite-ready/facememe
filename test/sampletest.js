var server = require("../index.js");
var Browser = require("zombie");
var browser = new Browser();

// browser.debug();

describe("Given that the Faceme homepage was requested...", function(){
	it("It should have the correct title.", function(done){
		browser.visit("http://localhost", function(){
			browser.assert.text("title", "Faceme! for Burberry");
			done();			
		});
    });
	
	it("It should display a list of models.", function(done){
		browser.visit("http://localhost", function(){
			browser.assert.element("#container #models");
			done();			
		});
    });		
});