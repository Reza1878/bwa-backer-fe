import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://backer-api.rezarizqi.my.id:8000/api/v1";
const BASE_URL = "http://backer-api.rezarizqi.my.id:8000/";
const MOCK_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMX0.w16Fj5pfRF24FcskKgV1v6XrqwFz0cgjRL6YMKYiCCo";

const axiosInstance = axios.create({
  baseURL: API_URL,
});
axiosInstance.interceptors.request.use(function (config) {
  config.headers!.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

export { axiosInstance, API_URL, BASE_URL, MOCK_JWT };
