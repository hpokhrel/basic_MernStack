import Products from "../models/Products.js";

export const postProducts = async (req, res) => {
  try {
    const product = new Products(req.body);
    await product.save();
    res.status(201).json({ message: `${product.name} added successfully` });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getProducts = async (req, res) => {
  const products = await Products.find();
  try {
    if (!products) {
      return res.status(404).json({
        message: "Products not found",
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductsById = async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json(product);
};

export const updateProducts = async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res
    .status(200)
    .json({ message: `${updatedProduct.name} updated successfully` });
};

export const deleteProducts = async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  await Products.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ message: `${product.name} deleted successfully` });
};

export const getFilteredProducts = async (req, res) => {
  const { minPrice } = req.query;
  try {
    const products = await Products.find({
      stock: { $gt: 0 },
      price: { $gt: minPrice },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching filtered products" });
  }
};
