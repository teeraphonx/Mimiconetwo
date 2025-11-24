import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Bottomnav from "@/components/Bottomnav";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts, ApiProduct } from "@/lib/api";

const categories = [
  { id: "mousepads", name: "Mousepads" },
  { id: "mouse", name: "Mouse" },
  { id: "mouse-feet", name: "Mouse Feet" },
  { id: "mouse-grips", name: "Mouse Grips" },
];

function matchCategory(product: ApiProduct, c?: string) {
  const cat = product.category.toLowerCase().trim();

  // 🔥 Mousepads
  if (c === "mousepads")
    return (
      cat.includes("pad") ||
      cat.includes("mousepad") ||
      cat.includes("mousepads")
    );

  // 🔥 Mouse
  if (c === "mouse")
    return (
      cat === "mouse" ||
      (cat.includes("mouse") &&
        !cat.includes("feet") &&
        !cat.includes("skate") &&
        !cat.includes("grip") &&
        !cat.includes("pad"))
    );

  // 🔥 Mouse Feet
  if (c === "mouse-feet")
    return (
      cat.includes("feet") ||
      cat.includes("skate") ||
      cat.includes("mouse-feet") ||
      cat.includes("mouse feet")
    );

  // 🔥 Mouse Grips
  if (c === "mouse-grips")
    return (
      cat.includes("grip") ||
      cat.includes("mouse-grip") ||
      cat.includes("mouse grips")
    );

  return true;
}

export default function ProductCategories() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    fetchProducts().then((items) => {
      const filtered = items.filter((p) => matchCategory(p, categoryId));
      setProducts(filtered);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">
          {categories.find((c) => c.id === categoryId)?.name}
        </h1>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p["id-number"]}`)}
                className="cursor-pointer"
              >
                <img
                  src={p.image?.[0]}
                  className="rounded-lg aspect-square w-full object-cover"
                />
                <h3 className="mt-2 text-sm font-semibold">{p.name}</h3>
                <p className="text-sm">{p.price.toLocaleString()} ฿</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Bottomnav />
    </div>
  );
}