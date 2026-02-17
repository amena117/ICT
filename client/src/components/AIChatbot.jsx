import React, { useState, useRef, useEffect } from 'react';
import '../styles/AIChatbot.css';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! I\'m your Tech AI Assistant with web search capabilities. Ask me anything about technology, current events, or our ICT services!'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // AbortController for stopping requests
    const abortControllerRef = useRef(null);

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

    // ============ STOP GENERATION ============
    const stopGeneration = () => {
        if (abortControllerRef.current) {
            console.log('🛑 Stopping generation...');
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    };

    // ============ WEB SEARCH FUNCTION ============
    /**
     * Performs a web search using DuckDuckGo HTML endpoint
     * @param {string} query - The search query
     * @returns {Promise<string>} - Formatted search results as text
     */
    const performWebSearch = async (query) => {
        try {
            console.log('🔍 Performing web search for:', query);

            // Use DuckDuckGo HTML endpoint (no API key required)
            const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

            // Fetch search results
            const response = await fetch(searchUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            if (!response.ok) {
                throw new Error(`Search failed: ${response.status}`);
            }

            const html = await response.text();

            // Parse HTML to extract results
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract result items (DuckDuckGo uses class "result")
            const resultElements = doc.querySelectorAll('.result');
            const results = [];

            // Get top 5 results
            for (let i = 0; i < Math.min(5, resultElements.length); i++) {
                const result = resultElements[i];

                // Extract title
                const titleElement = result.querySelector('.result__a');
                const title = titleElement?.textContent?.trim() || 'No title';

                // Extract URL
                const url = titleElement?.href || '';

                // Extract snippet
                const snippetElement = result.querySelector('.result__snippet');
                const snippet = snippetElement?.textContent?.trim() || 'No description';

                results.push({ title, url, snippet });
            }

            // Format results as text for the AI
            if (results.length === 0) {
                return `No search results found for "${query}".`;
            }

            let formattedResults = `Search results for "${query}":\n\n`;
            results.forEach((result, index) => {
                formattedResults += `[${index + 1}] ${result.title}\n`;
                formattedResults += `${result.snippet}\n`;
                formattedResults += `URL: ${result.url}\n\n`;
            });

            console.log('✅ Search completed, found', results.length, 'results');
            return formattedResults;

        } catch (error) {
            console.error('Search error:', error);
            return `Search failed: ${error.message}. Please try rephrasing your question.`;
        }
    };

    // ============ UPDATED SYSTEM PROMPT (prevents recursion) ============
    const systemPrompt = `You are a helpful tech expert from an Ethiopian ICT team. Answer clearly, concisely and professionally about technology, AI, networking, cybersecurity, open-source tools, etc.

IMPORTANT: If a question requires current information, recent news, live data, prices, statistics after 2024, or anything not in your training data, you MUST output exactly:
[SEARCH: your search query here]

Then STOP and wait. You will receive search results, after which you should provide a complete answer citing the sources.

CRITICAL RULES:
- Output [SEARCH: ...] at most ONCE per user question.
- After receiving search results, you MUST give a final synthesized answer — do NOT output [SEARCH: ...] again in that turn.
- Summarize and analyze the search results. Be selective — use only the most relevant information.
- Cite sources briefly in your answer (e.g. [Source 1], [Source 2]).
- If the search results are not helpful or sufficient, say so honestly and give your best answer based on what you know.
- Do NOT search for basic definitions, timeless facts, or simple explanations.

Examples:
- "What is React?" → Answer directly (no search needed)
- "What's the latest AI news?" → Output: [SEARCH: latest AI news 2025]
- "Current Bitcoin price" → Output: [SEARCH: Bitcoin price today]`;

    // ============ MAIN SEND MESSAGE WITH SEARCH DETECTION ============
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

        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();

        try {
            // Start the agent loop
            await agentLoop([...messages, userMessage]);
        } catch (err) {
            // Check if it was aborted by user
            if (err.name === 'AbortError') {
                console.log('⏹️ Generation stopped by user');
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: '⏹️ Generation stopped by user.',
                    isStopped: true
                }]);
            } else {
                console.error('Chat error:', err);
                setError('Cannot connect to local AI – is Ollama running?');

                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: '⚠️ Connection error. Please make sure Ollama is running locally with the gemma3:1b model installed.',
                    isError: true
                }]);
            }
        } finally {
            setIsLoading(false);
            setIsSearching(false);
            abortControllerRef.current = null;
        }
    };

    // ============ AGENT LOOP (handles search detection, prevents recursion) ============
    const agentLoop = async (conversationHistory) => {
        let currentHistory = conversationHistory;
        let maxIterations = 2; // Limit to 2: initial response + final answer after search
        let iteration = 0;
        let searchPerformed = false; // Track if we've already searched in this turn

        while (iteration < maxIterations) {
            iteration++;

            // Prepare messages for API (add system prompt, exclude initial greeting)
            const apiMessages = [
                {
                    role: 'system',
                    content: systemPrompt
                },
                ...currentHistory.filter(msg =>
                    msg.role !== 'assistant' || msg.content !== messages[0].content
                )
            ];

            // Call Ollama API WITHOUT tools (for compatibility with gemma3:1b)
            const response = await fetch('http://localhost:11434/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gemma3:1b',
                    messages: apiMessages,
                    temperature: 0.7,
                    max_tokens: 600,
                    stream: true
                }),
                signal: abortControllerRef.current?.signal // Allow aborting
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            // Read streaming response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';

            // Add placeholder for AI response
            const aiMessageIndex = currentHistory.length;
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '',
                isStreaming: true
            }]);

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const jsonStr = line.substring(6).trim();
                            if (jsonStr === '[DONE]') continue;

                            try {
                                const data = JSON.parse(jsonStr);
                                const delta = data.choices?.[0]?.delta;

                                // Check for regular content
                                if (delta?.content) {
                                    accumulatedContent += delta.content;

                                    // Update message in real-time
                                    setMessages(prev => {
                                        const newMessages = [...prev];
                                        newMessages[aiMessageIndex] = {
                                            role: 'assistant',
                                            content: accumulatedContent,
                                            isStreaming: true
                                        };
                                        return newMessages;
                                    });

                                    setTimeout(() => scrollToBottom(), 0);
                                }

                            } catch (parseErr) {
                                console.warn('Failed to parse SSE chunk:', parseErr);
                            }
                        }
                    }
                }
            } catch (readError) {
                // If aborted during streaming, re-throw
                if (readError.name === 'AbortError') {
                    throw readError;
                }
                console.error('Stream read error:', readError);
            }

            // ============ PREVENT RECURSION: Only search once per turn ============
            // Check if the response contains a search request AND we haven't searched yet
            const searchMatch = accumulatedContent.match(/\[SEARCH:\s*(.+?)\]/i);

            if (searchMatch && !searchPerformed) {
                const searchQuery = searchMatch[1].trim();
                console.log('🔧 Search detected in response:', searchQuery);

                // Mark that we've performed a search in this turn
                searchPerformed = true;

                // Show searching indicator
                setIsSearching(true);
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[aiMessageIndex] = {
                        role: 'assistant',
                        content: '🔍 Searching the web...',
                        isSearching: true
                    };
                    return newMessages;
                });

                try {
                    const searchResults = await performWebSearch(searchQuery);

                    // Add search results to conversation history
                    // IMPORTANT: This forces the model to give a final answer in the next iteration
                    const searchMessage = {
                        role: 'user',
                        content: `Here are the search results for "${searchQuery}":\n\n${searchResults}\n\nIMPORTANT: Now provide a complete, final answer based on these results. Cite your sources. Do NOT search again.`
                    };

                    currentHistory = [...currentHistory, searchMessage];

                    // Continue loop to get final answer with search results
                    setIsSearching(false);
                    continue;

                } catch (error) {
                    console.error('Search execution error:', error);
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[aiMessageIndex] = {
                            role: 'assistant',
                            content: `Search failed: ${error.message}. I'll try to answer based on my training data instead.`,
                            isError: true
                        };
                        return newMessages;
                    });
                    break;
                }
            } else if (searchMatch && searchPerformed) {
                // Model tried to search again - prevent it!
                console.warn('⚠️ Model attempted recursive search - prevented!');
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[aiMessageIndex] = {
                        role: 'assistant',
                        content: accumulatedContent.replace(/\[SEARCH:\s*(.+?)\]/gi, '').trim() || 'I apologize, but I cannot perform another search. Let me answer based on the information I have.',
                        isStreaming: false
                    };
                    return newMessages;
                });
                break;
            } else {
                // No search needed - this is the final answer
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[aiMessageIndex] = {
                        role: 'assistant',
                        content: accumulatedContent,
                        isStreaming: false
                    };
                    return newMessages;
                });
                break; // Exit loop
            }
        }

        // If we hit max iterations, force stop
        if (iteration >= maxIterations) {
            console.warn('⚠️ Max iterations reached - stopping to prevent infinite loop');
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
                                <p>Powered by Gemma 3 1B + Web Search</p>
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
                                className={`message ${msg.role} ${msg.isError ? 'error' : ''} ${msg.isStreaming ? 'streaming' : ''} ${msg.isSearching ? 'searching' : ''} ${msg.isStopped ? 'stopped' : ''}`}
                            >
                                <div className="message-content">
                                    <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                                    {msg.isStreaming && <span className="streaming-cursor">▊</span>}
                                </div>
                            </div>
                        ))}
                        {isLoading && !isSearching && (
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
                            placeholder="Ask me anything - I can search the web!"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />

                        {/* Stop Button - shown only during processing */}
                        {isLoading && (
                            <button
                                className="chatbot-stop"
                                onClick={stopGeneration}
                                aria-label="Stop generation"
                                title="Stop generation"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="6" width="12" height="12" rx="2"></rect>
                                </svg>
                            </button>
                        )}

                        {/* Send Button - shown when not processing */}
                        {!isLoading && (
                            <button
                                className="chatbot-send"
                                onClick={sendMessage}
                                disabled={!inputValue.trim()}
                                aria-label="Send message"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Footer Disclaimer */}
                    <div className="chatbot-footer">
                        <small>AI with web search - verify important information independently.</small>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatbot;
