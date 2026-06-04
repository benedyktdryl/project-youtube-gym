import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("auth/:provider", "routes/auth.$provider.tsx"),
  route("auth/callback/:provider", "routes/auth.callback.$provider.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("chat", "routes/chat.tsx"),
  route("calendar", "routes/calendar.tsx"),
  route("videos", "routes/videos.tsx"),
  route("videos/:id", "routes/videos.$id.tsx"),
  route("tools/bmi", "routes/tools.bmi.tsx"),
  route("tools/kalorie", "routes/tools.kalorie.tsx"),
  route("tools/strefy-tetna", "routes/tools.strefy-tetna.tsx"),
  route("ingestion", "routes/ingestion.tsx"),
  route("profile", "routes/profile.tsx"),
  route("settings", "routes/settings.tsx"),
  route("logout", "routes/logout.tsx"),
];
