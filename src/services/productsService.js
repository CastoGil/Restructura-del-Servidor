import productDAO from "../Dao/products/products.js";

const productService = {
  getProductById: async (pid) => {
    return await productDAO.getProductById(pid);
  },
  getAllProducts: async (query, sort, page, limit) => {
    return await productDAO.getAllProducts(query, sort, page, limit);
  },
  createProduct: async (body) => {
    return productDAO.createProduct(body);
  },
  updateProduct: async (pid, body) => {
    return productDAO.updateProduct(pid, body);
  },
  deleteProduct: async (pid) => {
    return productDAO.deleteProduct(pid);
  },
};

export default productService;
