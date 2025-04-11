import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import addressRoutes from "./routes/address.routes";
import adminRouter from "./routes/admin.routes";
import categoryEventRoutes from "./routes/categoryEvent.routes";
import categoryLocalRoutes from "./routes/categoryLocal.routes";
import categoryPlaceRoutes from "./routes/categoryPlace.routes";
import categoryServiceRoutes from "./routes/categoryService.routes";
import cityRouter from "./routes/city.routes";
import departmentRoutes from "./routes/department.routes";
import eventRoutes from "./routes/event.routes";
import localRouter from "./routes/local.routes";
import ownerRoutes from "./routes/owner.routes";
import permissionRoutes from "./routes/permission.routes";
import placeRoutes from "./routes/place.routes";
import rolePermissionRoutes from "./routes/rolePermission.routes";
import roleRouter from "./routes/role.routes";
import serviceRouter from "./routes/service.routes";
import userRoutes from "./routes/user.routes";
import imageEventRouter from "./routes/imageEvent.routes";
import imageLocalRouter from "./routes/imageLocal.routes";
import imagePlaceRouter from "./routes/imagePlace.routes";
import imageServiceRouter from "./routes/imageService.routes";
import { ImagesLocals } from "./entities/ImagesLocals";
import authRouter from "./routes/auth.routes";

import { FRONT_URL } from "./config";

const app = express();
const router = express.Router();

const corsOptions = {
  origin: `${FRONT_URL}`, // Frontend local domain
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

app.use(morgan("dev"));

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

router.use("/addresses", addressRoutes);
router.use("/admins", adminRouter);
router.use("/categoriesEvents", categoryEventRoutes);
router.use("/categoriesLocals", categoryLocalRoutes);
router.use("/categoriesPlaces", categoryPlaceRoutes);
router.use("/categoriesServices", categoryServiceRoutes);
router.use("/cities", cityRouter);
router.use("/departments", departmentRoutes);
router.use("/events", eventRoutes);
router.use("/locals", localRouter);
router.use("/owners", ownerRoutes);
router.use("/permissions", permissionRoutes);
router.use("/places", placeRoutes);
router.use("/rolePermissions", rolePermissionRoutes);
router.use("/roles", roleRouter);
router.use("/services", serviceRouter);
router.use("/users", userRoutes);
router.use("/imageEvents", imageEventRouter);
router.use("/imageLocals", imageLocalRouter);
router.use("/imagePlaces", imagePlaceRouter);
router.use("/imageServices", imageServiceRouter);
router.use("/auth",authRouter);

export default app;
