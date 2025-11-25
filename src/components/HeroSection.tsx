import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Circle } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Crimson Remains",
    subtitle:
      "Upgrade to the 'Artisan Raiden' feel at an affordable price!",
    tag: "New Arrivals",
    imageUrl: "/Agcrimson.jpg",
    link: "/products/mousepads",
    buttonText: "Shop Mousepads",
  },
  {
    id: 2,
    title: "AWAKENING SORA",
    subtitle:
      "The SP-005 Awakening Sora captures the moment power awakens.",
    tag: "Limited Stock",
    imageUrl: "/awakingwallhack.jpg",
    link: "/products/mousepads",
    buttonText: "Shop Mousepads",
  },
  {
    id: 3,
    title: "Beast X Max",
    subtitle:
      "Unique material and pattern — precision performance.",
    tag: "Bestsellers",
    imageUrl: "/bestx.jpg",
    link: "/products/mouse",
    buttonText: "Shop Mouse",
  },
  {
    id: 4,
    title: "Yuki Aim x Demon1 Glasspad",
    subtitle:
      "Low friction and high precision for competitive gameplay.",
    tag: "Limited Stock",
    imageUrl: "/Glass-ANGLELEFT-WM2.webp",
    link: "/products/mousepads",
    buttonText: "Shop Mousepads",
  },
  {
    id: 5,
    title: "PULSAR SUSANTO-X",
    subtitle:
      "Designed with PRX f0rsakeN and T1 Xccurate.",
    tag: "Pro Series",
    imageUrl: "/susanto.webp",
    link: "/products/mouse",
    buttonText: "Shop Mouse",
  },
];

const contentVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "-text"}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-white"
          >
            <span className="px-4 py-1 bg-white/20 rounded-full text-sm inline-block mb-4">
              {slide.tag}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {slide.title}
            </h1>

            <p className="text-lg text-white/80 mb-6">{slide.subtitle}</p>

            <Button size="lg" variant="secondary" asChild>
              <Link to={slide.link} className="flex items-center">
                {slide.buttonText}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
        <Button variant="secondary" size="icon" onClick={prev}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20">
        <Button variant="secondary" size="icon" onClick={next}>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all ${
              i === index ? "text-white scale-110" : "text-white/40"
            }`}
          >
            <Circle className="h-3 w-3 fill-current" />
          </button>
        ))}
      </div>
    </section>
  );
};