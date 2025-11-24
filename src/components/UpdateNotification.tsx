'use client';

import { useServiceWorker } from '@/hooks/useServiceWorker';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, CheckCircle } from 'lucide-react';

export default function UpdateNotification() {
    const { updateStatus, installUpdate } = useServiceWorker();

    const getStatusConfig = () => {
        switch (updateStatus) {
            case 'available':
                return {
                    icon: Download,
                    text: 'Update available',
                    subtext: 'A new version is ready to download',
                    showButton: false,
                };
            case 'downloading':
                return {
                    icon: Download,
                    text: 'Downloading update...',
                    subtext: 'You can continue using the app',
                    showButton: false,
                };
            case 'ready':
                return {
                    icon: CheckCircle,
                    text: 'Update ready',
                    subtext: 'Click to install and restart',
                    showButton: true,
                };
            default:
                return null;
        }
    };

    const config = getStatusConfig();

    return (
        <AnimatePresence>
            {config && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
                >
                    <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                                    <config.icon className="w-5 h-5 text-black dark:text-white" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-black dark:text-white">
                                    {config.text}
                                </p>
                                <p className="text-xs text-black/60 dark:text-white/60">
                                    {config.subtext}
                                </p>
                            </div>

                            {config.showButton && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={installUpdate}
                                    className="flex-shrink-0 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Install
                                </motion.button>
                            )}
                        </div>

                        {updateStatus === 'downloading' && (
                            <div className="mt-3">
                                <div className="h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-black dark:bg-white"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 2, ease: 'easeInOut' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
