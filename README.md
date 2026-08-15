# slugify-lite

```sh
npm install @ferrow/slugify-lite
```
![CI](https://github.com/FerrowAI/slugify-lite/actions/workflows/ci.yml/badge.svg)

URL slugs: unicode to ASCII transliteration, word-boundary truncation, uniqueness helper.

## Quick Start

```typescript
import { slugify, unique } from "slugify-lite";

slugify("Crème Brûlée Recipe!");        // "creme-brulee-recipe"
slugify("Español café");                 // "espanol-cafe"

// Truncate at word boundary
slugify("long title here", {maxLength: 20});  // "long-title-here" (keeps words)

// Ensure uniqueness
const taken = (s) => existingSlugs.has(s);
unique("recipe", taken);                 // "recipe-2" (if "recipe" taken)
```

## API

### `slugify(input: string, opts?: SlugOptions): string`

Convert unicode string to URL-safe slug.

**Options:**
- `separator?: string` — Character between words (default: "-")
- `maxLength?: number` — Truncate at word boundary if longer

**Coverage:** Built-in map for Latin-1 + common European diacritics (À, É, Ñ, Ü, etc.). Characters without diacritics pass through unchanged; non-ASCII without a mapping are removed.

### `unique(base: string, taken: (s: string) => boolean, maxAttempts?: number): string`

Generate unique slug by appending -2, -3, etc.

- `taken` — Predicate: is this slug already in use?
- `maxAttempts` — Stop after N attempts (default: 100)

**Throws** `Error` if unique slug cannot be found.

## Limitations

- **Not full ICU:** Covers Latin scripts only (À-Ž range). Non-Latin scripts (Chinese, Arabic, Greek) are stripped.
- **No transliteration library:** Diacritics map is manually curated, not comprehensive.
- No locale-specific pluralization or case rules.

---

Part of the [ferrow-toolkit](https://github.com/Ruzylo-cloud/ferrow-toolkit) collection · Sponsored by [Ferrow](https://ferrow.ai)
