import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Roles } from "./Roles";
import { Cities } from "./Cities";

@Index("email", ["email"], { unique: true })
@Index("idx_city_id", ["cityId"], {})
@Index("role_id", ["roleId"], {})
@Entity("users", { schema: "parchon" })
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("varchar", { name: "last_name", length: 100 })
  lastName: string;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "cellphone", nullable: true, length: 10 })
  cellphone: string | null;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("date", { name: "birth_date" })
  birthDate: string;

  @Column("int", { name: "city_id", nullable: true })
  cityId: number | null;

  @Column("int", { name: "role_id", nullable: true, default: 1  })
  roleId: number | null;

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

  @ManyToOne(() => Roles, (roles) => roles.users, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;

  @ManyToOne(() => Cities, (cities) => cities.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: Cities;
}
