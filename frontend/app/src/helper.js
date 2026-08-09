export const getMenuImageUrl = (url, size) => {
  if (!url) return null;

  if (size) {
    // Remove query params first
    const [baseUrl, query] = url.split("?");

    // Replace extension with _SIZE.webp (since Firebase resized outputs webp)
    const resizedUrl = baseUrl.replace(/\.[a-zA-Z0-9]+$/, `_${size}.webp`);

    return query ? `${resizedUrl}?${query}` : resizedUrl;
  } else {
    // No resizing → return original
    return url;
  }
};
