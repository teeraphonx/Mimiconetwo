import React from 'react';
interface CategoryItem {
  name: string;
  imageUrl: string;
  linkUrl: string;
}

const categories: CategoryItem[] = [
  { name: 'Mousepads', imageUrl: '/DSC08955.jpg', linkUrl: '/products/mousepads' },
  { name: 'Mouse', imageUrl: '/2_dd5ba45e-19db-4d01-a485-88dc625d2d15_1200x1200.webp', linkUrl: '/products/mouse' },
  { name: 'Mouse Feet', imageUrl: '/Screenshot 2025-11-03 125622.png', linkUrl: '/products/mouse-feet' },
  { name: 'Mouse Grips', imageUrl: '/CorepadSoftGripsLogitechGPROXSUPERLIGHTwhite05_1024x1024@2x.webp', linkUrl: '/products/mouse-grips' },
];

const CategoryCard: React.FC<CategoryItem> = ({ name, imageUrl, linkUrl }) => {
  return (
    <a 
      href={linkUrl}
      className="group relative block w-full aspect-[16/9] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl">
      <img
        src={imageUrl}
        alt={name}
        className="object-cover w-full h-full"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 md:p-6">
        <p className="text-white text-xl md:text-2xl font-bold tracking-wider">
          {name}
        </p>
      </div>
    </a>
  );
};

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mx-auto" 
          style={{ maxWidth: '1200px' }} 
        >
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};