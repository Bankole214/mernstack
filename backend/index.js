// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";

// dotenv.config();
// const PORT = process.env.PORT || 5000;
// const app = express();
// const __dirname = path.resolve();

// // MIDDLEWARE US TO ACCEPT JSON DATA IN THE REQ.BODY
// app.use(express.json());

// app.use("/api/products", productRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("/*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// // console.log(process.env.MONGO_URI);
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("Server is running on port 5000");
//     });
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err);
//     process.exit(1);
//     // res.send(err);
//   });



// app.listen(PORT, () => {
//     connectDB();
//   console.log("Server is running on port 5000");
// });




import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

console.log("✅ App initialized, NODE_ENV:", process.env.NODE_ENV);

console.log("✅ Setting up JSON middleware...");
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
