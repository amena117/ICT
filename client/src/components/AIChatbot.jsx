import React, { useState, useRef, useEffect } from 'react';
import '../styles/AIChatbot.css';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! I\'m your Tech AI Assistant. Ask me anything about technology, AI, networking, cybersecurity, or our ICT services!'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setError(null);
    };

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputValue.trim()
        };

        // Add user message to chat
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        // Add placeholder for AI message that will be streamed
        const aiMessageIndex = messages.length + 1; // +1 because we just added user message
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: '',
            isStreaming: true
        }]);

        try {
            // Prepare conversation history for API
            const conversationHistory = [
                {
                    role: 'system',
                    content: 'You are a helpful tech expert from an Ethiopian ICT team. Answer clearly, concisely, and professionally about technology, AI, networking, cybersecurity, software development, and related topics. Keep responses informative but brief.'
                },
                ...messages.filter(msg => msg.role !== 'assistant' || msg.content !== messages[0].content),
                userMessage
            ];

            const response = await fetch('http://localhost:11434/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gemma3:1b',
                    messages: conversationHistory,
                    temperature: 0.7,
                    max_tokens: 600,
                    stream: true // Enable streaming
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            // Read the response body as a stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                // Decode the chunk
                const chunk = decoder.decode(value, { stream: true });

                // Split by newlines to handle multiple SSE messages
                const lines = chunk.split('\n');

                for (const line of lines) {
                    // SSE format: "data: {...}"
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.substring(6).trim();

                        // Skip [DONE] marker
                        if (jsonStr === '[DONE]') continue;

                        try {
                            const data = JSON.parse(jsonStr);

                            // Extract delta content from the chunk
                            const deltaContent = data.choices?.[0]?.delta?.content;

                            if (deltaContent) {
                                accumulatedContent += deltaContent;

                                // Update the AI message incrementally
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    newMessages[aiMessageIndex] = {
                                        role: 'assistant',
                                        content: accumulatedContent,
                                        isStreaming: true
                                    };
                                    return newMessages;
                                });

                                // Auto-scroll to bottom after each chunk
                                setTimeout(() => scrollToBottom(), 0);
                            }
                        } catch (parseErr) {
                            // Skip malformed JSON chunks
                            console.warn('Failed to parse SSE chunk:', parseErr);
                        }
                    }
                }
            }

            // Mark streaming as complete
            setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages[aiMessageIndex]) {
                    newMessages[aiMessageIndex].isStreaming = false;
                }
                return newMessages;
            });

        } catch (err) {
            console.error('Chat error:', err);
            setError('Cannot connect to local AI – is Ollama running? Please ensure Ollama is started with the gemma3:1b model.');

            // Replace the streaming message with error
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[aiMessageIndex] = {
                    role: 'assistant',
                    content: '⚠️ Connection error. Please make sure Ollama is running locally with the gemma3:1b model installed.',
                    isError: true
                };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Simple markdown-like formatting
    const formatMessage = (text) => {
        if (!text) return '';

        // Bold: **text** or __text__
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/__(.*?)__/g, '<strong>$1</strong>');

        // Italic: *text* or _text_
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/_(.*?)_/g, '<em>$1</em>');

        // Code: `text`
        formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');

        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className={`chatbot-button ${isOpen ? 'active' : ''}`}
                onClick={toggleChat}
                aria-label="Toggle AI Chat"
                title="Chat with AI Assistant"
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-content">
                            <div className="chatbot-header-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <div>
                                <h3>Tech AI Assistant</h3>
                                <p>Powered by local Gemma 3 1B</p>
                            </div>
                        </div>
                        <button
                            className="chatbot-close"
                            onClick={toggleChat}
                            aria-label="Close chat"
                        >
                            ×
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.role} ${msg.isError ? 'error' : ''} ${msg.isStreaming ? 'streaming' : ''}`}
                            >
                                <div className="message-content">
                                    <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                                    {msg.isStreaming && <span className="streaming-cursor">▊</span>}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message assistant">
                                <div className="message-content loading">
                                    <span className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                    Thinking...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="chatbot-input-area">
                        <input
                            ref={inputRef}
                            type="text"
                            className="chatbot-input"
                            placeholder="Ask me anything about tech..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button
                            className="chatbot-send"
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            aria-label="Send message"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>

                    {/* Footer Disclaimer */}
                    <div className="chatbot-footer">
                        <small>Local AI demo – answers for educational purposes only.</small>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatbot;
