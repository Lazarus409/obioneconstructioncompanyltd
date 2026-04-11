import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export type AdminSettings = {
  passwordHash: string;
  recoveryCodeHash: string;
  recoveryHint: string;
  updatedAt: string;
};

type StoredSecret = {
  salt: string;
  hash: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const DEFAULT_RECOVERY_CODE = process.env.ADMIN_RECOVERY_CODE ?? "recover-admin";
const DEFAULT_RECOVERY_HINT =
  process.env.ADMIN_RECOVERY_HINT ?? "Use the recovery code set by the site owner.";

const KEY_LENGTH = 64;

export async function getAdminSettings() {
  const settings = await readAdminSettings();
  return {
    ...settings,
    recoveryHint: settings.recoveryHint || DEFAULT_RECOVERY_HINT,
  };
}

export async function verifyAdminPassword(password: string) {
  const settings = await getAdminSettings();
  return verifySecret(password, settings.passwordHash);
}

export async function verifyRecoveryCode(code: string) {
  const settings = await getAdminSettings();
  return verifySecret(code, settings.recoveryCodeHash);
}

export async function updateAdminPassword(newPassword: string) {
  const settings = await getAdminSettings();
  const updated: AdminSettings = {
    ...settings,
    passwordHash: hashSecret(newPassword),
    updatedAt: new Date().toISOString(),
  };

  await writeAdminSettings(updated);
  return updated;
}

export async function updateRecoveryCode(newRecoveryCode: string, recoveryHint?: string) {
  const settings = await getAdminSettings();
  const updated: AdminSettings = {
    ...settings,
    recoveryCodeHash: hashSecret(newRecoveryCode),
    recoveryHint: recoveryHint?.trim() || settings.recoveryHint || DEFAULT_RECOVERY_HINT,
    updatedAt: new Date().toISOString(),
  };

  await writeAdminSettings(updated);
  return updated;
}

async function readAdminSettings(): Promise<AdminSettings> {
  await fs.mkdir(path.dirname(ADMIN_FILE), { recursive: true });

  try {
    const raw = await fs.readFile(ADMIN_FILE, "utf8");
    const parsed = JSON.parse(raw) as AdminSettings;

    if (!parsed?.passwordHash || !parsed?.recoveryCodeHash) {
      throw new Error("Invalid admin settings");
    }

    return parsed;
  } catch {
    const seeded: AdminSettings = {
      passwordHash: hashSecret(DEFAULT_PASSWORD),
      recoveryCodeHash: hashSecret(DEFAULT_RECOVERY_CODE),
      recoveryHint: DEFAULT_RECOVERY_HINT,
      updatedAt: new Date().toISOString(),
    };

    await writeAdminSettings(seeded);
    return seeded;
  }
}

async function writeAdminSettings(settings: AdminSettings) {
  await fs.mkdir(path.dirname(ADMIN_FILE), { recursive: true });
  await fs.writeFile(ADMIN_FILE, JSON.stringify(settings, null, 2), "utf8");
}

function hashSecret(secret: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(secret, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

function verifySecret(secret: string, stored: string) {
  const parsed = parseStoredSecret(stored);
  if (!parsed) {
    return false;
  }

  const candidate = scryptSync(secret, parsed.salt, KEY_LENGTH);
  const expected = Buffer.from(parsed.hash, "hex");

  if (candidate.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(candidate, expected);
}

function parseStoredSecret(stored: string): StoredSecret | null {
  const [salt, hash] = stored.split(":");

  if (!salt || !hash) {
    return null;
  }

  return { salt, hash };
}

