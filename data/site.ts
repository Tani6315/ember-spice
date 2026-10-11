// ------------------------------------------------------------
// All restaurant content lives here. For a new client, change
// this file first: name, phone, menu, hours, images.
// ------------------------------------------------------------

export const site = {
  name: "Ember & Spice",
  tagline: "Grill and Desi Kitchen",
  phone: "+1 (555) 014-2290",
  whatsapp: "15550142290", // digits only, used for the WhatsApp link
  email: "hello@emberandspice.example",
  address: "128 Market Street, Your City",
  mapsUrl: "https://maps.google.com/?q=128+Market+Street",
  hours: [
    { day: "Monday – Thursday", time: "12:00 PM – 11:00 PM" },
    { day: "Friday – Saturday", time: "12:00 PM – 1:00 AM" },
    { day: "Sunday", time: "1:00 PM – 11:00 PM" },
  ],
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
};

// ------------------------------------------------------------
// Booking settings
// ------------------------------------------------------------
export const booking = {
  // How the booking request is sent:
  // "whatsapp" = opens WhatsApp with the details filled in (no setup needed)
  // "email"    = sends to the restaurant's email via Web3Forms (needs a free key)
  // "both"     = sends the email AND opens WhatsApp
  method: "email" as "whatsapp" | "email" | "both",

  // Free key from https://web3forms.com (enter the restaurant's email there,
  // the key arrives by email). Only needed for "email" or "both".
  web3formsKey: "b8c6b535-3ca6-419c-81ea-dfa055679dc8",

  // Guests must book at least this many hours before their time slot.
  minHoursAhead: 5,

  // How many days ahead guests can book.
  daysAhead: 30,

  // Table time slots, in 24-hour format (HH:MM).
  slots: ["12:30", "13:30", "14:30", "18:00", "19:00", "20:00", "21:00", "22:00"],
};

// Free photos from Unsplash. Replace with the client's own photos
// (put them in /public/images and use "/images/name.jpg").
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  hero: u("photo-1414235077428-338989a2e8c0", 1800),
  about: u("photo-1517248135467-4c7edcad34c4"),
  gallery: [
    u("photo-1555396273-367ea4eb4db5", 900),
    u("photo-1504674900247-0877df9cc836", 900),
    u("photo-1540189549336-e6e99c3679fe", 900),
    u("photo-1546069901-ba9599a7e63c", 900),
    u("photo-1565299624946-b28f40a0ae38", 900),
    u("photo-1567620905732-2d1ec7ab7445", 900),
  ],
};

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tag?: "Chef's pick" | "Spicy" | "Vegetarian" | "New";
};

export const menu: Record<string, MenuItem[]> = {
  Starters: [
    { name: "Chicken Tikka Bites", description: "Yogurt-marinated chicken, charred over coal, mint chutney.", price: 9, tag: "Chef's pick" },
    { name: "Crispy Samosa Trio", description: "Spiced potato, peas and chickpea filling, tamarind dip.", price: 7, tag: "Vegetarian" },
    { name: "Masala Fries", description: "Hand-cut fries tossed in chaat masala and lime.", price: 6 },
    { name: "Fish Pakora", description: "Gram-flour battered fish with ajwain and green chilli mayo.", price: 10, tag: "Spicy" },
  ],
  "From the Grill": [
    { name: "Seekh Kebab Platter", description: "Minced beef kebabs, grilled onions, naan and raita.", price: 18, tag: "Chef's pick" },
    { name: "Lamb Chops", description: "Four chops marinated overnight in papaya and garam masala.", price: 26 },
    { name: "Malai Boti", description: "Creamy, mild chicken cubes with cardamom and cheese.", price: 17 },
    { name: "Charcoal Paneer Tikka", description: "Smoky cottage cheese, peppers and onion.", price: 15, tag: "Vegetarian" },
  ],
  Curries: [
    { name: "Butter Chicken", description: "Tandoori chicken in a silky tomato and butter gravy.", price: 17 },
    { name: "Chicken Karahi", description: "Wok-cooked with tomato, ginger and green chilli. Serves two.", price: 24, tag: "Spicy" },
    { name: "Slow-Cooked Nihari", description: "Beef shank simmered for eight hours, fresh ginger, lemon.", price: 20, tag: "New" },
    { name: "Daal Makhani", description: "Black lentils cooked overnight with cream and butter.", price: 13, tag: "Vegetarian" },
  ],
  "Rice & Bread": [
    { name: "Chicken Biryani", description: "Fragrant basmati, saffron and slow-cooked chicken.", price: 16 },
    { name: "Garlic Naan", description: "Fresh from the tandoor, brushed with garlic butter.", price: 4 },
    { name: "Peshawari Naan", description: "Stuffed with coconut, almond and raisins.", price: 5 },
    { name: "Jeera Rice", description: "Basmati with toasted cumin.", price: 5, tag: "Vegetarian" },
  ],
  Desserts: [
    { name: "Gulab Jamun", description: "Warm milk dumplings in rose syrup, vanilla ice cream.", price: 7 },
    { name: "Kheer", description: "Slow-cooked rice pudding, cardamom and pistachio.", price: 6 },
    { name: "Mango Lassi", description: "Thick yogurt shake with Alphonso mango.", price: 5 },
  ],
};

export const reviews = [
  { name: "Sarah M.", text: "The lamb chops were the best I've had in years. Warm staff, great music, and the naan keeps coming.", rating: 5 },
  { name: "Daniel R.", text: "Booked for a birthday dinner of twelve. They handled everything and the karahi was a hit.", rating: 5 },
  { name: "Aisha K.", text: "Authentic flavours without being too heavy. The nihari tastes like my grandmother's.", rating: 5 },
];
