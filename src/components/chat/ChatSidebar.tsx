'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageSquare, X, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
    return (
        <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border-r border-navy-200 dark:border-navy-800 flex flex-col z-20 hidden md:flex"
        >
            <div className="p-4 flex items-center justify-between border-b border-navy-100 dark:border-navy-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center text-white font-bold shadow-lg shadow-ocean-500/20">
                        AI
                    </div>
                    <span className="font-semibold text-lg tracking-tight">Antigravity</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="p-4">
                <Button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white shadow-lg shadow-ocean-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                    <Plus className="w-4 h-4 mr-2" />
                    New Chat
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                <div className="px-2 py-1 text-xs font-medium text-navy-400 uppercase tracking-wider">
                    Recent
                </div>
                {[1, 2, 3].map((i) => (
                    <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-full text-left px-3 py-3 rounded-xl hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors group flex items-center gap-3"
                    >
                        <MessageSquare className="w-4 h-4 text-navy-400 group-hover:text-ocean-500 transition-colors" />
                        <div className="flex-1 overflow-hidden">
                            <div className="truncate text-sm font-medium text-navy-700 dark:text-navy-200 group-hover:text-navy-900 dark:group-hover:text-white">
                                Project Discussion {i}
                            </div>
                            <div className="truncate text-xs text-navy-400">
                                2 hours ago
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className="p-4 border-t border-navy-100 dark:border-navy-800 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-navy-800">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-coral-600 hover:text-coral-700 hover:bg-coral-50 dark:hover:bg-coral-950/30">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        </motion.aside>
    );
}
