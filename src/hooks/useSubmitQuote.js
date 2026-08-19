import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const useSubmitQuote = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (data) => {
      // Retrieve token in case the user is logged in (optional, based on your API rules)
      const token = JSON.parse(localStorage.getItem("token"))?.token;

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/quotes`, // <-- Update this endpoint if your backend route is different
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: headers,
        }
      );

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Handle validation errors (like Laravel) or fallback to generic message
        const firstError = responseData.errors
          ? Object.values(responseData.errors)[0][0]
          : responseData.message;
          
        throw new Error(firstError || "Bir hata oluştu, lütfen tekrar deneyin.");
      }

      return responseData;
    },
    onSuccess: (data) => {
      // Uses the success message from the backend if provided, otherwise defaults to your Turkish text
      toast.success(data?.message || "Teklif talebiniz başarıyla alındı!");
    },
    onError: (error) => {
      toast.error(error.message || "Bağlantı hatası: Lütfen tekrar deneyin.");
    },
  });

  return { mutate, isLoading, isSuccess };
};