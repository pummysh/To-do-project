import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Categories } from '../entities/Categories';

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const categoryRepository = getRepository(Categories);
        const allCategoryData = await categoryRepository.find();
        res.status(200).json(allCategoryData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const categoryRepository = getRepository(Categories);
        const newUser = categoryRepository.create({ name });
        await categoryRepository.save(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
