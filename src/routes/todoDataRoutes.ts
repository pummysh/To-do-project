import express from 'express';
import { createTodoData, getAllTodoData, searchTodoData } from '../controllers/todoControllers';

const router = express.Router();

router.get('/get', getAllTodoData);
router.post('/create', createTodoData);
router.post('/search', searchTodoData);

export default router;