import "server-only";

import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export type MediaType = "image" | "video";

export type ProjectRecord = {
  id: string;
  title: string;
  category: string;
  description: string;
  mediaType: MediaType;
  mediaUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductRecord = {
  id: string;
  name: string;
  category: string;
  sku: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  specs: { label: string; value: string }[];
  benefits: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const BOGLA_PROOF_CATEGORY = "Bogla Proof Works";

const seedNow = () => new Date().toISOString();

const defaultProjects: ProjectRecord[] = [
  {
    id: "project-12",
    title: "Commercial Facade Upgrade",
    category: BOGLA_PROOF_CATEGORY,
    description: "Modern frontage work with clean finishes and upgraded visual appeal.",
    mediaType: "image",
    mediaUrl: "/images/project12.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-2-video",
    title: "Site Progress Walkthrough",
    category: BOGLA_PROOF_CATEGORY,
    description: "Short walkthrough showing key milestones on site.",
    mediaType: "video",
    mediaUrl: "/videos/video1.mp4",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-2",
    title: "Residential Frame Build",
    category: "Residential construction",
    description: "Structural work and early-stage build progress for a home project.",
    mediaType: "image",
    mediaUrl: "/images/project2.png",
    featured: true,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-3-video",
    title: "Construction Timelapse",
    category: "Project video",
    description: "A compact timelapse of ongoing building work.",
    mediaType: "video",
    mediaUrl: "/videos/video2.mp4",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-3",
    title: "Apartment Exterior",
    category: "Multi-unit residential",
    description: "Exterior progress on a multi-unit development.",
    mediaType: "image",
    mediaUrl: "/images/project3.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-4",
    title: "Interior Fit-Out",
    category: "Residential construction",
    description: "Interior finishing work with emphasis on detail and clean lines.",
    mediaType: "image",
    mediaUrl: "/images/project4.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-5",
    title: "Luxury Residence",
    category: "Residential construction",
    description: "Premium finish package for a high-end residential property.",
    mediaType: "image",
    mediaUrl: "/images/project5.png",
    featured: true,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-6",
    title: "Concrete and Masonry",
    category: "Commercial construction",
    description: "Durable masonry work with precise structural alignment.",
    mediaType: "image",
    mediaUrl: "/images/project6.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-7",
    title: "Exterior Finishing",
    category: "Commercial construction",
    description: "Exterior work with weather-ready material selection.",
    mediaType: "image",
    mediaUrl: "/images/project7.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-8",
    title: "Structural Progress",
    category: BOGLA_PROOF_CATEGORY,
    description: "Primary structure stage captured during active site work.",
    mediaType: "image",
    mediaUrl: "/images/project8.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-9",
    title: "Roadside Build",
    category: BOGLA_PROOF_CATEGORY,
    description: "Urban site development and structural detailing.",
    mediaType: "image",
    mediaUrl: "/images/project9.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-10",
    title: "Finishing Phase",
    category: BOGLA_PROOF_CATEGORY,
    description: "Clean finishing phase with attention to surface detail.",
    mediaType: "image",
    mediaUrl: "/images/project10.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-3-video-2",
    title: "On-Site Progress Clip",
    category: BOGLA_PROOF_CATEGORY,
    description: "Short clip showing active site movement and progress.",
    mediaType: "video",
    mediaUrl: "/videos/video3.mp4",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-11",
    title: "Project Wrap-Up",
    category: BOGLA_PROOF_CATEGORY,
    description: "Completed work showcasing the finished exterior look.",
    mediaType: "image",
    mediaUrl: "/images/project11.png",
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "project-1",
    title: "Development Overview",
    category: "Commercial construction",
    description: "General progress shot from one of the early project phases.",
    mediaType: "image",
    mediaUrl: "/images/project1.png",
    featured: true,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
];

const defaultProducts: ProductRecord[] = [
  {
    id: "premium-engine-oil-filter",
    name: "Premium Engine Oil Filter",
    category: "Oil Filters",
    sku: "OIL-FILTER-001",
    subtitle: "Universal fit for common passenger vehicles",
    description:
      "High-performance oil filter designed for optimal engine protection and extended oil life.",
    imageUrl: "/images/product1.png",
    specs: [
      { label: "Brand", value: "Obi One Premium" },
      { label: "Filter Type", value: "Spin-On" },
      { label: "Dimensions", value: '3.5" x 5.0" (D)' },
      { label: "Weight", value: "0.5 lbs" },
    ],
    benefits: [
      "High-efficiency filtration media captures fine particles",
      "Heavy-duty construction withstands high pressure",
      "Anti-drain back valve prevents dry starts",
      "Meets or exceeds OEM specifications",
    ],
    featured: true,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "brake-pads-set",
    name: "Brake Pads Set",
    category: "Brake Pads",
    sku: "BRAKE-PAD-201",
    subtitle: "Front axle replacement set",
    description:
      "Dependable brake pad set engineered for responsive braking, quiet performance, and longer wear.",
    imageUrl: "/images/product2.png",
    specs: [
      { label: "Brand", value: "Obi One Auto" },
      { label: "Material", value: "Ceramic Composite" },
      { label: "Placement", value: "Front Axle" },
      { label: "Noise Level", value: "Low Dust / Low Noise" },
    ],
    benefits: [
      "Smooth and consistent stopping power",
      "Reduced brake dust for cleaner wheels",
      "Heat-resistant compound for durability",
      "OEM-style fitment for easy replacement",
    ],
    featured: true,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "all-season-tire",
    name: "All Season Tire",
    category: "Tires",
    sku: "TIRE-225-6517",
    subtitle: "225/65R17 premium road grip",
    description:
      "Balanced all-season tire with reliable traction, reinforced sidewalls, and confident handling across wet and dry roads.",
    imageUrl: "/images/product3.png",
    specs: [
      { label: "Size", value: "225/65R17" },
      { label: "Season", value: "All Season" },
      { label: "Load Index", value: "102H" },
      { label: "Warranty", value: "50,000 miles" },
    ],
    benefits: [
      "Confident traction on varied road surfaces",
      "Optimized tread pattern for reduced road noise",
      "Improved cornering stability",
      "Long-lasting compound for daily use",
    ],
    featured: true,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "car-battery",
    name: "Car Battery",
    category: "Car Batteries",
    sku: "BATTERY-12V-88",
    subtitle: "12V maintenance free",
    description:
      "Reliable maintenance-free battery built for strong starts, stable power delivery, and dependable performance.",
    imageUrl: "/images/product4.png",
    specs: [
      { label: "Voltage", value: "12V" },
      { label: "Battery Type", value: "Maintenance Free" },
      { label: "Reserve Capacity", value: "90 minutes" },
      { label: "Cold Cranking Amps", value: "650 CCA" },
    ],
    benefits: [
      "Consistent starting power in all conditions",
      "Maintenance-free sealed design",
      "Vibration-resistant internal build",
      "Dependable reserve capacity for accessories",
    ],
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "shock-absorber",
    name: "Shock Absorber",
    category: "Shock Absorbers",
    sku: "SHOCK-ABS-115",
    subtitle: "Front suspension heavy duty",
    description:
      "Heavy-duty shock absorber designed to improve ride comfort, cornering stability, and suspension control.",
    imageUrl: "/images/product2.png",
    specs: [
      { label: "Brand", value: "Obi One Suspension" },
      { label: "Position", value: "Front" },
      { label: "Material", value: "Hardened Steel" },
      { label: "Fitment", value: "Universal Heavy Duty" },
    ],
    benefits: [
      "Improves ride comfort and control",
      "Reduces vibration on uneven roads",
      "Built for heavy-duty use",
      "Reliable long-term performance",
    ],
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "headlight-assembly",
    name: "Headlight Assembly",
    category: "Light Bulbs",
    sku: "HEADLIGHT-310",
    subtitle: "LED projector replacement",
    description:
      "Complete headlight assembly with bright projector output and durable housing for improved visibility.",
    imageUrl: "/images/product1.png",
    specs: [
      { label: "Type", value: "LED Projector" },
      { label: "Lens", value: "Clear Polycarbonate" },
      { label: "Housing", value: "Weather Sealed" },
      { label: "Fitment", value: "OEM Style Replacement" },
    ],
    benefits: [
      "Bright and focused beam pattern",
      "Durable weather-resistant housing",
      "Improves night-time visibility",
      "Easy OEM-style replacement",
    ],
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "alternator",
    name: "Alternator",
    category: "Alternators",
    sku: "ALT-120A-442",
    subtitle: "120A output for modern systems",
    description:
      "High-output alternator engineered for stable charging performance and reliable power supply.",
    imageUrl: "/images/product4.png",
    specs: [
      { label: "Output", value: "120A" },
      { label: "Voltage", value: "12V" },
      { label: "Pulley", value: "OEM Standard" },
      { label: "Cooling", value: "Internal Fan" },
    ],
    benefits: [
      "Stable charging under load",
      "Supports modern electrical systems",
      "Durable internal components",
      "Long service life",
    ],
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
  {
    id: "brake-rotor",
    name: "Brake Rotor",
    category: "Brake Rotors",
    sku: "ROTOR-FRT-220",
    subtitle: "Ventilated front axle rotor",
    description:
      "Ventilated brake rotor built for strong heat dissipation and dependable braking performance under daily use.",
    imageUrl: "/images/product3.png",
    specs: [
      { label: "Type", value: "Ventilated Rotor" },
      { label: "Placement", value: "Front Axle" },
      { label: "Finish", value: "Anti-Corrosion Coated" },
      { label: "Material", value: "High Carbon Steel" },
    ],
    benefits: [
      "Better heat dissipation",
      "Consistent braking feel",
      "Reduced risk of brake fade",
      "Durable corrosion-resistant finish",
    ],
    featured: false,
    createdAt: seedNow(),
    updatedAt: seedNow(),
  },
];

async function ensureFile(filePath: string, seed: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(seed, null, 2), "utf8");
  }
}

async function readJsonFile<T>(filePath: string, seed: T): Promise<T> {
  await ensureFile(filePath, seed);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export async function listProjects() {
  return readJsonFile<ProjectRecord[]>(PROJECTS_FILE, defaultProjects);
}

export async function listProducts() {
  return readJsonFile<ProductRecord[]>(PRODUCTS_FILE, defaultProducts);
}

export async function saveProjects(projects: ProjectRecord[]) {
  await writeJsonFile(PROJECTS_FILE, projects);
}

export async function saveProducts(products: ProductRecord[]) {
  await writeJsonFile(PRODUCTS_FILE, products);
}

export async function createProject(input: Omit<ProjectRecord, "id" | "createdAt" | "updatedAt">) {
  const projects = await listProjects();
  const now = new Date().toISOString();
  const project: ProjectRecord = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  const nextProjects = [project, ...projects];
  await saveProjects(nextProjects);
  return project;
}

export async function updateProject(
  id: string,
  input: Partial<Omit<ProjectRecord, "id" | "createdAt" | "updatedAt">>,
) {
  const projects = await listProjects();
  const existing = projects.find((project) => project.id === id);

  if (!existing) {
    return null;
  }

  const updated: ProjectRecord = {
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
  };

  const nextProjects = projects.map((project) =>
    project.id === id ? updated : project,
  );

  await saveProjects(nextProjects);
  return updated;
}

export async function deleteProject(id: string) {
  const projects = await listProjects();
  const nextProjects = projects.filter((project) => project.id !== id);

  if (nextProjects.length === projects.length) {
    return false;
  }

  await saveProjects(nextProjects);
  return true;
}

export async function createProduct(
  input: Omit<ProductRecord, "id" | "createdAt" | "updatedAt">,
) {
  const products = await listProducts();
  const now = new Date().toISOString();
  const product: ProductRecord = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  const nextProducts = [product, ...products];
  await saveProducts(nextProducts);
  return product;
}

export async function updateProduct(
  id: string,
  input: Partial<Omit<ProductRecord, "id" | "createdAt" | "updatedAt">>,
) {
  const products = await listProducts();
  const existing = products.find((product) => product.id === id);

  if (!existing) {
    return null;
  }

  const updated: ProductRecord = {
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
  };

  const nextProducts = products.map((product) =>
    product.id === id ? updated : product,
  );

  await saveProducts(nextProducts);
  return updated;
}

export async function deleteProduct(id: string) {
  const products = await listProducts();
  const nextProducts = products.filter((product) => product.id !== id);

  if (nextProducts.length === products.length) {
    return false;
  }

  await saveProducts(nextProducts);
  return true;
}

export async function storeUploadedAsset(
  file: File,
  folder: "projects" | "products",
) {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const extension = getFileExtension(file.name, file.type);
  const safeName = `${folder}-${randomUUID()}${extension}`;
  const destination = path.join(UPLOAD_DIR, safeName);
  const bytes = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(destination, bytes);
  return `/uploads/${safeName}`;
}

function getFileExtension(fileName: string, mimeType: string) {
  const existing = path.extname(fileName);

  if (existing) {
    return existing.toLowerCase();
  }

  if (mimeType.startsWith("video/")) {
    return ".mp4";
  }

  if (mimeType === "image/png") {
    return ".png";
  }

  if (mimeType === "image/webp") {
    return ".webp";
  }

  return ".jpg";
}

export function parseBool(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}
