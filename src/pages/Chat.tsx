import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Code, Lightbulb, Loader, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sensayApi, SensayMessage } from '../services/sensayApi';
import { toast } from 'sonner';
import CodeAnalyzer from '../components/CodeAnalyzer';

const Chat = () => {
  const [messages, setMessages] = useState<SensayMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm CodeSensei, your AI coding tutor. I can help you learn programming, solve coding challenges, understand concepts, and analyze your code. What would you like to learn today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'analyzer'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: SensayMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sensayApi.sendMessage(userMessage.content);
      
      const assistantMessage: SensayMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    let prompt = '';
    switch (action) {
      case 'challenge':
        prompt = 'Give me a coding challenge suitable for my level';
        break;
      case 'concept':
        prompt = 'Explain a fundamental programming concept';
        break;
      case 'help':
        prompt = 'What programming topics can you help me with?';
        break;
      case 'analyzer':
        setActiveTab('analyzer');
        return;
    }
    
    setInput(prompt);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCodeAnalysis = async (code: string) => {
    try {
      const analysis = await sensayApi.analyzeCode(code);
      
      // Add analysis result as a message
      const analysisMessage: SensayMessage = {
        role: 'assistant',
        content: `## Code Analysis Results

**Language:** ${analysis.language}
**Complexity:** ${analysis.complexity}

**Explanation:**
${analysis.explanation}

**Strengths:**
${analysis.strengths.map(s => `• ${s}`).join('\n')}

**Suggested Improvements:**
${analysis.improvements.map(i => `• ${i}`).join('\n')}

${analysis.bugs.length > 0 ? `**Potential Issues:**\n${analysis.bugs.map(b => `• ${b}`).join('\n')}` : ''}

**Line Annotations:**
${analysis.annotations.map(a => `Line ${a.line} (${a.type}): ${a.message}`).join('\n')}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, analysisMessage]);
      setActiveTab('chat');
      return analysis;
    } catch (error) {
      console.error('Error analyzing code:', error);
      toast.error('Failed to analyze code. Please try again.');
      throw error;
    }
  };

  const TypewriterMessage = ({ content }: { content: string }) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < content.length) {
        const timer = setTimeout(() => {
          setDisplayedContent(prev => prev + content[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 30);
        return () => clearTimeout(timer);
      }
    }, [currentIndex, content]);

    return (
      <div className="whitespace-pre-wrap">
        {displayedContent}
        {currentIndex < content.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-cyan-400 ml-1"
          />
        )}
      </div>
    );
  };

  return (
    <div className="pt-16 h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col max-w-6xl mx-auto w-full"
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Coding Tutor
          </h1>
          <p className="text-gray-400 mt-1">Chat, analyze code, get challenges, or discuss programming concepts</p>
          
          {/* Tab Navigation */}
          <div className="flex space-x-4 mt-4">
            <Button
              variant={activeTab === 'chat' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('chat')}
              className={activeTab === 'chat' 
                ? "bg-gradient-to-r from-cyan-500 to-purple-500" 
                : "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
              }
            >
              Chat
            </Button>
            <Button
              variant={activeTab === 'analyzer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('analyzer')}
              className={activeTab === 'analyzer' 
                ? "bg-gradient-to-r from-cyan-500 to-purple-500" 
                : "border-purple-400/50 text-purple-400 hover:bg-purple-400/10"
              }
            >
              <FileCode className="h-4 w-4 mr-2" />
              Code Analyzer
            </Button>
          </div>
        </div>

        {activeTab === 'chat' && (
          <>
            {/* Quick Actions */}
            <div className="p-4 bg-black/10 backdrop-blur-sm border-b border-purple-500/20">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('challenge')}
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Get Challenge
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('concept')}
                  className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Learn Concept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('analyzer')}
                  className="border-green-400/50 text-green-400 hover:bg-green-400/10"
                >
                  <FileCode className="h-4 w-4 mr-2" />
                  Analyze Code
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white ml-4'
                          : 'bg-white/10 backdrop-blur-sm border border-purple-500/20 text-gray-100 mr-4'
                      }`}
                    >
                      {message.role === 'assistant' && index === messages.length - 1 && isLoading ? (
                        <TypewriterMessage content={message.content} />
                      ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      )}
                      <div className={`text-xs mt-2 opacity-70 ${
                        message.role === 'user' ? 'text-gray-200' : 'text-gray-400'
                      }`}>
                        {message.timestamp?.toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 p-4 rounded-2xl mr-4">
                    <div className="flex items-center space-x-2">
                      <Loader className="h-4 w-4 animate-spin text-cyan-400" />
                      <span className="text-gray-300">CodeSensei is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSendMessage}
              className="p-6 border-t border-purple-500/20 bg-black/20 backdrop-blur-sm"
            >
              <div className="flex space-x-4">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about programming, request a challenge, or get help with code..."
                  className="flex-1 bg-white/10 border-purple-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                  disabled={isLoading}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.form>
          </>
        )}

        {activeTab === 'analyzer' && (
          <div className="flex-1 overflow-y-auto p-6">
            <CodeAnalyzer onAnalyze={handleCodeAnalysis} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Chat;
