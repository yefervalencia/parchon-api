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
import { ImagesServices } from "./ImagesServices";
import { Addresses } from "./Addresses";
import { CategoriesServices } from "./CategoriesServices";

@Index("category_service_id", ["categoryServiceId"], {})
@Index("idx_address_id", ["addressId"], {})
@Entity("services", { schema: "parchon" })
export class Services extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "address_id", nullable: true })
  addressId: number | null;

  @Column("varchar", { name: "cellphone", nullable: true, length: 10 })
  cellphone: string | null;

  @Column("int", { name: "category_service_id", nullable: true })
  categoryServiceId: number | null;

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

  @OneToMany(() => ImagesServices, (imagesServices) => imagesServices.service)
  imagesServices: ImagesServices[];

  @ManyToOne(() => Addresses, (addresses) => addresses.services, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address: Addresses;

  @ManyToOne(
    () => CategoriesServices,
    (categoriesServices) => categoriesServices.services,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "category_service_id", referencedColumnName: "id" }])
  categoryService: CategoriesServices;
}
