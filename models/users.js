const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
