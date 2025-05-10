import { ReactNode } from "react";

export default function parseItalic(input: string | ReactNode, keyPrefix = ""): (string | ReactNode)[] {
  if (typeof input !== "string") return [input];

  const regex = /\*(.*?)\*/g;
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of input.matchAll(regex)) {
    const [full, content] = match;
    const index = match.index!;
    if (index > lastIndex) parts.push(input.slice(lastIndex, index));
    parts.push(<em key={`${keyPrefix}-italic-${matchIndex}`} className="italic">{content}</em>);
    lastIndex = index + full.length;
    matchIndex++;
  }

  if (lastIndex < input.length) parts.push(input.slice(lastIndex));
  return parts;
}