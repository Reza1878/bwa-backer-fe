import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://backer-api.rezarizqi.my.id/api/v1";
const BASE_URL = "https://backer-api.rezarizqi.my.id/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});
axiosInstance.interceptors.request.use(function (config) {
  config.headers!.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

export { axiosInstance, API_URL, BASE_URL };
