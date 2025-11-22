import { Navigation } from "@/components/Navigation";
import Bottomnav from "@/components/Bottomnav";
import Howtobuysection from "@/components/Howtobuysection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
        <Howtobuysection />
        <Bottomnav /> 
    </div>
  );
};

export default Index;
