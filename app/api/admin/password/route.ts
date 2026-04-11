import { NextResponse } from "next/server";

import {
  buildAdminCookie,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import { updateAdminPassword, verifyAdminPassword } from "@/lib/admin-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json(
      { message: "Current password, new password, and confirmation are required." },
      { status: 400 },
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { message: "New password and confirmation do not match." },
      { status: 400 },
    );
  }

  const isValid = await verifyAdminPassword(currentPassword);
  if (!isValid) {
    return NextResponse.json(
      { message: "Current password is incorrect." },
      { status: 401 },
    );
  }

  await updateAdminPassword(newPassword);

  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", buildAdminCookie());
  return response;
}
