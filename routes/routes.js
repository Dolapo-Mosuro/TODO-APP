// routes/routes.js
const express = require("express");
const router = express.Router();

// Define the root path route
router.get("/", (req, res) => {
	// You can render a welcome page or redirect to your home page
	res.redirect("/home");
});

module.exports = router;
