import { Navigation } from "@/components/Navigation";
import Bottomnav from "@/components/Bottomnav";
import AboutUsContent from "@/components/AboutUsContent";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
        <AboutUsContent />
      <Bottomnav /> 
    </div>
  );
};

export default Index;
