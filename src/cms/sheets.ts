import type { Settings, Room, Offer, Experience, Review } from "./types";
import { fetchSheetRows } from "./sheetsFetch";

type CmsData = {
  settings: Settings;
  rooms: Room[];
  offers: Offer[];
  experiences: Experience[];
  reviews: Review[];
};

let cachePromise: Promise<CmsData> | null = null;

async function loadCms(): Promise<CmsData> {
  const [settingsRows, rooms, offers, experiences, reviews] = await Promise.all([
  fetchSheetRows<Settings>("SHEETS_SETTINGS_CSV"),
  fetchSheetRows<Room>("SHEETS_ROOMS_CSV"),
  fetchSheetRows<Offer>("SHEETS_OFFERS_CSV"),
  fetchSheetRows<Experience>("SHEETS_EXPERIENCES_CSV"),
  fetchSheetRows<Review>("SHEETS_REVIEWS_CSV"),
]);

  const settings = settingsRows[0];
  if (!settings) throw new Error("settings sheet must contain exactly 1 row.");

  // Фільтр: тільки published
  const onlyPublished = <T extends { status?: string }>(xs: T[]) =>
    xs.filter((x) => String(x.status || "").toLowerCase() === "published");

  return {
    settings,
    rooms: onlyPublished(rooms),
    offers: onlyPublished(offers),
    reviews: onlyPublished(reviews),
    experiences: onlyPublished(experiences),
  };
}

async function getCms(): Promise<CmsData> {
  if (!cachePromise) cachePromise = loadCms();
  return cachePromise;
}

// Public API (як було)
export async function getSettings(): Promise<Settings> {
  return (await getCms()).settings;
}

export async function getRooms(): Promise<Room[]> {
  return (await getCms()).rooms;
}

export async function getRoomBySlug(slug: string): Promise<Room | undefined> {
  return (await getCms()).rooms.find((r) => r.slug === slug);
}

export async function getOfferBySlug(slug: string) {
  return (await getCms()).offers.find((o) => o.slug === slug);
}

export async function getExperienceBySlug(slug: string) {
  return (await getCms()).experiences.find((x) => x.slug === slug);
}

export async function getOffers(): Promise<Offer[]> {
  return (await getCms()).offers;
}

export async function getExperiences(): Promise<Experience[]> {
  return (await getCms()).experiences;
}

export async function getReviews(): Promise<Review[]> {
  return (await getCms()).reviews;
}