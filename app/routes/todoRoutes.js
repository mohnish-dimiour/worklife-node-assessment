// routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const todoController = require("../controller/todoController");

// Use authentication middleware for Todo routes
router.use(authMiddleware);

// Todo CRUD endpoints
router.post("/todo", todoController.createTodo);
router.get("/todos", todoController.getAllTodos);
router.get("/todo/:id", todoController.getTodoById);
router.patch("/todo/:id", todoController.updateTodo);
router.delete("/todo/:id", todoController.deleteTodo);

module.exports = router;
