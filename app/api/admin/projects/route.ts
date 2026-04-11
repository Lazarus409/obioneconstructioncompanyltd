import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createProject,
  listProjects,
  parseBool,
  storeUploadedAsset,
} from "@/lib/content-store";

export const runtime = "nodejs";

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const mediaFile = formData.get("mediaFile");
  const mediaUrlInput = String(formData.get("mediaUrl") ?? "").trim();
  const mediaType = String(formData.get("mediaType") ?? "image") as "image" | "video";

  let mediaUrl = mediaUrlInput;
  if (mediaFile instanceof File && mediaFile.size > 0) {
    mediaUrl = await storeUploadedAsset(mediaFile, "projects");
  }

  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !category || !description || !mediaUrl) {
    return NextResponse.json(
      { message: "Title, category, description, and media are required." },
      { status: 400 },
    );
  }

  const project = await createProject({
    title,
    category,
    description,
    mediaType,
    mediaUrl,
    featured: parseBool(formData.get("featured")),
  });

  revalidatePath("/");
  revalidatePath("/projects");

  return NextResponse.json({ project }, { status: 201 });
}
