import { useNavigate } from 'react-router-dom';

export const Header = ({ user, clearChat, isGuest = false }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="fixed top-6 left-0 w-full z-20 px-6 py-4 flex items-center justify-between doto-font">
            <h1 className="text-3xl font-semibold text-gray-800">
                {isGuest ? "Interactive Virtual Assistant (Guest)" : "Interactive Virtual Assistant"}
            </h1>
            <div className="flex items-center gap-3">
                <span className="text-lg text-gray-800">
                    {isGuest ? "Welcome, Guest" : `Welcome, ${user.username}`}
                </span>
                {isGuest ? null :
                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Logout
                    </button>}

                <button
                    onClick={clearChat}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Clear Chat
                </button>
            </div>
        </div>
    );
};