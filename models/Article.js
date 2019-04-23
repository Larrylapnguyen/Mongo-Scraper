var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title:{
		type:String,
		required: true
	},
	para:{
		type:String,
		required:true
	},
	note:{
		type:String
	},
	saved:{
		type:Boolean,
		default:false
	}
});

var Article = mongoose.model("Article", articleSchema);

module.exports= Article;