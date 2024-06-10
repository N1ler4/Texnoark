import axios from "axios";
import { getDataFromCookie, saveDataToCookie } from "@token-service";

const http = axios.create({
  baseURL: "https://ecomapi.ilyosbekdev.uz",
});

async function refreshAccsesToken() {
  try {
    const admin_id = getDataFromCookie("admin-id");

    if (!admin_id) {
      throw new Error("Refresh token not found in cookie ");
    } else {
      const response: any = await axios.get(
        `https://ecomapi.ilyosbekdev.uz/auth/refresh/${admin_id}`
      );
      const { access_token, refresh_token } = response?.data?.data?.tokens;
      saveDataToCookie("token", access_token);
      saveDataToCookie("refresh_token", refresh_token);
      return access_token;
    }
  } catch (error) {
    console.log(error);
  }
}

http.interceptors.request.use((config) => {
  const access_token = getDataFromCookie("access_token");
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccsesToken();
      //    console.log(access_token);

      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = access_token;
      } else {
        console.error("Access token not found in config file " + error.config);
        return Promise.reject(error);
      }
    }
  }
);
export default http;
