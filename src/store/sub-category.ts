import { create } from "zustand";
import http from "@http";

const useSubCategoryStore = create(() => ({
  postSubCategory: async (payload: any) => {
    try {
      const res = await http.post("/sub-category", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getSubCategory: async (limit:any , page:any , search:any , id:any) => {
    try {
      const res = await http.get(`/sub-category/search/${id}?search=${search}&limit=${limit}&page=${page}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteSubCategory: async (id: any) => {
    try{
      const res = await http.delete(`/sub-category/${id}`)
      if(res.status === 200){
        return res;
      }
    }
    catch(err){
      console.log(err)
    }
  },
  updateSubCategory: async (value:any , id:any) =>{
    try{
      const res = await http.patch(`/sub-category/${id}`, value)
      if(res.status === 200){
        return res;
      }
    }
    catch(err){
      console.log(err)
    }
  }
}));

export default useSubCategoryStore;
