import type { RootLoaderData } from "@/root";
import { useRouteLoaderData } from "react-router";

export function useSession() {
  const data = useRouteLoaderData("root") as RootLoaderData | undefined;
  return {
    user: data?.user ?? null,
    isAuthenticated: Boolean(data?.user),
  };
}
