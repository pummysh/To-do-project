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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const user_1 = require("../utils/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const users = yield userRepository.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const hashOfPassword = yield (0, user_1.hashPassword)(password);
        const newUser = userRepository.create({ name, email, password: hashOfPassword });
        yield userRepository.save(newUser);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const users = yield userRepository.findOne({ where: { email: email } });
        const isPasswordCorrect = yield (0, user_1.comparePasswords)(password, users === null || users === void 0 ? void 0 : users.password);
        if (!isPasswordCorrect) {
            res.status(401).json("Either email or password is incorrect");
            return;
        }
        try {
            const token = jsonwebtoken_1.default.sign(Object.assign({}, users), process.env.SHH_KEY, { expiresIn: '1h' });
            res.status(201).json({ token });
        }
        catch (error) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
