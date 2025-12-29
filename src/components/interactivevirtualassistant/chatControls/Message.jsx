export const Message = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex gap-4 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    AI
                </div>
            )}
            <div
                className={`px-4 py-3 rounded-2xl max-w-2xl ${
                    isUser
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-white border border-gray-200 text-gray-800'
                }`}
            >
                <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-lg bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm flex-shrink-0">
                    U
                </div>
            )}
        </div>
    );
};