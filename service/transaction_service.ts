import { sendAndHandleRequest } from "utils/api";
import { ApiResponse } from "./types";

export class TransactionService {
  static async create(payload: {
    campaign_id: number;
    amount: number;
  }): Promise<ApiResponse> {
    return sendAndHandleRequest("/transactions", "post", payload);
  }

  static async getUserTransaction(): Promise<ApiResponse> {
    return sendAndHandleRequest("/transactions", "get");
  }
}
