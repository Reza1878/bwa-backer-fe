import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = "http://127.0.0.1:8000/api/v1";
export const BASE_URL = "http://127.0.0.1:8000/";
export const MOCK_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMX0.w16Fj5pfRF24FcskKgV1v6XrqwFz0cgjRL6YMKYiCCo";

const token = Cookies.get("token") ?? "";
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
