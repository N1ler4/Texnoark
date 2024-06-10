import axios from "axios";
import { getDataFromCookie, saveDataToCookie } from "@token-service";

const http = axios.create({
  baseURL: "https://ecomapi.ilyosbekdev.uz",
});

http.interceptors.request.use((config) => {
  let token = getDataFromCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
async function refreshAccessToken() {
  try {
    const refresh_token = getDataFromCookie("admin_id");
    if (!refresh_token) {
      throw new Error("Refresh token not found");
    }
    const response = await axios.get(
      `https://ecomapi.ilyosbekdev.uz/auth/refresh/${refresh_token}`
    );
    const { access_token } = response.data.data.tokens;
    saveDataToCookie("token", access_token);
    return access_token;
  } catch (err) {
    console.log(err);
  }
}
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccessToken();
      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = access_token;
      } else {
        console.error("Failed to refresh access token");
        return Promise.reject(error);
      }
    }
  }
);
export default http;
