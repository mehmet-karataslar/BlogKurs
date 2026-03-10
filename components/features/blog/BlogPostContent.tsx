import DOMPurify from "isomorphic-dompurify";

interface BlogPostContentProps {
  html: string;
}

export function BlogPostContent({ html }: BlogPostContentProps) {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li",
      "h1", "h2", "h3", "h4", "blockquote", "pre", "code", "hr",
      "table", "thead", "tbody", "tr", "th", "td", "img", "span",
      "div",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "style", "class", "align"],
  });

  return (
    <div
      className="blog-content text-sm sm:text-base"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
