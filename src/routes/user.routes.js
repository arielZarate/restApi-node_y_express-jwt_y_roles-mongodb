import { Router } from "express";
const router = Router();

//================================

import controllers from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";
import { isAdmin, isModerator } from "../middleware/role.middleware.js";
//===============================

//=================================

//TODO: EL ORDEN D ELAS RUTAS ES ESTRATEGICO PARA QUE BUSQUE PRIMERO POR QUERY O ID Y LUEGO EN GET
router.get("/:id", controllers.getUserById);
router.get("/:email", controllers.getUser);

////////////necesitamos pasarle params////////////
router.put("/:id", [verifyToken, isAdmin, isModerator], controllers.updateUser);
router.delete("/:id", [verifyToken, isAdmin], controllers.deleteUser);

//////////////////////////////////

router.post("/", [verifyToken, isAdmin, isModerator], controllers.createUser);
router.get("/", controllers.getUser);

export default router;
