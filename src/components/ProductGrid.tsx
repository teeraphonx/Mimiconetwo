import React from "react";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fetch products failed:", err);
      }
    };
    load();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products?.length > 0 &&
        products.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
    </div>
  );
}