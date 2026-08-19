import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const useForgotPassword = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ email }) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/forgot-password`,
          {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.message || "Failed to send reset email");
        }
        return responseData;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Password reset email sent successfully! Check your inbox.",
      );
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};

export const useResetPassword = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ email, otp, password }) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/reset-password`,
          {
            method: "POST",
            body: JSON.stringify({ email, otp, password }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.message || "Failed to reset password");
        }
        return responseData;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
