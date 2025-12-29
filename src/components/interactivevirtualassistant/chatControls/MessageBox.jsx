import { Send, Mic } from 'lucide-react';

export const MessageBox = ({
                               input,
                               setInput,
                               onSend,
                               loading,
                               disabled,
                               isGuest = false,
                           }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="fixed bottom-0 left-0 w-full z-20 pointer-events-none">
            <div className="max-w-3xl mx-auto p-4 pointer-events-auto">
                {/* Input Row */}
                <div className="flex gap-3 items-end">
                    {/* Text Input */}
                    <div className="flex-1 rounded-2xl border border-white/20 backdrop-blur-md bg-white/5 focus-within:border-orange-400 transition-all">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message the assistant..."
                className="w-full px-4 py-3 bg-transparent resize-none focus:outline-none text-sm text-white placeholder-white/60"
                rows={1}
                disabled={loading || disabled}
            />
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={onSend}
                        disabled={!input.trim() || loading || disabled}
                        className="p-3 rounded-xl backdrop-blur-md bg-orange-500/90 text-white
                       hover:bg-orange-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Send size={20} />
                        )}
                    </button>

                    {/* Mic Button */}
                    <button
                        disabled={loading || disabled}
                        className="p-3 rounded-xl backdrop-blur-md bg-green-500/90 text-white
                       hover:bg-green-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Mic size={20} />
                    </button>
                </div>

                {/* Footer Text */}
                <p className="text-xs text-white/60 text-center mt-3 select-none">
                    {isGuest
                        ? 'Guest mode — conversation history is temporary'
                        : 'AI remembers your conversation history'}
                </p>
            </div>
        </div>
    );
};
