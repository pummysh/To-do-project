"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCategory = void 0;
const typeorm_1 = require("typeorm");
const Todo_1 = require("./Todo");
const Categories_1 = require("./Categories");
let TodoCategory = class TodoCategory {
    constructor() {
        this.todo = 0;
        this.category = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
exports.TodoCategory = TodoCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TodoCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "todoId", type: "integer", nullable: false }),
    (0, typeorm_1.ManyToOne)(() => Todo_1.TodoData, todo => todo.todocategory),
    __metadata("design:type", Number)
], TodoCategory.prototype, "todo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "categoryId", type: "integer", nullable: false }),
    (0, typeorm_1.ManyToOne)(() => Categories_1.Categories, category => category.todo),
    __metadata("design:type", Number)
], TodoCategory.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], TodoCategory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], TodoCategory.prototype, "updatedAt", void 0);
exports.TodoCategory = TodoCategory = __decorate([
    (0, typeorm_1.Entity)("todoCategory"),
    __metadata("design:paramtypes", [])
], TodoCategory);
