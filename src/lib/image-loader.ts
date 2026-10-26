"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Pexels images are resized by their CDN (`w` param). Local assets in /public
 * are served as-is; the width param keeps Next's srcset entries unique.
 */
export default function imageLoader({ src, width }: LoaderArgs) {
  if (src.startsWith("https://images.pexels.com/")) {
    return `${src}?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return `${src}?w=${width}`;
}
