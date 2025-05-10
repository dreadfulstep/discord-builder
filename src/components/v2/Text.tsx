import parseMarkdown from "@/lib/markdown/parser";
import React from "react";

const Text = ({ children }: { children: string }) => {
  return <div className="text-white">{parseMarkdown(children)}</div>;
};

export default Text;
