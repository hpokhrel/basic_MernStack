import express from "express";
const productRoute = express.Router();
import {
  postProducts,
  getProducts,
  updateProducts,
  deleteProducts,
  getProductsById,
} from "../controllers/Products.js";

// import verifyUser from "../middlewares/verifyUser.js";

// productRoute.use(verifyUser);

productRoute.post("/postproducts", postProducts);
productRoute.get("/getproducts", getProducts);
productRoute.patch("/updateProducts/:id", updateProducts);
productRoute.delete("/deleteProducts/:id", deleteProducts);
productRoute.get("/getproducts/:id", getProductsById);

export default productRoute;