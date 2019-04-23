var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
var app = express();

app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

require("./controller/controller.js")(app);

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.use(express.static("public"));


var PORT = 3050;
app.listen(PORT, function () {
	console.log("App running on port " + PORT + "!");
});