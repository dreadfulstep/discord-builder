import { ReactNode } from "react";

export default function parseNewline(
  input: string | ReactNode, 
  keyPrefix = ""
): (string | ReactNode)[] {
  if (typeof input !== "string") return [input];

  const uniqueId = Math.random().toString(36).substring(2, 9);
  
  return input.split("\n").flatMap((line, i, arr) =>
    i < arr.length - 1
      ? [line, <br key={`${keyPrefix}-${uniqueId}-br-${i}`} />]
      : [line]
  );
}