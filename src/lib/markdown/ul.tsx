import { ReactNode } from "react";
import parseMarkdown from "./parser";

export default function parseUnorderedList(input: string | ReactNode, keyPrefix = ""): (string | ReactNode)[] {
  if (typeof input !== "string") return [input];

  const regex = /^([-*+])\s+(.+?)(?=\n[-*+]\s|\n\n|$)/gms;
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  const listItems: ReactNode[] = [];

  for (const match of input.matchAll(regex)) {
    const [full, bullet, content] = match;
    const index = match.index!;
    if (index > lastIndex) parts.push(input.slice(lastIndex, index));
    
    const parsedContent = parseMarkdown(content.trim(), {
      bold: true,
      italic: true,
      strikethrough: true,
      heading: false,
      newline: true,
      blockquote: false,
      unorderedList: false,
      orderedList: false,
      link: true
    });
    
    listItems.push(
      <li key={`${keyPrefix}-li-${matchIndex}`} className="list-disc ml-4 pl-1">
        {parsedContent}
      </li>
    );
    lastIndex = index + full.length;
    matchIndex++;
  }

  if (listItems.length > 0) {
    parts.push(
      <ul key={`${keyPrefix}-ul`} className="my-1">
        {listItems}
      </ul>
    );
  } else if (lastIndex < input.length) {
    parts.push(input.slice(lastIndex));
  }

  return parts;
}