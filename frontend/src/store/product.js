import { create } from "zustand";
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "Please provide all the required fields",
      };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    if (!res.ok) {
      // Backend might return 400/500 with a message
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
  updateProduct: async(pid, updateProduct) => {
      const res = await fetch(`/api/products/${pid}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updateProduct),
      })
      const data = await res.json()
      if (!res.ok) {
          // Backend might return 400/500 with a message.  // !data.success
          return {
              success: false,
              message: data.message || "Something went wrong",
          };
      }
      //update ui without page refresh
      set((state) => ({
          products: state.products.map((product) => {
              if (product._id === pid) {
                  return { ...product, ...updateProduct };
              }
              return product;
          }),
      }));
      return { success: true, message: data.message };
  }
}));

// const [state, setState] = useProductStore([]);
