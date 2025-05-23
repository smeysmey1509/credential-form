// scripts/watchDesignTokens.mjs

import chokidar from "chokidar";
import { exec } from "child_process";
import path from "path";

const watchDir = path.resolve("src/designToken/Button-Primary/Mode 1.json");

console.log("👀 Watching for changes in:", watchDir);

const watcher = chokidar.watch(watchDir, {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 100,
  },
});

watcher.on("change", (filePath) => {
  console.log(
    `📦 Change detected in ${filePath}. Running generateButtonCSS.mjs...`
  );
  exec("node scripts/generateCSS.mjs", (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Error running script:", error);
      return;
    }
    if (stderr) {
      console.error("⚠️ Script stderr:", stderr);
    }
    console.log("✅ Script output:\n", stdout);
  });
});
