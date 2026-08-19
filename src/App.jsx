import { useState } from "react";
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

const queryClient = new QueryClient();

function AppContent() {
  const navigate = useNavigate();
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleNavigate = (page) => {
    navigate(`/${page === "home" ? "" : page}`);
    setSelectedCourseId(null);
  };

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    navigate("/course-detail/" + courseId);
  };

  const handleBackToCourses = () => {
    navigate("/courses");
    setSelectedCourseId(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onNavigate={handleNavigate}
                onCourseClick={handleCourseClick}
              />
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
        </Routes>
      </main>
      <Footer />
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