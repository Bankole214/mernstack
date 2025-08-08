import Product from "../models/products.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log("Error fetching products", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const createProduct = async (req, res) => {
  const productData = req.body;
  if (!productData.name || !productData.price || !productData.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }
  const newProduct = new Product(productData);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting product", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
