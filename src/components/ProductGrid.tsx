import { useEffect, useState } from "react";
import { fetchProducts, ApiProduct } from "@/lib/api";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12" id="products">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center">
            Special Discounts Up to 50% Off
          </h2>
          <p className="text-muted-foreground text-center">
            Premium gaming gear at unbeatable prices
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          // Product list
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};