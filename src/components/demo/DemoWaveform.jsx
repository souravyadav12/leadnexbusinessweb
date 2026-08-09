import Waveform from '../../motion/components/Waveform';

// Thin compatibility wrapper around the shared Waveform preset.
export default function DemoWaveform({ active }) {
  return <Waveform bars={40} active={active} minHeight={4} maxHeight={32} barWidth={3} gap={2} />;
}
