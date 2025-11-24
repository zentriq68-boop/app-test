'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Mic, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto">
            <div className="relative flex items-end gap-2 bg-white dark:bg-navy-800 rounded-[2rem] shadow-lg shadow-navy-200/50 dark:shadow-none border border-navy-100 dark:border-navy-700 p-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-ocean-500/20 focus-within:border-ocean-500/50">
                <div className="flex items-center gap-1 pb-1 pl-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-navy-400 hover:text-ocean-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/20 rounded-full transition-colors">
                        <Paperclip className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-navy-400 hover:text-ocean-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/20 rounded-full transition-colors">
                        <Mic className="w-5 h-5" />
                    </Button>
                </div>

                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 py-3 bg-transparent border-none focus:ring-0 resize-none max-h-[200px] min-h-[44px] text-navy-900 dark:text-white placeholder:text-navy-400 scrollbar-hide leading-relaxed"
                />

                <div className="flex items-center pb-1 pr-1">
                    <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className={cn(
                            "h-9 w-9 rounded-full transition-all shadow-md",
                            message.trim()
                                ? "bg-ocean-600 hover:bg-ocean-700 text-white shadow-ocean-500/20 hover:scale-105 active:scale-95"
                                : "bg-gray-200 dark:bg-navy-700 text-gray-400 dark:text-navy-400 cursor-not-allowed shadow-none"
                        )}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="mt-2 text-center text-xs text-navy-400">
                Press <kbd className="px-1 py-0.5 rounded bg-navy-100 dark:bg-navy-800 font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-navy-100 dark:bg-navy-800 font-mono text-[10px]">Shift + Enter</kbd> for new line
            </div>
        </div>
    );
}
