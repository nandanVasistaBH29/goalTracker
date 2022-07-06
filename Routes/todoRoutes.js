import express from 'express';
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
} from '../Controllers/todoController.js';
import { protect } from '../Middleware/authMiddleware.js';

const todoRouter = express.Router();
todoRouter.get('/', protect, getTodos);
todoRouter.post('/', protect, postTodo);
todoRouter.put('/:id', protect, updateTodo);
todoRouter.delete('/:id', protect, deleteTodo);
export default todoRouter;
