const mongoose = require('mongoose')
const descriptionSchema = require('./description')

// Getting the Schema from Mongoose
const Schema = mongoose.Schema

// Creating a new car Schema
const carSchema = new Schema(
	{
		make: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		// class: {
		// 	type: String,
		// 	required: true,
		// },
		// drive: {
		// 	type: Number,
		// 	required: true,
		// 	min: 2,
		// 	max: 4,
		// },
        // miles:{
        //     type:Number,
        //     required: true,
        //     min: 0 ,
        //     max: 1000000
        // },
        // description:[descriptionSchema]
	},
	{
		timestamps: true,
	}
)

// Creating a Mongoose Model called Character
// Collection will be called cars
const Car = mongoose.model('Car', carSchema)

// Exporting Character model to use elsewhere
module.exports = Car