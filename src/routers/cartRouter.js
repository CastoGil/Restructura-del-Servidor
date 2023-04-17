import express from "express";
import {
  newCart,
  cartIdproduct,
  idCartIdProductAdd, deleteProductId,updatedCart,updatedQuantityProduct,deleteAllProductsCart
} from "../controllers/controllerDb/cartManager.js";
const router = express.Router();

///////////////////Ruta de Carrito////////////////////////////
router.post("/", newCart);
router.get("/:cid", cartIdproduct);
router.post("/:cid/products/:pid", idCartIdProductAdd);
router.delete('/:cid/products/:pid', deleteProductId)
router.put('/:cid', updatedCart)
router.put('/:cid/products/:pid', updatedQuantityProduct)
router.delete('/:cid', deleteAllProductsCart)

export default router;