import { Router } from "express";
const router = Router();

import controllers from "../controllers/auth.controller.js";

import { checkExistingRole } from "../middleware/cheked.middleware.js";

// Ruta para registrar un nuevo usuario

//puedo verificar por email pero lo tenia dentro
router.post("/signup", [checkExistingRole], controllers.signUp);

// Ruta para iniciar sesión de un usuario existente

//no le valido si existe el rol porque ya valido el email y sino es valido no podra ingresar directamente
router.post("/signin", controllers.signIn);

export default router;
