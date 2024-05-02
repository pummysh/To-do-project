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
const express = require("express");
const typeorm_1 = require("typeorm");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const todoDataRoutes_1 = __importDefault(require("./routes/todoDataRoutes"));
const Authenticate_1 = require("./middlewares/Authenticate");
const app = express();
app.use(express.json());
app.use("/users", userRoutes_1.default);
app.use("/category", categoryRoutes_1.default);
app.use("/todo", Authenticate_1.authenticateUser, todoDataRoutes_1.default);
(0, typeorm_1.createConnection)()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to database");
}))
    .catch((error) => {
    console.error("Error connecting to database:", error);
});
app.listen(8000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("listening on port 8000");
}));
