const mongoose = require('mongoose')

const Schema = mongoose.Schema

const descriptionSchema = new Schema(
	{
		// title: {
		// 	type: String,
		// 	required: true,
		// },
		content: {
			type: String,
			default: null,
			nulable: true
		},
        // owner: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User'
        // }
	},
	{
		timestamps: true,
	}
)

module.exports = descriptionSchema
