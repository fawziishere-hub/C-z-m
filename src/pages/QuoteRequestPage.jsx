import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Adjust this path if your hook is in a different folder!
import { useSubmitQuote } from "../hooks/useSubmitQuote"; 
import {
  ArrowLeft,
  Building,
  User,
  Mail,
  Phone,
  Package,
  MessageSquare,
  Send,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuoteRequestPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Pulling in the real backend mutation
  const { mutate: submitQuote, isLoading: isSubmitting, isSuccess } = useSubmitQuote();

  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Watch for successful API response to trigger the success animation
  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setFormData({
        companyName: "",
        fullName: "",
        email: "",
        phone: "",
        category: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fire the REAL API call to your backend
    submitQuote(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-20">
      
      {/* Hero Header */}
      <div className="relative h-[300px] bg-slate-900 overflow-hidden border-b border-slate-800 flex items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/products")}
          className="absolute left-4 top-8 md:left-8 inline-flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700 px-4 md:px-6 py-3 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 z-20"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline">Ürünlere Dön</span>
        </motion.button>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            Teklif İste
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Kurumsal BT projeleriniz ve toptan donanım ihtiyaçlarınız için uzman ekibimizden özel fiyatlandırma talep edin.
          </motion.p>
        </div>
      </div>

      {/* Form Card */}
      <div className="relative z-20 mx-auto -mt-16 max-w-4xl px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Talebiniz Alındı</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Teklif talebiniz satış ekibimize başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
                </p>
                <button 
                  onClick={() => navigate("/products")}
                  className="mt-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Kataloğa Dön
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Kurum / Firma Adı</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
                        placeholder="Örn: ABC Teknoloji A.Ş."
                      />
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Yetkili Kişi</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
                        placeholder="Adınız ve Soyadınız"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">E-posta Adresi</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
                        placeholder="kurumsal@firma.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Telefon Numarası</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">İlgilendiğiniz Ürün Grubu</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Lütfen bir kategori seçin...</option>
                      <option value="sunucu">Sunucu Çözümleri</option>
                      <option value="ag-guvenlik">Ağ & Güvenlik (Switch, Firewall, AP)</option>
                      <option value="bilgisayar">Kurumsal Bilgisayar & Laptop</option>
                      <option value="depolama">Veri Depolama (Storage)</option>
                      <option value="toplu-proje">Toplu BT Proje Tedariği</option>
                    </select>
                  </div>
                </div>

                {/* Message Details */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Talep Detayları</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors resize-none"
                      placeholder="İhtiyacınız olan ürün modellerini, tahmini adetleri veya proje detaylarını buraya yazabilirsiniz..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    "Gönderiliyor..."
                  ) : (
                    <>
                      <Send size={20} />
                      Teklif Talebini Gönder
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}