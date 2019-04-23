// Global
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {
	// GET: /
	app.get("/", function (req, res) {
		db.Article.find({
			saved: false
		}).then(function (result) {
			var hbsObject = {
				articles: result
			};
			res.render('index', hbsObject);
		}).catch(function (err) {
			res.json(err)
		});
	});
	
	// GET: /saved
	app.get("/saved", function (req, res) {
		db.Article.aggregate([{
				$match: {
					saved: true
				}
			}
		]).then(function (result, i) {
			var hbsObject = {
				articles: result
			};
			res.render("saved", hbsObject);
		}).catch(function (err) {
			res.json(err)
		});
	});

	app.get("/scrape", function (req, res) {
		db.Article.deleteMany({
			saved: false
		}).then(function (deleted) {
			axios.get("https://www.nytimes.com/section/technology").then(function (response) {
				var $ = cheerio.load(response.data);
				$("div.css-4jyr1y a").each(function (i, element) {
					var result = {};
					result.title = $(this).children("h2").text();
					result.para = $(this).children("p").text();
					db.Article.create(result).then(function (results) {}).catch(function (err) {});
				});
				res.redirect('/');
			}).catch(function (err) {
				res.json(err)
			});
		}).catch(function (err) {
			res.json(err)
		});
	});

	app.post("/save/:id", function (req, res) {
		db.Article.updateOne({
			"_id":req.params.id
		}, {
			"$set": {
				"saved": true
			}
		}).then(function (results) {
			res.redirect("/")
		}).catch(function (err) {
			res.json(err)
		});
	});
	
	app.post("/delete/:id", function (req, res) {
		db.Article.deleteOne({
			_id: req.params.id
		}).then(function (results) {
			res.redirect("/saved")
		}).catch(function (err) {
			res.json(err)
		});
	});
	
	
	app.post("/saveNote/:id", function (req, res) {
		console.log(req.body);
		console.log(req.params.id);
		db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {note: req.body.body}}).then(function (dbNote) {
			res.redirect("/saved");
			}).catch(function (err) {
			res.json(err)
		});
	});

	

	  
	
	
};





