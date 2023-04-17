import { productModel } from "../models/products.js"; // Importar el modelo de producto
const productDAO = {
  getProductById: async (pid) => {
    const product = await productModel.findById(pid);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },
  getAllProducts: async (query, sort, page, limit) => {
    const queryObject = {};
    if (query === "available") {
      queryObject.stock = { $gt: 0 };
    } else if (query === "unavailable") {
      queryObject.stock = { $lte: 0 };
    } else if (query) {
      queryObject.category = query;
    }
    const sortOrder = sort === "desc" ? -1 : 1;
    const sortObject = {};
    if (sort) {
      sortObject.price = sortOrder;
    }
    const products = await productModel.paginate(queryObject, {
      page,
      limit,
      sort: sortObject,
      lean: true,
    });
    const response = {
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? page - 1 : null,
      nextPage: products.hasNextPage ? page + 1 : null,
      page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `/api/products?page=${
            page - 1
          }&limit=${limit}&sort=${sort}&query=${query}`
        : null,
      nextLink: products.hasNextPage
        ? `/api/products?page=${
            page + 1
          }&limit=${limit}&sort=${sort}&query=${query}`
        : null,
      sortValue: sort,
    };
    return response;
  },
  createProduct: async (body) => {
    const product = new productModel(body);
    await product.save();
    return product;
  },
  updateProduct: async (pid, body) => {
    const product = await productModel.findByIdAndUpdate(pid, body);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },
  deleteProduct: async (pid) => {
    const product = await productModel.findByIdAndRemove(pid);
    if (!product) {
      throw new Error("Product not found");
    }
  },
};

export default productDAO;
