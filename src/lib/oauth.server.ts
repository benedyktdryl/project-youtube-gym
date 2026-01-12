import { randomBytes } from "node:crypto";

import { prisma } from "@/lib/prisma.server";
import { commitSession, getSession, setUserSession } from "@/lib/session.server";
import { SignJWT, createRemoteJWKSet, importPKCS8, jwtVerify } from "jose";
import { redirect } from "react-router";

type OAuthProvider = "google" | "apple";

type OAuthProfile = {
  providerUserId: string;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
};

const OAUTH_STATE_KEY = "oauth_state";
const OAUTH_NONCE_KEY = "oauth_nonce";
const OAUTH_REDIRECT_KEY = "oauth_redirect";

const GOOGLE_ISSUER = "https://accounts.google.com";
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";

const APPLE_ISSUER = "https://appleid.apple.com";
const APPLE_AUTH_URL = "https://appleid.apple.com/auth/authorize";
const APPLE_TOKEN_URL = "https://appleid.apple.com/auth/token";
const APPLE_JWKS_URL = "https://appleid.apple.com/auth/keys";

function isOAuthMockEnabled() {
  return process.env.OAUTH_MOCK === "true" || process.env.NODE_ENV === "test";
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for OAuth.`);
  }
  return value;
}

function parseProvider(provider: string | undefined): OAuthProvider {
  if (provider === "google" || provider === "apple") {
    return provider;
  }
  throw new Response("Not found", { status: 404 });
}

function getOrigin(request: Request) {
  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");

  if (!host) {
    return url.origin;
  }

  const protocol = forwardedProto ?? url.protocol.replace(":", "");
  return `${protocol}://${host}`;
}

function safeRedirectPath(value: string | null) {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return null;
}

function getParam(params: URLSearchParams | FormData, key: string) {
  if (params instanceof URLSearchParams) {
    return params.get(key);
  }
  const value = params.get(key);
  return typeof value === "string" ? value : null;
}

function normalizeName(value: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function fallbackNameFromEmail(email: string | null) {
  if (!email) return "TrainFlow User";
  const prefix = email
    .split("@")[0]
    ?.replace(/[._-]+/g, " ")
    .trim();
  return prefix ? prefix.replace(/\b\w/g, (char) => char.toUpperCase()) : "TrainFlow User";
}

function getRedirectUri(request: Request, provider: OAuthProvider) {
  const origin = getOrigin(request);
  return `${origin}/auth/callback/${provider}`;
}

async function getAppleClientSecret() {
  const clientId = requireEnv("APPLE_CLIENT_ID");
  const teamId = requireEnv("APPLE_TEAM_ID");
  const keyId = requireEnv("APPLE_KEY_ID");
  const privateKey = requireEnv("APPLE_PRIVATE_KEY").replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const key = await importPKCS8(privateKey, "ES256");
  return new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: keyId })
    .setIssuer(teamId)
    .setIssuedAt(now)
    .setExpirationTime(now + 60 * 60)
    .setAudience(APPLE_ISSUER)
    .setSubject(clientId)
    .sign(key);
}

async function buildAuthUrl(
  request: Request,
  provider: OAuthProvider,
  state: string,
  nonce: string,
) {
  if (provider === "google") {
    const clientId = requireEnv("GOOGLE_CLIENT_ID");
    const redirectUri = getRedirectUri(request, provider);
    const url = new URL(GOOGLE_AUTH_URL);
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "openid email profile");
    url.searchParams.set("state", state);
    url.searchParams.set("nonce", nonce);
    url.searchParams.set("prompt", "select_account");
    return url;
  }

  const clientId = requireEnv("APPLE_CLIENT_ID");
  const redirectUri = getRedirectUri(request, provider);
  const url = new URL(APPLE_AUTH_URL);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code id_token");
  url.searchParams.set("response_mode", "form_post");
  url.searchParams.set("scope", "name email");
  url.searchParams.set("state", state);
  url.searchParams.set("nonce", nonce);
  return url;
}

async function exchangeGoogleCode(code: string, request: Request) {
  const clientId = requireEnv("GOOGLE_CLIENT_ID");
  const clientSecret = requireEnv("GOOGLE_CLIENT_SECRET");
  const redirectUri = getRedirectUri(request, "google");

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    throw new Error("Google token exchange failed.");
  }

  const payload = await response.json();
  if (!payload?.id_token) {
    throw new Error("Google id_token missing.");
  }

  return payload.id_token as string;
}

async function exchangeAppleCode(code: string, request: Request) {
  const clientId = requireEnv("APPLE_CLIENT_ID");
  const redirectUri = getRedirectUri(request, "apple");
  const clientSecret = await getAppleClientSecret();

  const response = await fetch(APPLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    throw new Error("Apple token exchange failed.");
  }

  const payload = await response.json();
  if (!payload?.id_token) {
    throw new Error("Apple id_token missing.");
  }

  return payload.id_token as string;
}

async function verifyGoogleToken(idToken: string, expectedNonce: string | null) {
  const clientId = requireEnv("GOOGLE_CLIENT_ID");
  const jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URL));
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: GOOGLE_ISSUER,
    audience: clientId,
  });

  if (expectedNonce && payload.nonce !== expectedNonce) {
    throw new Error("Invalid Google nonce.");
  }

  return {
    providerUserId: String(payload.sub),
    email: typeof payload.email === "string" ? payload.email : null,
    name: normalizeName(typeof payload.name === "string" ? payload.name : null),
    avatarUrl: typeof payload.picture === "string" ? payload.picture : null,
  } satisfies OAuthProfile;
}

async function verifyAppleToken(idToken: string, expectedNonce: string | null) {
  const clientId = requireEnv("APPLE_CLIENT_ID");
  const jwks = createRemoteJWKSet(new URL(APPLE_JWKS_URL));
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: APPLE_ISSUER,
    audience: clientId,
  });

  if (expectedNonce && payload.nonce !== expectedNonce) {
    throw new Error("Invalid Apple nonce.");
  }

  return {
    providerUserId: String(payload.sub),
    email: typeof payload.email === "string" ? payload.email : null,
    name: null,
    avatarUrl: null,
  } satisfies OAuthProfile;
}

async function findOrCreateUser(profile: OAuthProfile, provider: OAuthProvider) {
  const identity = await prisma.userIdentity.findUnique({
    where: {
      provider_providerUserId: {
        provider,
        providerUserId: profile.providerUserId,
      },
    },
    include: { user: true },
  });

  if (identity) {
    return identity.user;
  }

  if (!profile.email) {
    throw new Error("Email not provided by OAuth provider.");
  }

  let user = await prisma.user.findUnique({
    where: { email: profile.email },
  });

  const displayName = normalizeName(profile.name) ?? fallbackNameFromEmail(profile.email);

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: profile.email,
        name: displayName,
        avatarUrl: profile.avatarUrl,
      },
    });
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name || displayName,
        avatarUrl: user.avatarUrl ?? profile.avatarUrl,
      },
    });
  }

  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      goal: "general-fitness",
      preferredDuration: 30,
      preferredIntensity: "medium",
      availableEquipment: [],
      preferredDays: [],
    },
  });

  await prisma.userIdentity.create({
    data: {
      provider,
      providerUserId: profile.providerUserId,
      email: profile.email,
      userId: user.id,
    },
  });

  return user;
}

function getMockProfile(provider: OAuthProvider): OAuthProfile {
  const suffix = provider === "google" ? "google" : "apple";
  return {
    providerUserId: `${suffix}-mock-user`,
    email: `mock-${suffix}@trainflow.dev`,
    name: `${provider === "google" ? "Google" : "Apple"} Tester`,
    avatarUrl: null,
  };
}

async function redirectWithError(
  session: Awaited<ReturnType<typeof getSession>>,
  errorCode: string,
) {
  const cookie = await commitSession(session);
  return redirect(`/login?oauthError=${errorCode}`, {
    headers: { "Set-Cookie": cookie },
  });
}

export async function startOAuthFlow(request: Request, providerParam: string | undefined) {
  const provider = parseProvider(providerParam);
  const session = await getSession(request);

  const state = randomBytes(16).toString("hex");
  const nonce = randomBytes(16).toString("hex");
  session.set(OAUTH_STATE_KEY, state);
  session.set(OAUTH_NONCE_KEY, nonce);

  const redirectTo = safeRedirectPath(new URL(request.url).searchParams.get("redirectTo"));
  if (redirectTo) {
    session.set(OAUTH_REDIRECT_KEY, redirectTo);
  }

  if (isOAuthMockEnabled()) {
    const callbackUrl = new URL(getRedirectUri(request, provider));
    callbackUrl.searchParams.set("code", "mock");
    callbackUrl.searchParams.set("state", state);
    const cookie = await commitSession(session);
    return redirect(callbackUrl.toString(), { headers: { "Set-Cookie": cookie } });
  }

  const authUrl = await buildAuthUrl(request, provider, state, nonce);
  const cookie = await commitSession(session);
  return redirect(authUrl.toString(), { headers: { "Set-Cookie": cookie } });
}

export async function handleOAuthCallback(
  request: Request,
  providerParam: string | undefined,
  params: URLSearchParams | FormData,
) {
  const provider = parseProvider(providerParam);
  const session = await getSession(request);
  const expectedState = session.get(OAUTH_STATE_KEY) as string | undefined;
  const expectedNonce = session.get(OAUTH_NONCE_KEY) as string | undefined;
  const redirectTo = (session.get(OAUTH_REDIRECT_KEY) as string | undefined) ?? "/dashboard";

  session.unset(OAUTH_STATE_KEY);
  session.unset(OAUTH_NONCE_KEY);
  session.unset(OAUTH_REDIRECT_KEY);

  const state = getParam(params, "state");
  const code = getParam(params, "code");
  const rawUser = getParam(params, "user");

  if (!state || !expectedState || state !== expectedState) {
    return redirectWithError(session, "invalid_state");
  }

  if (!code) {
    return redirectWithError(session, "missing_code");
  }

  try {
    let profile: OAuthProfile;

    if (isOAuthMockEnabled() && code === "mock") {
      profile = getMockProfile(provider);
    } else if (provider === "google") {
      const idToken = await exchangeGoogleCode(code, request);
      profile = await verifyGoogleToken(idToken, expectedNonce ?? null);
    } else {
      const idToken = await exchangeAppleCode(code, request);
      profile = await verifyAppleToken(idToken, expectedNonce ?? null);

      if (rawUser) {
        try {
          const parsed = JSON.parse(rawUser) as {
            name?: { firstName?: string; lastName?: string };
          };
          const firstName = normalizeName(parsed?.name?.firstName ?? null);
          const lastName = normalizeName(parsed?.name?.lastName ?? null);
          const combined = [firstName, lastName].filter(Boolean).join(" ");
          profile.name = normalizeName(combined) ?? profile.name;
        } catch {
          // Ignore malformed name payloads from Apple.
        }
      }
    }

    profile.name = normalizeName(profile.name) ?? fallbackNameFromEmail(profile.email);

    const user = await findOrCreateUser(profile, provider);
    setUserSession(session, user.id);

    const cookie = await commitSession(session);
    return redirect(redirectTo, { headers: { "Set-Cookie": cookie } });
  } catch (error) {
    console.error(error);
    return redirectWithError(session, "oauth_failed");
  }
}
