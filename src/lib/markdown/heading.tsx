import { JSX, ReactNode } from "react";

export default function parseHeading(input: string | ReactNode, keyPrefix = ""): (string | ReactNode)[] {
  if (typeof input !== "string") return [input];

  const regex = /^(#{1,6})\s*(.*)$/gm;
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of input.matchAll(regex)) {
    const [full, hashes, content] = match;
    const level = hashes.length;
    const index = match.index!;
    if (index > lastIndex) parts.push(input.slice(lastIndex, index));

    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    parts.push(
    <HeadingTag key={`${keyPrefix}-heading-${matchIndex}`} className={`${
      level === 1 ? 'text-2xl' :
      level === 2 ? 'text-xl' :
      level === 3 ? 'text-lg' :
      level === 4 ? 'text-md' :
      level === 5 ? 'text-base' :
      'text-base'
    } font-semibold`}>
      {content}
    </HeadingTag>
    );
    lastIndex = index + full.length;
    matchIndex++;
  }

  if (lastIndex < input.length) parts.push(input.slice(lastIndex));
  return parts;
}