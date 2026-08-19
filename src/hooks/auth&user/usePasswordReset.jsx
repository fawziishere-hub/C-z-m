import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const usePasswordReset = () => {
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ data }) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/password-reset`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.message || t("toasts.error_try_again"));
        }
        return responseData;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || t("toasts.password_reset.request_sent"));
    },
    onError: (error) => {
      toast.error(error.message || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};

export const usePasswordConfirmCode = () => {
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ data }) => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/password-reset-confirm`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.message || t("toasts.error_try_again"));
        }
        return responseData;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || t("toasts.password_reset.code_confirmed"));
    },
    onError: (error) => {
      toast.error(error.message || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};

export const useUpdatePassword = () => {
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ data }) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/password-reset-update`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.message || t("toasts.error_try_again"));
        }
        return responseData;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || t("toasts.password_reset.update_success"));
    },
    onError: (error) => {
      toast.error(error.message || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
