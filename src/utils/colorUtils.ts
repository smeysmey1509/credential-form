import colornames from "colornames";

/** Convert a color name to hex. Example: "Sky Blue" -> "#87ceeb" */
export function convertColorNameToHex(name: string, fallback = "#CCCCCC"): string {
  const hex = colornames(name.trim().toLowerCase());
  return hex || fallback;
}

/** Generate Tailwind-compatible class names dynamically */
export function generateColorClasses(colorName: string) {
  const hex = convertColorNameToHex(colorName);

  // Remove the '#' for Tailwind-compatible class naming
  const cleanHex = hex.replace("#", "");

  return {
    name: colorName,
    hex,
    bgClass: `bg-[#${cleanHex}]`,
    ringClass: `ring-[#${cleanHex}]`,
  };
}
