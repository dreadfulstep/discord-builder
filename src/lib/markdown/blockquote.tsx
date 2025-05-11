import { ReactNode } from "react";

export default function parseBlockquote(input: string | ReactNode, keyPrefix = ""): (string | ReactNode)[] {
  if (typeof input !== "string") return [input];

  const regex = /^>\s*(.*)$/gm;
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of input.matchAll(regex)) {
    const [full, content] = match;
    const index = match.index!;
    if (index > lastIndex) parts.push(input.slice(lastIndex, index));
    parts.push(
      <blockquote key={`${keyPrefix}-blockquote-${matchIndex}`} className="border-l-3 border-neutral-600 pl-2 italic">
        {content}
      </blockquote>
    );
    lastIndex = index + full.length;
    matchIndex++;
  }

  if (lastIndex < input.length) parts.push(input.slice(lastIndex));
  return parts;
}