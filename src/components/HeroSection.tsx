import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion'; 
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Circle } from "lucide-react";

const slides = [
     {
         id: 1,
         title: "Crimson Remains",
         subtitle: "Upgrade to the 'Artisan Raiden' feel at an affordable price! Experience smoother, faster speeds in a unique design. Crimson Remains is the choice for serious gamers!",
         tag: "New Arrivals Available",
         imageUrl: "/Agcrimson.jpg",
         link: "/collections/Mousepads",
         buttonText: "Shop Mousepads",
     },
     {
         id: 2,
         title: "AWAKENING SORA",
         subtitle: "The SP-005 Limited Edition: Awakening Sora captures Sora's surge into unstable power — the moment everything shifts.",
         tag: "Limited Stock",
         imageUrl: "/awakingwallhack.jpg",
         link: "/collections/Mousepads",
         buttonText: "Shop Mousepads",
     },
     {
         id: 3,
         title: "Beast X Max",
         subtitle: "Due to the design and manufacturing process, each unit will have unique patterns—but that's part of the charm",
         tag: "Bestsellers",
         imageUrl: "/bestx.jpg", 
         link: "/collections/mouse",
         buttonText: "Shop Mouse",
     },

     {
         id: 4,
         title: "Yuki Aim x Demon1 - Glass Mousepad Limited",
         subtitle: "Designed for low friction and high precision under pressure. Our highest quality glass mousepad to date.",
         tag: "Limited Stock",
         imageUrl: "/Glass-ANGLELEFT-WM2.webp", 
         link: "/collections/mousepads",
         buttonText: "Shop Mousepads",
     },

     {
         id: 5,
         title: "PULSAR THE SUSANTO-X",
         subtitle: "Forged in the fires of competition and a shared vision, the Susanto-X is the first ever Pro Series mouse designed with direct input from PRX f0rsakeN and T1 Xccurate",
         tag: "Limited Stock",
         imageUrl: "/susanto.webp", 
         link: "/collections/mouse",
         buttonText: "Shop Mouse",
     },

     {
         id: 6,
         title: "Hitscan hyperlight x LOGA",
         subtitle: "A Foreword from LOGA For this project, we spent a long time debating how to bring the Printstream design, a pattern we were passionate about, to our final Esports mouse.",
         tag: "Limited Stock",
         imageUrl: "/LOGA_x_Hitscan-05.webp", 
         link: "/collections/mouse",
         buttonText: "Shop Mouse",
     },
     
];

const contentVariants = {
    initial: { opacity: 0, y: 30 }, 
    animate: { opacity: 1, y: 0 },   
    exit: { opacity: 0, y: -30 },    
};

export const HeroSection = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const totalSlides = slides.length;
    
    const nextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };


    useEffect(() => {
        const interval = setInterval(nextSlide, 4000); 
        return () => clearInterval(interval);
    }, [totalSlides]); 

    const currentSlide = slides[currentSlideIndex];

    return (
        <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
            
            <AnimatePresence initial={false}>
                <motion.div 
                    key={currentSlideIndex} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0 }} 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-primary/70 opacity-60"></div>
                </motion.div>
            </AnimatePresence>
            
            <div className="container mx-auto px-4 h-full flex items-center relative z-10"> 
                
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={currentSlideIndex + 'content'} 
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5, delay: 0.1 }} 
                        className="max-w-3xl text-primary-foreground" 
                    >
                        <div className="inline-block mb-4 px-4 py-1 bg-accent/20 border border-accent/30 rounded-full text-sm font-medium">
                            {currentSlide.tag}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            {currentSlide.title}
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-primary-foreground/80 max-w-2xl">
                            {currentSlide.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" variant="secondary" className="group" asChild>
                                <a href={currentSlide.link}>
                                    {currentSlide.buttonText}
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20"> 
                <Button size="icon" variant="secondary" onClick={prevSlide} className="rounded-full opacity-70 hover:opacity-100">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
                <Button size="icon" variant="secondary" onClick={nextSlide} className="rounded-full opacity-70 hover:opacity-100">
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlideIndex(index)}
                        className={`p-1 transition-all duration-300 ${
                            index === currentSlideIndex 
                                ? 'text-primary-foreground scale-110' 
                                : 'text-primary-foreground/50 hover:text-primary-foreground/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <Circle className="h-3 w-3 fill-current" />
                    </button>
                ))}
            </div>
        </section>
    );
};