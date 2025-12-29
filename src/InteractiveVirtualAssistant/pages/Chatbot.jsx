import { useEffect, useState, useRef } from 'react';

import { Header } from '../../components/interactivevirtualassistant/chatControls/Header.jsx';
import { MessageList } from '../../components/interactivevirtualassistant/chatControls/MessageList.jsx';
import { MessageBox } from '../../components/interactivevirtualassistant/chatControls/MessageBox.jsx';

import VideoControls from "../../components/interactivevirtualassistant/videoControls/VideoControls.jsx";
import TTSControls from "../../components/interactivevirtualassistant/audioControls/TTSControls.jsx";

import {Scene} from "../../components/interactivevirtualassistant/scene/Scene.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Client } from '@stomp/stompjs';



export default function Chatbot() {
    const location = useLocation();
    const navigate = useNavigate();

    // State variables
    const [user, setUser] = useState(null);

    // Message and response states
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [audio, setAudio] = useState(null);
    const [expression, setExpression] = useState([]);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [connected, setConnected] = useState(false);

    const stompClientRef = useRef(null);

    /**
     * Connect to WebSocket server using native WebSocket
     */
    const connectWebSocket = (userId) => {
        console.log('Connecting to WebSocket for user:', userId);

        // Create STOMP client with native WebSocket
        const client = new Client({
            // Use native WebSocket
            brokerURL: 'ws://localhost:8080/websocket',

            // Reconnect settings
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            // Connection callbacks
            onConnect: (frame) => {

                console.log('Connected to WebSocket:', frame);
                setConnected(true);

                // Subscribe to messages
                console.log('Subscribing to /user/queue/messages');
                client.subscribe(`/user/${userId}/queue/messages`, (message) => {
                    console.log('📨 Raw message received on /user/queue/messages:', message);
                    const response = JSON.parse(message.body);
                    handleWebSocketMessage(response);
                });

                // Subscribe to chat history
                console.log('Subscribing to /user/queue/history');
                client.subscribe(`/user/${userId}/queue/history`, (message) => {
                    console.log('Raw history received on /user/queue/history:', message);
                    const history = JSON.parse(message.body);
                    loadChatHistoryFromWebSocket(history);
                });

                // Request chat history
                console.log('Requesting chat history for user:', userId);
                client.publish({
                    destination: '/app/chat/history',
                    body: JSON.stringify({ userId: userId })
                });
                console.log('History request sent');
            },

            onStompError: (frame) => {
                console.error('STOMP error:', frame);
                setConnected(false);
            },

            onWebSocketClose: () => {
                console.log('WebSocket connection closed');
                setConnected(false);
            },

            onWebSocketError: (event) => {
                console.error('WebSocket error:', event);
            },
        });

        client.activate();
        stompClientRef.current = client;
    };

    const disconnectWebSocket = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
            setConnected(false);
            console.log('Disconnected from WebSocket');
        }
    };

    const handleWebSocketMessage = (response) => {
        console.log('Received WebSocket message:', response);

        switch (response.type) {
            // Message received acknowledgment
            case 'received':
                console.log('✓ Message received by server');
                break;
            // New AI response
            case 'response':
                setLoading(false);
                const aiMessage = {
                    id: `${response.chatId}-assistant`,
                    role: 'assistant',
                    content: response.response,
                    expression: response.expressionValues,
                };

                console.log("Expression JSON Values are: " + response.expressionValues);

                // Set response and audio states
                setResponse(response.response);
                setMessages(prev => [...prev, aiMessage]);

                // Set audio bytes to trigger playback
                if (response.audioData && response.audioData.length > 0) {
                    console.log('Audio data received, size:', response.audioData.length);
                    setAudio(response.audioData);
                } else {
                    console.log('No audio data in response');
                }


                break;

            case 'error':
                console.error('Server error:', response.message);
                setLoading(false);
                setMessages(prev => [...prev, {
                    id: `error-${Date.now()}`,
                    role: 'assistant',
                    content: `Error: ${response.message}`
                }]);
                break;

            case 'deleted':
                console.log('Chat deleted:', response.chatId);
                setMessages(prev => prev.filter(msg =>
                    !msg.id.startsWith(`${response.chatId}-`)
                ));
                break;
        }
    };

    // Load chat history from WebSocket
    const loadChatHistoryFromWebSocket = (chatHistory) => {
        console.log('Loading chat history:', chatHistory.length, 'chats');

        const formattedChatHistory = chatHistory.toReversed().flatMap(chat => [
            {
                id: `${chat.id}-user`, // Unique ID for user message
                role: 'user', // User role
                content: chat.message,
            },
            {
                id: `${chat.id}-assistant`,
                role: 'assistant',
                content: chat.response,
            }
        ]);

        setMessages(formattedChatHistory);
    };

    // Handle sending user message
    const handleSend = () => {
        // Prevent sending empty messages or if user not set
        if (!input.trim() || !user || loading || !connected) {
            if (!connected) {
                console.warn('Cannot send: WebSocket not connected');
            }
            return;
        }

        // Prepare user message
        const userMessage = input.trim();

        // Optimistically add user message to chat
        const tempUserMessage = {
            id: `temp-user-${Date.now()}`,
            role: 'user',
            content: userMessage,
        };

        // Update states
        setMessages((prevMessages) => [...prevMessages, tempUserMessage]);
        setInput('');
        setLoading(true);

        try {
            // Get STOMP client
            const client = stompClientRef.current;

            // Publish message to server
            client.publish({
                destination: '/app/chat',
                body: JSON.stringify({
                    userId: user.id,
                    message: userMessage
                })
            });

            console.log('Message sent via WebSocket:', userMessage);

        } catch (error) {
            console.error('Error sending message:', error);
            setLoading(false);

            setMessages(prev => [...prev, {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: 'Sorry, I encountered an error sending your message. Please try again.'
            }]);
        }
    };

    // Clear chat history
    const handleClearChat = () => {
        setMessages([]);
        setResponse('');
        setAudio(null);
        console.log('Chat history cleared');
    };

    useEffect(() => {
        if (location.state?.user) {
            // Set user from navigation state
            const currentUser = location.state.user;
            setUser(currentUser);
            connectWebSocket(currentUser.id);
            console.log('User from navigation:', currentUser.username);
        } else {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                // Parse and set user from localStorage
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                connectWebSocket(parsedUser.id);
                console.log('User from localStorage:', parsedUser.username);
            } else {
                // No user found, redirect to login page
                console.log('No user found, redirecting to login');
                navigate('/login');
            }
        }

        return () => {
            disconnectWebSocket();
        };
    }, [location, navigate]);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">

            {!connected && (
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-center text-sm">
                     Reconnecting to server...
                </div>
            )}

            <Header user={user} clearChat={handleClearChat} isGuest={false} />

            {/* Three.js Scene - Takes all available space */}
            <div className="flex-1 relative overflow-hidden">
                <Scene />
            </div>
            <MessageList messages={messages} loading={loading} />
            <MessageBox
                input={input}
                setInput={setInput}
                onSend={handleSend}
                loading={loading}
                disabled={!connected}
            />
            {/* Audio player - plays automatically when audioBytes change */}
            <TTSControls audioData={audio} autoPlay={true} />
        </div>
    );
}