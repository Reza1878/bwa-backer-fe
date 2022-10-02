import { axiosInstance } from "config/constant";
import { sendAndHandleRequest } from "utils/api";
import { ApiResponse } from "./types";

export default class UserService {
  static async getUser(): Promise<ApiResponse> {
    return sendAndHandleRequest("/users/fetch", "get");
  }

  static async uploadAvatar(formData: FormData): Promise<ApiResponse> {
    return sendAndHandleRequest("/avatars", "post", formData);
  }

  static async getUserTransactions(): Promise<ApiResponse> {
    return sendAndHandleRequest("/transactions", "get");
  }

  static async updateUser(payload: {
    name: string;
    occupation: string;
    email: string;
  }) {
    return sendAndHandleRequest("/users", "put", payload);
  }

  static async updateUserPassword(payload: {
    oldPassword: string;
    newPassword: string;
    confirmationPassword: string;
  }): Promise<ApiResponse> {
    return sendAndHandleRequest("/users/password", "put", payload);
  }
}
