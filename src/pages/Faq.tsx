import { Navigation } from "@/components/Navigation";
import Bottomnav from "@/components/Bottomnav";
import Faqsection from "@/components/Faqsection";



const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
        <Faqsection />
      <Bottomnav /> 
    </div>
  );
};

export default Index;
