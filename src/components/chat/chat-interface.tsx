import { useEffect, useMemo, useRef, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Dumbbell, Loader2, Send } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { useSession } from '@/lib/use-session';
import { CHAT_SUGGESTIONS } from '@/lib/constants';
import { toast } from 'sonner';

type ChatLoaderData = {
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
  }>;
};

export function ChatInterface() {
  const { user } = useSession();
  const { messages: initialMessages } = useLoaderData<ChatLoaderData>();
  const fetcher = useFetcher<{ messages?: ChatLoaderData['messages']; error?: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    initialMessages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      timestamp: new Date(message.createdAt),
    }))
  );
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(
      initialMessages.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
        timestamp: new Date(message.createdAt),
      }))
    );
  }, [initialMessages]);

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.messages) {
      setMessages((prev) => [
        ...prev,
        ...fetcher.data.messages.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          timestamp: new Date(message.createdAt),
        })),
      ]);
      setInput('');
    }

    if (fetcher.state === 'idle' && fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isSubmitting = fetcher.state !== 'idle';

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const formData = new FormData();
    formData.append('message', input.trim());
    fetcher.submit(formData, { method: 'post', action: '/chat' });
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

  const displayMessages = useMemo(
    () =>
      messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
    [messages]
  );

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)]">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {displayMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
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
                  <AvatarImage src={user?.avatarUrl || undefined} alt={user?.name || 'User'} />
                  <AvatarFallback>{(user?.name || 'U')[0]}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isSubmitting && (
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
              disabled={isSubmitting}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || isSubmitting}
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
