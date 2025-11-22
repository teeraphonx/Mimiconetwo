import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { ApiProduct } from "@/lib/api";

interface ProductCardProps {
  product: ApiProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const img = product.image?.[0];

  return (
    <Link to={`/product/${product["id-number"]}`}>
      <Card className="overflow-hidden group transition-all hover:-translate-y-1 hover:shadow-lg">
        
        <div className="aspect-square overflow-hidden bg-muted">
          {img && (
            <img
              src={img}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
          )}
        </div>

        <CardContent className="p-3">
          <h3 className="font-semibold line-clamp-2">{product.name}</h3>

          <Badge className="mt-1">{product.category}</Badge>

          <p className="font-bold text-lg mt-2">
            {product.price.toLocaleString()} ฿
          </p>

          <p className="text-xs text-muted-foreground">
            คงเหลือ {product.stock_quantity} ชิ้น
          </p>
        </CardContent>

      </Card>
    </Link>
  );
};
