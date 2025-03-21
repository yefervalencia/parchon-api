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
import { ImagesPlaces } from "./ImagesPlaces";
import { Addresses } from "./Addresses";
import { CategoriesPlaces } from "./CategoriesPlaces";

@Index("category_place_id", ["categoryPlaceId"], {})
@Index("idx_address_id", ["addressId"], {})
@Entity("places", { schema: "parchon" })
export class Places extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "cellphone", nullable: true, length: 10 })
  cellphone: string | null;

  @Column("int", { name: "address_id", nullable: true })
  addressId: number | null;

  @Column("int", { name: "category_place_id", nullable: true })
  categoryPlaceId: number | null;

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

  @OneToMany(() => ImagesPlaces, (imagesPlaces) => imagesPlaces.place)
  imagesPlaces: ImagesPlaces[];

  @ManyToOne(() => Addresses, (addresses) => addresses.places, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address: Addresses;

  @ManyToOne(
    () => CategoriesPlaces,
    (categoriesPlaces) => categoriesPlaces.places,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "category_place_id", referencedColumnName: "id" }])
  categoryPlace: CategoriesPlaces;
}
