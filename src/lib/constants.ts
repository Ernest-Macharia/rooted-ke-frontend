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