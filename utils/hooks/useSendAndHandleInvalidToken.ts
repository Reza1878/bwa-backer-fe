import Cookies from "js-cookie";
import { useCallback } from "react";
import { AuthService } from "service/auth_service";
import { ApiResponse } from "service/types";
import useToast from "utils/toast-hooks";

const useSendAndHandleInvalidToken = () => {
  const { showToast } = useToast();
  const wrappedCallback = useCallback(
    async (callback: () => Promise<ApiResponse>): Promise<ApiResponse> => {
      try {
        const response = await callback();
        if (response.meta.code === 401) throw new Error("Unauthorized");
        return response;
      } catch (e: any) {
        try {
          const refreshToken = Cookies.get("refresh_token");
          const response = await AuthService.refreshAccessToken(
            refreshToken ?? ""
          );

          if (!response.data.access_token) {
            Cookies.remove("token");
            Cookies.remove("refresh_token");
          }

          Cookies.set("token", response.data.access_token);
          return await callback();
        } catch (e: any) {
          return (
            e?.response?.data || {
              data: null,
              meta: {
                code: 500,
                message: "Something went wrong",
                status: "error",
              },
            }
          );
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return wrappedCallback;
};

export default useSendAndHandleInvalidToken;
