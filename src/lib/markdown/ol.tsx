import { ReactNode } from "react";
import parseMarkdown from "./parser";

export default function parseOrderedList(input: string | ReactNode, keyPrefix = ""): (string | ReactNode)[] {
  if (typeof input !== "string") return [input];

  const regex = /^(\d+)\.\s+(.+?)(?=\n\d+\.\s|\n\n|$)/gm;
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  const listItems: ReactNode[] = [];

  for (const match of input.matchAll(regex)) {
    const [full, num, content] = match;
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
      <li 
        key={`${keyPrefix}-li-${matchIndex}`} 
        value={parseInt(num)}
        className="list-decimal ml-4 pl-1"
      >
        {parsedContent}
      </li>
    );
    lastIndex = index + full.length;
    matchIndex++;
  }

  if (listItems.length > 0) {
    parts.push(
      <ol key={`${keyPrefix}-ol`} className="my-1">
        {listItems}
      </ol>
    );
  } else if (lastIndex < input.length) {
    parts.push(input.slice(lastIndex));
  }

  return parts;
}