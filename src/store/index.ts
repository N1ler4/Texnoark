import { create } from "zustand";
import { saveDataToCookie } from "@token-service";
import http from "@http";

const useAuthStore = create(() => ({
  signin: async (payload: any) => {
    try {
      const response = await http.post("/auth/sign-in", payload);
      if (response.status === 201) {
        console.log(response);
        saveDataToCookie("token", response?.data?.data?.tokens.access_token);
        saveDataToCookie("admin-id", response?.data?.data?.data.id);
        return response;
      }
    } catch (err) {
      console.error(err);
    }
  },
  signup: async (payload: any) => {
    try {
      const res = await http.post("/auth/admin/sign-up", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  getadmin: async (id: any) => {
    try {
      const res = await http.get(`/admin/${id}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteadmin: async (id: any) => {
    try {
      const res = await http.delete(`/admin/${id}`);
      if (res.status === 204) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateadmin: async(value:any,id:any )=>{
    try{
      const res = await http.patch(`/admin/${id}`, value)
      if(res && res.status === 200){
        return res
      }
    }catch(Err){
      console.log(Err)
    }
  }
}));

export default useAuthStore;
