'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Message } from '@/lib/chat-utils';
import { staggerContainer } from '@/lib/animation-utils';

interface MessageListProps {
    messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
        >
            <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
            </AnimatePresence>

            {/* Placeholder for typing indicator logic if needed externally, 
          though usually it's conditional based on state */}

            <div ref={bottomRef} className="h-4" />
        </motion.div>
    );
}
