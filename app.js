const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const passport = require("passport");
const expressSession = require("express-session");
const { connectDb } = require("./config/db");
require("dotenv").config();
require("./config/db");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const taskModel = require("./models/tasks");
const userModel = require("./models/users");
const secretKey = process.env.JWT_SECRET;
const PORT = process.env.PORT; // You were missing the const keyword

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Use your routes

app.use("/", taskRoutes);

app.use(require("./routes/userRoutes"));
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
// Static files setup
app.use(express.static(path.join(__dirname, "public")));

app.use("/", taskRoutes);

// Use Passport and its session configuration
// app.use(
// 	expressSession({
// 		secret: secretKey,
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );
// app.use(passport.initialize());
// app.use(passport.session());

// Start the server
connectDb()
	.then(() => {
		// The database is connected, start the server
		app.listen(PORT, () => {
			console.log(`Server is running at : http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to connect to the database:", error);
	});
