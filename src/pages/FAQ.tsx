import { useState } from 'react';
import DefaultLayout from "../components/DefaultLayout";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "What is BlinkBuy?",
      answer: "BlinkBuy is an online marketplace connecting buyers and sellers globally, offering a variety of products with a focus on ease and reliability."
    },
    {
      question: "How do I create an account?",
      answer: "Click 'Sign Up' on the homepage, enter your details, and verify your email to get started."
    },
    {
      question: "How can I become a seller on BlinkBuy?",
      answer: "Visit 'Become a Seller,' sign up with your business info, and get approved to list products."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, PayPal, and bank transfers, depending on your region."
    },
    {
      question: "How do I track my order?",
      answer: "Check 'My Orders' in your account with the tracking number from your confirmation email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in original packaging. See our Returns page."
    },
    {
      question: "How do I contact customer support?",
      answer: "Email support@blinkbuy.com, call +1 (800) 555-0123, or use our Contact Us page anytime."
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-base-200 mt-7 w-full py-16">
        {/* Header */}
        <section className="max-w-5xl mx-auto px-6 mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Find answers to common questions about BlinkBuy below.
          </p>
        </section>

        {/* FAQ List */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="space-y-3">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-base-100 rounded-lg shadow-md border border-base-300"
              >
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-secondary pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-primary transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-base-content/80 text-base leading-relaxed border-t border-base-300">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-5xl mx-auto px-6 mt-12 text-center">
          <div className="bg-primary text-primary-content rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-3">Need More Help?</h2>
            <p className="text-base mb-4">
              Contact us if you have additional questions!
            </p>
            <a href="/contact" className="btn btn-secondary">
              Get in Touch
            </a>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default FAQ;