import { useEffect, useRef, useState } from 'react';
import Waveform from '../../motion/components/Waveform';

const BAR_COUNT = 32;

export default function LiveWaveform({ label = 'Tap to talk' }) {
  const [levels, setLevels] = useState(Array(BAR_COUNT).fill(6));
  const [listening, setListening] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);

  const stopListening = () => {
    setListening(false);
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close?.();
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;
      setListening(true);
      setPermissionDenied(false);

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        const next = Array.from({ length: BAR_COUNT }, (_, i) => {
          const v = data[i % data.length] || 0;
          return Math.max(6, (v / 255) * 32);
        });
        setLevels(next);
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setPermissionDenied(true);
    }
  };

  useEffect(() => () => stopListening(), []);

  // Idle ambient animation when not actively listening to a real mic
  useEffect(() => {
    if (listening) return;
    const id = setInterval(() => {
      setLevels((prev) => prev.map((_, i) => 6 + Math.abs(Math.sin(Date.now() / 400 + i)) * 14));
    }, 90);
    return () => clearInterval(id);
  }, [listening]);

  return (
    <div className="flex flex-col items-center gap-3">
      <Waveform
        levels={levels}
        barWidth={3}
        gap={3}
        maxHeight={36}
        barClassName={listening ? 'bg-gradient-to-t from-accent to-success' : 'bg-gradient-to-t from-accent to-accent-secondary'}
      />
      <button
        type="button"
        onClick={listening ? stopListening : startListening}
        className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
      >
        {listening ? 'Listening… tap to stop' : permissionDenied ? 'Mic blocked — showing preview' : label}
      </button>
    </div>
  );
}
