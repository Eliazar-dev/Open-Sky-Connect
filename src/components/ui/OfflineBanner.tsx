import { WifiOff } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

/** Slim banner that appears app-wide whenever the browser loses connectivity. */
export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 bg-ink-900 py-2 text-sm text-white"
        >
          <WifiOff className="h-4 w-4" />
          You're offline. Some features may not work until you're back online.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
