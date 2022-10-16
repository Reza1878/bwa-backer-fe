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

  static async getTransactionSummary(
    dateStart: string = "",
    dateEnd: string = ""
  ): Promise<ApiResponse> {
    return sendAndHandleRequest(
      `/transactions/summary?date_start=${dateStart}&date_end=${dateEnd}`,
      "get"
    );
  }

  static async createTransaction(payload: {
    campaign_id: number;
    amount: number;
  }): Promise<ApiResponse> {
    return sendAndHandleRequest("/transactions", "post", payload);
  }
}
