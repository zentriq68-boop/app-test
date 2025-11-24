'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, MoreHorizontal, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Message, formatTime } from '@/lib/chat-utils';
import { messageVariants } from '@/lib/animation-utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            variants={messageVariants(isUser)}
            layout
            className={cn(
                "flex w-full gap-4 max-w-3xl",
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
        >
            <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                isUser ? "bg-coral-500 text-white" : "bg-ocean-600 text-white"
            )}>
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            <div className={cn(
                "flex flex-col gap-1 min-w-0",
                isUser ? "items-end" : "items-start"
            )}>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-navy-900 dark:text-white">
                        {isUser ? 'You' : 'Antigravity AI'}
                    </span>
                    <span className="text-[10px] text-navy-400">
                        {formatTime(message.timestamp)}
                    </span>
                </div>

                <div className={cn(
                    "relative group p-4 rounded-2xl shadow-sm border backdrop-blur-sm transition-all duration-200 hover:shadow-md",
                    isUser
                        ? "bg-coral-50/80 dark:bg-coral-950/20 border-coral-100 dark:border-coral-900/50 text-navy-900 dark:text-white rounded-tr-sm"
                        : "bg-white/80 dark:bg-navy-800/80 border-navy-100 dark:border-navy-700 text-navy-800 dark:text-navy-100 rounded-tl-sm"
                )}>
                    <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>

                    {!isUser && (
                        <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-navy-400 hover:text-ocean-600">
                                <Copy className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-navy-400 hover:text-green-600">
                                <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-navy-400 hover:text-red-600">
                                <ThumbsDown className="w-3 h-3" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
