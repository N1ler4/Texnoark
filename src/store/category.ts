import { create } from "zustand";
import http from "@http";

const useCategoryStore = create(() => ({
  postCategory: async (payload: any) => {
    try {
      const res = await http.post("/category", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getCategory: async (limit:any , page:any , search:any) => {
    try {
      const res = await http.get(`/category/search?search=${search}&limit=${limit}&page=${page}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteCategory: async (id: any) => {
    try{
      const res = await http.delete(`/category/${id}`)
      if(res.status === 200){
        return res;
      }
    }
    catch(err){
      console.log(err)
    }
  },
  updateCategory: async (value:any , id:any) =>{
    try{
      const res = await http.patch(`/category/${id}`, value)
      if(res.status === 200){
        return res;
      }
    }
    catch(err){
      console.log(err)
    }
  }
}));

export default useCategoryStore;
