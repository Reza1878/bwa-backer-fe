import axios from "axios";
import { API_URL } from "config/constant";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { sendAndHandleRequest } from "utils/api";
import { ApiResponse } from "./types";

export type CreateCampaignPayload = {
  name: string;
  description: string;
  short_description: string;
  goal_amount: number;
  perks: string;
};
export class CampaignService {
  static async gets(): Promise<ApiResponse> {
    try {
      const response = await axios.get(`${API_URL}/campaigns`);

      const { data, meta } = response.data;
      return { data, meta };
    } catch (error) {
      return {
        meta: {
          code: 500,
          message: "Internal server error",
          status: "error",
        },
        data: [],
      };
    }
  }

  static async getUserCampaigns(): Promise<ApiResponse> {
    const token = Cookies.get("token");

    const decoded: any = jwtDecode(token ?? "");
    return sendAndHandleRequest(
      `/campaigns?user_id=${decoded?.data?.user_id ?? 0}`,
      "get"
    );
  }

  static async getCampaignTransactions(id: number): Promise<ApiResponse> {
    return sendAndHandleRequest(`/campaigns/${id}/transactions`, "get");
  }

  static async create(payload: CreateCampaignPayload): Promise<ApiResponse> {
    return sendAndHandleRequest("/campaigns", "post", payload);
  }

  static async uploadImage(payload: FormData): Promise<ApiResponse> {
    return sendAndHandleRequest("/campaigns-images", "post", payload);
  }

  static async update(
    id: number,
    payload: CreateCampaignPayload
  ): Promise<ApiResponse> {
    return sendAndHandleRequest(`/campaigns/${id}`, "put", payload);
  }

  static async getItem(id: number): Promise<ApiResponse> {
    try {
      const response = await axios.get(`${API_URL}/campaigns/${id}`);

      const { data, meta } = response.data;
      return { data, meta };
    } catch (error) {
      return {
        meta: {
          code: 500,
          message: "Internal server error",
          status: "error",
        },
        data: null,
      };
    }
  }
}
