import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from "bcrypt";
import { comparePasswords, hashPassword } from '../utils/user';
import jwt from "jsonwebtoken"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name,email,password } = req.body;
        const userRepository = getRepository(User);
        const hashOfPassword=await hashPassword(password);
        const newUser = userRepository.create({ name,email,password:hashOfPassword });
        await userRepository.save(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email,password } = req.body;
        const userRepository = getRepository(User);
        const users:User | any = await userRepository.findOne({where : {email:email}});
        const isPasswordCorrect=await comparePasswords(password,users?.password);
        if(!isPasswordCorrect){
            res.status(401).json("Either email or password is incorrect");
            return;
        }
       try{
        const token = jwt.sign({...users}, process.env.SHH_KEY!,{ expiresIn: '1h' });
        res.status(201).json({token});
       }catch(error){
        res.status(500).json({ error: 'Something went wrong' });
       }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
