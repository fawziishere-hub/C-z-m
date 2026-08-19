import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-primary-50 dark:bg-gray-900">
      {/* CTA / Info Section */}
      {pathname !== "/about" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary mx-4 md:mx-8 lg:mx-16 rounded-3xl -mb-10 z-10 relative shadow-2xl dark:bg-slate-800"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="relative w-full lg:w-[45%] min-h-[280px] lg:min-h-[320px] flex items-center justify-center overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
              {/* Sparkle decorations */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-8 right-1/4 text-primary-foreground text-2xl opacity-80"
              >
                ✦
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-20 right-1/3 text-primary-foreground text-lg opacity-60"
              >
                ✦
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-14 left-1/4 text-primary-foreground text-sm opacity-70"
              >
                ✦
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
                className="absolute bottom-1/3 right-1/5 text-primary-foreground text-xl opacity-80"
              >
                ✦
              </motion.div>
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src="/images/footer_image.png"
                alt="Technology Equipment"
                className="h-56 lg:h-auto drop-shadow-md z-10"
              />
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-[55%] p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-primary-foreground leading-tight mb-4"
              >
                Kurumunuz İçin Doğru Teknoloji Çözümleri
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-primary-foreground/80 mb-6 text-base"
              >
                1992'den bugüne, DMO kataloğu ve 2500'ü aşkın bayi ağımızla bilişim ihtiyaçlarınıza profesyonel çözümler sunuyoruz.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  to="/contact"
                  className="rounded-lg bg-white px-8 py-4 font-semibold text-primary-700 shadow-lg transition-colors hover:bg-gray-100 w-fit inline-block dark:bg-gray-200 dark:text-slate-900"
                >
                  Bize Ulaşın
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Footer */}
      <div className="bg-background px-4 md:px-8 lg:px-16 pt-32 pb-12 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              {/* Logo */}
              <div
                className="flex items-center gap-2 cursor-pointer mb-4"
                onClick={() => navigate("/")}
              >
                <h3 className="text-2xl font-bold text-primary dark:text-white tracking-tight">Çözüm A.Ş.</h3>
              </div>
              <p className="text-primary-900 dark:text-gray-400 text-sm leading-relaxed my-3 max-w-xs">
                Bilgisayar ürünleri toptancılığı, ithalatı ve dağıtıcılığında sektörün öncü ve güvenilir gücü. TSE ve ISO 9001:2015 güvencesiyle.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-6">
                <motion.a
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  href="https://www.linkedin.com/company/cozum-yazilim-don-elek-i%CC%87c-ve-dis-ti%CC%87c-a-s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold text-primary dark:text-white mb-4 text-base">Kurumsal</h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <Link
                    to="/"
                    className="text-primary-900 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors text-sm"
                  >
                    Ana Sayfa
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link
                    to="/about"
                    className="text-primary-900 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors text-sm"
                  >
                    Hakkımızda
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link
                    to="/auth"
                    className="text-primary-900 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors text-sm"
                  >
                    B2B Giriş
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            {/* Products/Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-bold text-primary dark:text-white mb-4 text-base">Hizmetler</h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-primary-900 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors text-sm"
                  >
                    DMO Kataloğu
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-primary-900 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors text-sm"
                  >
                    Markalarımız
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-primary-900 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors text-sm"
                  >
                    Bayilik Başvurusu
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h3 className="font-bold text-primary dark:text-white mb-4 text-base">
                İletişim
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary dark:text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-primary-900 dark:text-gray-400 text-sm leading-relaxed">
                    Maltepe, Gazi Mustafa Kemal Blv. No:54 D:B<br/>06570 Çankaya/Ankara
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary dark:text-gray-400 flex-shrink-0" />
                  <span className="text-primary-900 dark:text-gray-400 text-sm">
                    (0312) 218 18 18
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary dark:text-gray-400 flex-shrink-0" />
                  <a href="http://www.cozum.com.tr" target="_blank" rel="noreferrer" className="text-primary-900 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                    www.cozum.com.tr
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="bg-primary-50 dark:bg-gray-900 px-4 md:px-8 lg:px-16 py-4 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-900 dark:text-gray-500 text-sm">
            Tüm hakları saklıdır {new Date().getFullYear()} © Çözüm Yazılım Donanım A.Ş.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a
              href="#"
              className="text-primary-900 dark:text-gray-500 hover:text-primary dark:hover:text-white transition-colors text-sm"
            >
              Gizlilik Politikası
            </a>
            <a
              href="#"
              className="text-primary-900 dark:text-gray-500 hover:text-primary dark:hover:text-white transition-colors text-sm"
            >
              Kullanım Koşulları
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;