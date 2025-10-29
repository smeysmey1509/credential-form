export const colorNameToDynamicHex = (colorName: string): string => {
  // Normalize color name
  const name = colorName.trim().toLowerCase();

  // Base color dictionary (core color families)
  const baseColors: Record<string, [number, number, number]> = {
    black: [0, 0, 0],
    white: [255, 255, 255],
    gray: [128, 128, 128],
    silver: [192, 192, 192],
    red: [255, 0, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    yellow: [255, 255, 0],
    purple: [128, 0, 128],
    pink: [255, 105, 180],
    orange: [255, 165, 0],
    gold: [255, 215, 0],
    brown: [139, 69, 19],
  };

  // Find main color keyword inside name
  const found = Object.keys(baseColors).find((c) => name.includes(c));

  // If no keyword match → use random but consistent color
  if (!found) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = (hash >> 16) & 255;
    const g = (hash >> 8) & 255;
    const b = hash & 255;
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  }

  const [r, g, b] = baseColors[found];

  // Adjust brightness based on adjectives
  let brightness = 1;
  if (name.includes("light")) brightness = 1.2;
  else if (name.includes("dark") || name.includes("midnight")) brightness = 0.6;

  const newR = Math.min(255, Math.round(r * brightness));
  const newG = Math.min(255, Math.round(g * brightness));
  const newB = Math.min(255, Math.round(b * brightness));

  return (
    "#" +
    [newR, newG, newB].map((x) => x.toString(16).padStart(2, "0")).join("")
  );
};
