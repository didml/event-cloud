export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яіїєґ\s-]/giu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
