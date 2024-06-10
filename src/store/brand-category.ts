import { create } from "zustand";
import http from "@http";

const useBrandCategoryStore = create(() => ({
  postBrandCategory: async (payload: any) => {
    try {
      const res = await http.post("/brand-category/create", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getBrandCategory: async (limit:any , page:any , id:any) => {
    try {
      const res = await http.get(`/brand-category/brand/${id}?limit=${limit}&page=${page}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteBrandCategory: async (id: any) => {
    try{
      const res = await http.delete(`/brand-category/delete/${id}`)
      if(res.status === 200){
        return res;
      }
    }
    catch(err){
      console.log(err)
    }
  },
  updateBrandCategory: async (value:any , id:any) =>{
    try{
      const res = await http.patch(`/brand-category/update/${id}`, value)
      if(res.status === 200){
        return res;
      }
    }
    catch(err){
      console.log(err)
    }
  }
}));

export default useBrandCategoryStore;
