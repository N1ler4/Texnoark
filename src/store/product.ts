import { create } from "zustand";
import http from "@http";

const useProductStore = create(() => ({
  postProduct: async (payload: any) => {
    try {
      const res = await http.post("/products/create", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (limit: any, page: any, search: any) => {
    try {
      const res = await http.get(
        `/products/search?search=${search}&limit=${limit}&page=${page}`
      );
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteProduct: async (id: any) => {
    try {
      const res = await http.delete(`/products/delete/${id}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateProduct: async (value: any, id: any) => {
    try {
      const res = await http.patch(`/products/update/${id}`, value);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useProductStore;
