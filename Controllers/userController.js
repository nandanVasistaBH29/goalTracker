// dependencies
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
//imports
import User from '../Model/userModel.js'; //don't forget to add .js extension here it is not react

//supporting functions
const generateTokenAuth = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

//controllers
//register
export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body.name);
  console.log(req.body.username);
  console.log(req.body.email);
  console.log(req.body.password);
  const { name, username, email, password } = req.body;
  //validation
  if (!name || !username || !email || !password)
    throw new Error('Please Enter All The Details');

  //check if the user has already register
  const userExist = await User.findOne({ email }); //Can use username also as that is unique too
  if (userExist) throw new Error('User Already Exist');

  //hash the password
  const salt = await bcrypt.genSalt(10); //10 is max ig
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a new user
  const newUser = await User.create({
    name, // same as name:name,
    username,
    password: hashedPassword,
    email,
  });
  if (newUser) {
    //if the new User has been successfully created
    res.status(201).json({
      _id: newUser.id, //this comes from MongoDb
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password, //check it wont be the password entered
      token: generateTokenAuth(newUser.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

//login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
    //login successful
    res.status(201).json({
      _id: checkUser.id,
      name: checkUser.name,
      email: checkUser.email,
      password: checkUser.password,
      token: generateTokenAuth(checkUser.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});
// private get this made private by adding a middleware in the router file
//which will see the token which is passed in the headers (Bearer token) and verifies it using jwt.verify(token,with the signature of token)
// route /api/users/me
export const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({ id: _id, name, email });
});
