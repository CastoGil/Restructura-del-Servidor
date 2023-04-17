import express from "express";
const router = express.Router();
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} from "../controllers/controllerDb/productsManager.js";


///rutas de productos//
router.get("/", getAllProductsController);
router.get("/:pid", getProductByIdController)
router.post("/", createProductController);
router.put("/:pid", updateProductController);
router.delete("/:pid", deleteProductController);

export default router;


