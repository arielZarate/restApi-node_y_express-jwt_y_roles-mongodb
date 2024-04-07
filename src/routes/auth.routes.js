import { Router } from "express";
const router = Router();

import controllers from "../controllers/auth.controller.js";

// Ruta para registrar un nuevo usuario
router.post("/signup", controllers.signUp);

// Ruta para iniciar sesión de un usuario existente
router.post("/signin", controllers.signIn);

export default router;
