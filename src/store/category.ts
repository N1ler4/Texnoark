import { create } from "zustand";
import http from "@http";

const useCategoryStore = create(() => ({
  postCategory: async (payload: any) => {
    try {
      const res = await http.post("/category/create", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getCategory: async () => {
    try {
      const res = await http.get("/category/get-all-category/q");
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteCategory: async (id: any) => {
    try{
      const res = await http.delete(`/category/delete/${id}`)
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
      const res = await http.put(`/category/update/${id}`, value)
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
