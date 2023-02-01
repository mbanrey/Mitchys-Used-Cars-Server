const mongoose = require('mongoose')

const Schema = mongoose.Schema

const descriptionSchema = new Schema(
	{
		
		content: {
			type: String,
			default: null,
			nulable: true
		},
       
	},
	{
		timestamps: true,
	}
)

module.exports = descriptionSchema
