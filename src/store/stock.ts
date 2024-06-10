import { create } from "zustand";
import http from "@http";

const useStockStore = create(() => ({
  postStock: async (payload: any) => {
    try {
      const res = await http.post("/stock/create", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getStock: async (limit:any,page:any) => {
    try {
      const res = await http.get(`/stock?limit=${limit}&page=${page}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteStock: async (id: any) => {
    try {
      const res = await http.delete(`/stock/delete/${id}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateStock: async (value: any, id: any) => {
    try {
      const res = await http.patch(`/stock/update/${id}`, value);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useStockStore;
