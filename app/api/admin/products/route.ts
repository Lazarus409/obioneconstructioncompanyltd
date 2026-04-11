import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createProduct,
  listProducts,
  parseBool,
  storeUploadedAsset,
} from "@/lib/content-store";

export const runtime = "nodejs";

export async function GET() {
  const products = await listProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const imageFile = formData.get("imageFile");
  const imageUrlInput = String(formData.get("imageUrl") ?? "").trim();
  let imageUrl = imageUrlInput;

  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await storeUploadedAsset(imageFile, "products");
  }

  const specsText = String(formData.get("specs") ?? "").trim();
  const benefitsText = String(formData.get("benefits") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !category || !sku || !subtitle || !description || !imageUrl) {
    return NextResponse.json(
      { message: "Name, category, SKU, subtitle, description, and image are required." },
      { status: 400 },
    );
  }

  const product = await createProduct({
    name,
    category,
    sku,
    subtitle,
    description,
    imageUrl,
    specs: parseList(specsText),
    benefits: parseTextList(benefitsText),
    featured: parseBool(formData.get("featured")),
  });

  revalidatePath("/");
  revalidatePath("/shop");

  return NextResponse.json({ product }, { status: 201 });
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
