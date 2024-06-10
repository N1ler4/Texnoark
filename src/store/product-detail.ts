import { create } from "zustand";
import http from "@http";

const useProductDetailStore = create(() => ({
  postProductDetail: async (payload: any) => {
    try {
      const res = await http.post("/product-detail/create", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getProductDetail: async (id: any) => {
    try {
      const res = await http.get(`/product-detail/${1}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteProductDetail: async (id: any) => {
    try {
      const res = await http.delete(`/product-detail/delete/${id}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateProductDetail: async (value: any, id: any) => {
    try {
      const res = await http.patch(`/product-detail/update/${id}`, value);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useProductDetailStore;
