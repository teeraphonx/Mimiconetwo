import React from 'react';

const AboutUsContent: React.FC = () => {
  const partners = [
   { name: 'Partner 1', imageUrl: '/image.png' }, 
   { name: 'Partner 2', imageUrl: '/Logo-SPU-SIT_Color1.png.webp' }, 
   { name: 'Partner 3', imageUrl: '/1753230.jpg' }, 
 ];

  const PartnerLogo: React.FC<{ name: string; imageUrl: string }> = ({ name, imageUrl }) => (
    <div className="w-40 h-30 flex items-center justify-center p-2">
      <img
        src={imageUrl} 
        alt={name}
        className="object-contain w-full h-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%239CA3AF'>?</text><rect x='0' y='0' width='100' height='100' fill='none' stroke='%23D1D5DB' stroke-width='2'/></svg>";
          target.className = "object-contain w-full h-full p-2";
        }}
      />
    </div>
  );

  return (
    <main>
      <div className="text-center pt-20 pb-10">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">About us</h1>
        <p className="text-lg font-semibold text-black mb-4">We are MiMic.</p>
        <p className="text-sm text-gray-700 max-w-2xl mx-auto px-4">
          MiMic was founded by a group of people who like quality, performance, and rare gaming peripherals from all over the world. We have prepared for you all.
        </p>
      </div>

      <hr className="max-w-auto my-12" />

      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="md:grid md:grid-cols-1 gap-12 ">
          <div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6 text-center ">
              We are aiming to become the best store for best performing gaming peripherals in Thailand.
            </h3>
            <p className="text-sm text-gray-600 max-w-md text-center mx-auto">
              Because we believe in our products that can definitely enhance efficiency and maximum usability for everyone.
            </p>
          </div>

          <div className="h-full">
          </div>
        </div>
      </div>

      <hr className="max-w-auto my-12" />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="md:grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-3xl font-bold leading-snug text-gray-900 mb-4 text-left">
              Lightning-fast services <br />
              that you can't imagine.
            </h4>
            <p className="text-sm text-gray-600 max-w-md text-left">
              We have a lightning fast delivery service at 12 working days, and orders that are made before 2 pm are shipped out on the very same working day. Our warehouse and headquarters are in Bangkok, Thailand.
            </p>
          </div>
          <div className="mt-10 md:mt-0">
            <h4 className="text-3xl font-bold leading-snug text-gray-900 mb-4 text-left">
              Customer satisfaction <br />
              = everything.
            </h4>
            <p className="text-sm text-gray-600 max-w-md text-left">
              With us you will always be able to shop safely and should you not be satisfied, we have first-class, competent customer service and support which is often praised for its good reception. We will happily answer both simple and complex questions.
            </p>
          </div>
        </div>
      </div>

      <hr className="max-w-auto my-12" />

      <div className="text-center py-16">
        <h2 className="text-2xl font-bold tracking-wider text-gray-900 mb-10">
          Our partners
        </h2>
        <div className="flex justify-center items-center space-x-8">
          {partners.map((partner) => (
            <PartnerLogo key={partner.name} name={partner.name} imageUrl={partner.imageUrl} />
          ))}
        </div>
      </div>
      
    </main>
  );
};

export default AboutUsContent;