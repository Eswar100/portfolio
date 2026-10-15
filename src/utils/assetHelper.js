/**
 * Resolves a public asset path against Vite's base URL (import.meta.env.BASE_URL).
 * Ensures correct path resolution for both local development ('/') and
 * deployed environments with subpaths (e.g. GitHub Pages '/portfolio/').
 * 
 * Prevents double-prefixing if the path already starts with the base URL
 * (with or without a leading slash).
 */
export function getAssetUrl(path) {
  if (!path || typeof path !== 'string') return '';

  // Return external URLs or data URIs as-is
  if (/^(https?:|\/\/|data:)/i.test(path)) {
    return path;
  }

  const rawBase = import.meta.env.BASE_URL || '/';
  const baseClean = rawBase.replace(/^\/|\/$/g, '');
  const cleanPath = path.replace(/^\/+/, '');

  // If base is empty (i.e. root '/'), just ensure single leading slash
  if (!baseClean) {
    return `/${cleanPath}`;
  }

  // If the path already begins with the base segment (e.g. 'portfolio/...'),
  // avoid adding it twice
  if (cleanPath === baseClean || cleanPath.startsWith(`${baseClean}/`)) {
    return `/${cleanPath}`;
  }

  return `/${baseClean}/${cleanPath}`;
}
