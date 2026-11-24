/**
 * Every photograph used on the site, with alt text and credit.
 * Source: Unsplash (Unsplash License — free for commercial use, no attribution
 * required; we credit photographers anyway). Swap `src` for owned photography later.
 */

export interface SiteImage {
  src: string;
  alt: string;
  credit: { photographer: string; url: string };
}

function unsplash(id: string, photographer: string) {
  return { photographer, url: `https://unsplash.com/photos/${id}` };
}

export const siteImages = {
  heroWorker: {
    src: "/images/hero-worker.jpg",
    alt: "A worker cutting steel rebar with a chop saw at night, sparks flying",
    credit: unsplash("qs4rK_0OGv8", "Kabiur Rahman Riyad"),
  },
  videoResume: {
    src: "/images/stories/video-resume.jpg",
    alt: "Two welders working on steel in a dark workshop",
    credit: unsplash("ozD1yMPFwXE", "Kabiur Rahman Riyad"),
  },
  onSite: {
    src: "/images/stories/on-site.jpg",
    alt: "Construction workers in hard hats tying reinforcement on a building site",
    credit: unsplash("fBtNXtM4o3k", "Wasif Ali"),
  },
  siteAerial: {
    src: "/images/stories/site-aerial.jpg",
    alt: "Aerial view of a large construction site",
    credit: unsplash("seHtvl29J78", "Florian Haider"),
  },
  welding: {
    src: "/images/trades/welding.jpg",
    alt: "Welder in a helmet and gloves with sparks flying",
    credit: unsplash("9Q_pLLP_jmA", "Rob Lambert"),
  },
  electrical: {
    src: "/images/trades/electrical.jpg",
    alt: "Electrician in a hard hat installing wiring",
    credit: unsplash("_2AlIm-F6pw", "Emmanuel Ikwuegbu"),
  },
  plumbing: {
    src: "/images/trades/plumbing.jpg",
    alt: "Plumber fitting a pipe under a sink",
    credit: unsplash("c314Gh8dXAo", "Timur Shakerzianov"),
  },
  hvac: {
    src: "/images/trades/hvac.jpg",
    alt: "Air-conditioning outdoor unit mounted on a brick wall",
    credit: unsplash("JsPkVrHMQoo", "Everett Pachmann"),
  },
  masonry: {
    src: "/images/trades/masonry.jpg",
    alt: "Mason laying blocks with a trowel",
    credit: unsplash("i6V6diaf71A", "Solømen"),
  },
  driver: {
    src: "/images/trades/driver.jpg",
    alt: "Truck driving on a highway at dusk",
    credit: unsplash("ucuOscdCaO4", "Josiah Farrow"),
  },
  chef: {
    src: "/images/trades/chef.jpg",
    alt: "Chef cooking over a flaming wok in a professional kitchen",
    credit: unsplash("4NQEvxW2_4w", "Johnathan Macedo"),
  },
  garments: {
    src: "/images/trades/garments.jpg",
    alt: "Workers at sewing machines on a garment factory floor",
    credit: unsplash("dh1EDCiQ6lg", "EqualStock"),
  },
} satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof siteImages;
