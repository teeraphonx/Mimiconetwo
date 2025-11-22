  import { useEffect, useState } from "react";
  import { useParams, Link } from "react-router-dom";
  import { fetchProductByHandle } from "@/lib/shopify";
  import { Navigation } from "@/components/Navigation";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { ShoppingCart, ArrowLeft } from "lucide-react";
  import { useCartStore } from "@/stores/cartStore";
  import { toast } from "sonner";
  import { Skeleton } from "@/components/ui/skeleton";

  const ProductDetail = () => {
    const { handle } = useParams<{ handle: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const addItem = useCartStore(state => state.addItem);

    useEffect(() => {
      const loadProduct = async () => {
        if (!handle) return;
        
        try {
          const data = await fetchProductByHandle(handle);
          setProduct(data);
          setSelectedVariant(data?.variants?.edges[0]?.node);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      loadProduct();
    }, [handle]);

    const handleAddToCart = () => {
      if (!selectedVariant || !product) return;

      const cartItem = {
        product: { node: product },
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity: 1,
        selectedOptions: selectedVariant.selectedOptions || []
      };
      
      addItem(cartItem);
      toast.success("Added to cart", {
        description: `${product.title} has been added to your cart.`,
        position: "top-center",
      });
    };

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

    if (!product) {
      return (
        <>
          <Navigation />
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </>
      );
    }

    const images = product.images?.edges || [];
    const price = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount);

    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                {images[selectedImage]?.node && (
                  <img
                    src={images[selectedImage].node.url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square bg-secondary rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={`${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">
                    {selectedVariant?.price.currencyCode} {price.toFixed(2)}
                  </span>
                </div>
              </div>

              {product.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              )}

              {product.options && product.options.length > 0 && (
                <div className="space-y-4">
                  {product.options.map((option: any) => (
                    <div key={option.name}>
                      <h3 className="font-semibold mb-2">{option.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value: string) => {
                          const variant = product.variants.edges.find((v: any) =>
                            v.node.selectedOptions.some((o: any) => o.name === option.name && o.value === value)
                          );
                          const isSelected = selectedVariant?.selectedOptions.some(
                            (o: any) => o.name === option.name && o.value === value
                          );

                          return (
                            <Button
                              key={value}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedVariant(variant?.node)}
                              disabled={!variant?.node.availableForSale}
                            >
                              {value}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                {selectedVariant?.availableForSale && (
                  <p className="text-sm text-center text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default ProductDetail;
