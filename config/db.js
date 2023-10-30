const mongoose = require("mongoose");

require("dotenv").config();

// database connection
const connectDb = async () => {
	try {
		mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Listen for the MongoDB connection event
		mongoose.connection.on("connected", () => {
			console.log("Connected to MongoDB");
		});

		// Handle any MongoDB connection errors
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

module.exports = { connectDb, db: mongoose.connection };
