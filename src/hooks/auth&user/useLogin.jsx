import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient"; // <-- Make sure this path is correct!

export const useLogin = () => {
  const navigate = useNavigate(); //[cite: 2]

  const { mutate, isLoading, isSuccess } = useMutation({
    // Keep the same ({ data }) structure from your old frontend
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
      // We map the Supabase token to your old localStorage format so the rest of the app doesn't break
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: authData.session.access_token,
          user: authData.user,
        })
      ); //[cite: 2]
      
      localStorage.setItem(
        "tokenExpiryTime",
        JSON.stringify(Date.now() + 24 * 60 * 60 * 1000)
      ); //[cite: 2]
      
      toast.success("Logged in successfully"); //[cite: 2]
      navigate(-1, { replace: true }); //[cite: 2]
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again"); //[cite: 2]
    },
  });

  return { mutate, isLoading, isSuccess };
};

// If you want to keep the Google login button working via Supabase OAuth:
export const useGmailLogin = () => {
  const navigate = useNavigate(); //[cite: 2]

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
    // Supabase handles the OAuth redirect automatically, so we just trigger it and let it run
    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again"); //[cite: 2]
    },
  });

  return { mutate, isLoading, isSuccess };
};
