"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoControllers_1 = require("../controllers/todoControllers");
const router = express_1.default.Router();
router.get('/get', todoControllers_1.getAllTodoData);
router.post('/create', todoControllers_1.createTodoData);
exports.default = router;
