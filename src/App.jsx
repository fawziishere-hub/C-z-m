import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import QuoteRequestPage from "./pages/QuoteRequestPage";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/Dashboard";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGate from "./components/AdminGate";

const queryClient = new QueryClient();

function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(`/${page === "home" ? "" : page}`);
  };

  return (
    <div className="min-h-screen">
      {/* Admin panel is a standalone tool: no Navbar, no Footer. Access is
          gated by <AdminGate> on the /admin routes below. */}
      <Routes>
        <Route path="/admin/*" element={null} />
        <Route path="*" element={<Navbar />} />
      </Routes>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage onNavigate={handleNavigate} />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/teklif" element={<QuoteRequestPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin panel — Supabase ile korunuyor, sadece ADMIN_EMAIL girebilir. */}
          <Route
            path="/admin"
            element={
              <AdminGate>
                <AdminDashboard />
              </AdminGate>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminGate>
                <AdminDashboard />
              </AdminGate>
            }
          />
        </Routes>
      </main>

      <Routes>
        <Route path="/admin/*" element={null} />
        <Route path="*" element={<Footer />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;