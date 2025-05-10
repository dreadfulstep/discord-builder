import { ReactNode } from "react";
import parseMarkdown from "./parser";

export default function parseLink(input: string | ReactNode, keyPrefix = ""): (string | ReactNode)[] {
  if (typeof input !== "string") return [input];

  const regex = /\[(.*?)\]\((.*?)\)/g;
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of input.matchAll(regex)) {
    const [full, text, url] = match;
    const index = match.index!;
    if (index > lastIndex) parts.push(input.slice(lastIndex, index));
    
    // Parse any markdown inside the link text
    const linkContent = parseMarkdown(text, {
      bold: true,
      italic: true,
      strikethrough: true,
      heading: false,
      newline: false,
      blockquote: false,
      unorderedList: false,
      orderedList: false,
      link: false
    });
    
    parts.push(
      <a 
        key={`${keyPrefix}-link-${matchIndex}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {linkContent}
      </a>
    );
    lastIndex = index + full.length;
    matchIndex++;
  }

  if (lastIndex < input.length) parts.push(input.slice(lastIndex));
  return parts;
}