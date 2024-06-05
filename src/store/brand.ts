import { create } from "zustand";
import http from "@http";

const useBrandStore = create(() => ({
  postBrand: async (payload: any) => {
    try {
      const res = await http.post("/brand", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getBrand: async (limit:any , page:any , search:any) => {
    try {
      const res = await http.get(`/brand/search?search=${search}&limit=${limit}&page=${page}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteBrand: async (id: any) => {
    try{
      const res = await http.delete(`/brand/${id}`)
      if(res.status === 200){
        return res;
      }
    }
    catch(err){
      console.log(err)
    }
  },
  updateBrand: async (value:any , id:any) =>{
    try{
      const res = await http.patch(`/brand/${id}`, value)
      if(res.status === 200){
        return res;
      }
    }
    catch(err){
      console.log(err)
    }
  }
}));

export default useBrandStore;
