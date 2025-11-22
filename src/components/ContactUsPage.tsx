import React from 'react';

const ContactUsContent: React.FC = () => {
  return (
    <main className="container mx-auto px-4 max-w-4xl">
      {/* Breadcrumb & Title */}
      <div className="pt-16 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">How can we help you?</h1>
        <p className="text-lg text-gray-700">
          Please feel free to contact us if you have any questions
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-4 mb-16">
        <p className="font-bold text-gray-800">MiMic GamingGear Co., Ltd.</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          2410 2 Phahonyothin Road, Senanikom Subdistrict,
          <br />
          Chatuchak District, Bangkok 10900, Thailand
        </p>
        <a href="mailto:mimic.gg@co.th" className="text-sm text-gray-700 hover:text-black transition duration-200">
          mimic.gg@co.th
        </a>
      </div>

      {/* Contact Form */}
      <div className="mb-20">
        <h2 className="text-xl font-bold mb-8 text-gray-800">
          กรอกแบบฟอร์มหากมีคำถามใด ๆ
        </h2>
        <form className="space-y-8">
          {/* Row 1: ชื่อ, อีเมล, โทรศัพท์ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input 
              type="text" 
              placeholder="ชื่อ" 
              className="border-b border-gray-300 focus:border-black outline-none pb-2 text-sm" 
              aria-label="ชื่อ"
            />
            <input 
              type="email" 
              placeholder="อีเมล" 
              className="border-b border-gray-300 focus:border-black outline-none pb-2 text-sm" 
              aria-label="อีเมล"
            />
            <input 
              type="tel" 
              placeholder="โทรศัพท์" 
              className="border-b border-gray-300 focus:border-black outline-none pb-2 text-sm" 
              aria-label="โทรศัพท์"
            />
          </div>

          {/* Row 2: ข้อความ */}
          <div>
            <textarea
              placeholder="ข้อความ"
              rows={4}
              className="border-b border-gray-300 focus:border-black outline-none w-full resize-none text-sm"
              aria-label="ข้อความ"
            ></textarea>
            <div className="text-right text-xs text-gray-500 mt-1">0/300</div> {/* Placeholder: นับจำนวนตัวอักษร */}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              className="px-6 py-2 bg-black text-white text-sm font-bold tracking-wider hover:bg-gray-700 transition duration-300"
            >
              ส่ง
            </button>
          </div>
        </form>
      </div>

    </main>
  );
};

const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <ContactUsContent />
    </div>
  );
};

export default ContactUsPage;
