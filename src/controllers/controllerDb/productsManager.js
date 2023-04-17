import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import productService from "../../services/productsService.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET
////////////////Mostramos todos los productos///////////////////////////

const getAllProductsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "";
    const query = req.query.query || "";
    const token = req.cookies.token || "";
    const admin = req.cookies.role || ""

    const response = await productService.getAllProducts(query, sort, page, limit);
    console.log(response)
    if (token) {
      // decodifica el token
      const user = jwt.verify(token, JWT_SECRET);
      let data = {
        response,
        first_name: user ? user.first_name : null,
        role: user ? user.role : null,
        token
      };
      res.render("products", data);
    } else{
      let data = { response , admin};
      res.render("products", data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/////////////////Mostramos por Id el producto///////////////////////////
const getProductByIdController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getProductById(pid);
    return res.render("detailProduct", product)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

////////////////////Agregamos productos////////////////////////////////
const createProductController = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//////////////Actualizamos un producto pasándole los datos necesarios////////
const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.updateProduct(pid, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/////////////////Eliminamos un producto///////////////////////////
const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    await productService.deleteProduct(pid);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
};


// if (req.token) {
//   // Decodifica el token
//   const user = jwt.verify(req.token, process.env.JWT_SECRET);
//   let data = {
//     response,
//     first_name: user ? user.first_name : null,
//     role: user ? user.role : null,
//     token: req.token
//   };
//   res.render("products", data);
// } else {
//   let data = { response, admin };
//   res.render("products", data);
// }