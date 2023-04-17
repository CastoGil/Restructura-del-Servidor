import { cartModel } from "../models/carts.js"; // Importar el modelo de carrito

const cartDAO = {
  createCart: async () => {
    try {
      const newCart = new cartModel();
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error("Failed to create cart");
    }
  },
  getCartById: async (cartId) => {
    try {
      const cart = await cartModel
        .findById(cartId)
        .populate("products._id")
        .lean()
        .exec();
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      return cart;
    } catch (error) {
      throw new Error("No se pudo obtener el carrito");
    }
  },
  addProductToCart: async (cartId, productId) => {
    try {
      const cart = await cartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const existingProduct = cart.products.findIndex(
        (product) => product.id === productId
      );

      if (existingProduct !== -1) {
        cart.products[existingProduct].quantity += 1;
      } else {
        cart.products.push({ _id: productId, quantity: 1 });
      }

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error("No se pudo agregar el producto al carrito");
    }
  },
  deleteProductFromCart: async (cartId, productId) => {
    try {
      const cart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { _id: productId } } },
        { new: true }
      );
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      if (!productId) {
        throw new Error("El ID del producto es requerido");
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("No se pudo eliminar el producto del carrito");
    }
  },
  updateCart: async (cartId, updateData) => {
    try {
      const cart = await cartModel.findByIdAndUpdate(
        cartId,
        { products: updateData },
        { new: true, runValidators: true, populate: { path: "products._id" } }
      );
      return cart;
    } catch (error) {
      throw error;
    }
  },
  updateProductQuantityInCart: async (cartId, productId, quantity) => {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const product = cart.products.find(
        (product) => product._id.toString() === productId
      );
      if (!product) {
        throw new Error("Producto no encontrado en el carrito");
      }
      product.quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  },
  deleteAllProductsFromCart: async (cartId) => {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("No se encontró el carrito");
      }
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  },
};

export default cartDAO

