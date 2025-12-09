import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  Loader2, 
  Bot, 
  Dumbbell 
} from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { MOCK_CHAT_MESSAGES, MOCK_USER } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { CHAT_SUGGESTIONS } from '@/lib/constants';
import { toast } from 'sonner';

export function ChatInterface() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Create a new user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    // Add the user message to the chat
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock assistant response based on user input
      let responseContent = '';

      if (input.toLowerCase().includes('plan') || input.toLowerCase().includes('workout')) {
        responseContent = "Based on your fitness goals and preferences, I've created a personalized workout plan for you. You can view it in the Calendar section. Would you like me to explain the plan or make any adjustments?";
        toast.success("Workout plan created! View it in the Calendar tab.");
      } else if (input.toLowerCase().includes('equipment')) {
        responseContent = "Great! I've updated your equipment preferences. This will help me recommend more suitable workouts for you. Is there anything else you'd like to adjust?";
      } else if (input.toLowerCase().includes('goal')) {
        responseContent = "I understand your fitness goals now. I'll tailor your workout recommendations accordingly. Would you like me to suggest some workout videos that align with these goals?";
      } else {
        responseContent = "Thank you for sharing that information. Is there anything specific about your workout routine you'd like help with today?";
      }

      // Create assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      // Add the assistant message to the chat
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)]">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/bot-avatar.png\" alt="AI Assistant" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage src={user?.avatarUrl || MOCK_USER.avatarUrl} alt={user?.name || 'User'} />
                  <AvatarFallback>{(user?.name || 'U')[0]}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="px-4 py-3 rounded-lg bg-muted flex items-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Dumbbell className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">TrainFlow Assistant</h3>
            <p className="text-center text-muted-foreground mb-6 max-w-md">
              I'll help you create a personalized workout plan based on your goals, available equipment, and schedule.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {CHAT_SUGGESTIONS.map((suggestion) => (
                <Button 
                  key={suggestion} 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-10 resize-none"
              rows={1}
            />
            <Button 
              size="icon" 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}