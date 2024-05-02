"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoData = exports.getAllTodoData = void 0;
const typeorm_1 = require("typeorm");
const Todo_1 = require("../entities/Todo");
const TodoCategory_1 = require("../entities/TodoCategory");
const getAllTodoData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const todoRepository = (0, typeorm_1.getRepository)(Todo_1.TodoData);
        const todoCategory = (0, typeorm_1.getRepository)(TodoCategory_1.TodoCategory);
        //         const todo:TodoData[] = await todoRepository.find({where : 
        //             {user:{
        //             id:user.id
        //         }},
        //         relations:['user']
        //     });
        // console.log(todo[0].id,"ssdds")
        //     let todoDataWithCategory=todo.map(async(e)=>{
        //         const todoCategoryData= await todoCategory.find({where : {todo :e.id},relations:['todo','category']});
        //         return {
        //             ...e
        //         }
        //     })
        // console.log(todo[0].id,todo,'testingg');
        const todoCategoryData = yield todoCategory.find();
        console.log(todoCategoryData);
        res.status(200).json({ todoCategoryData });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllTodoData = getAllTodoData;
const createTodoData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const todoRepository = (0, typeorm_1.getRepository)(Todo_1.TodoData);
        const todoCategory = (0, typeorm_1.getRepository)(TodoCategory_1.TodoCategory);
        const category = req.body.category;
        const newTodo = todoRepository.create(Object.assign(Object.assign({}, req.body), { user }));
        yield todoRepository.save(newTodo);
        const reqBodyForCategory = yield category.map((e) => {
            return {
                todo: newTodo.id,
                category: e
            };
        });
        console.log(reqBodyForCategory, "reqBodyForCategory");
        let temp = todoCategory.create(reqBodyForCategory);
        yield todoCategory.save(temp);
        res.status(201).json(newTodo);
    }
    catch (error) {
        console.log(error, "errorFF");
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createTodoData = createTodoData;
