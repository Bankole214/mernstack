import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";



import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname1 = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname1, ".env") });
// dotenv.config();
// dotenv.config({ path: "./backend/.env" });
const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

console.log("✅ App initialized, NODE_ENV:", process.env.NODE_ENV);

console.log("✅ Setting up JSON middleware...");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use("/assets", express.static(path.join(process.cwd(), "assets")));
console.log("✅ About to mount product routes...");
app.use("/api/products", productRoutes);
console.log("✅ Product routes mounted successfully");

if (process.env.NODE_ENV === "production") {
  console.log("✅ Production mode - setting up static files...");
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  // app.use(express.static(path.join(__dirname, "/frontend/dist")));

  console.log("✅ Setting up catch-all route...");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
  console.log("✅ Catch-all route set up successfully");
} else {
  console.log("✅ Development mode - skipping static files");
}

console.log("✅ About to connect to database...");
connectDB()
  .then(() => {
    console.log("✅ Database connected, starting server...");
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
