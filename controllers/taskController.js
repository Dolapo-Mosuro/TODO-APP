const express = require("express");
const router = express.Router();
const taskModel = require("../models/tasks");

// Home page
const index = async (req, res) => {
	try {
		// Retrieve tasks from the database, e.g., using Task.find()
		const tasks = await taskModel.find();

		// Render the 'home.ejs' template with the tasks data
		res.render("index", { tasks });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching tasks" });
	}
};

// Create Task page
const renderCreateTask = (req, res) => {
	res.render("createtask");
};
// Function to handle the creation of a new task
const createTask = async (req, res) => {
	const { title, description } = req.body;

	// Validate the form data (e.g., check for required fields)

	try {
		// Create a new task
		const newTask = new taskModel({ title, description });

		// Save the new task to the database
		await newTask.save();

		// Redirect to the home page or a task list page
		res.redirect("/tasks"); // You can adjust the redirect URL as needed
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error creating the task" });
	}
};

// Edit Task page
const renderEditTask = async (req, res) => {
	const taskId = req.params.taskId;
	try {
		const task = await taskModel.findById(taskId);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.render("edittask", { task });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching task details" });
	}
};

// Handle form submission for updating a task
const updateTask = async (req, res) => {
	const taskId = req.params.taskId;
	const { title, description } = req.body;

	// Validate the form data (e.g., check for required fields)

	try {
		// Update the task in the database
		const updatedTask = await taskModel.findByIdAndUpdate(
			taskId,
			{ title, description },
			{ new: true } // Return the updated task
		);

		if (!updatedTask) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.redirect("/index");
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating the task" });
	}
};
const markTaskAsCompleted = async (req, res) => {
	const taskId = req.params.taskId;

	try {
		// Update the task's status to 'completed' in the database
		const updatedTask = await Task.findByIdAndUpdate(
			taskId,
			{ status: "completed" },
			{ new: true } // Return the updated task
		);

		if (!updatedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		// Redirect to the home page or a task list page
		res.redirect("/tasks"); // You can adjust the redirect URL as needed
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error marking the task as completed" });
	}
};

// Handle form submission for deleting a task
const deleteTask = async (req, res) => {
	try {
		// Delete the task from the database
		const deletedTask = await Task.findByIdAndRemove(taskId);

		if (!deletedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		// Redirect to the home page or a task list page
		res.redirect("/index");
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error deleting the task" });
	}
};

const taskController = {
	index,
	renderCreateTask,
	renderEditTask,
	createTask,
	updateTask,
	markTaskAsCompleted,
	deleteTask,
	nav: ["home", "create", "edit", "complete", "delete"],
};

module.exports = taskController;
