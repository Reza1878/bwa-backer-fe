import axios from "axios";
import { API_URL } from "config/constant";
import { ApiResponse } from "./types";

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
