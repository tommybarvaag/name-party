import { Session } from "next-auth";

export async function getSession(
  cookie: string | null
): Promise<Session | null> {
  if (!cookie) {
    return new Promise((resolve) => resolve(null));
  }

  const response = await fetch(
    `${process.env.VERCEL_URL ?? process.env.NEXTAUTH_URL}/api/auth/session`,
    {
      headers: { cookie },
    }
  );

  if (!response?.ok) {
    return new Promise((resolve) => resolve(null));
  }

  const session = await response.json();

  return Object.keys(session).length > 0
    ? session
    : new Promise((resolve) => resolve(null));
}
