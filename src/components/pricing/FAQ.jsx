import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How quickly can I set up LeadNex AI?',
    a: 'Most teams are up and running in under 5 minutes. Simply connect your phone system, upload your knowledge base, and configure your AI agent. Our onboarding team provides hands-on support for enterprise deployments.',
  },
  {
    q: 'Is the AI voice really indistinguishable from humans?',
    a: 'Yes. Our proprietary voice models achieve a 98.7% human-likeness score in blind tests. We offer 50+ natural voices across 30+ languages, plus custom voice cloning for enterprise clients.',
  },
  {
    q: "What happens when the AI can't handle a question?",
    a: 'LeadNex AI seamlessly escalates to a human agent when it detects complex situations, high-emotion conversations, or topics outside its knowledge base. The handoff is smooth and contextual — the human agent receives the full transcript and summary.',
  },
  {
    q: 'How does pricing work for high-volume calling?',
    a: 'Our Growth and Enterprise plans are designed for scale. Enterprise clients receive custom per-minute pricing that decreases with volume. Contact our sales team for a personalized quote based on your expected call volume.',
  },
  {
    q: 'Can LeadNex AI integrate with my existing CRM?',
    a: 'Absolutely. We offer native integrations with Salesforce, HubSpot, Pipedrive, Zoho, and 50+ other tools. Our REST API and webhooks enable custom integrations with any system.',
  },
  {
    q: 'Is my data secure and compliant?',
    a: 'Yes. LeadNex AI is SOC 2 Type II certified, GDPR compliant, and HIPAA ready. All data is encrypted with AES-256 at rest and TLS 1.3 in transit. We never use your data to train our models.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="mt-20 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="glass rounded-xl overflow-hidden transition-colors duration-300 hover:border-white/20"
            style={{ border: '1px solid var(--color-border-subtle)' }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer group transition-colors duration-200 hover:bg-white/[0.03]"
              aria-expanded={open === i}
              aria-controls={`faq-panel-${i}`}
              id={`faq-trigger-${i}`}
            >
              <span className="text-sm font-medium text-white pr-4 group-hover:text-accent transition-colors duration-200">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-text-secondary group-hover:text-accent flex-shrink-0 transition-all duration-300 ease-[var(--ease-out)] ${
                  open === i ? 'rotate-180 text-accent' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
