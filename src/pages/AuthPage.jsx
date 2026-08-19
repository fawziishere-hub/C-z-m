import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Building } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/auth&user/useLogin";
import { useRegister } from "../hooks/auth&user/useRegister";

const AuthPage = () => {
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const { mutate: login, isLoading: isLoginLoading } = useLogin();
  const { mutate: signup, isLoading: isSignupLoading } = useRegister();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch: signupWatch,
    formState: { errors: signupErrors },
    reset: signupReset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = signupWatch("password");

  const handleLogin = async (data) => {
    login({ data });
  };

  const handleSignup = async (data) => {
    const { confirmPassword, ...signupData } = data;
    // Defaulting role to 'corporate_client' for the B2B platform
    signup(
      { data: { ...signupData, role: "corporate_client" } },
      {
        onSuccess: () => {
          setIsLogin(true);
          signupReset();
        },
      }
    );
  };

  if (token) return null;

  return (
    <div className="relative mt-20 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-20 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 md:grid-cols-2 border border-slate-200 dark:border-slate-800"
      >
        {/* Form Section */}
        <div className="flex flex-col justify-center p-8 md:p-12 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              className="mb-8 flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              {/* Inserted the actual logo image you provided */}
<img src="/images/f40e7026-5f0d-4f46-a960-21c93b7f6209.png" alt="Çözüm Logo" className="w-48 h-auto" />            </motion.div>

            <h1 className="mb-2 text-3xl font-black text-slate-900 dark:text-white md:text-4xl tracking-tight">
              {isLogin ? "Kurumsal Giriş" : "Firma Kaydı Oluşturun"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {isLogin
                ? "B2B toptan alım portalına giriş yapın."
                : "Toptan BT donanım ve sunucu projeleriniz için bize katılın."}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleLoginSubmit(handleLogin)}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    E-Posta Adresi
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      {...loginRegister("email", {
                        required: "E-posta gerekli",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Geçersiz e-posta formatı",
                        },
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 ps-12 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="kurumsal@firma.com"
                    />
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  </div>
                  {loginErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{loginErrors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Şifre
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...loginRegister("password", {
                        required: "Şifre gerekli",
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pe-12 ps-12 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{loginErrors.password.message}</p>
                  )}
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                  >
                    Şifremi Unuttum
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoginLoading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoginLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </motion.button>

                <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                  Hesabınız yok mu?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="font-bold text-blue-600 hover:text-blue-700 transition"
                  >
                    Firma Kaydı Oluştur
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSignupSubmit(handleSignup)}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Firma Adı / Yetkili Kişi
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      {...signupRegister("name", {
                        required: "Bu alan zorunludur",
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 ps-12 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="ABC Teknoloji A.Ş."
                    />
                    <Building className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  </div>
                  {signupErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{signupErrors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Kurumsal E-Posta
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      {...signupRegister("email", {
                        required: "E-posta gerekli",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Geçersiz e-posta formatı",
                        },
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 ps-12 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="kurumsal@firma.com"
                    />
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  </div>
                  {signupErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{signupErrors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Şifre
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...signupRegister("password", {
                        required: "Şifre gerekli",
                        minLength: {
                          value: 6,
                          message: "Şifre en az 6 karakter olmalıdır",
                        },
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pe-12 ps-12 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signupErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{signupErrors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Şifre Tekrarı
                  </label>
                  <div className="relative group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...signupRegister("confirmPassword", {
                        required: "Şifre tekrarı gerekli",
                        validate: (value) =>
                          value === password || "Şifreler eşleşmiyor",
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pe-12 ps-12 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signupErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{signupErrors.confirmPassword.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSignupLoading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 mt-4"
                >
                  {isSignupLoading ? "Kaydediliyor..." : "Hesap Oluştur"}
                </motion.button>

                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Zaten hesabınız var mı?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="font-bold text-blue-600 hover:text-blue-700 transition"
                  >
                    Giriş Yap
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Illustration Section (Using Seagate Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:block bg-slate-100 dark:bg-slate-800 relative"
        >
          {/* Replaced generic image with the Seagate SkyHawk 24TB image */}
         <img
  src="/images/b9c2cfab-2f68-4a15-abdd-56d4ae42d238.jpg"
  className="w-full h-full object-cover"
  alt="Seagate SkyHawk AI"
/>
          {/* Added a sleek overlay to blend the image into the UI */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Kurumsal Donanım Tedariği</h3>
            <p className="text-slate-300 text-sm">Sunucu, depolama ve ağ güvenliği projeleriniz için en iyi fiyat garantisi.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;