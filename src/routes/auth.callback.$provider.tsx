import { handleOAuthCallback } from "@/lib/oauth.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  return handleOAuthCallback(request, params.provider, searchParams);
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  return handleOAuthCallback(request, params.provider, formData);
}
