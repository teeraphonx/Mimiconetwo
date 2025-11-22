import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import Bottomnav from "@/components/Bottomnav";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Bestsellergg } from "@/components/Bestsellergg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductGrid />
      <CategoryGrid />
      <Bestsellergg />
      <Bottomnav /> 
    </div>
  );
};

export default Index;
