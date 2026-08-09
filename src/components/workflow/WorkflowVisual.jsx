import { AnimatePresence, motion } from 'framer-motion';
import GlassShimmer from '../../motion/background/layers/GlassShimmer';
import {
  StageLeadArrives,
  StageAIAnswers,
  StageQualifies,
  StageBooksMeeting,
  StageCRMUpdates,
  StageAnalyticsUpdates,
} from './WorkflowStages';

const STAGES = [StageLeadArrives, StageAIAnswers, StageQualifies, StageBooksMeeting, StageCRMUpdates, StageAnalyticsUpdates];

/**
 * A floating "product window" that stays pinned while the reader scrolls
 * through the step list beside it, cross-fading between a distinct mini
 * interface for each stage of the lead's journey — not a static screenshot,
 * a different live mockup per beat of the story.
 */
export default function WorkflowVisual({ steps, activeIndex }) {
  const Stage = STAGES[activeIndex] ?? STAGES[0];
  const step = steps[activeIndex];

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:sticky lg:top-28">
      <div className="glass rounded-2xl p-6 lg:p-8 h-[340px] flex flex-col relative overflow-hidden">
        <GlassShimmer duration={10} width="18%" />
        <div className="flex items-center justify-between mb-6">
          <span className="tag-bracket text-[10px] text-accent">{step.tag}</span>
          <span className="text-mono-label text-[10px] text-text-tertiary">
            {String(activeIndex + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 min-h-0"
          >
            <Stage />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -z-10 -inset-6 rounded-[2rem] bg-accent/[0.06] blur-3xl" aria-hidden="true" />
    </div>
  );
}
