// backend/controllers/productController.js
import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc   Get all products
// @route  GET /api/products
// @access Admin / Super Admin
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc   Get single product by ID
// @route  GET /api/products/:id
// @access Admin / Super Admin
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) res.json(product);
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Create new product
// @route  POST /api/products
// @access Admin / Super Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock } = req.body;

  const product = new Product({
    name,
    description,
    price,
    stock
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc   Update product
// @route  PUT /api/products/:id
// @access Admin / Super Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock } = req.body;
  const product = await Product.findById(req.params.id);

  if(product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Delete product
// @route  DELETE /api/products/:id
// @access Admin / Super Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
