import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { TodoData } from "./Todo";
import { Categories } from "./Categories";

@Entity("todoCategory")
export class TodoCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name:"todoId",type:"integer",nullable:false})
  @ManyToOne(() => TodoData, todo => todo.todocategory)
  todo: number;

  @Column({name:"categoryId",type:"integer",nullable:false})
  @ManyToOne(() => Categories, category => category.todo)
  category: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    this.todo = 0;
    this.category=0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
