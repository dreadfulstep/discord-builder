import React from "react";

const parseMarkdown = (text: string): React.ReactNode[] => {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];

  for (const [index, line] of lines.entries()) {
    let parsedLine: React.ReactNode = line;

    // Headings
    if (line.startsWith("## ")) {
      parsedLine = <h2 key={index} className="text-xl font-semibold">{line.slice(3)}</h2>;
    } else if (line.startsWith("# ")) {
      parsedLine = <h1 key={index} className="text-2xl font-bold">{line.slice(2)}</h1>;
    } else {
      // Inline formatting
      let formatted = line;

      // Order matters to avoid nested issues
      formatted = formatted
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.+?)__/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/_(.+?)_/g, "<em>$1</em>")
        .replace(/--(.+?)--/g, "<del>$1</del>");

      parsedLine = (
        <p key={index} dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    }

    result.push(parsedLine);
  }

  return result;
};

const Text = ({ children }: { children: string }) => {
  return (
    <div className="text-white space-y-2">
      {parseMarkdown(children)}
    </div>
  );
};

export default Text;
