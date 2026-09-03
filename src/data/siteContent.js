export const fallbackServices = [
  {
    name: "Hydroponic Farming",
    slug: "hydroponic-farming",
    short_description:
      "Design, installation, management and optimization of hydroponic production systems.",
    offerings: [
      "What hydroponics is",
      "NFT systems",
      "Drip systems",
      "Dutch bucket systems",
      "Nutrient management",
      "Greenhouse setup",
      "Farm design",
      "Installation",
      "Maintenance",
      "Consultancy",
      "Training",
    ],
  },
  {
    name: "Vertical Farming",
    slug: "vertical-farming",
    short_description:
      "Space-efficient farming systems for urban and controlled environments.",
    offerings: [
      "Vertical farm design",
      "Controlled-environment systems",
      "Urban farming setups",
      "Installation and commissioning",
      "Crop planning",
      "Training",
    ],
  },
  {
    name: "Organic Agriculture",
    slug: "organic-agriculture",
    short_description:
      "Sustainable crop production using environmentally responsible farming practices.",
    offerings: [
      "Organic farm planning",
      "Soil health and composting",
      "Input selection",
      "Pest and disease management",
      "Certification guidance",
      "Training",
    ],
  },
  {
    name: "Agronomy Consultancy",
    slug: "agronomy-consultancy",
    short_description:
      "Professional crop, soil, farm management and production advisory services.",
    offerings: [
      "Farm assessment",
      "Soil assessment",
      "Crop diagnosis",
      "Crop management",
      "Pest and disease advisory",
      "Fertilizer and nutrient management",
      "Farm planning",
      "Production optimization",
      "Irrigation advice",
      "Crop selection",
      "Farm visits",
    ],
  },
  {
    name: "Landscaping",
    slug: "landscaping",
    short_description:
      "Landscape design, installation and maintenance for residential, commercial and institutional spaces.",
    offerings: [
      "Landscape design",
      "Garden installation",
      "Lawn establishment",
      "Vertical gardens",
      "Irrigation",
      "Maintenance",
      "Commercial landscaping",
      "Residential landscaping",
      "Institutional landscaping",
    ],
  },
  {
    name: "Training & Capacity Building",
    slug: "training",
    short_description:
      "Practical training for farmers, institutions, students and organizations.",
    offerings: [
      "Introduction to Hydroponics",
      "Commercial Hydroponic Farming",
      "Vertical Farming",
      "Organic Agriculture",
      "Agronomy",
      "Greenhouse Management",
      "Urban Farming",
      "Landscaping",
      "Farm Business Management",
    ],
  },
  {
    name: "EIA Services",
    slug: "eia-services",
    short_description:
      "Environmental Impact Assessment and related environmental consultancy services.",
    offerings: [
      "Environmental Impact Assessment",
      "Site screening",
      "Compliance advisory",
      "Reporting and documentation",
    ],
  },
];

export const fallbackCourses = [
  {
    name: "Hydroponic Farming Fundamentals",
    slug: "hydroponic-farming-fundamentals",
    short_description: "Practical introduction to hydroponic production systems.",
    duration: "3 Days",
    mode: "Physical / Online",
    location: "Nairobi",
    fee: "KES XXXX",
  },
  {
    name: "Introduction to Hydroponics",
    slug: "introduction-to-hydroponics",
    short_description: "Understand hydroponic principles and starter systems.",
    duration: "2 Days",
    mode: "Physical / Online",
    location: "Nairobi",
  },
  {
    name: "Commercial Hydroponic Farming",
    slug: "commercial-hydroponic-farming",
    short_description: "Design and manage commercial-scale hydroponic farms.",
    duration: "5 Days",
    mode: "Physical",
    location: "Nairobi",
  },
  {
    name: "Vertical Farming",
    slug: "vertical-farming",
    short_description: "Space-efficient systems for urban and indoor production.",
    duration: "3 Days",
    mode: "Physical / Online",
    location: "Nairobi",
  },
  {
    name: "Organic Agriculture",
    slug: "organic-agriculture",
    short_description: "Sustainable crop production and soil health practices.",
    duration: "3 Days",
    mode: "Physical",
    location: "Nairobi",
  },
  {
    name: "Agronomy",
    slug: "agronomy",
    short_description: "Crop, soil and farm management advisory skills.",
    duration: "4 Days",
    mode: "Physical",
    location: "Nairobi",
  },
  {
    name: "Greenhouse Management",
    slug: "greenhouse-management",
    short_description: "Setup, climate control and crop management in greenhouses.",
    duration: "3 Days",
    mode: "Physical",
    location: "Nairobi",
  },
  {
    name: "Urban Farming",
    slug: "urban-farming",
    short_description: "Productive farming systems for limited urban spaces.",
    duration: "2 Days",
    mode: "Physical / Online",
    location: "Nairobi",
  },
  {
    name: "Landscaping",
    slug: "landscaping-training",
    short_description: "Design, installation and maintenance of outdoor spaces.",
    duration: "3 Days",
    mode: "Physical",
    location: "Nairobi",
  },
  {
    name: "Farm Business Management",
    slug: "farm-business-management",
    short_description: "Planning, costing and running a profitable farm enterprise.",
    duration: "3 Days",
    mode: "Physical / Online",
    location: "Nairobi",
  },
];

export const galleryCategories = [
  "All",
  "Hydroponics",
  "Vertical Farming",
  "Organic Farming",
  "Landscaping",
  "Training",
  "Farm Visits",
  "Projects",
];

export const getServiceFallback = (slug) =>
  fallbackServices.find((item) => item.slug === slug) || null;
