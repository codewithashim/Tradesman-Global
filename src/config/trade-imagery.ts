import { siteImages, type SiteImage, type SiteImageKey } from "./images";

/**
 * Cover imagery per trade slug. Shared config (not a feature) because the
 * candidate directory, worker profiles and homepage all use it.
 * Images show the *trade*, never a specific worker.
 */
const tradeImageKeys: Record<string, SiteImageKey> = {
  welder: "welding",
  fabricator: "welding",
  electrician: "electrical",
  plumber: "plumbing",
  "pipe-fitter": "plumbing",
  "hvac-technician": "hvac",
  mason: "masonry",
  tiler: "masonry",
  plasterer: "masonry",
  "heavy-vehicle-driver": "driver",
  "light-vehicle-driver": "driver",
  chef: "chef",
  "garments-machine-operator": "garments",
};

export function tradeImage(tradeSlug: string): SiteImage {
  return siteImages[tradeImageKeys[tradeSlug] ?? "onSite"];
}
