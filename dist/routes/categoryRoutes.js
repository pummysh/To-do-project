"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriesController_1 = require("../controllers/CategoriesController");
const router = express_1.default.Router();
router.get('/get', CategoriesController_1.getAllCategory);
router.post('/create', CategoriesController_1.createCategory);
exports.default = router;
