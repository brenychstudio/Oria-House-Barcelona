export const HOTEL_DEMO_ASSETS = {
  homeHero: "/hotels/barcelona-boutique-demo/global/home-hero.png",
  roomsHero: "/hotels/barcelona-boutique-demo/global/rooms-hero.png",
  offersHero: "/hotels/barcelona-boutique-demo/global/offers-hero.png",
  experiencesHero: "/hotels/barcelona-boutique-demo/global/experiences-hero.png",
  locationHero: "/hotels/barcelona-boutique-demo/global/location-hero.png",
  contactHero: "/hotels/barcelona-boutique-demo/global/contact-hero.png",
  galleryHero: "/hotels/barcelona-boutique-demo/global/gallery-hero.png",
  roomStudioCourtyard: "/hotels/barcelona-boutique-demo/rooms/studio-courtyard/cover.png",
  roomStudioSkyline: "/hotels/barcelona-boutique-demo/rooms/studio-skyline/cover.png",
  roomSuperiorBalcony: "/hotels/barcelona-boutique-demo/rooms/superior-balcony/cover.png",
  roomDeluxeCorner: "/hotels/barcelona-boutique-demo/rooms/deluxe-corner/cover.png",
  roomDeluxeTerrace: "/hotels/barcelona-boutique-demo/rooms/deluxe-terrace/cover.png",
  roomJuniorSuite: "/hotels/barcelona-boutique-demo/rooms/junior-suite/cover.png",
  roomFamilySuite: "/hotels/barcelona-boutique-demo/rooms/family-suite/cover.png",
  roomAccessibleRoom: "/hotels/barcelona-boutique-demo/rooms/accessible-room/cover.png",
  roomCourtyardSuite: "/hotels/barcelona-boutique-demo/rooms/courtyard-suite/cover.png",
  roomSuiteExample: "/hotels/barcelona-boutique-demo/rooms/suite-example/cover.png",
  roomPenthouse: "/hotels/barcelona-boutique-demo/rooms/penthouse/cover.png",
  offerStay3Pay2: "/hotels/barcelona-boutique-demo/offers/stay-3-pay-2/cover.png",
  offerRomanceWeekend: "/hotels/barcelona-boutique-demo/offers/romance-weekend/cover.png",
  offerCulturePass: "/hotels/barcelona-boutique-demo/offers/culture-pass/cover.png",
  experienceRooftopSunset: "/hotels/barcelona-boutique-demo/experiences/rooftop-sunset/cover.png",
  experienceSpaRitual: "/hotels/barcelona-boutique-demo/experiences/spa-ritual/cover.png",
  experienceSignatureBreakfast: "/hotels/barcelona-boutique-demo/experiences/signature-breakfast/cover.png",
  experienceGaudiMorning: "/hotels/barcelona-boutique-demo/experiences/gaudi-morning/cover.png",
  experiencePrivatePhotoWalk: "/hotels/barcelona-boutique-demo/experiences/private-photo-walk/cover.png",
  experienceBeachDayKit: "/hotels/barcelona-boutique-demo/experiences/beach-day-kit/cover.png",
  galleryCourtyardArrival: "/hotels/barcelona-boutique-demo/gallery/courtyard-arrival.png",
  galleryArchitectureStaircase: "/hotels/barcelona-boutique-demo/gallery/architecture-staircase.png",
  galleryDiningEvening: "/hotels/barcelona-boutique-demo/gallery/dining-evening.png",
  galleryPoolReflection: "/hotels/barcelona-boutique-demo/gallery/pool-reflection.png",
  detailBathroom: "/hotels/barcelona-boutique-demo/details/bathroom-detail.png",
  detailDeskMorning: "/hotels/barcelona-boutique-demo/details/desk-morning.png",
  detailWindowLight: "/hotels/barcelona-boutique-demo/details/window-light.png",
  detailLinenSleepingArea: "/hotels/barcelona-boutique-demo/details/linen-sleeping-area.png",
  detailArrivalCorridor: "/hotels/barcelona-boutique-demo/details/arrival-corridor.png",
} as const;

export type HotelDemoAssetKey = keyof typeof HOTEL_DEMO_ASSETS;

export const ROOM_COVER_BY_SLUG: Record<string, string> = {
  "studio-courtyard": HOTEL_DEMO_ASSETS.roomStudioCourtyard,
  "studio-skyline": HOTEL_DEMO_ASSETS.roomStudioSkyline,
  "superior-balcony": HOTEL_DEMO_ASSETS.roomSuperiorBalcony,
  "superior-balc": HOTEL_DEMO_ASSETS.roomSuperiorBalcony,
  "deluxe-corner": HOTEL_DEMO_ASSETS.roomDeluxeCorner,
  "deluxe-terrace": HOTEL_DEMO_ASSETS.roomDeluxeTerrace,
  "junior-suite": HOTEL_DEMO_ASSETS.roomJuniorSuite,
  "family-suite": HOTEL_DEMO_ASSETS.roomFamilySuite,
  "accessible-room": HOTEL_DEMO_ASSETS.roomAccessibleRoom,
  "accessible": HOTEL_DEMO_ASSETS.roomAccessibleRoom,
  "courtyard-suite": HOTEL_DEMO_ASSETS.roomCourtyardSuite,
  "suite-example": HOTEL_DEMO_ASSETS.roomSuiteExample,
  "suite-eixample": HOTEL_DEMO_ASSETS.roomSuiteExample,
  "penthouse": HOTEL_DEMO_ASSETS.roomPenthouse,
  "suite-terrace": HOTEL_DEMO_ASSETS.roomDeluxeTerrace,
};

export const OFFER_COVER_BY_SLUG: Record<string, string> = {
  "stay-3-pay-2": HOTEL_DEMO_ASSETS.offerStay3Pay2,
  "romance-weekend": HOTEL_DEMO_ASSETS.offerRomanceWeekend,
  "culture-pass": HOTEL_DEMO_ASSETS.offerCulturePass,
};

export const EXPERIENCE_COVER_BY_SLUG: Record<string, string> = {
  "rooftop-sunset": HOTEL_DEMO_ASSETS.experienceRooftopSunset,
  "spa-ritual": HOTEL_DEMO_ASSETS.experienceSpaRitual,
  "signature-breakfast": HOTEL_DEMO_ASSETS.experienceSignatureBreakfast,
  "wine-pairing": HOTEL_DEMO_ASSETS.galleryDiningEvening,
  "gaudi-morning": HOTEL_DEMO_ASSETS.experienceGaudiMorning,
  "private-photo-walk": HOTEL_DEMO_ASSETS.experiencePrivatePhotoWalk,
  "beach-day-kit": HOTEL_DEMO_ASSETS.experienceBeachDayKit,
  "beachday-kit": HOTEL_DEMO_ASSETS.experienceBeachDayKit,
  "design-book-shelf": HOTEL_DEMO_ASSETS.detailDeskMorning,
};

export const SHARED_ROOM_DETAIL_IMAGES = [
  HOTEL_DEMO_ASSETS.detailBathroom,
  HOTEL_DEMO_ASSETS.detailDeskMorning,
  HOTEL_DEMO_ASSETS.detailWindowLight,
  HOTEL_DEMO_ASSETS.detailLinenSleepingArea,
  HOTEL_DEMO_ASSETS.detailArrivalCorridor,
];

export const GALLERY_ARCHIVE_IMAGES = [
  HOTEL_DEMO_ASSETS.galleryCourtyardArrival,
  HOTEL_DEMO_ASSETS.galleryArchitectureStaircase,
  HOTEL_DEMO_ASSETS.galleryDiningEvening,
  HOTEL_DEMO_ASSETS.galleryPoolReflection,
  HOTEL_DEMO_ASSETS.detailBathroom,
  HOTEL_DEMO_ASSETS.detailDeskMorning,
  HOTEL_DEMO_ASSETS.detailWindowLight,
  HOTEL_DEMO_ASSETS.detailLinenSleepingArea,
  HOTEL_DEMO_ASSETS.detailArrivalCorridor,
];
