// ─── Brand Colors ─────────────────────────────────────────────────────────────
export const C = {
  green:      "#0F3D33",
  greenLight: "#164d40",
  teal:       "#1F6F6B",
  tealLight:  "#237872",
  sand:       "#D6C2A8",
  sandLight:  "#EDE4D8",
  sandDark:   "#C4AD90",
  gold:       "#C59A3D",
  clay:       "#A75B2C",
  white:      "#FFFFFF",
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Restaurants",  href: "/restaurants" },
  { label: "Events",       href: "/events" },
  { label: "Packages",     href: "/packages" },
  { label: "Blog",         href: "/blog" },
];

// ─── Destinations ─────────────────────────────────────────────────────────────
export const DESTINATIONS = [
  { name: "Nairobi",     slug: "nairobi",     short: "Restaurants, stays, events, 24-hour plans",             tags: ["Urban exploration","Dining scene","Nightlife"],  img: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=700&q=80" },
  { name: "Diani",       slug: "diani",       short: "Beachfront stays, water activities, 3D/2N plans",       tags: ["Beach resorts","Water sports","Seafood"],         img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80" },
  { name: "Naivasha",    slug: "naivasha",    short: "Lake stays, Hell's Gate, 2-day trips",                  tags: ["Lake activities","Hell's Gate","Cycling"],         img: "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=700&q=80" },
  { name: "Maasai Mara", slug: "maasai-mara", short: "Safari packages, migration, lodges",                    tags: ["Big Five","Migration","Lodges"],                  img: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=700&q=80" },
  { name: "Nanyuki",     slug: "nanyuki",     short: "Mount Kenya views, cabin stays",                        tags: ["Cabins","Mount Kenya","Nature"],                  img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=700&q=80" },
  { name: "Watamu",      slug: "watamu",      short: "Marine parks, boutique stays, beach escapes",           tags: ["Marine park","Snorkelling","Beach"],              img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=700&q=80" },
  { name: "Amboseli",    slug: "amboseli",    short: "Elephant safaris, Kilimanjaro views, lodge options",    tags: ["Elephants","Kilimanjaro","Lodges"],               img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=700&q=80" },
];

type DestinationSlug =
  | "nairobi"
  | "diani"
  | "naivasha"
  | "maasai-mara"
  | "nanyuki"
  | "watamu"
  | "amboseli";

type DestinationRestaurant = {
  name: string;
  area: string;
  cuisine: string;
  budget: "Budget" | "Mid" | "Premium";
  img: string;
};

type DestinationDetail = {
  name: string;
  short: string;
  heroImg: string;
  highlights: string[];
  overview: string;
  packageLink: string;
  restaurants: DestinationRestaurant[];
  things: string[];
  hotelSearch: string;
};

export const DESTINATION_DETAIL: Record<DestinationSlug, DestinationDetail> = {
  nairobi: {
    name: "Nairobi",
    short: "Restaurants, stays, events, and 24-hour plans in Kenya's capital",
    heroImg: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1400&q=85",
    highlights: ["Boutique & luxury stays", "Rooftop dining & bars", "Nairobi National Park", "Vibrant nightlife"],
    overview:
      "Nairobi is the entry point to Kenya and one of the most dynamic cities in East Africa. This guide brings together everything you need to experience Nairobi properly: the best restaurants and brunch spots, date-night and rooftop recommendations, weekend events, boutique and luxury stays, and practical 24-hour itineraries.",
    packageLink: "/packages/city",
    restaurants: [
      { name: "Talisman Restaurant", area: "Karen", cuisine: "Continental", budget: "Premium", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" },
      { name: "Carnivore Restaurant", area: "Langata", cuisine: "Nyama Choma", budget: "Mid", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80" },
      { name: "The Nest Rooftop", area: "Westlands", cuisine: "Pan-Asian", budget: "Premium", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" },
    ],
    things: ["Nairobi National Park game drive", "Karen Blixen Museum", "City brunch crawl", "Karura Forest walk", "Nairobi Railway Museum"],
    hotelSearch: "Nairobi, Kenya",
  },
  diani: {
    name: "Diani",
    short: "Beachfront stays, water activities, and 3D/2N plans",
    heroImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85",
    highlights: ["Beach resorts", "Water sports", "Seafood", "Relaxation"],
    overview:
      "Diani Beach is one of Kenya's most popular coastal destinations. This guide covers hotels in Diani from budget to luxury, beachfront villas and resorts, snorkelling and water activities, restaurant recommendations, three-day itineraries, and ready-to-book weekend bundles.",
    packageLink: "/packages/beach",
    restaurants: [
      { name: "Ali Barbour's Cave", area: "Diani Beach Road", cuisine: "Seafood", budget: "Premium", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&q=80" },
      { name: "The Sands Beach Bar", area: "Diani Beachfront", cuisine: "Continental", budget: "Mid", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" },
      { name: "40 Thieves Beach Bar", area: "Diani Beach", cuisine: "Casual Dining", budget: "Budget", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" },
    ],
    things: ["Snorkelling at Kisite Marine Park", "Skydiving over the beach", "Kitesurfing lessons", "Colobus monkey sanctuary", "Shimba Hills day trip"],
    hotelSearch: "Diani Beach, Kenya",
  },
  naivasha: {
    name: "Naivasha",
    short: "Lake stays, Hell's Gate cycling, and easy 2-day trips from Nairobi",
    heroImg: "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=1400&q=85",
    highlights: ["Lakeside hotels & cabins", "Hell's Gate cycling", "Boat rides", "Nature walks"],
    overview:
      "Naivasha remains one of the most accessible and rewarding short trips from Nairobi. This guide includes lakeside hotels and cabins, Hell's Gate National Park activities, boat rides and nature experiences, and budget-friendly two-day and three-day plans.",
    packageLink: "/packages/weekend",
    restaurants: [
      { name: "Olerai House", area: "Lake Naivasha", cuisine: "Continental", budget: "Premium", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" },
      { name: "Camp Carnelley's", area: "Naivasha", cuisine: "Casual", budget: "Mid", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" },
    ],
    things: ["Hell's Gate cycling", "Crescent Island boat trip", "Lake Naivasha boat ride", "Oserian Wildlife Sanctuary", "Elsamere Conservation Centre"],
    hotelSearch: "Naivasha, Kenya",
  },
  "maasai-mara": {
    name: "Maasai Mara",
    short: "Safari packages, migration season trips, and Mara lodge comparisons",
    heroImg: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1400&q=85",
    highlights: ["Big Five game drives", "Migration season", "Luxury lodges", "Budget camps"],
    overview:
      "The Maasai Mara is Kenya's most iconic safari destination. This page breaks down three-day and four-day safari packages, budget camps versus luxury lodges, the best time to visit during migration season, what safari costs in Kenya, and tour versus self-drive considerations.",
    packageLink: "/packages/safari",
    restaurants: [
      { name: "Angama Mara Restaurant", area: "Mara North", cuisine: "Fine Dining", budget: "Premium", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" },
      { name: "Rekero Camp Dining", area: "Mara Triangle", cuisine: "Bush Cuisine", budget: "Mid", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&q=80" },
    ],
    things: ["Morning game drive", "Hot air balloon safari", "Maasai village visit", "Guided bush walk", "Sundowner at the Mara"],
    hotelSearch: "Maasai Mara, Kenya",
  },
  nanyuki: {
    name: "Nanyuki",
    short: "Mount Kenya views, cabin stays, and curated 2-3 day escapes",
    heroImg: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1400&q=85",
    highlights: ["Private cabins", "Boutique stays", "Mount Kenya views", "Nature activities"],
    overview:
      "Nanyuki has become one of Kenya's most sought-after escape destinations. This guide covers private cabins and boutique stays, Mount Kenya experiences, coffee shops and relaxed dining, and structured weekend itineraries designed for quick but memorable getaways.",
    packageLink: "/packages/weekend",
    restaurants: [
      { name: "Trout Tree Restaurant", area: "Nanyuki", cuisine: "Continental", budget: "Mid", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" },
      { name: "Caramel Cafe", area: "Nanyuki Town", cuisine: "Cafe & Brunch", budget: "Budget", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" },
    ],
    things: ["Mount Kenya hike", "Ol Pejeta Conservancy", "Sweetwaters Chimpanzee Sanctuary", "Nanyuki river walk", "Stargazing at the equator"],
    hotelSearch: "Nanyuki, Kenya",
  },
  watamu: {
    name: "Watamu",
    short: "Marine parks, boutique stays, and Watamu beach escapes",
    heroImg: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1400&q=85",
    highlights: ["Marine park snorkelling", "Boutique stays", "Turtle conservation", "Relaxed coastal energy"],
    overview:
      "Watamu is known for its marine park, turquoise waters, and easy coastal pace. This page includes Watamu beach hotels, snorkelling and marine park tours, boutique and luxury stays, three-day itineraries, and travel logistics from Nairobi.",
    packageLink: "/packages/beach",
    restaurants: [
      { name: "Turtle Bay Beach Club", area: "Watamu", cuisine: "Seafood", budget: "Mid", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" },
      { name: "La Madrugada", area: "Watamu", cuisine: "Italian & Seafood", budget: "Premium", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" },
    ],
    things: ["Watamu Marine National Park snorkel", "Turtle watching", "Deep sea fishing", "Gede Ruins visit", "Bio-Ken Snake Farm"],
    hotelSearch: "Watamu, Kenya",
  },
  amboseli: {
    name: "Amboseli",
    short: "Elephant safaris, Mount Kilimanjaro views, and Amboseli lodge options",
    heroImg: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1400&q=85",
    highlights: ["Elephant herds", "Kilimanjaro views", "Safari lodges", "Photography"],
    overview:
      "Amboseli National Park is famous for large elephant herds and dramatic Mount Kilimanjaro views. This page highlights safari packages, lodge comparisons, best seasons, photography tips, and two-day to three-day safari plans.",
    packageLink: "/packages/safari",
    restaurants: [
      { name: "Tortilis Camp Dining", area: "Amboseli", cuisine: "Bush Cuisine", budget: "Premium", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&q=80" },
      { name: "Ol Tukai Lodge Restaurant", area: "Amboseli", cuisine: "Continental", budget: "Mid", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" },
    ],
    things: ["Elephant viewing at Ol Tukai", "Kilimanjaro sunrise game drive", "Maasai cultural visit", "Observation Hill sunset", "Guided nature walk"],
    hotelSearch: "Amboseli, Kenya",
  },
};

// ─── Restaurants ──────────────────────────────────────────────────────────────
export const LOCATIONS = ["Westlands","Kilimani","Karen","CBD","Diani","Naivasha","Nanyuki"];
export const BUDGETS   = ["Under KES 1,000","KES 1,000–3,000","KES 3,000+"];
export const CUISINES  = ["Italian","Seafood","Nyama Choma","Asian","Cafés","Vegan","Middle Eastern","Rooftop Bars"];

// ─── Events ───────────────────────────────────────────────────────────────────
export const EVENT_CATEGORIES = [
  { key: "weekend",   label: "This Weekend",         icon: "📅", desc: "What's happening this weekend across Kenya" },
  { key: "concerts",  label: "Concerts & Festivals", icon: "🎵", desc: "Live music, festivals, and cultural celebrations" },
  { key: "nightlife", label: "Nightlife & Parties",  icon: "🎉", desc: "Club nights, themed parties, and social events" },
  { key: "cultural",  label: "Cultural & Pop-Ups",   icon: "👥", desc: "Art shows, markets, and community gatherings" },
  { key: "sports",    label: "Sports & Outdoor",     icon: "🏃", desc: "Marathons, hikes, and active events" },
];

// ─── Packages ─────────────────────────────────────────────────────────────────
export const PACKAGES = [
  {
    key: "weekend",  title: "Weekend Getaways",  sub: "2D/1N and 3D/2N escapes across Kenya",
    icon: "🧳",
    inclusions: ["Accommodation included","Activity suggestions","Transport options","Budget to premium tiers"],
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
  },
  {
    key: "beach",    title: "Beach Escapes",     sub: "Diani and Watamu beach packages",
    icon: "🏖️",
    inclusions: ["Beachfront accommodation","Water activities","Return transport options","Curated restaurant list"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
  },
  {
    key: "safari",   title: "Safari Packages",   sub: "Mara and Amboseli bundles",
    icon: "🦁",
    inclusions: ["Park entry fees","Game drives","Accommodation (camp/lodge)","Tiered pricing"],
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80",
  },
  {
    key: "city",     title: "City Experiences",  sub: "Nairobi date nights and brunch crawls",
    icon: "🏙️",
    inclusions: ["Restaurant bookings","Activity plans","Transport included","Curated itineraries"],
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
  },
  {
    key: "event",    title: "Event Bundles",     sub: "Concert + dinner, nightlife + transport",
    icon: "🎶",
    inclusions: ["Event tickets","Dining reservations","Transport coordination","All-inclusive pricing"],
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80",
  },
];

// ─── Blog ─────────────────────────────────────────────────────────────────────
export const BLOG_CATEGORIES = ["All","Itineraries","Food","Safari","Travel Tips","Destinations"];

export const BLOG_POSTS = [
  { date:"March 1, 2026",    category:"Itineraries", title:"The Ultimate 3-Day Naivasha Itinerary",  excerpt:"Everything you need to know for the perfect lake escape",       img:"https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=800&q=80", slug:"naivasha-itinerary" },
  { date:"February 28, 2026",category:"Food",        title:"Best Brunch Spots in Nairobi",           excerpt:"Where to find the perfect weekend brunch experience",           img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", slug:"nairobi-brunch" },
  { date:"February 25, 2026",category:"Safari",      title:"Planning Your First Kenyan Safari",      excerpt:"A complete guide to safari planning for first-timers",          img:"https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", slug:"first-safari" },
  { date:"February 20, 2026",category:"Destinations",title:"48 Hours in Diani Beach",               excerpt:"The perfect quick escape to Kenya's finest white-sand coast",   img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", slug:"48-hours-diani" },
  { date:"February 15, 2026",category:"Travel Tips", title:"Kenya eTA: Everything You Need to Know", excerpt:"A step-by-step guide to getting your Kenya electronic visa",  img:"https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", slug:"kenya-eta-guide" },
  { date:"February 10, 2026",category:"Food",        title:"Best Nyama Choma Joints in Nairobi",    excerpt:"Where to find the most authentic grilled meat experience",      img:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", slug:"nairobi-nyama-choma" },
];
