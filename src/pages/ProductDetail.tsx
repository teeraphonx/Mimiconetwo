import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ApiProduct } from "@/lib/api";
import { fetchProductById } from "@/lib/api";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const colors = ["Black", "White", "Pink"];
  const [selectedColor, setSelectedColor] = useState("Black");

  useEffect(() => {
    if (id) {
      fetchProductById(id)
        .then((res) => setProduct(res))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link to="/" className="text-sm underline flex items-center mb-4">
          ← Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Image Smaller & Centered */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
            <img
              src={product.image?.[0]}
              alt={product.name}
              className="max-h-[350px] w-auto object-contain"
            />
          </div>

          {/* Right Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <Badge className="mb-4">{product.category}</Badge>

            <p className="text-3xl font-bold mb-6">
              {product.price.toLocaleString()} ฿
            </p>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-1 rounded border ${
                      selectedColor === c
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm mb-4">
              คงเหลือ {product.stock_quantity} ชิ้น
            </p>

            <Button className="w-full py-6 text-lg">
              Add to Cart
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-3">
              Free shipping on orders over 500฿
            </p>
          </div>
        </div>
      </div>
    </>
  );
}