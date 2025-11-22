import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.node.variants.edges[0]?.node);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart.`,
      position: "top-center",
    });
  };

  const hasMultipleVariants = product.node.variants.edges.length > 1;
  const imageUrl = product.node.images.edges[0]?.node.url;
  const price = parseFloat(selectedVariant?.price.amount || product.node.priceRange.minVariantPrice.amount);

  return (
    <Link to={`/product/${product.node.handle}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square bg-secondary overflow-hidden">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={product.node.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {product.node.title}
            </h3>
            
            {product.node.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.node.description}
              </p>
            )}

            {hasMultipleVariants && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.node.variants.edges.slice(0, 5).map(({ node: variant }) => (
                  <button
                    key={variant.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedVariant(variant);
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-accent scale-110'
                        : 'border-border hover:border-accent/50'
                    }`}
                    style={{
                      backgroundColor: variant.selectedOptions[0]?.value.toLowerCase() === 'black' ? '#000' :
                                      variant.selectedOptions[0]?.value.toLowerCase() === 'white' ? '#fff' :
                                      variant.selectedOptions[0]?.value.toLowerCase() === 'blue' ? '#0ea5e9' :
                                      variant.selectedOptions[0]?.value.toLowerCase() === 'red' ? '#ef4444' :
                                      variant.selectedOptions[0]?.value.toLowerCase() === 'pink' ? '#ec4899' : '#9ca3af'
                    }}
                  />
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">
                  {selectedVariant?.price.currencyCode} {price.toFixed(2)}
                </span>
              </div>
              
              <Button
                size="sm"
                className="gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
