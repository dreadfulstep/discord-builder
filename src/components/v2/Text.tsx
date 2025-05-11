import parseMarkdown from "@/lib/markdown/parser";
import React from "react";

const Text = ({ children }: { children: string }) => {
  return <div className="text-white text-sm">{parseMarkdown(children)}</div>;
};

export default Text;
