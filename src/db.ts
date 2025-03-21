import { DataSource } from "typeorm";

import { Addresses } from "./entities/Addresses";
import { Admins } from "./entities/Admins";
import { CategoriesEvents } from "./entities/CategoriesEvents";
import { CategoriesLocals } from "./entities/CategoriesLocals";
import { CategoriesPlaces } from "./entities/CategoriesPlaces";
import { CategoriesServices } from "./entities/CategoriesServices";
import { Cities } from "./entities/Cities";
import { Departments } from "./entities/Departments";
import { Events } from "./entities/Events";
import { ImagesEvents } from "./entities/ImagesEvents";
import { ImagesLocals } from "./entities/ImagesLocals";
import { ImagesPlaces } from "./entities/ImagesPlaces";
import { ImagesServices } from "./entities/ImagesServices";
import { Locals } from "./entities/Locals";
import { Owners } from "./entities/Owners";
import { Permissions } from "./entities/Permissions";
import { Places } from "./entities/Places";
import { RolePermission } from "./entities/RolePermission";
import { Roles } from "./entities/Roles";
import { Services } from "./entities/Services";
import { Users } from "./entities/Users";

import { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } from "./config";

import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  port: DB_PORT,
  database: DB_NAME,
  entities: [
    Addresses,
    Admins,
    CategoriesEvents,
    CategoriesLocals,
    CategoriesPlaces,
    CategoriesServices,
    Cities,
    Departments,
    Events,
    ImagesEvents,
    ImagesLocals,
    ImagesPlaces,
    ImagesServices,
    Locals,
    Owners,
    Permissions,
    Places,
    RolePermission,
    Roles,
    Services,
    Users
  ],
  logging: ["error", "warn"],
  synchronize: false,
});
