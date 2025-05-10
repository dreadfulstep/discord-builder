import { ReactNode } from "react";
import parseBold from "./bold";
import parseItalic from "./italic";
import parseStrikethrough from "./strikethrough";
import parseHeading from "./heading";
import parseBlockquote from "./blockquote";
import parseUnorderedList from "./ul";
import parseOrderedList from "./ol";
import parseLink from "./link";
import parseNewline from "./newline";

type ParserOptions = {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  heading?: boolean;
  newline?: boolean;
  blockquote?: boolean;
  unorderedList?: boolean;
  orderedList?: boolean;
  link?: boolean;
};

export default function parseMarkdown(
  input: string,
  options: ParserOptions = {}
): ReactNode[] {
  const paragraphs = input.split('\n\n');
  
  const output: (string | ReactNode)[] = paragraphs.flatMap((paragraph, i) => {
    let result: (string | ReactNode)[] = [paragraph];
    
    if (options.unorderedList !== false) 
      result = result.flatMap(e => parseUnorderedList(e, `ul-${i}`));
    if (options.orderedList !== false) 
      result = result.flatMap(e => parseOrderedList(e, `ol-${i}`));
    if (options.blockquote !== false) 
      result = result.flatMap(e => parseBlockquote(e, `blockquote-${i}`));
    if (options.heading !== false) 
      result = result.flatMap(e => parseHeading(e, `heading-${i}`));

    if (options.bold !== false) 
      result = result.flatMap(e => parseBold(e, `bold-${i}`));
    if (options.italic !== false) 
      result = result.flatMap(e => parseItalic(e, `italic-${i}`));
    if (options.strikethrough) 
      result = result.flatMap(e => parseStrikethrough(e, `strike-${i}`));
    if (options.link !== false) 
      result = result.flatMap(e => parseLink(e, `link-${i}`));

    if (options.newline !== false) 
      result = result.flatMap(e => parseNewline(e, `nl-${i}`));

    return result;
  });

  return output.map((item, i) =>
    typeof item === "string" ? (
      <span key={`wrap-${i}`} className="break-words">
        {item}
      </span>
    ) : (
      item
    )
  );
}