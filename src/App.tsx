import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Aboutus from "./pages/Aboutus";
import ContactUs from "./pages/ContactUs";
import Howtobuy from "./pages/Howtobuy";
import Faq from "./pages/Faq";
import ProductCategories from "./pages/ProductCategories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* ROUTES หมวดสินค้า */}
          <Route path="/products/:categoryId" element={<ProductCategories />} />

          {/* หน้าทั่วไป */}
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Howtobuysection" element={<Howtobuy />} />
          <Route path="/faq" element={<Faq />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;