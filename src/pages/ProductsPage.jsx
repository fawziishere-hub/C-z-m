import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Server, Shield, Cpu, HardDrive } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Mock Data for IT Wholesale Products
const mockProducts = [
  { id: 1, name: "Enterprise Server Pro Gen11", brand: "HPE", category: "Sunucu", desc: "2U Rack Server, 2x Intel Xeon Scalable, 128GB RAM, 8x SFF", icon: <Server size={40} /> },
  { id: 2, name: "CloudSwitch 9000 Series", brand: "Cisco", category: "Ağ & Güvenlik", desc: "48-Port 10G/25G SFP28, 4x 100G QSFP28 Uplink Switch", icon: <Cpu size={40} /> },
  { id: 3, name: "Business EliteBook 15", brand: "HP", category: "Bilgisayar", desc: "Intel Core i7 13. Nesil, 16GB RAM, 512GB NVMe SSD, 15.6'' FHD", icon: <Cpu size={40} /> },
  { id: 4, name: "All-Flash Storage Array", brand: "Dell", category: "Depolama", desc: "24x NVMe SSD yuvası, Çift Kontrolcü, 100GbE Bağlantı", icon: <HardDrive size={40} /> },
  { id: 5, name: "Next-Gen Firewall Gate", brand: "Fortinet", category: "Ağ & Güvenlik", desc: "Kurumsal Güvenlik Duvarı, 10 Gbps IPS Throughput", icon: <Shield size={40} /> },
  { id: 6, name: "ThinkCentre M-Series", brand: "Lenovo", category: "Bilgisayar", desc: "Kurumsal Masaüstü, Intel Core i5, 8GB RAM, 256GB SSD", icon: <Cpu size={40} /> },
  { id: 7, name: "Blade Server System", brand: "Dell", category: "Sunucu", desc: "Yüksek yoğunluklu blade sunucu şasisi, 8x modül desteği", icon: <Server size={40} /> },
  { id: 8, name: "Wireless Access Point", brand: "Aruba", category: "Ağ & Güvenlik", desc: "Wi-Fi 6E (802.11ax), 4x4 MU-MIMO, İç Mekan AP", icon: <Cpu size={40} /> },
];

const categories = ["Tüm Ürünler", "Sunucu", "Ağ & Güvenlik", "Bilgisayar", "Depolama"];

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tüm Ürünler");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "Tüm Ürünler") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    return filtered;
  }, [searchTerm, selectedCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-20">
      {/* Header Section */}
      <div className="bg-slate-900 py-20 border-b border-slate-800">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Ürün Kataloğu
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg md:text-xl text-slate-300"
          >
            Dünyanın lider teknoloji markalarının sunucu, ağ, güvenlik ve kurumsal bilgisayar çözümlerini keşfedin.
          </motion.p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 transform text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Ürün, marka veya özellik ara..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl py-4 pe-4 ps-12 border-2 border-slate-700 bg-slate-900 text-white transition-colors focus:border-blue-600 focus:outline-none shadow-lg"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-slate-500 dark:text-slate-400">
              Arama kriterlerinize uygun ürün bulunamadı.
            </p>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentProducts.map((product) => (
                <motion.div 
                  key={product.id} 
                  variants={itemVariants}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col transition-transform hover:-translate-y-1"
                >
                  <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    {product.icon}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-600/10 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {product.brand}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                      {product.desc}
                    </p>
                    <button 
                      onClick={() => navigate("/teklif")}
                      className="w-full py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      Teklif İste
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-center gap-2"
              >
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`rounded-lg p-3 transition-colors ${
                    currentPage === 1
                      ? "cursor-not-allowed bg-slate-800 text-slate-600"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`h-12 w-12 rounded-lg font-bold transition-all ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-slate-800 text-white hover:bg-slate-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`rounded-lg p-3 transition-colors ${
                    currentPage === totalPages
                      ? "cursor-not-allowed bg-slate-800 text-slate-600"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}