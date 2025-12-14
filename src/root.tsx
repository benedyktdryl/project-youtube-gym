import './index.css';
import './App.css';

import type { LoaderFunctionArgs } from 'react-router';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from 'react-router';
import { Layout } from '@/components/layout/layout';
import { ThemeProvider } from '@/lib/theme-provider';
import type { SessionUser } from '@/lib/session.server';
import { getUser } from '@/lib/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  return { user };
}

export default function Root() {
  useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider defaultTheme="system" storageKey="trainflow-theme">
          <Layout />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = 'Something went wrong';
  let description = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    title = error.statusText || title;
    description = error.data || description;
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="max-w-lg space-y-4 text-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{String(description)}</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export type RootLoaderData = {
  user: SessionUser | null;
};
