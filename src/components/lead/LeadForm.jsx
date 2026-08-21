import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const industries = [
  'Select industry', 'SaaS / Technology', 'Healthcare', 'Real Estate',
  'Insurance', 'Financial Services', 'E-commerce', 'Solar / Energy',
  'Mortgage / Lending', 'Education', 'Automotive', 'Other',
];

const volumes = [
  'Select volume', 'Under 1,000', '1,000 - 5,000', '5,000 - 25,000',
  '25,000 - 100,000', '100,000+',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', company: '' });
  const [errors, setErrors] = useState({});
  const consentRef = useRef(null);
  const firstErrorRef = useRef(null);

  const setField = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!fields.name.trim()) next.name = 'Full name is required.';
    if (!fields.email.trim()) next.email = 'Work email is required.';
    else if (!EMAIL_RE.test(fields.email.trim())) next.email = 'Enter a valid email address.';
    if (!fields.company.trim()) next.company = 'Company name is required.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldErrors = validate();
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    setErrors(fieldErrors);

    if (!consent) setConsentError(true);

    if (hasFieldErrors) {
      firstErrorRef.current?.focus();
      return;
    }
    if (!consent) {
      consentRef.current?.focus();
      return;
    }

    setConsentError(false);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="glass rounded-2xl p-6 sm:p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-7 h-7 sm:w-8 sm:h-8 text-success" />
        </motion.div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-sm text-text-secondary">We've received your request. Our team will reach out within 24 hours to schedule your personalized demo.</p>
      </motion.div>
    );
  }

  const fieldClass = (hasError) =>
    `w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white/[0.03] border rounded-xl text-xs sm:text-sm text-white placeholder:text-text-secondary/60 focus:outline-none focus:ring-1 transition-all ${
      hasError
        ? 'border-danger/60 focus:border-danger focus:ring-danger/30'
        : 'border-white/[0.08] focus:border-accent/50 focus:ring-accent/20'
    }`;
  const selectClass =
    'w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs sm:text-sm text-text-secondary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all appearance-none cursor-pointer';

  const FieldError = ({ id, message }) =>
    message ? (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        id={id}
        role="alert"
        className="flex items-center gap-1.5 text-xs text-danger mt-1.5"
      >
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {message}
      </motion.p>
    ) : null;

  const firstErrorKey = Object.keys(errors).find((k) => errors[k]);

  return (
    <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-5 sm:p-6 lg:p-8 space-y-4 sm:space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-text-secondary mb-1">Full Name *</label>
          <input
            ref={firstErrorKey === 'name' ? firstErrorRef : undefined}
            id="name"
            type="text"
            value={fields.name}
            onChange={setField('name')}
            placeholder="John Smith"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass(!!errors.name)}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-text-secondary mb-1">Work Email *</label>
          <input
            ref={firstErrorKey === 'email' ? firstErrorRef : undefined}
            id="email"
            type="email"
            value={fields.email}
            onChange={setField('email')}
            placeholder="john@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass(!!errors.email)}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-text-secondary mb-1">Phone Number</label>
          <input id="phone" type="tel" placeholder="+1 (555) 000-0000" className={fieldClass(false)} />
        </div>
        <div>
          <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-text-secondary mb-1">Company Name *</label>
          <input
            ref={firstErrorKey === 'company' ? firstErrorRef : undefined}
            id="company"
            type="text"
            value={fields.company}
            onChange={setField('company')}
            placeholder="Acme Inc."
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={fieldClass(!!errors.company)}
          />
          <FieldError id="company-error" message={errors.company} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="industry" className="block text-xs sm:text-sm font-medium text-text-secondary mb-1">Industry</label>
          <select id="industry" className={selectClass}>
            {industries.map((v) => (
              <option key={v} value={v} style={{ background: '#111827' }}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="volume" className="block text-xs sm:text-sm font-medium text-text-secondary mb-1">Monthly Call Volume</label>
          <select id="volume" className={selectClass}>
            {volumes.map((v) => (
              <option key={v} value={v} style={{ background: '#111827' }}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-text-secondary mb-1">Message</label>
        <textarea
          id="message"
          rows={3}
          placeholder="Tell us about your use case..."
          className={`${fieldClass(false)} resize-none`}
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            ref={consentRef}
            type="checkbox"
            checked={consent}
            aria-invalid={consentError || undefined}
            aria-describedby={consentError ? 'consent-error' : undefined}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError(false);
            }}
            className={`mt-0.5 w-4 h-4 rounded bg-transparent text-accent focus:ring-accent/30 cursor-pointer transition-colors shrink-0 ${
              consentError ? 'border-danger ring-1 ring-danger/50' : 'border-white/20'
            }`}
          />
          <span className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">
            I agree to LeadNex AI's Privacy Policy and consent to receiving communications about products, services, and events. You can unsubscribe at any time.
          </span>
        </label>
        {consentError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            id="consent-error"
            role="alert"
            className="flex items-center gap-1.5 text-xs text-danger mt-1.5 ml-6"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            Please accept the privacy policy to continue.
          </motion.p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:flex-1 justify-center"
          icon={!submitting ? <Send className="w-4 h-4" /> : undefined}
          loading={submitting}
        >
          Book a Demo
        </Button>
        <Button type="button" variant="secondary" size="lg" className="w-full sm:flex-1 justify-center">
          Start Free Trial
        </Button>
      </div>

      <p className="text-[10px] sm:text-[11px] text-text-secondary/60 text-center pt-1">
        🔒 Your information is encrypted and never shared with third parties.
      </p>
    </form>
  );
}
