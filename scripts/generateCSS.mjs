import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const tokenPath = path.resolve(__dirname, "../src/designToken/Button-Primary/Mode 1.json"); // Adjust path if needed
const outputCssPath = path.resolve(__dirname, "../src/components/Button/Button.css");

// Helpers
function extractRootVars(buttonRadiusObj) {
  let rootVars = [];

  for (const key in buttonRadiusObj) {
    const token = buttonRadiusObj[key];
    if (token?.["$value"]) {
      const cssVar = `--${key.replace(/_/g, "-")}: ${token["$value"]};`;
      rootVars.push(cssVar);
    }
  }

  return rootVars;
}

function getPropCss(propName, value) {
  if (propName.includes("color")) return `background-color: ${value};`;
  if (propName.includes("text-size")) return `font-size: ${value};`;
  if (propName.includes("weight")) return `width: ${value};`;
  if (propName.includes("height")) return `line-height: ${value};`;
  if (propName.includes("radius")) return `border-radius: ${value};`;
  return `${propName}: ${value};`;
}

// Generate CSS classes
function generateVariantCSS(buttonPrimary) {
  let variantVars = new Set();
  let classes = [];

  for (const size in buttonPrimary) {
    const classProps = buttonPrimary[size];
    let className = `.button--primary-${size.split("-").pop()}-default`;
    let classBody = [];

    for (const token in classProps) {
      const { "$value": value } = classProps[token];
      const cssLine = getPropCss(token, value);
      classBody.push(cssLine);

      // Collect variant-level variables (optional block)
      if (token.includes("weight") || token.includes("radius") || token.includes("color")) {
        const short = token.replace(/^scl-button-/, "").split("-").slice(0, 2).join("-");
        variantVars.add(`--button-primary-${short}: ${value};`);
      }
    }

    classes.push(`${className} {\n  ${classBody.join("\n  ")}\n}`);
  }

  return {
    variantCss: `.button--primary {\n  ${[...variantVars].join("\n  ")}\n}`,
    variantClasses: classes.join("\n\n")
  };
}

// Main
try {
  const json = JSON.parse(await readFile(tokenPath, "utf8"));

  const baseButton = `/* Button Component Styles */
.button {
  display: inline-block;
  padding: 8px 16px;
  box-sizing: border-box;
}
`;

  const radiusRoot = extractRootVars(json["button-radius"]);
  const rootBlock = `/* Button Radius Tokens */\n:root {\n  ${radiusRoot.join("\n  ")}\n}`;

  const { variantCss, variantClasses } = generateVariantCSS(json["button-primary"]);

  const output = [
    baseButton,
    rootBlock,
    "\n/* Button-primary Variant */",
    variantCss,
    variantClasses
  ].join("\n\n");

  await writeFile(outputCssPath, output);
  console.log("✅ Button component CSS generated at:", outputCssPath);
} catch (err) {
  console.error("❌ Error generating CSS:", err);
}
