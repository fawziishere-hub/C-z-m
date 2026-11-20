import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

// Yönetici hesabı. Vercel'de VITE_ADMIN_EMAIL ortam değişkeniyle değiştirilebilir.
// Bu adres gizli bir bilgi değildir; şifreyi Supabase doğrular.
const ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL || "admin@gmail.com"
).toLowerCase();

const AdminGate = ({ children }) => {
  const [status, setStatus] = useState("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    const isAdmin = (session) =>
      session?.user?.email?.toLowerCase() === ADMIN_EMAIL;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setStatus(isAdmin(data?.session) ? "authed" : "denied");
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;
        setStatus(isAdmin(session) ? "authed" : "denied");
      }
    );

    return () => {
      active = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
        await supabase.auth.signOut();
        throw new Error("Bu hesabın yönetim paneli yetkisi yok.");
      }

      toast.success("Yönetim paneline hoş geldiniz.");
    } catch (error) {
      toast.error(error.message || "Giriş başarısız.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "checking") {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-500 font-medium">
        Yükleniyor...
      </div>
    );
  }

  if (status === "authed") return children;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img
            src="/images/f40e7026-5f0d-4f46-a960-21c93b7f6209.png"
            alt="Çözüm Logo"
            className="w-14 h-14 object-contain bg-white rounded-2xl p-1.5 mx-auto mb-5"
          />
          <h1 className="text-2xl font-black text-white tracking-tight">
            Yönetim Paneli Girişi
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Bu alan yalnızca yetkili kullanıcılar içindir.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-2xl space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              E-posta
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ornek.com"
                autoComplete="username"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Şifre</label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-sky-500 py-3.5 font-bold text-white transition-all hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          Çözüm Yazılım B2B Panel
        </p>
      </motion.div>
    </div>
  );
};

export default AdminGate;
