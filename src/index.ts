export interface SlugOptions {
  separator?: string;
  maxLength?: number;
}

// Latin-1/European diacritics transliteration map
const DIACRITICS_MAP: Record<string, string> = {
  'À':'A', 'Á':'A', 'Â':'A', 'Ã':'A', 'Ä':'A', 'Å':'A', 'Ā':'A', 'Ă':'A', 'Ą':'A',
  'à':'a', 'á':'a', 'â':'a', 'ã':'a', 'ä':'a', 'å':'a', 'ā':'a', 'ă':'a', 'ą':'a',
  'Ç':'C', 'Ć':'C', 'č':'c', 'ç':'c', 'ć':'c',
  'Ď':'D', 'Đ':'D', 'ď':'d', 'đ':'d',
  'È':'E', 'É':'E', 'Ê':'E', 'Ë':'E', 'Ē':'E', 'Ĕ':'E', 'Ė':'E', 'Ę':'E', 'Ě':'E',
  'è':'e', 'é':'e', 'ê':'e', 'ë':'e', 'ē':'e', 'ĕ':'e', 'ė':'e', 'ę':'e', 'ě':'e',
  'Ğ':'G', 'Ģ':'G', 'ğ':'g', 'ģ':'g',
  'Ĥ':'H', 'Ħ':'H', 'ĥ':'h', 'ħ':'h',
  'Ì':'I', 'Í':'I', 'Î':'I', 'Ï':'I', 'Ĩ':'I', 'Ī':'I', 'Ĭ':'I', 'Į':'I', 'İ':'I',
  'ì':'i', 'í':'i', 'î':'i', 'ï':'i', 'ĩ':'i', 'ī':'i', 'ĭ':'i', 'į':'i', 'ı':'i',
  'Ĵ':'J', 'ĵ':'j',
  'Ķ':'K', 'ķ':'k',
  'Ĺ':'L', 'Ļ':'L', 'Ľ':'L', 'Ŀ':'L', 'Ł':'L', 'ĺ':'l', 'ļ':'l', 'ľ':'l', 'ŀ':'l', 'ł':'l',
  'Ñ':'N', 'Ń':'N', 'Ņ':'N', 'Ň':'N', 'Ŋ':'N', 'ñ':'n', 'ń':'n', 'ņ':'n', 'ň':'n', 'ŋ':'n',
  'Ò':'O', 'Ó':'O', 'Ô':'O', 'Õ':'O', 'Ö':'O', 'Ø':'O', 'Ō':'O', 'Ŏ':'O', 'Ő':'O',
  'ò':'o', 'ó':'o', 'ô':'o', 'õ':'o', 'ö':'o', 'ø':'o', 'ō':'o', 'ŏ':'o', 'ő':'o',
  'Ŕ':'R', 'Ŗ':'R', 'Ř':'R', 'ŕ':'r', 'ŗ':'r', 'ř':'r',
  'Ś':'S', 'Ŝ':'S', 'Ş':'S', 'Š':'S', 'ś':'s', 'ŝ':'s', 'ş':'s', 'š':'s',
  'Ţ':'T', 'Ť':'T', 'Ŧ':'T', 'ţ':'t', 'ť':'t', 'ŧ':'t',
  'Ù':'U', 'Ú':'U', 'Û':'U', 'Ü':'U', 'Ũ':'U', 'Ū':'U', 'Ŭ':'U', 'Ů':'U', 'Ű':'U', 'Ų':'U',
  'ù':'u', 'ú':'u', 'û':'u', 'ü':'u', 'ũ':'u', 'ū':'u', 'ŭ':'u', 'ů':'u', 'ű':'u', 'ų':'u',
  'Ŵ':'W', 'ŵ':'w',
  'Ý':'Y', 'Ŷ':'Y', 'Ÿ':'Y', 'ý':'y', 'ŷ':'y', 'ÿ':'y',
  'Ź':'Z', 'Ż':'Z', 'Ž':'Z', 'ź':'z', 'ż':'z', 'ž':'z',
  'ß':'ss', 'ae':'ae', 'oe':'oe', 'ue':'ue'
};

/**
 * Convert unicode to ASCII slug
 */
export function slugify(input: string, opts: SlugOptions = {}): string {
  const sep = opts.separator ?? '-';
  const maxLen = opts.maxLength;

  // Transliterate diacritics
  let slug = input.replace(/./g, (char) => DIACRITICS_MAP[char] ?? char);

  // Lowercase
  slug = slug.toLowerCase();

  // Remove non-ASCII alphanumeric and separator
  slug = slug.replace(/[^\w\s-]/g, '').replace(/\s+/g, sep).replace(/-+/g, sep).replace(/^-|-$/g, '');

  // Truncate at word boundary
  if (maxLen && slug.length > maxLen) {
    let truncated = slug.substring(0, maxLen);
    const lastSep = truncated.lastIndexOf(sep);
    if (lastSep > maxLen * 0.6) {
      truncated = truncated.substring(0, lastSep);
    }
    slug = truncated.replace(/-+$/, '');
  }

  return slug;
}

/**
 * Ensure slug uniqueness by appending -2, -3, etc. given a taken() predicate
 */
export function unique(base: string, taken: (s: string) => boolean, maxAttempts = 100): string {
  if (!taken(base)) return base;
  for (let i = 2; i <= maxAttempts; i++) {
    const candidate = `${base}-${i}`;
    if (!taken(candidate)) return candidate;
  }
  throw new Error(`Could not generate unique slug after ${maxAttempts} attempts`);
}
