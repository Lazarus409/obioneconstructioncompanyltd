import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  deleteProject,
  updateProject,
  parseBool,
  storeUploadedAsset,
} from "@/lib/content-store";

export const runtime = "nodejs";

export async function PATCH(request: Request, context: RouteContext<"/api/admin/projects/[id]">) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const mediaFile = formData.get("mediaFile");
  const mediaUrlInput = String(formData.get("mediaUrl") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  let mediaUrl = mediaUrlInput;
  if (mediaFile instanceof File && mediaFile.size > 0) {
    mediaUrl = await storeUploadedAsset(mediaFile, "projects");
  }

  if (!title || !category || !description || !mediaUrl) {
    return NextResponse.json(
      { message: "Title, category, description, and media are required." },
      { status: 400 },
    );
  }

  const project = await updateProject(id, {
    title,
    category,
    description,
    mediaType: String(formData.get("mediaType") ?? "image") as "image" | "video",
    mediaUrl,
    featured: parseBool(formData.get("featured")),
  });

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/projects");

  return NextResponse.json({ project });
}

export async function DELETE(_request: Request, context: RouteContext<"/api/admin/projects/[id]">) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteProject(id);

  if (!deleted) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/projects");

  return NextResponse.json({ ok: true });
}
