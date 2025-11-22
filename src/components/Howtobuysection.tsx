import React from 'react';

const Howtobuysection: React.FC = () => {
  const partners = [
    { name: 'Partner 1', imageUrl: 'public/image.png' }, 
    { name: 'Partner 2', imageUrl: 'public/Logo-SPU-SIT_Color1.png.webp' }, 
    { name: 'Partner 3', imageUrl: 'public/1753230.jpg' },
  ];

  return (
    <main>
      <div className="text-center pt-20 pb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4 ">วิธีการสั่งซื้อ</h1>
        <p className="text-lg font-semibold text-black mb-4">วิธีการสั่งซื้อสินค้าใน mimic gg </p>
      </div>

      <hr className="max-w-auto" />

      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="md:grid md:grid-cols-1 gap-12 ">
          <div>
            <h3 className="text-sm font-bold text-gray-900  text-center  mx-auto mb-4">
              1. ไปที่สินค้าที่ต้องการสั่ง จากนั้นกด “เพิ่มลงในตะกร้าสินค้า” หรือ “Add to cart”
            </h3>
            <h3 className="text-sm font-bold text-gray-900 text-center mx-auto mb-4">
              2. เมื่อหยิบสินค้าที่ต้องการลงตะกร้าเรียบร้อยแล้ว ให้กดไปที่รูปตะกร้า (รูปภาพไอคอนตะกร้า) <br></br>หน้าต่างนี้จะแสดงรายการสินค้าและยอดรวมสินค้าทั้งหมด
            </h3>
            <h3 className="text-sm font-bold text-gray-900 text-center mx-auto mb-4">
              3. กดที่ “การชำระเงิน” เพื่อเข้าไปกรอกข้อมูลติดต่อและที่อยู่จัดส่ง
            </h3>
            <h3 className="text-sm font-bold text-gray-900 text-center mx-auto mb-4">
              4. เมื่อกรอกข้อมูลทั้งหมดเรียบร้อย ให้กดที่ “ดำเนินการต่อไปที่หน้าต่างการจัดส่ง” หรือ “Continue to shipping”
            </h3>
            <h3 className="text-sm font-bold text-gray-900 text-center mx-auto mb-4">
              5. เมื่อถึงหน้าต่างนี้สามารถเช็ค / แก้ไขข้อมูลติดต่อและที่อยู่จัดส่งได้ หากถูกต้องครบถ้วนให้กด “ดำเนินการชำระเงินต่อ” หรือ “Continue to payment”
            </h3>
            <h3 className="text-sm font-bold text-gray-900 text-center mx-auto mb-4">
              6. หากมีรหัสส่วนลด สามารถกรอกที่ช่อง “รหัสส่วนลด” ในหน้าต่างนี้ได้เลย
            </h3>
            <h3 className="text-sm font-bold text-gray-900 text-center mx-auto mb-4">
              7. จากนั้นให้กด “ชำระเงินตอนนี้” เพื่อชำระเงินในระบบ
            </h3>
            <h3 className="text-sm font-bold text-gray-900 text-center mx-auto mb-4">
              8. หลังจากที่ลูกค้าชำระเงินสำเร็จแล้ว พวกเราจะจัดส่งสินค้าไปยังลูกค้าทันที
            </h3>
          </div>

          <div className="h-full">
          </div>
        </div>
      </div>

      <hr className="max-w-auto my-12" />
    </main>
  );
};

export default Howtobuysection;