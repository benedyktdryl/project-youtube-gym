import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import { Layout } from '@/components/layout/layout';
import { HomePage } from '@/pages/home-page';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';
import { DashboardPage } from '@/pages/dashboard-page';
import { ChatPage } from '@/pages/chat-page';
import { CalendarPage } from '@/pages/calendar-page';
import { VideosPage } from '@/pages/videos-page';
import { VideoDetailPage } from '@/pages/video-detail-page';
import { ProfilePage } from '@/pages/profile-page';
import { SettingsPage } from '@/pages/settings-page';
import { ThemeProvider } from '@/lib/theme-provider';
import { apiFetch, setToken, getToken } from '@/lib/api-client';
import { useEffect } from 'react';
import type { WorkoutVideo, UserPreferences } from '@/lib/types';

type SessionUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
};

type RootLoaderData = {
  user: SessionUser | null;
};

async function sessionLoader(): Promise<RootLoaderData> {
  try {
    const data = await apiFetch<{ user: SessionUser }>('/auth/session');
    return { user: data.user };
  } catch (err) {
    if ((err as any)?.status === 401) {
      return { user: null };
    }
    throw err;
  }
}

async function requireUser() {
  const token = getToken();
  if (!token) throw redirect('/login');
  const data = await apiFetch<{ user: SessionUser }>('/auth/session');
  return data.user;
}

async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    const err: any = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const data = await apiFetch<{ user: SessionUser; token: string }>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );

  setToken(data.token);
  return redirect('/dashboard');
}

async function registerAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const name = String(formData.get('name') || '');

  if (!email || !password || !name) {
    const err: any = new Error('Name, email, and password are required');
    err.status = 400;
    throw err;
  }

  const data = await apiFetch<{ user: SessionUser; token: string }>(
    '/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }
  );

  setToken(data.token);
  return redirect('/dashboard');
}

async function logoutAction() {
  await apiFetch('/auth/logout', { method: 'POST' });
  setToken(null);
  return redirect('/login');
}

async function videosLoader() {
  await requireUser();
  const data = await apiFetch<{ videos: WorkoutVideo[] }>('/videos');
  return data.videos;
}

async function videoDetailLoader({ params }: { params: { id?: string } }) {
  await requireUser();
  if (!params.id) throw redirect('/videos');
  const data = await apiFetch<{ video: WorkoutVideo }>(`/videos/${params.id}`);
  return data.video;
}

async function preferencesLoader() {
  const user = await requireUser();
  const data = await apiFetch<{ preferences: UserPreferences | null }>(
    '/preferences'
  );
  return { user, preferences: data.preferences };
}

async function updatePreferencesAction({ request }: { request: Request }) {
  await requireUser();
  const formData = await request.formData();
  const payload = {
    goal: formData.get('goal') as string | null,
    preferredDuration: Number(formData.get('preferredDuration') || 0),
    preferredIntensity: formData.get('preferredIntensity') as string | null,
    availableEquipment: (formData.getAll('availableEquipment') as string[]) ?? [],
    preferredDays: (formData.getAll('preferredDays') as string[]) ?? [],
  };

  await apiFetch('/preferences', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return redirect('/settings');
}

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: sessionLoader,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage />, action: loginAction },
      { path: 'register', element: <RegisterPage />, action: registerAction },
      { path: 'dashboard', element: <DashboardPage />, loader: requireUser },
      { path: 'chat', element: <ChatPage />, loader: requireUser },
      { path: 'calendar', element: <CalendarPage />, loader: requireUser },
      { path: 'videos', element: <VideosPage />, loader: videosLoader },
      {
        path: 'videos/:id',
        element: <VideoDetailPage />,
        loader: videoDetailLoader,
      },
      { path: 'profile', element: <ProfilePage />, loader: requireUser },
      {
        path: 'settings',
        element: <SettingsPage />,
        loader: preferencesLoader,
        action: updatePreferencesAction,
      },
      { path: 'logout', action: logoutAction },
    ],
  },
]);

function App() {
  useEffect(() => {
    document.title = 'TrainFlow - YouTube Workout Planner';
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="trainflow-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
