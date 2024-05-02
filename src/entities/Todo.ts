import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { TodoCategory } from "./TodoCategory";

enum AllowedStatus {
  Completed = "Completed",
  Pending = "Pending",
  Progress = "Progress",
}

enum AllowedPriority {
  medium = "medium",
  high = "high",
  low = "low",
}

@Entity("tododata")
export class TodoData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "enum", enum: AllowedStatus })
  status: AllowedStatus;

  @Column({ nullable: false })
  title: string;

  @Column()
  discription: string;

  @Column({type: "enum", enum: AllowedPriority })
  priority: string;

  @Column({ nullable: false })
  dueDate: string;

  
  @Column()
  notes: string;

  @Column()
  file: string;

  @Column({name:"userId",type:"integer",nullable:false})
  @ManyToOne(() => User, user => user.todoData)
  user: number;

  @OneToMany(() => TodoCategory, todoCategory => todoCategory.todo)
  todocategory: TodoCategory[] | undefined;

  @Column()
  isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.status = AllowedStatus.Pending;
    this.title="";
    this.discription="",
    this.priority = AllowedPriority.low;
    this.dueDate="";
    this.notes="";
    this.file="";
    this.isActive=true;
    this.createdAt=new Date();
    this.updatedAt=new Date();
    this.user=0;
  }
}
