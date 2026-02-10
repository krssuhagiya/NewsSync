import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import TopStories from "./pages/TopStories";
import World from "./pages/World";
import Business from "./pages/Business";
import Technology from "./pages/Technology";
import Sports from "./pages/Sports";
import Entertainment from "./pages/Entertainment";
import Pulse from "./pages/Pulse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArticleDetails from "./pages/ArticleDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/top-stories" element={<TopStories />} />
            <Route path="/world" element={<World />} />
            <Route path="/business" element={<Business />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/pulse" element={<Pulse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
