import { useRouteLoaderData } from 'react-router';
import type { RootLoaderData } from '@/root';

export function useSession() {
  const data = useRouteLoaderData('root') as RootLoaderData | undefined;
  return {
    user: data?.user ?? null,
    isAuthenticated: Boolean(data?.user),
  };
}
