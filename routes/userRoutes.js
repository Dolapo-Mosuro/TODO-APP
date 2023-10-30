// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//render the login page
router.get("/login", userController.renderLogin);

// Route for user login
router.post("/login", userController.userLogin);

//render the register page
router.get("/register", userController.renderRegister);

// Route for user registration
router.post("/register", userController.userRegister);

// Route for user logout
router.get("/logout", userController.userLogout);

module.exports = router;
