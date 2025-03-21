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
import { Cities } from "./Cities";
import { Locals } from "./Locals";
import { Places } from "./Places";
import { Services } from "./Services";

@Index("city_id", ["cityId"], {})
@Entity("addresses", { schema: "parchon" })
export class Addresses extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "street", length: 255 })
  street: string;

  @Column("int", { name: "city_id", nullable: true })
  cityId: number | null;

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

  @ManyToOne(() => Cities, (cities) => cities.addresses, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: Cities;

  @OneToMany(() => Locals, (locals) => locals.address)
  locals: Locals[];

  @OneToMany(() => Places, (places) => places.address)
  places: Places[];

  @OneToMany(() => Services, (services) => services.address)
  services: Services[];
}
