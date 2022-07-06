//dependencies
import asyncHandler from 'express-async-handler';
//imports
import Todo from '../Model/todoModel.js';
import User from '../Model/userModel.js';

export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.status(201).json(todos);
});
//add new todo is post
export const postTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Add Your Todo');
  }
  const newTodo = await Todo.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(newTodo);
});
export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id); // /:id
  //check if the todo exist to delete
  if (!todo) {
    res.status(400);
    throw new Error('Todo not found');
  }
  //check whether the user exist
  const user = await User.findById(req.user.id);
  if (!user) {
    res.send(401);
    throw new Error('user not found');
  }
  //check whether logged in user has a todo which is matching
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error('user is not authorized to delete');
  }
  await todo.remove();
  res.status(200).json({ id: req.params.id });
});
export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id); // /:id
  //check if the todo exist to delete
  if (!todo) {
    res.status(400);
    throw new Error('Todo not found');
  }
  //check whether the user exist
  const user = await User.findById(req.user.id);
  if (!user) {
    res.send(401);
    throw new Error('user not found');
  }
  //check whether logged in user has a todo which is matching
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error('user is not authorized to delete');
  }
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updated);
});
