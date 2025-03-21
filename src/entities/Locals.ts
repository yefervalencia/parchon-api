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
import { Events } from "./Events";
import { ImagesLocals } from "./ImagesLocals";
import { Addresses } from "./Addresses";
import { Owners } from "./Owners";
import { CategoriesLocals } from "./CategoriesLocals";

@Index("category_local_id", ["categoryLocalId"], {})
@Index("idx_address_id", ["addressId"], {})
@Index("owner_id", ["ownerId"], {})
@Entity("locals", { schema: "parchon" })
export class Locals extends BaseEntity{
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

  @Column("int", { name: "owner_id", nullable: true })
  ownerId: number | null;

  @Column("int", { name: "category_local_id", nullable: true })
  categoryLocalId: number | null;

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

  @OneToMany(() => Events, (events) => events.local)
  events: Events[];

  @OneToMany(() => Events, (events) => events.local_2)
  events2: Events[];

  @OneToMany(() => ImagesLocals, (imagesLocals) => imagesLocals.local)
  imagesLocals: ImagesLocals[];

  @ManyToOne(() => Addresses, (addresses) => addresses.locals, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address: Addresses;

  @ManyToOne(() => Owners, (owners) => owners.locals, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "owner_id", referencedColumnName: "id" }])
  owner: Owners;

  @ManyToOne(
    () => CategoriesLocals,
    (categoriesLocals) => categoriesLocals.locals,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "category_local_id", referencedColumnName: "id" }])
  categoryLocal: CategoriesLocals;
}
