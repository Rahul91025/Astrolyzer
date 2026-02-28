import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ Data
const faqData = [
  {
    question: "What is 'the zodiac' ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question:
      'Why are interpretations by various astrologers so different for the same forecast period?',
    answer:
      'Different astrologers may use various techniques, systems, or personal insights based on experience, which can lead to varied interpretations.',
  },
  {
    question: 'What is a Rising Sign or Ascendant?',
    answer:
      'The Rising Sign or Ascendant is the zodiac sign that was rising on the eastern horizon at the time of your birth. It influences how others perceive you.',
  },
  {
    question: "What is 'the house' ?",
    answer:
      'In astrology, houses divide the sky into twelve sections, each representing different areas of life such as career, home, relationships, etc.',
  },
  {
    question: "What is 'the house' ?",
    answer:
      'The houses are like a stage where the planets act, each house representing a specific aspect of human life.',
  },
  {
    question: 'What is Rising Sign or Ascendant ?',
    answer:
      'It’s the same as the Ascendant — the zodiac sign that was on the eastern horizon at your birth, affecting your appearance and first impressions.',
  },
];

const FAQAccordion = () => {
  // Default first item to be open
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    // Prevent closing the last open one
    setOpenIndex(index === openIndex ? openIndex : index);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-4">
      {faqData.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <div
            key={index}
            className="border border-mystic-border-subtle rounded-md overflow-hidden transition-colors duration-700"
          >
            {/* Question */}
            <button
              onClick={() => toggleIndex(index)}
              className={`w-full flex justify-between items-center text-left px-6 py-4 text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-mystic-gold' : 'text-mystic-text'
                }`}
            >
              {item.question}
              {isOpen ? (
                <ChevronUp className="text-mystic-gold transition-colors duration-300" />
              ) : (
                <ChevronDown className="text-mystic-gold transition-colors duration-300" />
              )}
            </button>

            {/* Answer */}
            {isOpen && (
              <div className="border-t border-mystic-border-subtle bg-mystic-bg-sec px-6 py-4 text-mystic-text-sec text-sm leading-relaxed transition-colors duration-700">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
