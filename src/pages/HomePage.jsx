import { motion } from "framer-motion";
import {
  FiMonitor,
  FiAward,
  FiGlobe,
  FiUsers,
  FiTrendingUp,
  FiBox,
  FiArrowRight
} from "react-icons/fi";
import ContactPage from "../pages/ContactPage";

const HomePage = ({ onNavigate }) => {
  const stats = [
    { id: 1, label: "Kuruluş Yılı", value: "1992", icon: <FiTrendingUp className="w-6 h-6" /> },
    { id: 2, label: "Aktif Bayi Ağı", value: "2500+", icon: <FiUsers className="w-6 h-6" /> },
    { id: 3, label: "Fiziksel Şube", value: "3", icon: <FiGlobe className="w-6 h-6" /> },
    { id: 4, label: "Uzman Personel", value: "70+", icon: <FiAward className="w-6 h-6" /> },
  ];

  const features = [
    {
      id: 1,
      title: "Toptan BT Donanımı",
      description: "Dünyanın önde gelen teknoloji markalarının Türkiye distribütörlüğü ve bayi kanalına güvenilir, kesintisiz dağıtımı.",
      icon: <FiMonitor className="w-8 h-8" />,
    },
    {
      id: 2,
      title: "DMO Tedarikçisi",
      description: "2006 yılından bugüne Devlet Malzeme Ofisi kataloğunda bilgi teknolojileri alanında yetkili ve onaylı kamu tedarikçisi.",
      icon: <FiAward className="w-8 h-8" />,
    },
    {
      id: 3,
      title: "B2B Webmarket",
      description: "Bayilerimize özel olarak geliştirilmiş, hızlı, şeffaf ve güvenilir online B2B e-ticaret platformu altyapısı.",
      icon: <FiBox className="w-8 h-8" />,
    },
  ];

  return (
    <div className="max-w-[100vw] overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-32 dark:bg-slate-950 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="mb-6 inline-block rounded-full bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300">
             30+ Yıllık Sektör Tecrübesi
            </span>
            <h1 className="mb-6 text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Bilişim Sektörünün <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Güvenilir Lideri
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-300 mb-10 leading-relaxed">
              1992'den bugüne kamu ve özel sektöre yenilikçi bilgi teknolojileri, toptan donanım dağıtımı ve kurumsal çözümler sunuyoruz.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => onNavigate("about")}
                className="rounded-lg bg-white text-slate-900 px-8 py-4 font-bold transition-all hover:bg-gray-100 shadow-lg"
              >
                Hakkımızda
              </button>
              <button 
                onClick={() => onNavigate("contact")}
                className="rounded-lg bg-transparent border border-slate-500 text-white px-8 py-4 font-bold transition-all hover:bg-slate-800"
              >
                Bize Ulaşın
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="text-slate-900 dark:text-white mb-3 bg-slate-100 dark:bg-slate-700 p-3 rounded-full">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Faaliyet Alanlarımız
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sektördeki tecrübemiz ve güçlü iş ortaklıklarımızla kurumunuzun tüm BT ihtiyaçlarını tek noktadan karşılıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="text-slate-900 dark:text-slate-100 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Contact Page */}
      <div id="contact-section">
        <ContactPage showHeader={false} />
      </div>
      
    </div>
  );
};

export default HomePage;