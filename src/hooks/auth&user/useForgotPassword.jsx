import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient"; // <-- Verify this path!

export const useForgotPassword = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ email }) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success("Şifre sıfırlama e-postası gönderildi. Gelen kutunuzu kontrol edin.");
    },
    onError: (error) => {
      toast.error(error.message || "Sıfırlama e-postası gönderilemedi");
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};

export const useResetPassword = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ email, otp, password }) => {
      // Step 1: Verify the code
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery'
      });
      if (verifyError) throw new Error(verifyError.message);

      // Step 2: Update the password
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw new Error(updateError.message);
      
      return true;
    },
    onSuccess: () => {
      toast.success("Şifreniz başarıyla sıfırlandı!");
    },
    onError: (error) => {
      toast.error(error.message || "Şifre sıfırlanamadı");
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};