import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Locals } from "./Locals";
import { Roles } from "./Roles";

@Index("email", ["email"], { unique: true })
@Index("identification", ["identification"], { unique: true })
@Index("idx_role_id", ["roleId"], {})
@Entity("owners", { schema: "parchon" })
export class Owners extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("varchar", { name: "last_name", length: 100 })
  lastName: string;

  @Column("varchar", { name: "cellphone", nullable: true, length: 10 })
  cellphone: string | null;

  @Column("varchar", { name: "identification", unique: true, length: 10 })
  identification: string;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("int", { name: "role_id" })
  roleId: number;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(() => Locals, (locals) => locals.owner)
  locals: Locals[];

  @ManyToOne(() => Roles, (roles) => roles.owners, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}