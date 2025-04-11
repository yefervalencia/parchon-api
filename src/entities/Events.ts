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
import { CategoriesEvents } from "./CategoriesEvents";
import { ImagesEvents } from "./ImagesEvents";

@Index("category_event_id", ["categoryEventId"], {})
@Index("idx_local_id", ["localId"], {})
@Entity("events", { schema: "parchon" })
export class Events extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  //Column("int", { name: "secondary_local_id", nullable: true })
  //secondaryLocalId: number | null;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("int", { name: "capacity" })
  capacity: number;

  @Column("timestamp", { name: "start_date" })
  startDate: Date;

  @Column("timestamp", { name: "end_date" })
  endDate: Date;

  @Column("int", { name: "local_id", nullable: true })
  localId: number | null;

  @Column("int", { name: "category_event_id", nullable: true })
  categoryEventId: number | null;

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

  @ManyToOne(() => Locals, (locals) => locals.events, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "local_id", referencedColumnName: "id" }])
  local: Locals;

  @ManyToOne(
    () => CategoriesEvents,
    (categoriesEvents) => categoriesEvents.events,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "category_event_id", referencedColumnName: "id" }])
  categoryEvent: CategoriesEvents;

  //@ManyToOne(() => Locals, (locals) => locals.events2, {
 //   onDelete: "NO ACTION",
//onUpdate: "NO ACTION",
 // })
  //@JoinColumn([{ name: "secondary_local_id", referencedColumnName: "id" }])
  //local_2: Locals;

  @OneToMany(() => ImagesEvents, (imagesEvents) => imagesEvents.event)
  imagesEvents: ImagesEvents[];
}
