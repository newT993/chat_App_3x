import express from 'express'
import { getMe } from '../controller/userController.js';
import proWare from '../middleware/proWare.js';
const router = express.Router();

router.get('/me',proWare, getMe)

export default router