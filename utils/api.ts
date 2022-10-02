import { AxiosResponse } from "axios";
import { axiosInstance } from "config/constant";
import { ApiResponse } from "service/types";

export async function sendAndHandleRequest(
  uri: string,
  method: "post" | "get" | "put" | "delete",
  payload: any = {}
): Promise<ApiResponse> {
  try {
    const response: AxiosResponse = await axiosInstance[method](uri, payload);

    const { data, meta } = response.data;
    return { data, meta };
  } catch (error: any) {
    return {
      meta: {
        code: error?.response?.status || 500,
        message:
          (error?.response?.data?.data?.errors ||
            error?.response?.data?.meta?.message) ??
          "Internal server error",
        status: "error",
      },
      data: null,
    };
  }
}
