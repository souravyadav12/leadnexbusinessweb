import { useCallback, useEffect, useRef, useState } from 'react';

// Lightweight local intent matcher — no network calls, keeps this a pure
// front-end simulation while feeling like a live AI conversation.
function classifyIntent(text) {
  const t = text.toLowerCase();
  if (/price|cost|pricing|much/.test(t)) return 'pricing';
  if (/demo|meeting|schedule|book|call|thursday|friday|monday|time/.test(t)) return 'booking';
  if (/integrat|crm|salesforce|hubspot|api/.test(t)) return 'integration';
  if (/secur|hipaa|gdpr|complian|encrypt/.test(t)) return 'security';
  if (/human|agent|speak to|representative/.test(t)) return 'escalate';
  if (/hi|hello|hey/.test(t)) return 'greeting';
  return 'default';
}

function replyFor(intent, persona) {
  const bank = {
    pricing: [
      "Our plans start at $99/month for a single agent, scaling to custom Enterprise pricing for high volume. Want me to break down what fits your call volume?",
    ],
    booking: [
      "I can get that on the calendar right now. I have openings Thursday at 2 PM or Friday at 11 AM — which works better for you?",
    ],
    integration: [
      `We connect natively with ${persona.crm}, plus 50+ other tools via API and webhooks. Integration usually takes under a day.`,
    ],
    security: [
      "We're SOC 2 Type II certified, GDPR and HIPAA compliant, with AES-256 encryption end to end — your data never trains our models.",
    ],
    escalate: [
      "Of course — I'll flag this for a member of our team and hand off the full transcript so you don't have to repeat anything.",
    ],
    greeting: [
      `Hi! Thanks for calling ${persona.company}. I'm your AI agent — happy to answer questions or get you booked in.`,
    ],
    default: [
      "Got it — tell me a bit more about what you're looking for and I'll point you in the right direction.",
      "That's a great question. Based on what similar teams do, I'd recommend starting with a quick pilot on your highest-volume line.",
    ],
  };
  const options = bank[intent] || bank.default;
  return options[Math.floor(Math.random() * options.length)];
}

const persona = { company: 'LeadNex AI', crm: 'Salesforce & HubSpot' };

export function useCallSimulator(initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages);
  const [isThinking, setIsThinking] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | live | ended
  const timerRef = useRef(null);
  const pendingReplyRef = useRef(null);

  useEffect(() => {
    if (status !== 'live') return;
    timerRef.current = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [status]);

  // Guard against a queued AI reply landing after the call has ended, been
  // reset, or the component has unmounted — previously this timeout was
  // untracked, so resetting mid-"thinking" could silently re-append a
  // message to an already-cleared conversation.
  useEffect(() => () => clearTimeout(pendingReplyRef.current), []);

  const start = useCallback((openingMessages = []) => {
    clearTimeout(pendingReplyRef.current);
    setMessages(openingMessages);
    setCallSeconds(0);
    setIsThinking(false);
    setStatus('live');
  }, []);

  const end = useCallback(() => {
    clearTimeout(pendingReplyRef.current);
    setStatus('ended');
    setIsThinking(false);
    clearInterval(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    clearTimeout(pendingReplyRef.current);
    setMessages([]);
    setCallSeconds(0);
    setStatus('idle');
    setIsThinking(false);
  }, []);

  const sendUserMessage = useCallback((text) => {
    if (!text.trim() || status !== 'live') return;
    const userMsg = { role: 'user', text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setIsThinking(true);

    const intent = classifyIntent(text);
    const delay = 900 + Math.random() * 900;
    clearTimeout(pendingReplyRef.current);
    pendingReplyRef.current = setTimeout(() => {
      setMessages((m) => [...m, { role: 'ai', text: replyFor(intent, persona) }]);
      setIsThinking(false);
    }, delay);
  }, [status]);

  const formattedTime = `${String(Math.floor(callSeconds / 60)).padStart(2, '0')}:${String(callSeconds % 60).padStart(2, '0')}`;

  return {
    messages,
    isThinking,
    status,
    callSeconds,
    formattedTime,
    start,
    end,
    reset,
    sendUserMessage,
  };
}
