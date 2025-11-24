'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatSidebar } from './ChatSidebar';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ChatSession, Message, generateId } from '@/lib/chat-utils';
import { cn } from '@/lib/utils';

export function ChatInterface() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentSession, setCurrentSession] = useState<ChatSession>({
        id: '1',
        title: 'New Conversation',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            id: generateId(),
            role: 'user',
            content,
            timestamp: new Date(),
            status: 'sending',
        };

        setCurrentSession((prev) => ({
            ...prev,
            messages: [...prev.messages, newMessage],
        }));

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: generateId(),
                role: 'assistant',
                content: "I'm processing your request. This is a simulated response.",
                timestamp: new Date(),
            };
            setCurrentSession((prev) => ({
                ...prev,
                messages: [...prev.messages, aiMessage],
            }));
        }, 1500);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-navy-50 dark:bg-navy-950 text-navy-900 dark:text-navy-50 font-sans">
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <ChatSidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <main className="flex-1 flex flex-col h-full relative z-0">
                <ChatHeader
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="flex-1 overflow-hidden relative">
                    <MessageList messages={currentSession.messages} />
                </div>

                <div className="p-4 md:p-6 bg-gradient-to-t from-navy-50 via-navy-50 to-transparent dark:from-navy-950 dark:via-navy-950 z-10">
                    <MessageInput onSendMessage={handleSendMessage} />
                </div>
            </main>
        </div>
    );
}
