import { useMutation } from "react-query";
import { toast } from "react-toastify";

const mutateUpdateProfile = async (data) => {
  const userToken = JSON.parse(localStorage.getItem("token"))?.token;

  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/update`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      }
    );
    if (res.ok) {
      return await res.json();
    }
    const errorData = await res.json();
    const errorMessage =
      errorData?.message || errorData?.email?.[0] || "Unknown error occurred";
    throw new Error(errorMessage);
  } catch (error) {
    throw new Error(error.message || "Unknown error occurred");
  }
};

export const useUpdateProfile = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: ({ data }) => mutateUpdateProfile(data),
    onSuccess: (data) => {
      const user = JSON.parse(localStorage.getItem("token"));
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: user.token,
          user: data.user,
        })
      );
      toast.success("Profile updated successfully");
    },

    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again");
    },
  });

  return { mutate, isLoading, isSuccess };
};
