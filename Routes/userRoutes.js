import express from 'express';
import {
  getMe,
  loginUser,
  registerUser,
} from '../Controllers/userController.js';
import { protect } from '../Middleware/authMiddleware.js';
const router = express.Router();
router.post('/', registerUser);
router.post('/login', loginUser);
// need to put a middle ware
router.get('/me', protect, getMe);
export default router;
