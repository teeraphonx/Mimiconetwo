import { Search, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// หมวดสินค้า
const productCategories = [
  { name: "Mousepads", path: "/products/mousepads" },
  { name: "Mouse Feet", path: "/products/mouse-feet" },
  { name: "Mouse grips", path: "/products/mouse-grips" },
  { name: "Mouse", path: "/products/mouse" },
];

// หมวด Support
const supportItems = [
  { name: "How to buy", path: "/howtobuysection" },
  { name: "FAQ", path: "/faq" },
];

const ProductDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Button
          variant="link"
          className="text-sm font-medium transition-colors hover:text-accent p-0 h-auto text-foreground"
        >
          Product <ChevronRight className="ml-1 h-3 w-3 inline rotate-90" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-56 border-none shadow-xl p-0"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {productCategories.map((item) => (
          <DropdownMenuItem
            key={item.name}
            asChild
            className="p-0 cursor-pointer"
          >
            <Link to={item.path} className="px-2 py-1.5 w-full block">
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SupportDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Button
          variant="link"
          className="text-sm font-medium transition-colors hover:text-accent p-0 h-auto text-foreground"
        >
          Support <ChevronRight className="ml-1 h-3 w-3 inline rotate-90" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-56 border-none shadow-xl p-0"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {supportItems.map((item) => (
          <DropdownMenuItem key={item.name} asChild className="p-0 cursor-pointer">
            <Link to={item.path} className="px-2 py-1.5 w-full block">
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navigation = () => {
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <header className="sticky top-0 h-20 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">MM</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline">
              MiMic GamingGear
            </span>
          </Link>

          {/* เมนูด้านบน */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-accent"
            >
              Home
            </Link>

            <ProductDropdown />

            <Link
              to="/Aboutus"
              className="text-sm font-medium transition-colors hover:text-accent"
            >
              About Us
            </Link>

            <SupportDropdown />

            <Link
              to="/ContactUs"
              className="text-sm font-medium transition-colors hover:text-accent"
            >
              Contact Us
            </Link>
          </nav>

          {/* Search + User + Cart */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] pl-8"
                />
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* ตะกร้า + Badge */}
            <div className="relative">
              <CartDrawer />
              {totalItems > 0 && (
                <div
                  className="
                    absolute -top-2 -right-2
                    h-6 w-6
                    bg-[#00C2FF]
                    text-white
                    rounded-full
                    flex items-center justify-center
                    text-xs font-bold shadow-md
                  "
                >
                  {totalItems}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};