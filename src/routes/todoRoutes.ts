import express from "express";
import { getAllTodos, addTodo } from "../controllers/todoController";
const router = express.Router();

/**
 * @openapi
 * /api/v1/todos:
 *   post:
 *     tags:
 *       - Todos
 *     description: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Invalid data sent
 */

/**
 * @openapi
 * /api/v1/todos:
 *   get:
 *     tags:
 *       - Todos
 *     description: Get all todos
 *     responses:
 *       200:
 *         description: successfully queued all todos
 *       400:
 *         description: Unable to get Todos
 */
router
  .route("/")
  .get(getAllTodos) // GET  http://localhost:8000/todos
  .post(addTodo); // POST  http://localhost:8000/todos

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   get:
 *     tags:
 *       - Todos
 *     description: Get a todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the todo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: todo data retrieved successfully
 *       404:
 *         description: todo not found
 */
router.route("/:id");

export default router;
