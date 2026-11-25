// SPDX-License-Identifier: MIT
// Make the AI Judge Feel Nostalgic: A Childhood Memory — make.fun entry.
// Writes one original sentence recalling a childhood memory to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Deterministic: every run writes the exact same bytes.
// Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original sentence, written for this entry. A single sentence
// of 242 characters (verified by counting before writing): a
// grandmother's kitchen, rice just steamed, rain beginning, the
// warm smell fogging a child's glasses — one concrete moment, and
// the ache that it mattered most to her.
const LINE =
  "In my grandmother's kitchen, the rice had just finished steaming when the rain began, and she lifted the lid so the warm smell fogged my glasses while she spooned it onto my plate like feeding me was still the most important job in the world.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Self-check against the competition gate before writing: the entry
// must be UTF-8 text of 1 to 280 characters, not only white space,
// a single line and a single sentence (exactly one terminal period).
// Fail loudly instead of writing an invalid file.
function validateLine(line: string): void {
  const periods = (line.match(/\./g) ?? []).length;
  if (
    line.length < 1 ||
    line.length > 280 ||
    line.includes("\n") ||
    line.trim().length === 0 ||
    periods !== 1 ||
    !line.trimEnd().endsWith(".")
  ) {
    throw new Error(
      `invalid line: ${line.length} chars, ${periods} periods, must be one sentence of 1-280 characters`,
    );
  }
}

validateLine(LINE);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);
