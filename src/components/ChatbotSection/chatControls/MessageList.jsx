import { Message } from './Message.jsx';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

export const MessageList = ({ messages, loading }) => {
    const messagesEndRef = useRef(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (!isCollapsed) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, loading, isCollapsed]);

    return (
        <div className={`
            fixed bottom-24 right-6 
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-16 h-16' : 'w-96 h-96'}
            bg-white rounded-2xl shadow-2xl
            flex flex-col
            z-50
        `}>
            {/* Header with collapse button */}
            <div
                className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 rounded-t-2xl"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {!isCollapsed && (
                    <>
                        <div className="flex items-center gap-2">
                            <MessageSquare size={20} className="text-blue-500" />
                            <h3 className="font-semibold text-gray-800">Chat History</h3>
                        </div>
                        <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                            <ChevronDown size={20} className="text-gray-600" />
                        </button>
                    </>
                )}
                {isCollapsed && (
                    <button className="w-full h-full flex items-center justify-center">
                        <MessageSquare size={24} className="text-blue-500" />
                    </button>
                )}
            </div>

            {/* Messages area - only show when not collapsed */}
            {!isCollapsed && (
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-400 mt-8">
                            <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No messages yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map(msg => (
                                <Message key={msg.id} message={msg} />
                            ))}
                            {loading && (
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                                        AI
                                    </div>
                                    <div className="px-3 py-2 rounded-xl bg-white border border-gray-200">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};