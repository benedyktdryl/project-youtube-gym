import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { prisma } from '@/lib/prisma.server';
import { requireUserId } from '@/lib/session.server';
import { ChatPage } from '@/pages/chat-page';

type ChatMessagePayload = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);

  const messages = await prisma.chatMessage.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  });

  const mapped: ChatMessagePayload[] = messages.map((message) => ({
    id: message.id,
    role: message.role,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
  }));

  return { messages: mapped };
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const content = String(formData.get('message') ?? '').trim();

  if (!content) {
    return Response.json({ error: 'Message content is required' }, { status: 400 });
  }

  const userMessage = await prisma.chatMessage.create({
    data: {
      userId,
      role: 'user',
      content,
    },
  });

  const assistantMessage = await prisma.chatMessage.create({
    data: {
      userId,
      role: 'assistant',
      content:
        'I logged your update. Want me to adjust your plan or schedule a new session?',
    },
  });

  const payload: ChatMessagePayload[] = [
    {
      id: userMessage.id,
      role: userMessage.role,
      content: userMessage.content,
      createdAt: userMessage.createdAt.toISOString(),
    },
    {
      id: assistantMessage.id,
      role: assistantMessage.role,
      content: assistantMessage.content,
      createdAt: assistantMessage.createdAt.toISOString(),
    },
  ];

  return Response.json({ messages: payload });
}

export default ChatPage;
