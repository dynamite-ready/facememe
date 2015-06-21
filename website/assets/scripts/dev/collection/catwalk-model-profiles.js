var ProfileModel = require("../model/catwalk-model-profile.js");

module.exports = Backbone.Collection.extend({
	model: ProfileModel,
	localStorage: new Backbone.LocalStorage("profile-models")
});