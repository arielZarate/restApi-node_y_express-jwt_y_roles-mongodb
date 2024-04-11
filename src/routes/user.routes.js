import { Router } from "express";
const router = Router();
import controllers from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";
import {
  isAdmin,
  isModerator,
  hasRoles,
} from "../middleware/role.middleware.js";

import { enumRole } from "../enum/role.enum.js";

//=================================

//TODO: EL ORDEN DE LAS RUTAS ES ESTRATEGICO PARA QUE BUSQUE PRIMERO POR QUERY O ID Y LUEGO EN GET
router.get("/:id", controllers.getUserById);
router.get("/:email", controllers.getUser);

////////////necesitamos pasarle params////////////
router.put(
  "/:id",
  [verifyToken, hasRoles(`${enumRole.ADMIN}`, `${enumRole.MODERATOR}`)],
  controllers.updateUser
);
router.delete("/:id", [verifyToken, isAdmin], controllers.deleteUser);

//////////////////////////////////

router.post(
  "/",

  //middleware hasRoles puede recibir mas de un role
  [verifyToken, hasRoles(`${enumRole.ADMIN}`, `${enumRole.MODERATOR}`)],
  controllers.createUser
);
router.get("/", controllers.getUser);

export default router;
