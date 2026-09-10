import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "edhf_admin_session";
const SESSION_DURATION = 60 * 60 * 24; // 24 hours

export async function createAdminSession(username: string) {
  const token = crypto.randomBytes(32).toString("hex");

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });

  return token;
}

export async function getAdminSession() {
  const cookieStore = await cookies();

  return cookieStore.get(SESSION_COOKIE)?.value || null;
}

export async function isAdminAuthenticated() {
  const session = await getAdminSession();

  return !!session;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}