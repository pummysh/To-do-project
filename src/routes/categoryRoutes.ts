import express from 'express';
import { createCategory, getAllCategory } from '../controllers/CategoriesController';

const router = express.Router();

router.get('/get', getAllCategory);
router.post('/create', createCategory);

export default router;