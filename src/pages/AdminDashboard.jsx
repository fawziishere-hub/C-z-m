import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  Phone,
  Package,
  Search,
  Bell,
  Clock,
  CheckCircle2,
  MessageSquare,
  ArrowLeft,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

// Status workflow: pending -> confirmed -> contacted
const STATUS_META = {
  pending: { label: "Yeni Talep", badge: "bg-orange-100 text-orange-700" },
  confirmed: { label: "Teklif Verildi", badge: "bg-sky-100 text-sky-700" },
  contacted: { label: "Tamamlandı", badge: "bg-green-100 text-green-700" },
};

// Matches the <option value="..."> values in QuoteRequestPage.jsx
const CATEGORY_LABELS = {
  sunucu: "Sunucu Çözümleri",
  "ag-guvenlik": "Ağ & Güvenlik (Switch, Firewall, AP)",
  bilgisayar: "Kurumsal Bilgisayar & Laptop",
  depolama: "Veri Depolama (Storage)",
  "toplu-proje": "Toplu BT Proje Tedariği",
};

const FILTERS = [
  { key: "all", label: "Tümü" },
  { key: "pending", label: "Yeni" },
  { key: "confirmed", label: "Teklif Verildi" },
  { key: "contacted", label: "Tamamlandı" },
];

const statusOf = (quote) => {
  const status = (quote.status || "").toLowerCase();
  return STATUS_META[status] ? status : "pending";
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Teklif talepleri yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status, successMessage) => {
    try {
      const { error } = await supabase
        .from("quotes")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast.success(successMessage);
      fetchQuotes();
    } catch (error) {
      toast.error("Güncellenemedi: " + error.message);
    }
  };

  const handleConfirm = (id) =>
    updateStatus(id, "confirmed", "Talep onaylandı, teklif verildi olarak işaretlendi!");

  const handleComplete = (id) =>
    updateStatus(id, "contacted", "Talep tamamlandı olarak işaretlendi!");

  const exportToCsv = () => {
    if (filteredQuotes.length === 0) {
      toast.info("Dışa aktarılacak kayıt yok.");
      return;
    }

    const headers = [
      "Firma",
      "Yetkili",
      "E-posta",
      "Telefon",
      "Ürün Grubu",
      "Talep",
      "Tarih",
      "Durum",
    ];

    const escapeCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filteredQuotes.map((quote) => [
      quote.companyName,
      quote.fullName,
      quote.email,
      quote.phone,
      CATEGORY_LABELS[quote.category] || quote.category,
      quote.message,
      formatDate(quote.created_at),
      STATUS_META[statusOf(quote)].label,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCell).join(";"))
      .join("\r\n");

    // BOM: Excel'in ş, ğ, ı gibi Türkçe karakterleri doğru göstermesi için
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `teklif-talepleri-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("CSV dosyası indirildi.");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Çıkış yapıldı.");
  };

  const filteredQuotes = quotes.filter((quote) => {
    if (statusFilter !== "all" && statusOf(quote) !== statusFilter) return false;

    const term = searchQuery.trim().toLowerCase();
    if (!term) return true;

    return [
      quote.companyName,
      quote.fullName,
      quote.email,
      quote.phone,
      quote.message,
      CATEGORY_LABELS[quote.category] || quote.category,
    ]
      .filter(Boolean)
      .some((field) => String(field).toLowerCase().includes(term));
  });

  const pendingCount = quotes.filter((q) => statusOf(q) === "pending").length;
  const confirmedCount = quotes.filter((q) => statusOf(q) === "confirmed").length;
  const completedCount = quotes.filter((q) => statusOf(q) === "contacted").length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <img
            src="/images/f40e7026-5f0d-4f46-a960-21c93b7f6209.png"
            alt="Çözüm Logo"
            className="w-10 h-10 object-contain bg-white rounded-lg p-1"
          />
          <span className="text-lg font-black tracking-tight text-white leading-tight">
            Çözüm <span className="text-sky-400">Yönetim</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 bg-sky-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-900/40"
          >
            <MessageSquare size={20} /> Teklif Talepleri
          </a>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl font-semibold transition-all"
          >
            <ArrowLeft size={20} /> Siteye Dön
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-red-400 rounded-xl font-semibold transition-all"
          >
            <LogOut size={20} /> Çıkış Yap
          </button>
        </nav>

        <div className="p-6 text-center text-white/40 text-xs">
          Çözüm Yazılım B2B Panel v1.0
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 p-6 lg:p-10">
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Yönetim Paneli
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Gelen teklif taleplerini inceleyin ve durumlarını yönetin.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:flex-none">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Firma, kişi, e-posta veya telefon ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full lg:w-80 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-sky-500 shadow-sm transition-all"
              />
            </div>

            <button
              onClick={exportToCsv}
              disabled={loading}
              title="Görünen kayıtları Excel/CSV olarak indir"
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-sky-500 shadow-sm transition-colors disabled:opacity-50 text-sm font-bold whitespace-nowrap"
            >
              Excel'e Aktar
            </button>

            <button
              onClick={fetchQuotes}
              disabled={loading}
              title="Yenile"
              className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-sky-500 shadow-sm transition-colors disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>

            <button className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-sky-500 shadow-sm relative transition-colors">
              <Bell size={20} />
              {pendingCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-sky-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Bekleyen Talepler</p>
              <h3 className="text-3xl font-black text-slate-900">
                {loading ? "…" : pendingCount}
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Teklif Verilenler</p>
              <h3 className="text-3xl font-black text-slate-900">
                {loading ? "…" : confirmedCount}
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Tamamlananlar</p>
              <h3 className="text-3xl font-black text-slate-900">
                {loading ? "…" : completedCount}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">
              {searchQuery ? `"${searchQuery}" için sonuçlar` : "Tüm Teklif Talepleri"}
            </h2>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setStatusFilter(filter.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    statusFilter === filter.key
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center text-slate-500 font-medium">Yükleniyor...</div>
            ) : filteredQuotes.length === 0 ? (
              <div className="p-20 text-center text-slate-500 font-medium">
                Kayıt bulunamadı.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Firma / Yetkili</th>
                    <th className="px-6 py-4 font-bold">İletişim</th>
                    <th className="px-6 py-4 font-bold">Ürün Grubu / Talep</th>
                    <th className="px-6 py-4 font-bold">Tarih / Durum</th>
                    <th className="px-6 py-4 font-bold text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuotes.map((quote) => {
                    const status = statusOf(quote);
                    return (
                      <tr key={quote.id} className="hover:bg-slate-50 transition-colors align-top">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 mt-0.5 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                              <Building2 size={16} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">
                                {quote.companyName || "—"}
                              </p>
                              <p className="text-xs text-slate-500">{quote.fullName || "—"}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          <p className="flex items-center gap-1.5">
                            <Mail size={13} className="text-slate-400 shrink-0" />
                            <a
                              href={`mailto:${quote.email}`}
                              className="hover:text-sky-500 transition-colors break-all"
                            >
                              {quote.email || "—"}
                            </a>
                          </p>
                          <p className="flex items-center gap-1.5 mt-1">
                            <Phone size={13} className="text-slate-400 shrink-0" />
                            <a
                              href={`tel:${quote.phone}`}
                              className="hover:text-sky-500 transition-colors"
                            >
                              {quote.phone || "—"}
                            </a>
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          <p className="font-bold text-slate-900 flex items-center gap-1.5">
                            <Package size={14} className="text-slate-400 shrink-0" />
                            {CATEGORY_LABELS[quote.category] || quote.category || "Belirtilmemiş"}
                          </p>
                          {quote.message && (
                            <p
                              className="text-xs text-slate-400 mt-1 max-w-[280px] line-clamp-2"
                              title={quote.message}
                            >
                              {quote.message}
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-500 font-medium mb-1.5">
                            {formatDate(quote.created_at)}
                          </p>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-center w-fit block ${STATUS_META[status].badge}`}
                          >
                            {STATUS_META[status].label}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {status === "pending" && (
                              <button
                                onClick={() => handleConfirm(quote.id)}
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-sky-500 transition-colors whitespace-nowrap"
                              >
                                Teklif Ver
                              </button>
                            )}
                            {status === "confirmed" && (
                              <button
                                onClick={() => handleComplete(quote.id)}
                                className="bg-sky-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-sky-600 transition-colors flex items-center gap-2 shadow-md shadow-sky-100 whitespace-nowrap"
                              >
                                <CheckCircle2 size={14} /> Tamamlandı
                              </button>
                            )}
                            {status === "contacted" && (
                              <span className="text-xs text-slate-400 font-bold">İşlem tamam</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
