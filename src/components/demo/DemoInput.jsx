import { useState } from 'react';
import { Send } from 'lucide-react';

const suggestions = ['What does this cost?', 'Can you book a demo?', 'Is my data secure?'];

export default function DemoInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const submit = (text) => {
    const t = (text ?? value).trim();
    if (!t || disabled) return;
    onSend(t);
    setValue('');
  };

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            disabled={disabled}
            onClick={() => submit(s)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? 'Start the call to chat with the AI…' : 'Type what the caller would say…'}
          aria-label="Message the AI agent"
          className="flex-1 px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-text-secondary/60 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className="w-10 h-10 flex-shrink-0 rounded-xl bg-accent text-white flex items-center justify-center hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
