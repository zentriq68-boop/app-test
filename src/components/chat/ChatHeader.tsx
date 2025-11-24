'use client';

import React from 'react';
import { Menu, MoreVertical, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export function ChatHeader({ isSidebarOpen, onToggleSidebar }: ChatHeaderProps) {
    return (
        <header className="h-16 px-4 md:px-6 flex items-center justify-between bg-white/50 dark:bg-navy-900/50 backdrop-blur-md border-b border-navy-100 dark:border-navy-800 z-10 sticky top-0">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleSidebar}
                    className={cn("text-navy-500 hover:bg-navy-100 dark:hover:bg-navy-800", isSidebarOpen && "md:hidden")}
                >
                    <Menu className="w-5 h-5" />
                </Button>

                <div className="flex flex-col">
                    <h1 className="text-sm font-semibold text-navy-900 dark:text-white flex items-center gap-2">
                        New Conversation
                        <span className="px-2 py-0.5 rounded-full bg-ocean-100 dark:bg-ocean-900/30 text-ocean-700 dark:text-ocean-300 text-[10px] font-bold uppercase tracking-wider">
                            GPT-4
                        </span>
                    </h1>
                    <p className="text-xs text-navy-500 dark:text-navy-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Online
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
                <Button variant="ghost" size="icon" className="text-navy-500 hover:text-ocean-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/20">
                    <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-navy-500 hover:text-ocean-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/20">
                    <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-navy-500 hover:bg-navy-100 dark:hover:bg-navy-800">
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </div>
        </header>
    );
}
