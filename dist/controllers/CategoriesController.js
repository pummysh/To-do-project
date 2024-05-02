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
exports.createCategory = exports.getAllCategory = void 0;
const typeorm_1 = require("typeorm");
const Categories_1 = require("../entities/Categories");
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryRepository = (0, typeorm_1.getRepository)(Categories_1.Categories);
        const allCategoryData = yield categoryRepository.find();
        res.status(200).json(allCategoryData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllCategory = getAllCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const categoryRepository = (0, typeorm_1.getRepository)(Categories_1.Categories);
        const newUser = categoryRepository.create({ name });
        yield categoryRepository.save(newUser);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createCategory = createCategory;
