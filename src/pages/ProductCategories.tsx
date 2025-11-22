  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { Navigation } from "@/components/Navigation";
  import Bottomnav from "@/components/Bottomnav";
  import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
  import { Skeleton } from "@/components/ui/skeleton";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  // === Interface ของ Category ===
  export interface Category {
    id: string;
    name: string;
    image: string;
    description: string;
    // ถ้าใช้ Shopify Collections เพิ่มตรงนี้:
    shopifyCollectionHandle?: string;
  }

  // === รายการ Category ===
  export const categories: Category[] = [
    { id: "mousepads", name: "Mousepads", image: "/DSC08955.jpg", description: "สินค้าประเภท Mousepads" },
    { id: "mouse", name: "Mouse", image: "/2_dd5ba45e-19db-4d01-a485-88dc625d2d15_1200x1200.webp", description: "สินค้าประเภท Mouse" },
    { id: "mouse-feet", name: "Mouse Feet", image: "/Screenshot 2025-11-03 125622.png", description: "สินค้าประเภท Mouse Feet" },
    { id: "mouse-grips", name: "Mouse Grips", image: "/CorepadSoftGripsLogitechGPROXSUPERLIGHTwhite05_1024x1024@2x.webp", description: "สินค้าประเภท Mouse Grips" },
  ];

  export default function ProductCategories() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);
    
    const category = categories.find(c => c.id === categoryId);

    // === ดึงสินค้าจาก Shopify API ===
    useEffect(() => {
      const loadProducts = async () => {
        setLoading(true);
        try {
          // ดึงสินค้าทั้งหมดจาก Shopify
          const allProducts = await fetchProducts(100);
          
          // กรองตาม categoryId (ใช้ tags หรือ product type ใน Shopify)
          // วิธีที่ 1: ถ้าใช้ Product Type
          const filtered = allProducts.filter((product: ShopifyProduct) => {
            // ตรวจสอบจาก handle ว่าขึ้นต้นด้วย categoryId
            return product.node.handle.toLowerCase().includes(categoryId?.toLowerCase() || '');
          });
          
          setProducts(filtered);
        } catch (error) {
          console.error("Error loading products:", error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };

      if (categoryId) {
        loadProducts();
      }
    }, [categoryId]);

    if (!category) {
      return <div className="p-6">Category not found</div>;
    }

    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        
        <main className="container mx-auto p-6">
          {/* === UI Bar (Title + Controls) === */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 mb-4 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
            </div>

            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <div className="flex items-center gap-1">
                <label htmlFor="sort-by" className="text-sm text-gray-600 whitespace-nowrap">
                  เรียงตาม:
                </label>
                
                <Select defaultValue="best-selling">
                  <SelectTrigger 
                    id="sort-by" 
                    className="w-28 border-0 bg-transparent p-0 pl-1 h-auto text-sm font-medium text-gray-900 focus:ring-0 focus:ring-offset-0"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-selling">ขายดี</SelectItem>
                    <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
                    <SelectItem value="price-asc">ราคาถูกสุด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* === Loading State === */}
          {loading && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full rounded-md" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* === Product Grid === */}
          {!loading && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => {
                const imageUrl = product.node.images.edges[0]?.node.url;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const isAvailable = product.node.variants.edges[0]?.node.availableForSale;

                return (
                  <div 
                    key={product.node.id} 
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product.node.handle}`)}
                  >
                    {/* รูปภาพ */}
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={product.node.title}
                          className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
                        />
                      )}
                    </div>
                    
                    {/* ชื่อสินค้า */}
                    <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">
                      {product.node.title}
                    </h3>

                    {/* ราคา */}
                    {isAvailable ? (
                      <p className="mt-2 text-sm text-gray-700">
                        จาก {product.node.priceRange.minVariantPrice.currencyCode} {price.toFixed(2)}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-gray-500">
                        ขายหมดแล้ว
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* ไม่มีสินค้า */}
          {!loading && products.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p>ไม่พบสินค้าในหมวดหมู่นี้</p>
            </div>
          )}
        </main>

        <Bottomnav />
      </div>
    );
  }