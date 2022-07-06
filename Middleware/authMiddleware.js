//imports
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Model/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

//our middleware which prevents unAuthorized access to todos
export const protect = asyncHandler(async (req, res, next) => {
  //next don't forget
  let token;
  //token-> Bearer Token grab it from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //[0]Bearer [1]token
      //get token from header
      token = req.headers.authorization.split(' ')[1];
      //verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      //remember when we created jwt token we passed in id as payload
      next();
    } catch (error) {
      res.status(401);
      throw new Error('not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('no token');
  }
});
