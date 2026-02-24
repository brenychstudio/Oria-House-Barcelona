import { t, type Lang } from "../../content/languages";

export function getHotelLabels(lang: Lang) {
  return {
    rooms: t(lang, "Rooms", "Habitaciones"),
    offers: t(lang, "Offers", "Ofertas"),
    experiences: t(lang, "Experiences", "Experiencias"),
    contact: t(lang, "Contact", "Contacto"),
    location: t(lang, "Location", "Ubicación"),

    viewAll: t(lang, "View all", "Ver todo"),

    book: t(lang, "Book", "Reservar"),
    bookNow: t(lang, "Book now", "Reservar"),
    exploreRooms: t(lang, "Explore rooms", "Ver habitaciones"),

    backToRooms: t(lang, "Back to rooms", "Volver a habitaciones"),
    backToOffers: t(lang, "Back to offers", "Volver a ofertas"),
    backToExperiences: t(lang, "Back to experiences", "Volver a experiencias"),

    gallery: t(lang, "Gallery", "Galería"),
    tapFull: t(lang, "Tap to view full size", "Toca para ver en grande"),

    included: t(lang, "Included", "Incluye"),
    terms: t(lang, "Terms", "Términos"),
    guestNotes: t(lang, "Guest notes", "Reseñas"),
  };
}