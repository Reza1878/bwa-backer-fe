import { useMemo } from "react";
import { toast, UpdateOptions } from "react-toastify";

export default function useToast() {
  const methods = useMemo(() => {
    let id: any;
    const defaultSettings = {
      autoClose: 1000,
      isLoading: false,
    };

    const toastLoading = (message: string = "Please wait...") => {
      id = toast.loading(message);
    };

    const updateToast = (message: string, type: "success" | "error") => {
      toast.update(id, {
        render: message,
        type,
        ...defaultSettings,
        delay: 750,
      });
    };

    const showToast = (message: string, type: "success" | "error") => {
      toast[type](message, { ...defaultSettings });
    };

    return { showToast, toastLoading, updateToast };
  }, []);

  return methods;
}
