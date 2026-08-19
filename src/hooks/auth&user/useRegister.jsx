import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const mutateRegister = async (data) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/register`,
    {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const responseData = await res.json();

  if (res.ok) {
    return responseData;
  }

  // Handle errors from the API
  const firstError = responseData.errors
    ? Object.values(responseData.errors)[0][0]
    : responseData.message;
  throw new Error(firstError || "An error occurred, please try again");
};

export const useRegister = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: ({ data }) => mutateRegister(data),
    onSuccess: async () => {
      toast.success("Account registered successfully.");
      window.location.reload();
      localStorage.removeItem("tracking_link_id");
    },

    onError: (error) => {
      toast.error(error.message || "Invalid data entered.");
    },
  });

  return { mutate, isLoading, isSuccess };
};
