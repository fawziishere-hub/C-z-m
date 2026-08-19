import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data }) => {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const json = await res.json();

      if (!res.ok) {
        const errorMessage =
          json.message || json.error || "An error occurred, please try again";
        throw new Error(errorMessage);
      }

      return json;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data));
      localStorage.setItem(
        "tokenExpiryTime",
        JSON.stringify(Date.now() + 24 * 60 * 60 * 1000)
      );
      toast.success("Logged in successfully");
      navigate(-1, { replace: true });
    },

    onError: (error, data) => {
      toast.error(`${error}`);
    },
  });

  return { mutate, isLoading, isSuccess };
};

export const useGmailLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data }) => {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/login-w-google`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await res.json();

      if (!res.ok) {
        const errorMessage =
          json.message || json.error || "An error occurred, please try again";
        throw new Error(errorMessage);
      }

      return json;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data));
      localStorage.setItem(
        "tokenExpiryTime",
        JSON.stringify(Date.now() + 24 * 60 * 60 * 1000)
      );
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    },

    onError: (error, data) => {
      toast.error(`${error}`);
    },
  });

  return { mutate, isLoading, isSuccess };
};
