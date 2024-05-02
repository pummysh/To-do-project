import { Request, Response } from "express";
import { Like, getRepository } from "typeorm";
import { TodoData } from "../entities/Todo";
import { TodoCategory } from "../entities/TodoCategory";
import { Categories } from "../entities/Categories";
import { User } from "../entities/User";

export const getAllTodoData = async (req: Request, res: Response) => {
  try {
    const userData = (req as any).user;
    const todoRepository = getRepository(TodoData);
    const data = await todoRepository.find({
      where: { user: userData.id },
      relations: ["todocategory"],
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchTodoData = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.body.search;
    const userData = (req as any).user;
    const todoRepository = getRepository(TodoData);
    const todoData = await todoRepository.find({
      where: [
        { title: Like(`%${searchTerm}%`) },
        { discription: Like(`%${searchTerm}%`) },
      ],
      relations: ["todocategory"],
    });

    res.status(200).json({ todoData });
  } catch (error) {
    console.error("Error occurred while searching TodoData:", error);
    throw error;
  }
};

export const createTodoData = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const todoRepository = getRepository(TodoData);
    const todoCategory = getRepository(TodoCategory);
    const category = req.body.category;
    const newTodo: any = todoRepository.create({ ...req.body, user: user.id });
    await todoRepository.save(newTodo);
    const reqBodyForCategory = await category.map((e: any) => {
      return {
        todo: newTodo.id,
        category: e,
      };
    });
    let temp = todoCategory.create(reqBodyForCategory);
    await todoCategory.save(temp);
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error, "errorFF");
    res.status(500).json({ error: "Internal server error" });
  }
};
