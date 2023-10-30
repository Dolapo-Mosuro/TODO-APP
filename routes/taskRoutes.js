const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Define the root path route
router.get("/", (req, res) => {
	// You can render a welcome page or redirect to your home page
	res.redirect("/index");
});
// Route for all tasks
router.get("/index", taskController.index);
// Route for creating a new task
router.get("/tasks/create", taskController.renderCreateTask);
router.post("/tasks/create", taskController.createTask);

// Route for rendering the edit task page
router.get("/tasks/edit/:taskId", taskController.renderEditTask);

// Route for updating a task
router.post("/tasks/update/:taskId", taskController.updateTask);

// Route for marking a task as completed
router.post("/tasks/complete/:taskId", taskController.markTaskAsCompleted);

// Route for deleting a task
router.delete("/tasks/delete/:taskId", taskController.deleteTask);

module.exports = router;
