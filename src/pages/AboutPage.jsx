import { 
  Building, 
  Users, 
  Award, 
  ShieldCheck, 
  Monitor, 
  Briefcase 
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 dark:bg-gray-900">
      <div className="bg-slate-900 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold text-white">Hakkımızda</h1>
            <p className="mx-auto max-w-3xl text-xl text-slate-300">
              1992'den bugüne bilişim sektörünün odağında faaliyet gösteren Çözüm A.Ş., toptancı ve bayi kanalında güvenilir teknoloji çözümleri sunmaktadır.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                Bilişim Sektörünün Odağında
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-md">
                İletişim ve teknolojide yaşanan baş döndürücü gelişmelerin yaşamımızı, kültürümüzü, iş yapış biçimlerimizi yeniden şekillendirdiği günümüzde, Çözüm A.Ş. 1992 'den bugüne kadar tüm gelişmeleri tetikleyen bilişim sektörünün odağında faaliyet göstermektedir.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-md">
                Bilişim sektörüne ilk adımını yazılım çözümleri ile Ankara 'da atan Çözüm A.Ş. kısa süre sonra bilgisayar ürünleri toptancılığı, ithalatı ve dağıtıcılığında başlamıştır. 2000 yılından itibaren her biri kendi alanında önemli markaların Türkiye distribütörlüklerini alarak toptancı ve bayi kanalına dağıtımına başlamıştır.
              </p>
            </div>

            {/* Images Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Top right image with decorative elements */}
                <div className="relative">
                  <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-blue-500" />
                  <div className="absolute top-10 -right-5 w-2 h-2 rounded-full bg-indigo-400" />
                  <img
                    src="/images/images.jpg"
                    alt="Hardware components"
                    className="w-full h-52 object-cover rounded-3xl shadow-sm"
                  />
                </div>

                {/* Top left image */}
                <div className="mt-10">
                  <img
                    src="/images/images (1).jpg"
                    alt="Technology landscape"
                    className="w-full h-44 object-cover rounded-3xl shadow-sm"
                  />
                </div>

                {/* Bottom spanning image */}
                <div className="col-span-2 relative">
                  <svg
                    className="absolute -bottom-6 left-1/4 w-20 h-10 text-blue-500"
                    viewBox="0 0 80 40"
                    fill="none"
                  >
                    <path
                      d="M4 36C24 12 56 12 76 36"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="5 5"
                    />
                    <polygon points="72,32 80,38 72,42" fill="currentColor" />
                  </svg>
                  <img
                    src="/images/302280246_771034630948758_7742345004754826207_n.png"
                    alt="Değer katar"
                    className="w-full h-36 object-cover rounded-3xl shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-4 right-10 w-4 h-4 rounded-full bg-blue-500" />
              <div className="absolute top-14 -right-3 w-2 h-2 rounded-full bg-indigo-400" />
              <img
                src="/images/computer-equipment-in-a-row-working-inside-of-crowded-warehouse-generated-by-ai-photo.jpg"
                alt="B2B Operations and Servers"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-sm"
              />
              {/* Decorative line */}
              <svg
                className="absolute -bottom-8 left-4 w-28 h-14"
                viewBox="0 0 112 56"
                fill="none"
              >
                <path
                  d="M4 52C36 16 76 16 108 52"
                  stroke="hsl(220, 90%, 56%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="space-y-10 order-1 lg:order-2">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white mb-5">
                  Kamu ve B2B Çözümleri
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  2006 yılında kamuya tedarikçi olma vizyonuyla Devlet Malzeme Ofisi kataloğunun bilgi teknolojileri alanında faaliyet göstermeye başlamıştır. 2006 yılından günümüze kadar DMO Kataloğunda birçok markanın temsilciliğini yapmaktadır. Ayrıca 2006 yılında Webmarket isimli B2B e-Ticaret sitesini bayilerinin hizmetine sunmuştur.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white mb-5">
                  Temel Değerlerimiz
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kurum Kültürü</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Köklü geçmişimizle güven ve istikrara dayalı sağlam bir kurumsal yapı.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hizmet Kalitesi</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">TSE ve ISO 9001:2015 belgeleriyle tescillenmiş üstün hizmet standartları.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Güvenilirlik</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">İş ortaklarımız ve müşterilerimizle şeffaf, dürüst ve uzun vadeli ilişkiler.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Çalışma Prensipleri</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Yenilikçi teknolojileri en hızlı ve güvenli şekilde pazara sunma vizyonu.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white">
                Sektörün Önemli Oyuncusu
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-lg">
                ÇÖZÜM A.Ş. bugün geldiği noktada; kurum kültürü, marka kimliği, sahip olduğu değerleri, çalışma prensipleri, hizmet kalitesi ve güvenilirliği ile bilişim sektörünün en önemli aktörlerinden birisidir.
              </p>
              
              <Link
                to="/contact"
                className="bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-slate-800 block w-fit shadow-md"
              >
                Bayimiz Olun
              </Link>

              {/* Stats */}
              <div className="flex gap-12 pt-6 flex-wrap">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                    3
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase">Şube</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                    70+
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase">Çalışan</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                    2500+
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase">Bayi Ağı</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 left-10 w-4 h-4 rounded-full bg-blue-500" />
              <div className="absolute top-20 -left-3 w-2 h-2 rounded-full bg-indigo-400" />

              {/* Decorative curved arrow */}
              <svg
                className="absolute -top-10 right-1/4 w-24 h-12"
                viewBox="0 0 96 48"
                fill="none"
              >
                <path
                  d="M4 44C28 8 68 8 92 44"
                  stroke="hsl(220, 90%, 56%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 6"
                />
                <polygon points="88,40 96,46 88,50" fill="hsl(220, 90%, 56%)" />
              </svg>

              <img
                src="/images/ai-programs-used-server-room-ensure-optimal-system-performance_482257-118354.avif"
                alt="Corporate Success"
                className="w-full h-96 lg:h-[28rem] object-cover rounded-3xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Neden Çözüm A.Ş.?
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kurumlar ve bayiler için baştan uca bilgi teknolojileri tedariği sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600"
            >
              <div className="w-12 h-12 bg-slate-900 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <Monitor className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Toptan Dağıtım</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Türkiye distribütörlüklerimizle teknoloji ürünlerinin güvenilir tedariği.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Building className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">DMO Tedarikçisi</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">2006'dan beri kamu kurumlarının güvenilir BT çözüm ortağı.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600"
            >
              <div className="w-12 h-12 bg-slate-900 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">B2B Webmarket</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Bayilerimize özel hızlı ve kesintisiz online sipariş altyapısı.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Sertifikalı Kalite</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">TSE ve ISO 9001:2015 belgeleri ile tescillenmiş süreç yönetimi.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-slate-900 py-20 px-6 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Teknoloji İhtiyaçlarınız İçin Hazırız
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Bayimiz olmak veya kurumsal çözümlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçin.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Bize Ulaşın
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;