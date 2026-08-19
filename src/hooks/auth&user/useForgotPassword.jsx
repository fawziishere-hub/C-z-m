import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient"; // <-- Verify this path!

// Step 1: Send the reset email
export const useForgotPassword = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ email }) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        // This tells Supabase where to send the user after they click the email link.
        // window.location.origin automatically grabs your Vercel URL!
        redirectTo: `${window.location.origin}/reset-password`, 
      });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Şifre sıfırlama e-postası başarıyla gönderildi! Gelen kutunuzu kontrol edin.");
    },
    onError: (error) => {
      toast.error(error.message || "E-posta gönderilemedi. Lütfen tekrar deneyin.");
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};

// Step 2: Update the password (run this when they submit the new password form)
export const useUpdatePassword = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ password }) => {
      // Because they clicked the email link, Supabase already knows who they are.
      // We just pass the new password directly!
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Şifreniz başarıyla güncellendi!");
    },
    onError: (error) => {
      toast.error(error.message || "Şifre güncellenemedi. Lütfen tekrar deneyin.");
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
