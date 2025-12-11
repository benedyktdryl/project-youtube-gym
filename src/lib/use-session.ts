import { useRouteLoaderData } from 'react-router-dom';

type SessionUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
};

export function useSession() {
  const data = useRouteLoaderData('root') as { user: SessionUser | null } | undefined;
  return {
    user: data?.user ?? null,
    isAuthenticated: Boolean(data?.user),
  };
}
