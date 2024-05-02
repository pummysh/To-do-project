import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TodoCategory } from "./TodoCategory";

@Entity("Categories")
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  name: string;

  @OneToMany(() => TodoCategory, todoCategory => todoCategory.category)
  todo: TodoCategory[] | undefined;

  @Column()
  isActive: boolean;
 
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.name="";
    this.isActive=true;
    this.createdAt=new Date();
    this.updatedAt=new Date()
  }
}
