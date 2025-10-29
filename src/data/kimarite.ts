// Full Kimarite catalog (can be extended or localized)
export type Kimarite = { id: string; name: string; group: string };

export const kimarite: Kimarite[] = [
  { id: "yorikiri", name: "Yorikiri", group: "Grappling" },
  { id: "oshidashi", name: "Oshidashi", group: "Thrusting" },
  { id: "yoritaoshi", name: "Yoritaoshi", group: "Grappling" },
  { id: "oshitaoshi", name: "Oshitaoshi", group: "Thrusting" },
  { id: "hatakikomi", name: "Hatakikomi", group: "Slap Down" },
  { id: "hikiotoshi", name: "Hikiotoshi", group: "Pull Down" },
  { id: "uwatenage", name: "Uwatenage", group: "Throw" },
  { id: "shitatenage", name: "Shitatenage", group: "Throw" },
  { id: "sukuinage", name: "Sukuinage", group: "Throw" },
  { id: "tsukiotoshi", name: "Tsukiotoshi", group: "Thrust Down" },
  { id: "tsukitaoshi", name: "Tsukitaoshi", group: "Thrust Down" },
  { id: "okuridashi", name: "Okuridashi", group: "Rear Push Out" },
  { id: "okuritaoshi", name: "Okuritaoshi", group: "Rear Push Down" },
  { id: "kotenage", name: "Kotenage", group: "Arm Lock Throw" },
  { id: "sotogake", name: "Sotogake", group: "Outer Leg Trip" },
  { id: "uchigake", name: "Uchigake", group: "Inner Leg Trip" },
  { id: "ketaguri", name: "Ketaguri", group: "Ankle Kick" },
  { id: "kakenage", name: "Kakenage", group: "Hooking Inner Thigh" },
  { id: "kirikaeshi", name: "Kirikaeshi", group: "Twist Down" },
  { id: "harimanage", name: "Harimanage", group: "Back Hurl" },
  { id: "katasukashi", name: "Katasukashi", group: "Under-Shoulder Swing Down" },
  { id: "tottari", name: "Tottari", group: "Arm Bar Throw" },
  { id: "kubinage", name: "Kubinage", group: "Headlock Throw" },
  { id: "komatasukui", name: "Komatasukui", group: "Minor Inner Scoop" },
  { id: "tsukidashi", name: "Tsukidashi", group: "Thrust Out" }
  // ... remaining up to 82 available for expansion
];
