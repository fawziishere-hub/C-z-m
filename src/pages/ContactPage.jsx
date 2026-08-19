import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Globe, Clock } from "lucide-react";
import { useSendContact } from "../hooks/contactHooks/useSendContact";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const ContactForm = ({ showHeader = true }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate, isLoading: isSubmitting, isSuccess } = useSendContact();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-20 dark:bg-gray-900">
      {/* Header */}
      {showHeader && (
        <div className="bg-slate-900 py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="mb-6 text-5xl font-bold text-white">
                İletişim
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-slate-300">
                Bize ulaşmak için aşağıdaki bilgileri kullanabilir veya formu doldurabilirsiniz.
              </p>
            </motion.div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Contact Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          
          {/* Info Card */}
          <motion.div
            className="relative bg-slate-900 text-white p-10 lg:w-[400px] flex flex-col justify-between overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">İletişim Bilgileri</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-10">
                Çözüm Yazılım Donanım A.Ş. ile ilgili tüm soru, görüş ve önerileriniz için bize ulaşın.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 text-slate-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Adres</h3>
                    <p className="text-base">Maltepe, Gazi Mustafa Kemal Blv. No:54 D:B<br/>06570 Çankaya/Ankara</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1 text-slate-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Telefon</h3>
                    <p className="text-base">(0312) 218 18 18</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 mt-1 text-slate-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Çalışma Saatleri</h3>
                    <p className="text-base">08:30 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 mt-1 text-slate-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Web</h3>
                    <p className="text-base">www.cozum.com.tr</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-slate-800/50" />
            <div className="absolute -bottom-24 right-16 w-32 h-32 rounded-full bg-slate-700/30" />
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="flex-1 p-10 lg:p-12"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.4,
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Mesaj Gönder</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name & Email Row */}
              <motion.div
                variants={formItemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Ad Soyad</label>
                  <input
                    type="text"
                    {...register("name", { required: "Ad Soyad gereklidir" })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-900 focus:ring-slate-900 p-3 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none transition-all"
                    placeholder="Adınız ve Soyadınız"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    E-posta
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "E-posta gereklidir",
                    })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-900 focus:ring-slate-900 p-3 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none transition-all"
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={formItemVariants} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
                <input
                  type="text"
                  {...register("phone", { required: "Telefon numarası gereklidir" })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-900 focus:ring-slate-900 p-3 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none transition-all"
                  placeholder="05XX XXX XX XX"
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs">
                    {errors.phone.message}
                  </span>
                )}
              </motion.div>

              {/* Message */}
              <motion.div variants={formItemVariants} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mesajınız</label>
                <textarea
                  {...register("message", { required: "Mesaj alanı boş bırakılamaz" })}
                  rows={4}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-900 focus:ring-slate-900 p-3 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none transition-all resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                />
                {errors.message && (
                  <span className="text-red-500 text-xs">
                    {errors.message.message}
                  </span>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={formItemVariants}
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-slate-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors shadow-md disabled:bg-slate-700 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;