import cartDAO from '../Dao/carts/cart.js'; 

export const createCart = async () => {
    try {
      const newCart = await cartDAO.createCart();
      return newCart;
    } catch (error) {
      throw error
    }
  };

export const getCartById = async (cartId) => {
    try {
      const cart = await cartDAO.getCartById(cartId);
      return cart;
    } catch (error) {
      throw new Error("No se pudo obtener el carrito");
    }
  };

export const addProductToCart = async (cartId, productId) => {
    try {
      const updatedCart = await cartDAO.addProductToCart(cartId, productId);
      return updatedCart;
    } catch (error) {
      throw new Error("No se pudo agregar el producto al carrito");
    }
  };

export const deleteProductFromCart = async (cartId, productId) => {
    try {
      const updatedCart = await cartDAO.deleteProductFromCart(cartId, productId);
      return updatedCart;
    } catch (error) {
      throw new Error("No se pudo eliminar el producto del carrito");
    }
  };

export const updateCart = async (cartId, updateData) => {
    try {
      const cart = await cartDAO.updateCart(cartId, updateData);
      console.log(cart);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  };

export const updateProductQuantityInCart = async (cartId, productId, quantity) => {
    try {
      const cart = await cartDAO.updateProductQuantityInCart(cartId, productId, quantity);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      return cart;
    } catch (error) {
      throw new Error("No se pudo actualizar la cantidad del producto");
    }
  };

export const deleteAllProductsFromCart = async (cartId) => {
    try {
      const cart = await cartDAO.deleteAllProductsFromCart(cartId);
      if (!cart) {
        throw new Error("No se encontró el carrito");
      }
      return cart;
    } catch (error) {
      throw new Error("No se pudo eliminar todos los productos del carrito");
    }
  };