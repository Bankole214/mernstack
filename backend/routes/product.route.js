import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  upload,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct); // "image" = form field name
// router.put("/:id", updateProduct);
router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
