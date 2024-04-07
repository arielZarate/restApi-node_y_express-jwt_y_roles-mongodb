import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.json("get products");
});
router.post("/", (req, res) => {
  return res.json("post products");
});
router.put("/", (req, res) => {
  return res.json("put products");
});
router.delete("/", (req, res) => {
  return res.json("delete products");
});

export default router;
