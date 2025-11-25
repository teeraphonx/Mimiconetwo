import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import type { ApiProduct } from "@/lib/api";
import { fetchProductById } from "@/lib/api";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const addToCart = useCartStore((state) => state.addItem);

  // Load product by ID (ApiProduct)
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Add to cart
const handleAddToCart = () => {
  if (!product) return;

  addToCart(product); 

  toast.success("Added to cart", {
    description: `${product.name} x1 added to your cart`,
    position: "top-center",
  });
};


  // Loading Screen
  if (loading) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </>
    );
  }

  const images = product.image ?? [];

  return (
    <>
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT — IMAGES */}
          <div className="space-y-4">
            {/* main image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-center text-muted-foreground">No Image</p>
              )}
            </div>

            {/* thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      index === selectedImage
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`image ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — PRODUCT INFO */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <Badge className="mb-2">{product.category}</Badge>

            <p className="text-3xl font-bold">{product.price.toLocaleString()} ฿</p>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              คงเหลือ {product.stock_quantity} ชิ้น
            </p>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <Button size="lg" className="w-full gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Free shipping on orders over 500฿
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}