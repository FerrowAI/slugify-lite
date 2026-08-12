const { slugify, unique } = require("./dist/index");

console.log("=== Slugify Lite Demo ===\n");

// Test transliteration
console.log("Transliteration:");
console.log(`  "Crème Brûlée Recipe!" -> "${slugify("Crème Brûlée Recipe!")}"`);
console.log(`  "Español café" -> "${slugify("Español café")}"`);
console.log(`  "Über Große" -> "${slugify("Über Große")}"\n`);

// Test truncation
console.log("Truncation:");
const long = "this is a very long title that should be truncated at word boundary";
console.log(`  maxLength=30 -> "${slugify(long, {maxLength: 30})}"\n`);

// Test uniqueness
console.log("Uniqueness:");
const taken = (s) => s === "recipe" || s === "recipe-2";
console.log(`  unique("recipe", taken) -> "${unique("recipe", taken)}"`);
console.log(`  unique("recipe-2", taken) -> "${unique("recipe-2", taken)}"\n`);
