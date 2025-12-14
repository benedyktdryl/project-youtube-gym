import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { destroyUserSession } from '@/lib/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return destroyUserSession(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return destroyUserSession(request);
}
