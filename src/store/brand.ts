import { create } from "zustand";
import http from "@http";

const useBrandStore = create(() => ({
  postBrand: async (payload: any) => {
    try {
      const res = await http.post("/brand/create", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getBrand: async () => {
    try {
      const res = await http.get("/brand/get-all/q");
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteBrand: async (id: any) => {
    try{
      const res = await http.delete(`/brand/delete/${id}`)
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
      const res = await http.put(`/brand/update/${id}`, value)
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
