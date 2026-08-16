/**
 * The recipe scaler, checked against every real ingredient line.
 *
 * This is the one piece of the site that does arithmetic on content, and it
 * fails silently: a bad parse does not throw, it just prints a wrong amount on
 * a page telling someone how much chilli to put in their food. So it gets a
 * check of its own.
 *
 * Needs no browser and no server — it is pure logic:
 *
 *   npm run qty
 */

import { RECIPES } from "../src/lib/recipes.js";
import { scaleIngredient, formatQuantity, baseServes } from "../src/lib/quantity.js";

let bad = 0;
const check = (got, want, label) => {
  if (got !== want) {
    console.log(`  ! ${label}\n      got  "${got}"\n      want "${want}"`);
    bad += 1;
  }
};

/* Formatting: cooks read fractions, not floats. */
check(formatQuantity(2), "2", "whole number");
check(formatQuantity(1.5), "1½", "mixed fraction");
check(formatQuantity(0.5), "½", "bare half");
check(formatQuantity(1 / 3), "⅓", "third");
check(formatQuantity(2 / 3), "⅔", "two thirds");
check(formatQuantity(2.25), "2¼", "mixed quarter");
check(formatQuantity(0.7), "0.7", "nothing near a fraction stays decimal");

/* Parsing and scaling the shapes that actually appear in lib/recipes. */
check(scaleIngredient("2 cups thick poha", 2).text, "4 cups thick poha", "plain amount");
check(scaleIngredient("1 tsp mustard seeds", 0.5).text, "½ tsp mustard seeds", "halved");
check(scaleIngredient("8–10 curry leaves", 2).text, "16–20 curry leaves", "range");
check(scaleIngredient("400g paneer, cubed", 0.5).text, "200g paneer, cubed", "unit attached to number");

/* The trap. These numbers are not quantities and must never move. */
check(
  scaleIngredient("Bhature dough, rested 2 hours", 2).text,
  "Bhature dough, rested 2 hours",
  "a resting time is not an amount"
);
check(scaleIngredient("Sugar, to taste", 2).text, "Sugar, to taste", "no amount to scale");
check(scaleIngredient("Juice of half a lemon", 2).text, "Juice of half a lemon", "amount written in words");

/* Nothing anywhere may produce NaN, Infinity or an empty line. */
const lines = RECIPES.flatMap((r) => r.ingredients);
let scaled = 0;
for (const factor of [1 / 3, 0.5, 1.5, 2, 3, 6]) {
  for (const line of lines) {
    const out = scaleIngredient(line, factor);
    if (out.scaled) scaled += 1;
    if (/NaN|Infinity|undefined/.test(out.text) || !out.text.trim()) {
      console.log(`  ! garbage at ${factor}x: "${line}" -> "${out.text}"`);
      bad += 1;
    }
  }
}

/* Every recipe has to declare a servings count the stepper can start from. */
for (const r of RECIPES) {
  if (!Number.isFinite(baseServes(r)) || baseServes(r) < 1) {
    console.log(`  ! ${r.slug} has unusable serves: ${r.serves}`);
    bad += 1;
  }
}

console.log(
  `checked ${lines.length} ingredient lines across ${RECIPES.length} recipes at 6 factors ` +
    `(${scaled} scaled results)`
);
console.log(bad ? `\n${bad} problem(s)` : "\nquantity scaling clean");
if (bad) process.exitCode = 1;
