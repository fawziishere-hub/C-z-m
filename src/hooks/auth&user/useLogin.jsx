import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient"; // <-- FIXED PATH: went up two folders!

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data }) => {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return authData;
    },
    onSuccess: (authData) => {
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: authData.session.access_token,
          user: authData.user,
        })
      );
      
      localStorage.setItem(
        "tokenExpiryTime",
        JSON.stringify(Date.now() + 24 * 60 * 60 * 1000)
      );
      
      toast.success("Logged in successfully");
      navigate(-1, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again");
    },
  });

  return { mutate, isLoading, isSuccess };
};

export const useGmailLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again");
    },
  });

  return { mutate, isLoading, isSuccess };
};
