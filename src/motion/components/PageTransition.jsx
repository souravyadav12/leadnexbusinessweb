import { motion } from 'framer-motion';
import { pageTransition } from '../variants';

/**
 * Wrap a whole page/route's content with this and mount it inside an
 * <AnimatePresence mode="wait"> at the router boundary to get a consistent
 * blur/fade enter-exit whenever the route (or a top-level view) changes.
 *
 *   <AnimatePresence mode="wait">
 *     <PageTransition key={route}>{page}</PageTransition>
 *   </AnimatePresence>
 */
export default function PageTransition({ children, className }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
