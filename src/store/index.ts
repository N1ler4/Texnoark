import { create } from "zustand";
import { saveDataToCookie } from "@token-service";
import http from "@http";

const useAuthStore = create(() => ({
  signin: async (payload: any) => {
    try {
      const response = await http.post("/admin/login", payload);
      if (response.status === 201) {
        saveDataToCookie("token", response?.data?.tokens?.access_token);
        return response;
      }
    } catch (err) {
      console.error(err);
    }
  },
  signup: async (payload: any) => {
    try {
      const res = await http.post("/admin/create", payload);
      if (res.status === 201) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useAuthStore;
