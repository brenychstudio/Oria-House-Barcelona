// src/vertical/cms/sheets.ts
import type { Settings, Room, Offer, Experience, Review, Page } from "./types";
import { fetchSheetRows } from "./sheetsFetch";
import { getEnv, isStrictEnv } from "../../core/cms/env";
import { localCmsData } from "./localData";

type CmsData = {
  settings: Settings;
  rooms: Room[];
  offers: Offer[];
  experiences: Experience[];
  reviews: Review[];
  pages: Page[];
};

let cachePromise: Promise<CmsData> | null = null;
const DEMO_BOOKING_URL = "https://oria-house-barcelona-demo.pages.dev/book";
const SHEETS_SOURCE = "sheets";

function onlyPublished<T extends { status?: string }>(xs: T[]): T[] {
  return xs.filter((x) => String(x.status || "").toLowerCase() === "published");
}

function sortByOrder<T extends { sort_order?: string }>(xs: T[]): T[] {
  return [...xs].sort((a, b) => {
    const aa = Number(a.sort_order ?? 0);
    const bb = Number(b.sort_order ?? 0);
    return aa - bb;
  });
}

function normalizeSettings(settings: Settings): Settings {
  const bookingUrl = String(settings.booking_url || "").trim();

  try {
    const url = new URL(bookingUrl);
    if (url.hostname === "example.com" || url.hostname.endsWith(".example.com")) {
      return {
        ...settings,
        booking_url: DEMO_BOOKING_URL,
      };
    }
  } catch {
    // Keep non-URL values untouched; consumers already handle empty strings.
  }

  return settings;
}

let warnedMissingEnv = false;
function warnMissingEnvOnce() {
  if (warnedMissingEnv) return;
  warnedMissingEnv = true;
  console.warn("[engine] Missing SHEETS_*_CSV env vars → using demo fallback data (empty lists).");
}

function urlOrDemo(envKey: string): string | undefined {
  const url = getEnv(envKey);
  if (url) return url;

  if (isStrictEnv()) {
    throw new Error(`Missing env var: ${envKey}`);
  }

  warnMissingEnvOnce();
  return undefined;
}

function shouldLoadSheets(): boolean {
  return getEnv("ENGINE_CMS_SOURCE") === SHEETS_SOURCE;
}

function loadLocalCms(): CmsData {
  return {
    settings: normalizeSettings(localCmsData.settings),
    rooms: sortByOrder(onlyPublished(localCmsData.rooms)),
    offers: sortByOrder(onlyPublished(localCmsData.offers)),
    experiences: sortByOrder(onlyPublished(localCmsData.experiences)),
    reviews: sortByOrder(onlyPublished(localCmsData.reviews)),
    pages: sortByOrder(onlyPublished(localCmsData.pages)),
  };
}

async function loadCms(): Promise<CmsData> {
  if (!shouldLoadSheets()) {
    return loadLocalCms();
  }

  const settingsUrl = urlOrDemo("SHEETS_SETTINGS_CSV");
  const roomsUrl = urlOrDemo("SHEETS_ROOMS_CSV");
  const offersUrl = urlOrDemo("SHEETS_OFFERS_CSV");
  const experiencesUrl = urlOrDemo("SHEETS_EXPERIENCES_CSV");
  const reviewsUrl = urlOrDemo("SHEETS_REVIEWS_CSV");
  const pagesUrl = urlOrDemo("SHEETS_PAGES_CSV");

  const [settingsRows, rooms, offers, experiences, reviews, pages] = await Promise.all([
    settingsUrl ? fetchSheetRows<Settings>(settingsUrl) : Promise.resolve<Settings[]>([]),
    roomsUrl ? fetchSheetRows<Room>(roomsUrl) : Promise.resolve<Room[]>([]),
    offersUrl ? fetchSheetRows<Offer>(offersUrl) : Promise.resolve<Offer[]>([]),
    experiencesUrl ? fetchSheetRows<Experience>(experiencesUrl) : Promise.resolve<Experience[]>([]),
    reviewsUrl ? fetchSheetRows<Review>(reviewsUrl) : Promise.resolve<Review[]>([]),
    pagesUrl ? fetchSheetRows<Page>(pagesUrl) : Promise.resolve<Page[]>([]),
  ]);

  // Settings: in strict sheets mode we expect exactly one row.
  if (isStrictEnv()) {
    if (settingsRows.length !== 1) {
      throw new Error("settings sheet must contain exactly 1 row.");
    }
  }

  const settings = normalizeSettings(settingsRows[0] ?? localCmsData.settings);

  return {
    settings,
    rooms: sortByOrder(onlyPublished(rooms)),
    offers: sortByOrder(onlyPublished(offers)),
    experiences: sortByOrder(onlyPublished(experiences)),
    reviews: sortByOrder(onlyPublished(reviews)),
    pages: sortByOrder(onlyPublished(pages)),
  };
}

async function getCms(): Promise<CmsData> {
  if (!cachePromise) cachePromise = loadCms();
  return cachePromise;
}

// Public API (залишаємо стабільним)
export async function getSettings(): Promise<Settings> {
  return (await getCms()).settings;
}

export async function getRooms(): Promise<Room[]> {
  return (await getCms()).rooms;
}

export async function getRoomBySlug(slug: string): Promise<Room | undefined> {
  return (await getCms()).rooms.find((r) => r.slug === slug);
}

export async function getOffers(): Promise<Offer[]> {
  return (await getCms()).offers;
}

export async function getOfferBySlug(slug: string): Promise<Offer | undefined> {
  return (await getCms()).offers.find((o) => o.slug === slug);
}

export async function getExperiences(): Promise<Experience[]> {
  return (await getCms()).experiences;
}

export async function getExperienceBySlug(slug: string): Promise<Experience | undefined> {
  return (await getCms()).experiences.find((x) => x.slug === slug);
}

export async function getReviews(): Promise<Review[]> {
  return (await getCms()).reviews;
}

export async function getPages(): Promise<Page[]> {
  return (await getCms()).pages;
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  return (await getCms()).pages.find((p) => p.slug === slug);
}
