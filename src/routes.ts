import { index, route } from '@react-router/dev/routes';

export default [
  index('routes/_index.tsx'),
  route('login', 'routes/login.tsx'),
  route('register', 'routes/register.tsx'),
  route('dashboard', 'routes/dashboard.tsx'),
  route('chat', 'routes/chat.tsx'),
  route('calendar', 'routes/calendar.tsx'),
  route('videos', 'routes/videos.tsx'),
  route('videos/:id', 'routes/videos.$id.tsx'),
  route('profile', 'routes/profile.tsx'),
  route('settings', 'routes/settings.tsx'),
  route('logout', 'routes/logout.tsx'),
];
