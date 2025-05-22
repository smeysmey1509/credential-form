// scripts/generateCssVars.mjs

import { readFile, writeFile, readdir, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const tokensRootDir = path.resolve(__dirname, "../src/designToken");
const globalCssPath = path.resolve(__dirname, "../src/styles/global.css");

// Recursively find all .json files in a folder
async function getJsonFiles(dir) {
  let files = [];
  const items = await readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const nested = await getJsonFiles(fullPath);
      files = files.concat(nested);
    } else if (item.isFile() && item.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Convert token JSON to CSS variables
function traverseJsonToCssVars(obj, currentPath = []) {
  let vars = [];

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object" && value !== null && !("value" in value)) {
      vars = vars.concat(traverseJsonToCssVars(value, [...currentPath, key]));
    } else if (typeof value === "object" && "value" in value) {
      const cssVar = ["--", ...currentPath, key]
        .join("-")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

      vars.push(`${cssVar}: ${value.value};`);
    }
  }

  return vars;
}

// Main
const jsonFiles = await getJsonFiles(tokensRootDir);

let allVars = [];

for (const filePath of jsonFiles) {
  const jsonContent = await readFile(filePath, "utf8");
  const json = JSON.parse(jsonContent);
  const vars = traverseJsonToCssVars(json);
  allVars.push(...vars);
}

const cssRoot = `/* Auto-generated design tokens */\n:root {\n  ${allVars.join(
  "\n  "
)}\n}\n`;

// Overwrite global.css with the single :root block
await writeFile(globalCssPath, cssRoot);

console.log(
  "✅ All design tokens merged into one :root and written to global.css"
);
