// Custom Document: augments the application's HTML and <head>.
// Useful for setting global metadata, fonts, and preloads.
// TODO: Preload critical fonts and add SEO metadata if needed for the sprint.
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
