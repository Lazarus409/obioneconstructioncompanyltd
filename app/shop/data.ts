export type Product = {
  slug: string;
  name: string;

  category: string;
  sku: string;
  subtitle: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  benefits: string[];
};

export const shopCategories = [
  {
    title: "Engine Parts",
    items: [
      "Oil Filters",
      "Air Filters",
      "Spark Plugs",
      "Timing Belts",
      "Gaskets",
    ],
  },
  {
    title: "Brake Systems",
    items: [
      "Brake Pads",
      "Brake Rotors",
      "Brake Fluid",
      "Brake Calipers",
      "Brake Lines",
    ],
  },
  {
    title: "Suspension",
    items: [
      "Shock Absorbers",
      "Strut Assemblies",
      "Control Arms",
      "Ball Joints",
      "Bushings",
    ],
  },
  {
    title: "Electrical",
    items: [
      "Car Batteries",
      "Alternators",
      "Starters",
      "Fuses & Relays",
      "Light Bulbs",
    ],
  },
];

export const products: Product[] = [
  {
    slug: "premium-engine-oil-filter",
    name: "Premium Engine Oil Filter",
    category: "Oil Filters",
    sku: "OIL-FILTER-001",
    subtitle: "Universal Fit - High Performance",
    image: "/images/product1.png",
    description:
      "High-performance oil filter designed for optimal engine protection and extended oil life. Features premium filtration media that captures contaminants down to 25 microns.",
    specs: [
      { label: "Brand", value: "Obi One Premium" },
      { label: "Filter Type", value: "Spin-On" },
      { label: "Dimensions", value: '3.5" x 5.0" (D)' },
      { label: "Weight", value: "0.5 lbs" },
      {
        label: "Compatibility",
        value: "Universal Fit - Most Toyota, Honda, Nissan",
      },
    ],
    benefits: [
      "High-efficiency filtration media captures fine particles",
      "Heavy-duty construction withstands high pressure",
      "Anti-drain back valve prevents dry starts",
      "Meets or exceeds OEM specifications",
    ],
  },
  {
    slug: "brake-pads-set",
    name: "Brake Pads Set",
    category: "Brake Pads",
    sku: "BRAKE-PAD-201",
    subtitle: "Front Axle - OEM Quality",
    image: "/images/product2.png",
    description:
      "Dependable brake pad set engineered for responsive braking, quiet performance, and longer wear in daily driving conditions.",
    specs: [
      { label: "Brand", value: "Obi One Auto" },
      { label: "Material", value: "Ceramic Composite" },
      { label: "Placement", value: "Front Axle" },
      { label: "Noise Level", value: "Low Dust / Low Noise" },
      { label: "Compatibility", value: "Selected Toyota and Honda models" },
    ],
    benefits: [
      "Smooth and consistent stopping power",
      "Reduced brake dust for cleaner wheels",
      "Heat-resistant compound for durability",
      "OEM-style fitment for easy replacement",
    ],
  },
  {
    slug: "all-season-tire",
    name: "All Season Tire",

    category: "Tires",
    sku: "TIRE-225-6517",
    subtitle: "225/65R17 - Premium Road Grip",
    image: "/images/product3.png",
    description:
      "Balanced all-season tire with reliable traction, reinforced sidewalls, and confident handling across wet and dry roads.",
    specs: [
      { label: "Size", value: "225/65R17" },
      { label: "Season", value: "All Season" },
      { label: "Load Index", value: "102H" },
      { label: "Tread Pattern", value: "Symmetrical" },
      { label: "Warranty", value: "50,000 miles" },
    ],
    benefits: [
      "Confident traction on varied road surfaces",
      "Optimized tread pattern for reduced road noise",
      "Improved cornering stability",
      "Long-lasting compound for daily use",
    ],
  },
  {
    slug: "car-battery",
    name: "Car Battery",
    category: "Car Batteries",
    sku: "BATTERY-12V-88",
    subtitle: "12V Maintenance Free",
    image: "/images/product4.png",
    description:
      "Reliable maintenance-free battery built for strong starts, stable power delivery, and dependable performance in demanding conditions.",
    specs: [
      { label: "Voltage", value: "12V" },
      { label: "Battery Type", value: "Maintenance Free" },
      { label: "Reserve Capacity", value: "90 minutes" },
      { label: "Cold Cranking Amps", value: "650 CCA" },
      { label: "Warranty", value: "18 months" },
    ],
    benefits: [
      "Consistent starting power in all conditions",
      "Maintenance-free sealed design",
      "Vibration-resistant internal build",
      "Dependable reserve capacity for accessories",
    ],
  },
  {
    slug: "shock-absorber",
    name: "Shock Absorber",
    category: "Shock Absorbers",
    sku: "SHOCK-ABS-115",
    subtitle: "Front Suspension - Heavy Duty",
    image: "/images/product2.png",
    description:
      "Heavy-duty shock absorber designed to improve ride comfort, cornering stability, and suspension control on rough roads.",
    specs: [
      { label: "Brand", value: "Obi One Suspension" },
      { label: "Position", value: "Front" },
      { label: "Material", value: "Hardened Steel" },
      { label: "Fitment", value: "Universal Heavy Duty" },
      { label: "Warranty", value: "12 months" },
    ],
    benefits: [
      "Improves ride comfort and control",
      "Reduces vibration on uneven roads",
      "Built for heavy-duty use",
      "Reliable long-term performance",
    ],
  },
  {
    slug: "headlight-assembly",
    name: "Headlight Assembly",
    category: "Light Bulbs",
    sku: "HEADLIGHT-310",
    subtitle: "LED Projector - OEM Quality",
    image: "/images/product1.png",
    description:
      "Complete headlight assembly with bright projector output and durable housing for improved visibility and a refreshed front-end look.",
    specs: [
      { label: "Type", value: "LED Projector" },
      { label: "Lens", value: "Clear Polycarbonate" },
      { label: "Housing", value: "Weather Sealed" },
      { label: "Fitment", value: "OEM Style Replacement" },
      { label: "Warranty", value: "12 months" },
    ],
    benefits: [
      "Bright and focused beam pattern",
      "Durable weather-resistant housing",
      "Improves night-time visibility",
      "Easy OEM-style replacement",
    ],
  },
  {
    slug: "alternator",
    name: "Alternator",
    category: "Alternators",
    sku: "ALT-120A-442",
    subtitle: "120A - Compatible with Most Models",
    image: "/images/product4.png",
    description:
      "High-output alternator engineered for stable charging performance and reliable power supply for modern vehicle electronics.",
    specs: [
      { label: "Output", value: "120A" },
      { label: "Voltage", value: "12V" },
      { label: "Pulley", value: "OEM Standard" },
      { label: "Cooling", value: "Internal Fan" },
      { label: "Warranty", value: "18 months" },
    ],
    benefits: [
      "Stable charging under load",
      "Supports modern electrical systems",
      "Durable internal components",
      "Long service life",
    ],
  },
  {
    slug: "brake-rotor",
    name: "Brake Rotor",
    category: "Brake Rotors",
    sku: "ROTOR-FRT-220",
    subtitle: "Ventilated - Front Axle",
    image: "/images/product3.png",
    description:
      "Ventilated brake rotor built for strong heat dissipation and dependable braking performance under daily use.",
    specs: [
      { label: "Type", value: "Ventilated Rotor" },
      { label: "Placement", value: "Front Axle" },
      { label: "Finish", value: "Anti-Corrosion Coated" },
      { label: "Material", value: "High Carbon Steel" },
      { label: "Warranty", value: "12 months" },
    ],
    benefits: [
      "Better heat dissipation",
      "Consistent braking feel",
      "Reduced risk of brake fade",
      "Durable corrosion-resistant finish",
    ],
  },
];

export const relatedProducts = products.slice(1);
