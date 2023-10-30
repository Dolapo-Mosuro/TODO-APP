const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

const renderRegister = async (req, res) => {
	await res.render("register");
};

// Render the login page
const renderLogin = async (req, res) => {
	await res.render("login");
};

const userRegister = async (req, res) => {
	const { username, password, email } = req.body;

	try {
		// Check if the user already exists
		const existingUser = await userModel.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new userModel({
			username,
			password: hashedPassword,
			email,
		});

		await newUser.save();

		// Generate a JWT token
		const token = jwt.sign({ userId: newUser._id }, secretKey, {
			expiresIn: "1h",
		});

		res.status(201).json({ token, userId: newUser._id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Registration failed" });
	}
	await res.render("registrationSuccess");
};

const userLogin = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Check if the user exists
		const user = await userModel.findOne({ username });
		({ username });
		if (!user) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		// Check if the password matches
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		// Generate a JWT token
		const token = jwt.sign({ userId: user._id }, secretKey, {
			expiresIn: "1h",
		});

		res.json({ token, userId: user._id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Login failed" });
	}
	await res.render("dashboard");
};
const userLogout = (req, res) => {
	// Log the user out by destroying the session
	req.logout();

	// Redirect to the desired page (e.g., login page)
	res.redirect("/login");
};

module.exports = {
	renderRegister,
	renderLogin,
	userRegister,
	userLogin,
	userLogout,
};
