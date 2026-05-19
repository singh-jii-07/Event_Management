import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";

const faqs = [
  {
    question: "How do I book an event on EventHub?",
    answer:
      "Simply browse events, click on one you like, and hit 'Book Now'. You'll need to be logged in. Once booked, you can manage it from your profile dashboard.",
  },
  {
    question: "Can I cancel a booking after it's confirmed?",
    answer:
      "Yes, you can cancel bookings from your profile page under 'My Bookings'. Cancellation policies may vary by event, so check the event details before booking.",
  },
  {
    question: "Is EventHub free to use?",
    answer:
      "Yes! EventHub is free to browse and discover events. Creating an account is also completely free. Event pricing is set by organizers.",
  },
  {
    question: "How do I create my own event?",
    answer:
      "Admin users can create events by clicking 'Create Event' in the navigation. Fill in the details including title, description, date, time, and location.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team via email at support@eventhub.com or use the contact form in the footer. We typically respond within 24 hours.",
  },
  {
    question: "Can I manage my bookings from mobile?",
    answer:
      "Absolutely! EventHub is fully responsive and works seamlessly on all devices — smartphone, tablet, or desktop. Your profile and bookings are accessible anywhere.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? "rgba(124,58,237,0.08)" : "#111827",
        border: isOpen ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(30,41,59,0.8)",
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-semibold text-white">{question}</span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isOpen ? "rgba(124,58,237,0.3)" : "rgba(30,41,59,0.8)",
          }}
        >
          {isOpen ? (
            <FiMinus className="text-purple-400 text-sm" />
          ) : (
            <FiPlus className="text-slate-400 text-sm" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-slate-400 text-sm leading-relaxed px-5 pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24" style={{ background: "#0F172A" }}>
      <div className="section-container">
        <SectionTitle
          tag="Got Questions?"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Everything you need to know about EventHub. Can't find an answer? Contact our support team."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
