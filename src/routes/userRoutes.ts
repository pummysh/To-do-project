import express from 'express';

import { getAllUsers, createUser, loginUser } from '../controllers/userController';

const router = express.Router();

router.get('/get', getAllUsers);
router.post('/create', createUser);
router.post('/login', loginUser);

export default router;
