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
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
// Middleware function to authenticate user
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the token from request headers
        const token = req.headers.authorization;
        // const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - Token not provided' });
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SHH_KEY);
        console.log(decoded, "decoded");
        // Fetch user from database based on token payload
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        // Attach user object to request for further use
        req.user = user;
        // Continue to next middleware
        next();
    }
    catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.authenticateUser = authenticateUser;
