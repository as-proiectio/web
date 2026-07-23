/**
 * Sanitizes raw markdown text before passing to compileMDX.
 * Replaces unescaped '<' characters that do not form valid HTML/JSX tags
 * (such as '< 5%', '<100M', '<$50') with '&lt;' to prevent MDX compilation errors.
 */
export function sanitizeMarkdownForMdx(markdown: string): string {
  if (!markdown) return "";
  return markdown.replace(/<(?![a-zA-Z\/!][^>]*>)/g, "&lt;");
}
