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
import { Addresses } from "./Addresses";
import { Departments } from "./Departments";
import { Users } from "./Users";

@Index("department_id", ["departmentId"], {})
@Entity("cities", { schema: "parchon" })
export class Cities extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("int", { name: "department_id", nullable: true })
  departmentId: number | null;

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

  @OneToMany(() => Addresses, (addresses) => addresses.city)
  addresses: Addresses[];

  @ManyToOne(() => Departments, (departments) => departments.cities, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "department_id", referencedColumnName: "id" }])
  department: Departments;

  @OneToMany(() => Users, (users) => users.city)
  users: Users[];
}
