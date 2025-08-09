import { create } from "zustand";
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  
  createProduct: async (newProduct) => {
    if (
      !newProduct.get("name") ||
      !newProduct.get("price") ||
      !newProduct.get("image")
    ) {
      return {
        success: false,
        message: "Please provide all the required fields",
      };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      body: newProduct, // send FormData directly
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }

    set((state) => ({
      products: [...state.products, data.data],
    }));

    return { success: true, message: "Product created successfully" };
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    // if (!res.ok) {
    //   // Backend might return 400/500 with a message
    //   return {
    //     success: false,
    //     message: data.message || "Something went wrong",
    //   };
    // }
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      // Backend might return 400/500 with a message.  // !data.success
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }
    //update ui without page refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    // updatedProduct should be a FormData instance
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      body: updatedProduct, // send FormData directly, no headers
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }

    set((state) => ({
      products: state.products.map((product) => {
        if (product._id === pid) {
          // If backend returns the updated product, use it
          return data.data || product;
        }
        return product;
      }),
    }));

    return { success: true, message: data.message };
  },
}));


