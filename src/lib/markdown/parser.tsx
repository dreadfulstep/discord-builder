import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

interface ParserOptions {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  heading?: boolean;
  blockquote?: boolean;
  unorderedList?: boolean;
  orderedList?: boolean;
  link?: boolean;
  newline?: boolean;
  code?: boolean;
}

interface CustomComponents {
  [key: string]: React.ComponentType<React.PropsWithChildren<unknown>>;
}

const styles = {
  paragraph: "my-4 leading-relaxed",
  bold: "font-bold",
  italic: "italic",
  heading1: "text-2xl font-bold border-b pb-2",
  heading2: "text-xl font-bold",
  heading3: "text-lg font-bold",
  link: "text-blue-500 hover:underline",
  strikethrough: "line-through",
  subtext: "text-xs align-sub text-neutral-600",
  blockquote: "pl-2 border-l-4 border-neutral-600 italic my-4",
  unorderedList: "list-disc list-inside my-4 space-y-2",
  orderedList: "list-decimal list-inside my-4 space-y-2",
  listItem: "mb-1",
  code: "font-mono border border-border bg-neutral-950 rounded px-1 py-0.5 text-sm",
  codeBlock: "font-mono border border-border bg-neutral-950 text-neutral-200 rounded p-4 my-4 text-sm overflow-x-auto",
};

export default function parseMarkdown(
  input: string,
  options: ParserOptions = {}
): ReactNode {
  const components: CustomComponents = {};
  
  if (options.bold === false) components.strong = () => null;
  if (options.italic === false) components.em = () => null;
  if (options.strikethrough === false) components.del = () => null;
  if (options.heading === false) {
    components.h1 = () => null;
    components.h2 = () => null;
    components.h3 = () => null;
  }
  if (options.blockquote === false) components.blockquote = () => null;
  if (options.unorderedList === false) components.ul = () => null;
  if (options.orderedList === false) components.ol = () => null;
  if (options.link === false) components.a = () => null;
  if (options.newline === false) components.br = () => null;
  if (options.code === false) {
    components.code = () => null;
    components.pre = () => null;
  }

  const styledComponents = {
    ...components,
    
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
      const hasOnlyCodeBlock = React.Children.toArray(children).every(
        (child) => React.isValidElement(child) && child.type === 'pre'
      );
      
      return hasOnlyCodeBlock ? (
        <>{children}</>
      ) : (
        <p className={styles.paragraph} {...props}>
          {children}
        </p>
      );
    },
    
    strong: ({ children, ...props }: React.ComponentPropsWithoutRef<'strong'>) => (
      <strong className={styles.bold} {...props}>
        {children}
      </strong>
    ),
    
    em: ({ children, ...props }: React.ComponentPropsWithoutRef<'em'>) => (
      <em className={styles.italic} {...props}>
        {children}
      </em>
    ),
    
    del: ({ children, ...props }: React.ComponentPropsWithoutRef<'span'>) => (
      <span className={styles.strikethrough} {...props}>
        {children}
      </span>
    ),
    
    h1: ({ children, ...props }: React.ComponentPropsWithoutRef<'h1'>) => (
      <h1 className={styles.heading1} {...props}>
        {children}
      </h1>
    ),
    
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
      <h2 className={styles.heading2} {...props}>
        {children}
      </h2>
    ),
    
    h3: ({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) => (
      <h3 className={styles.heading3} {...props}>
        {children}
      </h3>
    ),
    
    blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote className={styles.blockquote} {...props}>
        {children}
      </blockquote>
    ),
    
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
      <ul className={styles.unorderedList} {...props}>
        {children}
      </ul>
    ),
    
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => (
      <ol className={styles.orderedList} {...props}>
        {children}
      </ol>
    ),
    
    li: ({ children, ...props }: React.ComponentPropsWithoutRef<'li'>) => (
      <li className={styles.listItem} {...props}>
        {children}
      </li>
    ),
    
    a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<'a'>) => (
      <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
    
    code: ({ inline, className, children, ...props }: { inline?: boolean } & React.ComponentPropsWithoutRef<'code'>) => {
      if (inline) {
        return (
          <code className={styles.code} {...props}>
            {children}
          </code>
        );
      }
      
      return (
        <pre className={styles.codeBlock} {...props}>
          <code className={className}>{children}</code>
        </pre>
      );
    },
    
    sub: ({ children, ...props }: React.ComponentPropsWithoutRef<'sub'>) => (
      <sub className={styles.subtext} {...props}>
        {children}
      </sub>
    ),
  };

  return (
    <ReactMarkdown 
      components={styledComponents}
      unwrapDisallowed={true} // This helps prevent the <pre> inside <p> issue
    >
      {input}
    </ReactMarkdown>
  );
}