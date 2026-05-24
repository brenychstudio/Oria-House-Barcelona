import type { Lang } from "../../content/languages";

export const DEFAULT_SITE_URL = "https://oria-house-barcelona-demo.pages.dev";

export const SITE_URL = (
  import.meta.env.SITE_URL ||
  import.meta.env.PUBLIC_SITE_URL ||
  DEFAULT_SITE_URL
).replace(/\/$/, "");

export const SITE_NAME = "Oria House Barcelona";

export const DEFAULT_OG_IMAGE = "/og/oria-house-og.svg";

export type SeoRouteKey =
  | "home"
  | "rooms"
  | "offers"
  | "experiences"
  | "gallery"
  | "location"
  | "contact"
  | "roomDetail"
  | "offerDetail"
  | "experienceDetail";

type SeoCopy = {
  title: string;
  description: string;
};

const seoCopy: Record<SeoRouteKey, Record<Lang, SeoCopy>> = {
  home: {
    en: {
      title: "Oria House Barcelona - Quiet Boutique Hotel Stay",
      description:
        "A quiet boutique hotel experience in Barcelona shaped by soft rooms, curated rituals, local rhythm and direct booking clarity.",
    },
    es: {
      title: "Oria House Barcelona - Hotel boutique tranquilo",
      description:
        "Una estancia boutique tranquila en Barcelona definida por habitaciones suaves, rituales curados, ritmo local y reserva directa.",
    },
  },
  rooms: {
    en: {
      title: "Rooms - Oria House Barcelona",
      description:
        "Choose rooms by atmosphere, light, privacy and stay rhythm. Explore calm Barcelona rooms and suites for direct booking.",
    },
    es: {
      title: "Habitaciones - Oria House Barcelona",
      description:
        "Elija habitaciones por atmosfera, luz, privacidad y ritmo de estancia. Explore habitaciones y suites tranquilas en Barcelona.",
    },
  },
  offers: {
    en: {
      title: "Offers - Oria House Barcelona",
      description:
        "Direct booking offers built around time, rhythm and value: longer stays, private arrivals and curated Barcelona packages.",
    },
    es: {
      title: "Ofertas - Oria House Barcelona",
      description:
        "Ofertas de reserva directa pensadas alrededor del tiempo, el ritmo y el valor: estancias largas, llegadas privadas y paquetes curados.",
    },
  },
  experiences: {
    en: {
      title: "Experiences - Oria House Barcelona",
      description:
        "Discover rooftop moments, slow breakfasts, wellness rituals and curated Barcelona experiences beyond the room.",
    },
    es: {
      title: "Experiencias - Oria House Barcelona",
      description:
        "Descubra momentos en terraza, desayunos pausados, rituales wellness y experiencias curadas en Barcelona mas alla de la habitacion.",
    },
  },
  gallery: {
    en: {
      title: "Gallery - Oria House Barcelona",
      description:
        "A cinematic visual archive of rooms, courtyards, dining, details and quiet Barcelona hotel moments.",
    },
    es: {
      title: "Galeria - Oria House Barcelona",
      description:
        "Un archivo visual cinematografico de habitaciones, patios, gastronomia, detalles y momentos tranquilos del hotel.",
    },
  },
  location: {
    en: {
      title: "Location - Oria House Barcelona",
      description:
        "A quiet Barcelona base for local routes, cultural mornings, golden-hour returns and direct hotel arrival planning.",
    },
    es: {
      title: "Ubicacion - Oria House Barcelona",
      description:
        "Una base tranquila en Barcelona para rutas locales, mananas culturales, regresos a la hora dorada y planificacion de llegada.",
    },
  },
  contact: {
    en: {
      title: "Reservations & Contact - Oria House Barcelona",
      description:
        "Contact Oria House Barcelona for direct booking, room advice, arrival questions and private requests before your stay.",
    },
    es: {
      title: "Reservas y contacto - Oria House Barcelona",
      description:
        "Contacte con Oria House Barcelona para reserva directa, asesoramiento de habitacion, llegada y solicitudes privadas.",
    },
  },
  roomDetail: {
    en: {
      title: "Room - Oria House Barcelona",
      description:
        "Inspect room atmosphere, light, privacy, amenities and stay details before booking directly with the hotel.",
    },
    es: {
      title: "Habitacion - Oria House Barcelona",
      description:
        "Inspeccione atmosfera, luz, privacidad, servicios y detalles de la habitacion antes de reservar directamente.",
    },
  },
  offerDetail: {
    en: {
      title: "Offer - Oria House Barcelona",
      description:
        "Explore package logic, included details, timing and direct booking value before planning your Barcelona stay.",
    },
    es: {
      title: "Oferta - Oria House Barcelona",
      description:
        "Explore la logica del paquete, detalles incluidos, momento y valor de reserva directa antes de planificar su estancia.",
    },
  },
  experienceDetail: {
    en: {
      title: "Experience - Oria House Barcelona",
      description:
        "Explore a curated stay moment through atmosphere, timing, visual inspection and direct hotel planning.",
    },
    es: {
      title: "Experiencia - Oria House Barcelona",
      description:
        "Explore un momento curado de estancia a traves de atmosfera, momento, inspeccion visual y planificacion directa.",
    },
  },
};

export const getSeoCopy = (key: SeoRouteKey, lang: Lang): SeoCopy => {
  return seoCopy[key]?.[lang] ?? seoCopy.home[lang];
};

export const normalizePath = (path = "/") => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean.endsWith("/") ? clean : `${clean}/`;
};

export const absoluteUrl = (path = "/") => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${normalizePath(path)}`;
};

export const absoluteAssetUrl = (path = DEFAULT_OG_IMAGE) => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getAlternatePath = (path: string, lang: Lang) => {
  const normalized = normalizePath(path);

  if (normalized.startsWith("/en/")) {
    return lang === "en" ? normalized : normalized.replace(/^\/en\//, "/es/");
  }

  if (normalized.startsWith("/es/")) {
    return lang === "es" ? normalized : normalized.replace(/^\/es\//, "/en/");
  }

  return `/${lang}/`;
};
