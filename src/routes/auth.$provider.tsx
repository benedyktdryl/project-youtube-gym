import { startOAuthFlow } from "@/lib/oauth.server";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request, params }: LoaderFunctionArgs) {
  return startOAuthFlow(request, params.provider);
}
