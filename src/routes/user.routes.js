import { Router } from "express";
const router = Router();

//================================

import controllers from "../controllers/user.controller.js";
//===============================

//=================================
router.get("/", controllers.getUser);
router.get("/:email", controllers.getUser);
router.post("/", controllers.createUser);
////////////necesitamos pasarle params////////////
router.put("/:id", controllers.updateUser);
router.delete("/:id", controllers.deleteUser);

export default router;
