import Product from "../models/products.model.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

// --------------------
// Multer Configuration
// --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/uploads"); // save to backend/assets/uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };
const fileFilter = (req, file, cb) => {
  // const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const allowed = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// --------------------
// Controllers
// --------------------

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
  try {
    const { name, price } = req.body;

    if (!name || !price || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, price, and an image",
      });
    }

    const imagePath = `/assets/uploads/${req.file.filename}`; // store relative path

    const newProduct = new Product({
      name,
      price,
      image: imagePath,
    });

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
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    if (req.file) {
      product.image = `/assets/uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
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
