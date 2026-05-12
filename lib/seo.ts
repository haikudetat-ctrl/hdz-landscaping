const defaultSiteUrl = "https://hdzlandscapingnj.com";
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (vercelProductionUrl
    ? vercelProductionUrl.startsWith("http")
      ? vercelProductionUrl
      : `https://${vercelProductionUrl}`
    : defaultSiteUrl);

export const canonicalSiteUrl = normalizeSiteUrl(siteUrl);

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
