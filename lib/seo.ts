const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (vercelProductionUrl
    ? vercelProductionUrl.startsWith("http")
      ? vercelProductionUrl
      : `https://${vercelProductionUrl}`
    : "https://hdz-landscaping.vercel.app");

export const serviceAreaTowns = [
  "Cherry Hill",
  "Voorhees",
  "Marlton",
  "Mount Laurel",
  "Sicklerville",
  "Washington Township",
  "Medford",
  "Haddonfield",
  "Deptford",
  "Williamstown",
];
