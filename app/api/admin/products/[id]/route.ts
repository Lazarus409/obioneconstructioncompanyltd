import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  deleteProduct,
  updateProduct,
  parseBool,
  storeUploadedAsset,
} from "@/lib/content-store";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  context: { params: { id: string } },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;
  const formData = await request.formData();
  const imageFile = formData.get("imageFile");
  const imageUrlInput = String(formData.get("imageUrl") ?? "").trim();
  let imageUrl = imageUrlInput;
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await storeUploadedAsset(imageFile, "products");
  }

  if (!name || !category || !sku || !subtitle || !description || !imageUrl) {
    return NextResponse.json(
      { message: "Name, category, SKU, subtitle, description, and image are required." },
      { status: 400 },
    );
  }

  const product = await updateProduct(id, {
    name,
    category,
    sku,
    subtitle,
    description,
    imageUrl,
    specs: parseList(String(formData.get("specs") ?? "").trim()),
    benefits: parseTextList(String(formData.get("benefits") ?? "").trim()),
    featured: parseBool(formData.get("featured")),
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/shop");

  return NextResponse.json({ product });
}

export async function DELETE(
  _request: Request,
  context: { params: { id: string } },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;
  const deleted = await deleteProduct(id);

  if (!deleted) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/shop");

  return NextResponse.json({ ok: true });
}

function parseList(raw: string) {
  if (!raw) {
    return [];
  }

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...valueParts] = line.split("|");
      return {
        label: (label ?? "").trim(),
        value: valueParts.join("|").trim(),
      };
    })
    .filter((entry) => entry.label && entry.value);
}

function parseTextList(raw: string) {
  if (!raw) {
    return [];
  }

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
