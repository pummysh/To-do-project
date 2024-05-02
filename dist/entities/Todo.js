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
exports.TodoData = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const TodoCategory_1 = require("./TodoCategory");
var AllowedStatus;
(function (AllowedStatus) {
    AllowedStatus["Completed"] = "Completed";
    AllowedStatus["Pending"] = "Pending";
    AllowedStatus["Progress"] = "Progress";
})(AllowedStatus || (AllowedStatus = {}));
var AllowedPriority;
(function (AllowedPriority) {
    AllowedPriority["medium"] = "medium";
    AllowedPriority["high"] = "high";
    AllowedPriority["low"] = "low";
})(AllowedPriority || (AllowedPriority = {}));
let TodoData = class TodoData {
    constructor() {
        this.id = 0;
        this.status = AllowedStatus.Pending;
        this.title = "";
        this.discription = "",
            this.priority = AllowedPriority.low;
        this.dueDate = "";
        this.notes = "";
        this.file = "";
        this.isActive = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.user = 0;
    }
};
exports.TodoData = TodoData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TodoData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AllowedStatus }),
    __metadata("design:type", String)
], TodoData.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], TodoData.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TodoData.prototype, "discription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AllowedPriority }),
    __metadata("design:type", String)
], TodoData.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], TodoData.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TodoData.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TodoData.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "userId", type: "integer", nullable: false }),
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.todoData),
    __metadata("design:type", Number)
], TodoData.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TodoCategory_1.TodoCategory, todoCategory => todoCategory.todo),
    __metadata("design:type", Object)
], TodoData.prototype, "todocategory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], TodoData.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], TodoData.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], TodoData.prototype, "updatedAt", void 0);
exports.TodoData = TodoData = __decorate([
    (0, typeorm_1.Entity)("tododata"),
    __metadata("design:paramtypes", [])
], TodoData);
