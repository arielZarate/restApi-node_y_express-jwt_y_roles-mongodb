import express from "express";

const router = express.Router();
import productRoutes from "./products.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
