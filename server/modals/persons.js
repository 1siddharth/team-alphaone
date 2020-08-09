var express = require('express')
var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PersonSchema = new Schema(
{
username: {
	type:String,
	required :true,
},
password: {
	type:String,
	required :true,	
},
email: {
	type:String,
	required :true,	
},
country:{

type:String	
},
date: {
	type:Date,
	default : Date.now,	
}

}
	)
module.exports =Person= mongoose.model("Myperson" , PersonSchema)



