import { ChatInterface } from '@/components/chat/chat-interface';

export function ChatPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Assistant</h1>
      </div>
      
      <p className="text-muted-foreground">
        Tell our AI assistant about your fitness goals, available equipment, and schedule. We'll create a personalized workout plan for you.
      </p>
      
      <ChatInterface />
    </div>
  );
}