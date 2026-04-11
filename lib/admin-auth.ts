import "server-only";

import { cookies } from "next/headers";
import { getAdminSettings, verifyAdminPassword } from "./admin-store";

export const ADMIN_COOKIE_NAME = "obi-one-admin";
const ADMIN_COOKIE_VALUE = "authenticated";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_COOKIE_VALUE;
}

export async function assertAdminAuthenticated() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    throw new Error("Unauthorized");
  }
}

export function buildAdminCookie() {
  return `${ADMIN_COOKIE_NAME}=${ADMIN_COOKIE_VALUE}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}

export function clearAdminCookie() {
  return `${ADMIN_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export async function authenticateAdminPassword(password: string) {
  return verifyAdminPassword(password);
}

export async function getAdminRecoveryHint() {
  const settings = await getAdminSettings();
  return settings.recoveryHint;
}
