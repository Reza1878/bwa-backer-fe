import axios from "axios";
import { API_URL } from "config/constant";
import Cookies from "js-cookie";
import { sendAndHandleRequest } from "utils/api";
import { ApiResponse } from "./types";

export type SignUpPayload = {
  name: string;
  email: string;
  occupation: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export class AuthService {
  static async signUp(payload: SignUpPayload): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${API_URL}/users`, payload);

      const { data, meta } = response.data;
      return { data, meta };
    } catch (error: any) {
      return {
        meta: {
          code: 500,
          message:
            error?.response?.data?.meta?.message ?? "Internal server error",
          status: "error",
        },
        data: null,
      };
    }
  }

  static async getUser(): Promise<ApiResponse> {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`${API_URL}/users/fetch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data, meta } = response.data;
      return { data, meta };
    } catch (error: any) {
      return {
        meta: {
          code: 500,
          message:
            error?.response?.data?.meta?.message ?? "Internal server error",
          status: "error",
        },
        data: null,
      };
    }
  }

  static async signIn(payload: SignInPayload): Promise<ApiResponse> {
    return sendAndHandleRequest("/sessions", "post", payload);
  }
}
