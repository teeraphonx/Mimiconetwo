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
import ProductCategories from "@/pages/ProductCategories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          {/* <Route path="/products/mouse" element={<Mouse />} />
          <Route path="/products/mouse-feet" element={<MouseFeet />} />
          <Route path="/products/mousepads" element={<MousePads />} />
          <Route path="/products/mouse-grips" element={<MouseGrips />} /> */}
          <Route path="/products/:categoryId" element={<ProductCategories />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Howtobuysection" element={<Howtobuy />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
