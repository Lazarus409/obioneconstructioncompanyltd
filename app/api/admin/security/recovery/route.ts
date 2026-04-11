import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { updateRecoveryCode } from "@/lib/admin-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const recoveryCode = String(formData.get("recoveryCode") ?? "");
  const recoveryHint = String(formData.get("recoveryHint") ?? "");

  if (!recoveryCode) {
    return NextResponse.json(
      { message: "A new recovery code is required." },
      { status: 400 },
    );
  }

  await updateRecoveryCode(recoveryCode, recoveryHint);
  return NextResponse.json({ ok: true });
}

