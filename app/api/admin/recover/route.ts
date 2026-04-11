import { NextResponse } from "next/server";

import { buildAdminCookie } from "@/lib/admin-auth";
import { updateAdminPassword, verifyRecoveryCode } from "@/lib/admin-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const recoveryCode = String(formData.get("recoveryCode") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!recoveryCode || !newPassword || !confirmPassword) {
    return NextResponse.json(
      { message: "Recovery code, new password, and confirmation are required." },
      { status: 400 },
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { message: "New password and confirmation do not match." },
      { status: 400 },
    );
  }

  const isValid = await verifyRecoveryCode(recoveryCode);
  if (!isValid) {
    return NextResponse.json(
      { message: "Recovery code is incorrect." },
      { status: 401 },
    );
  }

  await updateAdminPassword(newPassword);

  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", buildAdminCookie());
  return response;
}
