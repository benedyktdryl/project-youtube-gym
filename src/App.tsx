import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/lib/theme-provider';
import { useAuth } from '@/lib/auth-context';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

// Create router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { 
        path: 'dashboard', 
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute> 
      },
      { 
        path: 'chat', 
        element: <ProtectedRoute><ChatPage /></ProtectedRoute> 
      },
      { 
        path: 'calendar', 
        element: <ProtectedRoute><CalendarPage /></ProtectedRoute> 
      },
      { 
        path: 'videos', 
        element: <ProtectedRoute><VideosPage /></ProtectedRoute> 
      },
      { 
        path: 'videos/:id', 
        element: <ProtectedRoute><VideoDetailPage /></ProtectedRoute> 
      },
      { 
        path: 'profile', 
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute> 
      },
      { 
        path: 'settings', 
        element: <ProtectedRoute><SettingsPage /></ProtectedRoute> 
      },
    ],
  },
]);

function App() {
  // Update document title
  useEffect(() => {
    document.title = 'TrainFlow - YouTube Workout Planner';
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="trainflow-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;