import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admins } from "./Admins";
import { Owners } from "./Owners";
import { RolePermission } from "./RolePermission";
import { Users } from "./Users";

@Index("name", ["name"], { unique: true })
@Entity("roles", { schema: "parchon" })
export class Roles extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("text", { name: "description" })
  description: string;

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

  @OneToMany(() => Admins, (admins) => admins.role)
  admins: Admins[];

  @OneToMany(() => Owners, (owners) => owners.role)
  owners: Owners[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}
