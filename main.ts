// makefun-x-reposts-02 entry (Node 22, standard library only).
//
// The entry is the X posts themselves: seven of my own posts on X, each
// quoting a different @makefunai post, all from one public account, each
// carrying make.fun (or @makefunai) and my play code in its own words.
// POSTS.json at the repository root names those posts, and this program
// hands that file to the grader by copying it to the output directory.
// The house reads each post's reposts, quotes and likes from X and scores
// them; nothing this program writes about the posts is scored.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// The grader runs it with /bot and /output instead.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(BOT_DIR, "POSTS.json");
const destPath = join(OUTPUT_DIR, "POSTS.json");

const raw = readFileSync(sourcePath, "utf8");
const parsed = JSON.parse(raw) as unknown;
if (
  typeof parsed !== "object" ||
  parsed === null ||
  !Array.isArray((parsed as { posts?: unknown }).posts)
) {
  console.error("POSTS.json must be an object with a posts array");
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(destPath, raw, "utf8");

// Confirm the copy is byte for byte the file this repository ships.
const copied = readFileSync(destPath, "utf8");
if (copied !== raw) {
  console.error("POSTS.json copy does not match the repository file");
  process.exit(1);
}
console.log(
  `Copied POSTS.json (${(parsed as { posts: unknown[] }).posts.length} posts) to ${destPath}`,
);
