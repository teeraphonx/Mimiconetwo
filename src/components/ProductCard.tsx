  import React from "react";
  import { Card, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { ShoppingCart } from "lucide-react";
  import { Link } from "react-router-dom";
  import type { ApiProduct } from "@/lib/api";
  import { useCartStore } from "@/stores/cartStore";
  import { toast } from "sonner";

  interface Props {
    product: ApiProduct;
  }

  export const ProductCard = ({ product }: Props) => {
    const addItem = useCartStore((state) => state.addItem);

    const img = product.image?.[0];

    const handleAdd = () => {
      addItem(product);

      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart.`,
        duration: 2500,
      });
    };

    return (
      <Card className="overflow-hidden shadow-sm hover:shadow-lg transition rounded-xl">
        <Link to={`/product/${product["id-number"]}`}>
          <div className="aspect-square bg-muted overflow-hidden">
            {img ? (
              <img
                src={img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200"></div>
            )}
          </div>
        </Link>

        <CardContent className="p-4">
          <Link to={`/product/${product["id-number"]}`}>
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          </Link>

          <p className="text-sm text-muted-foreground line-clamp-2 my-1">
            {product.description}
          </p>

          <div className="flex gap-2 my-2">
            <span className="w-4 h-4 bg-black rounded-full block"></span>
            <span className="w-4 h-4 bg-blue-500 rounded-full block"></span>
            <span className="w-4 h-4 bg-gray-400 rounded-full block"></span>
          </div>

          <p className="font-bold text-xl">
            {product.price.toLocaleString()} ฿
          </p>

          <Button
            className="mt-3 w-full flex items-center gap-2"
            onClick={handleAdd}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </CardContent>
      </Card>
    );
  };