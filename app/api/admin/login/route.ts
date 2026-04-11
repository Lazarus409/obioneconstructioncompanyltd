import { NextResponse } from "next/server";

import { buildAdminCookie, authenticateAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!(await authenticateAdminPassword(password))) {
    return NextResponse.json(
      { ok: false, message: "Invalid admin password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", buildAdminCookie());
  return response;
}
