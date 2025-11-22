import { Navigation } from "@/components/Navigation";
import Bottomnav from "@/components/Bottomnav";
import ContactUsPage from "@/components/ContactUsPage";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
        <ContactUsPage />
      <Bottomnav /> 
    </div>
  );
};

export default Index;
