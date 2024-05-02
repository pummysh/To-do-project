import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TodoData } from "./Todo";

@Entity("user")
@Unique(["email"]) 

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => TodoData, todoData => todoData.user)
  todoData: TodoData[] | undefined;

  @Column({ nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.name = "";
    this.email="";
    this.password="";
    this.isActive=true;
    this.createdAt=new Date();
    this.updatedAt=new Date()
  }
}
