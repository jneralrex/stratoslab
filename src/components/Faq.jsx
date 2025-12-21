import { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Trustedtek offer?",
      answer: "Trustedtek offers services such as UI/UX design, full-stack development, token creation, and social media management.",
    },
    {
      question: "How can I contact Trustedtek?",
      answer: "You can contact us through our website's contact form or by booking a call directly.",
    },
    {
      question: "What industries do you specialize in?",
      answer: "We specialize in Web3, blockchain, and innovative tech industries.",
    },
    {
      question: "Do you provide support after project delivery?",
      answer: "Yes, we offer post-delivery support to ensure your project runs smoothly.",
    },
    {
        question:"How long does a project takes?",
        answer:"The complexity of the project determines how long the project would take, however efficiency is one of our top most priority. Most projects launch within 4–12 weeks."
    },

    {
        question:"How does your pricing work?",
        answer:"The complexity of the project determines how much would be charged. We ensure transparent quotes after assessing your needs, we offer fixed-price and payment per milestone to ensure flexibility."
    },
    {
        question:"Do you accepts crypto for payment?",
        answer:"Yes. We accept payments in stable coins (USDT, USDC) or other tokens as may be agreed"

    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-[90%] mx-auto my-10 p-5 bg-gradient-to-t from-[#2b1055]/90 via-[#23153c]/90 to-black/90 z-10 flex flex-col lg:flex-row justify-around rounded-lg items-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-white md:text-6xl">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-lg font-semibold text-white flex justify-between items-center"
            >
              {faq.question}
              <span className="text-green-500 font-extrabold">{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-[#b2aeb9] font-bold lg:max-w-[400px]">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}