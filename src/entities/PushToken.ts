// src/entities/PushToken.ts
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
  } from "typeorm";
  import { Users } from "./Users";
  
  @Entity("push_tokens")
  export class PushToken extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 255 })
    token: string;
  
    @Column()
    userId: number;
  
    @ManyToOne(() => Users, (user) => user.pushTokens, {
      onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user: Users;
  }
  