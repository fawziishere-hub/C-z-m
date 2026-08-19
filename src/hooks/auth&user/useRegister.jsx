import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient"; // <-- Check this path!

export const useRegister = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    // Notice we keep your exact ({ data }) structure so your frontend form doesn't break!
    mutationFn: async ({ data }) => {
      // We pull out email and password, and group everything else (like full_name, phone)
      const { email, password, ...metaData } = data;

      const { data: authData, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          // This 'data' object is exactly what the SQL trigger catches as 'raw_user_meta_data'
          data: metaData, 
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return authData;
    },
    onSuccess: () => {
      // Keeping your exact original success actions!
      toast.success("Account registered successfully.");[cite: 4]
      window.location.reload();[cite: 4]
      localStorage.removeItem("tracking_link_id");[cite: 4]
    },
    onError: (error) => {
      toast.error(error.message || "Invalid data entered.");[cite: 4]
    },
  });

  return { mutate, isLoading, isSuccess };
};
