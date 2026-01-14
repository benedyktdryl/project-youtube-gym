import { getUserId } from "@/lib/session.server";
import { HomePage } from "@/pages/home-page";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/dashboard");
  }
  return null;
}

export default function IndexRoute() {
  return <HomePage />;
}
