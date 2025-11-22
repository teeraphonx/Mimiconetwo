import React, { useState } from 'react';

interface FaqQuestion {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  questions: FaqQuestion[];
}

const faqContent: FaqCategory[] = [
  {
    title: 'เราคือใคร ?',
    questions: [
      {
        question: 'เราคือใคร ?',
        answer: 'เราคือผู้ผลิตและจำหน่ายผลิตภัณฑ์ที่เกี่ยวข้องกับคอมพิวเตอร์และอุปกรณ์อิเล็กทรอนิกส์ ซึ่งรวมถึงแผ่นรองเมาส์และเมาส์สเก็ต เรามุ่งมั่นที่จะพัฒนาผลิตภัณฑ์ที่มีคุณภาพสูงเพื่อตอบสนองความต้องการของนักเล่นเกมและผู้ใช้งานทั่วไป',
      },
    ],
  },
  {
    title: 'คำถามเกี่ยวกับสินค้าของเรา มีอะไรบ้าง ?',
    questions: [
      {
        question: 'สินค้าของท่านทำมาจากวัสดุอะไรบ้าง ?',
        answer: 'สินค้าของเราผลิตจากวัสดุคุณภาพสูงหลากหลายชนิด เช่น PTFE (Polytetrafluoroethylene), PEEK (Polyether ether ketone), Alumina, Zirconia, Silicone, POM, UHMW-PE, และ BOD ซึ่งแต่ละวัสดุมีคุณสมบัติเฉพาะตัวเพื่อประสิทธิภาพสูงสุด',
      },
      {
        question: 'มีสินค้าประเภทไหนบ้าง ?',
        answer: 'เรามีสินค้าครอบคลุมหลายรุ่น เช่น Talons Grip Coated / CTPED / Griptaped PRO / Tiger Arc 1 / Tiger Arc 2 / Superglide ซึ่งออกแบบมาเพื่อความเร็วและความแม่นยำตามความต้องการของผู้ใช้งาน',
      },
    ],
  },
  {
    title: 'ความแตกต่าง UNCOATED กับ COATED คืออะไร ?',
    questions: [
      {
        question: 'แผ่นรองเมาส์ UNCOATED คืออะไร ?',
        answer: 'แผ่นรองเมาส์ผิว UNCOATED (ไม่เคลือบผิว) คือแผ่นรองเมาส์ที่ไม่มีการเคลือบสารใดๆ บนพื้นผิว ทำให้พื้นผิวเป็นธรรมชาติของวัสดุนั้นๆ โดยตรง ซึ่งจะให้ความรู้สึกในการควบคุมที่แตกต่างกันไปตามวัสดุหลักของแผ่นรองเมาส์นั้นๆ',
      },
      {
        question: 'แผ่นรองเมาส์ COATED มีความแตกต่างจาก UNCOATED อย่างไรบ้าง ?',
        answer: 'แผ่นรองเมาส์ผิว COATED (เคลือบผิว) คือแผ่นรองเมาส์ที่มีการเคลือบสารพิเศษบนพื้นผิวเพื่อเพิ่มความเรียบเนียน ความทนทาน และความสม่ำเสมอของความลื่น มักจะให้ความเร็วที่สูงกว่าและสม่ำเสมอมากกว่าแบบ UNCOATED',
      },
      {
        question: 'แผ่นรองเมาส์ UNCOATED ในปัจจุบันมีอะไรบ้าง',
        answer: 'แผ่นรองเมาส์ UNCOATED ที่เรามีในปัจจุบันจะเน้นไปที่วัสดุที่ให้ความรู้สึกแบบควบคุมสูง (Control) เช่น Artisans / Odin Gaming / Padsmith / Gamesense / Xraypad (AC+/STEEL) เป็นต้น',
      },
    ],
  },
  {
    title: 'วิธีการดูแลรักษาสินค้า MICHIDID',
    questions: [
      {
        question: 'วิธีการดูแลรักษาผลิตภัณฑ์ MICHIDID',
        answer: 'สำหรับการดูแลรักษาสินค้า (เมาส์สเก็ต) ให้หลีกเลี่ยงการสัมผัสกับน้ำมันหรือสิ่งสกปรก หากจำเป็นสามารถใช้ผ้าชุบน้ำหมาดๆ เช็ดเบาๆ ห้ามใช้น้ำยาทำความสะอาดที่มีฤทธิ์กัดกร่อน การดูแลรักษาที่ถูกต้องจะช่วยยืดอายุการใช้งานของผลิตภัณฑ์ได้',
      },
    ],
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300 last:border-b-0">
      <div 
        className="bg-white p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors duration-150" 
        onClick={toggleOpen}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0} 
      >
        <h4 className="text-gray-800 text-base font-normal m-0">{question}</h4>
        <span className="text-xl text-gray-500 transform transition-transform duration-300">
          {isOpen ? '-' : '+'}
        </span>
      </div>
      

      <div 
        className={`bg-gray-50 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="text-gray-700 p-4 text-sm leading-relaxed m-0 border-t border-gray-200">
          {answer}
        </p>
      </div>
    </div>
  );
};


const Faqsection: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800 max-auto">
      <header className="bg-white py-10 border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-center uppercase m-0 text-gray-800">FAQ</h1>
      </header>
      
      <main className="max-w-4xl mx-auto p-5 pb-10"> 
        {faqContent.map((categoryData, index) => (
          <div key={index} className="mb-6">
            <div className="bg-black-100 p-4 mb-0 border-b border-gray-200"> 
                 <h2 className="text-lg font-bold uppercase m-0 text-gray-800">{categoryData.title}</h2>
            </div>
            <div>
                {categoryData.questions.map((item, qIndex) => (
                    <FaqItem 
                        key={qIndex}
                        question={item.question}
                        answer={item.answer}
                    />
                ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Faqsection;