const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	state: {
		type: String,
		enum: ["pending", "completed", "deleted"],
		default: "pending",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "userModel", // Reference to the User model
	},
	start: {
		type: Date,
		default: Date.now,
	},
	end: {
		type: Date,
		default: Date.now, // Set a default value of the current date and time
	},
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
