import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiFacebook, } from 'react-icons/fi';
import { GrDeliver } from "react-icons/gr";
import { CiBoxes ,CiWallet} from "react-icons/ci";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";
import { Label } from 'recharts';

const Bottomnav = () => {
  const menuItems = [
    {
    title: "",
    links: [
      { label: "Mousepads", href: "/products/mousepads" },
      { label: "Mouse feet", href: "/products/mouse-feet" },
      { label: "Mouse grips", href: "/products/mouse-grips" },
      { label: "Mouse", href: "/products/mouse" },
    ],
    },
    {
    title: "",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "CONTACT US", href: "/ContactUs" },
      { label: "How to Buy?", href: "/how-to-buy" },
    ],
    },
  ];

  const socialLinks = [
    { icon: FiMail, href: "", label: "Email" },
    { icon: FiFacebook, href: "", label: "Facebook" },
  ];

  return (
    <footer className="bg-white  border-t border-gray-200 ">
      <div className="grid-cols-1 md:grid-cols-3 px-6 py-5 between-flex items-center justify-center text-black-600">
    <div className="flex items-center text-gray-600 justify-center h-2 font-semibold">
     <div className="flex items-center mr-8">
      <GrDeliver className="text-2xl" /><p className="ml-1.5 text-sm text-semibold">Free Delivery</p>
     </div>
     <div className="flex items-center mr-8">
      <CiBoxes className="text-2xl" /><p className="ml-1.5 text-sm text-semibold">Non Contract shipping</p>
     </div>
     <div className="flex items-center">
      <CiWallet className="text-2xl" /><p className="ml-1.5 text-sm text-semibold">Secure Payment</p>
     </div>
    </div>
   </div>
      <hr className="border-gray-300" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold bg-gray-900 bg-clip-text text-transparent">
              Mimic GamingGear
            </motion.div>
            <p className="text-gray-600 text-sm">
              Website for gaming accessories and gear, providing high-quality products to enhance your gaming experience.
              <br />
              <br />
              Version 1.0.0
            </p>
            <br />
            <p className="text-start text-xs text-gray-600">
            Copyright © 2025 MimicGamingGear. All rights reserved.
          </p>
          </div>
          <div className="space-y-4 flex justify-end">
          <div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                {menuItems.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                    {section.links.map((item, linkIndex) => (
                      <li key={linkIndex}>
                      <Link
                        to={item.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item.label}
                      </Link>
                      </li>
                    ))}
                    </ul>
                  </div>
                  ))}
                </div>
            </div>
          </div>
        </div>

          <div className="space-y-4 flex justify-end">
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Contract us</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 ">
                MiMic GamingGear Co., Ltd. 
                <br />
                Email: mimic.gg@co.th
                <br />
              </p>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
    </footer>
  );
};

export default Bottomnav;